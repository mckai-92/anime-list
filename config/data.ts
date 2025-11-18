export type Data = typeof data;

export const data: any = {
  type: {
    anime: [
      { key: "tv", label: "TV" },
      { key: "movie", label: "Movie" },
      { key: "ova", label: "OVA" },
      { key: "special", label: "Special" },
      { key: "ona", label: "ONA" },
      { key: "music", label: "Music" },
      { key: "cm", label: "CM" },
      { key: "pv", label: "PV" },
      { key: "tv_special", label: "TV Special" },
    ],
    manga: [
      { key: "manga", label: "Manga" },
      { key: "novel", label: "Novel" },
      { key: "lightnovel", label: "Light Novel" },
      { key: "oneshot", label: "One Shot" },
      { key: "doujin", label: "Doujin" },
    ],
  },
  orderBy: {
    anime: [
      { key: "mal_id", label: "MAL ID" },
      { key: "title", label: "Title" },
      { key: "start_date", label: "Start Date" },
      { key: "end_date", label: "End Date" },
      { key: "episodes", label: "Episodes" },
      { key: "score", label: "Score" },
      { key: "scored_by", label: "Scored By" },
      { key: "rank", label: "Rank" },
      { key: "popularity", label: "Popularity" },
      { key: "members", label: "Members" },
      { key: "favorites", label: "Favorites" },
    ],
    manga: [
      { key: "mal_id", label: "MAL ID" },
      { key: "title", label: "Title" },
      { key: "start_date", label: "Start Date" },
      { key: "end_date", label: "End Date" },
      { key: "chapters", label: "Chapters" },
      { key: "volumes", label: "Volumes" },
      { key: "score", label: "Score" },
      { key: "scored_by", label: "Scored By" },
      { key: "rank", label: "Rank" },
      { key: "popularity", label: "Popularity" },
      { key: "members", label: "Members" },
      { key: "favorites", label: "Favorites" },
    ],
  },
};
