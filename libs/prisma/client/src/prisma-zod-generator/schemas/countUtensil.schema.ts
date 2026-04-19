import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UtensilOrderByWithRelationInputObjectSchema as UtensilOrderByWithRelationInputObjectSchema } from './objects/UtensilOrderByWithRelationInput.schema';
import { UtensilWhereInputObjectSchema as UtensilWhereInputObjectSchema } from './objects/UtensilWhereInput.schema';
import { UtensilWhereUniqueInputObjectSchema as UtensilWhereUniqueInputObjectSchema } from './objects/UtensilWhereUniqueInput.schema';
import { UtensilCountAggregateInputObjectSchema as UtensilCountAggregateInputObjectSchema } from './objects/UtensilCountAggregateInput.schema';

export const UtensilCountSchema: z.ZodType<Prisma.UtensilCountArgs> = z
  .object({
    orderBy: z
      .union([
        UtensilOrderByWithRelationInputObjectSchema,
        UtensilOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UtensilWhereInputObjectSchema.optional(),
    cursor: UtensilWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z
      .union([z.literal(true), UtensilCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UtensilCountArgs>;

export const UtensilCountZodSchema = z
  .object({
    orderBy: z
      .union([
        UtensilOrderByWithRelationInputObjectSchema,
        UtensilOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UtensilWhereInputObjectSchema.optional(),
    cursor: UtensilWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z
      .union([z.literal(true), UtensilCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict();
