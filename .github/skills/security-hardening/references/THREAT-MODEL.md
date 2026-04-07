# Threat Model

## High-risk surfaces
- Affiliate redirects and deeplinks.
- Query params that influence destination, filtering, or UI state.
- Third-party scripts for marketing, analytics, chat, or tracking.
- Forms, newsletter capture, and user-submitted content.
- External content that can inject unsafe HTML or URLs.

## Marketplace-specific abuse cases
- Open redirects through affiliate parameters.
- Coupon tampering or fake savings claims.
- Client-side exposure of secrets or privileged integration data.
- Over-collection of personal data without clear value or disclosure.
- Script sprawl that expands attack surface and harms trust.

## Review questions
- What input is untrusted here?
- What can a user or attacker influence?
- What leaves the app and where does it go?
- What happens if the third party is compromised or misconfigured?
- What is the minimum data and privilege level required?
