# Backend Evidence Discovery

Use this reference when diagnosing APIs, workers, pipelines, libraries, or algorithms. Prefer local/minimal reproduction and read-only signals until the user approves mutations.

## Source Discovery Checklist

Look for these in the current project:

- Test runners and scripts (`package.json`, `Makefile`, `pytest`, `cargo test`, `go test`, CI workflows).
- API contracts (OpenAPI, GraphQL SDL, protobuf, Zod/io-ts/types).
- Job/queue systems (Trigger.dev, Inngest, Temporal, Sidekiq, SQS, Kafka, BullMQ).
- DB clients and migrations (Prisma, Drizzle, Alembic, Flyway, Convex).
- Observability (OpenTelemetry, Sentry, Datadog, structured logs, Prometheus).
- Bench/profile tools (hyperfine, `node --prof`, `go test -bench`, `cargo flamegraph`, clinic/0x).

## Safe Reproduction Patterns

- Shrink to a unit or integration test that fails deterministically.
- Freeze time/seed when flakiness depends on randomness or clocks.
- Capture redacted request/response or fixture diffs; avoid full production dumps.
- For load/timeout bugs, record input size `n`, concurrency, and p50/p95 latency — not just “slow.”
- For races, try `--repeat`, stress loops, or controlled concurrency before claiming a fix.

## Correlation Fields

Prefer stable, non-secret identifiers:

- Request/trace/span ID, job/run ID, message ID, idempotency key.
- Tenant/org/user ID (when needed for isolation bugs).
- Commit SHA, deploy version, environment.
- Test name, fixture path, seed.

## Common Failure Patterns

- Off-by-one / wrong comparator / unstable sort assumptions.
- Retry without idempotency creating duplicates or double side effects.
- Cache or replica lag treated as authoritative state.
- Async race: read before write completes; shared mutable state.
- Algorithm correct for tiny fixtures but O(n²) or memory blow-up at real `n`.
- Schema/API contract drift between producer and consumer.
- Fail-open on missing auth/tenant context.
- Partial pipeline success with no compensating transaction or dead-letter path.
- Floating-point / integer overflow / timezone boundary bugs.
- Flaky tests masking non-deterministic production behavior.
