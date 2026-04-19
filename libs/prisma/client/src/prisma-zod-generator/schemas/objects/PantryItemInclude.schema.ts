import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { IngredientCatalogArgsObjectSchema as IngredientCatalogArgsObjectSchema } from './IngredientCatalogArgs.schema';

const makeSchema = () =>
  z
    .object({
      user: z
        .union([z.boolean(), z.lazy(() => UserArgsObjectSchema)])
        .optional(),
      ingredient: z
        .union([z.boolean(), z.lazy(() => IngredientCatalogArgsObjectSchema)])
        .optional(),
    })
    .strict();
export const PantryItemIncludeObjectSchema: z.ZodType<Prisma.PantryItemInclude> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemInclude>;
export const PantryItemIncludeObjectZodSchema = makeSchema();
