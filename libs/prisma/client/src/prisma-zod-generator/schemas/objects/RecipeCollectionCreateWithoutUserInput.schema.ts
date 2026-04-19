import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionEntryCreateNestedManyWithoutCollectionInputObjectSchema as RecipeCollectionEntryCreateNestedManyWithoutCollectionInputObjectSchema } from './RecipeCollectionEntryCreateNestedManyWithoutCollectionInput.schema';

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
            RecipeCollectionEntryCreateNestedManyWithoutCollectionInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const RecipeCollectionCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.RecipeCollectionCreateWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionCreateWithoutUserInput>;
export const RecipeCollectionCreateWithoutUserInputObjectZodSchema =
  makeSchema();
