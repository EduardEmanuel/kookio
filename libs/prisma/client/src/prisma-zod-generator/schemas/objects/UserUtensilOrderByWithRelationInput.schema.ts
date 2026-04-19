import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserProfileOrderByWithRelationInputObjectSchema as UserProfileOrderByWithRelationInputObjectSchema } from './UserProfileOrderByWithRelationInput.schema';
import { UtensilOrderByWithRelationInputObjectSchema as UtensilOrderByWithRelationInputObjectSchema } from './UtensilOrderByWithRelationInput.schema';

const makeSchema = () =>
  z
    .object({
      userId: SortOrderSchema.optional(),
      utensilId: SortOrderSchema.optional(),
      user: z
        .lazy(() => UserProfileOrderByWithRelationInputObjectSchema)
        .optional(),
      utensil: z
        .lazy(() => UtensilOrderByWithRelationInputObjectSchema)
        .optional(),
    })
    .strict();
export const UserUtensilOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UserUtensilOrderByWithRelationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilOrderByWithRelationInput>;
export const UserUtensilOrderByWithRelationInputObjectZodSchema = makeSchema();
