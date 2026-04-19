import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PantryItemUpdateManyMutationInputObjectSchema as PantryItemUpdateManyMutationInputObjectSchema } from './objects/PantryItemUpdateManyMutationInput.schema';
import { PantryItemWhereInputObjectSchema as PantryItemWhereInputObjectSchema } from './objects/PantryItemWhereInput.schema';

export const PantryItemUpdateManySchema: z.ZodType<Prisma.PantryItemUpdateManyArgs> =
  z
    .object({
      data: PantryItemUpdateManyMutationInputObjectSchema,
      where: PantryItemWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.PantryItemUpdateManyArgs>;

export const PantryItemUpdateManyZodSchema = z
  .object({
    data: PantryItemUpdateManyMutationInputObjectSchema,
    where: PantryItemWhereInputObjectSchema.optional(),
  })
  .strict();
