import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeTagCreateManyInputObjectSchema as RecipeTagCreateManyInputObjectSchema } from './objects/RecipeTagCreateManyInput.schema';

export const RecipeTagCreateManySchema: z.ZodType<Prisma.RecipeTagCreateManyArgs> =
  z
    .object({
      data: z.union([
        RecipeTagCreateManyInputObjectSchema,
        z.array(RecipeTagCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeTagCreateManyArgs>;

export const RecipeTagCreateManyZodSchema = z
  .object({
    data: z.union([
      RecipeTagCreateManyInputObjectSchema,
      z.array(RecipeTagCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
