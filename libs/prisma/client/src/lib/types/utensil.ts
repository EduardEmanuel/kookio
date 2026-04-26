import z from 'zod';
import { UtensilModelSchema } from '../../prisma-zod-generator/schemas/index';

export const UtensilMockSchema = UtensilModelSchema.pick({
  id: true,
  slug: true,
  name: true,
  emoji: true,
  category: true,
});
export type UtensilMock = z.output<typeof UtensilMockSchema>;
