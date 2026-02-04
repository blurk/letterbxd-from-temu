import { KEY, URL_API } from "./constants";
import { Storage } from "./storage";
import type { CollectionMovie } from "./types";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + KEY,
  },
};

export const searchMovie = async function (
  prevState: any,
  queryData: any,
): Promise<CollectionMovie | null> {
  "use server";
  const params = new URLSearchParams(queryData);

  try {
    const res = await fetch(
      URL_API + "/search/movie" + "?" + params.toString(),
      options,
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addMovieToWatchList = async function (_: any, queryData: any) {
  const params = new URLSearchParams(queryData);
  const storage = new Storage();

  const id = params.get("id");

  if (id) {
    storage.add(id);
  }
};

export const deleteMovieFromWatchList = async function (
  _: any,
  queryData: any,
) {
  const params = new URLSearchParams(queryData);
  const storage = new Storage();

  const id = params.get("id");

  if (id) {
    storage.delete(id);
  }
};
