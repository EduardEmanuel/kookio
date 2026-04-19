import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './objects/RecipeWhereInput.schema';

export const RecipeDeleteManySchema: z.ZodType<Prisma.RecipeDeleteManyArgs> = z
  .object({ where: RecipeWhereInputObjectSchema.optional() })
  .strict() as unknown as z.ZodType<Prisma.RecipeDeleteManyArgs>;

export const RecipeDeleteManyZodSchema = z
  .object({ where: RecipeWhereInputObjectSchema.optional() })
  .strict();
