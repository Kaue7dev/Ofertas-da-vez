# Boundary Guide

## Recommended ownership
- `app/page.tsx` and route files: compose sections and route-specific data flow.
- `app/components/`: reusable UI and page sections.
- `app/hooks/`: client-side interaction logic reused across components.
- `app/lib/`: stateless helpers, formatting, adapters, and shared utilities.
- `app/providers.tsx`: global providers only.

## Extraction heuristics
- Extract a helper when the same logic appears in more than one place or the current file becomes harder to reason about.
- Extract a component when it has a stable responsibility and meaningful reuse or readability value.
- Keep server and client responsibilities explicit.
- Prefer data down, actions up, and small interfaces between layers.

## Smells that justify architectural work
- Page files owning too much state and presentation.
- Global providers added for single-screen behavior.
- Utility functions importing UI concerns.
- Components that cannot be moved or tested mentally because they know too much.
