import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUtensilWhereInputObjectSchema as UserUtensilWhereInputObjectSchema } from './UserUtensilWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      every: z.lazy(() => UserUtensilWhereInputObjectSchema).optional(),
      some: z.lazy(() => UserUtensilWhereInputObjectSchema).optional(),
      none: z.lazy(() => UserUtensilWhereInputObjectSchema).optional(),
    })
    .strict();
export const UserUtensilListRelationFilterObjectSchema: z.ZodType<Prisma.UserUtensilListRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilListRelationFilter>;
export const UserUtensilListRelationFilterObjectZodSchema = makeSchema();
