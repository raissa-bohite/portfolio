import { describe, expect, it, vi } from 'vitest';
import { buildEmail, handleContactRequest, sanitizeHeaderValue, type ContactEnvironment } from '../src/lib/contact-handler';

const origin = 'https://portfolio.test';
const environment: ContactEnvironment = {
  RESEND_API_KEY: 'test-key',
  CONTACT_TO_EMAIL: 'raissa@exemple.ci',
  CONTACT_FROM_EMAIL: 'portfolio@exemple.ci'
};
const validBody = {
  name: 'Awa Koné',
  email: 'awa@exemple.ci',
  type: 'project',
  message: 'Nous cherchons une développeuse pour une mission de trois mois.',
  locale: 'fr'
};

function buildRequest(body: unknown, headers: Record<string, string> = {}): Request {
  return new Request(`${origin}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: origin, ...headers },
    body: JSON.stringify(body)
  });
}

describe('handleContactRequest', () => {
  it('envoie l’email quand la demande est valide', async () => {
    // Arrange
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response('{}', { status: 200 }));
    // Act
    const response = await handleContactRequest(buildRequest(validBody), environment, fetcher);
    // Assert
    expect(response.status).toBe(200);
    expect(fetcher).toHaveBeenCalledWith('https://api.resend.com/emails', expect.objectContaining({ method: 'POST' }));
  });

  it('refuse une requête venue d’un autre site', async () => {
    // Arrange
    const fetcher = vi.fn<typeof fetch>();
    const request = buildRequest(validBody, { Origin: 'https://site-malveillant.test' });
    // Act
    const response = await handleContactRequest(request, environment, fetcher);
    // Assert
    expect(response.status).toBe(403);
    expect(fetcher).not.toHaveBeenCalled();
  });

  it('renvoie les champs invalides sans rien envoyer', async () => {
    // Arrange
    const fetcher = vi.fn<typeof fetch>();
    const request = buildRequest({ ...validBody, email: 'pas-un-email' });
    // Act
    const response = await handleContactRequest(request, environment, fetcher);
    // Assert
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'invalid-fields', fields: ['email'] });
    expect(fetcher).not.toHaveBeenCalled();
  });

  it('ignore discrètement un robot qui remplit le champ piège', async () => {
    // Arrange
    const fetcher = vi.fn<typeof fetch>();
    const request = buildRequest({ ...validBody, website: 'http://spam.test' });
    // Act
    const response = await handleContactRequest(request, environment, fetcher);
    // Assert
    expect(response.status).toBe(200);
    expect(fetcher).not.toHaveBeenCalled();
  });

  it('bloque l’envoi quand la vérification anti-robot échoue', async () => {
    // Arrange
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ success: false }));
    const request = buildRequest({ ...validBody, turnstileToken: 'jeton' });
    // Act
    const response = await handleContactRequest(request, { ...environment, TURNSTILE_SECRET_KEY: 'secret' }, fetcher);
    // Assert
    expect(response.status).toBe(403);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('signale un échec de livraison sans exposer le détail', async () => {
    // Arrange
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response('quota', { status: 429 }));
    // Act
    const response = await handleContactRequest(buildRequest(validBody), environment, fetcher);
    // Assert
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ error: 'delivery-failed' });
  });
});

describe('sanitizeHeaderValue', () => {
  it('supprime les retours à la ligne qui permettraient une injection d’en-tête', () => {
    // Arrange
    const value = 'Awa\r\nBcc: victime@exemple.ci';
    // Act
    const sanitized = sanitizeHeaderValue(value);
    // Assert
    expect(sanitized).toBe('Awa Bcc: victime@exemple.ci');
  });
});

describe('buildEmail', () => {
  it('répond directement à l’expéditeur et reste en texte brut', () => {
    // Arrange
    const contact = { ...validBody, type: 'project' as const, locale: 'fr' as const, website: '', turnstileToken: '' };
    // Act
    const email = buildEmail(contact, 'portfolio@exemple.ci', 'raissa@exemple.ci');
    // Assert
    expect(email['reply_to']).toBe('awa@exemple.ci');
    expect(email).not.toHaveProperty('html');
  });
});
