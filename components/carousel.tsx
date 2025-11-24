"use client";

import { EmblaOptionsType } from "embla-carousel";
import { useEffect, useState } from "react";
import { Card, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Tooltip } from "@heroui/tooltip";
import { Link } from "@heroui/link";

import EmblaCarousel from "./embla-carousel/embla-carousel";

import { AnimeInterface } from "@/types";
import { useFetchData } from "@/utils/useFetch";
import { Type } from "@/types/enums";

export default function Carousel({ url, type }: { url: string; type: string }) {
  const OPTIONS: EmblaOptionsType = { slidesToScroll: "auto" };

  const { data } = useFetchData(url);
  const [items, setItems] = useState();

  useEffect(() => {
    setItems(
      data?.map((anime: AnimeInterface) => {
        return {
          content: (
            <>
              {type === "image" ? (
                <Card
                  isFooterBlurred
                  as={Link}
                  className="p-1"
                  href={`/${Type.Anime}/${anime.mal_id}`}
                >
                  <Image
                    removeWrapper
                    alt={anime?.synopsis}
                    className="z-0 w-full h-full object-cover h-[250px] lg:h-[300px]"
                    src={anime?.images?.webp?.large_image_url}
                  />
                  <CardFooter>
                    <Tooltip
                      content={
                        <div className="p-2">
                          {anime.title_english &&
                          anime.title_english !== anime.title ? (
                            <>
                              <div>
                                English:{" "}
                                <span className="text-default-700">
                                  {anime.title_english}
                                </span>
                              </div>
                              <div>
                                Original:{" "}
                                <span className="text-default-700">
                                  {anime.title}
                                </span>
                              </div>
                            </>
                          ) : (
                            <div>{anime.title_english || anime.title}</div>
                          )}
                        </div>
                      }
                    >
                      <span className="text-small line-clamp-1">
                        {anime.title_english || anime.title}
                      </span>
                    </Tooltip>
                  </CardFooter>
                </Card>
              ) : null}
            </>
          ),
        };
      }),
    );
  }, [data]);

  return (
    <>
      <EmblaCarousel options={OPTIONS} slides={items || []} />
    </>
  );
}
