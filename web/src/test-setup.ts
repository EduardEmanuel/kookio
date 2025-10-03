import '@angular/compiler';
import '@analogjs/vitest-angular/setup-zone';
import { TestScheduler } from 'rxjs/testing';
import { expect } from 'vitest';

import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';
import { getTestBed } from '@angular/core/testing';

export const createTestScheduler = () => new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
});

getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting()
);
