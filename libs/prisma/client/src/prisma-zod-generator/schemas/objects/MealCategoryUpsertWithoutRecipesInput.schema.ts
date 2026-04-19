import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealCategoryUpdateWithoutRecipesInputObjectSchema as MealCategoryUpdateWithoutRecipesInputObjectSchema } from './MealCategoryUpdateWithoutRecipesInput.schema';
import { MealCategoryUncheckedUpdateWithoutRecipesInputObjectSchema as MealCategoryUncheckedUpdateWithoutRecipesInputObjectSchema } from './MealCategoryUncheckedUpdateWithoutRecipesInput.schema';
import { MealCategoryCreateWithoutRecipesInputObjectSchema as MealCategoryCreateWithoutRecipesInputObjectSchema } from './MealCategoryCreateWithoutRecipesInput.schema';
import { MealCategoryUncheckedCreateWithoutRecipesInputObjectSchema as MealCategoryUncheckedCreateWithoutRecipesInputObjectSchema } from './MealCategoryUncheckedCreateWithoutRecipesInput.schema';
import { MealCategoryWhereInputObjectSchema as MealCategoryWhereInputObjectSchema } from './MealCategoryWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => MealCategoryUpdateWithoutRecipesInputObjectSchema),
        z.lazy(
          () => MealCategoryUncheckedUpdateWithoutRecipesInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => MealCategoryCreateWithoutRecipesInputObjectSchema),
        z.lazy(
          () => MealCategoryUncheckedCreateWithoutRecipesInputObjectSchema,
        ),
      ]),
      where: z.lazy(() => MealCategoryWhereInputObjectSchema).optional(),
    })
    .strict();
export const MealCategoryUpsertWithoutRecipesInputObjectSchema: z.ZodType<Prisma.MealCategoryUpsertWithoutRecipesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealCategoryUpsertWithoutRecipesInput>;
export const MealCategoryUpsertWithoutRecipesInputObjectZodSchema =
  makeSchema();
