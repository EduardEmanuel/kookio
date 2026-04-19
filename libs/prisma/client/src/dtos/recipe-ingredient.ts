import z from 'zod';
import {
  RecipeIngredientCountResultSchema,
  RecipeIngredientCountSchema,
  RecipeIngredientCreateManyResultSchema,
  RecipeIngredientCreateManySchema,
  RecipeIngredientCreateOneSchema,
  RecipeIngredientCreateResultSchema,
  RecipeIngredientDeleteManyResultSchema,
  RecipeIngredientDeleteManySchema,
  RecipeIngredientDeleteOneSchema,
  RecipeIngredientDeleteResultSchema,
  RecipeIngredientFindManyResultSchema,
  RecipeIngredientFindManySchema,
  RecipeIngredientFindUniqueResultSchema,
  RecipeIngredientFindUniqueSchema,
  RecipeIngredientGroupByResultSchema,
  RecipeIngredientGroupBySchema,
  RecipeIngredientUpdateManyResultSchema,
  RecipeIngredientUpdateManySchema,
  RecipeIngredientUpdateOneSchema,
  RecipeIngredientUpdateResultSchema,
  RecipeIngredientUpsertOneSchema,
  RecipeIngredientUpsertResultSchema,
  RecipeIngredientInputSchema,
} from '../prisma-zod-generator/index';

export type CountRecipeIngredientDTO = z.output<
  typeof RecipeIngredientCountSchema
>;
export type CountRecipeIngredientResultDTO = z.output<
  typeof RecipeIngredientCountResultSchema
>;
export type CreateOneRecipeIngredientDTO = z.output<
  typeof RecipeIngredientCreateOneSchema
>;
export type CreateRecipeIngredientResultDTO = z.output<
  typeof RecipeIngredientCreateResultSchema
>;
export type CreateManyRecipeIngredientDTO = z.output<
  typeof RecipeIngredientCreateManySchema
>;
export type CreateManyRecipeIngredientResultDTO = z.output<
  typeof RecipeIngredientCreateManyResultSchema
>;
export type DeleteOneRecipeIngredientDTO = z.output<
  typeof RecipeIngredientDeleteOneSchema
>;
export type DeleteRecipeIngredientResultDTO = z.output<
  typeof RecipeIngredientDeleteResultSchema
>;
export type DeleteManyRecipeIngredientDTO = z.output<
  typeof RecipeIngredientDeleteManySchema
>;
export type DeleteManyRecipeIngredientResultDTO = z.output<
  typeof RecipeIngredientDeleteManyResultSchema
>;
export type FindManyRecipeIngredientDTO = z.output<
  typeof RecipeIngredientFindManySchema
>;
export type FindManyRecipeIngredientResultDTO = z.output<
  typeof RecipeIngredientFindManyResultSchema
>;
export type FindUniqueRecipeIngredientDTO = z.output<
  typeof RecipeIngredientFindUniqueSchema
>;
export type FindUniqueRecipeIngredientResultDTO = z.output<
  typeof RecipeIngredientFindUniqueResultSchema
>;
export type GroupByRecipeIngredientDTO = z.output<
  typeof RecipeIngredientGroupBySchema
>;
export type GroupByRecipeIngredientResultDTO = z.output<
  typeof RecipeIngredientGroupByResultSchema
>;
export type UpdateOneRecipeIngredientDTO = z.output<
  typeof RecipeIngredientUpdateOneSchema
>;
export type UpdateRecipeIngredientResultDTO = z.output<
  typeof RecipeIngredientUpdateResultSchema
>;
export type UpdateManyRecipeIngredientDTO = z.output<
  typeof RecipeIngredientUpdateManySchema
>;
export type UpdateManyRecipeIngredientResultDTO = z.output<
  typeof RecipeIngredientUpdateManyResultSchema
>;
export type UpsertOneRecipeIngredientDTO = z.output<
  typeof RecipeIngredientUpsertOneSchema
>;
export type UpsertRecipeIngredientResultDTO = z.output<
  typeof RecipeIngredientUpsertResultSchema
>;
export const RecipeIngredientSeedRowSchema = RecipeIngredientInputSchema.omit({
  id: true,
  recipeId: true,
  ingredientCatalogId: true,
  recipe: true,
  ingredient: true,
}).extend({ ingredientNormalizedName: z.string() });
export type RecipeIngredientSeedRow = z.output<
  typeof RecipeIngredientSeedRowSchema
>;
