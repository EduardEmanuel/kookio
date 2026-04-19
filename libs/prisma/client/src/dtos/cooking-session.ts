import z from 'zod';
import {
  CookingSessionCountResultSchema,
  CookingSessionCountSchema,
  CookingSessionCreateManyResultSchema,
  CookingSessionCreateManySchema,
  CookingSessionCreateOneSchema,
  CookingSessionCreateResultSchema,
  CookingSessionDeleteManyResultSchema,
  CookingSessionDeleteManySchema,
  CookingSessionDeleteOneSchema,
  CookingSessionDeleteResultSchema,
  CookingSessionFindManyResultSchema,
  CookingSessionFindManySchema,
  CookingSessionFindUniqueResultSchema,
  CookingSessionFindUniqueSchema,
  CookingSessionGroupByResultSchema,
  CookingSessionGroupBySchema,
  CookingSessionUpdateManyResultSchema,
  CookingSessionUpdateManySchema,
  CookingSessionUpdateOneSchema,
  CookingSessionUpdateResultSchema,
  CookingSessionUpsertOneSchema,
  CookingSessionUpsertResultSchema,
} from '../prisma-zod-generator/index';

export type CountCookingSessionDTO = z.output<typeof CookingSessionCountSchema>;
export type CountCookingSessionResultDTO = z.output<
  typeof CookingSessionCountResultSchema
>;
export type CreateOneCookingSessionDTO = z.output<
  typeof CookingSessionCreateOneSchema
>;
export type CreateCookingSessionResultDTO = z.output<
  typeof CookingSessionCreateResultSchema
>;
export type CreateManyCookingSessionDTO = z.output<
  typeof CookingSessionCreateManySchema
>;
export type CreateManyCookingSessionResultDTO = z.output<
  typeof CookingSessionCreateManyResultSchema
>;
export type DeleteOneCookingSessionDTO = z.output<
  typeof CookingSessionDeleteOneSchema
>;
export type DeleteCookingSessionResultDTO = z.output<
  typeof CookingSessionDeleteResultSchema
>;
export type DeleteManyCookingSessionDTO = z.output<
  typeof CookingSessionDeleteManySchema
>;
export type DeleteManyCookingSessionResultDTO = z.output<
  typeof CookingSessionDeleteManyResultSchema
>;
export type FindManyCookingSessionDTO = z.output<
  typeof CookingSessionFindManySchema
>;
export type FindManyCookingSessionResultDTO = z.output<
  typeof CookingSessionFindManyResultSchema
>;
export type FindUniqueCookingSessionDTO = z.output<
  typeof CookingSessionFindUniqueSchema
>;
export type FindUniqueCookingSessionResultDTO = z.output<
  typeof CookingSessionFindUniqueResultSchema
>;
export type GroupByCookingSessionDTO = z.output<
  typeof CookingSessionGroupBySchema
>;
export type GroupByCookingSessionResultDTO = z.output<
  typeof CookingSessionGroupByResultSchema
>;
export type UpdateOneCookingSessionDTO = z.output<
  typeof CookingSessionUpdateOneSchema
>;
export type UpdateCookingSessionResultDTO = z.output<
  typeof CookingSessionUpdateResultSchema
>;
export type UpdateManyCookingSessionDTO = z.output<
  typeof CookingSessionUpdateManySchema
>;
export type UpdateManyCookingSessionResultDTO = z.output<
  typeof CookingSessionUpdateManyResultSchema
>;
export type UpsertOneCookingSessionDTO = z.output<
  typeof CookingSessionUpsertOneSchema
>;
export type UpsertCookingSessionResultDTO = z.output<
  typeof CookingSessionUpsertResultSchema
>;
