import * as z from 'zod';

import { RecipeStatusSchema } from '../../enums/RecipeStatus.schema';
// prettier-ignore
export const RecipeInputSchema = z.object({
    id: z.string(),
    externalId: z.string().optional().nullable(),
    slug: z.string(),
    title: z.string(),
    description: z.string().optional().nullable(),
    imageUrl: z.string().optional().nullable(),
    youtubeUrl: z.string().optional().nullable(),
    sourceUrl: z.string().optional().nullable(),
    instructions: z.string(),
    status: RecipeStatusSchema,
    servings: z.number().int(),
    prepTimeMinutes: z.number().int().optional().nullable(),
    cookTimeMinutes: z.number().int().optional().nullable(),
    categoryId: z.string().optional().nullable(),
    areaId: z.string().optional().nullable(),
    authorId: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    category: z.unknown().optional().nullable(),
    area: z.unknown().optional().nullable(),
    author: z.unknown().optional().nullable(),
    ingredients: z.array(z.unknown()),
    tags: z.array(z.unknown()),
    collectionEntries: z.array(z.unknown()),
    mealPlanSlots: z.array(z.unknown()),
    cookingSessions: z.array(z.unknown())
}).strict();

export type RecipeInputType = z.infer<typeof RecipeInputSchema>;
