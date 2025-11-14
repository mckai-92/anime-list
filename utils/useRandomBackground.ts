import { useEffect, useState } from "react";

const bgs = [
  "https://cdn.myanimelist.net/images/anime/1935/127974l.webp",
  "https://cdn.myanimelist.net/images/anime/3/72078l.webp",
  "https://cdn.myanimelist.net/images/anime/1825/110716l.webp",
  "https://cdn.myanimelist.net/images/anime/1708/138033l.webp",
  "https://cdn.myanimelist.net/images/anime/1812/134736l.webp",
];

export function useRandomBackground() {
  let [bg, setBg] = useState(bgs[Math.floor(Math.random() * 5)]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBg(bgs[Math.floor(Math.random() * 5)]);
    }, 1000);

    // Cleanup function: Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures it runs only once on mount

  return bg;
}
