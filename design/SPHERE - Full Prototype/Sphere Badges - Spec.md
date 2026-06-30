# Sphere — Badges Specification

> Everything about badges in the Kontek **Sphere** employee app: the two distinct badge types, their
> colors, sizing, the semantic tone system, and exactly when each is used. Drop this into the design
> system alongside the other component specs.

There are **two unrelated things called “badge”** in Sphere. Keep them separate:

1. **Status pill** (`<Badge>`) — a labelled, pill-shaped chip that communicates *state/meaning*.
2. **Count badge** (`.ds-tab__badge`) — a tiny number circle that communicates *quantity* (unread / to-do / pending).

---

## 1. Status pill — `<Badge>`

A token-built atom. Communicates the **state** of an item: approved, awaiting, action needed, etc.

### 1.1 Anatomy & fixed styling

| Property | Value |
|---|---|
| Shape | pill — `border-radius: var(--r-pill)` (999px) |
| Padding | `4px 10px` |
| Type | `--t-micro` (11px), weight **600**, letter-spacing `0.01em`, `line-height 1.3` |
| Layout | `inline-flex`, `align-items:center`, `gap:6px`, `white-space:nowrap` |
| Optional dot | leading `6×6px` circle, filled in the **same color as the text** |
| Fill / text | comes entirely from the **tone** (below) — text-color + soft-bg as a matched pair |

The dot is the default “liveness” marker on status pills — almost every in-app status badge sets
`dot`. Use it whenever the badge marks the live state of an item in a list.

### 1.2 The six tones — the only valid color pairings

A badge’s color is **never** set by hand. You pass a `tone`; the tone resolves to a `[text, background]`
pair. These six are the complete set:

| Tone | Text token | Text hex | Background token | Bg hex | Meaning |
|---|---|---|---|---|---|
| `ok` | `--ok` | `#0C4D33` | `--ok-bg` | `#E6F7ED` | Done & good — Approved, Paid, Active |
| `warn` | `--warn` | `#7A4A0E` | `--warn-bg` | `#FEF4E7` | Needs the user — Fix, Action required |
| `info` | `--info` | `#1A5298` | `--info-bg` | `#EBF2FB` | In progress — Awaiting approval, Review |
| `danger` | `--danger` | `#9C3232` | `--danger-bg` | `#FDEEED` | Failed / negative — Rejected |
| `neutral` | `--ink-3` | `#475669` | `--surface-2` | `#E6EAEE` | Quiet metadata — “Regarding: May”, optional hints |
| `brand` | `--signature` | `#203B3C` | `--green-soft` | `#E6F7ED` | Brand-flavoured marker — “Preliminary” on pay |

Default tone if none is passed: **`info`**.

**Tone discipline (do / don’t)**

- ✅ Pick the tone by *meaning*, not by the color you happen to want.
- ✅ Always use the matched text+bg pair — never a tone’s text color on a different background.
- ❌ Never use `danger` (red) for anything but a genuinely negative/failed state. It is **not** a
  destructive-action color here — it just signals “rejected / won’t be paid”.
- ❌ Never hand-roll a 7th color. If a state isn’t covered, it maps to `neutral`.

### 1.3 The canonical state → tone → label map

Item statuses across the app resolve through one shared table (`STATUS_META`). Use these labels and
tones verbatim so the same state always looks the same everywhere:

| Status key | Tone | Label shown |
|---|---|---|
| `action` | `warn` | **Action required** |
| `pending` | `info` | **Awaiting approval** |
| `approved` | `ok` | **Approved** |
| `rejected` | `danger` | **Rejected** |
| `info` | `neutral` | **Info** |

### 1.4 Where status pills appear & what they say

| Context | Tone · text | Notes |
|---|---|---|
| Home → To-do, an item needing input | `warn` dot · **Fix** | Shortest possible verb-label |
| Home → To-do, a manager’s pending approval | `info` dot · **Review** | |
| Home / Me → recent activity rows | per `STATUS_META` (dot) | Approved / Awaiting approval / Rejected … |
| Home → earlier (history) rows | `ok` dot · **Approved** / **Paid** | Settled items |
| Pay hero (Home, Upcoming, payslip) | `brand` dot · **Preliminary** | On mint surface; on the dark pay tile it’s overridden to a translucent-white fill |
| Activity / status detail header | per `STATUS_META` (dot) | The item’s current state |
| Companies list row | `ok`/`info` dot · **Active** / **Inactive** | Employment state |
| Notifications, an actionable item | `warn` dot · **Tap to fix** | |
| Flow option card (`OptionCard`) | `neutral` · **May require certificate** | No dot — it’s an advisory tag, not a live state |
| Ask-about-payslip flow | `neutral` · **Regarding: {month}** | Metadata tag, no dot |

Rule of thumb: **a live state of a real item → use a dot; a static tag/metadata → no dot.**

### 1.5 Usage

```jsx
<Badge tone="ok" dot>Approved</Badge>
<Badge tone="warn" dot>Fix</Badge>
<Badge tone="neutral">Regarding: May</Badge>
```

Placement: most often in a Row’s trailing (`right`) slot, or inline after a title. Keep labels to
1–2 words; sentence case; never truncate (it’s `nowrap` by design — shorten the copy instead).

---

## 2. Count badge — `.ds-tab__badge`

A tiny number bubble that rides the top-right of an icon to show a **count** (unread, to-do, pending
approvals). Purely quantitative — it carries no status color meaning.

### 2.1 Styling

| Property | Value |
|---|---|
| Shape | circle — `18×18px` (`min-width:18px`), `padding:0` |
| Fill | `var(--green)` `#61BC8F` |
| Number | `#FFFFFF`, `11px`, `line-height:1`, centered (`flex` + center/center) |
| Ring | `2px solid var(--surface)` (`#FFFFFF`) — separates it from the icon underneath |
| Position | absolute, `top:-6px; right:-11px` relative to the icon |

> Prototype note: the base design-system default for `.ds-tab__badge` was a green fill with **dark
> ground** text and a pill shape sized to its content. Sphere standardises it to a **fixed 18px
> circle with a white number** for a cleaner, more legible count. Carry the white-number circle
> forward as the Sphere standard.

### 2.2 Where it appears & the count it shows

| Location | Count source | When visible |
|---|---|---|
| Bottom nav **Home** tab | number of To-do items | `> 0` |
| Bottom nav **Employees** tab (manager only) | pending approvals | `> 0` |
| App-bar **bell** icon | unread notifications | `> 0` |
| Home **To do** section header | open to-do count | `> 0` |

- ✅ Show only when the count is `> 0` — never render a “0” badge.
- ✅ Always sit it on an icon with the 2px white ring so it stays legible over any background.
- ❌ Don’t put a status word inside a count badge, and don’t use status tones on it — counts are
  always the green circle.
- ❌ Don’t use a count badge as a generic dot indicator; for “there’s something here, no number”,
  use a status pill with a dot or a plain dot marker instead.

---

## 3. The one-line rule

**Pills mean *what state* (six semantic tones, pick by meaning, dot = live state). Circles mean
*how many* (green fill, white number, only when > 0).** Never mix the two.
