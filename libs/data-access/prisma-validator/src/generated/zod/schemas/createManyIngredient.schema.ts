import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { IngredientCreateManyInputObjectSchema as IngredientCreateManyInputObjectSchema } from './objects/IngredientCreateManyInput.schema';

export const IngredientCreateManySchema: z.ZodType<Prisma.IngredientCreateManyArgs> = z.object({ data: z.union([ IngredientCreateManyInputObjectSchema, z.array(IngredientCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.IngredientCreateManyArgs>;

export const IngredientCreateManyZodSchema = z.object({ data: z.union([ IngredientCreateManyInputObjectSchema, z.array(IngredientCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();