# AGENTS

## Repo shape (what matters)
- Single-package SvelteKit app (no monorepo/workspaces).
- Main route is `/` only: `src/routes/+layout.ts` redirects every non-root path to `/`, with `prerender = true` and `ssr = false`.
- UI entrypoint is `src/routes/+page.svelte` -> `Table` component; most state is in `src/lib/context/*.svelte.ts`.
- Entity data is static JSON under `src/lib/entities/`; categories/headings are wired in `src/lib/entities/index.ts`.

## Commands (use these exact scripts)
- Install: `npm ci`
- Dev server: `npm run dev`
- Lint: `npm run lint`
- Typecheck: `npm run check` (runs `svelte-kit sync` first)
- Build: `npm run build`
- Full e2e flow: `npm test` (starts dev server, waits for `http://localhost:5173`, then runs Cypress)
- Cypress only: `npm run test:e2e` or interactive `npm run test:open`

## Verification order
- Match CI order before finishing major changes: `npm run lint` -> `npm run check` -> `npm run build` -> `npm test`.

## Testing and env quirks
- Cypress `baseUrl` is hardcoded to `http://localhost:5173` in `cypress.config.ts`; if that port is occupied locally, `npm test` can fail even when app starts on another port.
- Cypress artifacts are ignored (`cypress/screenshots/*`, `cypress/videos/*`); do not commit generated test outputs.

## CI / release / deploy flow
- CI workflow: `.github/workflows/release.yml` on pushes to `main`, `develop`, `next`.
- `test` job runs lint, typecheck, build, then `npm test`.
- `release` job runs semantic-release (`release.config.cjs`) and updates `package.json` version via `scripts/release-update-version.sh`.
- Deploy is Netlify build-hook based; `netlify.toml` `ignore` prevents normal git-triggered Netlify builds unless hook-triggered.

## Agent-specific notes
- Repo has OpenCode Svelte plugin configured in `.opencode/opencode.json`; keep Svelte/SvelteKit conventions unless the user asks otherwise.
- Keep browser-only APIs guarded in context modules (`window`/`localStorage`) because these files are imported globally.

## Svelte MCP server

You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

### Available Svelte MCP Tools:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.
