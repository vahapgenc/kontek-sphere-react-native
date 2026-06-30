# Handoff: SPHERE Employee App

## Overview

SPHERE Employee is a mobile-first HR self-service app for the Kontek payroll platform. It lets employees view their upcoming and past pay, register absence and expenses, track approval statuses, and manage their profile. The app is built around a **dark forest-green brand identity** (`#203B3C`) with a soft mint accent (`#61BC8F`).

---

## About the Design Files

The files in this bundle are **high-fidelity HTML/JSX prototypes** — design references showing the intended look, layout, interactions, and copy. They are **not production code to copy directly**. The task is to **recreate these designs in your target codebase** (React Native, SwiftUI, Jetpack Compose, or web React) using its established patterns and component library.

The prototype is built with React + Babel (browser-side), a custom design-system stylesheet (`ds-combined.css`), and a set of JSX component files. A developer can open `Kontek Anställd-app (phone).html` in a browser to interact with the full prototype.

---

## Fidelity

**High-fidelity.** All colors, typography, spacing, shadows, and interactions are final. Recreate pixel-precisely, using your framework's equivalent of the design tokens listed below.

---

## Design Tokens

### Colors

| Token | Value | Usage |
|---|---|---|
| `--signature` | `#203B3C` | Primary brand — hero card bg, icon tiles, primary buttons |
| `--ground` | `#122121` | Deepest dark — pressed states |
| `--guide` | `#395F61` | Secondary teal — inactive tabs |
| `--shell-cta` | `#61BC8F` | Mint — FAB, tab badges, active accents |
| `--status-badge` | `#9DDFB5` | Muted mint — eyebrow labels on dark bg |
| `--bg` | `#ECEFF3` | App background (light gray) |
| `--surface` | `#FFFFFF` | Card / sheet background |
| `--ink` | `#0F1112` | Primary text |
| `--ink-3` | `#6B7280` | Secondary/muted text |
| `--ink-4` | `#9CA3AF` | Placeholder / micro text |
| `--ok` | `#1F8A5B` | Success green |
| `--ok-bg` | `#E8F7F0` | Success background |
| `--warn` | `#D97757` | Warning amber |
| `--warn-bg` | `#FDF0EB` | Warning background |
| `--danger` | `#C0392B` | Error/danger red |
| `--line` | `#E5E7EB` | Divider lines |
| `--line-2` | `#F0F1F3` | Subtle dividers |

### Typography

Font families: **Open Sans** (body) + **Jost** (headings/display)

| Token | Size | Weight | Usage |
|---|---|---|---|
| `--t-display` | 36px | 700 | Salary amount hero |
| `--t-h1` | 28px | 700 | Page large titles |
| `--t-h2` | 22px | 700 | Section headings |
| `--t-title` | 16px | 600 | List item titles |
| `--t-body` | 15px | 400 | Body text |
| `--t-body-sm` | 13px | 400 | Secondary body |
| `--t-caption` | 12px | 600 | Labels, badges, uppercase tags |
| `--t-eyebrow` | 11px | 700 | Uppercase section labels |
| `--t-micro` | 10px | 400 | Footer / version strings |

### Spacing

| Token | Value |
|---|---|
| `--space-01` | 4px |
| `--space-02` | 8px |
| `--space-03` | 12px |
| `--space-04` | 16px |
| `--space-05` | 20px |
| `--space-06` | 24px |

### Border Radius

| Token | Value | Usage |
|---|---|---|
| `--r-sm` | 6px | Small chips |
| `--r-button` | 10px | Buttons |
| `--r-lg` | 16px | Cards |
| `--r-panel` | 20px | Hero card |
| `--r-sheet` | 24px | Bottom sheets |
| `--r-pill` | 999px | Pills, badges |

### Shadows

| Token | Value |
|---|---|
| `--sh-1` | `0 1px 3px rgba(0,0,0,0.08)` |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.10)` |

---

## Screens / Views

### 1. Login Screen

**Purpose:** Authenticates the employee.

**Layout:** Two-zone vertical split — dark forest hero (top, flex:0) + white form sheet (bottom, flex:1, rounded top corners 24px). Full-screen, no scroll.

**Hero zone (`#203B3C` bg + radial glow):**
- Background: `#203B3C` with radial gradient glow `rgba(157,223,181,0.16)` at top-right
- Padding: `safe-area-top + 36px` top, `28px` sides, `44px` bottom
- Kontek logo (white version): height 26px, margin-bottom 12px
- Eyebrow: `"SPHERE · EMPLOYEE"` — 11px / 700 / `#9DDFB5` / letter-spacing 0.18em / uppercase
- Title: `"Welcome back"` — 25px / 700 / white / letter-spacing -0.02em
- Subtitle: `"Your pay, absence and expenses — all in one place."` — 13px / white / line-height 1.4

