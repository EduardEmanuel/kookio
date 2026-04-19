import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () => z.object({}).strict();
export const UserDietaryRestrictionUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionUpdateManyMutationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionUpdateManyMutationInput>;
export const UserDietaryRestrictionUpdateManyMutationInputObjectZodSchema =
  makeSchema();
