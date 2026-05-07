import { describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { ShoppingCountWidgetComponent } from './shopping-count.widget';

const setup = async () => {
  await TestBed.configureTestingModule({
    imports: [ShoppingCountWidgetComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture = TestBed.createComponent(ShoppingCountWidgetComponent);
  fixture.detectChanges();
  await fixture.whenStable();

  return fixture.nativeElement as HTMLElement;
};

describe('ShoppingCountWidgetComponent', () => {
  it('renders the placeholder count and a disabled CTA', async () => {
    const el = await setup();

    expect(el.textContent ?? '').toContain('Shopping list');
    expect(el.textContent ?? '').toContain('0 items');

    const cta = el.querySelector('button[disabled]');
    expect(cta).not.toBeNull();
    expect(cta?.textContent ?? '').toContain('View list');
  });
});
