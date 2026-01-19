import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';

const ingredientwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => IngredientWhereInputObjectSchema),
        z.lazy(() => IngredientWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => IngredientWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => IngredientWhereInputObjectSchema),
        z.lazy(() => IngredientWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    name: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    quantity: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number().int()])
      .optional(),
    unit: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    optional: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    userId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
  })
  .strict();
export const IngredientWhereInputObjectSchema: z.ZodType<Prisma.IngredientWhereInput> =
  ingredientwhereinputSchema as unknown as z.ZodType<Prisma.IngredientWhereInput>;
export const IngredientWhereInputObjectZodSchema = ingredientwhereinputSchema;
