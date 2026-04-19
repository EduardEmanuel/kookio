import * as z from 'zod';

import { RecipeStatusSchema } from '../../enums/RecipeStatus.schema';
// prettier-ignore
export const RecipeResultSchema = z.object({
    id: z.string(),
    externalId: z.string().nullable(),
    slug: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    imageUrl: z.string().nullable(),
    youtubeUrl: z.string().nullable(),
    sourceUrl: z.string().nullable(),
    instructions: z.string(),
    status: RecipeStatusSchema,
    servings: z.number().int(),
    prepTimeMinutes: z.number().int().nullable(),
    cookTimeMinutes: z.number().int().nullable(),
    categoryId: z.string().nullable(),
    areaId: z.string().nullable(),
    authorId: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    category: z.unknown().nullable(),
    area: z.unknown().nullable(),
    author: z.unknown().nullable(),
    ingredients: z.array(z.unknown()),
    tags: z.array(z.unknown()),
    collectionEntries: z.array(z.unknown()),
    mealPlanSlots: z.array(z.unknown()),
    cookingSessions: z.array(z.unknown())
}).strict();

export type RecipeResultType = z.infer<typeof RecipeResultSchema>;
