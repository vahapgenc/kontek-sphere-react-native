# Kontek Design System — Mobile

The design system for the **Kontek payroll app** on iPhone and Android.

It's built for one thing: making payroll feel calm and handled on a phone. Everything here is sized for thumbs, easy to read on a small screen, and looks the same on both iPhone and Android — one consistent Kontek style, not two.

---

## How it feels

Calm, confident and human. The app does the heavy lifting and surfaces the one thing that needs you — *"your payroll is handled, here's what's left for you."*

- **Tone:** Warm but professional. Speaks Swedish, talks to you directly, never hyped or cute.
- **Look:** Deep forest green and soft off-white, with clean white cards. Generous spacing so nothing feels cramped.
- **Color with meaning:** Green is the positive, go-ahead action (approve, save). Red is only ever for things you can't undo (cancel a run, delete). Everything else stays quiet and neutral.
- **One typeface** (Open Sans) at comfortable, readable sizes.
- **Sentence case, never all-caps.** A capital first letter, the rest lower-case — eyebrows, labels and headings included. No UPPERCASE, no Title Case. The one exception is a person's initials (e.g. avatars: "AL").
- **Gentle motion.** Soft, quick, never flashy. Nothing spins or bounces.

---

## What's inside

- **Colors** — the full Kontek palette and what each color is for.
- **Type** — text sizes and styles, tuned for phone screens.
- **Spacing, sizing & corners** — the rules that keep everything consistent and comfortable to tap.
- **Building blocks** — buttons, inputs, switches, checkboxes, badges, avatars and more.
- **Mobile patterns** — the top bar, bottom navigation, lists, pop-up sheets, the floating "+" button, alerts and loading states.
- **The Sphere look** — the choices that make the employee app feel like Sphere: the floating-card recipe, the pale-forest app background, the soft-mint pay/hero card, the frosted scroll-in app bar, icon tiles & chips, optimistic undo, and the voice & tone.
- **Navigation** — three ways to move around the app, with guidance on when to use each.

Every card opens with a **short intro** and carries exactly **one Dos & don'ts** section — what to do, what to avoid, and a visual good/bad pair where it helps.

Use the **Design System Overview** for a visual tour of everything, grouped into atoms, molecules and organisms.

---

## Badges — two distinct things

There are two unrelated things called "badge". Keep them separate (full spec: `uploads/Sphere Badges - Spec.md`).

- **Status pill** (`<Badge>`) — says *what state*. Pill shape, `4px 10px`, 11px/600, optional leading 6px dot in the text colour. Colour is **never** hand-set: pick a **tone by meaning** and use its matched text + soft-bg pair. The six tones are the complete set: `ok` (done/good), `warn` (needs you), `info` (in progress, the default), `danger` (failed/negative), `neutral` (quiet metadata), `brand` (brand marker e.g. "Preliminär"). A live state of a real item gets a **dot**; a static tag/metadata does **not**. Labels are 1–2 words, sentence case, never truncated.
- **Count badge** (`.ds-tab__badge`) — says *how many*. An 18px circle that grows to a pill for 2+ digits, white 11px number, 2px `--surface` ring, on the top-right of an icon. **`--green` fill is for the bottom-nav tabs only**; everywhere else a count appears (app-bar bell, section header) it's the neutral dark-grey `--ink-3` fill (`.ds-tab__badge--neutral`). Show it **only when the count is > 0**.

Hard rules: never put a count inside a pill (counts are circles) or a status word inside a circle; never render a "0" badge; `danger` marks a negative/failed state only — it is **not** the destructive-action colour; an uncovered state maps to `neutral`, never a 7th colour. **Pills mean what state; circles mean how many — never mix the two.**

---

## Provenance

The system is the canonical reference behind the **Kontek Sphere** employee mobile app. Where that prototype extends the base, those decisions have been promoted into the tokens — the floating-card shadow (`--sh-1`), the app background (`--app-bg`), the soft-mint hero (`--mint-grad`), and the frosted bar (`--frost-bg` / `--frost-blur` / `--frost-line`). The full spec lives in `uploads/SPHERE Mobile App - Design Spec.md`.
