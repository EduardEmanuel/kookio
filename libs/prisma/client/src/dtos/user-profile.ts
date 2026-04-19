import z from 'zod';
import {
  UserProfileCountResultSchema,
  UserProfileCountSchema,
  UserProfileCreateManyResultSchema,
  UserProfileCreateManySchema,
  UserProfileCreateOneSchema,
  UserProfileCreateResultSchema,
  UserProfileDeleteManyResultSchema,
  UserProfileDeleteManySchema,
  UserProfileDeleteOneSchema,
  UserProfileDeleteResultSchema,
  UserProfileFindManyResultSchema,
  UserProfileFindManySchema,
  UserProfileFindUniqueResultSchema,
  UserProfileFindUniqueSchema,
  UserProfileGroupByResultSchema,
  UserProfileGroupBySchema,
  UserProfileUpdateManyResultSchema,
  UserProfileUpdateManySchema,
  UserProfileUpdateOneSchema,
  UserProfileUpdateResultSchema,
  UserProfileUpsertOneSchema,
  UserProfileUpsertResultSchema,
} from '../prisma-zod-generator/index';

export type CountUserProfileDTO = z.output<typeof UserProfileCountSchema>;
export type CountUserProfileResultDTO = z.output<
  typeof UserProfileCountResultSchema
>;
export type CreateOneUserProfileDTO = z.output<
  typeof UserProfileCreateOneSchema
>;
export type CreateUserProfileResultDTO = z.output<
  typeof UserProfileCreateResultSchema
>;
export type CreateManyUserProfileDTO = z.output<
  typeof UserProfileCreateManySchema
>;
export type CreateManyUserProfileResultDTO = z.output<
  typeof UserProfileCreateManyResultSchema
>;
export type DeleteOneUserProfileDTO = z.output<
  typeof UserProfileDeleteOneSchema
>;
export type DeleteUserProfileResultDTO = z.output<
  typeof UserProfileDeleteResultSchema
>;
export type DeleteManyUserProfileDTO = z.output<
  typeof UserProfileDeleteManySchema
>;
export type DeleteManyUserProfileResultDTO = z.output<
  typeof UserProfileDeleteManyResultSchema
>;
export type FindManyUserProfileDTO = z.output<typeof UserProfileFindManySchema>;
export type FindManyUserProfileResultDTO = z.output<
  typeof UserProfileFindManyResultSchema
>;
export type FindUniqueUserProfileDTO = z.output<
  typeof UserProfileFindUniqueSchema
>;
export type FindUniqueUserProfileResultDTO = z.output<
  typeof UserProfileFindUniqueResultSchema
>;
export type GroupByUserProfileDTO = z.output<typeof UserProfileGroupBySchema>;
export type GroupByUserProfileResultDTO = z.output<
  typeof UserProfileGroupByResultSchema
>;
export type UpdateOneUserProfileDTO = z.output<
  typeof UserProfileUpdateOneSchema
>;
export type UpdateUserProfileResultDTO = z.output<
  typeof UserProfileUpdateResultSchema
>;
export type UpdateManyUserProfileDTO = z.output<
  typeof UserProfileUpdateManySchema
>;
export type UpdateManyUserProfileResultDTO = z.output<
  typeof UserProfileUpdateManyResultSchema
>;
export type UpsertOneUserProfileDTO = z.output<
  typeof UserProfileUpsertOneSchema
>;
export type UpsertUserProfileResultDTO = z.output<
  typeof UserProfileUpsertResultSchema
>;
