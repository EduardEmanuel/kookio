import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      recipeId: z
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
    })
    .strict();
export const RecipeTagUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.RecipeTagUncheckedUpdateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagUncheckedUpdateInput>;
export const RecipeTagUncheckedUpdateInputObjectZodSchema = makeSchema();
