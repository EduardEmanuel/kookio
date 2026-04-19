import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CookingSessionCreateManyInputObjectSchema as CookingSessionCreateManyInputObjectSchema } from './objects/CookingSessionCreateManyInput.schema';

export const CookingSessionCreateManySchema: z.ZodType<Prisma.CookingSessionCreateManyArgs> =
  z
    .object({
      data: z.union([
        CookingSessionCreateManyInputObjectSchema,
        z.array(CookingSessionCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.CookingSessionCreateManyArgs>;

export const CookingSessionCreateManyZodSchema = z
  .object({
    data: z.union([
      CookingSessionCreateManyInputObjectSchema,
      z.array(CookingSessionCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
