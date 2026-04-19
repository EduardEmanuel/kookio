import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionWhereUniqueInputObjectSchema as RecipeCollectionWhereUniqueInputObjectSchema } from './RecipeCollectionWhereUniqueInput.schema';
import { RecipeCollectionUpdateWithoutUserInputObjectSchema as RecipeCollectionUpdateWithoutUserInputObjectSchema } from './RecipeCollectionUpdateWithoutUserInput.schema';
import { RecipeCollectionUncheckedUpdateWithoutUserInputObjectSchema as RecipeCollectionUncheckedUpdateWithoutUserInputObjectSchema } from './RecipeCollectionUncheckedUpdateWithoutUserInput.schema';
import { RecipeCollectionCreateWithoutUserInputObjectSchema as RecipeCollectionCreateWithoutUserInputObjectSchema } from './RecipeCollectionCreateWithoutUserInput.schema';
import { RecipeCollectionUncheckedCreateWithoutUserInputObjectSchema as RecipeCollectionUncheckedCreateWithoutUserInputObjectSchema } from './RecipeCollectionUncheckedCreateWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeCollectionWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => RecipeCollectionUpdateWithoutUserInputObjectSchema),
        z.lazy(
          () => RecipeCollectionUncheckedUpdateWithoutUserInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => RecipeCollectionCreateWithoutUserInputObjectSchema),
        z.lazy(
          () => RecipeCollectionUncheckedCreateWithoutUserInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeCollectionUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.RecipeCollectionUpsertWithWhereUniqueWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionUpsertWithWhereUniqueWithoutUserInput>;
export const RecipeCollectionUpsertWithWhereUniqueWithoutUserInputObjectZodSchema =
  makeSchema();
