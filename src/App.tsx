import { useActionState } from "react";
import { searchMovie } from "./actions";
import "./App.css";
import SearchMovieList from "./components/SearchMovieList";

function App() {
  const [data, formAction, isPending] = useActionState(
    searchMovie,
    null,
    "/query",
  );

  return (
    <main className="container">
      <h1>Letterbxd from temu</h1>

      <form action={formAction}>
        <input type="text" name="query" id="query" />
        <button type="submit" disabled={isPending}>
          Search
        </button>
      </form>

      <div>
        {isPending ? (
          <span aria-busy="true">Loading...</span>
        ) : (
          data && <SearchMovieList data={data} />
        )}
      </div>
    </main>
  );
}

export default App;
