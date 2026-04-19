import * as z from 'zod';

export const MeasureUnitSchema = z.enum([
  'G',
  'KG',
  'ML',
  'L',
  'TSP',
  'TBSP',
  'CUP',
  'OZ',
  'LB',
  'PIECE',
  'SLICE',
  'CLOVE',
  'BUNCH',
  'PINCH',
  'TO_TASTE',
  'TO_SERVE',
  'GARNISH',
  'OTHER',
]);

export type MeasureUnit = z.infer<typeof MeasureUnitSchema>;
