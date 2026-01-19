import { Role } from '@kookio/core-security';

import { middleware, TRPCError } from '../trpc';

export const requireAuth = middleware(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({ ctx: { ...ctx, session: ctx.session } });
});

export const requireRole = (roles: Role[]) =>
  middleware(({ ctx, next }) => {
    const session = ctx.session;
    if (!session) throw new TRPCError({ code: 'UNAUTHORIZED' });
    const ok = session.roles.some((r: Role) => roles.includes(r));
    if (!ok) {
      throw new TRPCError({ code: 'FORBIDDEN' });
    }
    return next();
  });
