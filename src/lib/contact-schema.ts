// zod/mini : même validation que Zod, pour un poids bien plus faible dans le navigateur
import * as z from 'zod/mini';
// Import relatif : ce module est aussi embarqué par la fonction Cloudflare, qui ignore les alias
import { locales } from '../i18n/config';

export const contactLimits = {
  nameMax: 100,
  emailMax: 254,
  messageMin: 20,
  messageMax: 5000
} as const;

export const contactRequestTypes = ['job', 'project', 'other'] as const;

// Schéma partagé : le navigateur l'utilise pour guider, le serveur pour décider
export const contactSchema = z.object({
  name: z.string().check(z.trim(), z.minLength(1), z.maxLength(contactLimits.nameMax)),
  email: z.string().check(z.trim(), z.maxLength(contactLimits.emailMax), z.email()),
  type: z.enum(contactRequestTypes),
  message: z.string().check(z.trim(), z.minLength(contactLimits.messageMin), z.maxLength(contactLimits.messageMax)),
  locale: z.enum(locales),
  // Champ piège invisible : un humain le laisse vide, un robot le remplit
  website: z._default(z.string().check(z.maxLength(200)), ''),
  turnstileToken: z._default(z.string().check(z.maxLength(2048)), '')
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactRequest = z.output<typeof contactSchema>;

export type ContactField = 'name' | 'email' | 'message';

export function getInvalidFields(input: unknown): ContactField[] {
  const result = contactSchema.safeParse(input);
  if (result.success) return [];
  const fields = new Set<ContactField>();
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if (field === 'name' || field === 'email' || field === 'message') fields.add(field);
  }
  return [...fields];
}
