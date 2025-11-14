import React, { useMemo } from "react";
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

export function useFetchData(url: string) {
  const { data, error, isLoading } = useSWR(url, fetcher, {
    keepPreviousData: true,
  });

  // const total_pages = useMemo(() => {
  //   return data?.pagination?.items?.total > 20
  //     ? 20
  //     : data?.pagination?.items?.total;
  // }, [data?.pagination?.items?.count]);

  const total_pages = data?.pagination?.last_visible_page;

  const loadingState = isLoading || data?.data?.length === 0 ? true : false;

  return {
    total_pages,
    data,
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

  const rowsPerPage = 10;

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

export function useFetchMangaRecord(id: number | undefined) {
  return useFetchRecord(`${api}/manga/${id}/full`);
}
export function useFetchMangaCharactersRecord(id: number | undefined) {
  return useFetchRecord(`${api}/manga/${id}/characters`);
}
export function useFetchMangaImages(id: number | undefined) {
  return useFetchRecord(`${api}/manga/${id}/pictures`);
}
