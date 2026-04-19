import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealCategoryWhereUniqueInputObjectSchema as MealCategoryWhereUniqueInputObjectSchema } from './MealCategoryWhereUniqueInput.schema';
import { MealCategoryCreateWithoutRecipesInputObjectSchema as MealCategoryCreateWithoutRecipesInputObjectSchema } from './MealCategoryCreateWithoutRecipesInput.schema';
import { MealCategoryUncheckedCreateWithoutRecipesInputObjectSchema as MealCategoryUncheckedCreateWithoutRecipesInputObjectSchema } from './MealCategoryUncheckedCreateWithoutRecipesInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => MealCategoryWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => MealCategoryCreateWithoutRecipesInputObjectSchema),
        z.lazy(
          () => MealCategoryUncheckedCreateWithoutRecipesInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const MealCategoryCreateOrConnectWithoutRecipesInputObjectSchema: z.ZodType<Prisma.MealCategoryCreateOrConnectWithoutRecipesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealCategoryCreateOrConnectWithoutRecipesInput>;
export const MealCategoryCreateOrConnectWithoutRecipesInputObjectZodSchema =
  makeSchema();
