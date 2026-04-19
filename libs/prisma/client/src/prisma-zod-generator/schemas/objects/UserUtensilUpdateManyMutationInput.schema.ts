import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () => z.object({}).strict();
export const UserUtensilUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.UserUtensilUpdateManyMutationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilUpdateManyMutationInput>;
export const UserUtensilUpdateManyMutationInputObjectZodSchema = makeSchema();
