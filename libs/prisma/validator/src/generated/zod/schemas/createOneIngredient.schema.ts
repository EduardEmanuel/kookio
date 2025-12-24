import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { IngredientSelectObjectSchema as IngredientSelectObjectSchema } from './objects/IngredientSelect.schema';
import { IngredientCreateInputObjectSchema as IngredientCreateInputObjectSchema } from './objects/IngredientCreateInput.schema';
import { IngredientUncheckedCreateInputObjectSchema as IngredientUncheckedCreateInputObjectSchema } from './objects/IngredientUncheckedCreateInput.schema';

export const IngredientCreateOneSchema: z.ZodType<Prisma.IngredientCreateArgs> = z.object({ select: IngredientSelectObjectSchema.optional(),  data: z.union([IngredientCreateInputObjectSchema, IngredientUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.IngredientCreateArgs>;

export const IngredientCreateOneZodSchema = z.object({ select: IngredientSelectObjectSchema.optional(),  data: z.union([IngredientCreateInputObjectSchema, IngredientUncheckedCreateInputObjectSchema]) }).strict();