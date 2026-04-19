import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { signal } from '@angular/core';
import type { User } from 'firebase/auth';

import { AuthStore } from '@kookio/feature-auth';
import AccountPage from './account.page';

const makeAuthStore = (email: string | null = null) => ({
  currentUser: signal<Partial<User> | null>(email ? { email } : null),
  session: signal(null),
  isAuthenticated: signal(!!email),
  loading: signal(false),
  loginError: signal(null),
  logout: vi.fn(),
});

describe('AccountPage', () => {
  let fixture: ComponentFixture<AccountPage>;
  let el: HTMLElement;

  const setup = async (email: string | null = 'user@example.com') => {
    await TestBed.configureTestingModule({
      imports: [AccountPage],
      providers: [{ provide: AuthStore, useValue: makeAuthStore(email) }],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountPage);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  };

  afterEach(() => TestBed.resetTestingModule());

  it('creates the component', async () => {
    await setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the Account heading', async () => {
    await setup();
    expect(el.querySelector('h1')?.textContent?.trim()).toBe('Account');
  });

  it('displays the signed-in email', async () => {
    await setup('user@example.com');
    expect(el.querySelector('strong')?.textContent?.trim()).toBe(
      'user@example.com',
    );
  });

  it('shows nothing in the email slot when currentUser is null', async () => {
    await setup(null);
    expect(el.querySelector('strong')?.textContent?.trim()).toBe('');
  });

  it('renders a sign-out button', async () => {
    await setup();
    const button = el.querySelector('button');
    expect(button).not.toBeNull();
    expect(button?.textContent).toContain('Sign out');
  });
});
