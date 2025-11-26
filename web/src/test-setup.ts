import '@analogjs/vitest-angular/setup-zone';
import '@angular/compiler';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';
import { createCallerFactory } from '@trpc/server';
import { TestScheduler } from 'rxjs/testing';
import { expect } from 'vitest';

import { appRouter } from './server/trpc/routers';
import { createContext } from './server/trpc/context';

export const createTestScheduler = () => new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
});

export const callerE2E = createCallerFactory()(appRouter)(createContext());

getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting()
);
