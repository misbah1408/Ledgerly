import api from "@/lib/axios";
import { LoginUser } from "@/schema/LoginSchema";
import { RegisterUser } from "@/schema/RegisterSchema";

export const getUser = () => api.get("/me");

export const register = (data: RegisterUser) =>
  api.post("/auth/register-with-store", data);

export const login = (data: LoginUser) => 
  api.post("/auth/login", data);
