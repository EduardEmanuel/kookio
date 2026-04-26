import { z } from 'zod';

import { procedure, router } from '../trpc';
// use your choice of helpers from @simplewebauthn/server later

export const webauthn = router({
  generateRegistrationOptions: procedure.mutation(async ({ ctx }) => {
    // TODO: generate options using RP config & user
    return {
      /* challenge, rp, user, pubKeyCredParams, ... */
    };
  }),
  verifyRegistration: procedure
    .input(
      z.object({
        /* response shape */
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // TODO: verify, then store credentialId/publicKey/counter
      // await prisma.webAuthnCredential.create({...})
      return { ok: true };
    }),
  generateAuthenticationOptions: procedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      // TODO: lookup user + their credentials, generate options
      return {
        /* challenge, allowCredentials, ... */
      };
    }),
  verifyAuthentication: procedure
    .input(
      z.object({
        /* response */
      }),
    )
    .mutation(async ({ input }) => {
      // TODO: verify assertion, update counter
      return { ok: true };
    }),
});
