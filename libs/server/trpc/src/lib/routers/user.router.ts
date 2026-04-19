import { TRPCError } from '@trpc/server';

import {
  UserCreateManyResultSchema,
  UserCreateManySchema,
  UserCreateOneSchema,
  UserCreateResultSchema,
  UserDeleteManyResultSchema,
  UserDeleteManySchema,
  UserDeleteOneSchema,
  UserDeleteResultSchema,
  UserFindManyResultSchema,
  UserFindManySchema,
  UserFindUniqueResultSchema,
  UserFindUniqueSchema,
  UserUpdateManyResultSchema,
  UserUpdateManySchema,
  UserUpdateOneSchema,
  UserUpdateResultSchema,
} from '@kookio/prisma-client/prisma-zod-generator';
import { logger } from '@kookio/server-logger';

import { userLabelers } from '@kookio/shared-utility';

import { procedure, router } from '../trpc';

export const user = router({
  create: procedure
    .input(UserCreateOneSchema)
    .output(UserCreateResultSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.repository.user.create(input);
      } catch (error) {
        const label = userLabelers.fromCreateData(input?.data);

        logger.error(error, `Error creating user via tRPC: ${label}`);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to create user: ${label}`,
          cause: error,
        });
      }
    }),

  createMany: procedure
    .input(UserCreateManySchema)
    .output(UserCreateManyResultSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.repository.user.createMany(input);
      } catch (error) {
        const label = userLabelers.fromCreateManyData(input?.data);

        logger.error(error, `Error creating many users via tRPC: ${label}`);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to create many users: ${label}`,
          cause: error,
        });
      }
    }),

  delete: procedure
    .input(UserDeleteOneSchema)
    .output(UserDeleteResultSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.repository.user.delete(input);
      } catch (error) {
        const label = userLabelers.fromWhere(input?.where);

        logger.error(error, `Error deleting user via tRPC: ${label}`);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to delete user: ${label}`,
          cause: error,
        });
      }
    }),

  deleteMany: procedure
    .input(UserDeleteManySchema)
    .output(UserDeleteManyResultSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.repository.user.deleteMany(input);
      } catch (error) {
        const label = userLabelers.fromWhere(input?.where);

        logger.error(error, `Error deleting many users via tRPC: ${label}`);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to delete many users: ${label}`,
          cause: error,
        });
      }
    }),

  findUnique: procedure
    .input(UserFindUniqueSchema)
    .output(UserFindUniqueResultSchema)
    .query(async ({ input, ctx }) => {
      try {
        return await ctx.repository.user.findUnique(input);
      } catch (error) {
        const label = userLabelers.fromWhere(input?.where);

        logger.error(error, `Error fetching user via tRPC: ${label}`);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Could not fetch user: ${label}`,
          cause: error,
        });
      }
    }),

  findMany: procedure
    .input(UserFindManySchema)
    .output(UserFindManyResultSchema)
    .query(async ({ input, ctx }) => {
      try {
        return await ctx.repository.user.findMany(input);
      } catch (error) {
        const label = userLabelers.fromWhere(input?.where);

        logger.error(error, `Error listing users via tRPC: ${label}`);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Could not list users: ${label}`,
          cause: error,
        });
      }
    }),

  update: procedure
    .input(UserUpdateOneSchema)
    .output(UserUpdateResultSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.repository.user.update(input);
      } catch (error) {
        const label = userLabelers.fromWhere(input?.where);

        logger.error(error, `Error updating user via tRPC: ${label}`);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to update user: ${label}`,
          cause: error,
        });
      }
    }),

  updateMany: procedure
    .input(UserUpdateManySchema)
    .output(UserUpdateManyResultSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.repository.user.updateMany(input);
      } catch (error) {
        const label = userLabelers.fromWhere(input?.where);

        logger.error(error, `Error updating many users via tRPC: ${label}`);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to update many users: ${label}`,
          cause: error,
        });
      }
    }),
});
