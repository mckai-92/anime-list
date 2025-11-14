"use client";

import {
  Table as T,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";

import { TableColumnInterface } from "@/types/index";

export const Table = ({
  items,
  columns,
  renderCell,
  onRowAction,
}: {
  items?: object[];
  columns: TableColumnInterface[];
  renderCell: Function;
  onRowAction?: Function;
}) => {
  return (
    <>
      <T
        isHeaderSticky
        aria-label="Table"
        className="overflow-auto"
        classNames={{
          wrapper: "p-0",
        }}
        selectionMode="single"
        onRowAction={(key) => onRowAction?.(key)}
      >
        <TableHeader>
          {columns.map((column: TableColumnInterface) => (
            <TableColumn allowsSorting>
              {column.label.toUpperCase()}
            </TableColumn>
          ))}
        </TableHeader>

        <TableBody>
          {items!?.map((item: object, index: number) => (
            <TableRow key={index}>
              {columns.map((column: TableColumnInterface) => (
                <TableCell>
                  {renderCell(
                    item[column.field as keyof typeof item],
                    column,
                    item,
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
