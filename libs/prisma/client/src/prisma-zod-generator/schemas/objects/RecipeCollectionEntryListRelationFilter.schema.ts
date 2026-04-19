import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionEntryWhereInputObjectSchema as RecipeCollectionEntryWhereInputObjectSchema } from './RecipeCollectionEntryWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      every: z
        .lazy(() => RecipeCollectionEntryWhereInputObjectSchema)
        .optional(),
      some: z
        .lazy(() => RecipeCollectionEntryWhereInputObjectSchema)
        .optional(),
      none: z
        .lazy(() => RecipeCollectionEntryWhereInputObjectSchema)
        .optional(),
    })
    .strict();
export const RecipeCollectionEntryListRelationFilterObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryListRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryListRelationFilter>;
export const RecipeCollectionEntryListRelationFilterObjectZodSchema =
  makeSchema();
