import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, 
});

// Request interceptor
api.interceptors.request.use((config) => {
  if (config.url?.startsWith("/auth/")) {
    return config;
  }

  const token = typeof window !== "undefined" 
    ? localStorage.getItem("token") 
    : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor
api.interceptors.response.use(
  (res) => res,
  (error) => {
    // Global error handling
    if (error.response?.status === 401) {
      console.log("Unauthorized");
    }
    return Promise.reject(error);
  }
);

export default api;