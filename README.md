# Open Mercato Design System

A standalone, shadcn-style documentation platform for the Open Mercato restyle. It documents every
component **and** tells you exactly how each maps onto a real Open Mercato app — which pieces ship
with OM as-is, which are patched, which are pure token changes, and which are brand new.

This app has **zero `@open-mercato` dependency** — it reimplements the components standalone (with the
same Tailwind classes) so it can be hosted on its own domain, completely separate from any OM install.

## Run it

```bash
npm install
npm run dev      # http://localhost:4100
npm run build    # production build (prerenders every page as static)
npm run start    # serve the production build
```

## What's inside

| Path | Purpose |
|---|---|
| `src/app/globals.css` | The token layer — the switchable accent ramp + `[data-accent]` palettes, status/shadow tokens. |
| `src/components/ui/*` | Standalone reimplementations of the documented components (Button, Checkbox, Tabs…), faithful to the OM classes so previews are accurate. |
| `src/components/site/*` | The docs chrome — sidebar, header (accent switcher + dark toggle), `ComponentPreview`, `CodeBlock`, the `OmMapping` block, prop tables, pager. |
| `src/app/docs/**` | One folder per doc page. Add a route and it shows up after registering it in the nav. |
| `src/lib/registry.ts` | The site map / left-nav. Each item maps 1:1 to a `docs/<slug>/page.tsx`. |

## Page structure

Every component page is a client component that follows the same shape (see
`src/app/docs/components/button/page.tsx` as the canonical example):

1. `<DocHeader>` — title + lead (+ optional "New"/"Updated" badge)
2. `<ComponentPreview code={…}>` — a live demo with Preview / Code tabs
3. `<H2>` sections for variants, sizes, behaviour…
4. **`<OmMapping status="direct | patched | token | new" files={[…]}>`** — the signature block: how this maps onto OM, with the exact patch diff or token edit
5. `<PropsTable>` — the API
6. `<DocsPager href="…">`

## Adding a page

1. Create `src/app/docs/<group>/<slug>/page.tsx` (start the file with `"use client"`).
2. Add `{ title, href }` to the right group in `src/lib/registry.ts`.
3. Build a demo from `src/components/ui/*` (add a new component there if needed).

## Switchable accent

The headline feature. Setting `data-accent="green"` (or `red`/`orange`/`purple`) on `<html>` recolours
the whole site live — no rebuild. The header swatches do this and persist the choice to `localStorage`.
The exact same mechanism runs on a real OM app; see `/docs/accent-color`.

## Linked from Open Mercato

The OM app exposes this platform under **Settings → Module Configs → Design System**
(`/backend/design-system`). That page links out to this app's URL, configurable via
`NEXT_PUBLIC_DESIGN_SYSTEM_URL` (defaults to `http://localhost:4100`).

The full machine-readable changelog of the restyle lives in the OM app repo at
`poc-4/app/OPEN-MERCATO-UI-STYLING.md`.
