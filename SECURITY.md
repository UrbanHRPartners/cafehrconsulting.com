# Security and integration readiness

The website is a gateway, not a new system of record. Every authenticated integration is filtered by role. The authenticated session carries one tenant identity, and no website API accepts a caller-supplied tenant override.

Production activation still requires: TLS and secure cookies; trusted reverse-proxy configuration; secret management; MFA provider and recovery process; institutional email provider; approved public origin/CORS policy if split-domain; governed connector credentials for UrbanHRPartners; retention/privacy policy; penetration testing; backup restore exercise; and monitoring/incident response ownership.

No compliance certification, production deployment, domain publication, email delivery, WhatsApp Business API, social publishing API, CRM delivery or MFA operation is claimed by this project until independently evidenced.

Anonymous CSRF tokens and application rate-limit events are stored in the configured shared database so protections remain consistent across multiple production instances. `UHR_TRUST_PROXY=1` is enabled only in the supplied private-origin deployment definitions; forwarded visitor IPs are accepted only when the application is placed behind that controlled edge proxy.
