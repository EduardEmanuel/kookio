import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import CookPage from './cook.[recipeId].page';

const setup = async (recipeId = 'abc-123') => {
  const params$ = new BehaviorSubject<{ recipeId?: string }>({ recipeId });
  await TestBed.configureTestingModule({
    imports: [CookPage],
    providers: [
      { provide: ActivatedRoute, useValue: { params: params$.asObservable() } },
    ],
  }).compileComponents();
  return TestBed.createComponent(CookPage);
};

describe('CookPage', () => {
  let fixture: ComponentFixture<CookPage>;

  afterEach(() => TestBed.resetTestingModule());

  it('renders the recipe id from the route', async () => {
    fixture = await setup('rec-99');
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).toContain('Cook session');
    expect(text).toContain('rec-99');
    expect(text).toContain('/cook/:recipeId');
  });

  it('omits subtitle when no recipeId is present', async () => {
    fixture = await setup('');
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).not.toContain('Recipe:');
  });
});
