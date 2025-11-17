"use client";

import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@heroui/drawer";
import { Tooltip } from "@heroui/tooltip";

import { EyeIcon } from "./icons";
import { AnimeDetails } from "./anime-details";
import { MangaDetails } from "./manga-details";
import { CharacterDetails } from "./character-details";

import { Type } from "@/types/enums";

export const DisplayCard = ({
  type,
  id,
  url,
  role,
  name,
  image,
}: {
  type: string;
  id: number;
  url: string;
  role: string;
  name: string;
  image: string;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const preview = () => {
    onOpen();
  };

  return (
    <>
      <div className="relative">
        <Tooltip color="secondary" content="Preview">
          <Button
            isIconOnly
            className="absolute top-[-10] right-[-10] z-100 bg-content1/90"
            onPress={(e) => preview()}
          >
            <EyeIcon />
          </Button>
        </Tooltip>

        <Card isPressable as={Link} href={url}>
          <CardHeader className="absolute top-1 left-1 w-full items-start p-0 flex justify-between">
            <Chip color={role === "Main" ? "primary" : "default"} size="sm">
              {role}
            </Chip>
          </CardHeader>
          <CardBody className="overflow-visible p-0">
            <Image
              isZoomed
              alt={name}
              className="w-full object-cover z-0"
              height={200}
              src={image}
              width="100%"
            />
          </CardBody>
          <CardFooter className="">
            <span className="text-small">{name}</span>
          </CardFooter>
        </Card>
      </div>

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
                {type === Type.Anime ? <AnimeDetails id={id} /> : null}

                {type === Type.Manga ? <MangaDetails id={id} /> : null}

                {type === Type.Characters ? <CharacterDetails id={id} /> : null}
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
};
