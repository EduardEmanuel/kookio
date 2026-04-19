import * as z from 'zod';
export const RecipeAggregateResultSchema = z.object({
  _count: z
    .object({
      id: z.number(),
      externalId: z.number(),
      slug: z.number(),
      title: z.number(),
      description: z.number(),
      imageUrl: z.number(),
      youtubeUrl: z.number(),
      sourceUrl: z.number(),
      instructions: z.number(),
      status: z.number(),
      servings: z.number(),
      prepTimeMinutes: z.number(),
      cookTimeMinutes: z.number(),
      categoryId: z.number(),
      areaId: z.number(),
      authorId: z.number(),
      createdAt: z.number(),
      updatedAt: z.number(),
      category: z.number(),
      area: z.number(),
      author: z.number(),
      ingredients: z.number(),
      tags: z.number(),
      collectionEntries: z.number(),
      mealPlanSlots: z.number(),
      cookingSessions: z.number(),
    })
    .optional(),
  _sum: z
    .object({
      servings: z.number().nullable(),
      prepTimeMinutes: z.number().nullable(),
      cookTimeMinutes: z.number().nullable(),
    })
    .nullable()
    .optional(),
  _avg: z
    .object({
      servings: z.number().nullable(),
      prepTimeMinutes: z.number().nullable(),
      cookTimeMinutes: z.number().nullable(),
    })
    .nullable()
    .optional(),
  _min: z
    .object({
      id: z.string().nullable(),
      externalId: z.string().nullable(),
      slug: z.string().nullable(),
      title: z.string().nullable(),
      description: z.string().nullable(),
      imageUrl: z.string().nullable(),
      youtubeUrl: z.string().nullable(),
      sourceUrl: z.string().nullable(),
      instructions: z.string().nullable(),
      servings: z.number().int().nullable(),
      prepTimeMinutes: z.number().int().nullable(),
      cookTimeMinutes: z.number().int().nullable(),
      categoryId: z.string().nullable(),
      areaId: z.string().nullable(),
      authorId: z.string().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
  _max: z
    .object({
      id: z.string().nullable(),
      externalId: z.string().nullable(),
      slug: z.string().nullable(),
      title: z.string().nullable(),
      description: z.string().nullable(),
      imageUrl: z.string().nullable(),
      youtubeUrl: z.string().nullable(),
      sourceUrl: z.string().nullable(),
      instructions: z.string().nullable(),
      servings: z.number().int().nullable(),
      prepTimeMinutes: z.number().int().nullable(),
      cookTimeMinutes: z.number().int().nullable(),
      categoryId: z.string().nullable(),
      areaId: z.string().nullable(),
      authorId: z.string().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
});
