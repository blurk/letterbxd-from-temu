import { Link, Outlet } from "react-router";
import "./App.css";

export function App() {
  return (
    <main className="container">
      <nav>
        <ul>
          <li>
            <Link to="/">
              <strong>Letterbxd from temu</strong>
            </Link>
          </li>
          <li>
            <Link to="/watchlist">
              <span>Your watchlist</span>
            </Link>
          </li>
          <li>
            <Link to="/logout">
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />

      <button
        className="contrast"
        style={{ position: "fixed", bottom: "1rem", right: "1rem" }}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        TOP
      </button>
    </main>
  );
}

export default App;
