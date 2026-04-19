import z from 'zod';
import {
  UserCountResultSchema,
  UserCountSchema,
  UserCreateManyResultSchema,
  UserCreateManySchema,
  UserCreateOneSchema,
  UserCreateResultSchema,
  UserDeleteManyResultSchema,
  UserDeleteManySchema,
  UserDeleteOneSchema,
  UserDeleteResultSchema,
  UserFindManyResultSchema,
  UserFindManySchema,
  UserFindUniqueResultSchema,
  UserFindUniqueSchema,
  UserGroupByResultSchema,
  UserGroupBySchema,
  UserModelSchema,
  UserUpdateManyResultSchema,
  UserUpdateManySchema,
  UserUpdateOneSchema,
  UserUpdateResultSchema,
  UserUpsertOneSchema,
  UserUpsertResultSchema,
  RoleSchema,
} from '../prisma-zod-generator/index';

export type CountUserDTO = z.output<typeof UserCountSchema>;
export type CountUserResultDTO = z.output<typeof UserCountResultSchema>;
export type CreateOneUserDTO = z.output<typeof UserCreateOneSchema>;
export type CreateUserResultDTO = z.output<typeof UserCreateResultSchema>;
export type CreateManyUserDTO = z.output<typeof UserCreateManySchema>;
export type CreateManyUserResultDTO = z.output<
  typeof UserCreateManyResultSchema
>;
export type DeleteOneUserDTO = z.output<typeof UserDeleteOneSchema>;
export type DeleteUserResultDTO = z.output<typeof UserDeleteResultSchema>;
export type DeleteManyUserDTO = z.output<typeof UserDeleteManySchema>;
export type DeleteManyUserResultDTO = z.output<
  typeof UserDeleteManyResultSchema
>;
export type FindManyUserDTO = z.output<typeof UserFindManySchema>;
export type FindManyUserResultDTO = z.output<typeof UserFindManyResultSchema>;
export type FindUniqueUserDTO = z.output<typeof UserFindUniqueSchema>;
export type FindUniqueUserResultDTO = z.output<
  typeof UserFindUniqueResultSchema
>;
export type GroupByUserDTO = z.output<typeof UserGroupBySchema>;
export type GroupByUserResultDTO = z.output<typeof UserGroupByResultSchema>;
export type UpdateOneUserDTO = z.output<typeof UserUpdateOneSchema>;
export type UpdateUserResultDTO = z.output<typeof UserUpdateResultSchema>;
export type UpdateManyUserDTO = z.output<typeof UserUpdateManySchema>;
export type UpdateManyUserResultDTO = z.output<
  typeof UserUpdateManyResultSchema
>;
export type UpsertOneUserDTO = z.output<typeof UserUpsertOneSchema>;
export type UpsertUserResultDTO = z.output<typeof UserUpsertResultSchema>;
export const role = RoleSchema.Values;
export type Role = z.output<typeof RoleSchema>;

export const UserSeededSchema = UserModelSchema.pick({
  id: true,
  email: true,
  roles: true,
  firebaseUid: true,
});
export type UserSeeded = z.output<typeof UserSeededSchema>;
