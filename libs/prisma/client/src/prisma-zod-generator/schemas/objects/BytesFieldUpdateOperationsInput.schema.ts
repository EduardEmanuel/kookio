import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      set: z.instanceof(Uint8Array).optional(),
    })
    .strict();
export const BytesFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.BytesFieldUpdateOperationsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.BytesFieldUpdateOperationsInput>;
export const BytesFieldUpdateOperationsInputObjectZodSchema = makeSchema();
