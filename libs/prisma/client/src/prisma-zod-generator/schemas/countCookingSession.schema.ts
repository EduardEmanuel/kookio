import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CookingSessionOrderByWithRelationInputObjectSchema as CookingSessionOrderByWithRelationInputObjectSchema } from './objects/CookingSessionOrderByWithRelationInput.schema';
import { CookingSessionWhereInputObjectSchema as CookingSessionWhereInputObjectSchema } from './objects/CookingSessionWhereInput.schema';
import { CookingSessionWhereUniqueInputObjectSchema as CookingSessionWhereUniqueInputObjectSchema } from './objects/CookingSessionWhereUniqueInput.schema';
import { CookingSessionCountAggregateInputObjectSchema as CookingSessionCountAggregateInputObjectSchema } from './objects/CookingSessionCountAggregateInput.schema';

export const CookingSessionCountSchema: z.ZodType<Prisma.CookingSessionCountArgs> =
  z
    .object({
      orderBy: z
        .union([
          CookingSessionOrderByWithRelationInputObjectSchema,
          CookingSessionOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: CookingSessionWhereInputObjectSchema.optional(),
      cursor: CookingSessionWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      select: z
        .union([z.literal(true), CookingSessionCountAggregateInputObjectSchema])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.CookingSessionCountArgs>;

export const CookingSessionCountZodSchema = z
  .object({
    orderBy: z
      .union([
        CookingSessionOrderByWithRelationInputObjectSchema,
        CookingSessionOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: CookingSessionWhereInputObjectSchema.optional(),
    cursor: CookingSessionWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z
      .union([z.literal(true), CookingSessionCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict();
