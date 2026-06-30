# Sphere — Employee Mobile App · Design Specification

> A complete spec for the **Kontek Sphere** employee mobile app prototype, written so it can
> become the canonical reference for everyone designing on the platform — the dos, the don'ts,
> and the exact recipes that make the app look and behave the way it does.
>
> **Provenance.** This document describes a *working prototype* built on top of the
> **Kontek Design System — Mobile** (`colors_and_type.css` + `mobile.css`, the source of truth for
> tokens and base components). Where the prototype extends or overrides the base system, that is
> called out explicitly under **“Prototype decision”** — those are the parts worth promoting into
> the shared system. Everything else inherits unchanged from the design system.

---

## 1. What this app is

**Sphere** is the employee-facing half of Kontek Next (payroll). It answers one question on every
screen: *“Your pay is handled — here’s the one thing that needs you.”* It runs as a single phone
app with **two experiences gated by company context**:

- **Employee** — sees their own pay, absence, expenses and calendar.
- **Approver / manager** — additionally reviews and approves their team’s absence and expenses.

The same screens and components serve both; the bottom nav and the “To do” surface swap content
based on `activeCompany.kind` (`"manager"` vs employee). A person with several employments switches
context from **My companies**, and the whole app re-skins to that company’s role.

**Tone:** calm, confident, human. Swedish-first voice, sentence case, no emoji, no hype. Green = go
(approve / save). Red = only destructive / irreversible. Everything else stays quiet and neutral.

---

## 2. Foundations

All foundation values come from the design system’s `colors_and_type.css`. Use the **tokens**, never
raw hex or px. The prototype maps a few friendlier local aliases onto them (in `tokens.css`); the
canonical token is always the right-hand side.

### 2.1 Color

**Brand core**

| Token | Hex | Role |
|---|---|---|
| `--forest` | `#183E24` | Forest — darkest brand ground (rarely on mobile) |
| `--ground` | `#122121` | Deepest Ground — pressed/active button state |
| `--signature` | `#203B3C` | **Brand Signature** — primary CTAs, active tab text, hero numbers, body emphasis |
| `--guide` | `#395F61` | The Guide — avatars, secondary brand fills |
| `--green` | `#61BC8F` | Interaction — toggle/checkbox fill, the create (+) action |
| `--green-deep` | `#0C4D33` | Success text — “Paid”, eyebrows on mint surfaces |
| `--green-soft` | `#E6F7ED` | Celebration — soft green chip/tile background |
| `--kontek-green` | `#053F22` | Secondary-CTA / icon-tile fill (white icon on it) |
| `--status-badge` | `#9DDFB5` | Mint — the resting create-button fill |
| `--red` | `#E1462E` | **Destructive only** — never for approve/save |

**Neutrals & ink**

| Token | Hex | Role |
|---|---|---|
| `--surface` | `#FFFFFF` | Cards, sheets, rows |
| `--surface-2` | `#E6EAEE` | Inset / muted tile background |
| `--ink` | `#0F1112` | Primary text & numbers |
| `--ink-2` | `#445C5E` | Subtitles, body |
| `--ink-3` | `#475669` | Secondary text, captions, inactive icons |
| `--ink-4` | `#66777A` | Faintest labels, chevrons |
| `--line` | `#DDE5E6` | Borders |
| `--line-2` | `#E8EDEE` | **Row dividers inside cards** (hairline, not a border) |

**Semantic status** — each is a text/icon color + a soft background:

| Tone | Text | Soft bg | Used for |
|---|---|---|---|
| `ok` | `#0C4D33` | `#E6F7ED` | Approved, Paid, done |
| `warn` | `#7A4A0E` | `#FEF4E7` | Action required / “Fix” |
| `info` | `#1A5298` | `#EBF2FB` | Awaiting approval / “Review” |
| `danger` | `#9C3232` | `#FDEEED` | Rejected, errors |

**Color discipline (do / don’t)**

- ✅ Green is the positive, go-ahead action (approve, save) and the create (+) button.
- ✅ Status meaning is carried by the four semantic tones above — always text-color + soft-bg as a pair.
- ❌ Never use red for approve/save. Red is destructive/irreversible only.
- ❌ Never invent a new hex. If a harmonious shade is genuinely missing, derive it with `color-mix()`
  from an existing token rather than hand-picking.
