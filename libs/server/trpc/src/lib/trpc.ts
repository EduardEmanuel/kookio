import { initTRPC, TRPCError } from '@trpc/server';

import { TRPC_TRANSFORMER } from '../configs';
import type { Context } from './context';

const t = initTRPC.context<Context>().create({
  transformer: TRPC_TRANSFORMER,
});

export const { middleware, procedure, router } = t;

export { TRPCError };
