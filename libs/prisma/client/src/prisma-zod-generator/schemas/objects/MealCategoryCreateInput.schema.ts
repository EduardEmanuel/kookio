import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCreateNestedManyWithoutCategoryInputObjectSchema as RecipeCreateNestedManyWithoutCategoryInputObjectSchema } from './RecipeCreateNestedManyWithoutCategoryInput.schema';

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
        () => RecipeCreateNestedManyWithoutCategoryInputObjectSchema,
      ),
    })
    .strict();
export const MealCategoryCreateInputObjectSchema: z.ZodType<Prisma.MealCategoryCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealCategoryCreateInput>;
export const MealCategoryCreateInputObjectZodSchema = makeSchema();
