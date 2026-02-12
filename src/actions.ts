import { KEY, URL_API } from "./constants";
import { Storage } from "./storage";
import type { CollectionMovie, DataResponse } from "./types";
import supabase from "./supabase";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + KEY,
  },
};

export const searchMovie = async function (
  query: string,
): Promise<DataResponse<CollectionMovie>> {
  try {
    const res = await fetch(URL_API + "/search/movie" + "?query=" + query, options);

    const data = await res.json();

    return { data, error: null };
  } catch (error) {
    return { data: null, error: "Failed to fetch movies" };
  }
};

export const addMovieToWatchList = async function (_: any, queryData: any) {
  const params = new URLSearchParams(queryData);
  const storage = new Storage();

  const id = params.get("id");
  const title = params.get("title");
  const poster_path = params.get("poster_path");

  if (id) {
    try {
      await storage.add({
        id: Number(id),
        title: title || "",
        poster_path: poster_path || null,
      });
    } catch (error) {}
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
    try {
      await storage.delete(id);
    } catch (error) {}
  }
};

export const signIn = async function (_: any, formData: any) {
  const params = new URLSearchParams(formData);
  const email = params.get("email") ?? "";
  const password = params.get("password") ?? "";

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { error: error.message };
  return { user: data?.user ?? null };
};

export const getWatchList = async function () {
  const storage = new Storage();
  return await storage.list();
};
