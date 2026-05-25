import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

import {
  GROCERIES_TRPC,
  type GroceriesStats,
  type GroceriesTrpcClient,
} from '@kookio/feature-groceries/trpc';

import { GroceriesCountWidgetComponent } from './groceries-count.widget';

interface StatsBehaviour {
  next?: GroceriesStats;
  error?: boolean;
}

const buildTrpc = (b: StatsBehaviour): GroceriesTrpcClient => ({
  groceries: {
    list: {
      query: vi.fn().mockResolvedValue({ items: [], boughtAvailable: true }),
    },
    toggleBought: { mutate: vi.fn() },
    addBoughtToPantry: { mutate: vi.fn() },
    stats: {
      // The widget treats the return value as an Observable via `from(...)`.
      // `from(observable)` is a no-op, so handing back a real Observable here
      // matches the runtime shape (analog client) without depending on a
      // Promise->Observable upgrade.
      query: vi.fn(() =>
        b.error ? throwError(() => new Error('boom')) : of(b.next!),
      ) as unknown as GroceriesTrpcClient['groceries']['stats']['query'],
    },
  },
});

const setup = async (b: StatsBehaviour) => {
  await TestBed.configureTestingModule({
    imports: [GroceriesCountWidgetComponent],
    providers: [
      provideZonelessChangeDetection(),
      provideAnimationsAsync(),
      provideRouter([]),
      { provide: GROCERIES_TRPC, useValue: buildTrpc(b) },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(GroceriesCountWidgetComponent);
  fixture.detectChanges();
  await fixture.whenStable();
  // afterNextRender fires async; one more flush so the post-fetch state lands.
  fixture.detectChanges();
  await fixture.whenStable();

  return fixture.nativeElement as HTMLElement;
};

describe('GroceriesCountWidgetComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('shows the "All set!" message when total is zero', async () => {
    const el = await setup({ next: { total: 0, remaining: 0 } });

    expect(el.textContent ?? '').toContain('Groceries');
    expect(el.textContent ?? '').toContain('All set!');
  });

  it('shows the remaining-items count when there are items needed', async () => {
    const el = await setup({ next: { total: 12, remaining: 8 } });

    expect(el.textContent ?? '').toContain('8 items needed');
  });

  it('uses the singular "item" form when remaining is exactly 1', async () => {
    const el = await setup({ next: { total: 5, remaining: 1 } });

    expect(el.textContent ?? '').toContain('1 item needed');
    expect(el.textContent ?? '').not.toContain('1 items needed');
  });

  it('falls back to a non-blocking error message if the stats fetch fails', async () => {
    const el = await setup({ error: true });

    expect(el.textContent ?? '').toContain('Could not load');
  });

  it('always renders the "View list" link pointing at /groceries', async () => {
    const el = await setup({ next: { total: 0, remaining: 0 } });

    const cta = el.querySelector('a.groceries-count__cta');
    expect(cta).not.toBeNull();
    expect(cta?.getAttribute('href')).toBe('/groceries');
    expect(cta?.textContent ?? '').toContain('View list');
  });
});
