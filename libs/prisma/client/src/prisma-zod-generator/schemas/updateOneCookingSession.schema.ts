import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CookingSessionSelectObjectSchema as CookingSessionSelectObjectSchema } from './objects/CookingSessionSelect.schema';
import { CookingSessionIncludeObjectSchema as CookingSessionIncludeObjectSchema } from './objects/CookingSessionInclude.schema';
import { CookingSessionUpdateInputObjectSchema as CookingSessionUpdateInputObjectSchema } from './objects/CookingSessionUpdateInput.schema';
import { CookingSessionUncheckedUpdateInputObjectSchema as CookingSessionUncheckedUpdateInputObjectSchema } from './objects/CookingSessionUncheckedUpdateInput.schema';
import { CookingSessionWhereUniqueInputObjectSchema as CookingSessionWhereUniqueInputObjectSchema } from './objects/CookingSessionWhereUniqueInput.schema';

export const CookingSessionUpdateOneSchema: z.ZodType<Prisma.CookingSessionUpdateArgs> =
  z
    .object({
      select: CookingSessionSelectObjectSchema.optional(),
      include: CookingSessionIncludeObjectSchema.optional(),
      data: z.union([
        CookingSessionUpdateInputObjectSchema,
        CookingSessionUncheckedUpdateInputObjectSchema,
      ]),
      where: CookingSessionWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.CookingSessionUpdateArgs>;

export const CookingSessionUpdateOneZodSchema = z
  .object({
    select: CookingSessionSelectObjectSchema.optional(),
    include: CookingSessionIncludeObjectSchema.optional(),
    data: z.union([
      CookingSessionUpdateInputObjectSchema,
      CookingSessionUncheckedUpdateInputObjectSchema,
    ]),
    where: CookingSessionWhereUniqueInputObjectSchema,
  })
  .strict();
