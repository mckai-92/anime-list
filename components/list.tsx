"use client";

import { Pagination } from "@heroui/pagination";
import React, { useEffect } from "react";

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
  const { data, pagination, isLoading, error } = fetchHook?.(
    searchTerms,
    page,
    10
  );

  useEffect(() => {
    setPage(1);
  }, [searchTerms]);

  const _onSelect = (key: any) => {
    onSelect(data?.[key]);
  };

  return (
    <>
      <div>{error?.info?.message}</div>
      <div className="overflow-hidden flex flex-col relative gap-4">
        {pagination?.last_visible_page > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pagination?.last_visible_page}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null}

        <Table
          columns={columns}
          items={data}
          renderCell={renderTableCell}
          onRowAction={_onSelect}
        />

        <Loader loading={isLoading} />
      </div>
    </>
  );
};
