import { Form, useNavigation } from "react-router";

function Home() {
  const navigation = useNavigation();
  const isLoading = navigation.formAction === "/search";

  return (
    <>
      <Form role="search" method="GET" action="/search">
        <input type="text" name="query" id="query" defaultValue={""} />
        <button type="submit" aria-busy={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </Form>
    </>
  );
}

export default Home;
