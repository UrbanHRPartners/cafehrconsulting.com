# Google Cloud enterprise deployment

This target runs the same approved UrbanHRPartners website container used by AWS and generic Docker hosts. Google Workspace may provide institutional email, groups and workforce identity, but it is not the runtime host for this dynamic application.

## Recommended production architecture

- Global external Application Load Balancer with Google-managed TLS.
- Cloud CDN and Cloud Armor in front of a serverless network endpoint group.
- Cloud Run with at least two warm instances, revision rollback and controlled autoscaling.
- High-availability Cloud SQL for PostgreSQL with point-in-time recovery.
- Secret Manager for database and connector credentials.
- Artifact Registry for immutable container images.
- Cloud Storage for approved media variants.
- Cloud Logging, Monitoring, alerting and audit logs.

Google recommends a global external Application Load Balancer for a Cloud Run custom domain because it supports Cloud CDN and Cloud Armor. Direct Cloud Run domain mapping is limited availability and is not the enterprise choice.

## Required account information

Before replacing the placeholders in `service.yaml`, obtain the Google Cloud project ID, billing account, region, service account, Cloud SQL connection name, versioned secrets, immutable Artifact Registry image, managed certificate and approved domain/DNS access.

## Release sequence

1. Build the root `Dockerfile`; scan it and push the immutable image to Artifact Registry.
2. Create HA Cloud SQL PostgreSQL, enable point-in-time recovery and test a restore.
3. Create versioned Secret Manager secrets and grant access only to the Cloud Run service account.
4. Replace all `REPLACE_*` values in `service.yaml`, then validate it in the authenticated project.
5. Deploy Cloud Run without changing public DNS. The Cloud SQL connection uses the encrypted Cloud SQL Auth Proxy Unix socket.
6. Add the serverless NEG, external Application Load Balancer, Cloud Armor, Cloud CDN and managed certificate. Restrict Cloud Run ingress so its default URL cannot bypass the load balancer and Cloud Armor.
7. Migrate the verified SQLite backup using `scripts/migrate_sqlite_to_postgres.py` during a controlled write freeze.
8. Run every page, language, CTA, service workflow, ATS, recruiting, WhatsApp, Company Intelligence, auth, RBAC, tenant and analytics test.
9. Move DNS only after the go/no-go review; retain the prior target for rollback.

No deployment, certification or external integration is claimed until the Google Cloud project and domain are verified.
