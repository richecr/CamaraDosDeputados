# Agent Guidance

## Project Map
- This is a React 19 single-page app built with Vite. `index.html` loads `src/index.js`, which mounts `src/App.js`; `src/routes.js` defines the React Router v7 routes.
- Put route-level screens in `src/pages/` and reusable UI in `src/components/`. Follow nearby patterns and keep component/page SCSS alongside its `index.js`.
- `src/helpers.js` owns the shared `useDadosAbertos` API and pagination hook. Prefer it for list requests when it fits; preserve the Câmara API's `dados` and `links` response handling.

## Changes and Checks
- Match the existing JavaScript formatting: two spaces, single quotes, and trailing commas. See `.editorconfig`, `.prettierrc`, and `.eslintrc.js` for current conventions.
- The app calls the public Câmara Dados Abertos v2 API directly from the browser. Account for network errors, loading state, and absent pagination links when changing data flows.
- Use `npm start` for Vite development, `npm run build` for production output, `npm run preview` to inspect that output, `npm test` for Vitest, and `npm run lint` for ESLint.
- `package.json` requires Node 26+ and npm 11+; `.nvmrc` selects Node 26. Dart Sass replaces `node-sass`; Bulma 1 uses its Sass module entry and still emits upstream Sass deprecation warnings during build.
- ESLint uses the flat config in `eslint.config.mjs`; keep it aligned with the project's React and JSX accessibility plugins.

## Project Docs
- See [README.md](README.md) for setup and project context.
- See [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution and pull request workflow.