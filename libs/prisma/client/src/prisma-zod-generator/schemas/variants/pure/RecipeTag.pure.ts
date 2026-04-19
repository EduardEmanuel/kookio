import * as z from 'zod';

// prettier-ignore
export const RecipeTagModelSchema = z.object({
    id: z.string(),
    recipeId: z.string(),
    tag: z.string(),
    recipe: z.unknown()
}).strict();

export type RecipeTagPureType = z.infer<typeof RecipeTagModelSchema>;
