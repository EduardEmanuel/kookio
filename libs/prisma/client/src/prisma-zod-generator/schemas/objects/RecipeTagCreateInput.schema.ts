import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCreateNestedOneWithoutTagsInputObjectSchema as RecipeCreateNestedOneWithoutTagsInputObjectSchema } from './RecipeCreateNestedOneWithoutTagsInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      tag: z.string(),
      recipe: z.lazy(() => RecipeCreateNestedOneWithoutTagsInputObjectSchema),
    })
    .strict();
export const RecipeTagCreateInputObjectSchema: z.ZodType<Prisma.RecipeTagCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagCreateInput>;
export const RecipeTagCreateInputObjectZodSchema = makeSchema();
