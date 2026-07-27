# Planning Checklist

Use this checklist for complex or high-risk GitHub issues.

## Context

- Confirm the repository, issue number, title, URL, state, labels, milestone, and acceptance criteria.
- Review issue comments for decisions, objections, prior attempts, screenshots, logs, and links.
- Inspect relevant code before planning. Prefer `rg` and targeted file reads.
- Identify existing tests and commands from `package.json`, `Makefile`, CI config, docs, or project scripts.

## Requirements

- State the user-visible behavior or developer-facing contract.
- Distinguish must-haves from nice-to-haves.
- Name non-goals to prevent accidental scope creep.
- List assumptions separately from confirmed facts.
- Identify data model, API, UI, permissions, billing, telemetry, accessibility, performance, and deployment requirements.

## Implementation

- Follow existing architecture, naming, styling, validation, and error-handling patterns.
- Prefer small, reviewable steps with clear file ownership.
- Include migration, backfill, and backward compatibility steps when data contracts change.
- Include feature flag, rollout, or kill-switch strategy when behavior is risky or customer-visible.
- Include observability and privacy-safe telemetry when the project already uses it for similar work.
- Note dependency changes and why they are necessary.

## Documentation

- Update user-facing docs for changed workflows, settings, CLI/API usage, or public behavior.
- Update developer docs for new conventions, environment variables, migrations, deployment steps, or testing workflows.
- Update examples, fixtures, API reference, or changelogs when they are part of the project standard.
- Avoid noisy comments; add inline comments only around non-obvious logic or operational hazards.

## Testing

- Unit-test pure logic and edge cases.
- Integration-test API, database, auth, billing, entitlement, workflow, or service boundaries.
- End-to-end-test critical user journeys and regressions.
- Add migration or fixture tests for schema changes.
- Include lint, typecheck, build, and existing CI-equivalent commands.
- Include manual QA for UI, accessibility, responsive layout, browser behavior, and third-party integrations when automation is insufficient.

## Breakage Review

- Backward compatibility: existing API clients, saved data, persisted URLs, imports, config, and public contracts.
- Data integrity: schema migrations, indexes, backfills, deletes, idempotency, retries, and partial failure.
- Auth and permissions: role checks, tenant isolation, protected routes, server-side enforcement, and audit trails.
- Billing and entitlements: access gates, usage limits, plan changes, audit records, and source of truth.
- Performance: query shape, indexes, pagination, caching, bundle size, render loops, and cold starts.
- Privacy and security: secrets, PII, logging, analytics payloads, prompt contents, and external service calls.
- UI regressions: responsive layout, text overflow, keyboard navigation, focus states, loading, empty, and error states.
- Operations: environment variables, deployment order, CI, monitoring, rollback, and support impact.
