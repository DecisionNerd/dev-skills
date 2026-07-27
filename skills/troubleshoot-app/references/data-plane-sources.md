# Data-Plane Source Discovery

Use this reference when a live app diagnosis needs current data. Keep queries read-only until the user approves mutations or explicitly asks for a fix.

## Source Discovery Checklist

Look for these in the current project:

- `.env*`, deployment config, app config, and package scripts.
- Database clients and CLIs such as Convex, Prisma, Drizzle, Supabase, Firebase, Mongo, Postgres, Redis, Airtable, BigQuery, Snowflake.
- Auth providers such as Clerk, Auth0, Descope, Supabase Auth, NextAuth.
- Billing providers such as Stripe, Paddle, Lemon Squeezy, RevenueCat.
- Analytics and feature flags such as PostHog, LaunchDarkly, Statsig, Amplitude, Segment.
- Deployment/log sources such as Vercel, Netlify, Cloudflare, Fly, Render, AWS, GCP, Azure.
- Background jobs such as Trigger.dev, Inngest, Temporal, queues, cron, webhooks.

## Read-Only Query Patterns

Examples are patterns, not requirements:

- Convex:
  - `pnpm exec convex data <table> --format json`
  - `pnpm exec convex run --inline-query '<readonly query>' --typecheck disable`
- SQL:
  - Use project-approved CLI or read-only connection.
  - Select only needed columns, filter by stable IDs, and limit rows.
- Clerk:
  - Use Backend API read endpoints for users, organizations, sessions, and memberships.
  - Compare provider metadata with application database profiles/mirrors.
- Stripe:
  - Read customer, subscription, checkout session, invoice, and webhook event by ID.
  - Do not create portal/checkout sessions or alter subscriptions during diagnosis.
- PostHog:
  - Use a personal/read API key if available; public project keys cannot read events.
  - Query by event name, distinct id, organization id, route, claim/session id, or timestamp.
  - Treat missing analytics as inconclusive if ad blockers, SDK load failures, or missing API access are possible.
- Vercel:
  - Check deployment URL, branch, commit SHA, build logs, env target, and deployment status.
  - Immutable preview URLs do not update after a later deploy.

## Correlation Fields

Prefer stable, non-secret identifiers:

- User/provider id, organization/account id, tenant/workspace id.
- Public route id, claim/order/session id, subscription/customer id.
- Deployment URL, commit SHA, branch, environment.
- Event name, timestamp, feature flag key, rollout variant.

## Common Failure Patterns

- UI shows provider state but app database mirror is missing or stale.
- Provider metadata exists but app completion job failed halfway.
- Feature flag or entitlement seed data is missing in one environment.
- User is viewing an old immutable preview deployment.
- Webhook created partial data but a retry path is not idempotent.
- Active tenant in the browser differs from the tenant used by the API/database query.
- Analytics recorded a denial, but the application database has the authoritative reason.
- Logs point to a missing env var, stale secret, wrong deployment target, or blocked provider callback.
