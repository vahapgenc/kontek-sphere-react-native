# Kontek Sphere — React Native app

Expo (managed) + TypeScript. This package is **Plan 1**: the design-system component
library, ported from `../design/` and verified with a dev gallery screen.

## Prerequisites

- **Node ≥ 20.19.4** (React Native 0.85 requires it). You are likely on an older 20.x —
  bump it first, or `npm start` will fail. Use nvm-windows / Volta, or install Node 22 LTS.
- The **Expo Go** app on a physical phone (iOS App Store / Google Play) is the easiest way
  to preview. Alternatively an Android emulator or (on macOS) the iOS simulator.

## Run the gallery

```bash
cd app
npm install        # first time only
npm start          # starts the Expo dev server + QR code
```

Then:
- **Phone (easiest):** open Expo Go and scan the QR code in the terminal.
- **Android emulator:** press `a` in the terminal.
- **iOS simulator (macOS only):** press `i`.
- **Web preview:** `npm run web` (or press `w`).

`App.tsx` renders `src/screens/GalleryScreen.tsx`, which shows every component
(typography, buttons, badges, inputs, list rows, feedback, flow primitives, overlays) so
you can compare against `../design/Kontek Design System/preview/*.html`.

## Project structure

```
src/
  tokens/       generated from design/Kontek Design System/colors_and_type.css
  theme/        ThemeProvider + useTheme() (loads Open Sans)
  icons/        KIcon — the ported SVG icon set
  components/   design-system library (import from '../components')
    buttons/ inputs/ surfaces/ data-display/ feedback/ navigation/ flow/
  screens/      GalleryScreen (dev verification)
```

## Verify it compiles

```bash
npx tsc --noEmit   # passes clean
```

## Next (Plan 2)

Screens & flows from `../design/SPHERE - Full Prototype/`, plus the contract-first API
layer (mock adapter → real backend via a `USE_MOCKS` switch). See `../PLAN.md`.
