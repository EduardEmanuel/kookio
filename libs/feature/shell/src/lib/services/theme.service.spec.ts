import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let html: HTMLElement;

  beforeEach(() => {
    localStorage.clear();
    html = document.documentElement;
    html.classList.remove('light', 'dark');
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    html.classList.remove('light', 'dark');
  });

  it('defaults to auto when nothing is stored', () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(ThemeService);
    expect(service.mode()).toBe('auto');
    expect(html.classList.contains('light')).toBe(false);
    expect(html.classList.contains('dark')).toBe(false);
  });

  it('reads the stored mode from localStorage on init', () => {
    localStorage.setItem('kookio-theme', 'dark');
    TestBed.configureTestingModule({});
    const service = TestBed.inject(ThemeService);
    expect(service.mode()).toBe('dark');
    expect(html.classList.contains('dark')).toBe(true);
  });

  it('ignores invalid stored values and falls back to auto', () => {
    localStorage.setItem('kookio-theme', 'rainbow');
    TestBed.configureTestingModule({});
    const service = TestBed.inject(ThemeService);
    expect(service.mode()).toBe('auto');
    expect(html.classList.contains('light')).toBe(false);
    expect(html.classList.contains('dark')).toBe(false);
  });

  describe('setMode', () => {
    it('updates the signal, persists to localStorage, and toggles the class', () => {
      TestBed.configureTestingModule({});
      const service = TestBed.inject(ThemeService);
      service.setMode('light');
      expect(service.mode()).toBe('light');
      expect(localStorage.getItem('kookio-theme')).toBe('light');
      expect(html.classList.contains('light')).toBe(true);
      expect(html.classList.contains('dark')).toBe(false);
    });

    it('switches between light and dark cleanly', () => {
      TestBed.configureTestingModule({});
      const service = TestBed.inject(ThemeService);
      service.setMode('light');
      service.setMode('dark');
      expect(html.classList.contains('light')).toBe(false);
      expect(html.classList.contains('dark')).toBe(true);
    });

    it('strips both classes when set back to auto', () => {
      TestBed.configureTestingModule({});
      const service = TestBed.inject(ThemeService);
      service.setMode('dark');
      service.setMode('auto');
      expect(service.mode()).toBe('auto');
      expect(localStorage.getItem('kookio-theme')).toBe('auto');
      expect(html.classList.contains('light')).toBe(false);
      expect(html.classList.contains('dark')).toBe(false);
    });

    it('ignores invalid values', () => {
      TestBed.configureTestingModule({});
      const service = TestBed.inject(ThemeService);
      service.setMode('light');
      service.setMode('rainbow');
      expect(service.mode()).toBe('light');
      expect(localStorage.getItem('kookio-theme')).toBe('light');
    });
  });
});
