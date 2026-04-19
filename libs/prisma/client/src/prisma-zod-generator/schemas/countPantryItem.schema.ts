import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PantryItemOrderByWithRelationInputObjectSchema as PantryItemOrderByWithRelationInputObjectSchema } from './objects/PantryItemOrderByWithRelationInput.schema';
import { PantryItemWhereInputObjectSchema as PantryItemWhereInputObjectSchema } from './objects/PantryItemWhereInput.schema';
import { PantryItemWhereUniqueInputObjectSchema as PantryItemWhereUniqueInputObjectSchema } from './objects/PantryItemWhereUniqueInput.schema';
import { PantryItemCountAggregateInputObjectSchema as PantryItemCountAggregateInputObjectSchema } from './objects/PantryItemCountAggregateInput.schema';

export const PantryItemCountSchema: z.ZodType<Prisma.PantryItemCountArgs> = z
  .object({
    orderBy: z
      .union([
        PantryItemOrderByWithRelationInputObjectSchema,
        PantryItemOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: PantryItemWhereInputObjectSchema.optional(),
    cursor: PantryItemWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z
      .union([z.literal(true), PantryItemCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.PantryItemCountArgs>;

export const PantryItemCountZodSchema = z
  .object({
    orderBy: z
      .union([
        PantryItemOrderByWithRelationInputObjectSchema,
        PantryItemOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: PantryItemWhereInputObjectSchema.optional(),
    cursor: PantryItemWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z
      .union([z.literal(true), PantryItemCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict();
