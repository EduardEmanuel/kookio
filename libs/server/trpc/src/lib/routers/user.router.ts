import { TRPCError } from '@trpc/server';

import { paginate } from '@kookio/prisma-client/server';
import {
  UserCreateManySchema,
  UserCreateOneSchema,
  UserDeleteManySchema,
  UserDeleteOneSchema,
  UserFindManySchema,
  UserFindUniqueSchema,
  UserUpdateManySchema,
  UserUpdateOneSchema,
} from '@kookio/prisma-client';
import { logger } from '@kookio/server-logger';

import { userLabelers } from '@kookio/shared-utility';

import { procedure, router } from '../trpc';

export const user = router({
  create: procedure
    .input(UserCreateOneSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.user.create(input);
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
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.user.createMany(input);
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
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.user.delete(input);
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
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.user.deleteMany(input);
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
    .query(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.user.findUnique(input);
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
    .query(async ({ input, ctx }) => {
      try {
        return paginate(await ctx.prisma.user.findMany(input));
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
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.user.update(input);
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
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.user.updateMany(input);
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
