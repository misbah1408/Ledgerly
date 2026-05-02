import z from "zod";

import { ledgerAdjustmentSchema } from "./LedgerAdjustmentSchema";

export const transferSchema = z.object({
  from: ledgerAdjustmentSchema,
  to: ledgerAdjustmentSchema,
});

export type TransferSchema = z.infer<typeof transferSchema>;
