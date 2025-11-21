import useSWR from "swr";

import { Type } from "@/types/enums";

const api = "https://api.jikan.moe/v4";

const fetcher = async (url: string) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.

  if (!res.ok) {
    //const error = new Error('An error occurred while fetching the data.');
    const error: {
      info: object;
      status: number;
    } = {
      info: await res.json(),
      status: res.status,
    };

    throw error;
  }

  return res.json();
};

export function useFetchData(url: string) {
  const { data, error, isLoading } = useSWR(`${api}/${url}`, fetcher, {
    keepPreviousData: true,
  });

  console.log(data);

  const pagination = data?.pagination;

  const loadingState = isLoading || data?.data?.length === 0 ? true : false;

  return {
    data: data?.data,
    pagination: pagination,
    isLoading: loadingState,
    error: error,
  };
}

export function useFetchRecord(url: string) {
  const { data, error, isLoading } = useSWR(`${api}/${url}`, fetcher, {
    keepPreviousData: true,
  });

  return {
    data: data?.data,
    isLoading: isLoading,
    error: error,
  };
}

/**
 * Used for global search of website
 * @param q query
 * @param type
 * @returns
 */
export function useFetchSearchAny(q: string, type: string) {
  return useFetchData(`${type}?q=${q}`);
}

/**
 * Used for specific type search - anime, manga, characters
 * @param params search parameters, different based on search type
 * @param type
 * @param page
 * @param limit
 * @returns
 */
export function useFetchSearch(options: {
  params: { [key: string]: any };
  type: Type;
  page: number;
  limit: number;
}) {
  let params_string = "";

  if (options?.params) {
    params_string = Object.keys(options?.params)
      .map((p) => {
        return `${p}=${options.params[p]}`;
      })
      .join("&");
  }

  return useFetchData(
    `${options.type}?${params_string}&page=${options.page}&limit=${options.limit}`,
  );
}

export function useFetchAnimeEpisodes(options: {
  page: number;
  customProps: { [key: string]: any };
}) {
  return useFetchData(
    `${Type.Anime}/${options.customProps?.id}/episodes?page=${options.page}`,
  );
}

export function useFetchAnimeRecord(id: number, part: string) {
  return useFetchData(`${Type.Anime}/${id}/${part}`);
}
export function useFetchMangaRecord(id: number, part: string) {
  return useFetchData(`${Type.Manga}/${id}/${part}`);
}
export function useFetchCharacterRecord(id: number, part: string) {
  return useFetchData(`${Type.Characters}/${id}/${part}`);
}

export function useFetchImages(id: number | undefined, type: string) {
  return useFetchData(`${type}/${id}/pictures`);
}

/**
 * Multi search
 * @param urls
 * @returns
 */
function fetcherMulti(urls: string[]) {
  const f = (u: string) => fetch(u).then((r) => r.json());

  return Promise.all(urls.map((url) => f(url)));
}

export function useFetchDataMultiple(urls: string[]) {
  const { data, error, isLoading } = useSWR(urls, fetcherMulti, {
    keepPreviousData: true,
  });

  const types = ["anime", "manga", "character"];
  const sortedData: object[] = [];

  data?.forEach((type: { data: object[] }, index: number) => {
    type?.data?.forEach((d: object) => {
      sortedData.push({
        ...d,
        __type: types[index],
      });
    });
  });

  const loadingState = isLoading || data?.length === 0 ? true : false;

  return {
    data: sortedData,
    isLoading: loadingState,
    error: error,
  };
}
