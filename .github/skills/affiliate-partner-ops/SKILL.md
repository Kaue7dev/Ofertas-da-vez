---
name: affiliate-partner-ops
description: "Use when designing or reviewing affiliate partner operations, deeplinks, partner onboarding, tracking logic, partner feeds, commission assumptions, or partner-facing flows in the marketplace. Keywords: parceiro, afiliado, partner, rede, deeplink, comissao, tracking, feed, integracao, onboarding."
argument-hint: "[partner, integration, or affiliate ops problem]"
---

# Affiliate Partner Ops

## Purpose
Keep affiliate relationships operationally sound, measurable, and trustworthy from onboarding through click-out behavior.

## Use this skill when
- The task touches partner onboarding, affiliate links, tracking, commissions, feeds, or partner quality.
- A store or network integration needs rules, validation, or operational guidance.
- The user asks how to structure affiliate operations as the marketplace grows.

## Reference files
- Read [Partner Playbook](./references/PARTNER-PLAYBOOK.md) when defining partner standards, deeplink governance, or affiliate integration rules.

## Procedure
1. Clarify the partner model: manual offers, feed ingestion, deeplink generation, or network integration.
2. Identify what must be reliable: destination URL, attribution, merchant identity, commission assumptions, or reporting.
3. Standardize how partner data enters the product and how weak or broken partners are handled.
4. Ensure affiliate behavior is disclosed clearly enough to preserve user trust.
5. Prefer deterministic link generation and validation over ad hoc partner handling.
6. If implementation is requested, keep tracking logic and partner metadata explicit and auditable.

## Guardrails
- Do not hide affiliate intent in misleading UX.
- Do not depend on partner data without fallback or validation strategy.
- Treat broken or low-quality partners as product quality problems, not only business problems.
