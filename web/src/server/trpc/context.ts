import { inferAsyncReturnType } from '@trpc/server';
import { PrismaIngredientRepository } from '@kookio/prisma-client';

const ingredient = new PrismaIngredientRepository();

export const createContext = () => ({
    repository: { ingredient }
 });
export type Context = inferAsyncReturnType<typeof createContext>;
