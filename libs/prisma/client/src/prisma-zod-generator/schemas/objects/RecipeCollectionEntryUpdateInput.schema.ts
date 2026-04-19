import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { RecipeCollectionUpdateOneRequiredWithoutRecipesNestedInputObjectSchema as RecipeCollectionUpdateOneRequiredWithoutRecipesNestedInputObjectSchema } from './RecipeCollectionUpdateOneRequiredWithoutRecipesNestedInput.schema';
import { RecipeUpdateOneRequiredWithoutCollectionEntriesNestedInputObjectSchema as RecipeUpdateOneRequiredWithoutCollectionEntriesNestedInputObjectSchema } from './RecipeUpdateOneRequiredWithoutCollectionEntriesNestedInput.schema';

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
      recipe: z
        .lazy(
          () =>
            RecipeUpdateOneRequiredWithoutCollectionEntriesNestedInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const RecipeCollectionEntryUpdateInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryUpdateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryUpdateInput>;
export const RecipeCollectionEntryUpdateInputObjectZodSchema = makeSchema();
