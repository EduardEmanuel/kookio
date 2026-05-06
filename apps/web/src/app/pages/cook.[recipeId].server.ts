import type { PageServerLoad } from '@analogjs/router';
import { TRPCError } from '@trpc/server';
import { createError } from 'h3';
import { z } from 'zod';

import { appRouter, createContext } from '@kookio/server-trpc';

const UuidSchema = z.string().uuid();

export const load = async ({ params, event }: PageServerLoad) => {
  const rawId = (params?.['recipeId'] as string | undefined)?.trim() ?? '';
  // A non-UUID slug cannot resolve to a real row — surface as 404 rather
  // than letting it through to the input validator and leaking a 400.
  if (!UuidSchema.safeParse(rawId).success) {
    throw createError({ statusCode: 404, statusMessage: 'Recipe not found' });
  }

  const ctx = await createContext({ node: event.node });
  const caller = appRouter.createCaller(ctx);

  try {
    const recipe = await caller.cookingSession.getRecipeForSession({
      recipeId: rawId,
    });
    return { recipe };
  } catch (err) {
    if (err instanceof TRPCError) {
      if (err.code === 'NOT_FOUND') {
        throw createError({
          statusCode: 404,
          statusMessage: 'Recipe not found',
        });
      }
      // Auth + onboarding are enforced by `onboardedProcedure` upstream;
      // a guarded route would normally redirect on the client first, so
      // these only fire on direct deep-link without a client guard hop.
      if (err.code === 'UNAUTHORIZED') {
        throw createError({ statusCode: 401, statusMessage: 'Login required' });
      }
      if (err.code === 'FORBIDDEN') {
        throw createError({
          statusCode: 412,
          statusMessage: 'Onboarding required',
        });
      }
    }
    throw err;
  }
};
