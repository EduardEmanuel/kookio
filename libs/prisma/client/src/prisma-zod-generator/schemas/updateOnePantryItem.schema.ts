import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PantryItemSelectObjectSchema as PantryItemSelectObjectSchema } from './objects/PantryItemSelect.schema';
import { PantryItemIncludeObjectSchema as PantryItemIncludeObjectSchema } from './objects/PantryItemInclude.schema';
import { PantryItemUpdateInputObjectSchema as PantryItemUpdateInputObjectSchema } from './objects/PantryItemUpdateInput.schema';
import { PantryItemUncheckedUpdateInputObjectSchema as PantryItemUncheckedUpdateInputObjectSchema } from './objects/PantryItemUncheckedUpdateInput.schema';
import { PantryItemWhereUniqueInputObjectSchema as PantryItemWhereUniqueInputObjectSchema } from './objects/PantryItemWhereUniqueInput.schema';

export const PantryItemUpdateOneSchema: z.ZodType<Prisma.PantryItemUpdateArgs> =
  z
    .object({
      select: PantryItemSelectObjectSchema.optional(),
      include: PantryItemIncludeObjectSchema.optional(),
      data: z.union([
        PantryItemUpdateInputObjectSchema,
        PantryItemUncheckedUpdateInputObjectSchema,
      ]),
      where: PantryItemWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.PantryItemUpdateArgs>;

export const PantryItemUpdateOneZodSchema = z
  .object({
    select: PantryItemSelectObjectSchema.optional(),
    include: PantryItemIncludeObjectSchema.optional(),
    data: z.union([
      PantryItemUpdateInputObjectSchema,
      PantryItemUncheckedUpdateInputObjectSchema,
    ]),
    where: PantryItemWhereUniqueInputObjectSchema,
  })
  .strict();
