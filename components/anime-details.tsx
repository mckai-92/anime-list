"use client";

import { Image } from "@heroui/image";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { Card, CardFooter, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useEffect } from "react";
import { useContext } from "react";
import { Tooltip } from "@heroui/tooltip";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/modal";
import clsx from "clsx";
import { Tab, Tabs } from "@heroui/tabs";

import { Loader } from "./loader";
import { CharacterIcon, PhotoIcon, PlayIcon, TvIcon } from "./icons";
import { DisplayCard } from "./display-card";
import { Photos } from "./photos";

import { BackgroundImageContext } from "@/components/background-image-context";
import { title, subtitle } from "@/components/primitives";
import { AnimeInterface } from "@/types";
import {
  useFetchAnimeRecord,
  useFetchAnimeCharacters,
  useFetchAnimeImages,
} from "@/utils/useFetch";
import { Type } from "@/types/enums";

const Row = ({ label, value }: { label: string; value: any }) => {
  return (
    <div>
      <span className="text-default-500">{label}: </span>
      &nbsp;
      <span>{value}</span>
    </div>
  );
};

export const AnimeDetails = ({ id }: { id: number | undefined }) => {
  const {
    data,
    isLoading,
    error,
  }: {
    data: AnimeInterface;
    isLoading: boolean;
    error: object;
  } = useFetchAnimeRecord(id);

  const { data: characterData } = useFetchAnimeCharacters(id);
  const { data: picturesData } = useFetchAnimeImages(id);

  console.log(characterData);
  console.log(picturesData);
  console.log(data);

  const { setValue: setBackgroundImage } = useContext(BackgroundImageContext);

  useEffect(() => {
    setBackgroundImage(data?.images?.webp?.image_url);
  }, [data?.images?.webp?.image_url]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-1 md:gap-4 leading-none">
        <span className={title()}>{data?.title_english}</span>

        <div className="flex justify-between items-center flex-grow">
          <Chip
            classNames={{
              base: "bg-content1/70 shadow-lg",
              content: "flex flex-row items-center gap-2 text-default-600",
            }}
            size="lg"
          >
            <TvIcon />
            <span className="text-small">Anime</span>
          </Chip>

          <Tooltip content="Score">
            <Chip color="secondary" size="lg">
              {data?.score}
            </Chip>
          </Tooltip>
        </div>
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

            <div className="flex flex-grow text-small">
              <div className="text-small text-default-400 flex-grow">
                <Row label="Episodes" value={data?.episodes} />
                <Row label="Duration" value={data?.duration} />
                <Row label="Source" value={data?.source} />
                <Row label="Status" value={data?.status} />
                <Row label="Type" value={data?.type} />
                <Row label="Year" value={data?.year} />
                <Row label="Score" value={data?.score} />
                <Row label="Rank" value={data?.rank} />
                <Row label="Rating" value={data?.rating} />

                <div>
                  {data?.genres?.map((genre, index) => (
                    <Chip key={index} size="sm">
                      {genre.name}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="text-right text-default-500">
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

            {data?.trailer?.embed_url ? (
              <>
                <Divider className="hidden md:block" orientation="vertical" />

                <Card className="overflow-hidden relative self-center md:self-start">
                  <iframe
                    height={200}
                    src={data?.trailer?.embed_url}
                    title="Trailer"
                    width={300}
                  />

                  <div
                    className="group hover:backdrop-blur-[7px] hover:text-default-700 transition-all duration-300
                        flex flex-col absolute top-0 left-0 right-0 bottom-0 items-center justify-center
                        cursor-pointer text-default-500 text-lg rounded-large
                        bg-content1/70 backdrop-blur-[3px]"
                    role="button"
                    tabIndex={0}
                    onClick={onOpen}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        onOpen();
                      }
                    }}
                  >
                    <span>TRAILER</span>
                    <PlayIcon
                      className="transition-all duration-300"
                      size={"50%"}
                    />
                  </div>

                  <Modal
                    backdrop="blur"
                    isOpen={isOpen}
                    placement="center"
                    size="5xl"
                    onOpenChange={onOpenChange}
                  >
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1">
                            Trailer
                          </ModalHeader>
                          <ModalBody>
                            <iframe
                              className="h-[50vh]"
                              src={data?.trailer?.embed_url}
                              title="Trailer"
                            />
                          </ModalBody>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </Card>
              </>
            ) : null}
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
                        type={Type.Characters}
                        url={`/${Type.Characters}/${item.character.mal_id}`}
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
                    <Photos id={data?.mal_id} type="anime" />
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
