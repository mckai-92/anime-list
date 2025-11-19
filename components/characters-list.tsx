"use client";

import { Image } from "@heroui/image";
import { Tooltip } from "@heroui/tooltip";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

import { List } from "@/components/list";
import { useFetchCharactersSearch } from "@/utils/useFetch";
import { CharacterInterface } from "@/types";
import { EyeIcon } from "@/components/icons";
import SearchFilter from "@/components/search-filter";
import { title } from "@/components/primitives";
import { Type } from "@/types/enums";
import { Link } from "@heroui/link";

export const CharactersList = () => {
  const characterColumns = [
    {
      field: "name",
      label: "Name",
      class_name: "",
    },
    {
      field: "action",
      label: "",
      class_name: "",
    },
  ];

  const renderCell = (value: any, column: any, row: CharacterInterface) => {
    if (column.field === "name") {
      return (
        <div className="flex space-x-4">
          <Image
            alt={row.name}
            classNames={{
              img: "min-w-15 max-w-15",
            }}
            src={row.images?.webp?.image_url}
          />

          <div>
            <div className="text-bold text-small capitalize">{row.name}</div>
            <div className="text-bold text-tiny capitalize text-default-400 line-clamp-3">
              {row.about}
            </div>
          </div>
        </div>
      );
    }

    if (column.field === "action") {
      return (
        <Tooltip content="Open character details">
          <Button
            isIconOnly
            className="text-default-400 cursor-pointer active:opacity-50 bg-transparent"
            as={Link}
            href={`/${Type.Characters}/${row.mal_id}`}
          >
            <EyeIcon />
          </Button>
        </Tooltip>
      );
    }

    return <>{value}</>;
  };

  const router = useRouter();

  const onRowSelected = (record: CharacterInterface) => {
    router.push(`/${Type.Characters}/${record.mal_id}`);
  };

  const [searchFilter, setSearchFilter] = useState({});

  return (
    <>
      <div>
        <div className="flex flex-wrap items-center justify-between gap-1 md:gap-4 leading-none my-2">
          <span className={title()}>Characters</span>

          <span>
            <SearchFilter type={Type.Characters} onChange={setSearchFilter} />
          </span>
        </div>

        <Card className="p-4 bg-content1/70">
          <List
            columns={characterColumns}
            fetchHook={useFetchCharactersSearch}
            renderTableCell={renderCell}
            searchTerms={searchFilter}
            onSelect={onRowSelected}
          />
        </Card>
      </div>
    </>
  );
};
