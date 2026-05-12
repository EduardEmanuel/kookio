import { createMockUser, resetUserCounter } from '../factories/user.factory';

resetUserCounter();

export const devUsers = [
  createMockUser({
    id: 'usr_dev_admin',
    email: 'admin@kookio.test',
    name: 'Dev Admin',
  }),
  createMockUser({
    id: 'usr_dev_user',
    email: 'user@kookio.test',
    name: 'Dev User',
  }),
];

export const testUsers = [
  createMockUser({
    id: 'usr_test_001',
    email: 'e2e-user-1@kookio.test',
    name: 'E2E User 1',
  }),
  createMockUser({
    id: 'usr_test_002',
    email: 'e2e-user-2@kookio.test',
    name: 'E2E User 2',
  }),
];
