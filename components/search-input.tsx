import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Image } from "@heroui/image";
import { ReactNode, useRef, useState } from "react";
import { Button } from "@heroui/button";

import { SearchIcon, Check } from "@/components/icons";
import { useFetchSearchAny } from "@/utils/useFetch";
import { useDebouncedInputChange } from "@/utils/useDebouncedInputChange";
import { Type } from "@/types/enums";
import { AnimeInterface, CharacterInterface, MangaInterface } from "@/types";

export const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedInputChange(searchTerm);
  const [searchType, setSearchType] = useState(Type.Anime);

  const {
    data = [],
    isLoading,
    error,
  } = useFetchSearchAny?.(debouncedSearchTerm, searchType);

  let autoCompleteItemKeyIndex = 0;

  const {
    isOpen: isSearchModalOpen,
    onOpen: onSearchModalOpen,
    onOpenChange: onSearchModalOpenChange,
  } = useDisclosure();

  const searchInput = useRef<HTMLInputElement | null>(null);
  const setSearchTypeAndFocusInput = (type: Type) => {
    setSearchType(type);

    if (searchInput?.current) {
      searchInput.current?.focus();
    }
  };

  const CheckButton = ({
    children,
    type,
  }: {
    children: ReactNode;
    type: Type;
  }) => {
    return (
      <Button
        className="h-[25]"
        color={searchType === type ? "primary" : "secondary"}
        size="sm"
        onPress={() => {
          setSearchTypeAndFocusInput(type);
        }}
      >
        {searchType === type ? <Check size={15} /> : null}
        {children}
      </Button>
    );
  };

  const buttons = (
    <div className="flex gap-1 items-center justify-end">
      <CheckButton type={Type.Anime}>Anime</CheckButton>
      <CheckButton type={Type.Manga}>Manga</CheckButton>
      <CheckButton type={Type.Characters}>Character</CheckButton>
    </div>
  );

  return (
    <>
      <Input
        aria-label="Search"
        className="max-w-xs"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        endContent={
          <Kbd className="hidden lg:inline-block" keys={["ctrl"]}>
            K
          </Kbd>
        }
        labelPlacement="outside"
        placeholder="Search..."
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
        onFocus={(e) => {
          setSearchTerm("");
          onSearchModalOpen();
          e.target.blur();
        }}
        onValueChange={setSearchTerm}
      />

      <Modal
        backdrop="blur"
        isOpen={isSearchModalOpen}
        placement="top"
        size="5xl"
        onOpenChange={onSearchModalOpenChange}
      >
        <ModalContent>
          {(onSearchModalClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Search anime, manga or characters
              </ModalHeader>
              <ModalBody>
                <div className="sm:hidden">{buttons}</div>
                <Autocomplete
                  ref={searchInput}
                  allowsCustomValue
                  aria-label="Search anime manga or character"
                  endContent={<div className="max-sm:hidden">{buttons}</div>}
                  isLoading={isLoading}
                  itemHeight={50}
                  items={debouncedSearchTerm ? data : []}
                  maxListboxHeight={500}
                  placeholder="Search..."
                  startContent={
                    <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchTerm(e.target.value);
                  }}
                  onSelectionChange={() => onSearchModalClose()}
                >
                  {(
                    item: AnimeInterface & MangaInterface & CharacterInterface,
                  ) => (
                    <AutocompleteItem
                      key={autoCompleteItemKeyIndex++}
                      as={Link}
                      href={`/${searchType}/${item?.mal_id}`}
                      textValue={item?.name || item?.title}
                    >
                      <div className="flex flex-row gap-4 items-center text-default-600">
                        <Image
                          alt={item?.synopsis}
                          classNames={{
                            img: "min-w-15 max-w-15",
                          }}
                          src={item?.images?.webp?.image_url}
                        />

                        <div>{item?.name || item?.title}</div>
                      </div>
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onSearchModalClose}>Close</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
