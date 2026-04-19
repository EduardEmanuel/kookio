import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PantryItemSelectObjectSchema as PantryItemSelectObjectSchema } from './objects/PantryItemSelect.schema';
import { PantryItemIncludeObjectSchema as PantryItemIncludeObjectSchema } from './objects/PantryItemInclude.schema';
import { PantryItemWhereUniqueInputObjectSchema as PantryItemWhereUniqueInputObjectSchema } from './objects/PantryItemWhereUniqueInput.schema';

export const PantryItemDeleteOneSchema: z.ZodType<Prisma.PantryItemDeleteArgs> =
  z
    .object({
      select: PantryItemSelectObjectSchema.optional(),
      include: PantryItemIncludeObjectSchema.optional(),
      where: PantryItemWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.PantryItemDeleteArgs>;

export const PantryItemDeleteOneZodSchema = z
  .object({
    select: PantryItemSelectObjectSchema.optional(),
    include: PantryItemIncludeObjectSchema.optional(),
    where: PantryItemWhereUniqueInputObjectSchema,
  })
  .strict();
