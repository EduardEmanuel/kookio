import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserUtensilOrderByRelationAggregateInputObjectSchema as UserUtensilOrderByRelationAggregateInputObjectSchema } from './UserUtensilOrderByRelationAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      slug: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      emoji: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      category: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      users: z
        .lazy(() => UserUtensilOrderByRelationAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const UtensilOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UtensilOrderByWithRelationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UtensilOrderByWithRelationInput>;
export const UtensilOrderByWithRelationInputObjectZodSchema = makeSchema();
