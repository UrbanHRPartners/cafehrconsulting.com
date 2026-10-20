# Production readiness — 2026-09-29

| Area | Status | Evidence / action |
|---|---|---|
| Public experience and responsive UI | Green | Existing enterprise experience retained; covered by automated page, interaction, language, workflow and responsive tests. |
| Lead, recruiting, ATS, Company Intelligence, advice and analytics intake | Green locally | Server-side validation, CSRF, rate limits, SQLite persistence and governed outbox are implemented. External system delivery remains connector-dependent. |
| Auth, RBAC, tenant boundary and audit logging | Green locally | Exercised by automated role and tenant tests. MFA is fail-closed when enabled but needs a production identity provider. |
| HTTPS and secure cookies | Green in deployment package | Caddy provides certificate automation; production startup rejects insecure cookie mode. DNS and hosting are still required. |
| Host validation and browser hardening | Green | Trusted-host enforcement, HSTS in production, CSP, frame denial, no-sniff, referrer, permissions and cross-origin headers are implemented. |
| Data persistence | Green for AWS provisioning | Local preview retains SQLite WAL. Production automatically selects PostgreSQL through `DATABASE_URL` or standard `PG*` settings; an idempotent SQLite-to-PostgreSQL migration tool is included. Live RDS execution still requires an AWS account. |
| Search and sharing metadata | Green | Canonical URL, Open Graph, robots, sitemap and web manifest are included. |
| UrbanXentra/CRM/Company360/HRIS/ATS/Projects/Academy/Analytics/Urban360/UrbanOne/ODA | Amber | Governed registry exists; approved public gateway URL, credentials and connector verification are not supplied. |
| WhatsApp Business agent/API | Amber | Branded UI and approved-number handoff exist. Meta Business verification, API credentials, templates, webhook and staffed agent routing are not supplied. |
| Instagram and Facebook | Amber | Integration boundary exists. Exact approved profile URLs and Meta credentials are not supplied; no links are fabricated. |
| Email delivery | Amber | Institutional address is configurable. A verified provider/domain and delivery credentials are not supplied. |
| Legal/privacy/compliance approval | Red before public data collection | Counsel-approved notice, terms, retention, cross-border transfer language and cookie/analytics classification are not supplied. |
| Domain publication | Red | No DNS, hosting or registrar credentials are available in this workspace. No deployment claim is made. |

## Approved hosting target

AWS is the selected non-Azure enterprise target. The repository includes a CloudFormation definition for CloudFront, WAF, an origin-restricted Application Load Balancer, private ECS Fargate tasks, encrypted Multi-AZ RDS PostgreSQL, Secrets Manager, private versioned S3 media storage, CloudWatch, autoscaling, Route 53 and certificate bindings. Deployment remains unexecuted until the AWS account, network, certificates, hosted zone and immutable ECR image are available and verified.

## Release gate

The codebase is packaged for a controlled AWS production launch. Public DNS cutover should occur only after the red items are closed, the CloudFormation change set has been reviewed, PostgreSQL migration has been reconciled, and the amber connectors intended for launch have been verified end-to-end.
