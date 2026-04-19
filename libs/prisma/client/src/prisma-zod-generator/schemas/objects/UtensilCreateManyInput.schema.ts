import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      slug: z.string(),
      name: z.string(),
      emoji: z.string().optional().nullable(),
      category: z.string().optional().nullable(),
    })
    .strict();
export const UtensilCreateManyInputObjectSchema: z.ZodType<Prisma.UtensilCreateManyInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UtensilCreateManyInput>;
export const UtensilCreateManyInputObjectZodSchema = makeSchema();
