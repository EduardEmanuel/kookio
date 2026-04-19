import z from 'zod';
import {
  MealPlanCountResultSchema,
  MealPlanCountSchema,
  MealPlanCreateManyResultSchema,
  MealPlanCreateManySchema,
  MealPlanCreateOneSchema,
  MealPlanCreateResultSchema,
  MealPlanDeleteManyResultSchema,
  MealPlanDeleteManySchema,
  MealPlanDeleteOneSchema,
  MealPlanDeleteResultSchema,
  MealPlanFindManyResultSchema,
  MealPlanFindManySchema,
  MealPlanFindUniqueResultSchema,
  MealPlanFindUniqueSchema,
  MealPlanGroupByResultSchema,
  MealPlanGroupBySchema,
  MealPlanUpdateManyResultSchema,
  MealPlanUpdateManySchema,
  MealPlanUpdateOneSchema,
  MealPlanUpdateResultSchema,
  MealPlanUpsertOneSchema,
  MealPlanUpsertResultSchema,
} from '../prisma-zod-generator/index';

export type CountMealPlanDTO = z.output<typeof MealPlanCountSchema>;
export type CountMealPlanResultDTO = z.output<typeof MealPlanCountResultSchema>;
export type CreateOneMealPlanDTO = z.output<typeof MealPlanCreateOneSchema>;
export type CreateMealPlanResultDTO = z.output<
  typeof MealPlanCreateResultSchema
>;
export type CreateManyMealPlanDTO = z.output<typeof MealPlanCreateManySchema>;
export type CreateManyMealPlanResultDTO = z.output<
  typeof MealPlanCreateManyResultSchema
>;
export type DeleteOneMealPlanDTO = z.output<typeof MealPlanDeleteOneSchema>;
export type DeleteMealPlanResultDTO = z.output<
  typeof MealPlanDeleteResultSchema
>;
export type DeleteManyMealPlanDTO = z.output<typeof MealPlanDeleteManySchema>;
export type DeleteManyMealPlanResultDTO = z.output<
  typeof MealPlanDeleteManyResultSchema
>;
export type FindManyMealPlanDTO = z.output<typeof MealPlanFindManySchema>;
export type FindManyMealPlanResultDTO = z.output<
  typeof MealPlanFindManyResultSchema
>;
export type FindUniqueMealPlanDTO = z.output<typeof MealPlanFindUniqueSchema>;
export type FindUniqueMealPlanResultDTO = z.output<
  typeof MealPlanFindUniqueResultSchema
>;
export type GroupByMealPlanDTO = z.output<typeof MealPlanGroupBySchema>;
export type GroupByMealPlanResultDTO = z.output<
  typeof MealPlanGroupByResultSchema
>;
export type UpdateOneMealPlanDTO = z.output<typeof MealPlanUpdateOneSchema>;
export type UpdateMealPlanResultDTO = z.output<
  typeof MealPlanUpdateResultSchema
>;
export type UpdateManyMealPlanDTO = z.output<typeof MealPlanUpdateManySchema>;
export type UpdateManyMealPlanResultDTO = z.output<
  typeof MealPlanUpdateManyResultSchema
>;
export type UpsertOneMealPlanDTO = z.output<typeof MealPlanUpsertOneSchema>;
export type UpsertMealPlanResultDTO = z.output<
  typeof MealPlanUpsertResultSchema
>;
