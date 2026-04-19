import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CookingSessionWhereInputObjectSchema as CookingSessionWhereInputObjectSchema } from './objects/CookingSessionWhereInput.schema';

export const CookingSessionDeleteManySchema: z.ZodType<Prisma.CookingSessionDeleteManyArgs> =
  z
    .object({ where: CookingSessionWhereInputObjectSchema.optional() })
    .strict() as unknown as z.ZodType<Prisma.CookingSessionDeleteManyArgs>;

export const CookingSessionDeleteManyZodSchema = z
  .object({ where: CookingSessionWhereInputObjectSchema.optional() })
  .strict();
