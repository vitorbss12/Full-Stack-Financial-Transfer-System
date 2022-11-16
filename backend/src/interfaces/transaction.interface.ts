/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */

import { z } from 'zod';

export const transactionZodSchema = z.object({
  id: z.number().optional(),
  debitedAccountId: z.number().optional(),
  debitedUsername: z.string({
    required_error: 'debitedUsername is required',
    invalid_type_error: 'debitedUsername must be a string',
  }),
  creditedAccountId: z.number().optional(),
  creditedUsername: z.string({
    required_error: 'creditedUsername is required',
    invalid_type_error: 'creditedUsername must be a string',
  }),
  value: z.number({
    required_error: 'Value is required',
    invalid_type_error: 'Value must be a number',
  }).min(0.01, {
    message: 'Value must be at least 0.01',
  }),
  createdAt: z.string().optional(),
});

export type ITransaction = z.infer<typeof transactionZodSchema>;