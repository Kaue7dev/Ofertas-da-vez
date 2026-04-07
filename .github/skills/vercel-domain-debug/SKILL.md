---
name: vercel-domain-debug
description: "Use when debugging Vercel deployment, custom domain, DNS, SSL, or Registro.br configuration for this project. Trigger for invalid configuration, apex A record, www CNAME, DNS propagation, redirect issues, certificate problems, and Vercel custom domain setup. Keywords: dominio, DNS, Vercel, Registro.br, SSL, propagation."
argument-hint: "[domain, provider, or error message]"
---

# Vercel Domain Debug

## Purpose
Diagnose custom-domain issues for the project, especially when Vercel is connected to a domain managed in Registro.br or another external DNS provider.

## Use this skill when
- Vercel shows `Invalid Configuration`.
- The user needs to connect the apex domain and `www`.
- The issue involves DNS propagation, SSL, redirects, or registrar-side records.

## Reference files
- Read [Registro.br Checklist](./references/REGISTRO-BR-CHECKLIST.md) when the domain is managed in Registro.br or when DNS records are set outside Vercel.

## Procedure
1. Confirm the exact domain added in Vercel. Verify both apex and `www` entries if the project uses them.
2. If the domain uses external DNS, edit records in the registrar or DNS provider instead of changing Vercel settings blindly.
3. For Registro.br with external DNS records, prefer `Configurar endereçamento` when only the site records need to change.
4. Configure the apex/root domain with the A record value Vercel requests.
5. Configure `www` with the exact CNAME value Vercel requests.
6. Remove conflicting records for the same hostnames.
7. Check propagation with commands such as `nslookup -type=NS`, `nslookup -type=A`, and `nslookup -type=CNAME`.
8. Recheck the domain in Vercel after propagation.

## Guardrails
- Do not switch nameservers unless the goal is to migrate the full DNS zone.
- Check whether the domain has email or other services before changing DNS broadly.
- Confirm the registered domain name carefully to avoid debugging the wrong hostname.
*** Add File: c:\Users\kaue.cunha_warren\Desktop\Projetos\ofertas-da-vez\.github\skills\marketplace-product-strategy\references\REFERENCE.md
# Product Strategy Reference

## Core product principles
- Trust beats catalog size. Curate before expanding.
- Discovery should feel fast and obvious, not crowded.
- The product exists to help users save money with confidence, not just to expose affiliate links.
- Monetization should follow user value, not fight it.

## Funnel map
- Acquisition: user lands from search, campaign, or social. Metrics: CTR, landing engagement, bounce quality.
- Discovery: user scans categories, coupons, and deals. Metrics: section CTR, depth, scroll progression.
- Consideration: user compares merchants, reads terms, checks coupon confidence. Metrics: card CTR, store CTR, coupon reveal rate.
- Click-out: user leaves to partner. Metrics: affiliate click quality, outbound conversion proxy, invalid link rate.
- Retention: user comes back for new savings. Metrics: repeat sessions, newsletter signups, return CTR.

## Prioritization rubric
Ask these questions before proposing a feature:
1. Does it improve discovery, trust, or click-out conversion?
2. Is the gain meaningful enough for the engineering and content cost?
3. Does it reduce friction for a real user job to be done?
4. Does it strengthen the marketplace identity instead of turning the product into a generic deal dump?
5. Can success be measured with a concrete KPI?

## Category architecture heuristics
- Prefer clear shopper mental models over internal merchant taxonomy.
- Use categories to narrow purchase intent, not to display every possible label.
- Create category depth only when the parent category is too broad to scan well.
- Keep high-value seasonal or recurring intents easy to surface.

