import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { IngredientSelectObjectSchema as IngredientSelectObjectSchema } from './objects/IngredientSelect.schema';
import { IngredientWhereUniqueInputObjectSchema as IngredientWhereUniqueInputObjectSchema } from './objects/IngredientWhereUniqueInput.schema';

export const IngredientFindUniqueOrThrowSchema: z.ZodType<Prisma.IngredientFindUniqueOrThrowArgs> =
  z
    .object({
      select: IngredientSelectObjectSchema.optional(),
      where: IngredientWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.IngredientFindUniqueOrThrowArgs>;

export const IngredientFindUniqueOrThrowZodSchema = z
  .object({
    select: IngredientSelectObjectSchema.optional(),
    where: IngredientWhereUniqueInputObjectSchema,
  })
  .strict();
