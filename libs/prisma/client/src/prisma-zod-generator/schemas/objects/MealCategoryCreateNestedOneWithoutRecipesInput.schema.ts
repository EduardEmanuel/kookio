import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealCategoryCreateWithoutRecipesInputObjectSchema as MealCategoryCreateWithoutRecipesInputObjectSchema } from './MealCategoryCreateWithoutRecipesInput.schema';
import { MealCategoryUncheckedCreateWithoutRecipesInputObjectSchema as MealCategoryUncheckedCreateWithoutRecipesInputObjectSchema } from './MealCategoryUncheckedCreateWithoutRecipesInput.schema';
import { MealCategoryCreateOrConnectWithoutRecipesInputObjectSchema as MealCategoryCreateOrConnectWithoutRecipesInputObjectSchema } from './MealCategoryCreateOrConnectWithoutRecipesInput.schema';
import { MealCategoryWhereUniqueInputObjectSchema as MealCategoryWhereUniqueInputObjectSchema } from './MealCategoryWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => MealCategoryCreateWithoutRecipesInputObjectSchema),
          z.lazy(
            () => MealCategoryUncheckedCreateWithoutRecipesInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MealCategoryCreateOrConnectWithoutRecipesInputObjectSchema)
        .optional(),
      connect: z
        .lazy(() => MealCategoryWhereUniqueInputObjectSchema)
        .optional(),
    })
    .strict();
export const MealCategoryCreateNestedOneWithoutRecipesInputObjectSchema: z.ZodType<Prisma.MealCategoryCreateNestedOneWithoutRecipesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealCategoryCreateNestedOneWithoutRecipesInput>;
export const MealCategoryCreateNestedOneWithoutRecipesInputObjectZodSchema =
  makeSchema();
