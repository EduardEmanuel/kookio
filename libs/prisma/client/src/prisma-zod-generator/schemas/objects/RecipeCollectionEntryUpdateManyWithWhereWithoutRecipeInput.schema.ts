import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionEntryScalarWhereInputObjectSchema as RecipeCollectionEntryScalarWhereInputObjectSchema } from './RecipeCollectionEntryScalarWhereInput.schema';
import { RecipeCollectionEntryUpdateManyMutationInputObjectSchema as RecipeCollectionEntryUpdateManyMutationInputObjectSchema } from './RecipeCollectionEntryUpdateManyMutationInput.schema';
import { RecipeCollectionEntryUncheckedUpdateManyWithoutRecipeInputObjectSchema as RecipeCollectionEntryUncheckedUpdateManyWithoutRecipeInputObjectSchema } from './RecipeCollectionEntryUncheckedUpdateManyWithoutRecipeInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeCollectionEntryScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => RecipeCollectionEntryUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            RecipeCollectionEntryUncheckedUpdateManyWithoutRecipeInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeCollectionEntryUpdateManyWithWhereWithoutRecipeInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryUpdateManyWithWhereWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryUpdateManyWithWhereWithoutRecipeInput>;
export const RecipeCollectionEntryUpdateManyWithWhereWithoutRecipeInputObjectZodSchema =
  makeSchema();
