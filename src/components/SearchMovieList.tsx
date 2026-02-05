import { URL_MEDIA } from "../constants";
import type { CollectionMovie } from "../types";
import { SaveToWatchListButton } from "./SaveToWatchListButton";

export default function SearchMovieList({ data }: { data: CollectionMovie }) {
  if (data.total_results === 0) {
    return <p>Not found.</p>;
  }

  return (
    <div>
      <h3>
        {data.page} of {data.total_pages}
      </h3>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {data.results.map((item) => {
          return (
            <article key={item.id} style={{ maxWidth: "max(320px, 30%)" }}>
              <header>
                <h3>{item.title}</h3>
                <p>
                  <strong>Original title:</strong> {item.original_title}
                </p>

                <p>
                  <strong>Released date: </strong>
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
                <SaveToWatchListButton
                  id={item.id}
                  title={item.title}
                  poster_path={item.poster_path}
                />
              </footer>
            </article>
          );
        })}
      </div>
    </div>
  );
}
