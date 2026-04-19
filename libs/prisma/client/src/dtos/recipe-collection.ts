import z from 'zod';
import {
  RecipeCollectionCountResultSchema,
  RecipeCollectionCountSchema,
  RecipeCollectionCreateManyResultSchema,
  RecipeCollectionCreateManySchema,
  RecipeCollectionCreateOneSchema,
  RecipeCollectionCreateResultSchema,
  RecipeCollectionDeleteManyResultSchema,
  RecipeCollectionDeleteManySchema,
  RecipeCollectionDeleteOneSchema,
  RecipeCollectionDeleteResultSchema,
  RecipeCollectionFindManyResultSchema,
  RecipeCollectionFindManySchema,
  RecipeCollectionFindUniqueResultSchema,
  RecipeCollectionFindUniqueSchema,
  RecipeCollectionGroupByResultSchema,
  RecipeCollectionGroupBySchema,
  RecipeCollectionUpdateManyResultSchema,
  RecipeCollectionUpdateManySchema,
  RecipeCollectionUpdateOneSchema,
  RecipeCollectionUpdateResultSchema,
  RecipeCollectionUpsertOneSchema,
  RecipeCollectionUpsertResultSchema,
} from '../prisma-zod-generator/index';

export type CountRecipeCollectionDTO = z.output<
  typeof RecipeCollectionCountSchema
>;
export type CountRecipeCollectionResultDTO = z.output<
  typeof RecipeCollectionCountResultSchema
>;
export type CreateOneRecipeCollectionDTO = z.output<
  typeof RecipeCollectionCreateOneSchema
>;
export type CreateRecipeCollectionResultDTO = z.output<
  typeof RecipeCollectionCreateResultSchema
>;
export type CreateManyRecipeCollectionDTO = z.output<
  typeof RecipeCollectionCreateManySchema
>;
export type CreateManyRecipeCollectionResultDTO = z.output<
  typeof RecipeCollectionCreateManyResultSchema
>;
export type DeleteOneRecipeCollectionDTO = z.output<
  typeof RecipeCollectionDeleteOneSchema
>;
export type DeleteRecipeCollectionResultDTO = z.output<
  typeof RecipeCollectionDeleteResultSchema
>;
export type DeleteManyRecipeCollectionDTO = z.output<
  typeof RecipeCollectionDeleteManySchema
>;
export type DeleteManyRecipeCollectionResultDTO = z.output<
  typeof RecipeCollectionDeleteManyResultSchema
>;
export type FindManyRecipeCollectionDTO = z.output<
  typeof RecipeCollectionFindManySchema
>;
export type FindManyRecipeCollectionResultDTO = z.output<
  typeof RecipeCollectionFindManyResultSchema
>;
export type FindUniqueRecipeCollectionDTO = z.output<
  typeof RecipeCollectionFindUniqueSchema
>;
export type FindUniqueRecipeCollectionResultDTO = z.output<
  typeof RecipeCollectionFindUniqueResultSchema
>;
export type GroupByRecipeCollectionDTO = z.output<
  typeof RecipeCollectionGroupBySchema
>;
export type GroupByRecipeCollectionResultDTO = z.output<
  typeof RecipeCollectionGroupByResultSchema
>;
export type UpdateOneRecipeCollectionDTO = z.output<
  typeof RecipeCollectionUpdateOneSchema
>;
export type UpdateRecipeCollectionResultDTO = z.output<
  typeof RecipeCollectionUpdateResultSchema
>;
export type UpdateManyRecipeCollectionDTO = z.output<
  typeof RecipeCollectionUpdateManySchema
>;
export type UpdateManyRecipeCollectionResultDTO = z.output<
  typeof RecipeCollectionUpdateManyResultSchema
>;
export type UpsertOneRecipeCollectionDTO = z.output<
  typeof RecipeCollectionUpsertOneSchema
>;
export type UpsertRecipeCollectionResultDTO = z.output<
  typeof RecipeCollectionUpsertResultSchema
>;
