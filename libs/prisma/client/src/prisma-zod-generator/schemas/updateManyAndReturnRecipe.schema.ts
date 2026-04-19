import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeSelectObjectSchema as RecipeSelectObjectSchema } from './objects/RecipeSelect.schema';
import { RecipeUpdateManyMutationInputObjectSchema as RecipeUpdateManyMutationInputObjectSchema } from './objects/RecipeUpdateManyMutationInput.schema';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './objects/RecipeWhereInput.schema';

export const RecipeUpdateManyAndReturnSchema: z.ZodType<Prisma.RecipeUpdateManyAndReturnArgs> =
  z
    .object({
      select: RecipeSelectObjectSchema.optional(),
      data: RecipeUpdateManyMutationInputObjectSchema,
      where: RecipeWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeUpdateManyAndReturnArgs>;

export const RecipeUpdateManyAndReturnZodSchema = z
  .object({
    select: RecipeSelectObjectSchema.optional(),
    data: RecipeUpdateManyMutationInputObjectSchema,
    where: RecipeWhereInputObjectSchema.optional(),
  })
  .strict();
