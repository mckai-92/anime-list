"use client";

import { Pagination } from "@heroui/pagination";
import React from "react";

import { TableColumnInterface } from "@/types/index";
import { Table } from "@/components/table";
import { Loader } from "@/components/loader";

export const List = ({
  items,
  columns,
  renderTableCell,
  onSelect,
  fetchHook,
  searchTerms,
}: {
  items?: object[];
  columns: TableColumnInterface[];
  renderTableCell: Function;
  onSelect: Function;
  fetchHook?: Function;
  searchTerms?: object;
}) => {
  const [page, setPage] = React.useState(1);
  const { data, total_pages, isLoading, error } = fetchHook?.(
    searchTerms,
    page,
    10,
  );

  console.log(data);

  const _onSelect = (key: any) => {
    onSelect(data?.data?.[key]);
  };

  return (
    <>
      <div>{error?.info?.message}</div>
      <div className="overflow-hidden flex flex-col relative">
        <Table
          columns={columns}
          items={data?.data}
          renderCell={renderTableCell}
          onRowAction={_onSelect}
        />
        {total_pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={total_pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null}

        <Loader loading={isLoading} />
      </div>
    </>
  );
};
