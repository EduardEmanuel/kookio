import z from 'zod';
import {
  RecipeCollectionEntryCountResultSchema,
  RecipeCollectionEntryCountSchema,
  RecipeCollectionEntryCreateManyResultSchema,
  RecipeCollectionEntryCreateManySchema,
  RecipeCollectionEntryCreateOneSchema,
  RecipeCollectionEntryCreateResultSchema,
  RecipeCollectionEntryDeleteManyResultSchema,
  RecipeCollectionEntryDeleteManySchema,
  RecipeCollectionEntryDeleteOneSchema,
  RecipeCollectionEntryDeleteResultSchema,
  RecipeCollectionEntryFindManyResultSchema,
  RecipeCollectionEntryFindManySchema,
  RecipeCollectionEntryFindUniqueResultSchema,
  RecipeCollectionEntryFindUniqueSchema,
  RecipeCollectionEntryGroupByResultSchema,
  RecipeCollectionEntryGroupBySchema,
  RecipeCollectionEntryUpdateManyResultSchema,
  RecipeCollectionEntryUpdateManySchema,
  RecipeCollectionEntryUpdateOneSchema,
  RecipeCollectionEntryUpdateResultSchema,
  RecipeCollectionEntryUpsertOneSchema,
  RecipeCollectionEntryUpsertResultSchema,
} from '../prisma-zod-generator/index';

export type CountRecipeCollectionEntryDTO = z.output<
  typeof RecipeCollectionEntryCountSchema
>;
export type CountRecipeCollectionEntryResultDTO = z.output<
  typeof RecipeCollectionEntryCountResultSchema
>;
export type CreateOneRecipeCollectionEntryDTO = z.output<
  typeof RecipeCollectionEntryCreateOneSchema
>;
export type CreateRecipeCollectionEntryResultDTO = z.output<
  typeof RecipeCollectionEntryCreateResultSchema
>;
export type CreateManyRecipeCollectionEntryDTO = z.output<
  typeof RecipeCollectionEntryCreateManySchema
>;
export type CreateManyRecipeCollectionEntryResultDTO = z.output<
  typeof RecipeCollectionEntryCreateManyResultSchema
>;
export type DeleteOneRecipeCollectionEntryDTO = z.output<
  typeof RecipeCollectionEntryDeleteOneSchema
>;
export type DeleteRecipeCollectionEntryResultDTO = z.output<
  typeof RecipeCollectionEntryDeleteResultSchema
>;
export type DeleteManyRecipeCollectionEntryDTO = z.output<
  typeof RecipeCollectionEntryDeleteManySchema
>;
export type DeleteManyRecipeCollectionEntryResultDTO = z.output<
  typeof RecipeCollectionEntryDeleteManyResultSchema
>;
export type FindManyRecipeCollectionEntryDTO = z.output<
  typeof RecipeCollectionEntryFindManySchema
>;
export type FindManyRecipeCollectionEntryResultDTO = z.output<
  typeof RecipeCollectionEntryFindManyResultSchema
>;
export type FindUniqueRecipeCollectionEntryDTO = z.output<
  typeof RecipeCollectionEntryFindUniqueSchema
>;
export type FindUniqueRecipeCollectionEntryResultDTO = z.output<
  typeof RecipeCollectionEntryFindUniqueResultSchema
>;
export type GroupByRecipeCollectionEntryDTO = z.output<
  typeof RecipeCollectionEntryGroupBySchema
>;
export type GroupByRecipeCollectionEntryResultDTO = z.output<
  typeof RecipeCollectionEntryGroupByResultSchema
>;
export type UpdateOneRecipeCollectionEntryDTO = z.output<
  typeof RecipeCollectionEntryUpdateOneSchema
>;
export type UpdateRecipeCollectionEntryResultDTO = z.output<
  typeof RecipeCollectionEntryUpdateResultSchema
>;
export type UpdateManyRecipeCollectionEntryDTO = z.output<
  typeof RecipeCollectionEntryUpdateManySchema
>;
export type UpdateManyRecipeCollectionEntryResultDTO = z.output<
  typeof RecipeCollectionEntryUpdateManyResultSchema
>;
export type UpsertOneRecipeCollectionEntryDTO = z.output<
  typeof RecipeCollectionEntryUpsertOneSchema
>;
export type UpsertRecipeCollectionEntryResultDTO = z.output<
  typeof RecipeCollectionEntryUpsertResultSchema
>;
