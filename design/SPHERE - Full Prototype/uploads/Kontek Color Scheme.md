# Kontek — Klarna-Light Color Scheme

A portable reference for the forest-green, light-and-airy palette used in the Kontek employee app. Copy the CSS variables block straight into another project, or use the hex tables for design tools.

---

## 1. Drop-in CSS variables

```css
:root {
  /* ---- Brand core ---- */
  --forest:        #183E24;  /* deep forest — top bars, dark surfaces */
  --ground:        #122121;  /* deepest ground — pressed/active */
  --signature:     #203B3C;  /* brand signature — primary CTA, hero text */
  --guide:         #395F61;  /* the guide — secondary/inactive */
  --green:         #61BC8F;  /* interaction green — toggles, accents, nav badges */
  --status-badge:  #9DDFB5;  /* soft mint — status accents */
  --kontek-green:  #053F22;  /* secondary CTA / icon tiles */
  --green-deep:    #0C4D33;  /* success + on-light green text (AAA) */
  --green-soft:    #E6F7ED;  /* soft green fill — pills, highlights */
  --green-line:    #BFE3CF;  /* green hairline on light */
  --red:           #E1462E;  /* destructive only */

  /* ---- Neutrals ---- */
  --canvas:        #ECEFF3;  /* cool cloud — legacy flat page bg */
  --surface:       #FFFFFF;  /* white cards */
  --surface-2:     #E6EAEE;  /* inset / secondary surface */
  --ink:           #0F1112;  /* obsidian — body text, numbers */
  --ink-2:         #445C5E;  /* charcoal teal — subtitles */
  --ink-3:         #475669;  /* slate grey — labels, eyebrows, count pills */
  --ink-4:         #66777A;  /* soft steel — disabled labels */
  --on-dark:       #FFFFFF;  /* text on dark surfaces */
  --on-dark-2:     #B8C9CA;  /* secondary text on dark */
  --on-dark-3:     #7E9A93;  /* muted text on dark */

  /* ---- Hairlines ---- */
  --line:          #DDE5E6;
  --line-2:        #E8EDEE;
  --line-on-dark:  rgba(255,255,255,0.12);

  /* ---- Semantic status (text / soft bg) ---- */
  --ok:            #0C4D33;   --ok-soft:     #E6F7ED;
  --warn:          #7A4A0E;   --warn-soft:   #FEF4E7;
  --danger:        #9C3232;   --danger-soft: #FDEEED;
  --info:          #1A5298;   --info-soft:   #EBF2FB;
}
```

---

## 2. The "Klarna-light" surfaces (custom, layered on top)

These are the recipes that give the app its airy look. They're built from the tokens above plus a few one-off tints.

### App background — pale forest gradient
A teal-leaning green wash that fades to white, with two soft mint glows in the top corners. Set on the app shell; let scroll containers and headers stay `transparent` so it reads edge-to-edge.

```css
background:
  radial-gradient(130% 55% at 82% 0%, rgba(141,211,190,0.38) 0%, rgba(141,211,190,0) 58%),
  radial-gradient(120% 50% at 0% 12%, rgba(141,211,190,0.20) 0%, rgba(141,211,190,0) 50%),
  linear-gradient(180deg, #CFEAE2 0%, #E1F3EE 30%, #F1F8F6 66%, #FFFFFF 100%);
```

Gradient stops: `#CFEAE2` → `#E1F3EE` → `#F1F8F6` → `#FFFFFF`
Mint glow: `rgba(141, 211, 190, …)` (≈ `#8DD3BE`)

### Hero card — soft mint, dark forest text
The featured "Upcoming Pay" card. Light mint gradient fill, signature text, hairline border, soft lifted shadow.

```css
background: linear-gradient(145deg, #F0FAF4 0%, #DBEFE3 100%);
color: var(--signature);
border: 1px solid rgba(32,59,60,0.06);
border-radius: 24px;
box-shadow: 0 16px 34px -14px rgba(32,59,60,0.26);
```
Eyebrow text uses `--green-deep`; sub-text uses `--ink-3`.

### Floating white cards
Borderless, rounded, soft double shadow.

```css
background: var(--surface);
border-radius: 20px;
box-shadow: 0 10px 28px -12px rgba(18,33,33,0.18),
            0 2px 8px -3px rgba(18,33,33,0.07);
```

### Scroll-aware header (frosted on scroll)
Transparent at rest; on scroll gains a frosted tint + hairline divider.

```css
/* scrolled state */
background: color-mix(in srgb, #F2F8F5 76%, transparent);
backdrop-filter: blur(16px) saturate(150%);
border-bottom: 1px solid rgba(18,33,33,0.07);
```

---

## 3. Pills & badges

| Use | Background | Text |
|---|---|---|
| Status pill — success/"Paid" | `--ok-soft` `#E6F7ED` | `--ok` `#0C4D33` |
| Status pill — warning/"Fix" | `--warn-soft` `#FEF4E7` | `--warn` `#7A4A0E` |
| Status pill — info/"Approved" | `--info-soft` `#EBF2FB` | `--info` `#1A5298` |
| Status pill — brand/"Preliminary" | `--green-soft` `#E6F7ED` | `--green-deep` `#0C4D33` |
| Status pill — neutral | `--surface-2` `#E6EAEE` | `--ink-3` `#475669` |
| Count indicator (To-Do, bell) | `--ink-3` `#475669` | `#FFFFFF` |
| Bottom-nav tab badge | `--green` `#61BC8F` | `--ground` `#122121` |

Status pills are flat color, radius `999px`, no dot — matching the design library's `MStatusPill`.

---

## 4. Color roles at a glance

- **Green = positive / go-ahead** (approve, save, primary CTA). Forest `#203B3C` for solid CTAs; interaction green `#61BC8F` for toggles/accents.
- **Red `#E1462E` = destructive only** (delete, cancel a run). Never decorative.
- **Everything else stays quiet** — slate/charcoal text on cool-white/mint surfaces.
- **Dark surfaces** (forest/ground) pair with `--on-dark*` text.

---

## 5. Accessibility notes

All text pairings meet **WCAG AA**, most **AAA**:
- Body `--ink` on light surfaces: 16–19:1
- `--ink-3` labels on the gradient: ≥5.2:1
- Hero `--signature` / `--green-deep` on mint: 8–10:1
- Count pill white on `--ink-3`: 7.5:1
- Status-pill text on its soft bg: DS-tuned to AAA

Keep green strictly for positive actions and red strictly for destructive ones to preserve meaning.

---

*Typeface: Open Sans throughout. Radii: 12 (controls) · 16 (cards) · 20 (panels) · 24 (sheets/hero) · 999 (pills).*