**Form sheet (white, border-radius 24px top):**
- Padding: 20px top, 24px sides, `safe-area-bottom + 16px` bottom
- Gap between fields: 11px
- H2 `"Sign in"` — 22px / 700
- Work email field (label + text input)
- Password field (label + text input with Show/Hide toggle)
- "Forgot password?" — right-aligned text link, 13px / `--signature`
- Primary CTA button `"Sign in"` — full width, `#203B3C` bg, white text, 44px height, radius 10px
- Divider `"or"` — horizontal lines with centered label
- Secondary button `"Sign in with Mobile BankID"` — full width, outlined, phone icon
- Footer: `"Trouble signing in? Contact your administrator"` — centered, 12px

**Interactions:**
- Tapping "Sign in" or "Mobile BankID" triggers a 450–700ms loading state (`"Signing in…"`) then navigates to the Home screen
- Both buttons disabled while loading

---

### 2. Home Screen

**Purpose:** Overview of upcoming pay, to-do items, and recent registrations.

**Layout:** Scrollable content area (16px padding, 22px gap between sections), sticky app bar at top.

**App bar:**
- Large title greeting: `"Good morning, Sara"` — 28px / 700
- Height: ~101px total (56px action row + 45px large title block)
- Frosted background: `rgba(236,239,243,0.82)`

**Upcoming Pay card (sticky while not expanded):**
- Background: `#203B3C` + radial glow `rgba(157,223,181,0.16)` at bottom-right
- Border radius: 20px
- Padding: 20px top/bottom, 22px sides
- Eyebrow: `"UPCOMING PAY · JUNE 25"` — `#9DDFB5` / 11px / uppercase
- Badge `"Preliminary"` — right-aligned, frosted white
- Amount: `"24 380 kr"` — 36px / 700 / white / tabular nums
- `"Details"` toggle button — pill shape, 10% white bg, `#9DDFB5` text, chevron icon rotates on expand
- Expanded details: line items with label + amount, positive amounts white, negative amounts `#F2B5A8` (red-pink)

**"To do" section:**
- Section label `"TO DO"` + green count badge (`#9DDFB5` bg, `--signature` text, 18×18px circle)
- List of action items using `.ds-list--inset` (inset card style, radius 16px)
- Each row: icon tile (`#203B3C` bg, white icon, radius 12px), title + subtitle, orange warning badge `"Fix"` on right
- Empty state: green check icon tile + `"Nothing to do right now"`

**"My registrations for [month]" section:**
- Collapsible section with chevron toggle
- Items sorted by registration date (newest first)
- Each row: icon tile, title, sub (date/amount), status badge, secondary line `"Registered [date]"` in caption size / `--ink-4`

**FAB (Floating Action Button):**
- `+` button, centered in tab bar, 56×56px, mint green (`#61BC8F`), radius 999px
- Opens a quick-action hub sheet

---

### 3. Bottom Tab Bar

5 tabs: **Home** · **Payslips** · **+ (FAB)** · **Notifications** · **Profile**

- Active tab: `--signature` color, bolder label
- Inactive tab: `--guide` color
- Badge (count indicator): `#61BC8F` bg, white text, 18×18px circle, positioned top-right of icon
- Tab height: 58px, icon 24px, label 11px / 500–600

---

### 4. Payslips Screen

**Purpose:** List of historical payslips.

- Large title app bar: `"Payslips"`
- List of payslip rows: month label + net amount on right
- Tapping opens PayslipDetail

**Payslip Detail:**
- Standard back-nav app bar
- Employee header: name, role, period (two small columns)
- Line item groups (Pay / Deductions / Net) with amounts
- Net row in bold
- Notes card at bottom
- `"Does my pay look right?"` prompt at bottom → opens pay check confirmation

---

### 5. Notifications Screen

**Purpose:** Action items and informational updates.

- Large title app bar: `"Notifications"`
- `"Mark all as read"` text link, right-aligned above list
- Notification rows: warning icon tile + title + subtitle + time stamp
- Unread indicator: bold title, colored left border or background tint

---

### 6. Profile Screen

**Purpose:** Employee details and settings.

- Large title app bar: `"Profile"`
- Avatar circle with initials, name, role
- Sections: Contact, My companies, Settings, Log out
- `"My companies"` row navigates one level deep

**My Companies sub-screen:**
- Each company as a card with:
  - Icon tile (forest green for active, gray for inactive)
  - Company name (bold) + role
  - Status badge right-aligned (`"Active"` / `"Inactive"`)
  - Divider
  - `"PERMISSIONS"` uppercase teal label
  - Checkmark list (green check icon + permission text)

