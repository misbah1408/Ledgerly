import { Payment } from "./Payment";

export interface Ledger {
    ledgerId: number;
    displayName: string;
    storeId: number;
    accountType: "CASH" | "BANK";
    balance: number;
    transactions: Payment[],
}