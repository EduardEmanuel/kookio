import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutCollectionsInputObjectSchema as UserCreateNestedOneWithoutCollectionsInputObjectSchema } from './UserCreateNestedOneWithoutCollectionsInput.schema';
import { RecipeCollectionEntryCreateNestedManyWithoutCollectionInputObjectSchema as RecipeCollectionEntryCreateNestedManyWithoutCollectionInputObjectSchema } from './RecipeCollectionEntryCreateNestedManyWithoutCollectionInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      emoji: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      user: z.lazy(
        () => UserCreateNestedOneWithoutCollectionsInputObjectSchema,
      ),
      recipes: z.lazy(
        () =>
          RecipeCollectionEntryCreateNestedManyWithoutCollectionInputObjectSchema,
      ),
    })
    .strict();
export const RecipeCollectionCreateInputObjectSchema: z.ZodType<Prisma.RecipeCollectionCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionCreateInput>;
export const RecipeCollectionCreateInputObjectZodSchema = makeSchema();
