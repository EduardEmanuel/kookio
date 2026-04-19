import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeCreateWithoutCategoryInputObjectSchema as RecipeCreateWithoutCategoryInputObjectSchema } from './RecipeCreateWithoutCategoryInput.schema';
import { RecipeUncheckedCreateWithoutCategoryInputObjectSchema as RecipeUncheckedCreateWithoutCategoryInputObjectSchema } from './RecipeUncheckedCreateWithoutCategoryInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => RecipeCreateWithoutCategoryInputObjectSchema),
        z.lazy(() => RecipeUncheckedCreateWithoutCategoryInputObjectSchema),
      ]),
    })
    .strict();
export const RecipeCreateOrConnectWithoutCategoryInputObjectSchema: z.ZodType<Prisma.RecipeCreateOrConnectWithoutCategoryInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCreateOrConnectWithoutCategoryInput>;
export const RecipeCreateOrConnectWithoutCategoryInputObjectZodSchema =
  makeSchema();
