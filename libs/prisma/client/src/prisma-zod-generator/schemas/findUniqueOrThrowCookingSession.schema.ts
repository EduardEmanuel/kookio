import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CookingSessionSelectObjectSchema as CookingSessionSelectObjectSchema } from './objects/CookingSessionSelect.schema';
import { CookingSessionIncludeObjectSchema as CookingSessionIncludeObjectSchema } from './objects/CookingSessionInclude.schema';
import { CookingSessionWhereUniqueInputObjectSchema as CookingSessionWhereUniqueInputObjectSchema } from './objects/CookingSessionWhereUniqueInput.schema';

export const CookingSessionFindUniqueOrThrowSchema: z.ZodType<Prisma.CookingSessionFindUniqueOrThrowArgs> =
  z
    .object({
      select: CookingSessionSelectObjectSchema.optional(),
      include: CookingSessionIncludeObjectSchema.optional(),
      where: CookingSessionWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.CookingSessionFindUniqueOrThrowArgs>;

export const CookingSessionFindUniqueOrThrowZodSchema = z
  .object({
    select: CookingSessionSelectObjectSchema.optional(),
    include: CookingSessionIncludeObjectSchema.optional(),
    where: CookingSessionWhereUniqueInputObjectSchema,
  })
  .strict();
