import { useActionState } from "react";
import { addMovieToWatchList, deleteMovieFromWatchList } from "../actions";
import { URL_MEDIA } from "../constants";
import type { CollectionMovie, Movie } from "../types";
import { Storage } from "../storage";

const SaveToWatchListButton = ({ id }: { id: Movie["id"] }) => {
  const storage = new Storage();
  const alreadyInWatchList = storage.has(id.toString());

  const [_, formAction, isPending] = useActionState(
    alreadyInWatchList ? deleteMovieFromWatchList : addMovieToWatchList,
    null,
  );

  return (
    <form action={formAction}>
      <fieldset role="group">
        <input type="hidden" name="id" value={id} />
        {isPending ? (
          <span aria-busy={true} />
        ) : (
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={alreadyInWatchList ? "white" : "none"}
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

export default function SearchMovieList({ data }: { data: CollectionMovie }) {
  if (data.total_results === 0) {
    return <p>Not found.</p>;
  }

  return (
    <div>
      <h3>
        {data.page} of {data.total_pages}
      </h3>

      <div>
        {data.results.map((item) => {
          return (
            <article key={item.id}>
              <header>
                <h4>{item.title}</h4>
                <p>Original title: {item.original_title}</p>
                <strong>Overview</strong>
                <p>{item.overview}</p>

                <p>
                  Released date:{" "}
                  <time dateTime={item.release_date}>{item.release_date}</time>
                </p>
              </header>
              {item.poster_path && (
                <img
                  src={URL_MEDIA + item.poster_path}
                  alt={item.title}
                  width={300}
                  style={{
                    aspectRatio: 300 / 450,
                    objectFit: "contain",
                    objectPosition: "center",
                  }}
                />
              )}

              <footer>
                <SaveToWatchListButton id={item.id} />
              </footer>
            </article>
          );
        })}
      </div>
    </div>
  );
}
