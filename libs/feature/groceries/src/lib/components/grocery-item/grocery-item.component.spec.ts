import { describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { GroceryItemComponent } from './grocery-item.component';
import type { GroceryItem } from '../../groceries-trpc';

const item = (overrides: Partial<GroceryItem> = {}): GroceryItem => ({
  ingredientCatalogId: 'flour-id',
  ingredientName: 'Flour',
  ingredientImageUrl: null,
  category: 'GRAINS',
  totalQuantity: 200,
  unit: 'G',
  isBought: false,
  ...overrides,
});

const setup = async (
  data: GroceryItem,
): Promise<{
  el: HTMLElement;
  fixture: ReturnType<typeof TestBed.createComponent<GroceryItemComponent>>;
}> => {
  await TestBed.configureTestingModule({
    imports: [GroceryItemComponent],
    providers: [provideZonelessChangeDetection(), provideAnimationsAsync()],
  }).compileComponents();

  const fixture = TestBed.createComponent(GroceryItemComponent);
  fixture.componentRef.setInput('item', data);
  fixture.detectChanges();
  await fixture.whenStable();

  return { el: fixture.nativeElement as HTMLElement, fixture };
};

describe('GroceryItemComponent', () => {
  it('renders name and a quantity label with unit', async () => {
    const { el } = await setup(item({ totalQuantity: 200, unit: 'G' }));

    expect(el.textContent ?? '').toContain('Flour');
    expect(el.textContent ?? '').toContain('200 g');
  });

  it('omits a unit suffix when unit has no label (PIECE, OTHER)', async () => {
    const { el } = await setup(
      item({ ingredientName: 'Eggs', totalQuantity: 3, unit: 'PIECE' }),
    );

    expect((el.textContent ?? '').trim()).toContain('Eggs');
    // Plain "3" with no trailing unit token.
    expect(el.querySelector('.grocery-item__qty')?.textContent?.trim()).toBe(
      '3',
    );
  });

  it('falls back to "as needed" when both quantity and unit-label are absent', async () => {
    const { el } = await setup(item({ totalQuantity: null, unit: null }));

    expect(el.querySelector('.grocery-item__qty')?.textContent?.trim()).toBe(
      'as needed',
    );
  });

  it('rounds long fractional quantities to two decimals', async () => {
    const { el } = await setup(item({ totalQuantity: 1.3333, unit: 'CUP' }));

    expect(el.querySelector('.grocery-item__qty')?.textContent?.trim()).toBe(
      '1.33 cup',
    );
  });

  it('applies the bought modifier class when isBought is true', async () => {
    const { el } = await setup(item({ isBought: true }));

    expect(el.querySelector('.grocery-item--bought')).not.toBeNull();
  });

  it('emits the catalog id when the checkbox is toggled', async () => {
    const { fixture, el } = await setup(item());
    const spy = vi.fn();
    fixture.componentRef.instance.boughtChange.subscribe(spy);

    const checkbox = el.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement | null;
    checkbox?.click();
    await fixture.whenStable();

    expect(spy).toHaveBeenCalledWith('flour-id');
  });
});
