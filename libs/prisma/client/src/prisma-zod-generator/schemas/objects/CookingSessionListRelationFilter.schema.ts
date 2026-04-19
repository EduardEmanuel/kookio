import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CookingSessionWhereInputObjectSchema as CookingSessionWhereInputObjectSchema } from './CookingSessionWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      every: z.lazy(() => CookingSessionWhereInputObjectSchema).optional(),
      some: z.lazy(() => CookingSessionWhereInputObjectSchema).optional(),
      none: z.lazy(() => CookingSessionWhereInputObjectSchema).optional(),
    })
    .strict();
export const CookingSessionListRelationFilterObjectSchema: z.ZodType<Prisma.CookingSessionListRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionListRelationFilter>;
export const CookingSessionListRelationFilterObjectZodSchema = makeSchema();
