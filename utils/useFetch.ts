import { Type } from "@/types/enums";
import useSWR from "swr";

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

export function useFetchSearchAny(q: string, type: string) {
  return useFetchData(`${api}/${type}?q=${q}`);
}

export function useFetchData(url: string) {
  const { data, error, isLoading } = useSWR(url, fetcher, {
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

export function useFetchAnimeSearch(
  params: { [key: string]: any },
  page: number,
  limit: number
) {
  let params_string = Object.keys(params)
    .map((p) => {
      return `${p}=${params[p]}`;
    })
    .join("&");

  return useFetchData(
    `${api}/anime?${params_string}&page=${page}&limit=${limit}`
  );
}

export function useFetchAnimeData(page: number, limit: number) {
  return useFetchData(`${api}/top/anime?page=${page}&limit=${limit}`);
}

export function useFetchRecord(url: string) {
  const { data, error, isLoading } = useSWR(url, fetcher, {
    keepPreviousData: true,
  });

  return {
    data: data?.data,
    isLoading: isLoading,
    error: error,
  };
}

export function useFetchAnimeRecord(id: number | undefined) {
  return useFetchRecord(`${api}/anime/${id}/full`);
}
export function useFetchAnimeCharacters(id: number | undefined) {
  return useFetchRecord(`${api}/anime/${id}/characters`);
}
export function useFetchAnimeImages(id: number | undefined) {
  return useFetchRecord(`${api}/anime/${id}/pictures`);
}

export function useFetchCharacterRecord(id: number | undefined) {
  return useFetchRecord(`${api}/characters/${id}/full`);
}
export function useFetchCharacterImages(id: number | undefined) {
  return useFetchRecord(`${api}/characters/${id}/pictures`);
}

export function useFetchMangaSearch(
  params: { [key: string]: any },
  page: number,
  limit: number
) {
  let params_string = Object.keys(params)
    .map((p) => {
      return `${p}=${params[p]}`;
    })
    .join("&");

  return useFetchData(
    `${api}/${Type.Manga}?${params_string}&page=${page}&limit=${limit}`
  );
}
export function useFetchMangaRecord(id: number | undefined) {
  return useFetchRecord(`${api}/manga/${id}/full`);
}
export function useFetchMangaCharactersRecord(id: number | undefined) {
  return useFetchRecord(`${api}/manga/${id}/characters`);
}
export function useFetchMangaImages(id: number | undefined) {
  return useFetchRecord(`${api}/manga/${id}/pictures`);
}

export function useFetchImages(id: number | undefined, type: string) {
  return useFetchRecord(`${api}/${type}/${id}/pictures`);
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
