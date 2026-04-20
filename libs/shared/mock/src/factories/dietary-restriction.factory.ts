import type { DietaryRestrictionMock } from '@kookio/prisma-client';

let _drCounter = 0;

export const resetDietaryRestrictionCounter = () => {
  _drCounter = 0;
};

export const createMockDietaryRestriction = (
  overrides?: Partial<DietaryRestrictionMock>,
): DietaryRestrictionMock => {
  _drCounter += 1;
  const n = _drCounter.toString().padStart(4, '0');
  return {
    id: `dr_mock_${n}`,
    slug: `restriction-${n}`,
    label: `Restriction ${n}`,
    emoji: null,
    description: null,
    ...overrides,
  };
};
