import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PantryItemWhereInputObjectSchema as PantryItemWhereInputObjectSchema } from './PantryItemWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      every: z.lazy(() => PantryItemWhereInputObjectSchema).optional(),
      some: z.lazy(() => PantryItemWhereInputObjectSchema).optional(),
      none: z.lazy(() => PantryItemWhereInputObjectSchema).optional(),
    })
    .strict();
export const PantryItemListRelationFilterObjectSchema: z.ZodType<Prisma.PantryItemListRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemListRelationFilter>;
export const PantryItemListRelationFilterObjectZodSchema = makeSchema();
