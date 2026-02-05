import "./App.css";
import { Link, Route, Router } from "./Route";
import Home from "./components/Home";
import WatchList from "./components/WatchList";

export function App() {
  return (
    <Router>
      <main className="container">
        <nav>
          <ul>
            <li>
              <Link to="/">
                <strong>Letterbxd from temu</strong>
              </Link>
            </li>
          </ul>

          <li>
            <Link to="/watchlist">
              <span>Your watchlist</span>
            </Link>
          </li>
        </nav>

        <Route path="/" exact component={Home} />
        <Route path="/watchlist" component={WatchList} />
      </main>
    </Router>
  );
}

export default App;
