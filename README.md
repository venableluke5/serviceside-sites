# ServiceSide Sites Reusable Template

A reusable static starter for small local service business mockups.

## Stack

- Plain HTML
- Tailwind CSS v4 standalone CLI
- Minimal vanilla JavaScript
- No React, Vite, npm, Bootstrap, jQuery, or external UI kits

## Files

- `index.html` - starter homepage with client placeholders
- `css/input.css` - Tailwind source file and ServiceSide Sites theme colors
- `css/styles.css` - generated Tailwind output
- `js/main.js` - minimal vanilla JavaScript
- `images/` - client images and assets
- `docs/client-brief.md` - discovery notes
- `docs/copy.md` - page copy draft
- `docs/design-direction.md` - visual direction notes
- `docs/qa-checklist.md` - pre-handoff checklist
- `AGENTS.md` - working instructions for future agent edits

## Build Tailwind

From this folder:

```powershell
tailwindcss -i ./css/input.css -o ./css/styles.css
```

For development:

```powershell
tailwindcss -i ./css/input.css -o ./css/styles.css --watch
```

If the standalone CLI is not installed on Windows x64:

```powershell
Invoke-WebRequest -Uri "https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-windows-x64.exe" -OutFile "tailwindcss.exe"
.\tailwindcss.exe -i .\css\input.css -o .\css\styles.css
```
## Preview Locally

Open `index.html` directly in your browser.

You can also run a simple local server from this folder:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## New Client Mockup Flow

1. Copy this folder for the client.
2. Replace placeholder business details in `index.html`.
3. Fill in the docs under `docs/`.
4. Add client images to `images/`.
5. Run the Tailwind build.
6. Preview and complete the QA checklist.


