import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionScalarWhereInputObjectSchema as RecipeCollectionScalarWhereInputObjectSchema } from './RecipeCollectionScalarWhereInput.schema';
import { RecipeCollectionUpdateManyMutationInputObjectSchema as RecipeCollectionUpdateManyMutationInputObjectSchema } from './RecipeCollectionUpdateManyMutationInput.schema';
import { RecipeCollectionUncheckedUpdateManyWithoutUserInputObjectSchema as RecipeCollectionUncheckedUpdateManyWithoutUserInputObjectSchema } from './RecipeCollectionUncheckedUpdateManyWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeCollectionScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => RecipeCollectionUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => RecipeCollectionUncheckedUpdateManyWithoutUserInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeCollectionUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.RecipeCollectionUpdateManyWithWhereWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionUpdateManyWithWhereWithoutUserInput>;
export const RecipeCollectionUpdateManyWithWhereWithoutUserInputObjectZodSchema =
  makeSchema();
