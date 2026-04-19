import z from 'zod';

import { createAudit, createLogger } from '@kookio/server-logger';
import { role, type Role } from '@kookio/prisma-client/dtos';

import { procedure, router, TRPCError } from '../trpc';
import { requireAuth } from '../middlewares/auth';

const log = createLogger('trpc', { router: 'auth' });
const audit = createAudit({ router: 'auth' });

const RegisterInputSchema = z.object({
  email: z.string().email(),
  firebaseUid: z.string().min(1),
});

const SessionSchema = z.object({
  uid: z.string(),
  email: z.string(),
  roles: z.array(z.nativeEnum(role)),
  amr: z.array(z.string()),
});

export const auth = router({
  /**
   * Public — called right after Firebase createUserWithEmailAndPassword.
   * Creates the DB user if it doesn't exist yet.
   * Returns the session-shaped payload (roles, amr).
   */
  register: procedure
    .input(RegisterInputSchema)
    .output(SessionSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, firebaseUid } = input;

      try {
        const existing = await ctx.repository.user.findUnique({
          where: { email },
        });

        if (existing) {
          audit.event({ type: 'register', uid: existing.id });
          return {
            uid: existing.id,
            email: existing.email,
            roles: existing.roles as Role[],
            amr: existing.amr,
          };
        }

        const created = await ctx.repository.user.create({
          data: {
            id: firebaseUid,
            email,
            roles: { set: [role.USER] },
            amr: [],
          },
        });

        audit.event({ type: 'register', uid: created.id });

        return {
          uid: created.id,
          email: created.email,
          roles: created.roles as Role[],
          amr: created.amr,
        };
      } catch (err) {
        log.error({ err, email }, 'auth.register failed');
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to provision user',
          cause: err,
        });
      }
    }),

  /**
   * Protected — returns the current session (uid, email, roles, amr).
   * Used by the client after login/register to populate AuthStore.
   */
  me: procedure
    .use(requireAuth)
    .output(SessionSchema)
    .query(({ ctx }) => {
      const s = ctx.session!;
      return {
        uid: s.uid,
        email: s.email,
        roles: s.roles,
        amr: s.amr,
      };
    }),
});
