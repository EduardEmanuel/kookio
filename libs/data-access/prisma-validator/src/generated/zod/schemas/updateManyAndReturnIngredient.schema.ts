import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { IngredientSelectObjectSchema as IngredientSelectObjectSchema } from './objects/IngredientSelect.schema';
import { IngredientUpdateManyMutationInputObjectSchema as IngredientUpdateManyMutationInputObjectSchema } from './objects/IngredientUpdateManyMutationInput.schema';
import { IngredientWhereInputObjectSchema as IngredientWhereInputObjectSchema } from './objects/IngredientWhereInput.schema';

export const IngredientUpdateManyAndReturnSchema: z.ZodType<Prisma.IngredientUpdateManyAndReturnArgs> = z.object({ select: IngredientSelectObjectSchema.optional(), data: IngredientUpdateManyMutationInputObjectSchema, where: IngredientWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.IngredientUpdateManyAndReturnArgs>;

export const IngredientUpdateManyAndReturnZodSchema = z.object({ select: IngredientSelectObjectSchema.optional(), data: IngredientUpdateManyMutationInputObjectSchema, where: IngredientWhereInputObjectSchema.optional() }).strict();