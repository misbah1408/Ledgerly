/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Store } from "@/types/Store";
import { User } from "@/types/User";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getStores } from "@/service/storeService";

interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  store: Store | null;
  stores: Store[] | null;
  setStore: (store: Store) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  userData: User | null;
  children: ReactNode;
}

export const AuthProvider = ({ userData, children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(userData);
  const [store, setStore] = useState<Store | null>(null);
  const [stores, setStores] = useState<Store[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const isAuthenticated = !!user;

  const getStore = async () => {
    const storeId = Number(localStorage.getItem("storeId"));
    try {
      const res = await getStores();
      const stores: Store[] = res.data.data;
      setStores(stores);
      if (storeId) {
        const index = stores.findIndex((store) => store.id === storeId);
        setStore(stores[index]);
      } else {
        setStore(res.data.data[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getStore();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const value: UserContextType = {
    user,
    login,
    logout,
    isAuthenticated,
    isLoading,
    store,
    stores,
    setStore,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within AuthProvider");
  return context;
};
