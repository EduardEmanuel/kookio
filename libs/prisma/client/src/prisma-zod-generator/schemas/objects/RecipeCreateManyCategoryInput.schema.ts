import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeStatusSchema } from '../enums/RecipeStatus.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      externalId: z.string().optional().nullable(),
      slug: z.string(),
      title: z.string(),
      description: z.string().optional().nullable(),
      imageUrl: z.string().optional().nullable(),
      youtubeUrl: z.string().optional().nullable(),
      sourceUrl: z.string().optional().nullable(),
      instructions: z.string(),
      status: RecipeStatusSchema.optional(),
      servings: z.number().int().optional(),
      prepTimeMinutes: z.number().int().optional().nullable(),
      cookTimeMinutes: z.number().int().optional().nullable(),
      areaId: z.string().optional().nullable(),
      authorId: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();
export const RecipeCreateManyCategoryInputObjectSchema: z.ZodType<Prisma.RecipeCreateManyCategoryInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCreateManyCategoryInput>;
export const RecipeCreateManyCategoryInputObjectZodSchema = makeSchema();
