---
name: next-quality-gates
description: "Use when validating the root Next.js app after changes. Trigger for lint, build, Vercel readiness, deploy safety, App Router checks, hydration risk, Tailwind v4 tokens, affiliate flow validation, or production verification. Keywords: validar build, pronto para deploy, quality gate, production check, release check."
argument-hint: "[change scope or release goal]"
---

# Next Quality Gates

## Purpose
Run the core quality checks for the real app in this repository and catch the most common regressions before deploy.

## Use this skill when
- A change is ready for validation.
- The user asks if the app is safe to deploy.
- A task touches routing, providers, styles, images, or shared UI.

## Reference files
- Read [Deployment Checklist](./references/DEPLOYMENT-CHECKLIST.md) when validating release readiness, affiliate flows, analytics wiring, or post-deploy checks.

## Repository facts
- The real app is the Next.js project at the repository root.
- Validation commands from the repo root are `pnpm lint` and `pnpm build`.
- Providers are centralized in `app/providers.tsx`.
- Tailwind v4 tokens and globals live in `app/globals.css`.

## Procedure
1. Confirm the scope of the change and which pages or shared components are affected.
2. Check for obvious App Router issues: unnecessary client components, server/client boundary mistakes, and provider misuse.
3. Check for styling risks: token drift, container regressions, and Tailwind v4 incompatibilities.
4. If new external image hosts were introduced, verify `next.config.ts`.
5. If the change affects affiliate links, analytics, coupons, or offer rendering, validate those flows explicitly instead of relying on build success alone.
6. Run `pnpm lint`.
7. Run `pnpm build`.
8. Report blockers, warnings, and residual risks clearly.

## Guardrails
- Do not treat a passing lint run as sufficient if the change can break runtime behavior.
- Favor root-cause fixes over suppressions and quick workarounds.
