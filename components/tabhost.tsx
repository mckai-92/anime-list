"use client";

import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { useState, useEffect } from "react";
import { Key } from "@react-types/shared/src/key";

import { PageInterface } from "@/types/index";

export const TabHost = ({
  pages,
  onPageClose,
}: {
  pages: PageInterface[];
  onPageClose: Function;
}) => {
  const [selected, setSelected] = useState<Key>("dashboard");

  useEffect(() => {
    console.log("pages", pages);
    const key = pages.find((p) => p.__selected)?.id;

    if (key) {
      setSelected(key);
    } else {
      if (pages?.length) {
        setSelected(pages[0].id);
      }
    }
  }, [pages]);

  const handleClose = (pageId: string) => {
    onPageClose(pageId);
  };

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        classNames={{
          panel: "overflow-hidden flex-grow",
        }}
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        {pages.map((page: PageInterface, index: number) => (
          <Tab
            key={page.id}
            title={
              page.__not_closable ? (
                <Chip key={index} variant="flat">
                  {page.label}
                </Chip>
              ) : (
                <Chip
                  key={index}
                  variant="flat"
                  onClose={() => handleClose(page.id)}
                >
                  {page.label}
                </Chip>
              )
            }
          >
            <Card className="h-full">
              <CardBody>{page.el}</CardBody>
            </Card>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};
