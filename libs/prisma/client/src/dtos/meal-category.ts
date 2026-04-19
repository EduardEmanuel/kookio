import z from 'zod';
import {
  MealCategoryCountResultSchema,
  MealCategoryCountSchema,
  MealCategoryCreateManyResultSchema,
  MealCategoryCreateManySchema,
  MealCategoryCreateOneSchema,
  MealCategoryCreateResultSchema,
  MealCategoryDeleteManyResultSchema,
  MealCategoryDeleteManySchema,
  MealCategoryDeleteOneSchema,
  MealCategoryDeleteResultSchema,
  MealCategoryFindManyResultSchema,
  MealCategoryFindManySchema,
  MealCategoryFindUniqueResultSchema,
  MealCategoryFindUniqueSchema,
  MealCategoryGroupByResultSchema,
  MealCategoryGroupBySchema,
  MealCategoryUpdateManyResultSchema,
  MealCategoryUpdateManySchema,
  MealCategoryUpdateOneSchema,
  MealCategoryUpdateResultSchema,
  MealCategoryUpsertOneSchema,
  MealCategoryUpsertResultSchema,
  MealCategoryModelSchema,
} from '../prisma-zod-generator/index';

export type CountMealCategoryDTO = z.output<typeof MealCategoryCountSchema>;
export type CountMealCategoryResultDTO = z.output<
  typeof MealCategoryCountResultSchema
>;
export type CreateOneMealCategoryDTO = z.output<
  typeof MealCategoryCreateOneSchema
>;
export type CreateMealCategoryResultDTO = z.output<
  typeof MealCategoryCreateResultSchema
>;
export type CreateManyMealCategoryDTO = z.output<
  typeof MealCategoryCreateManySchema
>;
export type CreateManyMealCategoryResultDTO = z.output<
  typeof MealCategoryCreateManyResultSchema
>;
export type DeleteOneMealCategoryDTO = z.output<
  typeof MealCategoryDeleteOneSchema
>;
export type DeleteMealCategoryResultDTO = z.output<
  typeof MealCategoryDeleteResultSchema
>;
export type DeleteManyMealCategoryDTO = z.output<
  typeof MealCategoryDeleteManySchema
>;
export type DeleteManyMealCategoryResultDTO = z.output<
  typeof MealCategoryDeleteManyResultSchema
>;
export type FindManyMealCategoryDTO = z.output<
  typeof MealCategoryFindManySchema
>;
export type FindManyMealCategoryResultDTO = z.output<
  typeof MealCategoryFindManyResultSchema
>;
export type FindUniqueMealCategoryDTO = z.output<
  typeof MealCategoryFindUniqueSchema
>;
export type FindUniqueMealCategoryResultDTO = z.output<
  typeof MealCategoryFindUniqueResultSchema
>;
export type GroupByMealCategoryDTO = z.output<typeof MealCategoryGroupBySchema>;
export type GroupByMealCategoryResultDTO = z.output<
  typeof MealCategoryGroupByResultSchema
>;
export type UpdateOneMealCategoryDTO = z.output<
  typeof MealCategoryUpdateOneSchema
>;
export type UpdateMealCategoryResultDTO = z.output<
  typeof MealCategoryUpdateResultSchema
>;
export type UpdateManyMealCategoryDTO = z.output<
  typeof MealCategoryUpdateManySchema
>;
export type UpdateManyMealCategoryResultDTO = z.output<
  typeof MealCategoryUpdateManyResultSchema
>;
export type UpsertOneMealCategoryDTO = z.output<
  typeof MealCategoryUpsertOneSchema
>;
export type UpsertMealCategoryResultDTO = z.output<
  typeof MealCategoryUpsertResultSchema
>;
export const MealCategorySeedRowSchema = MealCategoryModelSchema.omit({
  id: true,
  createdAt: true,
  recipes: true,
});
export type MealCategorySeedRow = z.output<typeof MealCategorySeedRowSchema>;
