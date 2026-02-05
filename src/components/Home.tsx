import { useActionState } from "react";
import { searchMovie } from "../actions";
import Loader from "../components/Loader";
import LoginForm from "../components/LoginForm";
import SearchMovieList from "../components/SearchMovieList";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const [data, formAction, isPending] = useActionState(searchMovie, null);

  const { isLoading, isLoggedIn } = useAuth();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isLoggedIn ? (
        <>
          <form action={formAction}>
            <input type="text" name="query" id="query" />
            <button type="submit" disabled={isPending}>
              Search
            </button>
          </form>

          <div>
            {isPending ? <Loader /> : data && <SearchMovieList data={data} />}
          </div>
        </>
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default Home;
