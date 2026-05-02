import React, { useCallback, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { ledgerColumn } from "@/utils/colums";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Ledger } from "@/types/Ledger";

interface LedgerListProps {
  data: Ledger[];
  setLedger: (v: Ledger) => void;
  ledger: Ledger;
}
const LedgerList: React.FC<LedgerListProps> = ({ data, setLedger, ledger }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filter, setFilter] = useState("");

  const filteredData = React.useMemo(() => {
    if (!filter.trim()) return data;
    return data.filter((item) =>
      item.displayName.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [filter, data]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: filteredData,
    columns: ledgerColumn,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleRowClick = useCallback(
    (rowLedger: Ledger) => {
      setLedger(rowLedger);
    },
    [setLedger],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTableRowElement>, rowLedger: Ledger) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setLedger(rowLedger);
      }
    },
    [setLedger],
  );

  return (
    <div className="">
      {/* Search bar */}
      <div className="mb-4">
        <Input
          placeholder="Filter by account name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
          aria-label="Filter parties by name"
        />
        {filteredData.length !== data.length && (
          <p className="mt-1 text-sm text-gray-600">
            Showing {filteredData.length} of {data.length} accounts
          </p>
        )}
      </div>

      {/* Table */}
      <div className="border-b border-t overflow-scroll no-scrollbar">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-2 py-2 text-left">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={`border-t cursor-pointer hover:bg-blue-50 transition-colors ${
                    row.original.ledgerId === ledger.ledgerId
                      ? "bg-blue-100 border-blue-200"
                      : ""
                  }`}
                  onClick={() => {
                    handleRowClick(row.original);
                  }}
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
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  {filter
                    ? "No parties match your search."
                    : "No parties found."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LedgerList;

// import { Ledger } from '@/schema/Ledger'
// import React from 'react'

// export default function LedgerList({data, ledger, setLedger}: LedgerListProps) {
//   return (
//     <div>LedgerList</div>
//   )
// }
