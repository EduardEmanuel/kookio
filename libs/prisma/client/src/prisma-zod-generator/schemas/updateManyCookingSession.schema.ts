import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CookingSessionUpdateManyMutationInputObjectSchema as CookingSessionUpdateManyMutationInputObjectSchema } from './objects/CookingSessionUpdateManyMutationInput.schema';
import { CookingSessionWhereInputObjectSchema as CookingSessionWhereInputObjectSchema } from './objects/CookingSessionWhereInput.schema';

export const CookingSessionUpdateManySchema: z.ZodType<Prisma.CookingSessionUpdateManyArgs> =
  z
    .object({
      data: CookingSessionUpdateManyMutationInputObjectSchema,
      where: CookingSessionWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.CookingSessionUpdateManyArgs>;

export const CookingSessionUpdateManyZodSchema = z
  .object({
    data: CookingSessionUpdateManyMutationInputObjectSchema,
    where: CookingSessionWhereInputObjectSchema.optional(),
  })
  .strict();
