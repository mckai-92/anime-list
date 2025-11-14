import { Spinner } from "@heroui/spinner";
import React from "react";
import clsx from "clsx";

export const Loader = ({ loading }: { loading: boolean }) => {
  return (
    <>
      <div
        className={clsx(
          `absolute inset-0 flex align-items-center justify-center
        backdrop-blur-xs pointer-events-none transition-opacity duration-100`,
          loading ? "opacity-100" : "opacity-0 duration-700",
        )}
      >
        <Spinner
          classNames={{
            base: "absolute inset-0 place-self-center w-[100%] h-[100%] aspect-square",
            wrapper: "w-[10%] h-auto aspect-square",
            circle1: "border-[10px]",
            circle2: "border-[10px]",
          }}
        />
      </div>
    </>
  );
};
