/**
 * Generates CRUD repository, DTO, and Zod override files for each Prisma model.
 * Run: node scripts/generate-prisma-zod-repositories.mjs
 */
import { mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../libs/prisma/client');
const BASE = join(ROOT, 'src');

// ─── Model registry ──────────────────────────────────────────────────────────

/**
 * compositeKey: null = standard UUID id
 *   otherwise: { field1, field2 } used for findUnique where in spec
 *   compound: the Prisma compound key name (e.g. userId_dietaryRestrictionId)
 */
const MODELS = [
  {
    name: 'User',
    kebab: 'user',
    prismaKey: 'user',
    specResult: `{ id, email: 'user@test.com', name: 'Test User', roles: ['USER'], amr: ['password'], isDisabled: false, credentials: [], createdAt: now, updatedAt: now }`,
    specCreate: `{ data: { email: 'user@test.com', name: 'Test User', roles: ['USER'], credentials: { create: [] }, amr: ['password'], isDisabled: false } }`,
    compositeKey: null,
    extraDtoImports: `  RoleSchema,`,
    extraDtoExports: `
export const role = RoleSchema.Values;
export type Role = z.output<typeof RoleSchema>;`,
  },
  {
    name: 'WebAuthnCredential',
    kebab: 'web-authn-credential',
    prismaKey: 'webAuthnCredential',
    specResult: `{ id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', userId: id, credentialId: new Uint8Array(), publicKey: new Uint8Array(), counter: 0, transports: [], backupEligible: false, backupState: false, createdAt: now, updatedAt: now, user: null }`,
    specCreate: `{ data: { userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', credentialId: new Uint8Array(), publicKey: new Uint8Array(), counter: 0, transports: [], backupEligible: false, backupState: false } }`,
    compositeKey: null,
  },
  {
    name: 'UserProfile',
    kebab: 'user-profile',
    prismaKey: 'userProfile',
    specResult: `{ id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', userId: id, adultsCount: 1, childrenCount: 0, onboardingDone: false, createdAt: now, updatedAt: now }`,
    specCreate: `{ data: { userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', adultsCount: 1, childrenCount: 0, onboardingDone: false } }`,
    compositeKey: null,
  },
  {
    name: 'DietaryRestriction',
    kebab: 'dietary-restriction',
    prismaKey: 'dietaryRestriction',
    specResult: `{ id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', slug: 'gluten-free', label: 'Gluten Free', createdAt: now, updatedAt: now }`,
    specCreate: `{ data: { slug: 'gluten-free', label: 'Gluten Free' } }`,
    compositeKey: null,
  },
  {
    name: 'UserDietaryRestriction',
    kebab: 'user-dietary-restriction',
    prismaKey: 'userDietaryRestriction',
    specResult: `{ userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', dietaryRestrictionId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', user: null, restriction: null }`,
    specCreate: `{ data: { userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', dietaryRestrictionId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb' } }`,
    compositeKey: {
      compound: 'userId_dietaryRestrictionId',
      field1: 'userId',
      value1: `'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'`,
      field2: 'dietaryRestrictionId',
      value2: `'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'`,
    },
  },
  {
    name: 'Utensil',
    kebab: 'utensil',
    prismaKey: 'utensil',
    specResult: `{ id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', slug: 'chef-knife', name: 'Chef Knife', createdAt: now, updatedAt: now }`,
    specCreate: `{ data: { slug: 'chef-knife', name: 'Chef Knife' } }`,
    compositeKey: null,
  },
  {
    name: 'UserUtensil',
    kebab: 'user-utensil',
    prismaKey: 'userUtensil',
    specResult: `{ userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', utensilId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', user: null, utensil: null }`,
    specCreate: `{ data: { userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', utensilId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb' } }`,
    compositeKey: {
      compound: 'userId_utensilId',
      field1: 'userId',
      value1: `'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'`,
      field2: 'utensilId',
      value2: `'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'`,
    },
  },
  {
    name: 'MealCategory',
    kebab: 'meal-category',
    prismaKey: 'mealCategory',
    specResult: `{ id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', externalId: 'Beef', name: 'Beef', createdAt: now, updatedAt: now }`,
    specCreate: `{ data: { externalId: 'Beef', name: 'Beef' } }`,
    compositeKey: null,
    extraDtoImports: `  MealCategoryModelSchema,`,
    extraDtoExports: `
export const MealCategorySeedRowSchema = MealCategoryModelSchema.omit({
  id: true,
  createdAt: true,
  recipes: true,
});
export type MealCategorySeedRow = z.output<typeof MealCategorySeedRowSchema>;`,
  },
  {
    name: 'MealArea',
    kebab: 'meal-area',
    prismaKey: 'mealArea',
    specResult: `{ id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', externalId: 'American', name: 'American', createdAt: now, updatedAt: now }`,
    specCreate: `{ data: { externalId: 'American', name: 'American' } }`,
    compositeKey: null,
    extraDtoImports: `  MealAreaModelSchema,`,
    extraDtoExports: `
export const MealAreaSeedRowSchema = MealAreaModelSchema.omit({
  id: true,
  createdAt: true,
  recipes: true,
});
export type MealAreaSeedRow = z.output<typeof MealAreaSeedRowSchema>;`,
  },
  {
    name: 'IngredientCatalog',
    kebab: 'ingredient-catalog',
    prismaKey: 'ingredientCatalog',
    specResult: `{ id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', name: 'Chicken', normalizedName: 'chicken', createdAt: now, updatedAt: now }`,
    specCreate: `{ data: { name: 'Chicken', normalizedName: 'chicken' } }`,
    compositeKey: null,
    extraDtoImports: `  IngredientCatalogModelSchema,`,
    extraDtoExports: `
export const IngredientCatalogSeedRowSchema = IngredientCatalogModelSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  recipeIngredients: true,
  pantryItems: true,
});
export type IngredientCatalogSeedRow = z.output<typeof IngredientCatalogSeedRowSchema>;

export const IngredientCatalogLookupRowSchema = IngredientCatalogModelSchema.pick({
  id: true,
  normalizedName: true,
});
export type IngredientCatalogLookupRow = z.output<typeof IngredientCatalogLookupRowSchema>;`,
  },
  {
    name: 'Recipe',
    kebab: 'recipe',
    prismaKey: 'recipe',
    specResult: `{ id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', slug: 'chicken-tikka', title: 'Chicken Tikka', instructions: 'Cook it.', status: 'DRAFT', servings: 2, ingredients: [], tags: [], collectionEntries: [], mealPlanSlots: [], cookingSessions: [], createdAt: now, updatedAt: now }`,
    specCreate: `{ data: { slug: 'chicken-tikka', title: 'Chicken Tikka', instructions: 'Cook it.', status: 'DRAFT', servings: 2 } }`,
    compositeKey: null,
    extraDtoImports: `  RecipeInputSchema,`,
    extraFileImports: `import { RecipeIngredientSeedRowSchema } from './recipe-ingredient';
import { RecipeTagSeedRowSchema } from './recipe-tag';`,
    extraDtoExports: `
export const RecipeSeedRowSchema = RecipeInputSchema
  .pick({
    externalId: true,
    slug: true,
    title: true,
    imageUrl: true,
    youtubeUrl: true,
    sourceUrl: true,
    instructions: true,
  })
  .extend({
    categoryExternalId: z.string().nullable(),
    areaExternalId: z.string().nullable(),
    tags: z.array(RecipeTagSeedRowSchema),
    ingredients: z.array(RecipeIngredientSeedRowSchema),
  });
export type RecipeSeedRow = z.output<typeof RecipeSeedRowSchema>;`,
  },
  {
    name: 'RecipeIngredient',
    kebab: 'recipe-ingredient',
    prismaKey: 'recipeIngredient',
    specResult: `{ id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', ingredientCatalogId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc' }`,
    specCreate: `{ data: { recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', ingredientCatalogId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc' } }`,
    compositeKey: null,
    extraDtoImports: `  RecipeIngredientInputSchema,`,
    extraDtoExports: `
export const RecipeIngredientSeedRowSchema = RecipeIngredientInputSchema
  .omit({ id: true, recipeId: true, ingredientCatalogId: true, recipe: true, ingredient: true })
  .extend({ ingredientNormalizedName: z.string() });
export type RecipeIngredientSeedRow = z.output<typeof RecipeIngredientSeedRowSchema>;`,
  },
  {
    name: 'RecipeTag',
    kebab: 'recipe-tag',
    prismaKey: 'recipeTag',
    specResult: `{ id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', tag: 'healthy' }`,
    specCreate: `{ data: { recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', tag: 'healthy' } }`,
    compositeKey: null,
    extraDtoImports: `  RecipeTagInputSchema,`,
    extraDtoExports: `
export const RecipeTagSeedRowSchema = RecipeTagInputSchema.pick({ tag: true });
export type RecipeTagSeedRow = z.output<typeof RecipeTagSeedRowSchema>;`,
  },
  {
    name: 'PantryItem',
    kebab: 'pantry-item',
    prismaKey: 'pantryItem',
    specResult: `{ id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', ingredientCatalogId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc', quantity: 1, addedAt: now, updatedAt: now }`,
    specCreate: `{ data: { userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', ingredientCatalogId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc', quantity: 1 } }`,
    compositeKey: null,
  },
  {
    name: 'RecipeCollection',
    kebab: 'recipe-collection',
    prismaKey: 'recipeCollection',
    specResult: `{ id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', name: 'Favourites', entries: [], createdAt: now, updatedAt: now }`,
    specCreate: `{ data: { userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', name: 'Favourites' } }`,
    compositeKey: null,
  },
  {
    name: 'RecipeCollectionEntry',
    kebab: 'recipe-collection-entry',
    prismaKey: 'recipeCollectionEntry',
    specResult: `{ collectionId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', addedAt: now, collection: null, recipe: null }`,
    specCreate: `{ data: { collectionId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', recipeId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb' } }`,
    compositeKey: {
      compound: 'collectionId_recipeId',
      field1: 'collectionId',
      value1: `'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'`,
      field2: 'recipeId',
      value2: `'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'`,
    },
  },
  {
    name: 'MealPlan',
    kebab: 'meal-plan',
    prismaKey: 'mealPlan',
    specResult: `{ id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', startDate: now, endDate: now, slots: [], createdAt: now, updatedAt: now }`,
    specCreate: `{ data: { userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', startDate: now, endDate: now } }`,
    compositeKey: null,
  },
  {
    name: 'MealPlanSlot',
    kebab: 'meal-plan-slot',
    prismaKey: 'mealPlanSlot',
    specResult: `{ id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', mealPlanId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', date: now, slotType: 'BREAKFAST', servings: 2, mealPlan: null }`,
    specCreate: `{ data: { mealPlanId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', date: now, slotType: 'BREAKFAST', servings: 2 } }`,
    compositeKey: null,
  },
  {
    name: 'CookingSession',
    kebab: 'cooking-session',
    prismaKey: 'cookingSession',
    specResult: `{ id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', recipeId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc', servings: 2, createdAt: now }`,
    specCreate: `{ data: { userId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', recipeId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc', servings: 2 } }`,
    compositeKey: null,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const write = (filePath, content) => {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, content, 'utf8');
  console.log('  wrote', filePath.replace(ROOT + '/', ''));
};

// ─── Generators ──────────────────────────────────────────────────────────────

const genOverride = ({ name }) => {
  return `import { z } from 'zod';

import { ${name}FindManyResultSchema as Base } from '../../prisma-zod-generator/schemas/index';

export const ${name}FindManyResultSchema = Base.extend({
  pagination: Base.shape.pagination.extend({
    pageSize: z.number().int().min(0),
    totalPages: z.number().int().min(1),
  }),
});
`;
};

const genDTO = ({
  name,
  extraDtoImports = '',
  extraDtoExports = '',
  extraFileImports = '',
}) => {
  const M = name;
  const extraImportLine = extraDtoImports ? `\n${extraDtoImports}` : '';
  const extraFileImportBlock = extraFileImports
    ? `\n${extraFileImports}\n`
    : '';
  return `import z from 'zod';
import {
  ${M}CountResultSchema,
  ${M}CountSchema,
  ${M}CreateManyResultSchema,
  ${M}CreateManySchema,
  ${M}CreateOneSchema,
  ${M}CreateResultSchema,
  ${M}DeleteManyResultSchema,
  ${M}DeleteManySchema,
  ${M}DeleteOneSchema,
  ${M}DeleteResultSchema,
  ${M}FindManyResultSchema,
  ${M}FindManySchema,
  ${M}FindUniqueResultSchema,
  ${M}FindUniqueSchema,
  ${M}GroupByResultSchema,
  ${M}GroupBySchema,
  ${M}UpdateManyResultSchema,
  ${M}UpdateManySchema,
  ${M}UpdateOneSchema,
  ${M}UpdateResultSchema,
  ${M}UpsertOneSchema,
  ${M}UpsertResultSchema,${extraImportLine}
} from '../../prisma-zod-generator/schemas/index';${extraFileImportBlock}

export type Count${M}DTO = z.output<typeof ${M}CountSchema>;
export type Count${M}ResultDTO = z.output<typeof ${M}CountResultSchema>;
export type CreateOne${M}DTO = z.output<typeof ${M}CreateOneSchema>;
export type Create${M}ResultDTO = z.output<typeof ${M}CreateResultSchema>;
export type CreateMany${M}DTO = z.output<typeof ${M}CreateManySchema>;
export type CreateMany${M}ResultDTO = z.output<typeof ${M}CreateManyResultSchema>;
export type DeleteOne${M}DTO = z.output<typeof ${M}DeleteOneSchema>;
export type Delete${M}ResultDTO = z.output<typeof ${M}DeleteResultSchema>;
export type DeleteMany${M}DTO = z.output<typeof ${M}DeleteManySchema>;
export type DeleteMany${M}ResultDTO = z.output<typeof ${M}DeleteManyResultSchema>;
export type FindMany${M}DTO = z.output<typeof ${M}FindManySchema>;
export type FindMany${M}ResultDTO = z.output<typeof ${M}FindManyResultSchema>;
export type FindUnique${M}DTO = z.output<typeof ${M}FindUniqueSchema>;
export type FindUnique${M}ResultDTO = z.output<typeof ${M}FindUniqueResultSchema>;
export type GroupBy${M}DTO = z.output<typeof ${M}GroupBySchema>;
export type GroupBy${M}ResultDTO = z.output<typeof ${M}GroupByResultSchema>;
export type UpdateOne${M}DTO = z.output<typeof ${M}UpdateOneSchema>;
export type Update${M}ResultDTO = z.output<typeof ${M}UpdateResultSchema>;
export type UpdateMany${M}DTO = z.output<typeof ${M}UpdateManySchema>;
export type UpdateMany${M}ResultDTO = z.output<typeof ${M}UpdateManyResultSchema>;
export type UpsertOne${M}DTO = z.output<typeof ${M}UpsertOneSchema>;
export type Upsert${M}ResultDTO = z.output<typeof ${M}UpsertResultSchema>;${extraDtoExports}
`;
};

const genRepository = ({ name, kebab, prismaKey }) => {
  const M = name;
  const k = kebab;
  return `import type {
  Count${M}DTO,
  Count${M}ResultDTO,
  CreateOne${M}DTO,
  Create${M}ResultDTO,
  CreateMany${M}DTO,
  CreateMany${M}ResultDTO,
  DeleteOne${M}DTO,
  Delete${M}ResultDTO,
  DeleteMany${M}DTO,
  DeleteMany${M}ResultDTO,
  FindMany${M}DTO,
  FindMany${M}ResultDTO,
  FindUnique${M}DTO,
  FindUnique${M}ResultDTO,
  GroupBy${M}DTO,
  GroupBy${M}ResultDTO,
  UpdateOne${M}DTO,
  Update${M}ResultDTO,
  UpdateMany${M}DTO,
  UpdateMany${M}ResultDTO,
  UpsertOne${M}DTO,
  Upsert${M}ResultDTO,
} from '../../types/${k}';

import { prisma, withTxRetry } from '../../prisma-client';

export interface ${M}Repository {
  count(clause: Count${M}DTO): Promise<Count${M}ResultDTO>;
  create(data: CreateOne${M}DTO): Promise<Create${M}ResultDTO>;
  createMany(data: CreateMany${M}DTO): Promise<CreateMany${M}ResultDTO>;
  delete(clause: DeleteOne${M}DTO): Promise<Delete${M}ResultDTO>;
  deleteMany(clause: DeleteMany${M}DTO): Promise<DeleteMany${M}ResultDTO>;
  findUnique(clause: FindUnique${M}DTO): Promise<FindUnique${M}ResultDTO>;
  findMany(clause: FindMany${M}DTO): Promise<FindMany${M}ResultDTO>;
  groupBy(clause: GroupBy${M}DTO): Promise<GroupBy${M}ResultDTO>;
  update(clause: UpdateOne${M}DTO): Promise<Update${M}ResultDTO>;
  updateMany(clause: UpdateMany${M}DTO): Promise<UpdateMany${M}ResultDTO>;
  upsert(clause: UpsertOne${M}DTO): Promise<Upsert${M}ResultDTO>;
}

export class Prisma${M}Repository implements ${M}Repository {
  count = (clause: Count${M}DTO) => {
    return prisma.${prismaKey}.count(clause) as unknown as Promise<Count${M}ResultDTO>;
  };

  create = (clause: CreateOne${M}DTO) => {
    return withTxRetry(
      prisma,
      (tx) => tx.${prismaKey}.create(clause) as unknown as Promise<Create${M}ResultDTO>,
    );
  };

  createMany = (clause: CreateMany${M}DTO) => {
    return withTxRetry(prisma, (tx) => tx.${prismaKey}.createMany(clause));
  };

  delete = (clause: DeleteOne${M}DTO) => {
    return withTxRetry(
      prisma,
      (tx) => tx.${prismaKey}.delete(clause) as unknown as Promise<Delete${M}ResultDTO>,
    );
  };

  deleteMany = (clause: DeleteMany${M}DTO) => {
    return withTxRetry(prisma, (tx) => tx.${prismaKey}.deleteMany(clause));
  };

  findMany = async (clause: FindMany${M}DTO) => {
    const items = await prisma.${prismaKey}.findMany(clause);
    return {
      data: items,
      pagination: {
        page: 1,
        pageSize: items.length,
        total: items.length,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      },
    } as FindMany${M}ResultDTO;
  };

  findUnique = (clause: FindUnique${M}DTO) => {
    return prisma.${prismaKey}.findUnique(
      clause,
    ) as unknown as Promise<FindUnique${M}ResultDTO>;
  };

  groupBy = (clause: GroupBy${M}DTO) => {
    return prisma.${prismaKey}.groupBy(clause) as unknown as Promise<GroupBy${M}ResultDTO>;
  };

  update = (clause: UpdateOne${M}DTO) => {
    return withTxRetry(
      prisma,
      (tx) => tx.${prismaKey}.update(clause) as unknown as Promise<Update${M}ResultDTO>,
    );
  };

  updateMany = (clause: UpdateMany${M}DTO) => {
    return withTxRetry(prisma, (tx) => tx.${prismaKey}.updateMany(clause));
  };

  upsert = (clause: UpsertOne${M}DTO) => {
    return withTxRetry(
      prisma,
      (tx) => tx.${prismaKey}.upsert(clause) as unknown as Promise<Upsert${M}ResultDTO>,
    );
  };
}
`;
};

const genSpec = ({
  name,
  kebab,
  prismaKey,
  specResult,
  specCreate,
  compositeKey,
}) => {
  const M = name;
  const k = kebab;
  const usesNow =
    (specResult ?? '').includes('now') || (specCreate ?? '').includes('now');

  const uniqueWhereClause = compositeKey
    ? `{ where: { ${compositeKey.compound}: { ${compositeKey.field1}: ${compositeKey.value1}, ${compositeKey.field2}: ${compositeKey.value2} } } }`
    : `{ where: { id } }`;

  const updateWhereClause = compositeKey
    ? `{ where: { ${compositeKey.compound}: { ${compositeKey.field1}: ${compositeKey.value1}, ${compositeKey.field2}: ${compositeKey.value2} } }, data: {} }`
    : `{ where: { id }, data: {} }`;

  const deleteWhereClause = compositeKey
    ? `{ where: { ${compositeKey.compound}: { ${compositeKey.field1}: ${compositeKey.value1}, ${compositeKey.field2}: ${compositeKey.value2} } } }`
    : `{ where: { id } }`;

  return `import { PrismaClient } from '@prisma/client';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import type {
  Count${M}DTO,
  Count${M}ResultDTO,
  CreateOne${M}DTO,
  FindUnique${M}DTO,
  FindMany${M}DTO,
  FindMany${M}ResultDTO,
  GroupBy${M}DTO,
  GroupBy${M}ResultDTO,
  UpdateOne${M}DTO,
  DeleteOne${M}DTO,
  UpsertOne${M}DTO,
  Upsert${M}ResultDTO,
} from '../../types/${k}';

${usesNow ? 'const now = new Date();' : ''}
const id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

const prismaMock = vi.hoisted(() => ({
  ${prismaKey}: {
    count: vi.fn(),
    create: vi.fn(),
    createMany: vi.fn(),
    delete: vi.fn(),
    deleteMany: vi.fn(),
    findUnique: vi.fn(),
    findMany: vi.fn(),
    groupBy: vi.fn(),
    update: vi.fn(),
    updateMany: vi.fn(),
    upsert: vi.fn(),
  },
}));

vi.mock('../../prisma-client', async (importActual) => {
  const actual = await importActual<typeof import('../../prisma-client')>();
  return {
    ...actual,
    prisma: prismaMock,
    withTxRetry: async (
      _prisma: PrismaClient,
      fn: (tx: typeof prismaMock) => Promise<unknown>,
    ) => fn(prismaMock),
  };
});

import { Prisma${M}Repository } from './${k}.repository';

describe('Prisma${M}Repository (unit, mocked Prisma)', () => {
  let repo: Prisma${M}Repository;

  beforeEach(() => {
    repo = new Prisma${M}Repository();
    vi.clearAllMocks();
  });

  it('create: forwards input and returns created record', async () => {
    const input = ${specCreate} as unknown as CreateOne${M}DTO;
    const created = ${specResult} as unknown;

    prismaMock.${prismaKey}.create.mockResolvedValue(created);

    const result = await repo.create(input);

    expect(prismaMock.${prismaKey}.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(created);
  });

  it('findUnique: forwards clause and returns found record', async () => {
    const clause = ${uniqueWhereClause} as unknown as FindUnique${M}DTO;
    const found = ${specResult} as unknown;

    prismaMock.${prismaKey}.findUnique.mockResolvedValue(found);

    const result = await repo.findUnique(clause);

    expect(prismaMock.${prismaKey}.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toEqual(found);
  });

  it('findUnique: returns null when not found', async () => {
    const clause = ${uniqueWhereClause} as unknown as FindUnique${M}DTO;

    prismaMock.${prismaKey}.findUnique.mockResolvedValue(null);

    const result = await repo.findUnique(clause);

    expect(prismaMock.${prismaKey}.findUnique).toHaveBeenCalledWith(clause);
    expect(result).toBeNull();
  });

  it('findMany: wraps results in pagination envelope', async () => {
    const clause = {} as FindMany${M}DTO;
    const row = ${specResult} as unknown;
    const rows = [row];
    const expected: FindMany${M}ResultDTO = {
      data: rows as never,
      pagination: { page: 1, pageSize: 1, total: 1, totalPages: 1, hasNext: false, hasPrev: false },
    };

    prismaMock.${prismaKey}.findMany.mockResolvedValue(rows);

    const result = await repo.findMany(clause);

    expect(prismaMock.${prismaKey}.findMany).toHaveBeenCalledWith(clause);
    expect(result).toEqual(expected);
  });

  it('update: forwards clause and returns updated record', async () => {
    const clause = ${updateWhereClause} as unknown as UpdateOne${M}DTO;
    const updated = ${specResult} as unknown;

    prismaMock.${prismaKey}.update.mockResolvedValue(updated);

    const result = await repo.update(clause);

    expect(prismaMock.${prismaKey}.update).toHaveBeenCalledWith(clause);
    expect(result).toEqual(updated);
  });

  it('delete: forwards clause and returns deleted record', async () => {
    const clause = ${deleteWhereClause} as unknown as DeleteOne${M}DTO;
    const deleted = ${specResult} as unknown;

    prismaMock.${prismaKey}.delete.mockResolvedValue(deleted);

    const result = await repo.delete(clause);

    expect(prismaMock.${prismaKey}.delete).toHaveBeenCalledWith(clause);
    expect(result).toEqual(deleted);
  });

  it('upsert: forwards clause and returns upserted record', async () => {
    const clause = ${specCreate} as unknown as UpsertOne${M}DTO;
    const upserted = ${specResult} as unknown as Upsert${M}ResultDTO;

    prismaMock.${prismaKey}.upsert.mockResolvedValue(upserted);

    const result = await repo.upsert(clause);

    expect(prismaMock.${prismaKey}.upsert).toHaveBeenCalledWith(clause);
    expect(result).toEqual(upserted);
  });

  it('count: returns numeric count', async () => {
    const clause = {} as Count${M}DTO;

    prismaMock.${prismaKey}.count.mockResolvedValue(42);

    const result = await repo.count(clause) as unknown as Count${M}ResultDTO;

    expect(prismaMock.${prismaKey}.count).toHaveBeenCalledWith(clause);
    expect(result).toBe(42);
  });

  it('groupBy: returns grouped result array', async () => {
    const clause = { by: ['id'] } as unknown as GroupBy${M}DTO;
    const grouped = [{ id, _count: { id: 1 } }] as unknown as GroupBy${M}ResultDTO;

    prismaMock.${prismaKey}.groupBy.mockResolvedValue(grouped);

    const result = await repo.groupBy(clause);

    expect(prismaMock.${prismaKey}.groupBy).toHaveBeenCalledWith(clause);
    expect(result).toEqual(grouped);
  });

  it('propagates errors from Prisma', async () => {
    const input = ${specCreate} as unknown as CreateOne${M}DTO;
    prismaMock.${prismaKey}.create.mockRejectedValue(new Error('db error'));

    await expect(repo.create(input)).rejects.toThrow('db error');
  });
});
`;
};

// ─── Main ─────────────────────────────────────────────────────────────────────

for (const model of MODELS) {
  const { name, kebab } = model;
  console.log(`\n▸ ${name}`);

  write(
    join(BASE, 'lib', 'prisma-zod-overrides', `${kebab}.ts`),
    genOverride(model),
  );

  write(join(BASE, 'lib', 'types', `${kebab}.ts`), genDTO(model));

  const repoDir = join(BASE, 'lib', 'repositories', kebab);
  write(join(repoDir, `${kebab}.repository.ts`), genRepository(model));
  write(join(repoDir, `${kebab}.repository.spec.ts`), genSpec(model));
}

console.log('\n✓ Done — update barrel exports manually.\n');
