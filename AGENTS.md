# ServiceSide Sites Instructions

Use this template for static ServiceSide Sites projects.

## Stack

- HTML
- Tailwind CSS v4 standalone CLI
- Vanilla JavaScript
- No React, Vite, npm, Bootstrap, jQuery, or external UI kits unless explicitly requested

## File Structure

- `index.html` for the homepage and primary content
- `css/input.css` for Tailwind directives and project styles
- `css/styles.css` for generated Tailwind output
- `js/` for small vanilla JS behavior only
- `images/` for client photos and site assets
- `docs/` for brief, copy, and design direction notes

## Commands

Build during development:

```powershell
tailwindcss -i ./css/input.css -o ./css/styles.css --watch
```

Build for production:

```powershell
tailwindcss -i ./css/input.css -o ./css/styles.css --minify
```

Local preview:

```powershell
python -m http.server 8000
```

## Design Rules

- Make the site feel like a real local business, not a generic SaaS landing page.
- Keep layouts clean, direct, and easy to scan on mobile first.
- Use strong service-specific messaging, clear contact actions, and obvious trust cues.
- Favor simple sections: hero, services, about, service area, testimonials or proof only when real, and contact.
- Keep interactions lightweight and fast.

## Content Rules

- Do not invent claims like licensed, insured, years in business, 24/7, emergency service, family-owned, reviews, awards, guarantees, warranties, financing, or certifications.
- Use placeholders whenever facts are missing.
- Replace placeholder business names, phone numbers, service lists, and service areas before delivery.
- Only include real testimonials, photos, and proof if they were provided.

## Mobile-First Rules

- Design for small screens first, then enhance for larger screens.
- Keep typography readable, tap targets large, and spacing comfortable.
- Avoid layouts that depend on hover, dense columns, or tiny text.
- Check that key actions like call, quote, and directions stay easy to find.

## Final QA

- Confirm the site works on mobile and desktop widths.
- Confirm all links, phone numbers, and forms are correct.
- Confirm no fake claims were added.
- Confirm `css/styles.css` is current.
- Confirm copy matches the client brief and design direction.


