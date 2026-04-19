import * as z from 'zod';
export const UserUtensilUpdateResultSchema = z.nullable(
  z.object({
    userId: z.string(),
    utensilId: z.string(),
    user: z.unknown(),
    utensil: z.unknown(),
  }),
);
