import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionEntryUncheckedCreateNestedManyWithoutCollectionInputObjectSchema as RecipeCollectionEntryUncheckedCreateNestedManyWithoutCollectionInputObjectSchema } from './RecipeCollectionEntryUncheckedCreateNestedManyWithoutCollectionInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      emoji: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      recipes: z
        .lazy(
          () =>
            RecipeCollectionEntryUncheckedCreateNestedManyWithoutCollectionInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const RecipeCollectionUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.RecipeCollectionUncheckedCreateWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionUncheckedCreateWithoutUserInput>;
export const RecipeCollectionUncheckedCreateWithoutUserInputObjectZodSchema =
  makeSchema();
