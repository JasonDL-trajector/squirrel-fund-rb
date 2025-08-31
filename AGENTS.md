# Repository Guidelines

## Project Structure & Module Organization
- `src/app`: Next.js App Router pages, layouts, and route groups (e.g., `(DashboardLayout)`).
- `src/components`, `src/hooks`, `src/utils`: Shared UI, reusable hooks, and helpers (path alias `@/*`).
- `convex`: Convex backend functions, schema, and generated API clients.
- `public`: Static assets (images, icons, manifest).
- `.env`, `.env.local`: Local configuration; never commit secrets.

## Build, Test, and Development Commands
- `npm run dev`: Start Next.js in development mode (Turbo). Open http://localhost:3000.
- `npx convex dev`: Run Convex locally in a separate terminal for backend functions.
- `npm run build`: Create a production build.
- `npm start`: Serve the production build.
- `npm run lint` (add `-- --fix` to auto-fix): Lint with Next.js ESLint rules.

Example (two terminals):
```
# Terminal 1
npx convex dev
# Terminal 2
npm run dev
```

## Coding Style & Naming Conventions
- **Language**: TypeScript (`strict: true`).
- **Linting**: ESLint with `next/core-web-vitals`. Keep warnings at zero before PR.
- **Formatting**: Prefer 2-space indent; run `npm run lint -- --fix` before pushing.
- **Components**: PascalCase file and component names (e.g., `BalanceHistory.tsx`).
- **Functions/vars**: camelCase. **Routes/folders**: lowercase-kebab (App Router segments).
- **Imports**: Use `@/` alias for `src` (see `tsconfig.json`).

## Testing Guidelines
- No test runner is configured yet. When adding tests:
  - Co-locate files as `*.test.ts`/`*.test.tsx` next to source.
  - Prefer React Testing Library for components; mock Convex via generated clients.
  - Keep tests deterministic; avoid network and real auth.

## Commit & Pull Request Guidelines
- **Commits**: Concise, imperative mood, scoped when helpful.
  - Examples: `balance history`, `bills sorting and date format`, `Enhance Mantine theme styling`.
- **PRs** must include:
  - Clear description (what/why), linked issue(s).
  - Screenshots/GIFs for UI changes.
  - Notes on config/env changes (`.env.local`) and migration steps if any.
  - Passing lint and a clean local run (`npm run dev`).

## Security & Configuration Tips
- Required env keys: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `NEXT_PUBLIC_CONVEX_URL`, and any Convex deployment vars.
- Store secrets only in `.env.local`; do not commit. Rotate if exposed.
