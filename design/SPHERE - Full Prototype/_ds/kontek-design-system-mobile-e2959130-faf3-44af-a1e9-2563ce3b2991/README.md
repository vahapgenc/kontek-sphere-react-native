# Kontek Next — Design System

A design system for **Kontek Next**, a modern SaaS payroll & people platform for small and
mid-sized companies. The product family unifies three modules — **Lön** (payroll), **Time**
(time & attendance) and **Sphere** (employee data/HR) — behind one calm, professional surface.
The intended feel is closer to **Personio** or **Linear** than to a traditional payroll system:
restrained, confident, software-grade — deliberately *not* a generic "AI SaaS" look.

> **📱 Mobile-first (current).** This system is tuned for the **Kontek payroll mobile app** on
> **iOS and Android**. The foundations and components target phone screens: a calm, generous
> **mobile type scale** (display 36 → body 16), a **48px minimum touch target everywhere**
> (`--tap-min`, the shared safe minimum for iOS 44pt + Android 48dp), 16px screen gutters and
> softer radii. It is **one brand-led visual language that looks identical on both platforms** —
> no Material/HIG split. Mobile-native components (app bar, tab bar, list rows, bottom sheet,
> FAB, banners/snackbar/toast, dialog, loading) live in `mobile.css`. Core component sizing
> (buttons/inputs/controls) was bumped to 48px. The previous desktop scale lives in git history;
> the desktop UI kit keeps its own pinned tokens.

> **Provenance & sources.** This system was built from a written brief and a fixed set of brand
> tokens (colors, type, radius) supplied by the client. **No codebase, Figma file or existing
> screenshots were provided** — so the UI, logo and component library here are original work
> derived from the brief, not a recreation of shipping product. If a Figma library or repo exists,
> share it and this system should be reconciled against it.

---

## Brand foundations (current palette)

> **Recolor note.** The design system was moved to the palette below (Surface Hierarchy,
> Primary/Secondary/Neutral scales). The **Kontek Next Dashboard UI kit is intentionally pinned**
> to the previous palette via its own frozen `ui_kits/kontek-next/tokens.css` and does **not**
> follow this recolor. Full swatches live in `preview/colors-*.html`.

| Token | Hex | Role |
|---|---|---|
| Forest | `#183E24` | Top nav bar & sidebar backgrounds |
| Cloud | `#ECEFF3` | Default page background (softer than white) |
| Pure White | `#FFFFFF` | Elevated surfaces — tables, forms, modals, dropdowns |
| Brand Signature | `#203B3C` | Primary CTAs, active tab text, toggle/checkbox border (12:1 AAA) |
| The Guide | `#395F61` | Sub-menu items, inactive tabs (7.0:1 AAA) |
| Muted Surface | `#B8C9CA` | Card borders, matte accents, secondary text on dark |
| Deepest Ground | `#122121` | Pressed / active button state |
| Status Badge | `#9DDFB5` | Status pill bg · nav resting text (7.8:1 on Forest) |
| Interaction | `#61BC8F` | Toggle/checkbox fill — pair with Brand Signature border |
| Success Text | `#0C4D33` | "Paid", "Balanced", "Matched" labels (9.9:1 AAA) |
| Kontek Green | `#053F22` | Secondary CTA buttons, pressed secondary (12.1:1 AAA) |
| Celebration | `#E6F7ED` | Row highlight for processed payroll |
| Obsidian | `#0F1112` | Body text, payroll numbers (18.9:1 AAA) |
| Charcoal Teal | `#445C5E` | Table headers, subtitles (7.2:1 AAA) |
| Slate Grey | `#475669` | Breadcrumbs, inactive icons (7.5:1 AAA) |
| Soft Steel | `#66777A` | Search bar borders, disabled labels |
| Silver Mist | `#A3B4B6` | Disabled UI states (non-text, WCAG exempt) |
| Stone | `#DDE5E6` | Table row dividers, panel borders |
| CTA Red | `#E1462E` | Destructive / irreversible actions only |
| — | Open Sans | All text — UI, body, display & headings |
| — | 12px | Button & input corner radius (mobile-tuned) |

Everything else (semantic status colors, the elevation and spacing scales) is **derived**
in `colors_and_type.css` to harmonize with these colors.

---

## Content fundamentals — voice & tone

The interface speaks **Swedish**, in a warm-but-professional register. It addresses the user
directly ("**du**", "**dig**") and signs the product's actions as "we" implicitly ("vi sköter
resten"). It is reassuring without being cute.

- **Casing:** Sentence case everywhere except eyebrows, which are `UPPERCASE` with wide tracking
  (e.g. `LÖNEKÖRNING · MAJ`). Never Title Case headings.
