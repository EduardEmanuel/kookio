import z from 'zod';
import {
  PantryItemCountResultSchema,
  PantryItemCountSchema,
  PantryItemCreateManyResultSchema,
  PantryItemCreateManySchema,
  PantryItemCreateOneSchema,
  PantryItemCreateResultSchema,
  PantryItemDeleteManyResultSchema,
  PantryItemDeleteManySchema,
  PantryItemDeleteOneSchema,
  PantryItemDeleteResultSchema,
  PantryItemFindManyResultSchema,
  PantryItemFindManySchema,
  PantryItemFindUniqueResultSchema,
  PantryItemFindUniqueSchema,
  PantryItemGroupByResultSchema,
  PantryItemGroupBySchema,
  PantryItemUpdateManyResultSchema,
  PantryItemUpdateManySchema,
  PantryItemUpdateOneSchema,
  PantryItemUpdateResultSchema,
  PantryItemUpsertOneSchema,
  PantryItemUpsertResultSchema,
} from '../prisma-zod-generator/index';

export type CountPantryItemDTO = z.output<typeof PantryItemCountSchema>;
export type CountPantryItemResultDTO = z.output<
  typeof PantryItemCountResultSchema
>;
export type CreateOnePantryItemDTO = z.output<typeof PantryItemCreateOneSchema>;
export type CreatePantryItemResultDTO = z.output<
  typeof PantryItemCreateResultSchema
>;
export type CreateManyPantryItemDTO = z.output<
  typeof PantryItemCreateManySchema
>;
export type CreateManyPantryItemResultDTO = z.output<
  typeof PantryItemCreateManyResultSchema
>;
export type DeleteOnePantryItemDTO = z.output<typeof PantryItemDeleteOneSchema>;
export type DeletePantryItemResultDTO = z.output<
  typeof PantryItemDeleteResultSchema
>;
export type DeleteManyPantryItemDTO = z.output<
  typeof PantryItemDeleteManySchema
>;
export type DeleteManyPantryItemResultDTO = z.output<
  typeof PantryItemDeleteManyResultSchema
>;
export type FindManyPantryItemDTO = z.output<typeof PantryItemFindManySchema>;
export type FindManyPantryItemResultDTO = z.output<
  typeof PantryItemFindManyResultSchema
>;
export type FindUniquePantryItemDTO = z.output<
  typeof PantryItemFindUniqueSchema
>;
export type FindUniquePantryItemResultDTO = z.output<
  typeof PantryItemFindUniqueResultSchema
>;
export type GroupByPantryItemDTO = z.output<typeof PantryItemGroupBySchema>;
export type GroupByPantryItemResultDTO = z.output<
  typeof PantryItemGroupByResultSchema
>;
export type UpdateOnePantryItemDTO = z.output<typeof PantryItemUpdateOneSchema>;
export type UpdatePantryItemResultDTO = z.output<
  typeof PantryItemUpdateResultSchema
>;
export type UpdateManyPantryItemDTO = z.output<
  typeof PantryItemUpdateManySchema
>;
export type UpdateManyPantryItemResultDTO = z.output<
  typeof PantryItemUpdateManyResultSchema
>;
export type UpsertOnePantryItemDTO = z.output<typeof PantryItemUpsertOneSchema>;
export type UpsertPantryItemResultDTO = z.output<
  typeof PantryItemUpsertResultSchema
>;
