import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealCategoryCreateWithoutRecipesInputObjectSchema as MealCategoryCreateWithoutRecipesInputObjectSchema } from './MealCategoryCreateWithoutRecipesInput.schema';
import { MealCategoryUncheckedCreateWithoutRecipesInputObjectSchema as MealCategoryUncheckedCreateWithoutRecipesInputObjectSchema } from './MealCategoryUncheckedCreateWithoutRecipesInput.schema';
import { MealCategoryCreateOrConnectWithoutRecipesInputObjectSchema as MealCategoryCreateOrConnectWithoutRecipesInputObjectSchema } from './MealCategoryCreateOrConnectWithoutRecipesInput.schema';
import { MealCategoryUpsertWithoutRecipesInputObjectSchema as MealCategoryUpsertWithoutRecipesInputObjectSchema } from './MealCategoryUpsertWithoutRecipesInput.schema';
import { MealCategoryWhereInputObjectSchema as MealCategoryWhereInputObjectSchema } from './MealCategoryWhereInput.schema';
import { MealCategoryWhereUniqueInputObjectSchema as MealCategoryWhereUniqueInputObjectSchema } from './MealCategoryWhereUniqueInput.schema';
import { MealCategoryUpdateToOneWithWhereWithoutRecipesInputObjectSchema as MealCategoryUpdateToOneWithWhereWithoutRecipesInputObjectSchema } from './MealCategoryUpdateToOneWithWhereWithoutRecipesInput.schema';
import { MealCategoryUpdateWithoutRecipesInputObjectSchema as MealCategoryUpdateWithoutRecipesInputObjectSchema } from './MealCategoryUpdateWithoutRecipesInput.schema';
import { MealCategoryUncheckedUpdateWithoutRecipesInputObjectSchema as MealCategoryUncheckedUpdateWithoutRecipesInputObjectSchema } from './MealCategoryUncheckedUpdateWithoutRecipesInput.schema';

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
      upsert: z
        .lazy(() => MealCategoryUpsertWithoutRecipesInputObjectSchema)
        .optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => MealCategoryWhereInputObjectSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => MealCategoryWhereInputObjectSchema)])
        .optional(),
      connect: z
        .lazy(() => MealCategoryWhereUniqueInputObjectSchema)
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              MealCategoryUpdateToOneWithWhereWithoutRecipesInputObjectSchema,
          ),
          z.lazy(() => MealCategoryUpdateWithoutRecipesInputObjectSchema),
          z.lazy(
            () => MealCategoryUncheckedUpdateWithoutRecipesInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();
export const MealCategoryUpdateOneWithoutRecipesNestedInputObjectSchema: z.ZodType<Prisma.MealCategoryUpdateOneWithoutRecipesNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealCategoryUpdateOneWithoutRecipesNestedInput>;
export const MealCategoryUpdateOneWithoutRecipesNestedInputObjectZodSchema =
  makeSchema();
