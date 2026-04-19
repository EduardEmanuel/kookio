import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealCategoryWhereInputObjectSchema as MealCategoryWhereInputObjectSchema } from './MealCategoryWhereInput.schema';
import { MealCategoryUpdateWithoutRecipesInputObjectSchema as MealCategoryUpdateWithoutRecipesInputObjectSchema } from './MealCategoryUpdateWithoutRecipesInput.schema';
import { MealCategoryUncheckedUpdateWithoutRecipesInputObjectSchema as MealCategoryUncheckedUpdateWithoutRecipesInputObjectSchema } from './MealCategoryUncheckedUpdateWithoutRecipesInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => MealCategoryWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => MealCategoryUpdateWithoutRecipesInputObjectSchema),
        z.lazy(
          () => MealCategoryUncheckedUpdateWithoutRecipesInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const MealCategoryUpdateToOneWithWhereWithoutRecipesInputObjectSchema: z.ZodType<Prisma.MealCategoryUpdateToOneWithWhereWithoutRecipesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealCategoryUpdateToOneWithWhereWithoutRecipesInput>;
export const MealCategoryUpdateToOneWithWhereWithoutRecipesInputObjectZodSchema =
  makeSchema();
