import * as z from 'zod';
export const UserUtensilUpsertResultSchema = z.object({
  userId: z.string(),
  utensilId: z.string(),
  user: z.unknown(),
  utensil: z.unknown(),
});
