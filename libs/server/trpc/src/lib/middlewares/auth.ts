import type { Role } from '@kookio/prisma-client';
import { logger } from '@kookio/server-logger';

import { middleware, TRPCError } from '../trpc';

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

export const protectedProcedure = requireAuth;
export const roleProcedure = (roles: Role[]) => requireAnyRole(roles);
