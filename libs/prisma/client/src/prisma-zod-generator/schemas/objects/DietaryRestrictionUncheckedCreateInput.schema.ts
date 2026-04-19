import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserDietaryRestrictionUncheckedCreateNestedManyWithoutRestrictionInputObjectSchema as UserDietaryRestrictionUncheckedCreateNestedManyWithoutRestrictionInputObjectSchema } from './UserDietaryRestrictionUncheckedCreateNestedManyWithoutRestrictionInput.schema';

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
          UserDietaryRestrictionUncheckedCreateNestedManyWithoutRestrictionInputObjectSchema,
      ),
    })
    .strict();
export const DietaryRestrictionUncheckedCreateInputObjectSchema: z.ZodType<Prisma.DietaryRestrictionUncheckedCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.DietaryRestrictionUncheckedCreateInput>;
export const DietaryRestrictionUncheckedCreateInputObjectZodSchema =
  makeSchema();
