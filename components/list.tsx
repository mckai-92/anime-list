"use client";

import { Pagination } from "@heroui/pagination";
import React, { useEffect } from "react";
import clsx from "clsx";

import { space } from "./primitives";

import { TableColumnInterface } from "@/types/index";
import { Table } from "@/components/table";
import { Loader } from "@/components/loader";
import { Type } from "@/types/enums";

export const List = ({
  items,
  columns,
  renderTableCell,
  onSelect,
  fetchHook,
  params,
  customProps,
  type,
}: {
  items?: object[];
  columns: TableColumnInterface[];
  renderTableCell?: Function;
  onSelect?: Function;
  fetchHook?: Function;
  params?: object;
  customProps?: object;
  type?: Type;
}) => {
  const [page, setPage] = React.useState(1);
  const { data, pagination, isLoading, error } = fetchHook?.({
    params,
    type,
    page,
    limit: 10,
    customProps,
  });

  useEffect(() => {
    setPage(1);
  }, [params]);

  const _onSelect = (key: any) => {
    onSelect?.(data?.[key]);
  };

  return (
    <>
      <div>{error?.info?.message}</div>
      <div
        className={clsx(
          "overflow-hidden flex flex-col relative",
          space({ type: "gap" }),
        )}
      >
        {pagination?.last_visible_page > 1 ? (
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
          isLoading={isLoading}
          items={data}
          renderCell={renderTableCell}
          onRowAction={_onSelect}
        />
      </div>

      <Loader loading={isLoading} />
    </>
  );
};