- ❌ No decorative rainbow. Avatars sit on `--guide`; never multi-color them.

### 2.2 Typography

**One typeface — Open Sans** (`--font-ui`), weights 400/500/600/700. Hierarchy comes from size and
weight, never a second family. Mobile scale:

| Token | px | Use |
|---|---|---|
| `--t-display` | 36 | Hero pay figure, big greeting |
| `--t-h1` | 28 | Screen large-title (app bar) |
| `--t-h2` | 22 | Section header / sheet title |
| `--t-h3` | 19 | Strong card heading |
| `--t-title` | 17 | Card titles · list-row primary text |
| `--t-body` | 16 | Default body & inputs (16 so iOS never zoom-focuses) |
| `--t-body-sm` | 15 | Secondary body, dense rows |
| `--t-caption` | 13 | Captions, section labels, helper text |
| `--t-eyebrow` | 12 | UPPERCASE eyebrows, 0.08em tracking |
| `--t-micro` | 11 | Badges, tab labels |

- ✅ **Sentence case** everywhere except eyebrows (UPPERCASE, wide tracking).
- ✅ Money and any aligned figures get `.tnum` (`font-variant-numeric: tabular-nums`).
- ✅ Modal/sheet/flow-step headings are **semibold (600)**, not bold — see the `.ds-h1` override.
- ❌ Never Title Case headings. Never go below the scale (min 11px, and only for micro labels).

### 2.3 Spacing, sizing, touch

- **4px base.** Use `--space-01…13` (2,4,8,12,16,24,32,40,48,64,80,96,160) or the `--sp-*` aliases.
- **Screen gutter** `--screen-gutter` = 16px on every screen edge.
- **Touch:** everything interactive is **≥ 48px** (`--tap-min`). Control heights: `--control-h` 48,
  `--control-h-lg` 56 (sticky/prominent CTAs), `--control-h-sm` 40 (dense rows).
- App bar 56px content (the prototype adds a 50px status-bar inset above it), tab bar 58px.

### 2.4 Corner radii

Gentle, never sharp. `--r-sm` 8 · `--r-input`/`--r-button` 12 · `--r-card` 16 · **`--r-panel` 20**
(grouped cards, the default) · `--r-sheet` 24 (sheet/dialog tops) · `--r-pill` 999.

### 2.5 Elevation & motion

- Base shadows `--shadow-sm/md/lg`. The prototype defines its own **floating-card lift** (§3.1).
- Motion is restrained: 120–320ms, `cubic-bezier(.22,.61,.36,1)`. Press = a slight `scale(0.98)`
  that springs back. **No hover state** on the phone — resting and hover look identical. No bounce,
  no spin, no infinite loops. All entrance animations are transform-only so a paused/backgrounded
  frame still shows content. Respect `prefers-reduced-motion`.

---

## 3. Prototype decisions — the look that defines Sphere

These are the deliberate choices layered on top of the base design system. **These are the most
important things to carry forward**, because they’re what makes the app feel like Sphere rather than
a generic mobile kit.

### 3.1 The floating card — one recipe, everywhere

Every card-like surface in the app (`.ds-list--inset`, `.ds-mcard`, register options, notification
items, quick actions, flow option cards, approval cards, detail cards) uses **one** recipe:

```css
background: var(--surface);          /* #FFFFFF */
border: 1px solid transparent;       /* no visible border — the lift does the separation */
border-radius: var(--r-panel);       /* 20px */
box-shadow:
  0 10px 28px -12px rgba(18,33,33,0.18),   /* broad soft lift */
  0 2px  8px  -3px rgba(18,33,33,0.07);    /* tight contact shadow */
```

This is published as the `--sh-1` token, so any element can opt in with `box-shadow: var(--sh-1)`.

- Inside a card, **rows are separated by a hairline divider in `--line-2` (`#E8EDEE`)** — a
  pseudo-element line, never a real border.
- The shadow color is always a low-alpha deep ink `rgba(18,33,33, …)`.
- ✅ Do reuse this exact recipe for any new card so the whole app stays consistent.
- ❌ Don’t give cards a visible 1px border, and don’t mix radii — 20px is the card standard.

### 3.2 App background — the pale-forest gradient

The whole authenticated app and the login screen sit on **one shared background gradient** (not a
flat fill). Flow screens (absence/expense) use the same gradient so transitions never reveal a seam:

