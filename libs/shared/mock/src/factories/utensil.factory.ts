import type { UtensilMock } from '@kookio/prisma-client';

let _utensilCounter = 0;

export const resetUtensilCounter = () => {
  _utensilCounter = 0;
};

export const createMockUtensil = (
  overrides?: Partial<UtensilMock>,
): UtensilMock => {
  _utensilCounter += 1;
  const n = _utensilCounter.toString().padStart(4, '0');
  return {
    id: `utensil_mock_${n}`,
    slug: `utensil-${n}`,
    name: `Utensil ${n}`,
    emoji: null,
    category: null,
    ...overrides,
  };
};
