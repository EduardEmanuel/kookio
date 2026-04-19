import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserDietaryRestrictionCreateNestedManyWithoutRestrictionInputObjectSchema as UserDietaryRestrictionCreateNestedManyWithoutRestrictionInputObjectSchema } from './UserDietaryRestrictionCreateNestedManyWithoutRestrictionInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      slug: z.string(),
      label: z.string(),
      emoji: z.string().optional().nullable(),
      description: z.string().optional().nullable(),
      users: z.lazy(
        () =>
          UserDietaryRestrictionCreateNestedManyWithoutRestrictionInputObjectSchema,
      ),
    })
    .strict();
export const DietaryRestrictionCreateInputObjectSchema: z.ZodType<Prisma.DietaryRestrictionCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.DietaryRestrictionCreateInput>;
export const DietaryRestrictionCreateInputObjectZodSchema = makeSchema();
