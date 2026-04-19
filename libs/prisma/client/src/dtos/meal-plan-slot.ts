import z from 'zod';
import {
  MealPlanSlotCountResultSchema,
  MealPlanSlotCountSchema,
  MealPlanSlotCreateManyResultSchema,
  MealPlanSlotCreateManySchema,
  MealPlanSlotCreateOneSchema,
  MealPlanSlotCreateResultSchema,
  MealPlanSlotDeleteManyResultSchema,
  MealPlanSlotDeleteManySchema,
  MealPlanSlotDeleteOneSchema,
  MealPlanSlotDeleteResultSchema,
  MealPlanSlotFindManyResultSchema,
  MealPlanSlotFindManySchema,
  MealPlanSlotFindUniqueResultSchema,
  MealPlanSlotFindUniqueSchema,
  MealPlanSlotGroupByResultSchema,
  MealPlanSlotGroupBySchema,
  MealPlanSlotUpdateManyResultSchema,
  MealPlanSlotUpdateManySchema,
  MealPlanSlotUpdateOneSchema,
  MealPlanSlotUpdateResultSchema,
  MealPlanSlotUpsertOneSchema,
  MealPlanSlotUpsertResultSchema,
} from '../prisma-zod-generator/index';

export type CountMealPlanSlotDTO = z.output<typeof MealPlanSlotCountSchema>;
export type CountMealPlanSlotResultDTO = z.output<
  typeof MealPlanSlotCountResultSchema
>;
export type CreateOneMealPlanSlotDTO = z.output<
  typeof MealPlanSlotCreateOneSchema
>;
export type CreateMealPlanSlotResultDTO = z.output<
  typeof MealPlanSlotCreateResultSchema
>;
export type CreateManyMealPlanSlotDTO = z.output<
  typeof MealPlanSlotCreateManySchema
>;
export type CreateManyMealPlanSlotResultDTO = z.output<
  typeof MealPlanSlotCreateManyResultSchema
>;
export type DeleteOneMealPlanSlotDTO = z.output<
  typeof MealPlanSlotDeleteOneSchema
>;
export type DeleteMealPlanSlotResultDTO = z.output<
  typeof MealPlanSlotDeleteResultSchema
>;
export type DeleteManyMealPlanSlotDTO = z.output<
  typeof MealPlanSlotDeleteManySchema
>;
export type DeleteManyMealPlanSlotResultDTO = z.output<
  typeof MealPlanSlotDeleteManyResultSchema
>;
export type FindManyMealPlanSlotDTO = z.output<
  typeof MealPlanSlotFindManySchema
>;
export type FindManyMealPlanSlotResultDTO = z.output<
  typeof MealPlanSlotFindManyResultSchema
>;
export type FindUniqueMealPlanSlotDTO = z.output<
  typeof MealPlanSlotFindUniqueSchema
>;
export type FindUniqueMealPlanSlotResultDTO = z.output<
  typeof MealPlanSlotFindUniqueResultSchema
>;
export type GroupByMealPlanSlotDTO = z.output<typeof MealPlanSlotGroupBySchema>;
export type GroupByMealPlanSlotResultDTO = z.output<
  typeof MealPlanSlotGroupByResultSchema
>;
export type UpdateOneMealPlanSlotDTO = z.output<
  typeof MealPlanSlotUpdateOneSchema
>;
export type UpdateMealPlanSlotResultDTO = z.output<
  typeof MealPlanSlotUpdateResultSchema
>;
export type UpdateManyMealPlanSlotDTO = z.output<
  typeof MealPlanSlotUpdateManySchema
>;
export type UpdateManyMealPlanSlotResultDTO = z.output<
  typeof MealPlanSlotUpdateManyResultSchema
>;
export type UpsertOneMealPlanSlotDTO = z.output<
  typeof MealPlanSlotUpsertOneSchema
>;
export type UpsertMealPlanSlotResultDTO = z.output<
  typeof MealPlanSlotUpsertResultSchema
>;
