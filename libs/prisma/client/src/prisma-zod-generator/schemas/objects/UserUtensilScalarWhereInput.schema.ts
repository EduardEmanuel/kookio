import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';

const userutensilscalarwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserUtensilScalarWhereInputObjectSchema),
        z.lazy(() => UserUtensilScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserUtensilScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserUtensilScalarWhereInputObjectSchema),
        z.lazy(() => UserUtensilScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    userId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    utensilId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
  })
  .strict();
export const UserUtensilScalarWhereInputObjectSchema: z.ZodType<Prisma.UserUtensilScalarWhereInput> =
  userutensilscalarwhereinputSchema as unknown as z.ZodType<Prisma.UserUtensilScalarWhereInput>;
export const UserUtensilScalarWhereInputObjectZodSchema =
  userutensilscalarwhereinputSchema;
