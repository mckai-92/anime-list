export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Anime list",
  description: "List of anime shows and manga.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Anime",
      href: "/anime",
    },
    {
      label: "Manga",
      href: "/manga",
    },
    {
      label: "Characters",
      href: "/characters",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Anime",
      href: "/anime",
    },
    {
      label: "Manga",
      href: "/manga",
    },
    {
      label: "Characters",
      href: "/characters",
    },
  ],
  links: {
    github: "https://github.com/mckai-92",
  },
};
