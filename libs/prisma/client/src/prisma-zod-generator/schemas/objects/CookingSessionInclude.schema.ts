import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { RecipeArgsObjectSchema as RecipeArgsObjectSchema } from './RecipeArgs.schema';

const makeSchema = () =>
  z
    .object({
      user: z
        .union([z.boolean(), z.lazy(() => UserArgsObjectSchema)])
        .optional(),
      recipe: z
        .union([z.boolean(), z.lazy(() => RecipeArgsObjectSchema)])
        .optional(),
    })
    .strict();
export const CookingSessionIncludeObjectSchema: z.ZodType<Prisma.CookingSessionInclude> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionInclude>;
export const CookingSessionIncludeObjectZodSchema = makeSchema();
