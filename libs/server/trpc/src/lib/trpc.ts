import { initTRPC, TRPCError } from '@trpc/server';
import { ZodError } from 'zod';

import { TRPC_TRANSFORMER } from '../configs';
import type { Context } from './context';

export const t = initTRPC.context<Context>().create({
  transformer: TRPC_TRANSFORMER,
  errorFormatter: ({ shape, error }) => {
    const zodIssues =
      error.cause instanceof ZodError ? error.cause.issues : null;

    return { ...shape, data: { ...shape.data, zodError: zodIssues } };
  },
});

export const { middleware, procedure, router } = t;
// semantic sugar
export const publicProcedure = t.procedure;

export { TRPCError };
