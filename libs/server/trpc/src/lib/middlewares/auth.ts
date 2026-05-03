import type { Role } from '@kookio/prisma-client';
import { logger } from '@kookio/server-logger';

import { middleware, procedure, TRPCError } from '../trpc';

export const requireAuth = middleware(({ ctx, next }) => {
  if (!ctx.session) {
    logger
      ?.child({ ns: 'trpc' })
      .warn({ code: 'UNAUTHORIZED' }, 'Unauthorized');
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({ ctx: { ...ctx, session: ctx.session } });
});

export const requireAnyRole = (roles: Role[]) =>
  middleware(({ ctx, next, path }) => {
    const s = ctx.session;
    if (!s) throw new TRPCError({ code: 'UNAUTHORIZED' });

    const ok = s.roles.some((r) => roles.includes(r));
    if (!ok) {
      logger
        ?.child({ ns: 'audit', path })
        .info(
          { audit: true, type: 'role_denied', uid: s.uid, need: roles },
          'role_denied',
        );
      throw new TRPCError({ code: 'FORBIDDEN' });
    }
    return next();
  });

export const requireOnboarding = middleware(({ ctx, next }) => {
  if (!ctx.session) throw new TRPCError({ code: 'UNAUTHORIZED' });
  if (!ctx.session.onboardingDone) {
    throw new TRPCError({
      code: 'PRECONDITION_FAILED',
      message: 'Onboarding not complete',
    });
  }
  return next({ ctx: { ...ctx, session: ctx.session } });
});

// Procedure builders. Routers should import these instead of composing
// `procedure.use(requireAuth)` inline. See `.ai/11_trpc.md` for the convention.
export const protectedProcedure = procedure.use(requireAuth);
export const onboardedProcedure = protectedProcedure.use(requireOnboarding);
export const roleProcedure = (roles: Role[]) =>
  protectedProcedure.use(requireAnyRole(roles));
