import z from 'zod';
import {
  UtensilCountResultSchema,
  UtensilCountSchema,
  UtensilCreateManyResultSchema,
  UtensilCreateManySchema,
  UtensilCreateOneSchema,
  UtensilCreateResultSchema,
  UtensilDeleteManyResultSchema,
  UtensilDeleteManySchema,
  UtensilDeleteOneSchema,
  UtensilDeleteResultSchema,
  UtensilFindManyResultSchema,
  UtensilFindManySchema,
  UtensilFindUniqueResultSchema,
  UtensilFindUniqueSchema,
  UtensilGroupByResultSchema,
  UtensilGroupBySchema,
  UtensilUpdateManyResultSchema,
  UtensilUpdateManySchema,
  UtensilUpdateOneSchema,
  UtensilUpdateResultSchema,
  UtensilUpsertOneSchema,
  UtensilUpsertResultSchema,
} from '../prisma-zod-generator/index';

export type CountUtensilDTO = z.output<typeof UtensilCountSchema>;
export type CountUtensilResultDTO = z.output<typeof UtensilCountResultSchema>;
export type CreateOneUtensilDTO = z.output<typeof UtensilCreateOneSchema>;
export type CreateUtensilResultDTO = z.output<typeof UtensilCreateResultSchema>;
export type CreateManyUtensilDTO = z.output<typeof UtensilCreateManySchema>;
export type CreateManyUtensilResultDTO = z.output<
  typeof UtensilCreateManyResultSchema
>;
export type DeleteOneUtensilDTO = z.output<typeof UtensilDeleteOneSchema>;
export type DeleteUtensilResultDTO = z.output<typeof UtensilDeleteResultSchema>;
export type DeleteManyUtensilDTO = z.output<typeof UtensilDeleteManySchema>;
export type DeleteManyUtensilResultDTO = z.output<
  typeof UtensilDeleteManyResultSchema
>;
export type FindManyUtensilDTO = z.output<typeof UtensilFindManySchema>;
export type FindManyUtensilResultDTO = z.output<
  typeof UtensilFindManyResultSchema
>;
export type FindUniqueUtensilDTO = z.output<typeof UtensilFindUniqueSchema>;
export type FindUniqueUtensilResultDTO = z.output<
  typeof UtensilFindUniqueResultSchema
>;
export type GroupByUtensilDTO = z.output<typeof UtensilGroupBySchema>;
export type GroupByUtensilResultDTO = z.output<
  typeof UtensilGroupByResultSchema
>;
export type UpdateOneUtensilDTO = z.output<typeof UtensilUpdateOneSchema>;
export type UpdateUtensilResultDTO = z.output<typeof UtensilUpdateResultSchema>;
export type UpdateManyUtensilDTO = z.output<typeof UtensilUpdateManySchema>;
export type UpdateManyUtensilResultDTO = z.output<
  typeof UtensilUpdateManyResultSchema
>;
export type UpsertOneUtensilDTO = z.output<typeof UtensilUpsertOneSchema>;
export type UpsertUtensilResultDTO = z.output<typeof UtensilUpsertResultSchema>;
