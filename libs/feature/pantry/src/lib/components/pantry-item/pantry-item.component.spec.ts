import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import {
  IngredientCategorySchema,
  MeasureUnitSchema,
  type PantryItemWithIngredient,
} from '@kookio/prisma-client';

import { PantryItemComponent } from './pantry-item.component';

const Unit = MeasureUnitSchema.enum;
const Category = IngredientCategorySchema.enum;

const NOW = new Date('2026-05-03T12:00:00.000Z');

const baseItem: PantryItemWithIngredient = {
  id: 'pi-1',
  userId: 'user-1',
  ingredientCatalogId: 'ing-1',
  quantity: 250,
  unit: Unit.G,
  expiresAt: null,
  addedAt: new Date('2026-05-01T00:00:00.000Z'),
  updatedAt: new Date('2026-05-01T00:00:00.000Z'),
  ingredient: {
    id: 'ing-1',
    name: 'Tomato',
    imageUrl: null,
    category: Category.VEGETABLES,
  },
};

const setup = async (item: PantryItemWithIngredient) => {
  await TestBed.configureTestingModule({
    imports: [PantryItemComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture = TestBed.createComponent(PantryItemComponent);
  fixture.componentRef.setInput('item', item);
  fixture.detectChanges();
  await fixture.whenStable();

  return {
    fixture,
    el: fixture.nativeElement as HTMLElement,
    component: fixture.componentInstance,
  };
};

describe('PantryItemComponent', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
    TestBed.resetTestingModule();
    vi.restoreAllMocks();
  });

  describe('rendering', () => {
    it('renders the ingredient name and quantity with unit', async () => {
      const { el } = await setup(baseItem);
      expect(el.querySelector('.pantry-item__name')?.textContent).toContain(
        'Tomato',
      );
      const qty = el.querySelector('.pantry-item__qty')?.textContent ?? '';
      expect(qty).toContain('250');
      expect(qty).toContain('g');
    });

    it('omits the unit span entirely for unit=PIECE', async () => {
      const { el } = await setup({
        ...baseItem,
        quantity: 3,
        unit: Unit.PIECE,
      });
      expect(el.querySelector('.pantry-item__unit')).toBeNull();
      expect(el.querySelector('.pantry-item__qty')?.textContent).toContain('3');
    });

    it('renders the placeholder when imageUrl is null', async () => {
      const { el } = await setup(baseItem);
      expect(el.querySelector('img.pantry-item__image')).toBeNull();
      expect(el.querySelector('.pantry-item__placeholder')).toBeTruthy();
    });

    it('renders the image when imageUrl is set', async () => {
      const { el } = await setup({
        ...baseItem,
        ingredient: {
          ...baseItem.ingredient,
          imageUrl: 'https://x.test/t.jpg',
        },
      });
      const img = el.querySelector('img.pantry-item__image');
      expect(img).toBeTruthy();
      expect(img?.getAttribute('alt')).toBe('Tomato');
    });
  });

  describe('expiration status', () => {
    it('applies pantry-item--ok for dates more than 7 days out', async () => {
      const { el } = await setup({
        ...baseItem,
        expiresAt: new Date(NOW.getTime() + 30 * 86_400_000),
      });
      expect(el.querySelector('.pantry-item--ok')).toBeTruthy();
    });

    it('applies pantry-item--soon for dates within 1–7 days', async () => {
      const { el } = await setup({
        ...baseItem,
        expiresAt: new Date(NOW.getTime() + 3 * 86_400_000),
      });
      expect(el.querySelector('.pantry-item--soon')).toBeTruthy();
      expect(el.querySelector('.pantry-item__expiry')?.textContent).toContain(
        'Expires in 3d',
      );
    });

    it('applies pantry-item--expired for past dates', async () => {
      const { el } = await setup({
        ...baseItem,
        expiresAt: new Date(NOW.getTime() - 2 * 86_400_000),
      });
      expect(el.querySelector('.pantry-item--expired')).toBeTruthy();
      expect(el.querySelector('.pantry-item__expiry')?.textContent).toContain(
        'Expired 2d ago',
      );
    });

    it('applies pantry-item--none and omits expiry label when no date is set', async () => {
      const { el } = await setup(baseItem);
      expect(el.querySelector('.pantry-item--none')).toBeTruthy();
      expect(el.querySelector('.pantry-item__expiry')).toBeNull();
    });
  });

  describe('actions', () => {
    it('emits edit with the full item when the edit button is clicked', async () => {
      const { fixture, el } = await setup(baseItem);
      const spy = vi.fn();
      fixture.componentInstance.edit.subscribe(spy);

      const editBtn = el.querySelector(
        'button[aria-label="Edit Tomato"]',
      ) as HTMLButtonElement;
      editBtn.click();

      expect(spy).toHaveBeenCalledWith(baseItem);
    });

    it('emits remove with the item id when the user confirms the prompt', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(true);
      const { fixture, el } = await setup(baseItem);
      const spy = vi.fn();
      fixture.componentInstance.remove.subscribe(spy);

      const removeBtn = el.querySelector(
        'button[aria-label="Remove Tomato"]',
      ) as HTMLButtonElement;
      removeBtn.click();

      expect(window.confirm).toHaveBeenCalledWith('Remove Tomato from pantry?');
      expect(spy).toHaveBeenCalledWith('pi-1');
    });

    it('does not emit remove when the user cancels the prompt', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(false);
      const { fixture, el } = await setup(baseItem);
      const spy = vi.fn();
      fixture.componentInstance.remove.subscribe(spy);

      const removeBtn = el.querySelector(
        'button[aria-label="Remove Tomato"]',
      ) as HTMLButtonElement;
      removeBtn.click();

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
