import type { Prisma } from '../../../../generated/prisma-client';
import * as z from 'zod';
import { IngredientSelectObjectSchema as IngredientSelectObjectSchema } from './objects/IngredientSelect.schema';
import { IngredientUpdateInputObjectSchema as IngredientUpdateInputObjectSchema } from './objects/IngredientUpdateInput.schema';
import { IngredientUncheckedUpdateInputObjectSchema as IngredientUncheckedUpdateInputObjectSchema } from './objects/IngredientUncheckedUpdateInput.schema';
import { IngredientWhereUniqueInputObjectSchema as IngredientWhereUniqueInputObjectSchema } from './objects/IngredientWhereUniqueInput.schema';

export const IngredientUpdateOneSchema: z.ZodType<Prisma.IngredientUpdateArgs> = z.object({ select: IngredientSelectObjectSchema.optional(),  data: z.union([IngredientUpdateInputObjectSchema, IngredientUncheckedUpdateInputObjectSchema]), where: IngredientWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.IngredientUpdateArgs>;

export const IngredientUpdateOneZodSchema = z.object({ select: IngredientSelectObjectSchema.optional(),  data: z.union([IngredientUpdateInputObjectSchema, IngredientUncheckedUpdateInputObjectSchema]), where: IngredientWhereUniqueInputObjectSchema }).strict();