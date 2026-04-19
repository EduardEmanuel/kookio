import { z } from 'zod';

import { MealAreaFindManyResultSchema as Base } from '../schemas/index';

export const MealAreaFindManyResultSchema = Base.extend({
  pagination: Base.shape.pagination.extend({
    pageSize: z.number().int().min(0),
    totalPages: z.number().int().min(1),
  }),
});
