import z from 'zod';
import {
  UserDietaryRestrictionCountResultSchema,
  UserDietaryRestrictionCountSchema,
  UserDietaryRestrictionCreateManyResultSchema,
  UserDietaryRestrictionCreateManySchema,
  UserDietaryRestrictionCreateOneSchema,
  UserDietaryRestrictionCreateResultSchema,
  UserDietaryRestrictionDeleteManyResultSchema,
  UserDietaryRestrictionDeleteManySchema,
  UserDietaryRestrictionDeleteOneSchema,
  UserDietaryRestrictionDeleteResultSchema,
  UserDietaryRestrictionFindManyResultSchema,
  UserDietaryRestrictionFindManySchema,
  UserDietaryRestrictionFindUniqueResultSchema,
  UserDietaryRestrictionFindUniqueSchema,
  UserDietaryRestrictionGroupByResultSchema,
  UserDietaryRestrictionGroupBySchema,
  UserDietaryRestrictionUpdateManyResultSchema,
  UserDietaryRestrictionUpdateManySchema,
  UserDietaryRestrictionUpdateOneSchema,
  UserDietaryRestrictionUpdateResultSchema,
  UserDietaryRestrictionUpsertOneSchema,
  UserDietaryRestrictionUpsertResultSchema,
} from '../prisma-zod-generator/index';

export type CountUserDietaryRestrictionDTO = z.output<
  typeof UserDietaryRestrictionCountSchema
>;
export type CountUserDietaryRestrictionResultDTO = z.output<
  typeof UserDietaryRestrictionCountResultSchema
>;
export type CreateOneUserDietaryRestrictionDTO = z.output<
  typeof UserDietaryRestrictionCreateOneSchema
>;
export type CreateUserDietaryRestrictionResultDTO = z.output<
  typeof UserDietaryRestrictionCreateResultSchema
>;
export type CreateManyUserDietaryRestrictionDTO = z.output<
  typeof UserDietaryRestrictionCreateManySchema
>;
export type CreateManyUserDietaryRestrictionResultDTO = z.output<
  typeof UserDietaryRestrictionCreateManyResultSchema
>;
export type DeleteOneUserDietaryRestrictionDTO = z.output<
  typeof UserDietaryRestrictionDeleteOneSchema
>;
export type DeleteUserDietaryRestrictionResultDTO = z.output<
  typeof UserDietaryRestrictionDeleteResultSchema
>;
export type DeleteManyUserDietaryRestrictionDTO = z.output<
  typeof UserDietaryRestrictionDeleteManySchema
>;
export type DeleteManyUserDietaryRestrictionResultDTO = z.output<
  typeof UserDietaryRestrictionDeleteManyResultSchema
>;
export type FindManyUserDietaryRestrictionDTO = z.output<
  typeof UserDietaryRestrictionFindManySchema
>;
export type FindManyUserDietaryRestrictionResultDTO = z.output<
  typeof UserDietaryRestrictionFindManyResultSchema
>;
export type FindUniqueUserDietaryRestrictionDTO = z.output<
  typeof UserDietaryRestrictionFindUniqueSchema
>;
export type FindUniqueUserDietaryRestrictionResultDTO = z.output<
  typeof UserDietaryRestrictionFindUniqueResultSchema
>;
export type GroupByUserDietaryRestrictionDTO = z.output<
  typeof UserDietaryRestrictionGroupBySchema
>;
export type GroupByUserDietaryRestrictionResultDTO = z.output<
  typeof UserDietaryRestrictionGroupByResultSchema
>;
export type UpdateOneUserDietaryRestrictionDTO = z.output<
  typeof UserDietaryRestrictionUpdateOneSchema
>;
export type UpdateUserDietaryRestrictionResultDTO = z.output<
  typeof UserDietaryRestrictionUpdateResultSchema
>;
export type UpdateManyUserDietaryRestrictionDTO = z.output<
  typeof UserDietaryRestrictionUpdateManySchema
>;
export type UpdateManyUserDietaryRestrictionResultDTO = z.output<
  typeof UserDietaryRestrictionUpdateManyResultSchema
>;
export type UpsertOneUserDietaryRestrictionDTO = z.output<
  typeof UserDietaryRestrictionUpsertOneSchema
>;
export type UpsertUserDietaryRestrictionResultDTO = z.output<
  typeof UserDietaryRestrictionUpsertResultSchema
>;
