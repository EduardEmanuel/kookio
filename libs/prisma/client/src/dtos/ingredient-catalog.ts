import z from 'zod';
import {
  IngredientCatalogCountResultSchema,
  IngredientCatalogCountSchema,
  IngredientCatalogCreateManyResultSchema,
  IngredientCatalogCreateManySchema,
  IngredientCatalogCreateOneSchema,
  IngredientCatalogCreateResultSchema,
  IngredientCatalogDeleteManyResultSchema,
  IngredientCatalogDeleteManySchema,
  IngredientCatalogDeleteOneSchema,
  IngredientCatalogDeleteResultSchema,
  IngredientCatalogFindManyResultSchema,
  IngredientCatalogFindManySchema,
  IngredientCatalogFindUniqueResultSchema,
  IngredientCatalogFindUniqueSchema,
  IngredientCatalogGroupByResultSchema,
  IngredientCatalogGroupBySchema,
  IngredientCatalogUpdateManyResultSchema,
  IngredientCatalogUpdateManySchema,
  IngredientCatalogUpdateOneSchema,
  IngredientCatalogUpdateResultSchema,
  IngredientCatalogUpsertOneSchema,
  IngredientCatalogUpsertResultSchema,
  IngredientCatalogModelSchema,
} from '../prisma-zod-generator/index';

export type CountIngredientCatalogDTO = z.output<
  typeof IngredientCatalogCountSchema
>;
export type CountIngredientCatalogResultDTO = z.output<
  typeof IngredientCatalogCountResultSchema
>;
export type CreateOneIngredientCatalogDTO = z.output<
  typeof IngredientCatalogCreateOneSchema
>;
export type CreateIngredientCatalogResultDTO = z.output<
  typeof IngredientCatalogCreateResultSchema
>;
export type CreateManyIngredientCatalogDTO = z.output<
  typeof IngredientCatalogCreateManySchema
>;
export type CreateManyIngredientCatalogResultDTO = z.output<
  typeof IngredientCatalogCreateManyResultSchema
>;
export type DeleteOneIngredientCatalogDTO = z.output<
  typeof IngredientCatalogDeleteOneSchema
>;
export type DeleteIngredientCatalogResultDTO = z.output<
  typeof IngredientCatalogDeleteResultSchema
>;
export type DeleteManyIngredientCatalogDTO = z.output<
  typeof IngredientCatalogDeleteManySchema
>;
export type DeleteManyIngredientCatalogResultDTO = z.output<
  typeof IngredientCatalogDeleteManyResultSchema
>;
export type FindManyIngredientCatalogDTO = z.output<
  typeof IngredientCatalogFindManySchema
>;
export type FindManyIngredientCatalogResultDTO = z.output<
  typeof IngredientCatalogFindManyResultSchema
>;
export type FindUniqueIngredientCatalogDTO = z.output<
  typeof IngredientCatalogFindUniqueSchema
>;
export type FindUniqueIngredientCatalogResultDTO = z.output<
  typeof IngredientCatalogFindUniqueResultSchema
>;
export type GroupByIngredientCatalogDTO = z.output<
  typeof IngredientCatalogGroupBySchema
>;
export type GroupByIngredientCatalogResultDTO = z.output<
  typeof IngredientCatalogGroupByResultSchema
>;
export type UpdateOneIngredientCatalogDTO = z.output<
  typeof IngredientCatalogUpdateOneSchema
>;
export type UpdateIngredientCatalogResultDTO = z.output<
  typeof IngredientCatalogUpdateResultSchema
>;
export type UpdateManyIngredientCatalogDTO = z.output<
  typeof IngredientCatalogUpdateManySchema
>;
export type UpdateManyIngredientCatalogResultDTO = z.output<
  typeof IngredientCatalogUpdateManyResultSchema
>;
export type UpsertOneIngredientCatalogDTO = z.output<
  typeof IngredientCatalogUpsertOneSchema
>;
export type UpsertIngredientCatalogResultDTO = z.output<
  typeof IngredientCatalogUpsertResultSchema
>;
export const IngredientCatalogSeedRowSchema = IngredientCatalogModelSchema.omit(
  {
    id: true,
    createdAt: true,
    updatedAt: true,
    recipeIngredients: true,
    pantryItems: true,
  },
);
export type IngredientCatalogSeedRow = z.output<
  typeof IngredientCatalogSeedRowSchema
>;

export const IngredientCatalogLookupRowSchema =
  IngredientCatalogModelSchema.pick({
    id: true,
    normalizedName: true,
  });
export type IngredientCatalogLookupRow = z.output<
  typeof IngredientCatalogLookupRowSchema
>;
