# Mobile Navigation Spec — Bottom Tab Bar with Center Action

**Component:** `BottomNav` (Kontek Mobile — primary navigation)
**Replaces:** the current side-navigation (sidonavigering) pattern
**Platform:** iPhone + Android (one shared style)

---

## 1. Why this replaces side navigation

Side navigation hides the app's main areas behind a menu the user has to open. On a phone that costs a tap for every move and pushes the most-used destinations out of sight. This pattern puts the **four core areas plus the primary "register" action permanently in reach of the thumb**, so the whole app is one tap away and the thing people open the app to do — register absence or an expense — is always the visible center action.

Use a bottom tab bar for the **top-level areas of the app**. Keep side navigation only for rare, secondary destinations (if at all).

---

## 2. Anatomy

A fixed bar pinned to the bottom of the screen, above the safe-area inset. Five equal slots:

```
┌─────────────────────────────────────────────┐
│   Home     Pay      (+)    Notif.   Profile  │
│    ◎        ▢      ┌───┐     ◔        ◐       │
│                    │ + │                       │
│                    └───┘                       │
└─────────────────────────────────────────────┘
```

| Slot | Type | Purpose |
|---|---|---|
| 1 | Tab | **Home** — overview / dashboard |
| 2 | Tab | **Pay** — pay slips |
| 3 | **Center action** | **Register** — raised "+" that opens the action sheet |
| 4 | Tab | **Notifications** |
| 5 | Tab | **Profile** |

- **Max 5 slots.** Four tabs + one center action is the ceiling. Never add a sixth.
- The center action is **not a tab** — it does not represent a destination, it triggers an action sheet. It never shows a selected state.

---

## 3. Layout & dimensions

| Property | Value |
|---|---|
| Bar height | **59px** (56px content + 1px top border + rounding) — excludes the safe-area inset, which is added below |
| Bar background | `#FFFFFF` (`--surface`) |
| Top border | `1px solid #DDE5E6` (`--line-2`) |
| Bar shadow | `0 -1px 3px rgba(18,33,33,0.04)` (subtle lift) |
| Slot layout | 5 equal-width flex items, each ~`20%` |
| Tab internal | flex column, `gap: 4px`, `padding: 8px 4px`, center-aligned |
| Safe area | add `env(safe-area-inset-bottom)` as padding **below** the 59px bar — never let content sit under the home indicator |

---

## 4. Tab item

Vertical stack: icon over label.

| Element | Spec |
|---|---|
| Icon | **24×24px**, stroke style, stroke-width 1.9 |
| Label | **11px / 600**, single word, never wraps |
| Icon→label gap | 4px |
| Min tap target | full slot, ≥48px tall (the 8px padding + 24px icon + label clears this) |

### States

| State | Icon + label color | Notes |
|---|---|---|
| **Active** | `#203B3C` (`--signature`) | One tab active at a time; reflects current area |
| **Inactive** | `#475669` (`--ink-2`) | Calm, recessive |
| **Pressed** | `#203B3C` at 70% opacity | Brief, on touch-down |

There is **no pill, underline, or background fill** on the active tab — color alone carries selection. Keep it quiet.

---

## 5. Center action ("+")

A raised circular button that breaks above the bar's top edge.

| Property | Value |
|---|---|
| Size | **56×56px** |
| Shape | full circle (`border-radius: 999px`) |
| Vertical offset | `margin-top: -24px` (floats above the bar) |
| Icon | "plus", **26px**, stroke-width 2.2, color `--shell-cta-ink` (deep forest) |
| Resting background | `#9DDFB5` (`--status-badge`, soft mint) |
| Open/active background | `#61BC8F` (`--green`) |
| Shadow | `0 8px 18px rgba(18,33,33,0.18), 0 2px 6px rgba(18,33,33,0.12)` |
| Transition | background + shadow over `--gaia-transition-state` (≈180ms) |

**Behavior:** tapping toggles the Register action sheet (absence / expense). While the sheet is open the button stays in its `#61BC8F` state and `aria-expanded="true"`. It carries no label.

---

## 6. Count badge

For tabs that need to signal pending items (e.g. **Home** = number of "to do" items, **Notifications** = unread count).

| Property | Value |
|---|---|
| Shape | perfect circle, **18×18px** |
| Background | `#61BC8F` (`--green`) |
| Number color | `#FFFFFF` |
| Font | **10px / 700**, centered |
| Position | top-right of the **icon** (overlapping the glyph), not the label |
| Visibility | shown only when count > 0; hidden at 0 |
| Overflow | cap display at `9+` |

The badge is a **count**, not a dot. Use a numbered badge wherever a quantity is meaningful; reserve a plain dot only for "something changed, no count."

---

## 7. Behavior rules

- **Persistent.** The bar is visible on all top-level screens. It is hidden inside full-screen flows (registration steps, sheets) and on deep detail screens that have their own back-nav app bar.
- **One active tab.** Switching tabs resets that area to its root (clears its navigation stack).
- **Center action never selects.** It has no active/destination state — only resting vs. open.
- **No horizontal scrolling.** If you ever need more than 4 destinations, the information architecture is wrong — consolidate, don't scroll the bar.
- **Labels always shown.** Never icon-only; the 11px label is part of the pattern.

---

## 8. Accessibility

- Every tab: `aria-label` = its name, `aria-current="page"` when active.
- Center action: `aria-label="Register"`, `aria-expanded` reflects sheet state.
- Tap targets fill the full slot height; minimum 48×48px effective.
- Color is never the *only* signal of the current area — the icon + label pairing and screen content reinforce it. (If stricter contrast is required, the active label at `#203B3C` on white is AAA for text.)

---

## 9. Tokens used

| Token | Value | Role |
|---|---|---|
| `--surface` | `#FFFFFF` | Bar background |
| `--line-2` | `#DDE5E6` | Top hairline border |
| `--signature` | `#203B3C` | Active tab |
| `--ink-2` | `#475669` | Inactive tab |
| `--status-badge` | `#9DDFB5` | Center action (resting) |
| `--green` | `#61BC8F` | Center action (open) + count badge |
| `--shell-cta-ink` | deep forest | "+" glyph |
| `--r-pill` | `999px` | Center action + badge radius |
| `--gaia-transition-state` | ≈180ms | State transitions |

---

## 10. Do / Don't

**Do**
- Keep it to 4 tabs + 1 center action.
- Use color-only selection for tabs (quiet, no chrome).
- Put the primary create action in the raised center slot.
- Show numbered badges for pending counts.

**Don't**
- Don't reintroduce a hamburger / side drawer for top-level areas.
- Don't give the "+" a selected/destination state.
- Don't add pills, fills, or underlines to the active tab.
- Don't hide labels or let them wrap.
- Don't exceed 5 slots or make the bar scroll.
