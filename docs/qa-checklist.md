# QA Checklist

Run this before sending a client mockup.

## Content

- Business name is correct.
- Phone number is correct and all `tel:` links work.
- Service area is accurate.
- Placeholder copy has been removed.
- Page title and meta description are client-specific.

## Layout

- Mobile layout works at 320px width.
- Tablet and desktop layouts are clean.
- Text does not overlap or overflow.
- Buttons and links have visible focus states.
- Images have useful `alt` text when added.

## Technical

- Tailwind build has been run.
- `css/styles.css` is committed after the build.
- No React, Vite, npm, Bootstrap, jQuery, or external UI kits were added.
- Console has no JavaScript errors.
- Lighthouse basics are checked when practical.

## Handoff

- Client-specific notes are captured in `docs/client-brief.md`.
- Copy draft is captured in `docs/copy.md`.
- Design choices are captured in `docs/design-direction.md`.
