import type { UserMock } from '@kookio/prisma-client';

let _userCounter = 0;

export const resetUserCounter = () => {
  _userCounter = 0;
};

export const createMockUser = (overrides?: Partial<UserMock>): UserMock => {
  _userCounter += 1;
  const n = _userCounter.toString().padStart(4, '0');
  return {
    id: `usr_mock_${n}`,
    email: `user${n}@kookio.test`,
    name: `Test User ${n}`,
    amr: [],
    isDisabled: false,
    ...overrides,
  };
};
