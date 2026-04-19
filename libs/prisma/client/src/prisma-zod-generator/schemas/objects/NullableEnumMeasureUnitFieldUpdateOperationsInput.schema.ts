import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MeasureUnitSchema } from '../enums/MeasureUnit.schema';

const makeSchema = () =>
  z
    .object({
      set: MeasureUnitSchema.optional(),
    })
    .strict();
export const NullableEnumMeasureUnitFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableEnumMeasureUnitFieldUpdateOperationsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.NullableEnumMeasureUnitFieldUpdateOperationsInput>;
export const NullableEnumMeasureUnitFieldUpdateOperationsInputObjectZodSchema =
  makeSchema();
