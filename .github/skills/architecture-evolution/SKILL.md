---
name: architecture-evolution
description: "Use when evolving folder structure, component boundaries, data flow, provider placement, shared abstractions, or long-term maintainability of the Next.js app. Keywords: arquitetura, architecture, estrutura, boundaries, providers, modularizacao, escalabilidade, organizacao."
argument-hint: "[area, growth problem, or architectural concern]"
---

# Architecture Evolution

## Purpose
Improve the structure of the app so new features can be added with less friction and less coupling.

## Use this skill when
- The user asks about architecture, scalability, organization, or codebase structure.
- A feature is difficult to add because responsibilities are tangled.
- Shared state, providers, or component boundaries need cleanup.
- The pain is structural and recurring, not just local code mess.

## Reference files
- Read [Boundary Guide](./references/BOUNDARY-GUIDE.md) when deciding ownership between pages, components, hooks, providers, and shared utilities.

## Procedure
1. Identify the current friction: coupling, duplicated logic, leaky abstractions, or unclear ownership.
2. Propose the smallest architectural change that meaningfully reduces that friction.
3. Keep boundaries explicit between layout, data, interaction, and shared utilities.
4. Prefer composition over centralizing unrelated concerns.
5. Preserve delivery speed; do not rewrite the app to chase purity.
6. Separate architectural decisions from cleanup-only changes so review scope stays clear.
7. When changing structure, explain the reasoning and validate the affected paths.

## Guardrails
- Avoid architecture churn without a concrete scaling problem.
- Do not create abstractions before there is more than one real use case.
- Keep the App Router model and current deployment shape in mind.
