import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeUpdateManyMutationInputObjectSchema as RecipeUpdateManyMutationInputObjectSchema } from './objects/RecipeUpdateManyMutationInput.schema';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './objects/RecipeWhereInput.schema';

export const RecipeUpdateManySchema: z.ZodType<Prisma.RecipeUpdateManyArgs> = z
  .object({
    data: RecipeUpdateManyMutationInputObjectSchema,
    where: RecipeWhereInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.RecipeUpdateManyArgs>;

export const RecipeUpdateManyZodSchema = z
  .object({
    data: RecipeUpdateManyMutationInputObjectSchema,
    where: RecipeWhereInputObjectSchema.optional(),
  })
  .strict();
