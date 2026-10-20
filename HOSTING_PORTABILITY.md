# Hosting portability matrix

| Target | Runtime | Database | Global edge/security | Status |
|---|---|---|---|---|
| AWS | ECS Fargate | Multi-AZ RDS PostgreSQL | CloudFront + WAF | Infrastructure package prepared; account validation and deployment pending. |
| Google Cloud | Cloud Run | HA Cloud SQL PostgreSQL | Global load balancer + CDN + Cloud Armor | Service package prepared; project validation and deployment pending. |
| Generic enterprise host | OCI container | Managed HA PostgreSQL | Provider TLS/WAF/CDN | Runtime contract prepared; provider-specific infrastructure pending. |
| Google Workspace | Not an application host | Not applicable | Not applicable | Suitable for email, groups and identity; not suitable for this dynamic website runtime. |

The website remains one controlled codebase. Hosting configuration does not alter the approved public design, Xyomara, logo, service workflows, languages or system-of-record boundaries.
