import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PantryItemSelectObjectSchema as PantryItemSelectObjectSchema } from './objects/PantryItemSelect.schema';
import { PantryItemUpdateManyMutationInputObjectSchema as PantryItemUpdateManyMutationInputObjectSchema } from './objects/PantryItemUpdateManyMutationInput.schema';
import { PantryItemWhereInputObjectSchema as PantryItemWhereInputObjectSchema } from './objects/PantryItemWhereInput.schema';

export const PantryItemUpdateManyAndReturnSchema: z.ZodType<Prisma.PantryItemUpdateManyAndReturnArgs> =
  z
    .object({
      select: PantryItemSelectObjectSchema.optional(),
      data: PantryItemUpdateManyMutationInputObjectSchema,
      where: PantryItemWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.PantryItemUpdateManyAndReturnArgs>;

export const PantryItemUpdateManyAndReturnZodSchema = z
  .object({
    select: PantryItemSelectObjectSchema.optional(),
    data: PantryItemUpdateManyMutationInputObjectSchema,
    where: PantryItemWhereInputObjectSchema.optional(),
  })
  .strict();
