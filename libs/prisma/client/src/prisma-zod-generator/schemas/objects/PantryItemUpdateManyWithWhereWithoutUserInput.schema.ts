import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PantryItemScalarWhereInputObjectSchema as PantryItemScalarWhereInputObjectSchema } from './PantryItemScalarWhereInput.schema';
import { PantryItemUpdateManyMutationInputObjectSchema as PantryItemUpdateManyMutationInputObjectSchema } from './PantryItemUpdateManyMutationInput.schema';
import { PantryItemUncheckedUpdateManyWithoutUserInputObjectSchema as PantryItemUncheckedUpdateManyWithoutUserInputObjectSchema } from './PantryItemUncheckedUpdateManyWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => PantryItemScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => PantryItemUpdateManyMutationInputObjectSchema),
        z.lazy(() => PantryItemUncheckedUpdateManyWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const PantryItemUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.PantryItemUpdateManyWithWhereWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemUpdateManyWithWhereWithoutUserInput>;
export const PantryItemUpdateManyWithWhereWithoutUserInputObjectZodSchema =
  makeSchema();
