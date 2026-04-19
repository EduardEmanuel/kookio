import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UtensilWhereInputObjectSchema as UtensilWhereInputObjectSchema } from './UtensilWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      is: z.lazy(() => UtensilWhereInputObjectSchema).optional(),
      isNot: z.lazy(() => UtensilWhereInputObjectSchema).optional(),
    })
    .strict();
export const UtensilScalarRelationFilterObjectSchema: z.ZodType<Prisma.UtensilScalarRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.UtensilScalarRelationFilter>;
export const UtensilScalarRelationFilterObjectZodSchema = makeSchema();
