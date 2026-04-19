import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PantryItemSelectObjectSchema as PantryItemSelectObjectSchema } from './objects/PantryItemSelect.schema';
import { PantryItemIncludeObjectSchema as PantryItemIncludeObjectSchema } from './objects/PantryItemInclude.schema';
import { PantryItemCreateInputObjectSchema as PantryItemCreateInputObjectSchema } from './objects/PantryItemCreateInput.schema';
import { PantryItemUncheckedCreateInputObjectSchema as PantryItemUncheckedCreateInputObjectSchema } from './objects/PantryItemUncheckedCreateInput.schema';

export const PantryItemCreateOneSchema: z.ZodType<Prisma.PantryItemCreateArgs> =
  z
    .object({
      select: PantryItemSelectObjectSchema.optional(),
      include: PantryItemIncludeObjectSchema.optional(),
      data: z.union([
        PantryItemCreateInputObjectSchema,
        PantryItemUncheckedCreateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.PantryItemCreateArgs>;

export const PantryItemCreateOneZodSchema = z
  .object({
    select: PantryItemSelectObjectSchema.optional(),
    include: PantryItemIncludeObjectSchema.optional(),
    data: z.union([
      PantryItemCreateInputObjectSchema,
      PantryItemUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict();
