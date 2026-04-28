import z from "zod";

export const partySchema = z.object({
  name: z.string().nonempty("Party Name is required!!"),
  phone: z.coerce.number(),
  email: z.string().optional(),
  balance: z.coerce.number().optional(),
  address: z.string().optional(),
  storeId: z.number(),
});

export type PartySchema = z.infer<typeof partySchema>