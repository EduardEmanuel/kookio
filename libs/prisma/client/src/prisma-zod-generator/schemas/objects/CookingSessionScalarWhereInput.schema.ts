import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';

const cookingsessionscalarwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => CookingSessionScalarWhereInputObjectSchema),
        z.lazy(() => CookingSessionScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CookingSessionScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CookingSessionScalarWhereInputObjectSchema),
        z.lazy(() => CookingSessionScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    userId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    recipeId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    servings: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number().int()])
      .optional(),
    completedAt: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
  })
  .strict();
export const CookingSessionScalarWhereInputObjectSchema: z.ZodType<Prisma.CookingSessionScalarWhereInput> =
  cookingsessionscalarwhereinputSchema as unknown as z.ZodType<Prisma.CookingSessionScalarWhereInput>;
export const CookingSessionScalarWhereInputObjectZodSchema =
  cookingsessionscalarwhereinputSchema;
