import { createContext } from "react";

export const BackgroundImageContext = createContext({
  value: "",
  setValue: (image_url: string) => {}, // Placeholder function
});
