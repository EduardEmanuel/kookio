import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MeasureUnitSchema } from '../enums/MeasureUnit.schema';

const makeSchema = () =>
  z
    .object({
      set: MeasureUnitSchema.optional(),
    })
    .strict();
export const EnumMeasureUnitFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumMeasureUnitFieldUpdateOperationsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.EnumMeasureUnitFieldUpdateOperationsInput>;
export const EnumMeasureUnitFieldUpdateOperationsInputObjectZodSchema =
  makeSchema();
