import api from "@/lib/axios";

export const getStore = (storeId: number) => 
    api.get(`/store/${storeId}`);

export const getStores = () => 
    api.get("/store");