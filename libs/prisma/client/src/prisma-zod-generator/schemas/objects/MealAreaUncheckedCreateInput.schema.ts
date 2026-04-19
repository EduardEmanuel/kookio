import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeUncheckedCreateNestedManyWithoutAreaInputObjectSchema as RecipeUncheckedCreateNestedManyWithoutAreaInputObjectSchema } from './RecipeUncheckedCreateNestedManyWithoutAreaInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      externalId: z.string(),
      name: z.string(),
      flag: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      recipes: z.lazy(
        () => RecipeUncheckedCreateNestedManyWithoutAreaInputObjectSchema,
      ),
    })
    .strict();
export const MealAreaUncheckedCreateInputObjectSchema: z.ZodType<Prisma.MealAreaUncheckedCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealAreaUncheckedCreateInput>;
export const MealAreaUncheckedCreateInputObjectZodSchema = makeSchema();
