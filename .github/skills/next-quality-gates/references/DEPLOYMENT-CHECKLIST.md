# Deployment Checklist

## Before deploy
- Run `pnpm lint`.
- Run `pnpm build`.
- Check new or changed routes for server and client boundary mistakes.
- Verify token usage, layout spacing, and responsive regressions on affected pages.
- Check affiliate links, coupon interactions, and outbound click surfaces if touched.
- Confirm analytics or tracking events still fire from the intended path.

## Marketplace-specific checks
- Offer and coupon states are believable and current.
- CTA labels still match the next action.
- External destinations are valid and intentional.
- Any third-party script added is necessary and scoped.

## After deploy
- Confirm the production domain loads correctly.
- Check the most business-critical pages manually.
- Watch for broken assets, console errors, or bad redirects.
