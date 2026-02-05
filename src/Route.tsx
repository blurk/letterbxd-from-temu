import {
  createContext,
  createElement,
  use,
  useEffect,
  useState,
  type ComponentType,
  type MouseEvent,
  type ReactNode,
} from "react";

type Match = {
  path: string | null;
  url: string;
  isExact: boolean;
};

let listeners: (() => void)[] = [];

const subscribe = (l: () => void) => listeners.push(l);
const unsubscribe = (l: () => void) =>
  (listeners = listeners.filter((listener) => listener !== l));

const notifyAll = () => {
  listeners.forEach((l) => l());
};

const historyPush = (path: string) => {
  window.history.pushState({}, "", path);
  notifyAll();
};

const historyReplace = (path: string) => {
  window.history.replaceState({}, "", path);
  notifyAll();
};

const matchPath = (
  pathname: string,
  options: { path?: string; exact?: boolean },
) => {
  const { exact = false, path } = options;

  if (!path) {
    return {
      path: null,
      url: pathname,
      isExact: true,
    };
  }

  const match = new RegExp(`^${path}`).exec(pathname);
  if (!match) return null;

  const url = match[0];
  const isExact = url === pathname;

  if (exact && !isExact) {
    return null;
  }

  return {
    path,
    url,
    isExact,
  };
};

const RouterContext = createContext<{ pathname: string } | null>(null);

function Router({ children }: { children: ReactNode }) {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopStateChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopStateChange);
    subscribe(handlePopStateChange);

    return () => {
      window.removeEventListener("popstate", handlePopStateChange);
      unsubscribe(handlePopStateChange);
    };
  }, []);

  return <RouterContext value={{ pathname }}>{children}</RouterContext>;
}

const useRouter = () => {
  const context = use(RouterContext);

  if (!context) throw new Error("useRouter must be used within a <Router />");
  return context;
};

type RouteProps = {
  path?: string;
  component: ComponentType<{
    match: Match;
  }>;
  exact?: boolean;
  children?: ReactNode;
};

function Route({ path, component, exact }: RouteProps) {
  const { pathname } = useRouter();
  const match = matchPath(pathname, { path, exact });

  if (!match || !component) return null;

  return createElement(component, { match });
}

type LinkProps = {
  to: string;
  replace?: boolean;
  children: ReactNode;
};

function Link({ to, replace, children }: LinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    replace ? historyReplace(to) : historyPush(to);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export { historyPush, historyReplace, Link, Route, Router };
