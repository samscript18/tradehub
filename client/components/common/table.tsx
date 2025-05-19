"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { PiEmpty } from "react-icons/pi";
import Loader from "./loaders";

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  emptyText?: string;
  rowOnClick?: (row: TData) => void;
}

export default function TableComponent<TData, TValue>({
  data,
  columns,
  isLoading,
  emptyText,
  rowOnClick,
}: TableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    enableGlobalFilter: true,
  });

  const toggleRowExpansion = (rowId: string) => {
    setExpandedRows((prev) => ({ ...prev, [rowId]: !prev[rowId] }));
  };

  return (
    <div className="w-full pb-2 overflow-x-auto show_scroll">
      {isMobile ? (
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center text-center py-5">
              <div className="space-y-4">
                <div className="grid place-content-center">
                  <Loader />
                </div>
                <p className="dark:text-zinc-400">Loading...</p>
              </div>
            </div>
          ) : data && data.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <div
                key={row.id}
                className="border border-primary-base/10 rounded-lg overflow-hidden"
              >
                <div
                  className="p-4 bg-gray-100 dark:bg-zinc-800 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleRowExpansion(row.id)}
                >
                  <span className="font-medium">
                    {row.getVisibleCells()[0].getValue() as string}
                  </span>
                  {expandedRows[row.id] ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
                {expandedRows[row.id] && (
                  <div className="p-4 space-y-2">
                    {row
                      .getVisibleCells()
                      .slice(1)
                      .map((cell, index) => (
                        <div key={cell.id} className="flex justify-between">
                          <span className="font-medium">
                            {columns[index + 1].header as string}:
                          </span>
                          <span>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-10 flex items-center justify-center">
              <div className="space-y-4 dark:text-zinc-400">
                <div className="grid place-content-center">
                  <PiEmpty size={50} />
                </div>
                <p>{emptyText || "No orders found."}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <table className="w-full">
          <thead className="w-full dark:bg-[#32353c] bg-gray-300 backdrop-blur-md rounded flex font-light">
            {table.getHeaderGroups()?.map((headerGroup) => (
              <tr className="flex w-full" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="flex items-center justify-center p-4 w-[100%]"
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      width:
                        header.getSize() !== 150 ? header.getSize() : undefined,
                    }}
                  >
                    <span className="flex-shrink-0">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="w-full">
            {isLoading ? (
              <div className="flex items-center justify-center text-center py-5">
                <div className="space-y-4">
                  <div className="grid place-content-center">
                    <Loader />
                  </div>
                  <p className="dark:text-zinc-400">Loading...</p>
                </div>
              </div>
            ) : (
              <>
                {data && data.length > 0 ? (
                  <div className="divide-y divide-primary-base/10">
                    {table.getRowModel().rows.map((row) => (
                      <tr
                        className={`flex transition-colors group duration-200 dark:hover:bg-zinc-800/60 hover:bg-zinc-gray-200 group ${
                          rowOnClick ? "cursor-pointer" : ""
                        }`}
                        onClick={() => rowOnClick?.(row.original)}
                        key={row.id}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            className="p-4 text-small flex items-center justify-center dark:text-gray-200 w-[100%]"
                            key={cell.id}
                            style={{
                              width:
                                cell.column.getSize() !== 150
                                  ? cell.column.getSize()
                                  : undefined,
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 flex items-center justify-center">
                    <div className="space-y-4 dark:text-zinc-400">
                      <div className="grid place-content-center">
                        <PiEmpty size={50} />
                      </div>
                      <p>{emptyText || "No orders found."}</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </tbody>
        </table>
      )}
      {data && data.length > 0 && (
        <div className="flex my-4 items-center justify-center gap-4">
          <button
            className="size-8 text-primary rounded-full flex items-center justify-center border border-primary/20 disabled:opacity-20 duration-200 hover:bg-primary hover:text-black"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowLeft />
          </button>
          <span className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <button
            className="size-8 text-primary rounded-full flex items-center justify-center border border-primary/20 disabled:opacity-20 duration-200 hover:bg-primary hover:text-black"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ArrowRight />
          </button>
        </div>
      )}
    </div>
  );
}
