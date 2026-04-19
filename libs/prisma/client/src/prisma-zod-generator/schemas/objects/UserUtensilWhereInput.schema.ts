import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { UserProfileScalarRelationFilterObjectSchema as UserProfileScalarRelationFilterObjectSchema } from './UserProfileScalarRelationFilter.schema';
import { UserProfileWhereInputObjectSchema as UserProfileWhereInputObjectSchema } from './UserProfileWhereInput.schema';
import { UtensilScalarRelationFilterObjectSchema as UtensilScalarRelationFilterObjectSchema } from './UtensilScalarRelationFilter.schema';
import { UtensilWhereInputObjectSchema as UtensilWhereInputObjectSchema } from './UtensilWhereInput.schema';

const userutensilwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserUtensilWhereInputObjectSchema),
        z.lazy(() => UserUtensilWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserUtensilWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserUtensilWhereInputObjectSchema),
        z.lazy(() => UserUtensilWhereInputObjectSchema).array(),
      ])
      .optional(),
    userId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    utensilId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    user: z
      .union([
        z.lazy(() => UserProfileScalarRelationFilterObjectSchema),
        z.lazy(() => UserProfileWhereInputObjectSchema),
      ])
      .optional(),
    utensil: z
      .union([
        z.lazy(() => UtensilScalarRelationFilterObjectSchema),
        z.lazy(() => UtensilWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();
export const UserUtensilWhereInputObjectSchema: z.ZodType<Prisma.UserUtensilWhereInput> =
  userutensilwhereinputSchema as unknown as z.ZodType<Prisma.UserUtensilWhereInput>;
export const UserUtensilWhereInputObjectZodSchema = userutensilwhereinputSchema;
