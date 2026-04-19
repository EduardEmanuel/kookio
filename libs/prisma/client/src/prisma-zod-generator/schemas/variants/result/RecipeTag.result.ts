import * as z from 'zod';

// prettier-ignore
export const RecipeTagResultSchema = z.object({
    id: z.string(),
    recipeId: z.string(),
    tag: z.string(),
    recipe: z.unknown()
}).strict();

export type RecipeTagResultType = z.infer<typeof RecipeTagResultSchema>;
