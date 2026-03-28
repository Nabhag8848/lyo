# LYO

**Stop Guessing. Start Wearing.**

## What this project is

LYO is a **virtual fitting room for [Myntra](https://www.myntra.com)**. Shoppers upload a full-body photo once, get avatars in multiple poses, then try garments on those avatars while browsing product pages. Favorites land in a **virtual wardrobe** so they can compare looks before buying.

At a high level:

1. **Create your avatar** — Upload a full-body photo; the product generates multiple pose variants so users can pick the best likeness.
2. **Try on clothes** — On Myntra, use try-on so garments appear on the selected avatar.
3. **Virtual wardrobe** — Saved try-ons accumulate for review while shopping.

The stack pairs a **browser extension** (injected UI on Myntra, side panel, background work) with a **NestJS API** (auth, credits, wardrobe, asset storage, job queues, and integration with virtual try-on providers). A **marketing site** mirrors the story and CTAs from [lyo.fashion](https://lyo.fashion); a **dashboard** app supports authenticated web flows aligned with `APP_URL` in server configuration.

## Monorepo layout

| App / area | Role |
|------------|------|
| `apps/lyo-server` | NestJS backend: REST API, TypeORM + PostgreSQL, Redis, BullMQ, S3-compatible storage, OAuth, throttling |
| `apps/lyo-extension` | WXT + React extension (Chrome MV3 and other targets via WXT) |
| `apps/lyo-website` | Vite + React marketing site |
| `apps/lyo-dashboard` | Vite + React dashboard (dev server defaults to port `3001`) |

Tooling: **Nx** workspaces, **pnpm** (`packageManager` in root `package.json`), **TypeScript**.

## Prerequisites

- **Node.js** compatible with the repo (see current LTS used by your team).
- **pnpm** — version pinned via `packageManager` in root `package.json` (run `corepack enable` and `corepack prepare` if you use Corepack).
- **PostgreSQL** and **Redis** reachable from the values in `apps/lyo-server/.env`.
- **S3-compatible storage** — local dev often uses [LocalStack](https://localstack.cloud/) (see comment in `apps/lyo-server/.env.example` for bucket creation).
- For real try-on generation: **Fashn AI** (or equivalent) credentials where the server expects them (`FASHN_AI_API_KEY`, webhook secret in `apps/lyo-server/.env.example`).

## Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Environment files

Copy examples and fill in secrets:

| Location | Purpose |
|----------|---------|
| `apps/lyo-server/.env.example` → `.env` | API, DB, Redis, S3, JWT, Google OAuth, Fashn, Sentry, throttling |
| `apps/lyo-website/.env.example` → `.env` | `VITE_SERVER_URL`, `VITE_APP_URL` |
| `apps/lyo-extension/.env.example` → `.env` | `VITE_SERVER_URL`, `VITE_CLIENT_DOMAIN` |

Keep URLs consistent: server defaults include `SERVER_URL`, `FRONT_URL` (e.g. marketing on `4200`), and `APP_URL` (dashboard on `3001`) as in `.env.example`.

### 3. Database migrations

With `apps/lyo-server/.env` configured:

```bash
pnpm exec nx run @lyo/lyo-server:migration:deploy
```

Other migration targets (`migration:revert`, `migration:generate`, etc.) are defined on the same project in `apps/lyo-server/project.json`.

### 4. Run services locally

Start PostgreSQL, Redis, and (if used) LocalStack before the API.

**Backend** (build + nodemon by default):

```bash
pnpm exec nx serve @lyo/lyo-server
```

**Marketing site** (port `4200` per `apps/lyo-website/vite.config.mts`):

```bash
pnpm exec nx serve lyo-website
```

**Dashboard** (port `3001` per `apps/lyo-dashboard/vite.config.ts`):

```bash
pnpm exec nx serve lyo-dashboard
```

**Browser extension** (WXT dev server; e.g. Chrome):

```bash
pnpm exec nx run @lyo/lyo-extension:dev:chrome
```

Load the unpacked extension from `apps/lyo-extension/dist/<browser>-mv3-dev` (exact folder name follows WXT output). Production builds: `pnpm exec nx run @lyo/lyo-extension:build:chrome` (and sibling targets for other browsers).

### 5. Verify Nx project names

```bash
pnpm exec nx show projects
```

Use the printed names if any differ from the examples above after workspace changes.

## Useful commands

```bash
pnpm exec nx run @lyo/lyo-server:build
pnpm exec nx build lyo-website
pnpm exec nx build lyo-dashboard
pnpm exec nx run @lyo/lyo-extension:build:chrome
```

Tests and lint targets follow each project’s Nx configuration (`pnpm exec nx test <project>`, `pnpm exec nx lint <project>` where configured).

## Product and pricing

Plans, credit bundles, and customer-facing copy should match **[lyo.fashion](https://lyo.fashion)**. This README stays technical; marketing and legal pages live in `apps/lyo-website` and on the live site.

## License

MIT — see `package.json` / repository license file if present.
