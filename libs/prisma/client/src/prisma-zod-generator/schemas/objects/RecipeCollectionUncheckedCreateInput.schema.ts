import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionEntryUncheckedCreateNestedManyWithoutCollectionInputObjectSchema as RecipeCollectionEntryUncheckedCreateNestedManyWithoutCollectionInputObjectSchema } from './RecipeCollectionEntryUncheckedCreateNestedManyWithoutCollectionInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      userId: z.string(),
      name: z.string(),
      emoji: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      recipes: z.lazy(
        () =>
          RecipeCollectionEntryUncheckedCreateNestedManyWithoutCollectionInputObjectSchema,
      ),
    })
    .strict();
export const RecipeCollectionUncheckedCreateInputObjectSchema: z.ZodType<Prisma.RecipeCollectionUncheckedCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionUncheckedCreateInput>;
export const RecipeCollectionUncheckedCreateInputObjectZodSchema = makeSchema();
