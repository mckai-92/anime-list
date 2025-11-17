"use client";

import { Image } from "@heroui/image";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Link } from "@heroui/link";
import { Tabs, Tab } from "@heroui/tabs";
import { useEffect } from "react";
import { useContext } from "react";
import clsx from "clsx";
import { Url } from "next/dist/shared/lib/router/router";

import { Loader } from "./loader";
import { DisplayCard } from "./display-card";
import { Photos } from "./photos";

import { CharacterInterface } from "@/types";
import {
  useFetchCharacterImages,
  useFetchCharacterRecord,
} from "@/utils/useFetch";
import { BackgroundImageContext } from "@/components/background-image-context";
import { title, subtitle, itemsGrid } from "@/components/primitives";
import {
  TvIcon,
  MangaIcon,
  PhotoIcon,
  CharacterIcon,
} from "@/components/icons";
import { Type } from "@/types/enums";

const CustomCard = ({
  role,
  title,
  image_url,
  href,
}: {
  role: string;
  title: string;
  image_url: string;
  href: Url;
}) => {
  return (
    <Card isPressable as={Link} className="w-[200px]" href={href}>
      <CardHeader className="absolute top-1 left-1 flex-col items-start p-0">
        <Chip color={role === "Main" ? "primary" : "default"} size="sm">
          {role}
        </Chip>
      </CardHeader>
      <CardBody className="overflow-visible p-0">
        <Image
          isZoomed
          alt={title}
          className="w-full object-cover z-0"
          height="100%"
          src={image_url}
          width="100%"
        />
      </CardBody>
      <CardFooter className="">
        <span className="text-small">{title}</span>
      </CardFooter>
    </Card>
  );
};

export const CharacterDetails = ({ id }: { id: number | undefined }) => {
  const {
    data,
    isLoading,
    error,
  }: {
    data: CharacterInterface;
    isLoading: boolean;
    error: object;
  } = useFetchCharacterRecord(id);

  const { data: pictures } = useFetchCharacterImages(id);

  console.log(pictures);
  console.log(data);

  const { setValue: setBackgroundImage } = useContext(BackgroundImageContext);

  useEffect(() => {
    setBackgroundImage(data?.images?.webp?.image_url);
  }, [data?.images?.webp?.image_url]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className={title()}>{data?.name}</span>
          <Chip
            classNames={{
              base: "bg-content1/70 shadow-lg",
              content: "flex flex-row items-center gap-2 text-default-600",
            }}
            size="lg"
          >
            <CharacterIcon />
            <span className="text-small">Character</span>
          </Chip>
        </div>
      </div>
      <div className={clsx(subtitle({ color: "grey" }))}>
        {data?.name_kanji}
      </div>

      <Card className="p-4 bg-content1/70">
        <div className="relative grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4 items-start">
            <Card
              isFooterBlurred
              className="w-full h-[300px] md:w-[225px] md:h-[325px]"
            >
              <CardHeader className="absolute z-10 top-1 flex-col items-start" />
              <Image
                removeWrapper
                alt={data?.name}
                className="z-0 w-full h-full object-cover"
                height={400}
                src={data?.images?.webp?.image_url}
                width={250}
              />
              <CardFooter className="absolute p-2 bg-content1/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="grow text-small">
                  {data?.nicknames?.map((name, index) => (
                    <div key={index}>{name}</div>
                  ))}
                </div>
              </CardFooter>
            </Card>

            <div className="flex-grow">
              <Card className="p-4 bg-background/40">
                <div className="text-small text-default-500 whitespace-break-spaces">
                  {data?.about}
                </div>
              </Card>
            </div>
          </div>

          <Divider />

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
                    <TvIcon />
                    <span>Animes</span>
                  </div>
                }
              >
                <div>
                  <Card className={clsx("p-4 bg-background/40", itemsGrid())}>
                    {data?.anime?.map((item: any) => (
                      <DisplayCard
                        key={item.anime.mal_id}
                        id={item.anime.mal_id}
                        image={item.anime.images.webp.image_url}
                        name={item.anime.title}
                        role={item.role}
                        type={Type.Anime}
                        url={`/${Type.Anime}/${item.anime.mal_id}`}
                      />
                    ))}
                  </Card>
                </div>
              </Tab>
              <Tab
                title={
                  <div className="flex items-center space-x-2">
                    <MangaIcon />
                    <span>Manga</span>
                  </div>
                }
              >
                <div>
                  <Card className={clsx("p-4 bg-background/40", itemsGrid())}>
                    {data?.manga?.map((item: any) => (
                      <DisplayCard
                        key={item.manga.mal_id}
                        id={item.manga.mal_id}
                        image={item.manga.images.webp.image_url}
                        name={item.manga.title}
                        role={item.role}
                        type={Type.Manga}
                        url={`/${Type.Manga}/${item.manga.mal_id}`}
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
                    <Photos id={data?.mal_id} type="characters" />
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
