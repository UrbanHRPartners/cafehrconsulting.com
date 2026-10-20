# Vendor-neutral container deployment

The root `Dockerfile` is an OCI-compatible deployment artifact for any host that supports persistent services and PostgreSQL, including Kubernetes, OpenShift, Render, Railway, Fly.io, DigitalOcean, Oracle Cloud and compatible private infrastructure.

## Runtime contract

- Start command: the image default, `python server.py`.
- Listen address: set `HOST=0.0.0.0`.
- Port: set the provider-supplied `PORT`; default is `8787`.
- Health endpoint: `/api/health`.
- Production controls: `UHR_PRODUCTION=1`, `UHR_SECURE_COOKIES=1`, and exact comma-separated `UHR_TRUSTED_HOSTS`.
- Database: use `DATABASE_URL` or `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD` and `PGSSLMODE` from the provider secret store.
- Integration boundary: set `UHR_INTEGRATION_BASE_URL` only to the approved public HTTPS UrbanXentra gateway. A missing connector fails closed in production.
- Minimum availability: two application instances across separate failure domains and a managed HA PostgreSQL service.
- Edge: TLS 1.2+, WAF, rate limiting, DDoS mitigation and origin access controls.
- Persistence: do not use the container filesystem for production records or final media.

The provider must support immutable image deployment, secret rotation, health probes, rolling rollback, centralized logs, encrypted backups, restore testing, custom-domain TLS and controlled database networking. A static-only host is insufficient because ATS, recruiting, advice, analytics, login, RBAC and audit functionality require the server application.