```css
background:
  radial-gradient(130% 55% at 82% 0%, rgba(141,211,190,0.38) 0%, rgba(141,211,190,0) 58%),
  radial-gradient(120% 50% at 0% 12%, rgba(141,211,190,0.20) 0%, rgba(141,211,190,0) 50%),
  linear-gradient(180deg, #CFEAE2 0%, #E1F3EE 30%, #F1F8F6 66%, #FFFFFF 100%);
```

- ✅ Cards float on this tinted canvas; CTA bars inside flows are **transparent** so the gradient
  reads edge-to-edge.
- This is the one sanctioned gradient. ❌ Don’t add other decorative gradients elsewhere.

### 3.3 Transparent app bar + scroll-frost

The app bar is **transparent at rest** so the gradient runs to the top edge. On scroll it
*frosts in*: the bar (and, on Home, the sticky pay hero) cross-fades to
`rgba(242,248,245,0.92)` + `backdrop-filter: blur(16px) saturate(150%)` and grows a 1px
`rgba(18,33,33,0.07)` bottom hairline.

- The Home pay hero is **sticky** and **docks into** the header on scroll — the docked tint matches
  the frosted bar exactly so they read as one surface.
- ❌ Don’t give the resting app bar a solid fill or a divider; it should be invisible until scrolled.

### 3.4 The pay / hero card — soft mint

Pay heroes (Home upcoming-pay, Upcoming screen, payslip detail) use the **soft-mint** treatment, not
a dark fill:

```css
background: linear-gradient(145deg, #F0FAF4 0%, #DBEFE3 100%);
color: var(--signature);                       /* dark forest text */
border: 1px solid rgba(32,59,60,0.06);
border-radius: var(--r-sheet);                 /* 24 on Home hero, 20 on detail */
box-shadow: 0 16px 34px -14px rgba(32,59,60,0.26);
```

Eyebrow on mint = `--green-deep`; subtitle = `--ink-3`; the big figure = `.tnum` `--t-display`.

### 3.5 Icon tiles & avatars

- **Action / navigational icon tiles** (`.ds-row__lead`): solid `#053F22` (Kontek Green) square,
  **white** icon, no border, 11–12px radius. Action-required tiles flip to the warn palette
  (`--warn-bg` / `--warn`).
- **Soft chips** (register cards, expense/leave glyphs): `--green-soft` bg + `--green-deep` icon.
- **People avatars:** initials on `#395F61` (The Guide), white text, circular. Never multi-color.

### 3.6 Badges & counts

- **Status pills** use the `Badge` atom — soft-bg + text-color pair, optional leading dot, pill
  radius, `--t-micro`. Tones map to the four semantics + `neutral` + `brand`.
- **Count badges** (nav tab, bell, “To do”) are small circles: tab badge = `--green` fill with a
  **white** number and a 2px `--surface` ring; the bell/“To do” counts use a neutral `--ink-3` fill
  with white number.
- ❌ Don’t put a count inside a colored status pill — counts are circles, statuses are pills.

---

## 4. Components

The shared primitives live in `k-ui.jsx` and export to `window`. They wrap the design system’s
`.ds-*` classes — **compose these, don’t restyle raw HTML to imitate them.**

### 4.1 Button (`<Button>` → `.ds-btn`)

Variants map to DS classes:

| Variant | Class | Use |
|---|---|---|
| `primary` / `dark` | `.ds-btn--primary` | The one primary action per screen (teal fill, white text) |
| `secondary` / `outline` / `soft` | `.ds-btn--secondary` | Outline, white fill |
| `ghost` | `.ds-btn--transparent` | Text/link-like |
| `approve` | `.ds-btn--approve` | Positive green (approve/save) — dark `--ground` text |
| `secondary-cta` | `.ds-btn--secondary-cta` | Filled Kontek Green, second tier |
| `danger` | `.ds-btn--danger` | Red text/outline — destructive only |

Sizes `sm`/`md`/`lg`; `full` → `--block` (full-width thumb button). 48px tall (56 for `lg`), 12px
radius, press-scale 0.97. **One clear primary action per screen.**

### 4.2 List + Row (`<List>` / `<Row>`)

- `<List inset>` renders `.ds-list--inset` — the floating grouped card (§3.1). Rows inside it get the
  `--line-2` hairline divider automatically.
