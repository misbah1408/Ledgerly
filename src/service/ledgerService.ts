import api from "@/lib/axios";
import { LedgerAdjustmentSchema } from "@/schema/LedgerAdjustmentSchema";
import { LedgerSchema } from "@/schema/LedgerSchema";

export const createLedger = (payload: LedgerSchema) =>
  api.post("/ledger/create-ledger", payload);

export const getLedgers = (storeId: number) => api.get(`/ledger/${storeId}`);

export const getLedgerEntries = (ledgerId: number) =>
  api.get(`/ledger/transaction/${ledgerId}`);

export const updateLedger = (ledgerId: number, payload: LedgerSchema) =>
  api.put(`/ledger/${ledgerId}`, payload);

export const ledgerAdjustment = (
  ledgerId: number,
  payload: LedgerAdjustmentSchema,
) => api.put(`/update-amount/${ledgerId}`, payload);

export const transferAccountToAccount = (payload: LedgerAdjustmentSchema[]) =>
  api.put(`/ledger/transfer`, payload);
