# HabitSync

A Next.js web application built for a Cloudflare application assessment. This repository contains the front-end and server-side code for a habit-tracking app that demonstrates modern web patterns, Cloudflare integration options, and operational best practices for security, performance, and reliability.

## Project overview

HabitSync is a Next.js application for tracking daily habits, with a focus on being deployable and testable on Cloudflare infrastructure. It demonstrates:

- Server-side and client-side rendering with Next.js
- Integration options for Cloudflare Workers

### Features

- User sign-up/sign-in with Google OAUTH
- Create, edit, and complete habits
- Progress analytics/streaks (UI + sample computations)
- Edge-friendly routing
- Configurable environment variables for external services (DB, storage)
- Example CI/CD pipeline to deploy to Cloudflare

### Tech stack

- Next.js (React)
- TypeScript
- Tailwind for styling
- Cloudflare Workers for deployment
- D1 for storage

## Getting started

### Prerequisites

- Node.js (16+ recommended; match the Node version used in your repo)
- npm / pnpm / yarn
- Cloudflare account for Workers deployment
- (Optional) Wrangler CLI for Workers: `npm i -g wrangler`

### Local Development

1. Clone the repo
   - `git clone https://github.com/Kway-Bait/cf_ai_habitsync.git`
   - `cd cf_ai_habitsync`

2. Install dependencies
   - npm install
   - or pnpm install
   - or yarn

3. Create a `.env` based on `.env.example`. Add required environment variables (see below).

4. Build database schema 
    - `wrangler d1 execute <db_name> --local --file="./schame.sql"`

5. Run development server
   - `npm run dev`
   - open [http://localhost:3000](http://localhost:3000)

### Scripts

- `dev` — Start Next.js in development mode
- `build` — Build the production app
- `start` — Start the production server (if applicable)
- `test` — Run tests

### Environment variables

Add a `.env`. Example variables for this project and replace with actual names used in your code:

```
GOOGLE_OAUTH_CLIENT_ID=
GOOGLE_OAUTH_CLIENT_SECRET=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
```

## Deployment to Cloudflare

### Cloudflare Workers

If you require Workers for custom edge logic:

1. Install Wrangler CLI: `npm i -g wrangler`
2. Configure `wrangler.jsonc`:
   - Add account_id, project name, compatibility flags, and routes.
3. Build for Workers or use a Next.js adapter for Workers.
4. Publish: `wrangler publish`

Useful links:
- Wrangler docs: https://developers.cloudflare.com/workers/wrangler/
- Deploy Next.js on Workers (adapter info): https://developers.cloudflare.com/

### CI / CD

Recommended approaches:
- Use Cloudflare Workers' Git integration for automatic builds on push.

Secret management:
- Store API tokens in Cloudflare Workers environment settings or GitHub Actions secrets.
- Limit token scopes to the minimum required.

