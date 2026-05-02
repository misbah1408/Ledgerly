"use client";

import { getLedgerEntries } from "@/service/ledgerService";
import { Ledger } from "@/types/Ledger";
import { EllipsisVertical} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import { trasactionsColumn } from "@/utils/colums";
import { Payment } from "@/types/Payment";

interface LedgerTransactionsProps {
  ledger: Ledger;
}
export default function LedgerTransactions({
  ledger,
}: LedgerTransactionsProps) {
  const [trasactions, setTrasactions] = useState<Payment[]>([]);
  const [trasaction, setTrasaction] = useState<Payment>();
  const [sorting, setSorting] = useState<SortingState>([]);
  // const [filter, setFilter] = useState("");

  const fetchTransactions = async () => {
    if (!ledger) return;

    try {
      const res = await getLedgerEntries(ledger?.ledgerId);
      setTrasactions(res.data.data)
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredData = useMemo(() => {
    if (!ledger) return [];
    // if (!filter.trim()) return trasactions;
    return trasactions?.filter((item) => item);
  }, [trasactions, ledger]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: filteredData,
    columns: trasactionsColumn,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleRowClick = useCallback(
    (rowPayment: Payment) => {
      setTrasaction(rowPayment);
    },
    [setTrasaction],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTableRowElement>, rowItem: Payment) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setTrasaction(rowItem);
      }
    },
    [setTrasaction],
  );

  useEffect(() => {
    function fn() {
      fetchTransactions();
    }
    if (ledger) {
      fn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ledger]);
  return (
    <div className="overflow-scroll w-full">
      <div className="rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-4 py-2 text-center bg-white sticky top-0 z-10"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
                <TableHead></TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel()?.rows?.length !== 0 ? (
              table?.getRowModel()?.rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={`border-t cursor-pointer hover:bg-blue-50 transition-colors ${
                    row.original.id === trasaction?.id
                      ? "bg-blue-100 border-blue-200"
                      : ""
                  }`}
                  onClick={() => handleRowClick(row.original)}
                  onKeyDown={(e) => handleKeyDown(e, row.original)}
                  tabIndex={0}
                  role="button"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Menubar className="p-0 m-0 h-fit w-fit bg-transparent border-0 shadow-none data-[state==open]:bg-transparent">
                      <MenubarMenu>
                        <MenubarTrigger className="p-0 bg-transparent data-[state=open]:bg-transparent">
                          <EllipsisVertical className="outline-0 border-0 data-[state=open]:bg-transparent bg-transparent" />
                        </MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem>View/Edit</MenubarItem>
                          <MenubarItem>Delete</MenubarItem>
                          <MenubarItem>Print</MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>
                    </Menubar>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  {filteredData ? "No Data match your search." : "No Data found."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
