import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  Home,
  Users,
  ShoppingCart,
  FileText,
  ChevronDown,
  Handbag,
  Plus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AppSidebar() {
  const { open, toggleSidebar } = useSidebar();
  const router = useRouter();
  // console.log(user);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="overflow-hidden">
        <SidebarGroup>
          {open ? (
            <SidebarGroupLabel className="text-center text-2xl mb-3 text-black font-semibold">
              Ledgerly
            </SidebarGroupLabel>
          ) : (
            <Image
              src={"/logo.png"}
              alt="logo"
              width={24}
              height={24}
              className="m-auto mb-2.5 mt-2"
              onClick={() => toggleSidebar()}
            />
          )}

          <SidebarMenu>
            {/* Home */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="text-[16px]">
                <Link href="/dashboard">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Parties (collapsible) */}
            <Collapsible className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="text-[16px]">
                    <Users className="mr-2 h-4 w-4" />
                    Parties
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton asChild className="text-[16px]">
                        <Link href="/dashboard/party-details">
                          Party Details
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton asChild className="text-[16px]">
                        <a href="#">Whatsapp Connect</a>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            {/* items */}
            <Collapsible className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="text-[16px]">
                    <Link href={"/dashboard/items?new=false"}>
                      <Handbag className="mr-2 h-4 w-4" />
                    </Link>
                    <Link href={"/dashboard/items?new=false"}>Items</Link>
                    <Plus
                      className="ml-auto transition-transform"
                      onClick={() => router.push("/dashboard/items?new=true")}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>
            </Collapsible>

            {/* Items Sales (collapsible) */}
            <Collapsible className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="text-[16px]">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Parchase & Expense
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {["Option 1", "Option 2", "Option 3", "Option 4"].map(
                      (opt) => (
                        <SidebarMenuSubItem key={opt}>
                          <SidebarMenuButton asChild className="text-[16px]">
                            <a href="#">{opt}</a>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      ),
                    )}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            {/* cash & bank */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="text-[16px]">
                <Link href="/dashboard/ledger">
                  <Home className="mr-2 h-4 w-4" />
                  Cash & Bank
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Purchases & Expenses */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="text-[16px]">
                <a href="#">
                  <FileText className="mr-2 h-4 w-4" />
                  Purchases & Expenses
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer Profile */}
      <SidebarFooter className="py-1">
        <Link href={"/dashboard/profile"}>
          <div
            className={`w-full flex items-center border-t ${
              open ? "p-3" : "py-1"
            } hover:bg-gray-100 cursor-pointer`}
          ></div>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
