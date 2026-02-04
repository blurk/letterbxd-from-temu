# GEMINI.md

## Project Overview

This is a "My Movie Diary" web application. It's built with React, TypeScript, and Vite. The app allows users to search for movies and manage a personal watchlist. It appears to fetch movie data from an external API (likely The Movie Database) and uses `pico.min.css` for lightweight styling. The watchlist is stored locally in the browser's `localStorage`.

The application uses modern React features, including the `useActionState` hook for form handling.

## Building and Running

**Prerequisites:**
* Node.js and npm

**Key Commands:**

*   **Install dependencies:**
    ```bash
    npm install
    ```
*   **Run the development server:**
    ```bash
    npm run dev
    ```
*   **Build for production:**
    ```bash
    npm run build
    ```
*   **Lint the code:**
    ```bash
    npm run lint
    ```
*   **Preview the production build:**
    ```bash
    npm run preview
    ```

**NOTE:** The application requires an API key for fetching movie data. This key is expected to be in a `src/constants.ts` file, which is not checked into version control. You will need to create this file and add the API key to it.

Example `src/constants.ts`:
```typescript
export const KEY = "YOUR_API_KEY";
export const URL_API = "https://api.themoviedb.org/3";
export const URL_MEDIA = "https://image.tmdb.org/t/p/w500";
```

## Development Conventions

*   **Language:** TypeScript
*   **UI Framework:** React
*   **Build Tool:** Vite
*   **Styling:** `pico.min.css` is used for base styling, with additional custom styles in `src/App.css` and `src/index.css`.
*   **State Management:** Component state and the `useActionState` hook are used for managing UI and form state. Global state for the watchlist is managed via a `Storage` class that interacts with `localStorage`.
*   **API Interaction:** Movie data is fetched from an external API in `src/actions.ts`.
*   **Code Quality:** ESLint is configured for linting.
*   **File Structure:**
    *   `src/components`: Contains reusable React components.
    *   `src/actions.ts`: Handles API calls and business logic.
    *   `src/storage.ts`: Manages persistence to `localStorage`.
    *   `src/types.ts`: Defines TypeScript types for the application data.
    *   `src/constants.ts`: Stores constants like API keys and URLs.