---

### 7. Register Absence Flow (multi-step)

Step 1 — **Type selection:** Grid of absence type cards (Sick leave, Child sick care, Annual leave, Parental leave, Other leave)

Step 2 — **Date picker:** Month calendar with range selection (start → end tap). Impact card shows pay effect below calendar.

Step 3 — **Certificate upload** (sick leave >7 days only): Info note + file attachment widget

Step 4 — **Summary + confirm:** All selections listed, primary `"Submit"` CTA

---

### 8. Register Expense Flow (multi-step)

Step 1 — **Category:** List of expense categories (Food, Transport, Supplies, etc.)

Step 2 — **Amount + description:** Number input + text field

Step 3 — **Receipt attachment:** Camera/file picker

Step 4 — **Summary + confirm**

---

### 9. Complete Flow (Fix action items)

Triggered from "To do" items and salary detail links.

- Warning icon tile (amber, 60×60px, radius 16px)
- Title + sub (bold + muted)
- Info note: `"Why is this needed?"` — amber tone
- Action-specific content (file upload or amount fix)
- Primary `"Submit"` CTA

---

## Interactions & Behavior

### Navigation
- Stack-based push navigation: each screen slides in from the right (`transform: translateX(16px)` → `0`)
- Back button in app bar pops the stack
- Tab bar changes root tab (resets stack for that tab)

### Status Badges
| Status | Color | Label |
|---|---|---|
| `action` | Amber `--warn` | `"Action required"` |
| `pending` | Blue `--info` | `"Awaiting approval"` |
| `approved` | Green `--ok` | `"Approved"` |
| `rejected` | Red `--danger` | `"Rejected"` |

### Animations
- Screen entrance: `translateX(16px)` → `0` over 220ms, `cubic-bezier(.32,.72,0,1)`
- Chevron rotation on expand: `rotate(0)` → `rotate(180deg)` over 200ms
- Button tap: `scale(0.97)` active state
- Flash notifications: 3s auto-dismiss snackbar

### Count Badges
- Round circle, 18×18px, `#61BC8F` bg, white text, 11px/700
- Positioned top-right of tab icons
- Disappears when count = 0

---

## State Management

Key state variables:
- `authed` — boolean, login gate
- `tab` — active root tab (`"home"` | `"payslips"` | `"history"` | `"profile"` | `"notifications"`)
- `stack` — navigation stack `[{ screen, params }]`
- `todos` — array of action items (mutable — items resolved after user completes them)
- `activity` — array of registered items for current period
- `notifRead` — array of read notification IDs
- `scenario` — tweak to switch between pay scenarios (`"Standard"` | `"Sick 2 days"`)

---

## Assets

| Asset | Source | Usage |
|---|---|---|
| `kontek-logo-white.png` | Kontek design system | Login hero, white variant |
| Open Sans | Google Fonts | Body font |
| Jost | Google Fonts | Display/heading font |
| Icons | Inline SVG (24×24px, stroke-based, stroke-width 1.9) | All UI icons |

### Icon names used
`home`, `payslips`, `bell`, `user`, `receipt`, `calendar`, `building`, `check`, `warn`, `phone`, `chevR`, `chevD`, `chevL`, `close`, `logOut`, `external`, `camera`

---

## Files in this Package

| File | Description |
|---|---|
| `Kontek Anställd-app (phone).html` | Main prototype entry point — open in browser to interact |
| `k-app.jsx` | App shell, router, Home screen, Bottom nav |
| `k-misc.jsx` | Payslips, Upcoming, History, Notifications, Profile, Companies screens |
| `k-absence.jsx` | Register absence multi-step flow |
| `k-expense.jsx` | Register expense + complete (fix) flows |
| `k-flow.jsx` | Shared flow scaffolding: FlowShell, Calendar, ImpactCard, FileUpload |
| `k-ui.jsx` | Shared primitives: Icon, Badge, Card, List, Row, SectionLabel |
| `k-data.jsx` | Mock data: employee, payslips, todos, activity, absence types |
| `k-login.jsx` | Login screen |
| `ds-combined.css` | Kontek design system stylesheet |
| `tokens.css` | Prototype-specific token overrides and component patches |

---

## Notes for the Developer

- The prototype uses **mock data only** — all data is in `k-data.jsx` and should be replaced with real API calls
- The `SCENARIOS` tweak switches between pay scenarios — this is for demo purposes only, not a real feature
- Swedish HR terminology: *kollektivavtal* = collective agreement, *VAB* = child sick care leave, *karensdag* = waiting day
- The login pre-fills credentials for demo convenience — remove in production
- The `.ds-row__lead` icon tile is always `#203B3C` bg with white icon — this is intentional brand styling
