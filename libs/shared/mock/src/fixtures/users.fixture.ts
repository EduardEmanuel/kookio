import { RoleSchema } from '@kookio/prisma-client';

import { createMockUser, resetUserCounter } from '../factories/user.factory';

const r = RoleSchema.Values;

resetUserCounter();

export const devUsers = [
  createMockUser({
    id: 'usr_dev_admin',
    email: 'admin@kookio.test',
    name: 'Dev Admin',
    roles: [r.ADMIN, r.USER],
  }),
  createMockUser({
    id: 'usr_dev_user',
    email: 'user@kookio.test',
    name: 'Dev User',
    roles: [r.USER],
  }),
];

export const testUsers = [
  createMockUser({
    id: 'usr_test_001',
    email: 'e2e-user-1@kookio.test',
    name: 'E2E User 1',
    roles: [r.USER],
  }),
  createMockUser({
    id: 'usr_test_002',
    email: 'e2e-user-2@kookio.test',
    name: 'E2E User 2',
    roles: [r.USER],
  }),
];
