"use client";

import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import { Progress } from "@heroui/progress";
import { Tooltip } from "@heroui/tooltip";
import { Card } from "@heroui/card";

import { Button } from "@heroui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

import { List } from "@/components/list";
import { useFetchAnimeSearch } from "@/utils/useFetch";
import { AnimeInterface } from "@/types";
import { EyeIcon } from "@/components/icons";
import SearchFilter from "@/components/search-filter";
import { title } from "@/components/primitives";
import { Type } from "@/types/enums";
import { Link } from "@heroui/link";

export const AnimeList = () => {
  const animeColumns = [
    {
      field: "title_english",
      label: "Title",
      class_name: "",
    },
    {
      field: "genres",
      label: "Genres",
      class_name: "max-md:hidden",
    },
    {
      field: "type",
      label: "Type",
      class_name: "max-sm:hidden",
    },
    {
      field: "score",
      label: "Score",
      class_name: "max-sm:hidden",
    },
    {
      field: "action",
      label: "",
      class_name: "",
    },
  ];

  const renderCell = (value: any, column: any, row: AnimeInterface) => {
    if (column.field === "title_english") {
      return (
        <div className="flex space-x-4">
          <Image
            alt={row.synopsis}
            classNames={{
              img: "min-w-15 max-w-15",
            }}
            src={row.images?.webp?.image_url}
          />

          <div>
            <div className="text-bold text-small capitalize">
              {row.title_english}
            </div>
            <div className="text-bold text-tiny capitalize text-default-400 line-clamp-3">
              {row.synopsis}
            </div>
          </div>
        </div>
      );
    }

    if (column.field === "genres") {
      return (
        <div className="space-x-1 space-y-1">
          {row.genres?.map((genre, index) => (
            <Chip key={index} size="sm">
              {genre.name}
            </Chip>
          ))}
        </div>
      );
    }

    if (column.field === "score") {
      return (
        <div className="text-center">
          {value}
          <Progress aria-label="Score" size="sm" value={value * 10} />
        </div>
      );
    }

    if (column.field === "action") {
      return (
        <Tooltip content="Open anime details">
          <Button
            isIconOnly
            className="text-default-400 cursor-pointer active:opacity-50 bg-transparent"
            as={Link}
            href={`/${Type.Anime}/${row.mal_id}`}
          >
            <EyeIcon />
          </Button>
        </Tooltip>
      );
    }

    return <>{value}</>;
  };

  const router = useRouter();

  const onRowSelected = (record: AnimeInterface) => {
    router.push(`/${Type.Anime}/${record.mal_id}`);
  };

  const [searchFilter, setSearchFilter] = useState({});

  return (
    <>
      <div>
        <div className="flex flex-wrap items-center justify-between gap-1 md:gap-4 leading-none my-2">
          <span className={title()}>Animes</span>

          <span>
            <SearchFilter type={Type.Anime} onChange={setSearchFilter} />
          </span>
        </div>

        <Card className="p-4 bg-content1/70">
          <List
            columns={animeColumns}
            fetchHook={useFetchAnimeSearch}
            renderTableCell={renderCell}
            searchTerms={searchFilter}
            onSelect={onRowSelected}
          />
        </Card>
      </div>
    </>
  );
};
