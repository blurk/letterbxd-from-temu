import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import {
  createBrowserRouter,
  createContext,
  redirect,
  type MiddlewareFunction,
} from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./components/Home.tsx";
import Login from "./components/Login.tsx";
import WatchList from "./components/WatchList.tsx";
import supabase from "./supabase.ts";
import type { JwtPayload } from "@supabase/supabase-js";
import { action as logoutAction } from "./routes/Logout.tsx";
import Search, { loader as searchLoader } from "./components/Search.tsx";

export const userContext = createContext<JwtPayload | null>(null);

const authMiddleware: MiddlewareFunction = async function ({ context }, next) {
  const { data } = await supabase.auth.getClaims();

  if (!data) {
    throw redirect("/auth/login");
  }

  context.set(userContext, data.claims);
  await next();
};

const router = createBrowserRouter([
  {
    errorElement: <h1>Something went wrong :(</h1>,
    path: "/",
    Component: App,
    middleware: [authMiddleware],
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "search",
        loader: searchLoader,
        Component: Search,
      },
      {
        path: "watchlist",
        Component: WatchList,
      },
    ],
  },
  {
    path: "auth/login",
    Component: Login,
  },
  {
    path: "auth/logout",
    action: logoutAction,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
