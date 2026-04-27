import { afterEach, describe, expect, it } from 'vitest';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { DeferBlockBehavior } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNgxSkeletonLoader } from 'ngx-skeleton-loader';

import { AuthStore } from '@kookio/feature-auth';
import {
  type MockAuthStoreOptions,
  createMockAuthStore,
} from '@kookio/feature-auth/testing';

import RegisterPage from './register.page';

type RegisterStoreOpts = Pick<
  MockAuthStoreOptions,
  'authReady' | 'loading' | 'registerError' | 'session'
>;

describe('RegisterPage', () => {
  let fixture: ComponentFixture<RegisterPage>;
  let el: HTMLElement;
  let store: ReturnType<typeof createMockAuthStore>;

  const setup = async (storeOpts: RegisterStoreOpts = {}) => {
    store = createMockAuthStore(storeOpts);
    await TestBed.configureTestingModule({
      imports: [RegisterPage],
      deferBlockBehavior: DeferBlockBehavior.Playthrough,
      providers: [
        provideRouter([]),
        provideNgxSkeletonLoader(),
        { provide: AuthStore, useValue: store },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  };

  afterEach(() => TestBed.resetTestingModule());

  it('creates the component', async () => {
    await setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the Create account heading when authReady is true', async () => {
    await setup({ authReady: true });
    expect(el.querySelector('h1')?.textContent).toContain('Create account');
  });

  it('renders email, password and confirm inputs', async () => {
    await setup({ authReady: true });
    expect(el.querySelector('input[name="email"]')).not.toBeNull();
    expect(el.querySelector('input[name="password"]')).not.toBeNull();
    expect(el.querySelector('input[name="confirm"]')).not.toBeNull();
  });

  it('renders a link back to the login page', async () => {
    await setup({ authReady: true });
    expect(el.querySelector('a[href="/login"]')).not.toBeNull();
  });

  it('disables the submit button while loading', async () => {
    await setup({ authReady: true, loading: true });
    const button = el.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    expect(button?.disabled).toBe(true);
  });

  it('shows the register error message when present', async () => {
    await setup({ authReady: true, registerError: 'Email already in use' });
    expect(el.textContent).toContain('Email already in use');
  });

  it('calls authStore.register when passwords match', async () => {
    await setup({ authReady: true });
    const instance = fixture.componentInstance as unknown as {
      email: string;
      password: string;
      confirm: string;
      onSubmit: () => void;
    };
    instance.email = 'new@example.com';
    instance.password = 'pass1234';
    instance.confirm = 'pass1234';
    instance.onSubmit();
    expect(store.register).toHaveBeenCalledWith({
      email: 'new@example.com',
      password: 'pass1234',
    });
  });

  it('does not call register and shows mismatch error when passwords differ', async () => {
    await setup({ authReady: true });
    const instance = fixture.componentInstance as unknown as {
      email: string;
      password: string;
      confirm: string;
      passwordMismatch: boolean;
      onSubmit: () => void;
    };
    instance.email = 'new@example.com';
    instance.password = 'pass1234';
    instance.confirm = 'different';
    instance.onSubmit();
    expect(store.register).not.toHaveBeenCalled();
    expect(instance.passwordMismatch).toBe(true);
  });

  it('does not call register when email is empty', async () => {
    await setup({ authReady: true });
    const instance = fixture.componentInstance as unknown as {
      email: string;
      password: string;
      confirm: string;
      onSubmit: () => void;
    };
    instance.email = '';
    instance.password = 'pass1234';
    instance.confirm = 'pass1234';
    instance.onSubmit();
    expect(store.register).not.toHaveBeenCalled();
  });
});
