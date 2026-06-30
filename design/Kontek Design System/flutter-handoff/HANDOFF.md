# Kontek Design System → Flutter handoff

A starter package that translates the Kontek mobile design system (CSS tokens +
HTML specs) into Flutter/Dart foundations. Drop `lib/` into your app, wire the
theme into `MaterialApp`, and build widgets against real token values — not
screenshots.

> This is a **handoff package**, not an auto-generated app. It gives you the
> foundations as code plus a component→widget map. You still write the widgets
> and screens.

---

## 1. Install

Add one dependency (Open Sans):

```yaml
# pubspec.yaml
dependencies:
  flutter:
    sdk: flutter
  google_fonts: ^6.2.1
```

Copy `lib/kontek_colors.dart`, `kontek_typography.dart`, `kontek_tokens.dart`
and `kontek_theme.dart` into your project's `lib/` (e.g. under `lib/theme/`).

## 2. Wire the theme

```dart
import 'package:flutter/material.dart';
import 'theme/kontek_theme.dart';

void main() => runApp(const KontekApp());

class KontekApp extends StatelessWidget {
  const KontekApp({super.key});
  @override
  Widget build(BuildContext context) => MaterialApp(
        title: 'Kontek',
        theme: KontekTheme.light,
        home: const HomeScreen(),
      );
}
```

That alone gives you on-brand buttons, inputs, switches, cards, app bar,
bottom nav, sheets, FAB and snackbars.

## 3. What's in the package

| File | Contents |
|---|---|
| `kontek_colors.dart` | Every color token, named 1:1 with the CSS variables |
| `kontek_typography.dart` | Open Sans type scale, weights, and a ready `TextTheme` |
| `kontek_tokens.dart` | Spacing, radii, sizing/touch, elevation (BoxShadow), motion |
| `kontek_theme.dart` | Composed `ThemeData` wiring all of the above into Material |

---

## 4. Foundations reference

### Color roles (the important ones)
- **`signature` `#203B3C`** → primary CTA fill, active tab text. *(Material `primary`)*
- **`green` `#61BC8F`** → toggle / checkbox fill, secondary-CTA pressed. *(Material `secondary`)*
- **`statusBadge` `#9DDFB5`** → status pill bg, resting nav text, **secondary CTA fill**.
- **`kontekGreen` `#053F22`** → **nav bar + sidebar background ONLY**.
- **`red` `#E1462E`** → destructive actions only. Green = positive/approve.
- **`canvas` `#ECEFF3`** page bg · **`surface` `#FFFFFF`** cards/forms · **`ink` `#0F1112`** text.

### Type scale (logical px)
`display 36 · h1 28 · h2 22 · h3 19 · title 17 · body 16 · bodySm 15 · caption 13 · eyebrow 12 · micro 11`
Body is 16 so iOS never zoom-focuses a field.

### Sizing / touch
`tapMin 48 · controlH 48 · controlHLg 56 · controlHSm 40 · appBarH 56 · tabBarH 58`.
**48 is the shared minimum** (iOS 44pt · Android 48dp) — never go below it.

### Radii
`button 12 · input 12 · card 16 · panel 20 · sheet 24 (top corners) · pill 999 · sm 8`.

### Spacing — 4px base
`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64`. Screen gutter 16 (20 for hero).

### Motion
`instant 50 · fast 100 · moderate 150 · slow 250 · slower 400` ms.
Easing: `standard` for most, `entrance`/`exit` for reveal/dismiss.

---

## 5. Component → Flutter widget map

| Design system pattern | Flutter widget | Notes |
|---|---|---|
| Primary button | `FilledButton` | themed; 48px, radius 12, teal fill |
| Secondary button (outline) | `OutlinedButton` | white fill, `line` border |
| Ghost / text button | `TextButton` | |
| Secondary CTA (mint) | `FilledButton.styleFrom(backgroundColor: KontekColors.action2, foregroundColor: KontekColors.kontekGreen)` | pressed → `green` |
| Approve button | `FilledButton` + `backgroundColor: green, foregroundColor: ground` | |
| Destructive | `TextButton` + `foregroundColor: danger` | |
| Text field / search | `TextField` / `TextFormField` | themed; prefix icon for search |
| Select / dropdown | `DropdownButtonFormField` | |
| Checkbox / radio / switch | `Checkbox` / `Radio` / `Switch` | themed; green fill |
| Segmented control | `SegmentedButton` | |
| Badge / status pill | `Container` w/ `pill` radius + `statusBadge`/status-soft bg | |
| Avatar | `CircleAvatar` | initials on `guide`; sizes 24/32/40/48/64 |
| App bar (compact) | `AppBar` | themed, 56px, centered title |
| App bar (large-title) | `SliverAppBar.large` | collapses to compact on scroll |
| Bottom tab bar | `NavigationBar` | light: themed. **Dark/green bar:** set `backgroundColor: shellBg`, white icons + labels, active pure white |
| List rows (inset/full-bleed) | `ListTile` in a bordered `Card` (inset) or plain (full-bleed) | min height 48 |
| Bottom sheet / action sheet | `showModalBottomSheet` | 24px top radius, drag handle |
| Dialog | `showDialog` + `AlertDialog` | radius 24 |
| FAB | `FloatingActionButton` | the single persistent "create" action |
| Banner | `MaterialBanner` | use status-soft bg + status text |
| Snackbar / toast | `ScaffoldMessenger.showSnackBar` | themed (floating, `ground` bg) |
| Pull-to-refresh | `RefreshIndicator` | `color: green` |
| Loading skeleton | `shimmer` pkg or `AnimatedOpacity` blocks | use `surface2` blocks |
| Spinner | `CircularProgressIndicator` | `color: signature` |

---

## 6. Things to handle yourself
- **Dark/green tab bar & app bar** — Flutter themes one nav style; build the
  forest variant as a configured `NavigationBar`/`AppBar` (white on `shellBg`).
- **Status colors in components** — pair each status *text* color with its
  *-soft* background (e.g. `danger` on `dangerSoft`).
- **Reduced motion** — gate animation durations behind
  `MediaQuery.disableAnimations` and collapse to `Duration.zero`.
- **Safe areas** — wrap screens in `SafeArea`; app bar/tab bar heights here
  exclude the inset (matching the CSS `env(safe-area-inset-*)`).

---

*Generated from `colors_and_type.css` and `mobile.css`. If those tokens change,
regenerate `kontek_colors.dart` / `kontek_tokens.dart` to keep parity.*
