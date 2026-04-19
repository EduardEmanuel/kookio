import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CookingSessionSelectObjectSchema as CookingSessionSelectObjectSchema } from './objects/CookingSessionSelect.schema';
import { CookingSessionUpdateManyMutationInputObjectSchema as CookingSessionUpdateManyMutationInputObjectSchema } from './objects/CookingSessionUpdateManyMutationInput.schema';
import { CookingSessionWhereInputObjectSchema as CookingSessionWhereInputObjectSchema } from './objects/CookingSessionWhereInput.schema';

export const CookingSessionUpdateManyAndReturnSchema: z.ZodType<Prisma.CookingSessionUpdateManyAndReturnArgs> =
  z
    .object({
      select: CookingSessionSelectObjectSchema.optional(),
      data: CookingSessionUpdateManyMutationInputObjectSchema,
      where: CookingSessionWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.CookingSessionUpdateManyAndReturnArgs>;

export const CookingSessionUpdateManyAndReturnZodSchema = z
  .object({
    select: CookingSessionSelectObjectSchema.optional(),
    data: CookingSessionUpdateManyMutationInputObjectSchema,
    where: CookingSessionWhereInputObjectSchema.optional(),
  })
  .strict();
