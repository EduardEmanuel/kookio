import type { PageServerLoad } from '@analogjs/router';
import { TRPCError } from '@trpc/server';
import { createError } from 'h3';
import { z } from 'zod';

import { appRouter, createContext } from '@kookio/server-trpc';

const UuidSchema = z.string().uuid();

export const load = async ({ params, event }: PageServerLoad) => {
  const rawId = (params?.['id'] as string | undefined)?.trim() ?? '';
  // A non-UUID slug in the URL means the row cannot exist — surface as 404
  // rather than leaking a 400 BAD_REQUEST from the input validator.
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
