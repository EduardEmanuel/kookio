import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CookingSessionSelectObjectSchema as CookingSessionSelectObjectSchema } from './objects/CookingSessionSelect.schema';
import { CookingSessionIncludeObjectSchema as CookingSessionIncludeObjectSchema } from './objects/CookingSessionInclude.schema';
import { CookingSessionWhereUniqueInputObjectSchema as CookingSessionWhereUniqueInputObjectSchema } from './objects/CookingSessionWhereUniqueInput.schema';
import { CookingSessionCreateInputObjectSchema as CookingSessionCreateInputObjectSchema } from './objects/CookingSessionCreateInput.schema';
import { CookingSessionUncheckedCreateInputObjectSchema as CookingSessionUncheckedCreateInputObjectSchema } from './objects/CookingSessionUncheckedCreateInput.schema';
import { CookingSessionUpdateInputObjectSchema as CookingSessionUpdateInputObjectSchema } from './objects/CookingSessionUpdateInput.schema';
import { CookingSessionUncheckedUpdateInputObjectSchema as CookingSessionUncheckedUpdateInputObjectSchema } from './objects/CookingSessionUncheckedUpdateInput.schema';

export const CookingSessionUpsertOneSchema: z.ZodType<Prisma.CookingSessionUpsertArgs> =
  z
    .object({
      select: CookingSessionSelectObjectSchema.optional(),
      include: CookingSessionIncludeObjectSchema.optional(),
      where: CookingSessionWhereUniqueInputObjectSchema,
      create: z.union([
        CookingSessionCreateInputObjectSchema,
        CookingSessionUncheckedCreateInputObjectSchema,
      ]),
      update: z.union([
        CookingSessionUpdateInputObjectSchema,
        CookingSessionUncheckedUpdateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.CookingSessionUpsertArgs>;

export const CookingSessionUpsertOneZodSchema = z
  .object({
    select: CookingSessionSelectObjectSchema.optional(),
    include: CookingSessionIncludeObjectSchema.optional(),
    where: CookingSessionWhereUniqueInputObjectSchema,
    create: z.union([
      CookingSessionCreateInputObjectSchema,
      CookingSessionUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      CookingSessionUpdateInputObjectSchema,
      CookingSessionUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict();
