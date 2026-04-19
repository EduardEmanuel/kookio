import { z } from 'zod';

import { UserUtensilFindManyResultSchema as Base } from '../schemas/index';

export const UserUtensilFindManyResultSchema = Base.extend({
  pagination: Base.shape.pagination.extend({
    pageSize: z.number().int().min(0),
    totalPages: z.number().int().min(1),
  }),
});
