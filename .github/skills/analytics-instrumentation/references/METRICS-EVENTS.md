# Metrics and Events

## Core marketplace metrics
- Discovery CTR: how often users enter a category, deal, or coupon path.
- Offer CTR: how often cards or modules generate outbound intent.
- Coupon engagement: reveal, copy, or activation behavior.
- Click-out quality: outbound clicks that reflect real shopping intent.
- Retention: repeat visits and return interaction quality.

## Event naming rules
- Use stable, readable names such as `deal_card_click` or `coupon_reveal`.
- Prefer action-oriented event names.
- Avoid UI-only names that become meaningless after layout changes.

## Useful event properties
- `surface`
- `merchant`
- `category`
- `position`
- `campaign`
- `coupon_state`

## Validation questions
- Does this event answer a business question?
- Is it firing exactly once per meaningful action?
- Are properties sufficient for analysis without collecting excess data?
