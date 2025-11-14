"use client";

import { Image } from "@heroui/image";
import { Card } from "@heroui/card";
import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalBody, useDisclosure } from "@heroui/modal";

import { itemsGrid } from "./primitives";

import { useFetchImages } from "@/utils/useFetch";
import { ImageInterface } from "@/types";

export const Photos = ({ id, type }: { id: number; type: string }) => {
  let [photos, setPhotos] = useState([]);
  const { data } = useFetchImages(id, type);

  useEffect(() => {
    setPhotos(data);
  }, [data]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [previewPhoto, setPreviewPhoto] = useState<ImageInterface>();
  const onPhotoPress = (photo: any) => {
    setPreviewPhoto(photo);
    onOpen();
  };

  return (
    <>
      <div className={itemsGrid()}>
        {photos?.map((photo: any, index: number) => (
          <Card key={index} isPressable onPress={() => onPhotoPress(photo)}>
            <Image isZoomed src={photo?.jpg?.image_url} width={"100%"} />
          </Card>
        ))}
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
              <ModalBody>
                <div className="flex items-center justify-center">
                  <Image
                    className="w-auto sm:w-[500]"
                    src={previewPhoto?.jpg?.image_url}
                  />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
