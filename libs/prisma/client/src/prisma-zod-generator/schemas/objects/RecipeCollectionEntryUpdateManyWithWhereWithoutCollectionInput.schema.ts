import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionEntryScalarWhereInputObjectSchema as RecipeCollectionEntryScalarWhereInputObjectSchema } from './RecipeCollectionEntryScalarWhereInput.schema';
import { RecipeCollectionEntryUpdateManyMutationInputObjectSchema as RecipeCollectionEntryUpdateManyMutationInputObjectSchema } from './RecipeCollectionEntryUpdateManyMutationInput.schema';
import { RecipeCollectionEntryUncheckedUpdateManyWithoutCollectionInputObjectSchema as RecipeCollectionEntryUncheckedUpdateManyWithoutCollectionInputObjectSchema } from './RecipeCollectionEntryUncheckedUpdateManyWithoutCollectionInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeCollectionEntryScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => RecipeCollectionEntryUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            RecipeCollectionEntryUncheckedUpdateManyWithoutCollectionInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeCollectionEntryUpdateManyWithWhereWithoutCollectionInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryUpdateManyWithWhereWithoutCollectionInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryUpdateManyWithWhereWithoutCollectionInput>;
export const RecipeCollectionEntryUpdateManyWithWhereWithoutCollectionInputObjectZodSchema =
  makeSchema();
