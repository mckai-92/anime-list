"use client";

import { Link } from "@heroui/link";
import clsx from "clsx";
import { useState } from "react";

import { Providers } from "./providers";

import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { BackgroundImageContext } from "@/components/background-image-context";

let bgImage = "";

export const Body = ({ children }: { children: React.ReactNode }) => {
  const [backgroundImage, setBackgroundImage] = useState(
    "https://cdn.myanimelist.net/images/anime/1935/127974l.webp",
  );

  if (backgroundImage) {
    bgImage = backgroundImage;
  }

  return (
    <body
      className={clsx(
        "min-h-screen text-foreground bg-background font-sans antialiased",
        fontSans.variable,
        "transition transition-[background-image] duration-3000",
        "bg-cover bg-no-repeat bg-position-[center_center]",
      )}
      style={{
        backgroundImage: `url('${bgImage}')`,
      }}
    >
      <BackgroundImageContext.Provider
        value={{ value: bgImage, setValue: setBackgroundImage }}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen bg-background/70 backdrop-blur-[50px] overflow-auto">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-4 px-6 flex-grow flex flex-col">
              {/* <Main /> */}

              {<div>{children}</div>}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://heroui.com?utm_source=next-app-template"
                title="heroui.com homepage"
              >
                <span className="text-default-600">Powered by</span>
                <p className="text-primary">HeroUI</p>
              </Link>
            </footer>
          </div>
        </Providers>
      </BackgroundImageContext.Provider>
    </body>
  );
};
