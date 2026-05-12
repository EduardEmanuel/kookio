import z from 'zod';

import { createAudit, createLogger } from '@kookio/server-logger';

import { procedure, router, TRPCError } from '../trpc';
import { protectedProcedure } from '../middlewares/auth';

const log = createLogger('trpc', { router: 'auth' });
const audit = createAudit({ router: 'auth' });

const RegisterInputSchema = z.object({
  email: z.string().email(),
  firebaseUid: z.string().min(1),
});

const SessionSchema = z.object({
  uid: z.string(),
  email: z.string(),
  name: z.string().nullable(),
  amr: z.array(z.string()),
  onboardingDone: z.boolean(),
});

export const auth = router({
  /**
   * Public — called right after Firebase createUserWithEmailAndPassword.
   * Creates the DB user if it doesn't exist yet. Returns the
   * session-shaped payload (amr, onboardingDone).
   */
  register: procedure
    .input(RegisterInputSchema)
    .output(SessionSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, firebaseUid } = input;

      try {
        const existing = await ctx.prisma.user.findUnique({
          where: { email },
          include: { profile: { select: { onboardingDone: true } } },
        });

        if (existing) {
          audit.event({ type: 'register', uid: existing.id });
          return {
            uid: existing.id,
            email: existing.email,
            name: existing.name ?? null,
            amr: existing.amr,
            onboardingDone: existing.profile?.onboardingDone ?? false,
          };
        }

        const created = await ctx.prisma.user.create({
          data: {
            id: firebaseUid,
            email,
            amr: [],
          },
        });

        audit.event({ type: 'register', uid: created.id });

        return {
          uid: created.id,
          email: created.email,
          name: created.name ?? null,
          amr: created.amr,
          onboardingDone: false,
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
   * Protected — returns the current session (uid, email, name, amr,
   * onboardingDone). Used by the client after login/register to populate
   * AuthStore.
   */
  me: protectedProcedure.output(SessionSchema).query(({ ctx }) => {
    const s = ctx.session!;
    return {
      uid: s.uid,
      email: s.email,
      name: s.name,
      amr: s.amr,
      onboardingDone: s.onboardingDone,
    };
  }),
});
