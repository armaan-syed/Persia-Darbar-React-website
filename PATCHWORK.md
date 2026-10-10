# PATCHWORK Integration

This site (React 18 + Vite 5, plain JSX, single-page anchor sections on `/`)
is PATCHWORK-ready: stable `data-patchwork-id` attributes, a secure
opt-in selection runtime, a canonical component registry, and a generated
backend manifest. Normal site behaviour is unchanged unless an authorized
PATCHWORK parent enables selection mode.

## 1. Setup

```bash
npm install
cp .env.example .env   # then set your PATCHWORK origin(s)
npm run dev
```

### Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `VITE_PATCHWORK_PARENT_ORIGIN` | Yes for iframe use | Exact origin(s) of the PATCHWORK app, comma-separated, no trailing slash. Example: `http://localhost:5173` or `https://patchwork.example.com`. |

If the variable is empty/unset, selection mode can never activate and no
messages are sent — the site works normally standalone. Per-environment
values: use `.env.development` / `.env.production` (Vite convention).

## 2. Message contract (`window.postMessage`)

All messages are validated: `event.source === window.parent`,
`event.origin` must exactly match the configured allow-list, and payloads
are shape-checked. Malformed/unauthorized messages are ignored. Outbound
messages use the exact configured origin, never `"*"`.

Parent → site (enable):

```json
{ "type": "PATCHWORK_SET_SELECTION_MODE", "enabled": true }
```

Parent → site (disable):

```json
{ "type": "PATCHWORK_SET_SELECTION_MODE", "enabled": false }
```

Parent → site (handshake ping, optional):

```json
{ "type": "PATCHWORK_PING" }
```

Site → parent (announced on load when embedded, and on ping):

```json
{ "type": "PATCHWORK_READY", "route": "/#menu" }
```

Site → parent (user clicked a registered editable element; `text` is
trimmed/capped at 200 chars; no cookies, secrets, DOM trees, HTML, or
source code are ever sent):

```json
{
  "type": "PATCHWORK_ELEMENT_SELECTED",
  "componentId": "hero-heading",
  "tagName": "H1",
  "text": "Persia Darbar",
  "route": "/#home"
}
```

Note: this is a single-page site, so `route` is always the `/` page plus
the current anchor hash.

## 3. Selection behaviour

- Runtime lives in `src/patchwork/selection-runtime.js`, initialised once
  from `src/main.jsx`. Disabled by default.
- Hovering a registered editable element shows a dashed gold outline and a
  pointer cursor; clicking selects it (solid outline) and reports the ID.
- Clicks on registered targets are intercepted in the capture phase
  (`preventDefault` + `stopPropagation`), so anchor navigation, the
  reservation submit, and other actions never fire while selecting. Clicks
  elsewhere behave normally. Form `submit` events whose submitter is a
  registered target are likewise suppressed in selection mode.
- Outlines use CSS `outline` only — page layout is never shifted.
- Event delegation is used (no per-element listeners); teardown removes all
  listeners/styles without residue.

## 4. Registry maintenance (ownership strategy)

- **Canonical source:** `src/patchwork/component-registry.js` (hand-edited).
- **Generated snapshot:** `patchwork-registry.json` (repo root, for the
  backend developer). Regenerate after any registry change:

```bash
npm run patchwork:manifest
npm run patchwork:validate
```

- The backend must resolve browser-sent IDs against its own trusted copy
  (this JSON or a transcription of it) — never trust a file path from the
  browser, and never import this repo's code directly.
- When adding an editable element: add a stable slug-based
  `data-patchwork-id` (never array indices/random IDs), add a registry
  entry, regenerate the manifest, and validate. One registry only — do not
  maintain a second hand-edited copy.

## 5. Editable ID table

All IDs render on route `/` (single-page site).

