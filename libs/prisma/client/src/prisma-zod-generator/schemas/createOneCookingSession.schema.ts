import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CookingSessionSelectObjectSchema as CookingSessionSelectObjectSchema } from './objects/CookingSessionSelect.schema';
import { CookingSessionIncludeObjectSchema as CookingSessionIncludeObjectSchema } from './objects/CookingSessionInclude.schema';
import { CookingSessionCreateInputObjectSchema as CookingSessionCreateInputObjectSchema } from './objects/CookingSessionCreateInput.schema';
import { CookingSessionUncheckedCreateInputObjectSchema as CookingSessionUncheckedCreateInputObjectSchema } from './objects/CookingSessionUncheckedCreateInput.schema';

export const CookingSessionCreateOneSchema: z.ZodType<Prisma.CookingSessionCreateArgs> =
  z
    .object({
      select: CookingSessionSelectObjectSchema.optional(),
      include: CookingSessionIncludeObjectSchema.optional(),
      data: z.union([
        CookingSessionCreateInputObjectSchema,
        CookingSessionUncheckedCreateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.CookingSessionCreateArgs>;

export const CookingSessionCreateOneZodSchema = z
  .object({
    select: CookingSessionSelectObjectSchema.optional(),
    include: CookingSessionIncludeObjectSchema.optional(),
    data: z.union([
      CookingSessionCreateInputObjectSchema,
      CookingSessionUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict();
