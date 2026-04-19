import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutCollectionsInputObjectSchema as UserCreateNestedOneWithoutCollectionsInputObjectSchema } from './UserCreateNestedOneWithoutCollectionsInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      emoji: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      user: z.lazy(
        () => UserCreateNestedOneWithoutCollectionsInputObjectSchema,
      ),
    })
    .strict();
export const RecipeCollectionCreateWithoutRecipesInputObjectSchema: z.ZodType<Prisma.RecipeCollectionCreateWithoutRecipesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionCreateWithoutRecipesInput>;
export const RecipeCollectionCreateWithoutRecipesInputObjectZodSchema =
  makeSchema();
