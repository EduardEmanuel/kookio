#!/usr/bin/env tsx
/**
 * Resets a Firebase Authentication user's password via the Admin SDK.
 *
 * Usage:
 *   tsx scripts/reset-user-password.ts <email-or-uid> [new-password]
 *
 * If [new-password] is omitted, a cryptographically-secure random password
 * is generated that satisfies the Firebase password policy:
 *   - at least one uppercase
 *   - at least one lowercase
 *   - at least one digit
 *   - at least one special character
 *
 * Required env vars:
 *   FIREBASE_SERVICE_ACCOUNT_JSON_B64  - base64-encoded service-account.json
 *   NG_APP_FIREBASE_PROJECT_ID         - e.g. "kookio-dev"
 */
import { randomInt } from 'node:crypto';
import { initializeApp, cert, type ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const GENERATED_PASSWORD_LENGTH = 24;

const CHARSETS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  digit: '0123456789',
  // Conservative set — all unambiguously "special" and shell/URL/JSON safe
  symbol: '!@#$%^&*_-+=?',
} as const;

const ALL_CHARS = Object.values(CHARSETS).join('');

/** Uniform random pick from a string, using the system CSPRNG. */
const pickFrom = (chars: string): string => {
  return chars[randomInt(chars.length)];
};

/** Fisher-Yates shuffle backed by crypto.randomInt (no modulo bias). */
const shuffle = <T>(arr: T[]): T[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/**
 * Generates a random password that is guaranteed to contain at least one
 * character from each required category (upper, lower, digit, symbol).
 */
const generatePassword = (length = GENERATED_PASSWORD_LENGTH): string => {
  const categories = Object.values(CHARSETS);
  if (length < categories.length) {
    throw new Error(
      `length must be >= ${categories.length} to satisfy all categories`,
    );
  }

  const required = categories.map(pickFrom);
  const rest = Array.from({ length: length - required.length }, () =>
    pickFrom(ALL_CHARS),
  );

  return shuffle([...required, ...rest]).join('');
};

const projectId = process.env.NG_APP_FIREBASE_PROJECT_ID;
const serviceAccountB64 = process.env.FIREBASE_SERVICE_ACCOUNT_JSON_B64;

if (!projectId) {
  console.error('❌ NG_APP_FIREBASE_PROJECT_ID is not set.');
  process.exit(1);
}

if (!serviceAccountB64) {
  console.error('❌ FIREBASE_SERVICE_ACCOUNT_JSON_B64 is not set.');
  process.exit(1);
}

// Safety net: prevent accidental runs against production
if (/prod(uction)?/i.test(projectId)) {
  console.error(
    `❌ Refused: "${projectId}" looks like the production environment.`,
  );
  console.error('   Comment out this check if that is actually your intent.');
  process.exit(1);
}

const [identifier, providedPassword] = process.argv.slice(2);

if (!identifier) {
  console.error(
    'Usage: tsx scripts/reset-user-password.ts <email-or-uid> [new-password]',
  );
  process.exit(1);
}

const wasGenerated = !providedPassword;
const newPassword = providedPassword ?? generatePassword();

if (newPassword.length < 6) {
  console.error(
    '❌ Firebase requires a minimum of 6 characters for passwords.',
  );
  process.exit(1);
}

let serviceAccount: ServiceAccount;
try {
  const decoded = Buffer.from(serviceAccountB64, 'base64').toString('utf-8');
  serviceAccount = JSON.parse(decoded) as ServiceAccount;
} catch (err) {
  console.error('❌ Failed to decode FIREBASE_SERVICE_ACCOUNT_JSON_B64:', err);
  process.exit(1);
}

initializeApp({
  credential: cert(serviceAccount),
  projectId,
});

const auth = getAuth();

try {
  const user = identifier.includes('@')
    ? await auth.getUserByEmail(identifier)
    : await auth.getUser(identifier);

  await auth.updateUser(user.uid, { password: newPassword });

  // Optional: invalidate all active sessions for this user
  await auth.revokeRefreshTokens(user.uid);

  console.log(
    `✅ Password updated for ${user.email ?? user.uid} (project: ${projectId})`,
  );
  console.log('   Existing sessions have been revoked.');

  if (wasGenerated) {
    console.log('');
    console.log(
      '🔐 Generated password (save it now — it is not stored anywhere):',
    );
    console.log(`   ${newPassword}`);
  }
} catch (err) {
  const code = (err as { code?: string }).code;
  if (code === 'auth/user-not-found') {
    console.error(`❌ No user found with identifier "${identifier}".`);
  } else {
    console.error('❌ Error:', err);
  }
  process.exit(1);
}
