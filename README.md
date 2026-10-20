# UrbanHRPartnersConsulting.com — Website Factory project

This is the operational public experience and governed gateway for the existing UrbanHRPartners ecosystem. It does not duplicate CRM, Company360, HRIS, ATS, Projects, Academy, Analytics, UrbanOne or ODA records.

## Run locally

1. Create the first administrator from a trusted local terminal: `python server.py --create-admin`
2. Start the gateway: `python server.py --host 127.0.0.1 --port 8787`
3. Open `http://127.0.0.1:8787`

For HTTPS production hosting set `UHR_SECURE_COOKIES=1`, place the service behind a hardened TLS reverse proxy, configure the institutional email and approved social channels in `config/site.json`, and replace the loopback integration base URL only with a reviewed gateway endpoint. Production may use PostgreSQL through `DATABASE_URL` or standard `PG*` environment variables; local development and automated tests remain on SQLite. Portable deployment targets are documented under `deploy/aws`, `deploy/gcp` and `deploy/generic`; every target requires account-native validation and an immutable image digest.

## Data boundaries

- Website-owned: leads, preliminary assessments, session/access data, audit records, and integration delivery outbox.
- System-of-record-owned: CRM/company records, HRIS employees, ATS applicants, projects, learning completions, analytics, UrbanOne and ODA data.
- The supplied institutional MP4 is stored under `assets/media/source/` as internal reference-only media and is denied by the public server.
- Xyomara and the supplied logo are byte-identical controlled master assets. The site does not transform or regenerate Xyomara.

## Security state

Implemented: PBKDF2-SHA256 passwords, HttpOnly sessions, CSRF protection, login/lead throttling, RBAC, tenant identity boundaries, security headers, public/internal media boundary and audit logging. MFA state is modeled fail-closed, but a verifier and enrollment flow are not yet configured. Password reset storage is prepared; email delivery and recovery UI remain blocked on an approved institutional mail provider.

## Tests

Run `python -m unittest discover -s tests -v`. Tests use an isolated temporary database and do not alter production data.
