---
name: codebase-cleanup
description: "Use when cleaning code, reducing duplication, simplifying components, removing dead code, improving naming, or tightening maintainability in the Next.js app. Keywords: limpeza, refactor, cleanup, simplificar, deduplicar, legibilidade, manutencao."
argument-hint: "[file, area, or cleanup goal]"
---

# Codebase Cleanup

## Purpose
Keep the codebase readable, lean, and easier to evolve without unnecessary rewrites.

## Use this skill when
- The user asks for cleanup, refactoring, simplification, or maintainability improvements.
- A touched area has duplication, stale code, or confusing structure.
- The implementation works but has obvious readability debt.

## Reference files
- Read [Cleanup Checklist](./references/CLEANUP-CHECKLIST.md) when planning refactors, pruning duplication, or tightening review scope.

## Procedure
1. Identify the real sources of complexity: duplication, mixed responsibilities, unclear naming, or dead branches.
2. Prefer focused refactors with clear before-and-after value.
3. Collapse duplicate logic into helpers only when the abstraction is actually cleaner.
4. Remove stale code paths, obsolete imports, and unused state.
5. Preserve runtime behavior unless the task explicitly includes a behavior change.
6. If a cleanup crosses file boundaries, explain the new ownership and why it is cleaner.
7. Validate with `pnpm lint` and `pnpm build` when the cleanup is substantial.

## Guardrails
- Do not perform cosmetic churn with no maintenance benefit.
- Avoid speculative abstractions.
- Keep diffs easy to review.
