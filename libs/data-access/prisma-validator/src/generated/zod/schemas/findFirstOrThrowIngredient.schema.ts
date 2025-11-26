import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { IngredientOrderByWithRelationInputObjectSchema as IngredientOrderByWithRelationInputObjectSchema } from './objects/IngredientOrderByWithRelationInput.schema';
import { IngredientWhereInputObjectSchema as IngredientWhereInputObjectSchema } from './objects/IngredientWhereInput.schema';
import { IngredientWhereUniqueInputObjectSchema as IngredientWhereUniqueInputObjectSchema } from './objects/IngredientWhereUniqueInput.schema';
import { IngredientScalarFieldEnumSchema } from './enums/IngredientScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const IngredientFindFirstOrThrowSelectSchema: z.ZodType<Prisma.IngredientSelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    quantity: z.boolean().optional(),
    unit: z.boolean().optional(),
    optional: z.boolean().optional(),
    userId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.IngredientSelect>;

export const IngredientFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    quantity: z.boolean().optional(),
    unit: z.boolean().optional(),
    optional: z.boolean().optional(),
    userId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const IngredientFindFirstOrThrowSchema: z.ZodType<Prisma.IngredientFindFirstOrThrowArgs> = z.object({ select: IngredientFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([IngredientOrderByWithRelationInputObjectSchema, IngredientOrderByWithRelationInputObjectSchema.array()]).optional(), where: IngredientWhereInputObjectSchema.optional(), cursor: IngredientWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([IngredientScalarFieldEnumSchema, IngredientScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.IngredientFindFirstOrThrowArgs>;

export const IngredientFindFirstOrThrowZodSchema = z.object({ select: IngredientFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([IngredientOrderByWithRelationInputObjectSchema, IngredientOrderByWithRelationInputObjectSchema.array()]).optional(), where: IngredientWhereInputObjectSchema.optional(), cursor: IngredientWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([IngredientScalarFieldEnumSchema, IngredientScalarFieldEnumSchema.array()]).optional() }).strict();