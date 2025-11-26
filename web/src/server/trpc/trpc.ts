import { initTRPC } from '@trpc/server';
import { Context } from './context';
import { SuperJSON } from 'superjson';

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
});

export const { createCallerFactory, middleware, procedure, router } = t