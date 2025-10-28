import type { Prisma } from '../../../../generated/prisma-client';
import * as z from 'zod';
import { IngredientOrderByWithRelationInputObjectSchema as IngredientOrderByWithRelationInputObjectSchema } from './objects/IngredientOrderByWithRelationInput.schema';
import { IngredientWhereInputObjectSchema as IngredientWhereInputObjectSchema } from './objects/IngredientWhereInput.schema';
import { IngredientWhereUniqueInputObjectSchema as IngredientWhereUniqueInputObjectSchema } from './objects/IngredientWhereUniqueInput.schema';
import { IngredientCountAggregateInputObjectSchema as IngredientCountAggregateInputObjectSchema } from './objects/IngredientCountAggregateInput.schema';

export const IngredientCountSchema: z.ZodType<Prisma.IngredientCountArgs> = z.object({ orderBy: z.union([IngredientOrderByWithRelationInputObjectSchema, IngredientOrderByWithRelationInputObjectSchema.array()]).optional(), where: IngredientWhereInputObjectSchema.optional(), cursor: IngredientWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), IngredientCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.IngredientCountArgs>;

export const IngredientCountZodSchema = z.object({ orderBy: z.union([IngredientOrderByWithRelationInputObjectSchema, IngredientOrderByWithRelationInputObjectSchema.array()]).optional(), where: IngredientWhereInputObjectSchema.optional(), cursor: IngredientWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), IngredientCountAggregateInputObjectSchema ]).optional() }).strict();