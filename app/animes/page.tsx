"use client";

import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import { Progress } from "@heroui/progress";
import { Tooltip } from "@heroui/tooltip";
import { Card } from "@heroui/card";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { AnimeDetails } from "@/components/anime-details";
import { List } from "@/components/list";
import { useFetchAnimeSearch } from "@/utils/useFetch";
import { AnimeInterface } from "@/types";
import { EyeIcon } from "@/components/icons";
import SearchFilter from "@/components/search-filter";
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

export default function Animes() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [animeRecord, setAnimeRecord] = useState<AnimeInterface>();

  const animeColumns = [
    {
      field: "title_english",
      label: "Title",
    },
    {
      field: "genres",
      label: "Genres",
    },
    {
      field: "type",
      label: "Type",
    },
    {
      field: "score",
      label: "Score",
    },
    {
      field: "action",
      label: "",
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
      const openDetails = (row: AnimeInterface) => {
        setAnimeRecord(row);
        onOpen();
      };

      return (
        <Tooltip content="Preview">
          <Button
            isIconOnly
            className="text-default-400 cursor-pointer active:opacity-50 bg-transparent"
            onPress={() => {
              openDetails(row);
            }}
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
    console.log(record);
    //setAnimeRecord(record);
    //onOpen()
    router.push(`/anime/${record.mal_id}`);
  };

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

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Perform search action here, e.g.,
      // fetchData(debouncedSearchTerm);
      console.log("Performing search for:", debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]); // Re-run effect when debouncedSearchTerm changes

  const [searchType, setsearchType] = useState<string>("");
  const setType = (event: any) => {
    setsearchType(event.target.value);
  };

  const [searchFilter, setSearchFilter] = useState({});

  return (
    <>
      <Card className="p-4 bg-content1/70">
        <div className="flex w-full flex-col overflow-hidden gap-4">
          <SearchFilter onChange={setSearchFilter} />

          <List
            columns={animeColumns}
            fetchHook={useFetchAnimeSearch}
            renderTableCell={renderCell}
            searchTerms={searchFilter}
            onSelect={onRowSelected}
          />
          {/*
          <Table 
            columns={animeColumns} 
            renderCell={renderCell} 
            onRowAction={onRowSelected} 
            useAsyncData />
        */}
        </div>
      </Card>

      <Drawer
        className="bg-content1/50 backdrop-blur-sm"
        classNames={{
          backdrop: "bg-overlay/80",
        }}
        isOpen={isOpen}
        size="5xl"
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col " />
              <DrawerBody>
                <AnimeDetails id={animeRecord?.mal_id} />
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
