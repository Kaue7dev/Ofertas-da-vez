---
name: homepage-merchandising
description: "Use when adding or refining homepage sections, offer cards, coupon blocks, CTA copy, hero messaging, category labels, or merchandising layout in Ofertas da Vez. Trigger for landing page changes, promo cards, coupon grid, copywriting, hero, categories, deals, footer polish, conversion, and commercial presentation."
argument-hint: "[section, campaign, or business objective]"
---

# Homepage Merchandising

## Purpose
Evolve the homepage with stronger merchandising, clearer copy, and better commercial presentation without breaking the established visual language.

## Use this skill when
- The user wants to improve the hero, deals, categories, coupons, header, or footer.
- The task is about conversion, merchandising, campaign positioning, or homepage storytelling.
- The request includes changing CTA text, badges, labels, promotional hierarchy, or section order.

## Reference files
- Read [Homepage Playbook](./references/HOMEPAGE-PLAYBOOK.md) when reordering sections, refining conversion hierarchy, or deciding how the homepage should guide discovery.

## Key areas in this repo
- `app/components/HeroBanner.tsx`
- `app/components/CategoryBar.tsx`
- `app/components/DealsSection.tsx`
- `app/components/CouponsSection.tsx`
- `app/components/DealCard.tsx`
- `app/components/Header.tsx`
- `app/components/Footer.tsx`

## Procedure
1. Identify the commercial goal: click-through, clarity, trust, urgency, or navigation.
2. Limit edits to the sections that directly support that goal.
3. Preserve the current design language: `Sora`, `DM Sans`, the token palette, and the established spacing rhythm.
4. Keep copy direct, commercial, and natural for a Brazilian deals audience.
5. Check desktop and mobile layouts before finalizing structural changes.
6. Check whether the homepage is helping discovery, trust, and click-out intent in the right order.
7. If the change affects multiple sections or component contracts, validate with `pnpm lint` and `pnpm build`.

## Guardrails
- Do not turn the homepage into a generic marketplace layout.
- Prefer stronger merchandising hierarchy over adding more visual noise.
- Reuse existing components and tokens before introducing new patterns.
