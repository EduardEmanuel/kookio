import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';

const userutensilscalarwherewithaggregatesinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserUtensilScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => UserUtensilScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserUtensilScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserUtensilScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => UserUtensilScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    userId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    utensilId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
  })
  .strict();
export const UserUtensilScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.UserUtensilScalarWhereWithAggregatesInput> =
  userutensilscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.UserUtensilScalarWhereWithAggregatesInput>;
export const UserUtensilScalarWhereWithAggregatesInputObjectZodSchema =
  userutensilscalarwherewithaggregatesinputSchema;
