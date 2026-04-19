import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CookingSessionSelectObjectSchema as CookingSessionSelectObjectSchema } from './objects/CookingSessionSelect.schema';
import { CookingSessionCreateManyInputObjectSchema as CookingSessionCreateManyInputObjectSchema } from './objects/CookingSessionCreateManyInput.schema';

export const CookingSessionCreateManyAndReturnSchema: z.ZodType<Prisma.CookingSessionCreateManyAndReturnArgs> =
  z
    .object({
      select: CookingSessionSelectObjectSchema.optional(),
      data: z.union([
        CookingSessionCreateManyInputObjectSchema,
        z.array(CookingSessionCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.CookingSessionCreateManyAndReturnArgs>;

export const CookingSessionCreateManyAndReturnZodSchema = z
  .object({
    select: CookingSessionSelectObjectSchema.optional(),
    data: z.union([
      CookingSessionCreateManyInputObjectSchema,
      z.array(CookingSessionCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
