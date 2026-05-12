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
 * Resolve a Firebase ID token to an AuthSession.
 * Returns null (never throws) when:
 *   - token is absent or invalid
 *   - decoded token has no email claim
 *   - user not yet provisioned in DB
 */
export const toSession = async (
  idToken?: string,
): Promise<AuthSession | null> => {
  if (!idToken) return null;

  let uid = '';
  let email: string | undefined;

  try {
    const decoded = await getAdminAuth().verifyIdToken(idToken);
    uid = decoded.uid;
    email = decoded.email;
  } catch (err) {
    log.warn({ err }, 'Firebase token verification failed');
    audit.event({ type: 'login_fail', reason: String(err) });
    return null;
  }

  if (!email) {
    log.warn({ uid }, 'Token missing email claim — cannot resolve session');
    return null;
  }

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
    return null;
  }

  if (!user) {
    log.warn({ email }, 'Authenticated user not provisioned in DB');
    return null;
  }

  return {
    uid: user.id,
    email: user.email,
    name: user.name ?? null,
    amr: user.amr,
    onboardingDone: user.profile?.onboardingDone ?? false,
  };
};