- `<Row>` holds: optional leading icon tile, title, optional subtitle, and a trailing slot (`right`)
  — a value, a `Badge`, or an auto chevron when `onClick` is set. `dense` tightens it to 52px min
  with a 34px tile (the app-wide default density). Pressable rows are real `<button>`s.
- Row anatomy is the workhorse — prefer it over bespoke flex rows.

### 4.3 Card (`<Card>` → `.ds-mcard`) & CollapsibleCard

- `<Card>` is the generic floating panel (§3.1). `<CollapsibleCard>` puts a tappable header *inside*
  the card with a rotating chevron; divider appears only when open.

### 4.4 Bottom sheet & action sheet (`<Sheet>`)

Slides up over a dimmed scrim (`rgba(5,18,18,0.42)`), 24px top radius, grab handle, optional
title (`--t-h3`/bold→semibold) + sub. Mount/animation is handled (320ms). Sits above content but
**below** the tab bar. The **action-sheet** variant (`.ds-actionsheet`) stacks full-width choices —
used by the Register hub.

### 4.5 Segmented control, Steps, SectionLabel, Badge

- `<Segmented>` → `.ds-segmented`: 2–3 short options, active segment gets a white raised chip.
- `<Steps>` — flow progress dots; the active dot stretches to a 22px pill in `--brand-600`.
- `<SectionLabel>` — a `--t-caption` semibold `--ink-3` label with an optional right-aligned action.
- `<Badge>` — the status pill atom (§3.6).

### 4.6 Form controls (from `colors_and_type.css`)

Inputs/textarea/select: 48px, 12px radius, focus = `--signature` border + 3px `rgba(32,59,60,0.16)`
ring. Checkbox/radio/switch: `--green` fill paired with a `--signature` border. Error = `--danger`
border + tinted ring. All ≥48px hit area.

### 4.7 Icons (`<Icon>`)

A single inline-SVG component, 24×24 geometry, ~1.7px stroke, rounded caps — a curated stroke set
(home, payslip, calendar, receipt, wallet, bell, approvals, building, etc.). Recolors via
`currentColor`. ❌ No emoji, no icon fonts, no multicolor icons.

---

## 5. Navigation & shell

### 5.1 Bottom tab bar (hybrid, 5 slots)

`.ds-tabbar`, transparent-blended, lifted slightly off the bottom (no top hairline — a prototype
override). Five slots with a **raised centre create (+) action**:

```
Home  ·  Pay/Me  ·  ( + )  ·  Calendar/Employees  ·  Profile
```

- The centre **+** is a 56px mint (`--status-badge`) circle that flips to `--green` + an `×` glyph
  while the Register hub is open.
- Slots 2 and 4 swap by role: employee gets **Pay** + **Calendar**; manager gets **Me** +
  **Employees** (with an approval count badge).
- Active tab = `--signature`; tab count badges = green circle, white number (§3.6).

### 5.2 App bar

Two forms via `<AppBar>`: **large-title** (root tabs — 28px `--t-h1`, optional eyebrow, subtitle,
right slot) and **compact** (pushed screens — back chevron + centered title). The notifications
**bell** lives in the app bar right slot with a count badge; tapping pushes the Notifications screen.

### 5.3 Routing model

A tab + a push/pop **stack**. `nav.push(key, params)` / `nav.pop()` / `nav.go(tab)` (resets stack &
switches tab) / `nav.reset()`. Screen transitions are transform-only slide-in (`anim-r`/`anim-l`).
Flow screens (`absence`, `expense`, `complete`, `paycheck`) **hide the chrome** and run their own
full-screen header (`FlowShell`).

> **Adding a screen — checklist.** (1) build it as a component taking `{ nav, store, params, scrolled }`;
> (2) add a `case` in `renderScreen()`; (3) add its compact-bar title to the `titles` map; (4) if
> it’s a self-managed flow, add its key to `flowScreens`. *(A missing route silently falls back to
> Home — the bug that hid calendar→detail navigation until the `regDetail` case was added.)*

---

## 6. Patterns & behaviors

### 6.1 Sign-in
Two-step (email → password) on the shared gradient, with a forest-tinted hero wordmark and a white
sheet that rounds over the bottom. Offers **Mobile BankID** as the alternate path. Buttons disable
until their field validates.

