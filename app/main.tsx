"use client";

import React from "react";
import { useState } from "react";

import { TabHost } from "@/components/tabhost";
import { Sidebar } from "@/components/sidebar";
import { PageInterface } from "@/types/index";
import { pages as p } from "@/app/pages/pages";

export const Main = () => {
  const dashboardPage = p[0];

  let [pages, setPages] = useState<any[]>([dashboardPage]);

  interface Page {
    id: string;
  }

  const onItemClicked = (page: PageInterface) => {
    pages.forEach((p) => {
      p.__selected = false;
    });
    const existingPage = pages.find((p) => p.id === page.id);

    if (existingPage) {
      existingPage.__selected = true;
    } else {
      pages.push({
        ...page,
        __selected: true,
      });
    }

    setPages([...pages]);
  };

  const onPageClose = (pageId: string) => {
    const index = pages.findIndex((p) => p.id === pageId);

    pages.splice(index, 1);

    setPages([...pages]);
  };

  return (
    <div className="flex-grow flex flex-row gap-4 overflow-hidden">
      <Sidebar onItemClicked={onItemClicked} />
      <TabHost pages={pages} onPageClose={onPageClose} />
    </div>
  );
};
