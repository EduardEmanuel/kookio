import z from 'zod';
import {
  RecipeCountResultSchema,
  RecipeCountSchema,
  RecipeCreateManyResultSchema,
  RecipeCreateManySchema,
  RecipeCreateOneSchema,
  RecipeCreateResultSchema,
  RecipeDeleteManyResultSchema,
  RecipeDeleteManySchema,
  RecipeDeleteOneSchema,
  RecipeDeleteResultSchema,
  RecipeFindManyResultSchema,
  RecipeFindManySchema,
  RecipeFindUniqueResultSchema,
  RecipeFindUniqueSchema,
  RecipeGroupByResultSchema,
  RecipeGroupBySchema,
  RecipeUpdateManyResultSchema,
  RecipeUpdateManySchema,
  RecipeUpdateOneSchema,
  RecipeUpdateResultSchema,
  RecipeUpsertOneSchema,
  RecipeUpsertResultSchema,
  RecipeInputSchema,
} from '../prisma-zod-generator/index';
import { RecipeIngredientSeedRowSchema } from './recipe-ingredient';
import { RecipeTagSeedRowSchema } from './recipe-tag';

export type CountRecipeDTO = z.output<typeof RecipeCountSchema>;
export type CountRecipeResultDTO = z.output<typeof RecipeCountResultSchema>;
export type CreateOneRecipeDTO = z.output<typeof RecipeCreateOneSchema>;
export type CreateRecipeResultDTO = z.output<typeof RecipeCreateResultSchema>;
export type CreateManyRecipeDTO = z.output<typeof RecipeCreateManySchema>;
export type CreateManyRecipeResultDTO = z.output<
  typeof RecipeCreateManyResultSchema
>;
export type DeleteOneRecipeDTO = z.output<typeof RecipeDeleteOneSchema>;
export type DeleteRecipeResultDTO = z.output<typeof RecipeDeleteResultSchema>;
export type DeleteManyRecipeDTO = z.output<typeof RecipeDeleteManySchema>;
export type DeleteManyRecipeResultDTO = z.output<
  typeof RecipeDeleteManyResultSchema
>;
export type FindManyRecipeDTO = z.output<typeof RecipeFindManySchema>;
export type FindManyRecipeResultDTO = z.output<
  typeof RecipeFindManyResultSchema
>;
export type FindUniqueRecipeDTO = z.output<typeof RecipeFindUniqueSchema>;
export type FindUniqueRecipeResultDTO = z.output<
  typeof RecipeFindUniqueResultSchema
>;
export type GroupByRecipeDTO = z.output<typeof RecipeGroupBySchema>;
export type GroupByRecipeResultDTO = z.output<typeof RecipeGroupByResultSchema>;
export type UpdateOneRecipeDTO = z.output<typeof RecipeUpdateOneSchema>;
export type UpdateRecipeResultDTO = z.output<typeof RecipeUpdateResultSchema>;
export type UpdateManyRecipeDTO = z.output<typeof RecipeUpdateManySchema>;
export type UpdateManyRecipeResultDTO = z.output<
  typeof RecipeUpdateManyResultSchema
>;
export type UpsertOneRecipeDTO = z.output<typeof RecipeUpsertOneSchema>;
export type UpsertRecipeResultDTO = z.output<typeof RecipeUpsertResultSchema>;
export const RecipeSeedRowSchema = RecipeInputSchema.pick({
  externalId: true,
  slug: true,
  title: true,
  imageUrl: true,
  youtubeUrl: true,
  sourceUrl: true,
  instructions: true,
}).extend({
  categoryExternalId: z.string().nullable(),
  areaExternalId: z.string().nullable(),
  tags: z.array(RecipeTagSeedRowSchema),
  ingredients: z.array(RecipeIngredientSeedRowSchema),
});
export type RecipeSeedRow = z.output<typeof RecipeSeedRowSchema>;
