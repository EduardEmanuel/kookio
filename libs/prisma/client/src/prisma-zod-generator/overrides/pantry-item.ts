import { z } from 'zod';

import { PantryItemFindManyResultSchema as Base } from '../schemas/index';

export const PantryItemFindManyResultSchema = Base.extend({
  pagination: Base.shape.pagination.extend({
    pageSize: z.number().int().min(0),
    totalPages: z.number().int().min(1),
  }),
});
