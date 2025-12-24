import type {
  UpdateOneIngredientDTO,
  DeleteOneIngredientDTO,
  FindUniqueIngredientDTO,
  FindUniqueIngredientResultDTO,
  FindManyIngredientDTO,
  FindManyIngredientResultDTO,
  CreateIngredientResultDTO,
  DeleteIngredientResultDTO,
  UpdateIngredientResultDTO,
  CreateManyIngredientDTO,
  CreateManyIngredientResultDTO,
  DeleteManyIngredientDTO,
  DeleteManyIngredientResultDTO,
  UpdateManyIngredientDTO,
  UpdateManyIngredientResultDTO,
  CreateOneIngredientDTO
} from '@kookio/prisma-validator';

import { prisma, withTxRetry } from '../../prisma-client';

export interface IngredientRepository {
  create(data: CreateOneIngredientDTO): Promise<CreateIngredientResultDTO>;
  createMany(data: CreateManyIngredientDTO): Promise<CreateManyIngredientResultDTO>;
  delete(clause: DeleteOneIngredientDTO): Promise<DeleteIngredientResultDTO>;
  deleteMany(clause: DeleteManyIngredientDTO): Promise<DeleteManyIngredientResultDTO>;
  findUnique(clause: FindUniqueIngredientDTO): Promise<FindUniqueIngredientResultDTO>;
  findMany(clause: FindManyIngredientDTO): Promise<FindManyIngredientResultDTO>;
  update(clause: UpdateOneIngredientDTO): Promise<UpdateIngredientResultDTO>;
  updateMany(clause: UpdateManyIngredientDTO): Promise<UpdateManyIngredientResultDTO>;
}

export class PrismaIngredientRepository implements IngredientRepository {
  create(clause: CreateOneIngredientDTO) {
    return withTxRetry(prisma, (tx) => tx.ingredient.create(clause));
  }

  createMany(clause: CreateManyIngredientDTO) {
    return withTxRetry(prisma, (tx) => tx.ingredient.createMany(clause));
  }

  delete(clause: DeleteOneIngredientDTO) {
    return withTxRetry(prisma, (tx) => tx.ingredient.delete(clause));
  }

  deleteMany(clause: DeleteManyIngredientDTO) {
    return withTxRetry(prisma, (tx) => tx.ingredient.deleteMany(clause));
  }

  async findMany(clause: FindManyIngredientDTO) {
    const items = await prisma.ingredient.findMany(clause);
    
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
    };
  }

  findUnique(clause: FindUniqueIngredientDTO) {
    return prisma.ingredient.findUnique(clause);
  }

  update(clause: UpdateOneIngredientDTO) {
    return withTxRetry(prisma, (tx) => tx.ingredient.update(clause));
  }

  updateMany(clause: UpdateManyIngredientDTO) {
    return withTxRetry(prisma, (tx) => tx.ingredient.updateMany(clause));
  }
}