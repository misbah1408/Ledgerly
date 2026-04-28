import api from "@/lib/axios";
import { PartySchema } from "@/schema/PartySchema";

export const addCustomer = (data: PartySchema) => 
    api.post("/customers", data)

export const updateCustomer = (data: PartySchema, customerId: number) => 
    api.put(`/customers/${customerId}`, data)

export const getCustomers = (storeId: number) => 
    api.get(`/customers/store/${storeId}`)