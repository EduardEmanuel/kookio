import z from 'zod';
import {
  MealAreaCountResultSchema,
  MealAreaCountSchema,
  MealAreaCreateManyResultSchema,
  MealAreaCreateManySchema,
  MealAreaCreateOneSchema,
  MealAreaCreateResultSchema,
  MealAreaDeleteManyResultSchema,
  MealAreaDeleteManySchema,
  MealAreaDeleteOneSchema,
  MealAreaDeleteResultSchema,
  MealAreaFindManyResultSchema,
  MealAreaFindManySchema,
  MealAreaFindUniqueResultSchema,
  MealAreaFindUniqueSchema,
  MealAreaGroupByResultSchema,
  MealAreaGroupBySchema,
  MealAreaUpdateManyResultSchema,
  MealAreaUpdateManySchema,
  MealAreaUpdateOneSchema,
  MealAreaUpdateResultSchema,
  MealAreaUpsertOneSchema,
  MealAreaUpsertResultSchema,
  MealAreaModelSchema,
} from '../prisma-zod-generator/index';

export type CountMealAreaDTO = z.output<typeof MealAreaCountSchema>;
export type CountMealAreaResultDTO = z.output<typeof MealAreaCountResultSchema>;
export type CreateOneMealAreaDTO = z.output<typeof MealAreaCreateOneSchema>;
export type CreateMealAreaResultDTO = z.output<
  typeof MealAreaCreateResultSchema
>;
export type CreateManyMealAreaDTO = z.output<typeof MealAreaCreateManySchema>;
export type CreateManyMealAreaResultDTO = z.output<
  typeof MealAreaCreateManyResultSchema
>;
export type DeleteOneMealAreaDTO = z.output<typeof MealAreaDeleteOneSchema>;
export type DeleteMealAreaResultDTO = z.output<
  typeof MealAreaDeleteResultSchema
>;
export type DeleteManyMealAreaDTO = z.output<typeof MealAreaDeleteManySchema>;
export type DeleteManyMealAreaResultDTO = z.output<
  typeof MealAreaDeleteManyResultSchema
>;
export type FindManyMealAreaDTO = z.output<typeof MealAreaFindManySchema>;
export type FindManyMealAreaResultDTO = z.output<
  typeof MealAreaFindManyResultSchema
>;
export type FindUniqueMealAreaDTO = z.output<typeof MealAreaFindUniqueSchema>;
export type FindUniqueMealAreaResultDTO = z.output<
  typeof MealAreaFindUniqueResultSchema
>;
export type GroupByMealAreaDTO = z.output<typeof MealAreaGroupBySchema>;
export type GroupByMealAreaResultDTO = z.output<
  typeof MealAreaGroupByResultSchema
>;
export type UpdateOneMealAreaDTO = z.output<typeof MealAreaUpdateOneSchema>;
export type UpdateMealAreaResultDTO = z.output<
  typeof MealAreaUpdateResultSchema
>;
export type UpdateManyMealAreaDTO = z.output<typeof MealAreaUpdateManySchema>;
export type UpdateManyMealAreaResultDTO = z.output<
  typeof MealAreaUpdateManyResultSchema
>;
export type UpsertOneMealAreaDTO = z.output<typeof MealAreaUpsertOneSchema>;
export type UpsertMealAreaResultDTO = z.output<
  typeof MealAreaUpsertResultSchema
>;
export const MealAreaSeedRowSchema = MealAreaModelSchema.omit({
  id: true,
  createdAt: true,
  recipes: true,
});
export type MealAreaSeedRow = z.output<typeof MealAreaSeedRowSchema>;
