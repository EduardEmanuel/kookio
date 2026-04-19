import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionWhereUniqueInputObjectSchema as RecipeCollectionWhereUniqueInputObjectSchema } from './RecipeCollectionWhereUniqueInput.schema';
import { RecipeCollectionUpdateWithoutUserInputObjectSchema as RecipeCollectionUpdateWithoutUserInputObjectSchema } from './RecipeCollectionUpdateWithoutUserInput.schema';
import { RecipeCollectionUncheckedUpdateWithoutUserInputObjectSchema as RecipeCollectionUncheckedUpdateWithoutUserInputObjectSchema } from './RecipeCollectionUncheckedUpdateWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeCollectionWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => RecipeCollectionUpdateWithoutUserInputObjectSchema),
        z.lazy(
          () => RecipeCollectionUncheckedUpdateWithoutUserInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeCollectionUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.RecipeCollectionUpdateWithWhereUniqueWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionUpdateWithWhereUniqueWithoutUserInput>;
export const RecipeCollectionUpdateWithWhereUniqueWithoutUserInputObjectZodSchema =
  makeSchema();
