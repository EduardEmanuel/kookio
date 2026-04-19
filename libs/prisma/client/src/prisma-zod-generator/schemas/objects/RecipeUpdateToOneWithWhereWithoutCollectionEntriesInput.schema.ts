import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './RecipeWhereInput.schema';
import { RecipeUpdateWithoutCollectionEntriesInputObjectSchema as RecipeUpdateWithoutCollectionEntriesInputObjectSchema } from './RecipeUpdateWithoutCollectionEntriesInput.schema';
import { RecipeUncheckedUpdateWithoutCollectionEntriesInputObjectSchema as RecipeUncheckedUpdateWithoutCollectionEntriesInputObjectSchema } from './RecipeUncheckedUpdateWithoutCollectionEntriesInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => RecipeUpdateWithoutCollectionEntriesInputObjectSchema),
        z.lazy(
          () => RecipeUncheckedUpdateWithoutCollectionEntriesInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeUpdateToOneWithWhereWithoutCollectionEntriesInputObjectSchema: z.ZodType<Prisma.RecipeUpdateToOneWithWhereWithoutCollectionEntriesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpdateToOneWithWhereWithoutCollectionEntriesInput>;
export const RecipeUpdateToOneWithWhereWithoutCollectionEntriesInputObjectZodSchema =
  makeSchema();
