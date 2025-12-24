import * as z from 'zod';

export const TransactionIsolationLevelSchema = z.enum(['ReadCommitted', 'Serializable'])

export type TransactionIsolationLevel = z.infer<typeof TransactionIsolationLevelSchema>;