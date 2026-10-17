import { handleContactRequest, jsonResponse, type ContactEnvironment } from '../../src/lib/contact-handler';

type PagesContext = { request: Request; env: ContactEnvironment };

// Point d'entrée Cloudflare Pages : la logique vit dans src/lib pour être testée sans Cloudflare
export function onRequestPost(context: PagesContext): Promise<Response> {
  return handleContactRequest(context.request, context.env);
}

export function onRequest(): Response {
  return jsonResponse(405, { error: 'method-not-allowed' });
}
