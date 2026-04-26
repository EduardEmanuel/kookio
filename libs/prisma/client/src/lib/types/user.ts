import z from 'zod';
import { UserModelSchema } from '../../prisma-zod-generator/schemas/index';

export const UserSeededSchema = UserModelSchema.pick({
  id: true,
  email: true,
  roles: true,
  firebaseUid: true,
});
export type UserSeeded = z.output<typeof UserSeededSchema>;

export const UserMockSchema = UserModelSchema.pick({
  id: true,
  email: true,
  name: true,
  roles: true,
  amr: true,
  isDisabled: true,
});
export type UserMock = z.output<typeof UserMockSchema>;
