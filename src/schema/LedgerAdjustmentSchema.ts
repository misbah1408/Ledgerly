import z from "zod";

export const ledgerAdjustmentSchema = z.object({
  displayName: z.string(),
  ledgerId: z
    .number({ message: "Ledger id is required!!!" })
    .int()
    .nonnegative(),
  type: z.enum(["ADJUSTMENT_INCREASE", "ADJUSTMENT_DECREASE"]),
  amount: z.number().nonnegative().min(1, {error:"Amount cannot be left empty."}),
  createdAt: z.date(),
});

export type LedgerAdjustmentSchema = z.infer<typeof ledgerAdjustmentSchema>;
