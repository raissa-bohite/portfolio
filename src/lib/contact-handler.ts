import { contactSchema, getInvalidFields, type ContactRequest } from './contact-schema';

export type ContactEnvironment = {
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
};

type Fetcher = typeof fetch;

const MAX_BODY_BYTES = 20_000;
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const RESEND_URL = 'https://api.resend.com/emails';

const requestTypeLabels: Record<ContactRequest['type'], string> = {
  job: "Offre d'emploi",
  project: 'Mission freelance',
  other: 'Autre demande'
};

export function jsonResponse(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    }
  });
}

// Bloque les envois depuis un autre site (CSRF) : l'origine doit être celle du portfolio
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get('Origin');
  return origin !== null && origin === new URL(request.url).origin;
}

// Retire les retours à la ligne : un nom ne doit jamais pouvoir injecter d'en-tête dans l'email
export function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

export function buildEmail(contact: ContactRequest, fromEmail: string, toEmail: string): Record<string, unknown> {
  const name = sanitizeHeaderValue(contact.name);
  return {
    from: fromEmail,
    to: [toEmail],
    reply_to: contact.email,
    subject: `[Portfolio] ${requestTypeLabels[contact.type]} · ${name}`,
    // Texte brut uniquement : aucun contenu saisi n'est interprété comme du HTML
    text: [`Nom : ${name}`, `Email : ${contact.email}`, `Demande : ${requestTypeLabels[contact.type]}`, `Langue : ${contact.locale}`, '', contact.message].join('\n')
  };
}

async function verifyTurnstile(token: string, secret: string, remoteIp: string | null, fetcher: Fetcher): Promise<boolean> {
  if (token === '') return false;
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (remoteIp) form.append('remoteip', remoteIp);
  const response = await fetcher(TURNSTILE_VERIFY_URL, { method: 'POST', body: form });
  if (!response.ok) return false;
  const result: unknown = await response.json();
  return typeof result === 'object' && result !== null && 'success' in result && result.success === true;
}

async function readJsonBody(request: Request): Promise<unknown> {
  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > MAX_BODY_BYTES) throw new Error('payload-too-large');
  return JSON.parse(text);
}

export async function handleContactRequest(request: Request, environment: ContactEnvironment, fetcher: Fetcher = fetch): Promise<Response> {
  if (!isSameOrigin(request)) return jsonResponse(403, { error: 'forbidden' });
  if (!(request.headers.get('Content-Type') ?? '').includes('application/json')) return jsonResponse(415, { error: 'unsupported-media-type' });

  let payload: unknown;
  try {
    payload = await readJsonBody(request);
  } catch {
    return jsonResponse(400, { error: 'invalid-body' });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) return jsonResponse(400, { error: 'invalid-fields', fields: getInvalidFields(payload) });
  const contact = parsed.data;

  // Champ piège rempli : on répond comme un succès pour ne pas renseigner le robot
  if (contact.website !== '') return jsonResponse(200, { ok: true });

  const { RESEND_API_KEY, TURNSTILE_SECRET_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = environment;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) return jsonResponse(503, { error: 'not-configured' });

  if (TURNSTILE_SECRET_KEY) {
    const human = await verifyTurnstile(contact.turnstileToken, TURNSTILE_SECRET_KEY, request.headers.get('CF-Connecting-IP'), fetcher);
    if (!human) return jsonResponse(403, { error: 'verification-failed' });
  }

  const response = await fetcher(RESEND_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(buildEmail(contact, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL))
  });
  if (!response.ok) return jsonResponse(502, { error: 'delivery-failed' });
  return jsonResponse(200, { ok: true });
}
