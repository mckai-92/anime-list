"use client";

import { Listbox, ListboxItem } from "@heroui/listbox";
import { ReactNode } from "react";
import { Key } from "@react-types/shared/src/key";

import { pages } from "@/app/pages/pages";

export const ListboxWrapper = ({ children }: { children: ReactNode }) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

export const Sidebar = ({ onItemClicked }: { onItemClicked: Function }) => {
  const onAction = (key: Key) => {
    const page = pages.find((p) => p.id === key);

    onItemClicked(page);
  };

  return (
    <ListboxWrapper>
      <Listbox aria-label="Actions" onAction={(key) => onAction(key)}>
        {pages.map((item) => (
          <ListboxItem key={item?.id}>{item.label}</ListboxItem>
        ))}
      </Listbox>
    </ListboxWrapper>
  );
};
