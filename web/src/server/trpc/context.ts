import { inferAsyncReturnType } from '@trpc/server';
import { PrismaIngredientRepository, prisma } from '@kookio/prisma';

const ingredientRepository = new PrismaIngredientRepository(prisma);

export const createContext = () => ({ ingredientRepository });
export type Context = inferAsyncReturnType<typeof createContext>;
