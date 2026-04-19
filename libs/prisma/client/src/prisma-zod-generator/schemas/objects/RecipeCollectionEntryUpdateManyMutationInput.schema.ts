import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';

const makeSchema = () =>
  z
    .object({
      addedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const RecipeCollectionEntryUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryUpdateManyMutationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryUpdateManyMutationInput>;
export const RecipeCollectionEntryUpdateManyMutationInputObjectZodSchema =
  makeSchema();
