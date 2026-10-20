# AWS enterprise deployment

This target hosts the existing UrbanHRPartners website; it does not create a different website or duplicate UrbanXentra system-of-record data.

## Architecture

- CloudFront, AWS WAF and TLS for the global public edge.
- An Application Load Balancer restricted to CloudFront origin-facing addresses.
- Two or more ECS Fargate tasks across private subnets, with automatic rollback and request-based scaling.
- Multi-AZ encrypted RDS PostgreSQL with 35-day automated backup retention and deletion protection.
- Private, encrypted, versioned S3 storage for approved media.
- Secrets Manager for generated database credentials.
- CloudWatch logs and ECS Container Insights.

## Account prerequisites

1. An AWS production account protected by IAM Identity Center/MFA and separate from development.
2. A VPC with public subnets for the load balancer and private subnets with controlled egress for ECS and RDS, spread across at least two Availability Zones.
3. A Route 53 public hosted zone for `urbanhrpartnersconsulting.com` or an approved DNS-transfer plan.
4. Valid ACM certificates for the apex and `www`: the CloudFront certificate must be in `us-east-1`; the ALB certificate must be in the stack region.
5. An immutable application image pushed to Amazon ECR.

## Release sequence

1. Build and test the image locally.
2. Push it to ECR and record the immutable digest URI.
3. Validate `template.yaml` with CloudFormation and run a change set—never deploy an unreviewed change directly.
4. Deploy first without moving public DNS when possible, then test the CloudFront hostname.
5. Migrate the backed-up SQLite data to RDS with `scripts/migrate_sqlite_to_postgres.py` during a controlled write freeze.
6. Run all page, language, form, ATS, recruiting, WhatsApp, auth, RBAC, tenant, analytics and integration-boundary checks.
7. Move DNS only after the go/no-go review. Retain the previous hosting target for rollback.

## Required commands

Use the AWS console or an authenticated AWS CLI session. Do not place passwords, access keys or database URLs in source control or shell history. The exact commands depend on the approved AWS account, region, VPC, subnets, certificates and ECR repository and must be generated only after those values are known.

## Deliberately not claimed

This repository does not prove that an AWS account, Route 53 zone, ACM certificate, Meta/WhatsApp account, production email provider, MFA provider or UrbanXentra connector exists. Those items must be verified in the production account before publication.