| componentId | Source file | Component | Scope | Data source |
|---|---|---|---|---|
| `navbar-brand` | `src/components/Navbar.jsx` | Navbar | content | — (inline JSX) |
| `navbar-cta` | `src/components/Navbar.jsx` | Navbar | content | — |
| `hero-heading` | `src/components/Hero.jsx` | Hero | content | — |
| `hero-tagline` | `src/components/Hero.jsx` | Hero | content | — |
| `hero-description` | `src/components/Hero.jsx` | Hero | content | — |
| `hero-reservation-cta` | `src/components/Hero.jsx` | Hero | content | — |
| `about-heading` | `src/components/About.jsx` | About | content | — |
| `about-description` | `src/components/About.jsx` | About | content | — |
| `menu-section-heading` | `src/components/SignatureDishes.jsx` | SignatureDishes | content | — |
| `menu-butter-chicken-darbari-name` | `src/components/SignatureDishes.jsx` | SignatureDishes | content | `DISHES` array, same file |
| `menu-butter-chicken-darbari-price` | `src/components/SignatureDishes.jsx` | SignatureDishes | content | `DISHES` array, same file |
| `menu-dragon-chilli-prawns-name` | `src/components/SignatureDishes.jsx` | SignatureDishes | content | `DISHES` array, same file |
| `menu-dragon-chilli-prawns-price` | `src/components/SignatureDishes.jsx` | SignatureDishes | content | `DISHES` array, same file |
| `menu-murgh-dum-biryani-name` | `src/components/SignatureDishes.jsx` | SignatureDishes | content | `DISHES` array, same file |
| `menu-murgh-dum-biryani-price` | `src/components/SignatureDishes.jsx` | SignatureDishes | content | `DISHES` array, same file |
| `menu-hakka-noodles-supreme-name` | `src/components/SignatureDishes.jsx` | SignatureDishes | content | `DISHES` array, same file |
| `menu-hakka-noodles-supreme-price` | `src/components/SignatureDishes.jsx` | SignatureDishes | content | `DISHES` array, same file |
| `chef-special-heading` | `src/components/ChefSpecial.jsx` | ChefSpecial | content | — |
| `chef-special-description` | `src/components/ChefSpecial.jsx` | ChefSpecial | content | — |
| `chef-special-price` | `src/components/ChefSpecial.jsx` | ChefSpecial | content | — |
| `reservation-heading` | `src/components/Reservation.jsx` | Reservation | content | — |
| `reservation-submit` | `src/components/Reservation.jsx` | Reservation | content | — (button label; must stay `type="submit"`) |
| `contact-phone` | `src/components/Reservation.jsx` | Reservation | content | `INFO` array, same file |
| `opening-hours-text` | `src/components/Reservation.jsx` | Reservation | content | `INFO` array, same file |
| `footer-about` | `src/components/Footer.jsx` | Footer | content | — |

Allowed operations per entry are in `patchwork-registry.json`
(`text` / `typography` / `styling` depending on the element).

## 6. Known limitations / non-editable elements

- **Dish images, tags, cuisine labels** (`SignatureDishes`): not registered;
  editing them would mean touching per-item media layout — out of scope.
- **Hero stats** (30+ years / 120+ dishes / 4.9 rating): not registered;
  values are hardcoded marketing figures with no data source.
- **About highlights list, WhyChooseUs cards, Reviews**: not registered to
  keep the demo surface tight; the same ID/registry pattern applies if they
  are added later.
- **Footer contact links (`tel:`/`mailto:`) and per-day hours table**: not
  registered. `contact-phone` / `opening-hours-text` edit display text in
  the reservation panel only — the footer links/hours must be updated
  separately (see registry `notes`).
- **Reservation form fields**: not selectable by design (intercepting input
  clicks would break form usability); only the heading, info lines, and
  submit label are registered. Keyboard `Enter`-to-submit while typing in a
  field is not suppressed unless the submitter is a registered target.
- **Mobile burger toggle / nav open state**: not registered; structural UI.
- **No multi-route support needed**: single-page site, all IDs on `/`.

## 7. Deployment & embedding

- Inspected: no `X-Frame-Options`, no CSP, and no hosting config
  (`vercel.json` / `netlify.toml` / `_headers` / nginx) in this repo, so
  nothing currently blocks cross-origin iframing. `vite.config.js` was
  intentionally left unchanged.
- When deploying, ensure the host does **not** send `X-Frame-Options: DENY`
  / `SAMEORIGIN`. If a CSP is required, send a minimal one allowing only
  the PATCHWORK origin to embed, without restricting anything else:

```
Content-Security-Policy: frame-ancestors 'self' https://patchwork.example.com
```

(replace with the actual PATCHWORK origin; keep `http://localhost:5173`
for local development.)

- Verify: `npm run build` succeeds, the deployed page loads inside the
  PATCHWORK iframe, selection mode enables/highlights/selects, and with
  selection mode off all navigation, the burger menu, and the reservation
  form work as before.

## 8. Backend contract (summary for the backend developer)

- Consume `patchwork-registry.json`: `componentId` → `filePath` (+
  `componentName`, `editable`, `editableScope`, `allowedOperations`,
  `description`, `route`, `dataSource`/`notes` where present).
- Treat the browser ID as a lookup key only; resolve against the trusted
  manifest copy. Data-driven values (all `menu-*`, `contact-phone`,
  `opening-hours-text`) live in `DISHES`/`INFO` arrays — patch the data
  object, not just the JSX.
- This repo implements no LLM, git, database, patch-application,
  deployment, or auth logic — selection only identifies elements.
