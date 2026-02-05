import { useEffect, useState } from "react";
import { getWatchList } from "../actions";

function WatchList() {
  const [watchlist, setWatchlist] = useState<
    Awaited<ReturnType<typeof getWatchList>>
  >([]);

  useEffect(() => {
    (async () => {
      const data = await getWatchList();
      setWatchlist(data);
    })();
  }, []);

  if (!watchlist.length) {
    return <p>No movies in your watchlist yet.</p>;
  }

  return (
    <div>
      <h3>Your Watchlist</h3>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {watchlist.map((item) => (
          <article key={item.id} style={{ maxWidth: "max(320px, 30%)" }}>
            <header>
              <h3>{item.title}</h3>
            </header>
            {item.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
                width={300}
                style={{
                  aspectRatio: 300 / 450,
                  objectFit: "contain",
                  objectPosition: "center",
                }}
              />
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

export default WatchList;
