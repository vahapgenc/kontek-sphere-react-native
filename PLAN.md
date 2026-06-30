# React Native Build Plan — Kontek Sphere

## Context

Build the Sphere mobile app in **React Native**, with the UI sourced **entirely from this
repo's `design/` folder** (tokens, styles, icons, photos, component specs, screen logic,
mock values, EN/SV translations) and the data layer modeled on the **real backend REST
contract** (`/api/v1/...` via the gateway on :8080). **Do NOT reference the Flutter app.**

Two UI source folders, both under `design/`:

- `design/Kontek Design System/` — 262 tokens (`colors_and_type.css`), mobile patterns
  (`mobile.css`), ~48 component specs (`preview/*.html`), brand assets (`assets/`).
- `design/SPHERE - Full Prototype/` — the clickable app: **23 screens** (5 tabs, 15
  detail/modal, 3 flows), 2 multi-step flows, tab+stack nav, manager/employee mode,
  bilingual. Files: `k-ui.jsx` (atoms + SVG icons), `k-flow.jsx` (flow primitives),
  `k-login/absence/expense/misc.jsx` (screens), `k-app.jsx` (shell+router), `k-data.jsx`
  (mock values), `k-i18n.js` (EN/SV), `icons/`, `kontek-logo-white.png`.

**Data strategy — contract-first mock adapter.** The app's API layer is typed to the real
backend endpoints from day one, but served by **mock fixtures** behind a `USE_MOCKS`
switch. Mock fixtures are shaped to the real response DTOs so they double as DB seed data.
Going live = collect/seed data → set `USE_MOCKS=false` + point `API_URL` at the gateway →
ready, with **no screen or repository rewrite**.

**Two plans, in order** (screens depend on components): Plan 1 = fundamental components;
Plan 2 = flows/screens + the contract-first data layer.

---

## Foundation decisions (recommended defaults — confirm or override)

| Choice | Recommendation | Why |
|---|---|---|
| Toolchain | **Expo (managed) + TypeScript** | Fast, batteries-included, easy device preview |
| Navigation | **React Navigation** (native-stack + bottom-tabs) | Maps 1:1 to the prototype's tab+stack model |
| Server data | **TanStack Query** over a typed API client + mock adapter | Caching/refetch; the mock↔real switch lives in the client |
| UI/local state | **Zustand** | Replaces the prototype's ad-hoc store |
| Styling | **Token-first theme + StyleSheet** | Tokens generated from `colors_and_type.css` = single source of truth |
| i18n | **i18next**, seeded from `k-i18n.js` | Reuse the prototype's own EN/SV pairs |
| Icons / assets | Port the `k-ui.jsx` SVG set via `react-native-svg`; copy `icons/` + `assets/` | All already in `design/` |

---

## Data layer — contract-first mock adapter (spans both plans)

- `src/api/types.ts` — TypeScript DTOs mirroring the backend (TokenResponse, EmploymentDTO,
  ProfileDTO, TimeEntryDTO, AbsenceRequestDTO, ExpenseDTO, NotificationDTO, PayslipDTO,
  `Page<T>` wrapper, standard error envelope).
- `src/api/client.ts` — one HTTP client with `API_URL` + `USE_MOCKS` config (env/app.config),
  gateway headers, and the auth/refresh handling. When `USE_MOCKS=true`, requests resolve
  from `src/mocks/` instead of the network.
- `src/api/<feature>.ts` — typed endpoint functions per feature group (paths below).
- `src/mocks/<feature>.ts` — fixtures shaped to the real DTOs, seeded from `k-data.jsx`
  values; structured so the same JSON can seed the DB later.
- `src/features/<feature>/` — TanStack Query hooks (repositories) the screens consume; these
  are identical whether data is mock or real.

### Backend endpoint groups the API layer mirrors (all `/api/v1`, gateway :8080)
- **auth** (public): `POST /auth/token`, `POST /auth/refresh`, `DELETE /auth/session`,
  `POST /auth/switch-company`, `GET /auth/me`
- **settings**: `GET|PUT /me/settings`
- **employment/profile/company**: `GET|PATCH /employment/me`, `GET /employments`,
  `GET/PATCH /employments/{id}`, `GET /profile/me`, `PUT /profile/me/active-company`,
  `DELETE /profile/me/bank-accounts/{employmentId}`, `GET /profile/me/team`,
  `GET /companies/{id}`
- **time**: `POST /time-entries/clock-in|clock-out`, `GET /time-entries/active`,
  `GET /time-entries`, batch `POST /time-entries`, `PATCH /time-entries/{id}`,
  `GET /time-entries/summary/weekly`, `/anomalies`, `/team`, `/team/summary`
- **absence**: `POST|GET /absence-requests`, `/pending`, `GET /absence-requests/{id}`,
  `/{id}/approve|reject|undo|certificate`, `DELETE /{id}`, `/batch-approve`, `/pay-impact`,
  `/vacation-balance`
- **expense**: `POST|GET /expenses`, `GET/PATCH/DELETE /expenses/{id}`, `/{id}/submit`,
  `/pending`, `/{id}/approve|reject`, `/{id}/receipt`
- **notifications**: `GET /notifications`, `/unread-count`, `PATCH /{id}/read`,
  `/read-all`, `DELETE /{id}`, push-subscription
- **payslips**: `GET /pay-slips`, `GET /pay-slips/{id}`, `/{id}/file`

