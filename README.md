# BTC Bit test — Next.js App

## Why Feature‑Sliced Design (FSD)?

- **Less coupling**: Features and domains are isolated. Changes remain local, reducing cross‑module breakage.
- **Easy to navigate**: Clear, predictable layer boundaries make it fast to find code by responsibility.
- **Easy to expand**: New features can be added as self‑contained slices without rewriting existing parts.

### FSD layers used here

- **`src/app`**: Next.js app router, route files, root layout, providers.
- **`src/shared`**: Reusable, app‑agnostic code (UI primitives, libs, utilities, styles, types, API setup).
- **`src/entities`**: Business entities and their logic (types, API clients, services, entity UI).
- **`src/features`**: User‑facing capabilities composed from entities/shared (e.g., sign‑in, sorting, pagination).
- **`src/widgets`**: Page‑level building blocks that compose features and entities (e.g., balances grid).
- **`src/views`**: Page/view assemblies for concrete routes; orchestrate widgets/features for a screen.

Keeping these layers separate minimizes accidental coupling and maximizes reuse.

## Technologies

- **Framework**: Next.js (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **UI**: HeroUI components
- **State**: Redux Toolkit, React Redux
- **HTTP**: Axios (with centralized config and error handling)
- **Testing**: Jest, @testing-library/react, jest‑dom, jsdom
- **Quality**: ESLint (v9), Prettier
- **Git hooks**: Husky + lint‑staged (run tests and format/lint on commit)

## Auth and storage

- User information is stored in cookies. It is not stored in `sessionStorage` or `localStorage`.

## Project scripts

- **`npm run dev`**: Start dev server (Turbopack)
- **`npm run build`**: Production build
- **`npm start`**: Start production server
- **`npm run test` / `npm run test:watch`**: Run tests
- **`npm run lint`**: ESLint (with `--fix`)
- **`npm run prettier`**: Prettier formatting

Git hooks are installed via `npm run prepare` (Husky). On commit, tests run first, then `lint-staged` formats and lints staged files.

## Structure (high level)

```
src/
  app/            # Next.js app router (layouts, pages)
  shared/         # API config, UI primitives, libs, utilities, styles, types
  entities/       # Domain entities (types, API, services, entity UI)
  features/       # User capabilities (auth, filters, sorting, pagination)
  widgets/        # Page-level blocks (compose features/entities)
  views/          # Page assemblies (compose widgets for routes)
```

## Setup

1. Install deps: `npm install`
2. Start dev: `npm run dev`
3. Run tests: `npm test`

## Docker

This project ships with a multi-stage Dockerfile that produces a small production image using Next.js standalone output.

### Build

```
docker build -t btcbit-app .
```

### Run

```
docker run --rm -p 3000:3000 \
  --env NODE_ENV=production \
  --env HOSTNAME=0.0.0.0 \
  --name btcbit btcbit-app
```

Then open `http://localhost:3000`.

### Environment variables

- Create a local `.env.local` for development.
- For Docker/production, pass variables via `--env` or an env file:

```
docker run --env-file ./.env.production -p 3000:3000 btcbit-app
```

The Dockerfile expects Next.js `output: 'standalone'` (already configured in `next.config.js`).
