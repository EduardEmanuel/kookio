import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCreateNestedManyWithoutAreaInputObjectSchema as RecipeCreateNestedManyWithoutAreaInputObjectSchema } from './RecipeCreateNestedManyWithoutAreaInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      externalId: z.string(),
      name: z.string(),
      flag: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      recipes: z.lazy(() => RecipeCreateNestedManyWithoutAreaInputObjectSchema),
    })
    .strict();
export const MealAreaCreateInputObjectSchema: z.ZodType<Prisma.MealAreaCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealAreaCreateInput>;
export const MealAreaCreateInputObjectZodSchema = makeSchema();
