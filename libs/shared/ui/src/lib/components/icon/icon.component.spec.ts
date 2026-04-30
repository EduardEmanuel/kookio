import { describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { KookioIconComponent } from './icon.component';

const createComponent = () => {
  TestBed.configureTestingModule({
    imports: [KookioIconComponent],
    providers: [provideZonelessChangeDetection()],
  });
  return TestBed.createComponent(KookioIconComponent);
};

describe('KookioIconComponent', () => {
  describe('rendering', () => {
    it('renders the ligature name as the mat-icon text content', () => {
      const fixture = createComponent();
      fixture.componentRef.setInput('name', 'arrow_back');
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('mat-icon');
      expect(icon?.textContent?.trim()).toBe('arrow_back');
    });
  });

  describe('filled input', () => {
    it('omits the filled modifier class by default', () => {
      const fixture = createComponent();
      fixture.componentRef.setInput('name', 'home');
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector(
        'mat-icon',
      ) as HTMLElement;
      expect(icon.classList.contains('mat-icon--filled')).toBe(false);
    });

    it('applies the filled modifier class when filled is true', () => {
      const fixture = createComponent();
      fixture.componentRef.setInput('name', 'home');
      fixture.componentRef.setInput('filled', true);
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector(
        'mat-icon',
      ) as HTMLElement;
      expect(icon.classList.contains('mat-icon--filled')).toBe(true);
    });

    it('toggles the filled modifier class reactively when the input changes', () => {
      const fixture = createComponent();
      fixture.componentRef.setInput('name', 'home');
      fixture.componentRef.setInput('filled', true);
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector(
        'mat-icon',
      ) as HTMLElement;
      expect(icon.classList.contains('mat-icon--filled')).toBe(true);

      fixture.componentRef.setInput('filled', false);
      fixture.detectChanges();

      expect(icon.classList.contains('mat-icon--filled')).toBe(false);
    });
  });
});
