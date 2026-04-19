import * as z from 'zod';
export const UserUtensilCreateResultSchema = z.object({
  userId: z.string(),
  utensilId: z.string(),
  user: z.unknown(),
  utensil: z.unknown(),
});
