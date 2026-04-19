import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { RecipeUpdateOneRequiredWithoutTagsNestedInputObjectSchema as RecipeUpdateOneRequiredWithoutTagsNestedInputObjectSchema } from './RecipeUpdateOneRequiredWithoutTagsNestedInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      tag: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      recipe: z
        .lazy(() => RecipeUpdateOneRequiredWithoutTagsNestedInputObjectSchema)
        .optional(),
    })
    .strict();
export const RecipeTagUpdateInputObjectSchema: z.ZodType<Prisma.RecipeTagUpdateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagUpdateInput>;
export const RecipeTagUpdateInputObjectZodSchema = makeSchema();
