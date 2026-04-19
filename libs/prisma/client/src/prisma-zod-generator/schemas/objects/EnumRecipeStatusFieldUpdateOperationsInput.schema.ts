import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeStatusSchema } from '../enums/RecipeStatus.schema';

const makeSchema = () =>
  z
    .object({
      set: RecipeStatusSchema.optional(),
    })
    .strict();
export const EnumRecipeStatusFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumRecipeStatusFieldUpdateOperationsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.EnumRecipeStatusFieldUpdateOperationsInput>;
export const EnumRecipeStatusFieldUpdateOperationsInputObjectZodSchema =
  makeSchema();
