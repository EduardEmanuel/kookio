import * as z from 'zod';

// prettier-ignore
export const RecipeTagInputSchema = z.object({
    id: z.string(),
    recipeId: z.string(),
    tag: z.string(),
    recipe: z.unknown()
}).strict();

export type RecipeTagInputType = z.infer<typeof RecipeTagInputSchema>;
