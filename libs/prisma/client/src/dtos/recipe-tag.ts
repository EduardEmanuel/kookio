import z from 'zod';
import {
  RecipeTagCountResultSchema,
  RecipeTagCountSchema,
  RecipeTagCreateManyResultSchema,
  RecipeTagCreateManySchema,
  RecipeTagCreateOneSchema,
  RecipeTagCreateResultSchema,
  RecipeTagDeleteManyResultSchema,
  RecipeTagDeleteManySchema,
  RecipeTagDeleteOneSchema,
  RecipeTagDeleteResultSchema,
  RecipeTagFindManyResultSchema,
  RecipeTagFindManySchema,
  RecipeTagFindUniqueResultSchema,
  RecipeTagFindUniqueSchema,
  RecipeTagGroupByResultSchema,
  RecipeTagGroupBySchema,
  RecipeTagUpdateManyResultSchema,
  RecipeTagUpdateManySchema,
  RecipeTagUpdateOneSchema,
  RecipeTagUpdateResultSchema,
  RecipeTagUpsertOneSchema,
  RecipeTagUpsertResultSchema,
  RecipeTagInputSchema,
} from '../prisma-zod-generator/index';

export type CountRecipeTagDTO = z.output<typeof RecipeTagCountSchema>;
export type CountRecipeTagResultDTO = z.output<
  typeof RecipeTagCountResultSchema
>;
export type CreateOneRecipeTagDTO = z.output<typeof RecipeTagCreateOneSchema>;
export type CreateRecipeTagResultDTO = z.output<
  typeof RecipeTagCreateResultSchema
>;
export type CreateManyRecipeTagDTO = z.output<typeof RecipeTagCreateManySchema>;
export type CreateManyRecipeTagResultDTO = z.output<
  typeof RecipeTagCreateManyResultSchema
>;
export type DeleteOneRecipeTagDTO = z.output<typeof RecipeTagDeleteOneSchema>;
export type DeleteRecipeTagResultDTO = z.output<
  typeof RecipeTagDeleteResultSchema
>;
export type DeleteManyRecipeTagDTO = z.output<typeof RecipeTagDeleteManySchema>;
export type DeleteManyRecipeTagResultDTO = z.output<
  typeof RecipeTagDeleteManyResultSchema
>;
export type FindManyRecipeTagDTO = z.output<typeof RecipeTagFindManySchema>;
export type FindManyRecipeTagResultDTO = z.output<
  typeof RecipeTagFindManyResultSchema
>;
export type FindUniqueRecipeTagDTO = z.output<typeof RecipeTagFindUniqueSchema>;
export type FindUniqueRecipeTagResultDTO = z.output<
  typeof RecipeTagFindUniqueResultSchema
>;
export type GroupByRecipeTagDTO = z.output<typeof RecipeTagGroupBySchema>;
export type GroupByRecipeTagResultDTO = z.output<
  typeof RecipeTagGroupByResultSchema
>;
export type UpdateOneRecipeTagDTO = z.output<typeof RecipeTagUpdateOneSchema>;
export type UpdateRecipeTagResultDTO = z.output<
  typeof RecipeTagUpdateResultSchema
>;
export type UpdateManyRecipeTagDTO = z.output<typeof RecipeTagUpdateManySchema>;
export type UpdateManyRecipeTagResultDTO = z.output<
  typeof RecipeTagUpdateManyResultSchema
>;
export type UpsertOneRecipeTagDTO = z.output<typeof RecipeTagUpsertOneSchema>;
export type UpsertRecipeTagResultDTO = z.output<
  typeof RecipeTagUpsertResultSchema
>;
export const RecipeTagSeedRowSchema = RecipeTagInputSchema.pick({ tag: true });
export type RecipeTagSeedRow = z.output<typeof RecipeTagSeedRowSchema>;
