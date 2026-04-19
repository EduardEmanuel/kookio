import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeTagWhereUniqueInputObjectSchema as RecipeTagWhereUniqueInputObjectSchema } from './RecipeTagWhereUniqueInput.schema';
import { RecipeTagCreateWithoutRecipeInputObjectSchema as RecipeTagCreateWithoutRecipeInputObjectSchema } from './RecipeTagCreateWithoutRecipeInput.schema';
import { RecipeTagUncheckedCreateWithoutRecipeInputObjectSchema as RecipeTagUncheckedCreateWithoutRecipeInputObjectSchema } from './RecipeTagUncheckedCreateWithoutRecipeInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeTagWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => RecipeTagCreateWithoutRecipeInputObjectSchema),
        z.lazy(() => RecipeTagUncheckedCreateWithoutRecipeInputObjectSchema),
      ]),
    })
    .strict();
export const RecipeTagCreateOrConnectWithoutRecipeInputObjectSchema: z.ZodType<Prisma.RecipeTagCreateOrConnectWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagCreateOrConnectWithoutRecipeInput>;
export const RecipeTagCreateOrConnectWithoutRecipeInputObjectZodSchema =
  makeSchema();
