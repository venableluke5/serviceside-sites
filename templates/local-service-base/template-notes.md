# Local Service Base Template Notes

This folder is a reusable static starter for local service business websites. It is meant to be adapted into many different client designs, not reused as a fixed ServiceSide Sites look.

## Files

- `index.html`: one-page starter with reusable local-service sections and section comments
- `styles.css`: mobile-first design system with CSS variables and neutral starter styling
- `script.js`: mobile nav toggle, FAQ accordion behavior, and current year helper

## Included sections

- hero
- trust bar
- services
- why choose us
- project/gallery
- reviews/testimonials
- service area
- process
- FAQ
- contact form
- sticky mobile call button

## Important placeholders to replace

- `[Business Name]`
- `[Primary Service]`
- `[Service Category]`
- `[Phone Number]` and `[PHONE]`
- `[Email Address]` and `[EMAIL]`
- section headlines, service names, coverage towns, and form instructions

## Customization workflow

1. Start with the `:root` variables in `styles.css`.
2. Update colors, type, spacing, section backgrounds, and radius values before changing layouts.
3. Replace placeholder sections in `index.html` with real service copy, real service areas, and real contact details.
4. Remove any unused sections instead of forcing every client to use all of them.
5. Replace gallery and review placeholders only with real approved photos or testimonials.

## CSS variable groups

- colors: text, accent, surfaces, borders, dark backgrounds
- fonts: body and heading stacks
- spacing: `--space-1` through `--space-8`
- border radius: small, medium, large, pill
- shadows: soft, card, strong
- section backgrounds: hero, base, soft, sand, dark, contact

## Content guardrails

- Do not add claims like licensed, insured, years in business, emergency service, family-owned, warranties, financing, reviews, or certifications unless the client actually provided them.
- Keep copy direct, local-business focused, and easy to scan on mobile.
- If a client has no testimonials or project photos yet, keep those sections as placeholders or remove them.

## Notes on reuse

- The HTML and CSS both include comments marking major sections so Codex can move or remove them quickly.
- The current visual direction is intentionally neutral and warm, not the same as the ServiceSide Sites homepage.
- The sticky mobile call button is mobile-only by default and can be changed to a text, quote, or booking CTA if needed.
