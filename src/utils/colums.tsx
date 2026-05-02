import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, IndianRupee } from "lucide-react";
import { formatDate } from "date-fns";
import { Party } from "@/types/Party";
import { Item } from "@/types/Item";
import { Invoice } from "@/types/Invoice";
import { Ledger } from "@/types/Ledger";
import { Payment } from "@/types/Payment";

export const partyColumn: ColumnDef<Party>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-sm"
      >
        Party Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    id: "amount", // 👈 must exist if you're using row.getValue("amount")
    accessorFn: (row) => row.balance ?? 0,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = row.getValue<number>("amount");

      return <div className={`text-right`}>{amount.toFixed(2)}</div>;
    },
  },
];

export const itemColumn: ColumnDef<Item>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-[14px]"
      >
        Item Name
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-[14px]"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Stock
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="text-end">{row.getValue("stock")}</div>,
  },
];

export const invoiceColumns: ColumnDef<Invoice>[] = [
  // {
  //   accessorKey: "",
  //   header: ({ column }) => (
  //     <Button
  //       variant="ghost"
  //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       className="text-[14px]"
  //     >
  //       Type
  //       <ArrowUpDown className="ml-2 h-1 w-1" />
  //     </Button>
  //   ),
  //   cell: ({ row }) => {
  //     const typeValue = row.getValue("type") as string;
  //     const formatted =
  //       typeValue.charAt(0).toUpperCase() + typeValue.slice(1).toLowerCase();

  //     return <div className="text-center font-semibold">{formatted}</div>;
  //   },
  // },
  {
    accessorKey: "invoiceNumber",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-[14px] "
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Invoice Number
        <ArrowUpDown className="ml-2 h-1 w-1" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center font-semibold">
        {row.getValue("invoiceNumber")}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-[14px]"
      >
        Date
        <ArrowUpDown className="ml-2 h-1 w-1" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center font-semibold">
        {formatDate(new Date(row.getValue("createdAt")), "dd/MM/y")}
      </div>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-[14px]"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total
        <ArrowUpDown className="ml-2 h-1 w-1" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-semibold flex items-center justify-end">
        <IndianRupee size={12} />
        {Math.floor(row.getValue("totalAmount")).toFixed(2)}
      </div>
    ),
  },
  {
    accessorKey: "dueAmount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-[14px]"
      >
        Balance
        <ArrowUpDown className="ml-2 h-1 w-1" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-semibold flex items-center justify-end">
        <IndianRupee size={12} />
        {Math.floor(row.getValue("dueAmount")).toFixed(2)}
      </div>
    ),
  },
];

export const ledgerColumn: ColumnDef<Ledger>[] = [
  {
    accessorKey: "displayName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-sm"
        size={"sm"}
      >
        Account Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const { displayName, accountType } = row.original;
      return (
        <div>
          {displayName} ({accountType})
        </div>
      );
    },
  },
  {
    accessorKey: "balance",
    accessorFn: (row) => row.balance ?? 0,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        size={"sm"}
      >
        Amount
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = row.getValue<number>("balance");

      return (
        <div className={`text-right text-green-600`}>{amount.toFixed(2)}</div>
      );
    },
  },
];

export const trasactionsColumn: ColumnDef<Payment>[] = [
  {
    accessorKey: "type",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-sm"
        size={"sm"}
      >
        Type
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        size={"sm"}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        size={"sm"}
      >
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        {formatDate(new Date(row.getValue("createdAt")), "dd/MM/y")}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        size={"sm"}
      >
        Amount
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = row.getValue<number>("amount");
      const { type } = row.original;
      return (
        <div
          className={`text-center ${type === "Adjustment Decrease" ? "text-red-500" : "text-green-500"}`}
        >
          {amount.toFixed(2)}
        </div>
      );
    },
  },
];
