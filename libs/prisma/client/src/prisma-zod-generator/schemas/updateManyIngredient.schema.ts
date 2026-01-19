import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { IngredientUpdateManyMutationInputObjectSchema as IngredientUpdateManyMutationInputObjectSchema } from './objects/IngredientUpdateManyMutationInput.schema';
import { IngredientWhereInputObjectSchema as IngredientWhereInputObjectSchema } from './objects/IngredientWhereInput.schema';

export const IngredientUpdateManySchema: z.ZodType<Prisma.IngredientUpdateManyArgs> =
  z
    .object({
      data: IngredientUpdateManyMutationInputObjectSchema,
      where: IngredientWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.IngredientUpdateManyArgs>;

export const IngredientUpdateManyZodSchema = z
  .object({
    data: IngredientUpdateManyMutationInputObjectSchema,
    where: IngredientWhereInputObjectSchema.optional(),
  })
  .strict();
