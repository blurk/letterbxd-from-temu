import { useActionState, useEffect, useState } from "react";
import { deleteMovieFromWatchList, addMovieToWatchList } from "../actions";
import { Storage } from "../storage";
import type { Movie } from "../types";

export const SaveToWatchListButton = ({
  id,
  title,
  poster_path,
}: {
  id: Movie["id"];
  title: Movie["title"];
  poster_path: Movie["poster_path"];
}) => {
  const storage = new Storage();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsSaved(await storage.has(id.toString()));
      } catch (error) {
        setIsSaved(false);
      }
    })();
  }, [id]);

  const [_, formAction, isPending] = useActionState(
    isSaved ? deleteMovieFromWatchList : addMovieToWatchList,
    null,
  );

  return isSaved ? null : (
    <form action={formAction}>
      <fieldset role="group">
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="title" value={title} />
        <input type="hidden" name="poster_path" value={poster_path ?? ""} />
        {isPending ? (
          <span aria-busy={true} />
        ) : (
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={"none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-bookmark-icon lucide-bookmark"
            >
              <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />
            </svg>
          </button>
        )}
      </fieldset>
    </form>
  );
};
