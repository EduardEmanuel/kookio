import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
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
      recipe: z
        .lazy(
          () =>
            RecipeUpdateOneRequiredWithoutCollectionEntriesNestedInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const RecipeCollectionEntryUpdateWithoutCollectionInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryUpdateWithoutCollectionInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryUpdateWithoutCollectionInput>;
export const RecipeCollectionEntryUpdateWithoutCollectionInputObjectZodSchema =
  makeSchema();
