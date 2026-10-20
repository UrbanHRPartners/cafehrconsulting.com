# UrbanHRPartners Consulting — publication candidate 2026.10.05.1

## Release status

The existing UrbanHRPartners website and governed gateway are packaged as a portable production candidate. The approved public design, logo, Xyomara master, multilingual experience, recruiting/ATS workspaces, Company Intelligence, Company360/Urban360 boundaries, global pathways, Media Center and WhatsApp handoff remain intact.

## Verified in this candidate

- 28 automated tests pass.
- Production-mode startup succeeds with secure cookies enabled.
- `/api/health` returns HTTP 200 and reports production mode.
- Unapproved hostnames return HTTP 421.
- Internal reference media returns HTTP 403.
- Anonymous CSRF and application rate-limit state use the shared database for multi-instance consistency.
- Controlled reverse-proxy visitor IP handling is enabled in the supplied AWS, Google Cloud and Docker Compose definitions.
- PostgreSQL, Docker/OCI, AWS ECS/RDS/CloudFront/WAF, Google Cloud Run/Cloud SQL and generic managed-container paths are included.
- Development databases, test artifacts, evidence files, caches, internal source media and secrets are excluded from the publication archive.

## Required before public DNS cutover

1. Choose and provision the production host. AWS remains the recommended enterprise target; Google Cloud and generic managed-container deployment are also packaged.
2. Supply account, project, VPC/network, certificate, DNS and immutable container-registry values for the selected provider.
3. Provision managed PostgreSQL and perform the controlled migration/restore test.
4. Approve the privacy notice, terms, retention schedule, analytics classification and cross-border data language.
5. Configure only the integrations required at launch: institutional email, UrbanXentra gateway, WhatsApp Business Platform, Meta profiles/API and MFA provider.
6. Run the post-deployment checklist against the provider hostname before moving `urbanhrpartnersconsulting.com` DNS.

No public deployment, domain cutover, external connector operation or certification is claimed by this release file.
