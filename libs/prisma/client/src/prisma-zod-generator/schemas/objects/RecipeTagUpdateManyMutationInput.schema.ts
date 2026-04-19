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
      tag: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const RecipeTagUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.RecipeTagUpdateManyMutationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagUpdateManyMutationInput>;
export const RecipeTagUpdateManyMutationInputObjectZodSchema = makeSchema();
