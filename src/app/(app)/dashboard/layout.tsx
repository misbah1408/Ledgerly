'use client';

import { useEffect, useState } from "react";
import { getUser } from "@/service/authService";
import HomePage from "@/components/HomePage";
import { AuthProvider } from "@/context/UserContext";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getUser();
        setUser(res.data.data);
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) {
    return <div className="h-dvh flex items-center justify-center"><Loader2 className="animate-spin"/></div>;
  }

  return (
    <AuthProvider userData={user}>
      <HomePage>{children}</HomePage>
    </AuthProvider>
  );
}