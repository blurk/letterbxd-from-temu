import { KEY, URL_API } from "./constants";
import { Storage } from "./storage";
import type { CollectionMovie } from "./types";
import supabase from "./supabase";
import { historyPush } from "./Route";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + KEY,
  },
};

export const searchMovie = async function (
  _: any,
  queryData: any,
): Promise<CollectionMovie | null> {
  "use server";
  const params = new URLSearchParams(queryData);

  try {
    const res = await fetch(
      URL_API + "/search/movie" + "?" + params.toString(),
      options,
    );

    historyPush("/search?" + params.toString());

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
  const title = params.get("title");
  const poster_path = params.get("poster_path");

  if (id) {
    try {
      await storage.add({
        id: Number(id),
        title: title || "",
        poster_path: poster_path || null,
      });
      historyPush("/watchlist");
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
