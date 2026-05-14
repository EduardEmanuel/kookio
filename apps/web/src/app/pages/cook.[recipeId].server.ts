import type { PageServerLoad } from '@analogjs/router';
import { TRPCError } from '@trpc/server';
import { createError } from 'h3';
import { z } from 'zod';

import { appRouter, createContext } from '@kookio/server-trpc';

const UuidSchema = z.string().uuid();

/**
 * The cook page is gated client-side by `authGuard + onboardingGuard`, but
 * Analog's page-server fetch for client-side navigations is a plain browser
 * `fetch()` — it does NOT carry the Firebase ID token (only the tRPC client's
 * `authAwareFetch` does). So loading auth-only data here would 401 on every
 * routerLink navigation.
 *
 * The fix: load only PUBLIC recipe data here (via `recipes.byId`). The pantry
 * overlay needed for the ingredient-confirm dialog at finish time is fetched
 * client-side by the page component itself, where `authAwareFetch`
 * propagates the token correctly.
 */
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
    const recipe = await caller.recipes.byId({ id: rawId });
    return { recipe };
  } catch (err) {
    if (err instanceof TRPCError && err.code === 'NOT_FOUND') {
      throw createError({ statusCode: 404, statusMessage: 'Recipe not found' });
    }
    throw err;
  }
};
