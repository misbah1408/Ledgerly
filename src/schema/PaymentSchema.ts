import z from "zod";

export const paymentSchema = z.object({
  invoiceId: z.number().optional(),
  ledgerId: z.number(),
  type: z.enum(["ADJUSTMENT_INCREASE", "ADJUSTMENT_DECREASE"]),
  amount: z
    .number()
    .nonnegative()
    .min(1, { error: "Amount cannot be left empty." }),
  method: z.string().optional(),
  transactionId: z.string().optional(),
  createdAt: z.date(),
});

export type PaymentSchema = z.infer<typeof paymentSchema>;
