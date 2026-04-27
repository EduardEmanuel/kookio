import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { TestBed, type ComponentFixture } from '@angular/core/testing';

import PantryPage from './pantry.page';

describe('PantryPage', () => {
  let fixture: ComponentFixture<PantryPage>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PantryPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PantryPage);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  });

  afterEach(() => TestBed.resetTestingModule());

  it('creates the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the Pantry stub', () => {
    const text = el.textContent ?? '';
    expect(text).toContain('Pantry');
    expect(text).toContain('/pantry');
  });
});
