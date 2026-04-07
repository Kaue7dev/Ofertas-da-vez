<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Guidelines

## Product Context
- Ofertas da Vez is a Brazilian affiliate marketplace focused on offers, coupons, savings, and smart shopping.
- Prioritize decisions that improve trust, clarity, conversion, discoverability, and long-term product quality.
- Treat the project as a product business, not a one-off landing page clone.

## Architecture
- The real app is the Next.js project at the repository root.
- Prefer App Router-friendly patterns and add `"use client"` only where interactivity requires it.
- Use the `@/*` alias for imports from `app/*`.
- Shared providers live in `app/providers.tsx`.
- Theme tokens, typography variables, and layout primitives live in `app/globals.css`.

## Engineering Defaults
- Favor root-cause fixes over quick patches.
- Keep components small, readable, and reusable when reuse is real.
- Remove dead code, stale branches, duplicated logic, and naming drift when touching a relevant area.
- Preserve public APIs unless a change in contract is intentional and justified.

## Security
- Do not expose secrets, private tokens, or privileged logic to the client.
- Validate and sanitize external data, URLs, query params, and affiliate-driven inputs.
- Prefer least-privilege integrations and explicit trust boundaries.
- Flag security risks clearly when a task introduces tracking, redirects, forms, or third-party scripts.

## Quality Gates
- For substantial changes, validate from the repo root with `pnpm lint` and `pnpm build`.
- Keep fixes compatible with the current Next.js version and existing Tailwind v4 setup.

## Product Writing And UX
- Keep copy direct, commercial, and natural for a Brazilian audience.
- Favor clearer value proposition, better merchandising hierarchy, and simpler user flows over adding UI noise.
