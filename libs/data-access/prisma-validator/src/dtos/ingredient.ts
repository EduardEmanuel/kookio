import z from "zod";
import {
    IngredientCreateManyResultSchema,
    IngredientCreateManySchema,
    IngredientCreateOneSchema,
    IngredientCreateResultSchema,
    IngredientDeleteManyResultSchema,
    IngredientDeleteManySchema,
    IngredientDeleteOneSchema,
    IngredientDeleteResultSchema,
    IngredientFindManyResultSchema,
    IngredientFindManySchema,
    IngredientFindUniqueResultSchema,
    IngredientFindUniqueSchema,
    IngredientUpdateManyResultSchema,
    IngredientUpdateManySchema,
    IngredientUpdateOneSchema,
    IngredientUpdateResultSchema,
} from "../generated/zod/schemas/index";

export type CreateOneIngredientDTO = z.output<typeof IngredientCreateOneSchema>;
export type CreateIngredientResultDTO = z.output<typeof IngredientCreateResultSchema>;
export type CreateManyIngredientDTO = z.output<typeof IngredientCreateManySchema>;
export type CreateManyIngredientResultDTO = z.output<typeof IngredientCreateManyResultSchema>;
export type DeleteOneIngredientDTO = z.output<typeof IngredientDeleteOneSchema>;
export type DeleteIngredientResultDTO = z.output<typeof IngredientDeleteResultSchema>;
export type DeleteManyIngredientDTO = z.output<typeof IngredientDeleteManySchema>;
export type DeleteManyIngredientResultDTO = z.output<typeof IngredientDeleteManyResultSchema>;
export type FindManyIngredientDTO = z.output<typeof IngredientFindManySchema>;
export type FindManyIngredientResultDTO = z.output<typeof IngredientFindManyResultSchema>;
export type FindUniqueIngredientDTO = z.output<typeof IngredientFindUniqueSchema>;
export type FindUniqueIngredientResultDTO = z.output<typeof IngredientFindUniqueResultSchema>;
export type UpdateOneIngredientDTO = z.output<typeof IngredientUpdateOneSchema>;
export type UpdateIngredientResultDTO = z.output<typeof IngredientUpdateResultSchema>;
export type UpdateManyIngredientDTO = z.output<typeof IngredientUpdateManySchema>;
export type UpdateManyIngredientResultDTO = z.output<typeof IngredientUpdateManyResultSchema>;