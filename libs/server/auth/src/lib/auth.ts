import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

import { prisma } from '@kookio/prisma-client/server';
import type { AuthSession } from '@kookio/prisma-client';
import { createAudit, createLogger } from '@kookio/server-logger';

const log = createLogger('trpc', { service: 'server-auth' });
const audit = createAudit({ service: 'server-auth' });

export const getAdminApp = () => {
  if (getApps().length > 0) return getApp();

  const encoded = process.env['FIREBASE_SERVICE_ACCOUNT_JSON_B64'];
  if (!encoded) {
    throw new Error(
      'Firebase Admin: missing env var FIREBASE_SERVICE_ACCOUNT_JSON_B64',
    );
  }

  const serviceAccount = JSON.parse(
    Buffer.from(encoded, 'base64').toString('utf8'),
  );

  return initializeApp({ credential: cert(serviceAccount) });
};

export const getAdminAuth = () => getAuth(getAdminApp());

/**
 * Race a promise against a timeout so a hung dependency (e.g. Firebase's
 * public-key refresh fetch) can't pin a serverless function. On timeout the
 * promise rejects, which the caller treats as a verification failure (deny).
 */
const withTimeout = <T>(
  p: Promise<T>,
  ms: number,
  label: string,
): Promise<T> => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(
      () => reject(new Error(`${label} timed out after ${ms}ms`)),
      ms,
    );
  });
  return Promise.race([p, timeout]).finally(() => {
    if (timer) clearTimeout(timer);
  });
};

export type FirebaseUser = { uid: string; email: string };

export type AuthResolution = {
  firebaseUser: FirebaseUser | null;
  session: AuthSession | null;
};

/**
 * Verify a Firebase ID token and resolve both the trusted identity and the
 * provisioned session. Never throws.
 *
 *   - `firebaseUser` (uid + email) is set as soon as the token verifies and
 *     carries an email claim — even before a DB user exists. `auth.register`
 *     binds the new User row to THIS uid, never to a client-supplied one.
 *   - `session` is the provisioned AuthSession, or null during the registration
 *     window (token valid, DB user not created yet) or if the lookup fails.
 */
export const resolveAuth = async (
  idToken?: string,
): Promise<AuthResolution> => {
  if (!idToken) return { firebaseUser: null, session: null };

  let uid: string;
  let email: string | undefined;

  try {
    const decoded = await withTimeout(
      getAdminAuth().verifyIdToken(idToken),
      8000,
      'verifyIdToken',
    );
    uid = decoded.uid;
    email = decoded.email;
  } catch (err) {
    log.warn({ err }, 'Firebase token verification failed');
    audit.event({ type: 'login_fail', reason: String(err) });
    return { firebaseUser: null, session: null };
  }

  if (!email) {
    log.warn({ uid }, 'Token missing email claim — cannot resolve identity');
    return { firebaseUser: null, session: null };
  }

  const firebaseUser: FirebaseUser = { uid, email };

  const findUserWithProfile = () =>
    prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        amr: true,
        profile: { select: { onboardingDone: true } },
      },
    });

  let user: Awaited<ReturnType<typeof findUserWithProfile>>;

  try {
    user = await findUserWithProfile();
  } catch (err) {
    log.error({ err, email }, 'DB lookup failed during session resolution');
    return { firebaseUser, session: null };
  }

  if (!user) {
    log.warn({ email }, 'Authenticated user not provisioned in DB');
    return { firebaseUser, session: null };
  }

  return {
    firebaseUser,
    session: {
      uid: user.id,
      email: user.email,
      name: user.name ?? null,
      amr: user.amr,
      onboardingDone: user.profile?.onboardingDone ?? false,
    },
  };
};

/**
 * Backward-compatible adapter resolving only the session. Kept for any consumer
 * that doesn't need the decoded identity (and for its existing spec).
 */
export const toSession = async (
  idToken?: string,
): Promise<AuthSession | null> => (await resolveAuth(idToken)).session;