### 6.2 The “To do” surface (Home)
The single most important pattern: Home leads with a sticky soft-mint **upcoming-pay** hero, then a
collapsible **To do** list that merges the employee’s action items *and* (for managers) pending
approvals into one prioritised list, each with a `warn`/`info` badge. Empty state is a calm “Nothing
to do right now” card — reassurance, not a void.

### 6.3 Register hub
The **+** opens a bottom sheet offering **Absence** or **Expense**. Layout is tweakable
(**List** rows vs **Cards** grid). Choosing one closes the sheet and pushes the matching flow.

### 6.4 Multi-step flows (`FlowShell`)
Absence/expense registration run full-screen: own header with step dots, the gradient background,
floating **OptionCards** (selected = 2px `--signature` ring + lift), and a transparent sticky CTA
bar at the bottom. End on a success state.

### 6.5 Approvals with optimistic Undo
Managers approve/reject single items or **approve all**. Every action is **optimistic** — the item
leaves the list immediately and a dark **snackbar** (`Flash`) appears with an **Undo** that restores
it to its original position. Snackbars auto-dismiss (3s; 5s when they carry an action) and carry a
tone glyph (check / ×).

### 6.6 Calendar
Month grid; days with registrations show a centered dot; tapping a day lists that day’s entries, and
each entry pushes its registration detail. Day numbers are centered with the event dot absolutely
positioned so it never shifts the number.

### 6.7 Company switching
A person with multiple employments switches active company from **My companies**; the app re-seeds to
that company’s role (employee vs approver), changing the nav, the To-do surface and available screens.

### 6.8 Scenarios (demo)
A Tweak (`Standard` / `Sick 2 days`) re-seeds the store so the prototype can demo different states.

---

## 7. Voice & tone

- Swedish-first, warm-but-professional; addresses the user directly (“du/dig”).
- Sentence case; eyebrows UPPERCASE with wide tracking.
- Lead with reassurance, then specifics. **Verbs over nouns** on buttons (an action, not a feature).
- No emoji, no exclamation hype. Numbers are concrete and tabular.
- The product’s implicit promise: *“your payroll is handled — here is the one thing that needs you.”*

---

## 8. Dos & don’ts — quick reference

**Do**
- Compose the `.ds-*` components / `k-ui.jsx` primitives; style against tokens (`var(--*)`).
- Use the one floating-card recipe (`--sh-1`, 20px, transparent border) for every card.
- Keep one clear primary action per screen; everything else is secondary/ghost.
- Use `--line-2` hairlines for in-card row dividers; reserve real borders for inputs.
- Keep ≥48px touch targets; use `.tnum` for money; respect `prefers-reduced-motion`.
- Make optimistic mutations reversible with an Undo snackbar.

**Don’t**
- ❌ Invent hex/px values, or add a second typeface.
- ❌ Use red for anything but destructive/irreversible actions.
- ❌ Give cards visible borders, mixed radii, or hard drop shadows.
- ❌ Add hover states, bounce/spin, infinite loops, or extra decorative gradients.
- ❌ Put counts in status pills (counts are circles), or multi-color icons/avatars.
- ❌ Pad screens with filler — an empty section is a calm reassurance card, not dummy content.

---

## 9. File map (prototype source)

| File | Contents |
|---|---|
| `Kontek Anställd-app.html` | App entry — loads DS, tokens, all `k-*` scripts, mounts `<App>` |
| `tokens.css` | Local aliases onto DS tokens + prototype overrides (floating card, frosted bar, badges) |
| `k-ui.jsx` | Shared primitives: Icon, Badge, Card, List, Row, Sheet, Segmented, Button, Steps, payslip PDF |
| `k-app.jsx` | App shell, router, bottom nav, app bar, snackbar, Home, Register hub, Tweaks |
| `k-login.jsx` | Two-step sign-in |
| `k-misc.jsx` | Most screens: Me, Payslips, Notifications, Profile, Companies, Approvals, Team, Calendar, details |
| `k-absence.jsx` / `k-expense.jsx` / `k-flow.jsx` | Registration flows + `FlowShell` / `OptionCard` |
| `k-data.jsx` | Seed data: people, companies, approvals, calendar events, scenarios |
| `_ds/…/colors_and_type.css` · `mobile.css` | **Design system source of truth** (tokens + base components) |
