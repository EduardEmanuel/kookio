import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeScalarWhereInputObjectSchema as RecipeScalarWhereInputObjectSchema } from './RecipeScalarWhereInput.schema';
import { RecipeUpdateManyMutationInputObjectSchema as RecipeUpdateManyMutationInputObjectSchema } from './RecipeUpdateManyMutationInput.schema';
import { RecipeUncheckedUpdateManyWithoutCategoryInputObjectSchema as RecipeUncheckedUpdateManyWithoutCategoryInputObjectSchema } from './RecipeUncheckedUpdateManyWithoutCategoryInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => RecipeUpdateManyMutationInputObjectSchema),
        z.lazy(() => RecipeUncheckedUpdateManyWithoutCategoryInputObjectSchema),
      ]),
    })
    .strict();
export const RecipeUpdateManyWithWhereWithoutCategoryInputObjectSchema: z.ZodType<Prisma.RecipeUpdateManyWithWhereWithoutCategoryInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpdateManyWithWhereWithoutCategoryInput>;
export const RecipeUpdateManyWithWhereWithoutCategoryInputObjectZodSchema =
  makeSchema();
