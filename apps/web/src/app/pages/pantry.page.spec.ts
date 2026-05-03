import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';
import { PANTRY_TRPC, type PantryTrpcClient } from '@kookio/feature-pantry';
import {
  IngredientCategorySchema,
  MeasureUnitSchema,
  type PantryItemWithIngredient,
} from '@kookio/prisma-client';

import PantryPage from './pantry.page';

const Unit = MeasureUnitSchema.enum;
const Category = IngredientCategorySchema.enum;

const NOW = new Date('2026-05-03T12:00:00.000Z');

const buildItem = (
  overrides: Partial<PantryItemWithIngredient> = {},
): PantryItemWithIngredient => ({
  id: overrides.id ?? 'pi-1',
  userId: 'user-1',
  ingredientCatalogId: overrides.ingredientCatalogId ?? 'ing-1',
  quantity: overrides.quantity ?? 100,
  unit: overrides.unit ?? Unit.G,
  expiresAt: overrides.expiresAt ?? null,
  addedAt: new Date('2026-05-01T00:00:00.000Z'),
  updatedAt: new Date('2026-05-01T00:00:00.000Z'),
  ingredient: overrides.ingredient ?? {
    id: overrides.ingredientCatalogId ?? 'ing-1',
    name: 'Tomato',
    imageUrl: null,
    category: Category.PRODUCE,
  },
});

const flush = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

const setup = async (items: PantryItemWithIngredient[]) => {
  const trpc: PantryTrpcClient = {
    pantry: {
      list: { query: vi.fn().mockResolvedValue(items) },
      add: { mutate: vi.fn() },
      update: { mutate: vi.fn() },
      remove: { mutate: vi.fn() },
      searchIngredients: { query: vi.fn().mockResolvedValue([]) },
    },
  };

  const authStore = createMockAuthStore({
    authReady: true,
    isAuthenticated: true,
    onboardingDone: true,
  });

  const dialog = {
    open: vi.fn().mockReturnValue({ afterClosed: () => of(null) }),
  };
  const snackBar = { open: vi.fn() };

  await TestBed.configureTestingModule({
    imports: [PantryPage],
    providers: [
      provideZonelessChangeDetection(),
      provideNativeDateAdapter(),
      { provide: PANTRY_TRPC, useValue: trpc },
      { provide: AuthStore, useValue: authStore },
      { provide: MatDialog, useValue: dialog },
      { provide: MatSnackBar, useValue: snackBar },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(PantryPage);
  fixture.detectChanges();
  await fixture.whenStable();

  return {
    fixture,
    el: fixture.nativeElement as HTMLElement,
    component: fixture.componentInstance,
    dialog,
    snackBar,
  };
};

describe('PantryPage', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
    vi.restoreAllMocks();
  });

  it('renders the empty state when there are no items', async () => {
    const { fixture, el } = await setup([]);
    // afterNextRender → store.load → resolves to []
    await flush();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(el.textContent).toContain('Your pantry is empty');
  });

  it('opens the add dialog when the empty-state CTA is clicked', async () => {
    const { fixture, el, component } = await setup([]);
    await flush();
    fixture.detectChanges();
    await fixture.whenStable();

    // Spy on the actual injected MatDialog instance — overriding the
    // module's MatDialog with `useValue` is unreliable because the token
    // is provided transitively by MatDialogModule at the component level.
    const dialog = (component as unknown as { dialog: { open: () => unknown } })
      .dialog;
    const openSpy = vi
      .spyOn(dialog, 'open')
      .mockReturnValue({ afterClosed: () => of(null) } as never);

    const ctas = el.querySelectorAll('button');
    const cta = Array.from(ctas).find((b) =>
      b.textContent?.includes('Add your first ingredient'),
    ) as HTMLButtonElement;
    cta.click();

    expect(openSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ data: { mode: 'add' } }),
    );
  });

  it('renders an "Expired" section above "All items" when expired items exist', async () => {
    const past = buildItem({
      id: 'past',
      expiresAt: new Date(NOW.getTime() - 86_400_000),
    });
    const future = buildItem({
      id: 'fut',
      expiresAt: new Date(NOW.getTime() + 30 * 86_400_000),
    });

    // Pin Date.now without freezing other timers — `vi.useFakeTimers()`
    // would block `afterNextRender` from firing.
    const realDateNow = Date.now;
    Date.now = () => NOW.getTime();
    try {
      const { fixture, el } = await setup([past, future]);
      await flush();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(
        el.querySelector('#pantry-expired-heading')?.textContent,
      ).toContain('Expired (1)');
      expect(el.querySelector('#pantry-all-heading')?.textContent).toContain(
        'All items (2)',
      );
    } finally {
      Date.now = realDateNow;
    }
  });
});