Conventions: list endpoints are `Page<T>` with `page`/`size`/`sort`; manager-only endpoints
require `X-User-Role: MANAGER|ADMIN`; multipart uploads for certificate/receipt; dates
`yyyy-MM-dd`, timestamps ISO-8601 UTC.

---

## PLAN 1 — Fundamental components (from `design/`, do first)

### Phase 0 — Scaffold
- `create-expo-app` (TypeScript) at `kontek-sphere-react-native/app/` (leave `design/` as
  reference). Deps: react-navigation, @tanstack/react-query, zustand, i18next,
  react-native-svg, expo-font, expo-linear-gradient.
- Structure: `src/tokens/`, `src/theme/`, `src/components/{buttons,inputs,surfaces,navigation,data-display,feedback,actions}/`, `src/icons/`, `src/screens/`, `src/flows/`, `src/i18n/`, `src/navigation/`, `src/api/`, `src/mocks/`, `src/features/`, `assets/`.

### Phase 1 — Tokens, theme, icons, assets
- Generate `src/tokens/*.ts` from `colors_and_type.css` (colors, type, spacing, sizing,
  radii, shadows, motion) with a `// GENERATED` header + re-runnable sync script.
- `ThemeProvider` + `useTheme()`; fonts via `expo-font`.
- Port the `k-ui.jsx` SVG icon set into `src/icons/`; copy `icons/` + `assets/`.
- Map CSS → RN: `box-shadow` → `shadowColor/elevation`, gradients → `expo-linear-gradient`.

### Phase 2 — Port components in dependency order
From `preview/<name>.html` + `mobile.css` `.ds-*` rules + matching atoms in
`k-ui.jsx`/`k-flow.jsx`. **Every interactable gets a `testID`.**
- Atoms/molecules: Icon, Text, Button (primary/secondary/approve/danger/ghost), Badge,
  Avatar, Card, List+Row, TextField, TextArea, Select, Search, Checkbox, Radio, Switch,
  SegmentedControl, IconTile, FAB, Steps.
- Organisms: AppBar, TabBar (light+dark), BottomSheet (+scrim), Dialog, Loading/Skeleton,
  Toast/Banner, InfoNote, StatusRow.
- Flow primitives: FlowShell, OptionCard, Calendar (range picker), ImpactCard, Attachment,
  Success.

### Plan 1 verification
Dev-only gallery screen renders every component vs `preview/*.html`; token values spot-checked
against `colors_and_type.css`; `tsc`/lint clean; smoke render test per component.

---

## PLAN 2 — Sphere flows & screens (after Plan 1)

### Phase 3 — App shell & navigation
Auth gate → bottom-tabs (Home, Payslips/Employees, Calendar, Profile + center FAB),
native-stack per tab, mirroring `k-app.jsx`'s `tab`/`stack`/`nav.push/pop`. Manager vs
employee mode swaps Payslips↔Employees and reveals approvals.

### Phase 4 — Data layer + i18n
Build the contract-first API client + typed DTOs + mock fixtures (see "Data layer" above),
seeded from `k-data.jsx`. Stand up i18next from `k-i18n.js`. With `USE_MOCKS=true`, every
screen renders against realistic, contract-shaped data.

### Phase 5 — Port screens, in priority groups (each wired to its TanStack Query hooks)
- **Group A — core employee:** Login (2-step + BankID), Home (pay hero, to-do, activity),
  Payslips list + detail + PayCheck, Notifications, Profile.
- **Group B — flows:** Absence (type → dates → conditional cert >7 days → confirm →
  success), Expense (amount → optional receipt → confirm → success), Complete/fix flow.
- **Group C — detail:** companies, status/regDetail, balanceDetail, bankAccounts,
  employment, calendar, upcoming, history.
- **Group D — manager:** employees/team, approvals, approveDetail, employeeDetail.

### Phase 6 — Go live (flip the switch)
Collect mock data → seed the DB → set `USE_MOCKS=false` + `API_URL`=gateway → wire real
auth (Visma Connect OIDC+PKCE via expo-auth-session, tokens in expo-secure-store, refresh).
No screen/repository rewrite — only the client config changes.

### Plan 2 verification
Each screen matches the prototype (vs the running `Kontek Anställd-app.html`); every
interactable has a `testID`; push/pop/tab-switch + manager/employee mode + EN/SV all work;
app runs end-to-end on mocks; then a smoke test against the real gateway after the flip.

---

## Critical files / locations
- UI source (inside `design/`): `Kontek Design System/colors_and_type.css`, `mobile.css`,
  `preview/*.html`, `assets/`; `SPHERE - Full Prototype/k-*.jsx`, `k-data.jsx`, `k-i18n.js`,
  `icons/`
- API contract reference: see "Backend endpoint groups" above (paths via gateway :8080)
- New app root (to create): `kontek-sphere-react-native/app/` (`src/...`)

## Sequencing
Plan 1 (Phases 0–2) before Plan 2 screen work (Phase 5). Phases 3–4 can start once Phase 1
lands. Phase 6 happens per-feature whenever its DB data is ready — independent of UI work.

## Open decisions to confirm
1. Expo (managed) vs bare React Native CLI — default: **Expo**.
2. Styling: token theme + StyleSheet vs NativeWind — default: token theme.
3. First delivery scope: Plan 1 only, or Plan 1 + Group A screens — default: **Plan 1 first, then reassess**.
