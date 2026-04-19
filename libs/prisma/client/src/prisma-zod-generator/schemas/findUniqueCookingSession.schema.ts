import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CookingSessionSelectObjectSchema as CookingSessionSelectObjectSchema } from './objects/CookingSessionSelect.schema';
import { CookingSessionIncludeObjectSchema as CookingSessionIncludeObjectSchema } from './objects/CookingSessionInclude.schema';
import { CookingSessionWhereUniqueInputObjectSchema as CookingSessionWhereUniqueInputObjectSchema } from './objects/CookingSessionWhereUniqueInput.schema';

export const CookingSessionFindUniqueSchema: z.ZodType<Prisma.CookingSessionFindUniqueArgs> =
  z
    .object({
      select: CookingSessionSelectObjectSchema.optional(),
      include: CookingSessionIncludeObjectSchema.optional(),
      where: CookingSessionWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.CookingSessionFindUniqueArgs>;

export const CookingSessionFindUniqueZodSchema = z
  .object({
    select: CookingSessionSelectObjectSchema.optional(),
    include: CookingSessionIncludeObjectSchema.optional(),
    where: CookingSessionWhereUniqueInputObjectSchema,
  })
  .strict();
