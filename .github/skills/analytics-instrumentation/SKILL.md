---
name: analytics-instrumentation
description: "Use when defining or implementing analytics, event tracking, attribution signals, funnel metrics, or measurement plans for the marketplace. Trigger for CTR tracking, coupon interactions, affiliate click events, GA4, event naming, conversion metrics, and experiment measurement. Keywords: analytics, metricas, eventos, CTR, funnel, rastreamento, atribuicao, conversao."
argument-hint: "[funnel, event, page, or measurement goal]"
---

# Analytics Instrumentation

## Purpose
Make product and growth decisions measurable by defining clean event schemas, meaningful metrics, and validation rules.

## Use this skill when
- The user wants to track product usage, click-through behavior, or conversion signals.
- A new surface needs analytics instrumentation.
- A product or marketing idea needs metrics before it can be judged.

## Reference files
- Read [Metrics and Events](./references/METRICS-EVENTS.md) when naming events, choosing properties, or validating measurement coverage.

## Procedure
1. Start with the business question, not the event name.
2. Define the success metric and guardrail metrics.
3. Map the user action that represents intent, progress, and conversion.
4. Keep event names stable, readable, and implementation-agnostic.
5. Include the minimum useful properties needed for segmentation and debugging.
6. Validate that the event fires at the correct moment and does not duplicate unexpectedly.

## Guardrails
- Do not add events with no decision-making purpose.
- Do not overload events with sensitive or unnecessary user data.
- Avoid naming patterns that become ambiguous after a few releases.
