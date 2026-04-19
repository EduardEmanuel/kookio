import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PantryItemSelectObjectSchema as PantryItemSelectObjectSchema } from './objects/PantryItemSelect.schema';
import { PantryItemIncludeObjectSchema as PantryItemIncludeObjectSchema } from './objects/PantryItemInclude.schema';
import { PantryItemWhereUniqueInputObjectSchema as PantryItemWhereUniqueInputObjectSchema } from './objects/PantryItemWhereUniqueInput.schema';
import { PantryItemCreateInputObjectSchema as PantryItemCreateInputObjectSchema } from './objects/PantryItemCreateInput.schema';
import { PantryItemUncheckedCreateInputObjectSchema as PantryItemUncheckedCreateInputObjectSchema } from './objects/PantryItemUncheckedCreateInput.schema';
import { PantryItemUpdateInputObjectSchema as PantryItemUpdateInputObjectSchema } from './objects/PantryItemUpdateInput.schema';
import { PantryItemUncheckedUpdateInputObjectSchema as PantryItemUncheckedUpdateInputObjectSchema } from './objects/PantryItemUncheckedUpdateInput.schema';

export const PantryItemUpsertOneSchema: z.ZodType<Prisma.PantryItemUpsertArgs> =
  z
    .object({
      select: PantryItemSelectObjectSchema.optional(),
      include: PantryItemIncludeObjectSchema.optional(),
      where: PantryItemWhereUniqueInputObjectSchema,
      create: z.union([
        PantryItemCreateInputObjectSchema,
        PantryItemUncheckedCreateInputObjectSchema,
      ]),
      update: z.union([
        PantryItemUpdateInputObjectSchema,
        PantryItemUncheckedUpdateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.PantryItemUpsertArgs>;

export const PantryItemUpsertOneZodSchema = z
  .object({
    select: PantryItemSelectObjectSchema.optional(),
    include: PantryItemIncludeObjectSchema.optional(),
    where: PantryItemWhereUniqueInputObjectSchema,
    create: z.union([
      PantryItemCreateInputObjectSchema,
      PantryItemUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      PantryItemUpdateInputObjectSchema,
      PantryItemUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict();
