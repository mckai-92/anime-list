"use client";

import { Image } from "@heroui/image";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useEffect } from "react";
import { useContext } from "react";
import clsx from "clsx";
import { Tooltip } from "@heroui/tooltip";
import { Tab, Tabs } from "@heroui/tabs";

import { Loader } from "./loader";
import { CharacterIcon, MangaIcon, PhotoIcon } from "./icons";
import { DisplayCard } from "./display-card";
import { Photos } from "./photos";

import { BackgroundImageContext } from "@/components/background-image-context";
import { title, subtitle } from "@/components/primitives";
import { MangaInterface, CharacterInterface } from "@/types";
import {
  useFetchMangaRecord,
  useFetchMangaCharactersRecord,
} from "@/utils/useFetch";

const Row = ({ label, value }: { label: string; value: any }) => {
  return (
    <div>
      <span className="text-default-500">{label}: </span>
      &nbsp;
      <span>{value}</span>
    </div>
  );
};

const Character = ({
  character,
}: {
  character: {
    character: CharacterInterface;
    role: string;
  };
}) => {
  return (
    <div>
      <Card
        isPressable
        as={Link}
        href={`/character/${character?.character?.mal_id}`}
      >
        <CardHeader className="absolute top-1 left-1 flex-col items-start p-0">
          <Chip
            color={character?.role === "Main" ? "primary" : "default"}
            size="sm"
          >
            {character?.role}
          </Chip>
        </CardHeader>
        <CardBody className="overflow-visible p-0">
          <Image
            isZoomed
            alt={character?.character?.name}
            className="w-full object-cover z-0"
            height={200}
            src={character?.character?.images?.webp?.image_url}
            width="100%"
          />
        </CardBody>
        <CardFooter className="">
          <span className="text-small">{character?.character?.name}</span>
        </CardFooter>
      </Card>
    </div>
  );
};

export const MangaDetails = ({ id }: { id: number | undefined }) => {
  const {
    data,
    isLoading,
    error,
  }: {
    data: MangaInterface;
    isLoading: boolean;
    error: object;
  } = useFetchMangaRecord(id);

  const { data: characterData } = useFetchMangaCharactersRecord(id);

  console.log(data);

  const { setValue: setBackgroundImage } = useContext(BackgroundImageContext);

  useEffect(() => {
    setBackgroundImage(data?.images?.webp?.image_url);
  }, [data?.images?.webp?.image_url]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className={title()}>
            {data?.title_english || data?.title_japanese}
          </span>
          <Chip
            classNames={{
              base: "bg-content1/70 shadow-lg",
              content: "flex flex-row items-center gap-2 text-default-600",
            }}
            size="lg"
          >
            <MangaIcon />
            <span className="text-small">Manga</span>
          </Chip>
        </div>
        <Tooltip content="Score">
          <Chip color="secondary" size="lg">
            {data?.score}
          </Chip>
        </Tooltip>
      </div>
      <div className={clsx(subtitle({ color: "grey" }))}>
        {data?.title_japanese}
      </div>

      <Card className="p-4 bg-content1/70">
        <div className="relative grid gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Card
              isFooterBlurred
              className="w-full h-[300px] md:w-[225px] md:h-[325px]"
            >
              <CardHeader className="absolute z-10 top-1 flex-col items-start" />
              <Image
                removeWrapper
                alt={data?.synopsis}
                className="z-0 w-full h-full object-cover"
                height={400}
                src={data?.images?.webp?.image_url}
              />
              <CardFooter className="absolute bg-content1/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="grow" />
                <Button
                  isExternal
                  showAnchorIcon
                  as={Link}
                  href={data?.external?.[0]?.url}
                  radius="full"
                  size="sm"
                >
                  {data?.external?.[0]?.name}
                </Button>
              </CardFooter>
            </Card>

            <Divider className="hidden md:block" orientation="vertical" />

            <div className="text-small text-default-400">
              <Row label="Chapters" value={data?.chapters} />
              <Row label="Volumns" value={data?.volumes} />
              <Row label="Status" value={data?.status} />
              <Row label="Type" value={data?.type} />
              <Row label="Score" value={data?.score} />
              <Row label="Rank" value={data?.rank} />

              <div>
                {data?.genres?.map((genre, index) => (
                  <Chip key={index} size="sm">
                    {genre.name}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="flex-grow text-right text-default-500">
              External links
              {data?.external?.map((entry, index) => (
                <div key={index}>
                  <Link isExternal href={entry.url} size="sm">
                    {entry.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <Divider />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <span className={subtitle()}>Synopsis</span>
              <Card className="p-4 bg-background/40">
                <div className="text-small text-default-500 whitespace-break-spaces">
                  {data?.synopsis}
                </div>
              </Card>
            </div>

            {data?.background ? (
              <>
                <div>
                  <span className={subtitle()}>Background</span>
                  <Card className="p-4 bg-background/40">
                    <div className="text-small text-default-500 whitespace-break-spaces">
                      {data?.background}
                    </div>
                  </Card>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>

          <div>
            <Tabs
              classNames={{
                base: "w-full",
                tabList: "flex-wrap sm:flex-nowrap w-full md:w-auto",
              }}
              size="lg"
            >
              <Tab
                title={
                  <div className="flex items-center space-x-2">
                    <CharacterIcon />
                    <span>Characters</span>
                  </div>
                }
              >
                <div>
                  <Card className="p-4 bg-background/40 gap-4 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))]">
                    {characterData?.map((item: any) => (
                      <DisplayCard
                        key={item.character.mal_id}
                        id={item.character.mal_id}
                        image={item.character.images.webp.image_url}
                        name={item.character.name}
                        role={item.role}
                        type="character"
                        url={`/character/${item.character.mal_id}`}
                      />
                    ))}
                  </Card>
                </div>
              </Tab>
              <Tab
                title={
                  <div className="flex items-center space-x-2">
                    <PhotoIcon />
                    <span>Photos</span>
                  </div>
                }
              >
                <div>
                  <Card className="p-4 bg-background/40">
                    <Photos id={data?.mal_id} type="manga" />
                  </Card>
                </div>
              </Tab>
            </Tabs>
          </div>

          <Loader loading={isLoading} />
        </div>
      </Card>
    </div>
  );
};
