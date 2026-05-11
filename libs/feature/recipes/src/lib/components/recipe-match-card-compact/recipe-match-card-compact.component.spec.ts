import { describe, expect, it, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import type { RecipeMatchItem } from '@kookio/prisma-client';

import { RecipeMatchCardCompactComponent } from './recipe-match-card-compact.component';

const makeItem = (
  overrides: Partial<RecipeMatchItem> = {},
): RecipeMatchItem => ({
  id: 'r1',
  slug: 'lasagna',
  title: 'Lasagna al forno',
  imageUrl: null,
  prepTimeMinutes: 10,
  cookTimeMinutes: 35,
  servings: 4,
  category: null,
  area: null,
  matchInfo: {
    missingCount: 0,
    missingNames: [],
  },
  ...overrides,
});

const setup = async (item: RecipeMatchItem) => {
  await TestBed.configureTestingModule({
    imports: [RecipeMatchCardCompactComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture = TestBed.createComponent(RecipeMatchCardCompactComponent);
  fixture.componentRef.setInput('item', item);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
};

describe('RecipeMatchCardCompactComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('renders the title', async () => {
    const el = await setup(makeItem({ title: 'Pad Thai' }));
    expect(el.textContent).toContain('Pad Thai');
  });

  it('shows the "Alright" badge when nothing is missing', async () => {
    const el = await setup(
      makeItem({ matchInfo: { missingCount: 0, missingNames: [] } }),
    );
    expect(el.textContent).toContain('Alright');
    expect(el.querySelector('.match-card-compact--complete')).not.toBeNull();
  });

  it('shows the missing count when 1–3 ingredients are missing', async () => {
    const el = await setup(
      makeItem({
        matchInfo: { missingCount: 2, missingNames: ['tomato', 'basil'] },
      }),
    );
    expect(el.textContent).toContain('Missing 2');
    expect(el.querySelector('.match-card-compact--almost')).not.toBeNull();
  });

  it('hides both badges when more than 3 ingredients are missing', async () => {
    const el = await setup(
      makeItem({
        matchInfo: { missingCount: 5, missingNames: [] },
      }),
    );
    expect(el.textContent).not.toContain('Alright');
    expect(el.textContent).not.toContain('Missing');
  });

  it('renders the total time when prep + cook is present', async () => {
    const el = await setup(
      makeItem({ prepTimeMinutes: 5, cookTimeMinutes: 20 }),
    );
    expect(el.textContent).toContain('25 min');
  });

  it('skips the time row when both prep and cook are zero', async () => {
    const el = await setup(
      makeItem({ prepTimeMinutes: 0, cookTimeMinutes: 0 }),
    );
    expect(el.textContent).not.toContain('min');
  });
});
