import z from 'zod';
import { UserProfileModelSchema } from '../../prisma-zod-generator/schemas/index';

export const UserProfileMockSchema = UserProfileModelSchema.pick({
  id: true,
  userId: true,
  adultsCount: true,
  childrenCount: true,
  onboardingDone: true,
});
export type UserProfileMock = z.output<typeof UserProfileMockSchema>;
