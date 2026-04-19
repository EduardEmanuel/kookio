import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionCreateManyInputObjectSchema as RecipeCollectionCreateManyInputObjectSchema } from './objects/RecipeCollectionCreateManyInput.schema';

export const RecipeCollectionCreateManySchema: z.ZodType<Prisma.RecipeCollectionCreateManyArgs> =
  z
    .object({
      data: z.union([
        RecipeCollectionCreateManyInputObjectSchema,
        z.array(RecipeCollectionCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionCreateManyArgs>;

export const RecipeCollectionCreateManyZodSchema = z
  .object({
    data: z.union([
      RecipeCollectionCreateManyInputObjectSchema,
      z.array(RecipeCollectionCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
