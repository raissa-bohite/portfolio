import { describe, expect, it } from 'vitest';
import { contactSchema, getInvalidFields } from '../src/lib/contact-schema';

const validInput = {
  name: 'Awa Koné',
  email: 'awa@exemple.ci',
  type: 'job',
  message: 'Bonjour, nous recrutons une développeuse front-end.',
  locale: 'fr'
};

describe('contactSchema', () => {
  it('accepte une demande complète et retire les espaces superflus', () => {
    // Arrange
    const input = { ...validInput, name: '  Awa Koné  ' };
    // Act
    const result = contactSchema.safeParse(input);
    // Assert
    expect(result.success).toBe(true);
    expect(result.data?.name).toBe('Awa Koné');
  });

  it('refuse un type de demande inconnu', () => {
    // Arrange
    const input = { ...validInput, type: 'spam' };
    // Act
    const result = contactSchema.safeParse(input);
    // Assert
    expect(result.success).toBe(false);
  });
});

describe('getInvalidFields', () => {
  it('signale chaque champ à corriger', () => {
    // Arrange
    const input = { ...validInput, name: ' ', email: 'awa@', message: 'Trop court' };
    // Act
    const fields = getInvalidFields(input);
    // Assert
    expect(fields).toEqual(['name', 'email', 'message']);
  });

  it('ne signale rien pour une demande valide', () => {
    // Arrange
    const input = validInput;
    // Act
    const fields = getInvalidFields(input);
    // Assert
    expect(fields).toEqual([]);
  });
});
