---
name: security-hardening
description: "Use when reviewing or improving application security, trust boundaries, redirects, forms, client/server data flow, third-party scripts, headers, environment variables, or abuse risks in the Next.js app. Keywords: seguranca, security, hardening, redirect, XSS, secrets, auth, headers, third-party."
argument-hint: "[surface, feature, or risk area]"
---

# Security Hardening

## Purpose
Reduce avoidable security risk while keeping the app practical to ship.

## Use this skill when
- A feature introduces redirects, query params, forms, affiliate links, or third-party integrations.
- The user asks for a security review or hardening pass.
- A change touches server/client boundaries or environment configuration.

## Reference files
- Read [Threat Model](./references/THREAT-MODEL.md) when reviewing affiliate flows, third-party scripts, redirects, forms, or untrusted content.

## Procedure
1. Identify untrusted inputs and external integrations involved in the task.
2. Check where data crosses trust boundaries: browser to server, app to third party, or content to UI.
3. Prefer server-side handling for privileged logic and secret-bearing operations.
4. Validate URLs, sanitize content, and constrain redirects to trusted destinations.
5. Avoid leaking sensitive values to the client bundle.
6. Consider marketplace-specific abuse cases such as affiliate link hijacking, coupon tampering, and third-party script overreach.
7. Report concrete risks and fix the highest-impact issues first.

## Guardrails
- Do not claim security guarantees that were not actually verified.
- Avoid adding security theater with no real risk reduction.
- Treat affiliate URLs and marketing scripts as untrusted until validated.
