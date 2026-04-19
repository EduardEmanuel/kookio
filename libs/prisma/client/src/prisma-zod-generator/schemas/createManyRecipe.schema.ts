import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCreateManyInputObjectSchema as RecipeCreateManyInputObjectSchema } from './objects/RecipeCreateManyInput.schema';

export const RecipeCreateManySchema: z.ZodType<Prisma.RecipeCreateManyArgs> = z
  .object({
    data: z.union([
      RecipeCreateManyInputObjectSchema,
      z.array(RecipeCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.RecipeCreateManyArgs>;

export const RecipeCreateManyZodSchema = z
  .object({
    data: z.union([
      RecipeCreateManyInputObjectSchema,
      z.array(RecipeCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
