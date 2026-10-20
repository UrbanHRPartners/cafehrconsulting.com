# UrbanHRPartners Consulting production deployment

This package runs the existing UrbanHRPartners website and governed gateway behind automatic HTTPS. It does not duplicate UrbanXentra, CRM, Company360, ATS, HRIS, Projects, Academy, Analytics, Urban360, UrbanOne or ODA records. The preferred enterprise target is the AWS architecture in `deploy/aws`; the Docker Compose configuration remains a controlled single-node fallback.

## Before DNS cutover

1. Provision a Linux host with Docker Engine and the Compose plugin.
2. Restrict SSH, enable host patching, and allow inbound TCP 80/443 and UDP 443 only as required.
3. Copy this directory to the host. Do not copy the development database or `assets/media/source` reference media.
4. Copy `.env.production.example` to `.env`. Keep it outside source control.
5. Set `UHR_DOMAIN`. Set `UHR_INTEGRATION_BASE_URL` only to the approved public HTTPS UrbanXentra gateway.
6. Create the first administrator interactively inside the application container. Never place its password in a command, file, image, or shell history.
7. Obtain written approval for the privacy notice, cookie/analytics language, terms, retention schedule, and international data-transfer handling before public collection begins.

## Launch and verify

Run the production compose file, then verify:

- `https://urbanhrpartnersconsulting.com/api/health` returns `status: ok`.
- HTTP redirects to HTTPS and the certificate is valid for the apex and `www` hostnames.
- The canonical logo, Xyomara master, language selector, navigation, WhatsApp routes, five service workflows, ATS application, recruiting request, Company Intelligence, analytics consent, login and role boundaries operate on phone, tablet and desktop.
- Internal reference video returns 403.
- Unknown hostnames return 421.
- Authenticated portal links remain unavailable until the approved integration gateway is configured.

## Backup and rollback

The persistent database is stored in the `urbanhr_site_data` volume. Back up that volume and the deployed release before every update. Test a restore in a separate environment. Roll back by restoring the previous release and its matching database backup, then re-run the health and functional checks.

## External configuration still required

- DNS A/AAAA records for the apex and `www` hostnames.
- Production host or approved hosting provider.
- Institutional email delivery provider and verified sender domain.
- Approved Instagram and Facebook profile URLs/handles and Meta access credentials if API publishing or messaging is required.
- WhatsApp Business Platform account, verified business, approved phone-number ownership, templates, webhook secret and agent-routing provider. The current site routes users safely to the two approved WhatsApp numbers; it does not claim Meta API installation.
- UrbanXentra governed gateway URL and credentials.
- MFA identity provider, enrollment and recovery process.
- Monitoring, incident response, retention approval, legal review, penetration test and restore exercise.
