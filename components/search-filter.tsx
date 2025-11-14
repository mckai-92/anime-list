"use client";

import { Select, SelectItem } from "@heroui/select";
import { useEffect, useState } from "react";
import { Input } from "@heroui/input";

import { ArrowDown, ArrowUp, SearchIcon } from "@/components/icons";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { Accordion, AccordionItem } from "@heroui/accordion";

const types = [
  { key: "tv", label: "TV" },
  { key: "movie", label: "Movie" },
  { key: "ova", label: "OVA" },
  { key: "special", label: "Special" },
  { key: "ona", label: "ONA" },
  { key: "music", label: "Music" },
  { key: "cm", label: "CM" },
  { key: "pv", label: "PV" },
  { key: "tv_special", label: "TV Special" },
];
const order_by_types = [
  { key: "mal_id", label: "MAL ID" },
  { key: "title", label: "Title" },
  { key: "start_date", label: "Start Date" },
  { key: "end_date", label: "End Date" },
  { key: "episodes", label: "Episodes" },
  { key: "score", label: "Score" },
  { key: "scored_by", label: "Scored By" },
  { key: "rank", label: "Rank" },
  { key: "popularity", label: "Popularity" },
  { key: "members", label: "Members" },
  { key: "favorites", label: "Favorites" },
];

const SortButton = ({
  direction = "asc",
  onChange,
}: {
  direction?: string;
  onChange?: Function;
}) => {
  const [order, setOrder] = useState(direction === "asc" ? true : false);

  return (
    <Tooltip content={order ? "Ascending" : "Descending"}>
      <Button
        isIconOnly
        onPress={() => {
          setOrder(!order);
          onChange?.(order ? "asc" : "desc");
        }}
      >
        {order ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
      </Button>
    </Tooltip>
  );
};

export default function SearchFilter({ onChange }: { onChange?: Function }) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const handleValueChange = (value: string) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]); // Re-run effect when searchTerm changes

  const [searchType, setsearchType] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string>("");
  const [sort, setSort] = useState<string>("");

  useEffect(() => {
    onChange?.({
      q: debouncedSearchTerm,
      type: searchType,
      order_by: orderBy,
      sort: sort,
    });
  }, [debouncedSearchTerm, searchType, orderBy, sort]); // Re-run effect when these variables change

  return (
    <>
      <Accordion variant="shadow">
        <AccordionItem key="1" aria-label="Filter" title="Filter">
          <Input
            className="max-w-xs"
            label="Filter"
            labelPlacement="outside"
            placeholder="Search by name..."
            startContent={
              <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
            }
            value={searchTerm}
            onValueChange={handleValueChange}
          />

          <Select
            isClearable
            className="max-w-xs"
            label="Type"
            labelPlacement="outside"
            placeholder="Select a type"
            onChange={(e) => {
              setsearchType(e.target.value);
            }}
          >
            {types.map((type) => (
              <SelectItem key={type.key}>{type.label}</SelectItem>
            ))}
          </Select>

          <div className="flex gap-4 items-end">
            <Select
              isClearable
              className="max-w-xs"
              label="Order by"
              labelPlacement="outside"
              placeholder="Select"
              onChange={(e) => {
                setOrderBy(e.target.value);
              }}
            >
              {order_by_types.map((type) => (
                <SelectItem key={type.key}>{type.label}</SelectItem>
              ))}
            </Select>

            <SortButton onChange={setSort} />
          </div>
        </AccordionItem>
      </Accordion>
    </>
  );
}
