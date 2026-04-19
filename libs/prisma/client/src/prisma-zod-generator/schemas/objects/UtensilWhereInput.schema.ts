import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { UserUtensilListRelationFilterObjectSchema as UserUtensilListRelationFilterObjectSchema } from './UserUtensilListRelationFilter.schema';

const utensilwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => UtensilWhereInputObjectSchema),
        z.lazy(() => UtensilWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UtensilWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UtensilWhereInputObjectSchema),
        z.lazy(() => UtensilWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    slug: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    emoji: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    category: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    users: z.lazy(() => UserUtensilListRelationFilterObjectSchema).optional(),
  })
  .strict();
export const UtensilWhereInputObjectSchema: z.ZodType<Prisma.UtensilWhereInput> =
  utensilwhereinputSchema as unknown as z.ZodType<Prisma.UtensilWhereInput>;
export const UtensilWhereInputObjectZodSchema = utensilwhereinputSchema;
