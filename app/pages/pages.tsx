import { Dashboard } from "@/app/pages/dashboard";
import { Animes } from "@/app/pages/animes";
import { Characters } from "@/app/pages/characters";

export type Pages = typeof pages;
export const pages = [
  {
    id: "dashboard",
    label: "Dashboard",
    el: <Dashboard />,
    __not_closable: true,
  },
  {
    id: "animes",
    label: "Animes",
    el: <Animes />,
  },
  {
    id: "characters",
    label: "Characters",
    el: <Characters />,
  },
];
