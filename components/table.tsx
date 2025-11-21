"use client";

import {
  Table as T,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import clsx from "clsx";

import { space } from "./primitives";

import { TableColumnInterface } from "@/types/index";

export const Table = ({
  items,
  columns,
  renderCell,
  onRowAction,
  isLoading,
}: {
  items?: object[];
  columns: TableColumnInterface[];
  renderCell?: Function;
  onRowAction?: Function;
  isLoading?: boolean;
}) => {
  return (
    <>
      <T
        isHeaderSticky
        aria-label="Table"
        className="overflow-auto"
        classNames={{
          wrapper: space({ type: "padding" }),
        }}
        selectionMode="single"
        onRowAction={(key) => onRowAction?.(key)}
      >
        <TableHeader>
          {columns.map((column: TableColumnInterface, index: number) => (
            <TableColumn key={index} className={column?.class_name}>
              {column.label.toUpperCase()}
            </TableColumn>
          ))}
        </TableHeader>

        <TableBody>
          {items!?.map((item: object, index: number) => (
            <TableRow key={index}>
              {columns.map((column: TableColumnInterface, index: number) => (
                <TableCell
                  key={index}
                  className={clsx(
                    column?.class_name,
                    "px-1 py-1 lg:px-3 lg:py-2",
                  )}
                >
                  {renderCell ? (
                    renderCell(
                      item[column.field as keyof typeof item],
                      column,
                      item,
                    )
                  ) : (
                    <div>{item[column.field as keyof typeof item]}</div>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </T>
    </>
  );
};
