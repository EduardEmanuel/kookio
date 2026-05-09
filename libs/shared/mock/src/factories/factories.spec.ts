import { describe, it, expect, beforeEach } from 'vitest';

import { MealSlotTypeSchema, RoleSchema } from '@kookio/prisma-client';

import {
  createMockUser,
  resetUserCounter,
  createMockUserProfile,
  resetProfileCounter,
  createMockDietaryRestriction,
  resetDietaryRestrictionCounter,
  createMockUtensil,
  resetUtensilCounter,
  createMockRecipeCollection,
  resetCollectionCounter,
  createMockCookingSession,
  resetCookingSessionCounter,
  createMockMealSlot,
  resetMealSlotCounter,
} from './index';

const r = RoleSchema.Values;
const mst = MealSlotTypeSchema.Values;

describe('createMockUser', () => {
  beforeEach(() => resetUserCounter());

  it('produces deterministic IDs', () => {
    const a = createMockUser();
    const b = createMockUser();
    expect(a.id).toBe('usr_mock_0001');
    expect(b.id).toBe('usr_mock_0002');
  });

  it('uses @kookio.test email domain', () => {
    const user = createMockUser();
    expect(user.email).toMatch(/@kookio\.test$/);
  });

  it('applies overrides', () => {
    const user = createMockUser({ id: 'usr_custom', roles: [r.ADMIN, r.USER] });
    expect(user.id).toBe('usr_custom');
    expect(user.roles).toEqual([r.ADMIN, r.USER]);
  });

  it('defaults to USER role and disabled=false', () => {
    const user = createMockUser();
    expect(user.roles).toEqual([r.USER]);
    expect(user.isDisabled).toBe(false);
  });
});

describe('createMockUserProfile', () => {
  beforeEach(() => resetProfileCounter());

  it('binds to the provided userId', () => {
    const profile = createMockUserProfile('usr_test');
    expect(profile.userId).toBe('usr_test');
  });

  it('produces deterministic IDs', () => {
    const a = createMockUserProfile('u1');
    const b = createMockUserProfile('u2');
    expect(a.id).toBe('prf_mock_0001');
    expect(b.id).toBe('prf_mock_0002');
  });

  it('defaults to onboardingDone=false', () => {
    const profile = createMockUserProfile('u1');
    expect(profile.onboardingDone).toBe(false);
  });
});

describe('createMockDietaryRestriction', () => {
  beforeEach(() => resetDietaryRestrictionCounter());

  it('produces deterministic slugs', () => {
    const dr = createMockDietaryRestriction();
    expect(dr.slug).toBe('restriction-0001');
  });

  it('applies overrides', () => {
    const dr = createMockDietaryRestriction({ slug: 'vegan', label: 'Vegan' });
    expect(dr.slug).toBe('vegan');
    expect(dr.label).toBe('Vegan');
  });
});

describe('createMockUtensil', () => {
  beforeEach(() => resetUtensilCounter());

  it('produces deterministic IDs', () => {
    const u = createMockUtensil();
    expect(u.id).toBe('utensil_mock_0001');
  });
});

describe('createMockRecipeCollection', () => {
  beforeEach(() => resetCollectionCounter());

  it('binds to the provided userId', () => {
    const col = createMockRecipeCollection('usr_owner');
    expect(col.userId).toBe('usr_owner');
  });

  it('applies overrides', () => {
    const col = createMockRecipeCollection('usr_owner', {
      name: 'Favorites',
      emoji: '❤️',
    });
    expect(col.name).toBe('Favorites');
    expect(col.emoji).toBe('❤️');
  });
});

describe('createMockCookingSession', () => {
  beforeEach(() => resetCookingSessionCounter());

  it('binds userId and recipeId', () => {
    const session = createMockCookingSession('usr_a', 'rcp_b');
    expect(session.userId).toBe('usr_a');
    expect(session.recipeId).toBe('rcp_b');
  });

  it('defaults to completedAt=null', () => {
    const session = createMockCookingSession('usr_a', 'rcp_b');
    expect(session.completedAt).toBeNull();
  });
});

describe('createMockMealSlot', () => {
  beforeEach(() => resetMealSlotCounter());

  it('binds to the provided userId', () => {
    const date = new Date('2026-01-05T00:00:00.000Z');
    const slot = createMockMealSlot('usr_x', null, date, mst.DINNER);
    expect(slot.userId).toBe('usr_x');
  });

  it('accepts null recipeId', () => {
    const date = new Date('2026-01-05T00:00:00.000Z');
    const slot = createMockMealSlot('usr_x', null, date, mst.DINNER);
    expect(slot.recipeId).toBeNull();
    expect(slot.slotType).toBe(mst.DINNER);
  });
});
