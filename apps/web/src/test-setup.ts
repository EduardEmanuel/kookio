import '@analogjs/vitest-angular/setup-zone';
import '@angular/compiler';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';
import { TestScheduler } from 'rxjs/testing';
import { expect } from 'vitest';

export const createTestScheduler = () => new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
});

getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting()
);
