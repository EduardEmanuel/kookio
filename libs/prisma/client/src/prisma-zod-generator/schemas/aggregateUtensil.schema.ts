import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UtensilOrderByWithRelationInputObjectSchema as UtensilOrderByWithRelationInputObjectSchema } from './objects/UtensilOrderByWithRelationInput.schema';
import { UtensilWhereInputObjectSchema as UtensilWhereInputObjectSchema } from './objects/UtensilWhereInput.schema';
import { UtensilWhereUniqueInputObjectSchema as UtensilWhereUniqueInputObjectSchema } from './objects/UtensilWhereUniqueInput.schema';
import { UtensilCountAggregateInputObjectSchema as UtensilCountAggregateInputObjectSchema } from './objects/UtensilCountAggregateInput.schema';
import { UtensilMinAggregateInputObjectSchema as UtensilMinAggregateInputObjectSchema } from './objects/UtensilMinAggregateInput.schema';
import { UtensilMaxAggregateInputObjectSchema as UtensilMaxAggregateInputObjectSchema } from './objects/UtensilMaxAggregateInput.schema';

export const UtensilAggregateSchema: z.ZodType<Prisma.UtensilAggregateArgs> = z
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
    _count: z
      .union([z.literal(true), UtensilCountAggregateInputObjectSchema])
      .optional(),
    _min: UtensilMinAggregateInputObjectSchema.optional(),
    _max: UtensilMaxAggregateInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UtensilAggregateArgs>;

export const UtensilAggregateZodSchema = z
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
    _count: z
      .union([z.literal(true), UtensilCountAggregateInputObjectSchema])
      .optional(),
    _min: UtensilMinAggregateInputObjectSchema.optional(),
    _max: UtensilMaxAggregateInputObjectSchema.optional(),
  })
  .strict();
