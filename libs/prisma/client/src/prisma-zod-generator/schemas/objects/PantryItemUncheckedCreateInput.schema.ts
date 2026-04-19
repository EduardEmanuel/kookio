import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MeasureUnitSchema } from '../enums/MeasureUnit.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      userId: z.string(),
      ingredientCatalogId: z.string(),
      quantity: z.number(),
      unit: MeasureUnitSchema,
      expiresAt: z.coerce.date().optional().nullable(),
      addedAt: z.coerce.date().optional(),
    })
    .strict();
export const PantryItemUncheckedCreateInputObjectSchema: z.ZodType<Prisma.PantryItemUncheckedCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemUncheckedCreateInput>;
export const PantryItemUncheckedCreateInputObjectZodSchema = makeSchema();
