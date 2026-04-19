import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './RecipeWhereInput.schema';
import { RecipeUpdateWithoutTagsInputObjectSchema as RecipeUpdateWithoutTagsInputObjectSchema } from './RecipeUpdateWithoutTagsInput.schema';
import { RecipeUncheckedUpdateWithoutTagsInputObjectSchema as RecipeUncheckedUpdateWithoutTagsInputObjectSchema } from './RecipeUncheckedUpdateWithoutTagsInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => RecipeUpdateWithoutTagsInputObjectSchema),
        z.lazy(() => RecipeUncheckedUpdateWithoutTagsInputObjectSchema),
      ]),
    })
    .strict();
export const RecipeUpdateToOneWithWhereWithoutTagsInputObjectSchema: z.ZodType<Prisma.RecipeUpdateToOneWithWhereWithoutTagsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpdateToOneWithWhereWithoutTagsInput>;
export const RecipeUpdateToOneWithWhereWithoutTagsInputObjectZodSchema =
  makeSchema();
