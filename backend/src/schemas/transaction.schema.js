import { z } from 'zod';

export const transactionCreateSchema = z.object({
  title: z.string().min(1),
  amount: z.number(),
  type: z.enum(['income', 'expense']),
  category: z.string().min(1),
  date: z.string().refine((v) => !isNaN(Date.parse(v)), 'Invalid date')
});

export const transactionUpdateSchema = transactionCreateSchema.partial();
