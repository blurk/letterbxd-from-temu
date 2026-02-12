import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { searchMovie } from "../actions";
import { URL_MEDIA } from "../constants";
import type { CollectionMovie, DataResponse } from "../types";
import { SaveToWatchListButton } from "./SaveToWatchListButton";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "";
  const res = await searchMovie(query);
  return res;
}

export default function Search() {
  const { data } = useLoaderData<DataResponse<CollectionMovie>>();

  if (!data) {
    return <p>Not found.</p>;
  }

  return (
    <div>
      <h3>
        Page {data.page} of {data.total_pages}
      </h3>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
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
              <img
                src={
                  item.poster_path
                    ? URL_MEDIA + item.poster_path
                    : "/placeholder.jpg"
                }
                alt={item.title}
                width={300}
                style={{
                  aspectRatio: 300 / 450,
                  objectFit: "contain",
                  objectPosition: "center",
                }}
              />

              {/* <footer>
                <SaveToWatchListButton
                  id={item.id}
                  title={item.title}
                  poster_path={item.poster_path}
                />
              </footer> */}
            </article>
          );
        })}
      </div>
    </div>
  );
}
