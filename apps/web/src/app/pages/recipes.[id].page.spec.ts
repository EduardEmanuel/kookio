import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import RecipeDetailPage from './recipes.[id].page';

const setup = async (id = 'abc-123') => {
  const params$ = new BehaviorSubject<{ id?: string }>({ id });
  await TestBed.configureTestingModule({
    imports: [RecipeDetailPage],
    providers: [
      { provide: ActivatedRoute, useValue: { params: params$.asObservable() } },
    ],
  }).compileComponents();
  return TestBed.createComponent(RecipeDetailPage);
};

describe('RecipeDetailPage', () => {
  let fixture: ComponentFixture<RecipeDetailPage>;

  afterEach(() => TestBed.resetTestingModule());

  it('renders the recipe id from the route', async () => {
    fixture = await setup('xyz-42');
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).toContain('Recipe');
    expect(text).toContain('xyz-42');
    expect(text).toContain('/recipes/:id');
  });

  it('omits subtitle when no id is present', async () => {
    fixture = await setup('');
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).not.toContain('ID:');
  });
});
