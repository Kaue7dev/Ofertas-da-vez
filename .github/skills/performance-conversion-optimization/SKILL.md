---
name: performance-conversion-optimization
description: "Use when improving page speed, Core Web Vitals, render cost, loading priority, or performance issues that affect shopping behavior and affiliate conversion. Trigger for LCP, CLS, INP, images, fonts, scripts, hydration weight, lazy loading, and performance bottlenecks. Keywords: performance, Core Web Vitals, LCP, CLS, INP, velocidade, renderizacao, conversao."
argument-hint: "[page, metric, or performance bottleneck]"
---

# Performance Conversion Optimization

## Purpose
Improve performance where it meaningfully affects user experience, discovery speed, and click-out conversion.

## Use this skill when
- The user mentions slowness, heavy pages, poor Core Web Vitals, or conversion loss tied to page speed.
- A screen is visually rich but operationally heavy.
- A new feature risks adding render cost or script weight.

## Reference files
- Read [Performance Playbook](./references/PERFORMANCE-PLAYBOOK.md) when analyzing loading order, media usage, script cost, or conversion-sensitive bottlenecks.

## Procedure
1. Identify the critical user path that must feel fast.
2. Decide which assets and interactions deserve highest loading priority.
3. Reduce unnecessary client-side work, script weight, and layout instability.
4. Treat performance as part of conversion UX, not just as a technical vanity score.
5. Prefer targeted fixes on the highest-impact path instead of broad premature optimization.
6. Validate the tradeoff between visual richness and interaction speed.

## Guardrails
- Do not chase synthetic metrics while harming the actual shopping experience.
- Do not keep costly scripts or media with no clear business value.
- Avoid performance fixes that create brittle code unless the gain is meaningful.
