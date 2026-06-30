# Kontek Next — UI Kit

High-fidelity, mostly-cosmetic recreation of the **Kontek Next** payroll portal. Components are
modular and reusable; they fake their data and interactions rather than running real logic.

> Built from the written brief and brand tokens — no source code or Figma was available. Treat this
> as the reference implementation of the look & feel until a real one exists.

## Run it
Open `index.html`. It renders the **Översikt (Dashboard)** screen: dark sidebar + topbar +
scrollable content. Sidebar nav items are clickable (active-state demo); buttons and cards have
real hover states.

## Files
| File | Exports (→ `window`) | Notes |
|---|---|---|
| `icons.jsx` | `Icon` | `<Icon name="banknote" size={18} />` — inlined Lucide line-icon paths |
| `Sidebar.jsx` | `Sidebar`, `LogoLockup` | Dark Deepest-Ground rail, nav, tip card, user chip |
| `Topbar.jsx` | `Topbar` | Translucent sticky bar: search, help/bell, "Ny körning" |
| `Dashboard.jsx` | `Dashboard` | Greeting · PayrollStatus banner · ProductGrid (Lön/Time/Sphere) · MarketplaceNudge |
| `index.html` | — | Composes `<App>` with a tiny `useState` router stub |

## Conventions
- All tokens come from `../../colors_and_type.css`. Don't hardcode hex — reference the CSS vars.
- Each `.jsx` is a Babel `text/babel` script that assigns its components to `window` at the end so
  sibling scripts can use them. Load order in `index.html`: icons → Sidebar → Topbar → Dashboard.
- Style objects are inline or uniquely named (no bare `const styles`).
- Green is accent-only; red is the single primary CTA; Open Sans throughout (display + UI).

## Coverage / gaps
Covers the Dashboard surface and its component vocabulary (nav, topbar, status banner, product
cards, nudge, badges, buttons). Other screens (a Lön run detail, Time attestation, Sphere employee
record) are **intentionally omitted** — they weren't part of the brief. Add them as new `*.jsx`
screens reusing `Sidebar`/`Topbar`.
