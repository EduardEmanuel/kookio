import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DietaryRestrictionWhereInputObjectSchema as DietaryRestrictionWhereInputObjectSchema } from './DietaryRestrictionWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      is: z.lazy(() => DietaryRestrictionWhereInputObjectSchema).optional(),
      isNot: z.lazy(() => DietaryRestrictionWhereInputObjectSchema).optional(),
    })
    .strict();
export const DietaryRestrictionScalarRelationFilterObjectSchema: z.ZodType<Prisma.DietaryRestrictionScalarRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.DietaryRestrictionScalarRelationFilter>;
export const DietaryRestrictionScalarRelationFilterObjectZodSchema =
  makeSchema();
