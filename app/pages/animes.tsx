import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import { Progress } from "@heroui/progress";
import { Tooltip } from "@heroui/tooltip";
import { Card, CardBody, CardFooter } from "@heroui/card";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { useState } from "react";

import { AnimeDetails } from "@/components/anime-details";
import { List } from "@/components/list";
import { useFetchAnimeData } from "@/utils/useFetch";
import { AnimeInterface } from "@/types";

export const Animes = () => {
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
      field: "score",
      label: "Score",
    },
  ];

  const renderCell = (value: any, column: any, row: AnimeInterface) => {
    if (column.field === "title_english") {
      return (
        <div className="flex space-x-4">
          <Tooltip
            className="max-w-100 max-h-160 p-4"
            content={
              <Card>
                <div className="text-bold capitalize text-center text-base p-2">
                  {row.title_english}
                </div>
                <Image
                  alt={row.synopsis}
                  className="object-contain"
                  height={300}
                  src={row.images?.webp?.image_url}
                  width={400}
                />
                <CardBody>
                  <div className="text-bold text-tiny capitalize text-default-400">
                    {row.synopsis}
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="p-2 font-bold text-default-400">
                    <div className="capitalize">{row.duration}</div>
                    <div className="capitalize">{row.rating}</div>
                    <div className="capitalize">{row.score}</div>
                  </div>
                </CardFooter>
              </Card>
            }
            placement="left"
          >
            <Image
              isZoomed
              alt={row.synopsis}
              classNames={{
                img: "min-w-15 max-w-15",
              }}
              src={row.images?.webp?.image_url}
            />
          </Tooltip>

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

    return <>{value}</>;
  };

  const onRowSelected = (record: AnimeInterface) => {
    console.log(record);
    setAnimeRecord(record);
    onOpen();
  };

  return (
    <div className="flex w-full flex-col overflow-hidden">
      <List
        columns={animeColumns}
        fetchHook={useFetchAnimeData}
        renderTableCell={renderCell}
        onSelect={onRowSelected}
      />

      {/*
          <Table 
            columns={animeColumns} 
            renderCell={renderCell} 
            onRowAction={onRowSelected} 
            useAsyncData />
        */}

      <Drawer isOpen={isOpen} size="5xl" onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                {animeRecord?.title_english}
                <div className="text-bold text-tiny capitalize text-default-400">
                  {animeRecord?.title_japanese}
                </div>
              </DrawerHeader>
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
    </div>
  );
};
