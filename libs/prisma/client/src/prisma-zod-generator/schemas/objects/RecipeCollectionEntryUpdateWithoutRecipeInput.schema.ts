import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { RecipeCollectionUpdateOneRequiredWithoutRecipesNestedInputObjectSchema as RecipeCollectionUpdateOneRequiredWithoutRecipesNestedInputObjectSchema } from './RecipeCollectionUpdateOneRequiredWithoutRecipesNestedInput.schema';

const makeSchema = () =>
  z
    .object({
      addedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      collection: z
        .lazy(
          () =>
            RecipeCollectionUpdateOneRequiredWithoutRecipesNestedInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const RecipeCollectionEntryUpdateWithoutRecipeInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryUpdateWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryUpdateWithoutRecipeInput>;
export const RecipeCollectionEntryUpdateWithoutRecipeInputObjectZodSchema =
  makeSchema();
