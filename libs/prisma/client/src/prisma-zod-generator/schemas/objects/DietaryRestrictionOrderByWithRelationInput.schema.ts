import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserDietaryRestrictionOrderByRelationAggregateInputObjectSchema as UserDietaryRestrictionOrderByRelationAggregateInputObjectSchema } from './UserDietaryRestrictionOrderByRelationAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      slug: SortOrderSchema.optional(),
      label: SortOrderSchema.optional(),
      emoji: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      description: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      users: z
        .lazy(
          () => UserDietaryRestrictionOrderByRelationAggregateInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const DietaryRestrictionOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.DietaryRestrictionOrderByWithRelationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.DietaryRestrictionOrderByWithRelationInput>;
export const DietaryRestrictionOrderByWithRelationInputObjectZodSchema =
  makeSchema();
