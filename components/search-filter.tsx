"use client";

import { Select, SelectItem } from "@heroui/select";
import { useEffect, useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";

import { ArrowDown, ArrowUp, SearchIcon } from "@/components/icons";
import { data } from "@/config/data";

const SortButton = ({
  direction,
  onChange,
}: {
  direction?: string;
  onChange?: Function;
}) => {
  const [order, setOrder] = useState(direction === "asc" ? true : false);

  useEffect(() => {
    onChange?.(order ? "asc" : "desc");
  }, [order]);

  return (
    <Tooltip content={order ? "Ascending" : "Descending"}>
      <Button
        isIconOnly
        onPress={() => {
          setOrder(!order);
        }}
      >
        {order ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
      </Button>
    </Tooltip>
  );
};

export default function SearchFilter({ onChange }: { onChange?: Function }) {
  /**
   * @prop searchTerm is string that is bound to input field
   * @prop debouncedSearchTerm is populated after delay and is used in filter
   */
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
  const [sort, setSort] = useState<string>("desc");

  useEffect(() => {
    onChange?.({
      q: debouncedSearchTerm,
      type: searchType,
      order_by: orderBy,
      sort: sort && orderBy ? sort : "",
    });
  }, [debouncedSearchTerm, searchType, orderBy, sort]); // Re-run effect when these variables change

  const clearFilters = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setsearchType("");
    setOrderBy("");
    setSort("desc");
  };

  return (
    <>
      <Popover backdrop="opaque">
        <PopoverTrigger>
          <Button className="self-end" color="primary">
            Filter...
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-4 pt-4 pb-4">
            <Input
              className="max-w-xs"
              label="Name"
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
              placeholder="Select"
              selectedKeys={[searchType]}
              onChange={(e) => {
                setsearchType(e.target.value);
              }}
            >
              {data.animeTypes.map((type) => (
                <SelectItem key={type.key}>{type.label}</SelectItem>
              ))}
            </Select>

            <div className="flex gap-4 items-end flex-grow">
              <Select
                isClearable
                className="max-w-xs"
                label="Order by"
                labelPlacement="outside"
                placeholder="Select"
                selectedKeys={[orderBy]}
                onChange={(e) => {
                  setOrderBy(e.target.value);
                }}
              >
                {data.animeOrderBy.map((type) => (
                  <SelectItem key={type.key}>{type.label}</SelectItem>
                ))}
              </Select>

              <SortButton direction={sort} onChange={setSort} />
            </div>

            <Button onPress={clearFilters}>Clear Filters</Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