- **Tone:** Calm, competent, lightly human. Greetings are personal ("God morgon, Anna"). Status
  copy leads with reassurance, then specifics ("…är klar för granskning · 32 anställda · inga
  avvikelser").
- **Pronouns:** Second person ("En körning väntar på **dig**. Allt annat är lugnt."). Product
  speaks plainly, never corporate.
- **No emoji.** No exclamation-mark hype. Numbers are concrete and tabular.
- **Microcopy examples:** `Granska & godkänn`, `Ny körning`, `Visa detaljer`, `Utforska`,
  `Koppla Time till Lön så fylls tidrapporterna i automatiskt.`
- **Verbs over nouns** on buttons — an action you take, not a feature name.

The vibe: *"your payroll is handled — here is the one thing that needs you."*

---

## Visual foundations

- **Two-zone layout.** A persistent **dark green sidebar** (`Deepest Ground`) against a **warm,
  faintly green-tinted off-white canvas** (`#F4F3EE`). Content sits on white cards. This dark-rail /
  light-body split is the system's signature shape.
- **Color discipline.** The **primary action button is teal-green** (`#395F61`, deepening to
  near-black teal `#052225` on hover/press; focus = 2px `#395F61` ring with a 2px gap; disabled =
  `#E2E4E9` fill / `#9CA3AE` label). Accent green (`#61BC8F`) is reserved for the **positive
  approve / save** CTA (solid green with dark `#122121` text), plus icons, eyebrows, the logo leg,
  progress fills and active states. **Red (`#E1462E`) is reserved for destructive / irreversible
  actions** (avbryt körning, ta bort) — it is never used for godkänn/spara. Most surfaces are
  green-tinted neutral.
- **Type.** **Open Sans** throughout — one family for everything. The scale is **mobile-tuned**:
  display 36 / h1 28 (the screen large-title) / h2 22 / h3 19 / title 17 / body 16 (kept at 16 so
  iOS never zooms a focused field) / body-sm 15 / caption 13 / eyebrow 12 / micro 11. Weights
  400–700. Hierarchy comes from size and weight, not a second typeface.
- **Backgrounds.** Flat, warm, matte. No photography, no hand illustration, no texture, **no
  decorative gradients** — the one permitted gradient is a barely-there green→white wash behind the
  marketplace nudge to set it apart. Imagery, if ever added, should be cool/desaturated to sit with
  the greens.
- **Corner radii.** Mobile-tuned & gentle: 12px buttons/inputs, 16px cards, 20px hero panels,
  24px bottom-sheet/dialog tops, full pills for badges. Friendlier on large tap surfaces — never
  sharp, never overly round.

### Mobile components & patterns

- **Touch.** Everything interactive is ≥ **48px** (`--tap-min`). Control tokens: `--control-h` 48,
  `--control-h-lg` 56 (sticky/prominent CTAs), `--control-h-sm` 40 (dense rows). Buttons gain a
  `--block` (full-width) and `--lg` shape and a 0.97 press-scale. Layout tokens: `--screen-gutter`
  16, `--appbar-h` 56, `--tabbar-h` 58, and `--safe-top` / `--safe-bottom` (env safe-areas).
- **`mobile.css`** (imported by `colors_and_type.css`) adds the phone-native components, all on the
  brand tokens: **app bar** (`.ds-appbar` — large-title / compact / dark), **bottom tab bar**
  (`.ds-tabbar` — light + dark forest rail), **list rows** (`.ds-list` / `.ds-row` — inset groups
  + full-bleed), **bottom & action sheet** (`.ds-sheet` + `.ds-scrim`), **FAB** (`.ds-fab` — round
  / extended), **feedback** (`.ds-banner`, `.ds-snackbar`, `.ds-toast`), **dialog** (`.ds-dialog`),
  and **loading** (`.ds-skeleton`, `.ds-spinner`, `.ds-ptr`). Plus layout helpers `.ds-screen`,
  `.ds-cta-bar`, `.ds-mcard`.
- **Navigation patterns.** Three options share the same screens — **tab bar** (default), **drawer**
  (mirrors the desktop sidebar) and **hybrid** (tab bar + raised centre create action). Decision
  guide in `preview/navigation-patterns.html`; live, tappable explorer (both an iPhone and an
  Android frame) in `ui_kits/kontek-next/mobile/index.html`.
- **Borders & elevation.** Hairline borders in `rgba(18,33,33,0.08–0.14)` do most of the
  separation work; shadows are soft and low (`shadow-sm` resting, `shadow-md` on hover). The green
  primary button carries a subtle green glow `0 6px 18px rgba(97,188,143,0.30)`. On dark surfaces,
  separation comes from low-opacity white hairlines, not shadow.
- **Cards.** White, hairline border, soft shadow, generous internal padding (18–22px). They lift
  2px and deepen their shadow on hover — the only motion most cards make.
- **Motion.** Restrained. 120–320ms, `cubic-bezier(0.22,0.61,0.36,1)`. Hover = subtle lift +
  shadow; nav rows = background-tint fade. No bounce, no spin, no infinite loops. Respect
  `prefers-reduced-motion`.
- **States.** Hover lightens background tint (dark nav) or lifts the card (light surface); the CTA
  deepens. Focus uses a green-tinted ring. Press = slight darken, no aggressive scale-down. The
  primary green button (approve/save) is the positive action; destructive actions use a red text/
  outline button rather than a red fill.
- **Transparency & blur.** Used purposefully: the sticky topbar is a translucent canvas with
  `backdrop-filter: blur(8px)`; accent chips on dark use `rgba(97,188,143,0.14–0.16)`.
- **Density.** Comfortable, not cramped. One clear primary action per screen; whitespace signals
  calm.

---

## Iconography

- **System:** [**Lucide**](https://lucide.dev) line icons (MIT-licensed) — clean 24×24 geometry,
  consistent **1.75px stroke**, rounded caps/joins. This matches the Linear/Personio register and
  the brand's restrained feel. Any Lucide glyph may be used; the **curated, named sets** with
  defined meanings are documented in `preview/icons.html` (110 icons across four groups):
  **Alert** (5 — status/feedback), **Assistive** (16 — navigation & interaction helpers),
  **AG Grid** (29 — data-grid/table controls) and **Reserved** (60 — fixed-meaning icons).
- **Implementation:** The handful of icons in use are inlined as SVG path data in
  `ui_kits/kontek-next/icons.jsx` via a single `<Icon name="…" />` component — no runtime icon-font
  dependency. Add more by copying the path data from Lucide (kebab-case names, e.g. `octagon-alert`,
  `circle-question-mark`, `chart-no-axes-column`). The `preview/icons.html` gallery renders the full
  set live from the Lucide CDN for reference.
- **Color:** On light surfaces icons take the **Brand Signature** colour `#203B3C` via
  `currentColor`, so they recolour with text; they may promote to **Accent Green**
  (`#61BC8F` / `#2E7D5B` on light) when active or feature-marking, and use `--on-dark` tones on dark
  surfaces. Never multicolor.
- **No emoji, no unicode glyphs as icons.** The only non-Lucide marks are the keyboard hint `⌘K`
  and middot separators `·` in copy.
- **Logo mark:** an original geometric monogram — a serif-flavoured "K" whose forward leg is the
  accent green, with a small green "next" dot. Stored at `assets/logo-mark.svg`; the full lockup
  (mark + "Kontek" serif wordmark + "NEXT" eyebrow) lives in `preview/logo.html` and as
  `<LogoLockup/>` in the UI kit.

---

## Substitutions & flags

- **Fonts** are loaded from **Google Fonts via CDN** (Open Sans is free and
  official). No local font files are bundled — fine for online use. For offline/production, drop
  `.woff2` files in `fonts/` and swap the `@import` for `@font-face`.
- **Icons** use the Lucide CDN-equivalent path data inlined locally. If the real product uses a
  different icon set, replace the paths in `icons.jsx`.
- **Logo** is original (no logo was provided). Replace `assets/logo-mark.svg` and `<LogoLockup/>`
  if/when the real Kontek Next mark exists.

---

## Index — what's in this system

| Path | What it is |
|---|---|
| `README.md` | This file — context, voice, visual foundations, iconography, index |
| `SKILL.md` | Agent-Skill manifest so this folder works as a Claude Code skill |
| `colors_and_type.css` | **Source of truth** — all color, type (mobile scale), spacing, touch sizing, radius, shadow & motion tokens + semantic `.ds-*` classes. `@import`s `mobile.css`. |
| `mobile.css` | Mobile-native components — app bar, tab bar, list rows, bottom/action sheet, FAB, banner/snackbar/toast, dialog, loading + layout helpers |
| `assets/logo-mark.svg` | The monogram mark |
| `preview/*.html` | Small spec cards rendered in the Design System tab (colors, type, spacing, components, logo) |
| `ui_kits/kontek-next/` | The Dashboard UI kit (see its own README) |

### UI kits
- **`ui_kits/kontek-next/`** — the payroll portal. `index.html` boots the full **Översikt**
  (Dashboard) screen; components: `Sidebar.jsx`, `Topbar.jsx`, `Dashboard.jsx` (Greeting,
  PayrollStatus, ProductCard/Grid, MarketplaceNudge), `icons.jsx`.
- **`ui_kits/kontek-next/mobile/`** — the **mobile app**. `index.html` is the live nav-pattern
  explorer: the same Översikt / Lön / Time screens (`m-screens.jsx`) inside three shells
  (`m-apps.jsx` — `MTabBarApp`, `MDrawerApp`, `MHybridApp`), shown in both an iOS (`ios-frame.jsx`)
  and an Android (`android-frame.jsx`) device on a pan/zoom canvas. `MIcon` lives in `m-icons.jsx`.

No slide template was provided, so no `slides/` were created.
