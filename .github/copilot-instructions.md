# Copilot instructions for this repository

Quick context
- Small Vite + React + TypeScript single-page app. Core UI lives under [src/](src/).
- Search flow: form in [`src/App.tsx`](src/App.tsx) calls [`searchMovie`](src/actions.ts) and renders [`SearchMovieList`](src/components/SearchMovieList.tsx).

Essential files to open
- [.gitignore](.gitignore) • [eslint.config.js](eslint.config.js) • [GEMINI.md](GEMINI.md)
- [index.html](index.html) • [package.json](package.json) • [README.md](README.md)
- [tsconfig.app.json](tsconfig.app.json) • [tsconfig.json](tsconfig.json) • [tsconfig.node.json](tsconfig.node.json)
- [vite.config.ts](vite.config.ts)
- [public/pico.min.css](public/pico.min.css)
- [src/actions.ts](src/actions.ts) (search logic — see `searchMovie`)
  - Symbol: [`searchMovie`](src/actions.ts)
- [src/App.tsx](src/App.tsx) (entry UI and form wiring)
  - Symbol: [`App`](src/App.tsx)
- [src/main.tsx](src/main.tsx) (app bootstrap)
- [src/storage.ts](src/storage.ts) (persistence helpers)
- [src/types.ts](src/types.ts) (shared types)
- [src/constants.ts](src/constants.ts) (app constants)
- [src/App.css](src/App.css) • [src/index.css](src/index.css)
- [src/components/SearchMovieList.tsx](src/components/SearchMovieList.tsx) (list renderer)
  - Symbol: [`SearchMovieList`](src/components/SearchMovieList.tsx)
- [src/assets/](src/assets/)

Architecture & data flow (what to know)
- The UI is a single routeless page rendered by [`App`](src/App.tsx). The search form uses an action hook and submits to a handler exported from [`src/actions.ts`](src/actions.ts) (`searchMovie`), which returns data consumed by the component tree.
- Components prefer small, presentational components under `src/components/`. Data shapes are declared in [`src/types.ts`](src/types.ts) and persisted via helpers in [`src/storage.ts`](src/storage.ts).
- Styling is global CSS files under `src/` and a small utility CSS in `public/pico.min.css`.

Developer workflows
- Use package scripts in [package.json](package.json) for dev/build/test (open file to confirm exact commands).
- Vite is configured by [vite.config.ts](vite.config.ts); use `npm run dev` / `npm run build` as defined in package.json.
- To debug form/search flow: open [`src/App.tsx`](src/App.tsx) to inspect `useActionState` usage and the `form` `action` prop that receives `formAction` returned from the hook.

Project-specific conventions
- Action-driven form submission: App wires a form to an action hook (see [`src/App.tsx`](src/App.tsx)). Follow this pattern when adding new forms (return data and pending state similarly).
- Prefer small single-responsibility files: search logic in [`src/actions.ts`](src/actions.ts), persistence in [`src/storage.ts`](src/storage.ts), types in [`src/types.ts`](src/types.ts).
- Components should accept typed props from [`src/types.ts`](src/types.ts) where applicable.

Common tasks — where to start
- Add a new search UI: modify [`src/App.tsx`](src/App.tsx) and extend [`src/actions.ts`](src/actions.ts) to expose a new action.
- Add a new presentational component: create under `src/components/` and import in `App` or other container components.
- Adjust persistent caches: edit [`src/storage.ts`](src/storage.ts).

Code examples (patterns to copy)
- Wiring a search form (see [`src/App.tsx`](src/App.tsx)):
  - Use the action hook to get `[data, formAction, isPending]`
  - Submit via `<form action={formAction}>` and render results when `data` is present
- Render list component:
  - `<SearchMovieList data={data} />` where `SearchMovieList` is in [`src/components/SearchMovieList.tsx`](src/components/SearchMovieList.tsx)

Notes and gotchas
- `useActionState` is used in [`src/App.tsx`](src/App.tsx); ensure any refactors preserve the form action pattern.
- Confirm runtime scripts in [package.json](package.json) before running commands.

If any of the linked files or symbols are out of date or you want the instructions tailored toward tests, CI, or new feature scaffolding, tell me which area to expand.