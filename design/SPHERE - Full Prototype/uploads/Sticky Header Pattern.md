# Scroll-Aware Sticky Header Pattern

A reusable pattern for a mobile app header that is **transparent at rest** and, **on scroll**, becomes a frosted band with a hairline divider — while a hero/summary card **docks into** that header (sheds its rounded card look and merges with the bar as one pinned heading). Built with React + inline styles over a colored/gradient page background.

---

## Behavior

- **At top (scrollTop ≈ 0):** the app bar is fully transparent and blends into the page gradient. The hero is a rounded, floating card with a soft shadow.
- **Scrolled (> 4px):** the app bar gains a frosted translucent fill + blur. The hero loses its radius/shadow, adopts the same frosted fill, bleeds full-width to the screen edges, and a single hairline divider sits beneath it — so bar + hero read as one cohesive sticky heading. Content scrolls underneath.
- The hero stays **sticky** in both its collapsed and expanded states.

---

## 1. Detect scroll on the scroll container

The header lives **outside** the scrolling element (a sibling pinned at the top); content scrolls in a separate `.scroll` div.

```jsx
const [scrolled, setScrolled] = useState(false);

// reset when the screen/route changes (the scroll div remounts at top)
useEffect(() => { setScrolled(false); }, [screenKey]);

<div className="app">           {/* page bg / gradient lives here */}
  <AppBar scrolled={scrolled} /> {/* pinned sibling, NOT inside .scroll */}
  <div
    className="scroll"
    onScroll={(e) => {
      const s = e.currentTarget.scrollTop > 4;
      setScrolled(v => (v === s ? v : s));   // avoid redundant renders
    }}
    style={{ flex: 1, overflowY: "auto", background: "transparent" }}
  >
    {screen /* contains the sticky hero */}
  </div>
</div>
```

Key points: the page background is on `.app`; `.scroll` is `transparent` so the background shows through; the header is a sibling so it's always pinned.

---

## 2. Frosted-on-scroll app bar

```jsx
function AppBar({ scrolled, noDivider, children }) {
  const frost = scrolled
    ? {
        background: "color-mix(in srgb, #F2F8F5 76%, transparent)",
        backdropFilter: "blur(16px) saturate(150%)",
        WebkitBackdropFilter: "blur(16px) saturate(150%)",
        borderBottom: noDivider ? "none" : "1px solid rgba(18,33,33,0.07)",
      }
    : {
        background: "transparent",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        borderBottom: "none",
      };

  return (
    <div style={{
      flexShrink: 0,
      zIndex: 6,
      transition: "background .25s ease, border-color .25s ease",
      ...frost,
    }}>
      {children}
    </div>
  );
}
```

- `#F2F8F5` is the frosted tint — swap for a near-white sampled from the **top** of your page gradient so the bar feels like frosted glass over it.
- Pass **`noDivider`** on the screen whose hero docks (the hero carries the divider instead — see §3). Other screens keep the bar's own divider.

---

## 3. Hero that docks into the header

The hero is `position: sticky; top: 0` inside the scroll container, so it pins right under the bar. Its style swaps on `scrolled`:

```jsx
<div style={{
  position: "sticky", top: 0, zIndex: 5,
  color: "var(--signature)",
  transition: "background .25s ease, border-radius .25s ease, box-shadow .25s ease, padding .25s ease, margin .25s ease",
  ...(scrolled ? {
    /* DOCKED — merge into the header band */
    background: "color-mix(in srgb, #F2F8F5 76%, transparent)",   // same tint as the bar
    backdropFilter: "blur(16px) saturate(150%)",
    WebkitBackdropFilter: "blur(16px) saturate(150%)",
    border: "none",
    borderBottom: "1px solid rgba(18,33,33,0.07)",                 // the unifying divider
    borderRadius: 0,
    padding: "12px 16px 14px",                                     // compact
    marginLeft: -16, marginRight: -16,                             // bleed past the gutter to full width
    boxShadow: "none",
  } : {
    /* RESTING — floating card */
    background: "linear-gradient(145deg, #F0FAF4 0%, #DBEFE3 100%)",
    border: "1px solid rgba(32,59,60,0.06)",
    borderRadius: 24,
    padding: "22px 24px",
    boxShadow: "0 16px 34px -14px rgba(32,59,60,0.26)",
  }),
}}>
  {/* hero content */}
</div>
```

- `marginLeft/Right: -16` cancels the screen gutter (16px) so the docked band reaches the edges. Match the negative margin to your gutter.
- Keep the hero **always** `position: sticky` (don't switch to `relative` when expanded) so it stays pinned in every state.
- The resting `background` here is the app's mint hero gradient — substitute your own card fill.

---

## 4. Values to retune for your design

| Token | Value used | What to change it to |
|---|---|---|
| Frosted tint | `#F2F8F5` @ 76% | a near-white sampled from the top of your gradient |
| Blur | `blur(16px) saturate(150%)` | taste |
| Divider | `rgba(18,33,33,0.07)` | a low-alpha version of your darkest ink |
| Scroll threshold | `4px` | higher if you want it to engage later |
| Gutter / bleed | `16px` / `-16px` | your screen side padding |
| Transition | `.25s ease` | taste |

---

## Gotchas

- The header must be a **sibling** of the scroll container (pinned), not inside it — otherwise it scrolls away.
- `.scroll` (and the header at rest) must be `transparent` so the page background reads edge-to-edge.
- Reset `scrolled` to `false` whenever the route/screen changes, because a remounted scroll div starts at `scrollTop: 0` but won't fire a `scroll` event.
- `backdrop-filter` needs the `-webkit-` prefix for Safari.
- Use the **same** frosted tint on the bar and the docked hero so they read as one surface.
