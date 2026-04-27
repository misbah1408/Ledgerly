"use client";

import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useUser } from "@/context/UserContext";
import { Fullscreen, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function HomePage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, store, stores, isLoading, setStore } = useUser();
  // console.log(user, store, stores);

  async function goFullscreen() {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      // Exit fullscreen
      document.exitFullscreen().catch((err) => {
        console.error(`Error attempting to exit fullscreen: ${err.message}`);
      });
    }
  }
  if(isLoading) {
    return <div className="h-dvh flex items-center justify-center"><Loader2 className="animate-spin"/></div>;
  }
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "15rem",
          "--sidebar-width-mobile": "20rem",
        } as React.CSSProperties
      }
    >
      {/* Root wrapper = 100dvh full app */}
      <div className="flex h-screen w-screen overflow-hidden">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-full">
          {/* Top Bar */}
          <header className="flex justify-between items-center p-4 border-b bg-white shrink-0">
            <SidebarTrigger className="cursor-e-resize" />
            <div className="flex gap-2">
              {/* <Button
                variant="outline"
                onClick={() => router.push("/invoice?title=Sale")}
              >
                + Add Sale
              </Button> */}
              {/* <Button
                variant="outline"
                onClick={() => router.push("/invoice?title=Purchase")}
              >
                + Add Purchase
              </Button> */}
              {/* <Button variant="outline">Reports</Button> */}
              <Select defaultValue={store?.id+""} onValueChange={(val) => {
                const selectedStore= stores?.find(s => s.id === Number(val));
                if(selectedStore){
                  localStorage.setItem("storeId", selectedStore?.id + "");
                  setStore(selectedStore);
                }
              }}>
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select a fruit"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Stores</SelectLabel>
                    {stores?.map((s) => (
                      <SelectItem value={s?.id+""} key={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={goFullscreen}
              >
                <Fullscreen />
              </Button>
            </div>
          </header>

          {/* Page Content → takes rest of the height */}
          <div className="flex-1 overflow-hidden">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
