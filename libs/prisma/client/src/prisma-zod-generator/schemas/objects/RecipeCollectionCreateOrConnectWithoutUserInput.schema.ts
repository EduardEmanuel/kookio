import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionWhereUniqueInputObjectSchema as RecipeCollectionWhereUniqueInputObjectSchema } from './RecipeCollectionWhereUniqueInput.schema';
import { RecipeCollectionCreateWithoutUserInputObjectSchema as RecipeCollectionCreateWithoutUserInputObjectSchema } from './RecipeCollectionCreateWithoutUserInput.schema';
import { RecipeCollectionUncheckedCreateWithoutUserInputObjectSchema as RecipeCollectionUncheckedCreateWithoutUserInputObjectSchema } from './RecipeCollectionUncheckedCreateWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeCollectionWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => RecipeCollectionCreateWithoutUserInputObjectSchema),
        z.lazy(
          () => RecipeCollectionUncheckedCreateWithoutUserInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeCollectionCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.RecipeCollectionCreateOrConnectWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionCreateOrConnectWithoutUserInput>;
export const RecipeCollectionCreateOrConnectWithoutUserInputObjectZodSchema =
  makeSchema();
