import z from 'zod';
import {
  UserUtensilCountResultSchema,
  UserUtensilCountSchema,
  UserUtensilCreateManyResultSchema,
  UserUtensilCreateManySchema,
  UserUtensilCreateOneSchema,
  UserUtensilCreateResultSchema,
  UserUtensilDeleteManyResultSchema,
  UserUtensilDeleteManySchema,
  UserUtensilDeleteOneSchema,
  UserUtensilDeleteResultSchema,
  UserUtensilFindManyResultSchema,
  UserUtensilFindManySchema,
  UserUtensilFindUniqueResultSchema,
  UserUtensilFindUniqueSchema,
  UserUtensilGroupByResultSchema,
  UserUtensilGroupBySchema,
  UserUtensilUpdateManyResultSchema,
  UserUtensilUpdateManySchema,
  UserUtensilUpdateOneSchema,
  UserUtensilUpdateResultSchema,
  UserUtensilUpsertOneSchema,
  UserUtensilUpsertResultSchema,
} from '../prisma-zod-generator/index';

export type CountUserUtensilDTO = z.output<typeof UserUtensilCountSchema>;
export type CountUserUtensilResultDTO = z.output<
  typeof UserUtensilCountResultSchema
>;
export type CreateOneUserUtensilDTO = z.output<
  typeof UserUtensilCreateOneSchema
>;
export type CreateUserUtensilResultDTO = z.output<
  typeof UserUtensilCreateResultSchema
>;
export type CreateManyUserUtensilDTO = z.output<
  typeof UserUtensilCreateManySchema
>;
export type CreateManyUserUtensilResultDTO = z.output<
  typeof UserUtensilCreateManyResultSchema
>;
export type DeleteOneUserUtensilDTO = z.output<
  typeof UserUtensilDeleteOneSchema
>;
export type DeleteUserUtensilResultDTO = z.output<
  typeof UserUtensilDeleteResultSchema
>;
export type DeleteManyUserUtensilDTO = z.output<
  typeof UserUtensilDeleteManySchema
>;
export type DeleteManyUserUtensilResultDTO = z.output<
  typeof UserUtensilDeleteManyResultSchema
>;
export type FindManyUserUtensilDTO = z.output<typeof UserUtensilFindManySchema>;
export type FindManyUserUtensilResultDTO = z.output<
  typeof UserUtensilFindManyResultSchema
>;
export type FindUniqueUserUtensilDTO = z.output<
  typeof UserUtensilFindUniqueSchema
>;
export type FindUniqueUserUtensilResultDTO = z.output<
  typeof UserUtensilFindUniqueResultSchema
>;
export type GroupByUserUtensilDTO = z.output<typeof UserUtensilGroupBySchema>;
export type GroupByUserUtensilResultDTO = z.output<
  typeof UserUtensilGroupByResultSchema
>;
export type UpdateOneUserUtensilDTO = z.output<
  typeof UserUtensilUpdateOneSchema
>;
export type UpdateUserUtensilResultDTO = z.output<
  typeof UserUtensilUpdateResultSchema
>;
export type UpdateManyUserUtensilDTO = z.output<
  typeof UserUtensilUpdateManySchema
>;
export type UpdateManyUserUtensilResultDTO = z.output<
  typeof UserUtensilUpdateManyResultSchema
>;
export type UpsertOneUserUtensilDTO = z.output<
  typeof UserUtensilUpsertOneSchema
>;
export type UpsertUserUtensilResultDTO = z.output<
  typeof UserUtensilUpsertResultSchema
>;
