import { describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { QuickActionsWidgetComponent } from './quick-actions.widget';

const setup = async () => {
  await TestBed.configureTestingModule({
    imports: [QuickActionsWidgetComponent],
    providers: [provideZonelessChangeDetection(), provideRouter([])],
  }).compileComponents();

  const fixture = TestBed.createComponent(QuickActionsWidgetComponent);
  fixture.detectChanges();
  await fixture.whenStable();

  return fixture.nativeElement as HTMLElement;
};

describe('QuickActionsWidgetComponent', () => {
  it('renders three quick action links pointing at the expected routes', async () => {
    const el = await setup();

    const links = Array.from(
      el.querySelectorAll('a[routerLink]'),
    ) as HTMLAnchorElement[];
    expect(links).toHaveLength(3);

    const targets = links.map((a) => a.getAttribute('routerLink'));
    expect(targets).toEqual(['/recipes/match', '/pantry', '/recipes']);

    const labels = links.map((a) => a.textContent?.trim());
    expect(labels?.[0]).toContain('Cook with what I have');
    expect(labels?.[1]).toContain('Manage pantry');
    expect(labels?.[2]).toContain('Browse recipes');
  });

  it('renders the widget heading', async () => {
    const el = await setup();
    expect(el.textContent ?? '').toContain('Quick actions');
  });
});
