import { getInvalidFields, type ContactField } from '@/lib/contact-schema';

type FormState = 'idle' | 'sending' | 'success' | 'failure';

function readFormValues(form: HTMLFormElement): Record<string, string> {
  const values: Record<string, string> = {};
  for (const [key, value] of new FormData(form)) {
    if (typeof value === 'string') values[key] = value;
  }
  return values;
}

function setFieldError(form: HTMLFormElement, field: string, invalid: boolean): void {
  const control = form.elements.namedItem(field);
  if (!(control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement)) return;
  const errorElement = form.querySelector<HTMLElement>(`#${control.dataset['errorId']}`);
  if (!errorElement) return;
  const describedBy = new Set((control.getAttribute('aria-describedby') ?? '').split(' ').filter(Boolean));
  if (invalid) {
    errorElement.textContent = errorElement.dataset['errorMessage'] ?? '';
    errorElement.classList.remove('hidden');
    control.setAttribute('aria-invalid', 'true');
    describedBy.add(errorElement.id);
  } else {
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
    control.removeAttribute('aria-invalid');
    describedBy.delete(errorElement.id);
  }
  if (describedBy.size > 0) control.setAttribute('aria-describedby', [...describedBy].join(' '));
  else control.removeAttribute('aria-describedby');
}

function showErrors(form: HTMLFormElement, invalidFields: ContactField[]): void {
  const allFields: ContactField[] = ['name', 'email', 'message'];
  for (const field of allFields) setFieldError(form, field, invalidFields.includes(field));
  const firstInvalid = allFields.find((field) => invalidFields.includes(field));
  if (firstInvalid) (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
}

function setState(container: HTMLElement, state: FormState): void {
  container.dataset['state'] = state;
  const submit = container.querySelector<HTMLButtonElement>('[type="submit"]');
  if (submit) {
    submit.disabled = state === 'sending';
    const label = state === 'sending' ? submit.dataset['labelSending'] : submit.dataset['labelIdle'];
    // Seul le libellé change : l'icône du bouton reste en place
    const labelElement = submit.querySelector<HTMLElement>('[data-submit-label]') ?? submit;
    if (label) labelElement.textContent = label;
  }
}

function fillSuccessMessage(container: HTMLElement, name: string, email: string): void {
  const message = container.querySelector<HTMLElement>('[data-success-text]');
  if (!message) return;
  // textContent : les valeurs saisies ne sont jamais interprétées comme du HTML
  message.textContent = (message.dataset['template'] ?? '').replace('{name}', name).replace('{email}', email);
}

export function setupContactForm(container: HTMLElement): void {
  const form = container.querySelector<HTMLFormElement>('form');
  if (!form) return;
  // La validation native reste active sans JavaScript ; avec, on la remplace par des messages explicites
  form.noValidate = true;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const values = readFormValues(form);
    const payload = { ...values, turnstileToken: values['cf-turnstile-response'] ?? '' };
    const invalidFields = getInvalidFields(payload);
    showErrors(form, invalidFields);
    if (invalidFields.length > 0) return;

    setState(container, 'sending');
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      fillSuccessMessage(container, values['name'] ?? '', values['email'] ?? '');
      setState(container, 'success');
      container.querySelector<HTMLElement>('[data-success]')?.focus();
      form.reset();
    } catch {
      setState(container, 'failure');
    }
  });

  container.querySelector('[data-action="again"]')?.addEventListener('click', () => {
    setState(container, 'idle');
    (form.elements.namedItem('name') as HTMLElement | null)?.focus();
  });
}
