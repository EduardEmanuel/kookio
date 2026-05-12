export type UserId = string;

export type AuditEvent =
  | { type: 'login_success'; uid: UserId }
  | { type: 'login_fail'; reason: string }
  | { type: 'logout'; uid: UserId }
  | { type: 'register'; uid: string };

export type AuthSession = {
  uid: UserId;
  email: string;
  /** User-provided display name; null until set during onboarding. */
  name: string | null;
  amr: string[];
  onboardingDone: boolean;
};
