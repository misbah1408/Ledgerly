import z from "zod";

export const ledgerSchema = z.object({
  displayName: z.string().nonempty({error:"Display name is required!!!" }),
  storeId: z.number().int().positive(),
  accountType: z.enum(["CASH", "BANK"]),
  balance: z.number(),
  type: z.enum([
    "OPENING_BALANCE",
    "CREDIT",
    "DEBIT",
    "SALE",
    "PURCHASE",
    "PAYMENT_IN",
    "PAYMENT_OUT",
    "REFUND",
    "ADJUSTMENT_INCREASE",
    "ADJUSTMENT_DECREASE",
  ]).optional(),
});

export type LedgerSchema = z.infer<typeof ledgerSchema>;
