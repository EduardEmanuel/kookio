import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeUncheckedCreateNestedManyWithoutCategoryInputObjectSchema as RecipeUncheckedCreateNestedManyWithoutCategoryInputObjectSchema } from './RecipeUncheckedCreateNestedManyWithoutCategoryInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      externalId: z.string(),
      name: z.string(),
      imageUrl: z.string().optional().nullable(),
      description: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      recipes: z.lazy(
        () => RecipeUncheckedCreateNestedManyWithoutCategoryInputObjectSchema,
      ),
    })
    .strict();
export const MealCategoryUncheckedCreateInputObjectSchema: z.ZodType<Prisma.MealCategoryUncheckedCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealCategoryUncheckedCreateInput>;
export const MealCategoryUncheckedCreateInputObjectZodSchema = makeSchema();
