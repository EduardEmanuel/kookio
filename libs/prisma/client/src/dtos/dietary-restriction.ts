import z from 'zod';
import {
  DietaryRestrictionCountResultSchema,
  DietaryRestrictionCountSchema,
  DietaryRestrictionCreateManyResultSchema,
  DietaryRestrictionCreateManySchema,
  DietaryRestrictionCreateOneSchema,
  DietaryRestrictionCreateResultSchema,
  DietaryRestrictionDeleteManyResultSchema,
  DietaryRestrictionDeleteManySchema,
  DietaryRestrictionDeleteOneSchema,
  DietaryRestrictionDeleteResultSchema,
  DietaryRestrictionFindManyResultSchema,
  DietaryRestrictionFindManySchema,
  DietaryRestrictionFindUniqueResultSchema,
  DietaryRestrictionFindUniqueSchema,
  DietaryRestrictionGroupByResultSchema,
  DietaryRestrictionGroupBySchema,
  DietaryRestrictionUpdateManyResultSchema,
  DietaryRestrictionUpdateManySchema,
  DietaryRestrictionUpdateOneSchema,
  DietaryRestrictionUpdateResultSchema,
  DietaryRestrictionUpsertOneSchema,
  DietaryRestrictionUpsertResultSchema,
} from '../prisma-zod-generator/index';

export type CountDietaryRestrictionDTO = z.output<
  typeof DietaryRestrictionCountSchema
>;
export type CountDietaryRestrictionResultDTO = z.output<
  typeof DietaryRestrictionCountResultSchema
>;
export type CreateOneDietaryRestrictionDTO = z.output<
  typeof DietaryRestrictionCreateOneSchema
>;
export type CreateDietaryRestrictionResultDTO = z.output<
  typeof DietaryRestrictionCreateResultSchema
>;
export type CreateManyDietaryRestrictionDTO = z.output<
  typeof DietaryRestrictionCreateManySchema
>;
export type CreateManyDietaryRestrictionResultDTO = z.output<
  typeof DietaryRestrictionCreateManyResultSchema
>;
export type DeleteOneDietaryRestrictionDTO = z.output<
  typeof DietaryRestrictionDeleteOneSchema
>;
export type DeleteDietaryRestrictionResultDTO = z.output<
  typeof DietaryRestrictionDeleteResultSchema
>;
export type DeleteManyDietaryRestrictionDTO = z.output<
  typeof DietaryRestrictionDeleteManySchema
>;
export type DeleteManyDietaryRestrictionResultDTO = z.output<
  typeof DietaryRestrictionDeleteManyResultSchema
>;
export type FindManyDietaryRestrictionDTO = z.output<
  typeof DietaryRestrictionFindManySchema
>;
export type FindManyDietaryRestrictionResultDTO = z.output<
  typeof DietaryRestrictionFindManyResultSchema
>;
export type FindUniqueDietaryRestrictionDTO = z.output<
  typeof DietaryRestrictionFindUniqueSchema
>;
export type FindUniqueDietaryRestrictionResultDTO = z.output<
  typeof DietaryRestrictionFindUniqueResultSchema
>;
export type GroupByDietaryRestrictionDTO = z.output<
  typeof DietaryRestrictionGroupBySchema
>;
export type GroupByDietaryRestrictionResultDTO = z.output<
  typeof DietaryRestrictionGroupByResultSchema
>;
export type UpdateOneDietaryRestrictionDTO = z.output<
  typeof DietaryRestrictionUpdateOneSchema
>;
export type UpdateDietaryRestrictionResultDTO = z.output<
  typeof DietaryRestrictionUpdateResultSchema
>;
export type UpdateManyDietaryRestrictionDTO = z.output<
  typeof DietaryRestrictionUpdateManySchema
>;
export type UpdateManyDietaryRestrictionResultDTO = z.output<
  typeof DietaryRestrictionUpdateManyResultSchema
>;
export type UpsertOneDietaryRestrictionDTO = z.output<
  typeof DietaryRestrictionUpsertOneSchema
>;
export type UpsertDietaryRestrictionResultDTO = z.output<
  typeof DietaryRestrictionUpsertResultSchema
>;
