import { z } from 'zod';

import { UtensilFindManyResultSchema as Base } from '../schemas/index';

export const UtensilFindManyResultSchema = Base.extend({
  pagination: Base.shape.pagination.extend({
    pageSize: z.number().int().min(0),
    totalPages: z.number().int().min(1),
  }),
});
