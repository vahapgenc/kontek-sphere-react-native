# Plan 2 — Build the real Sphere app from the Full Prototype

## Context

The design-system layer is done: token theme, ~31 `K*` components, and a native Design
System Overview (47 spec cards) under `app/src/`. **Plan 2 builds the actual employee app**,
porting `design/SPHERE - Full Prototype/` to React Native **exactly**, with full **English +
Swedish** support, reusing the existing components (see the component-reuse-first rule:
always check `app/src/components/` before creating anything new).

Prototype = **27 views**: 5 root tabs (+2 manager-only), ~18 detail/list screens, and 3
multi-step flows (absence, expense, complete). Tab + stack navigation, an auth gate, and an
employee↔manager mode toggle. Source files: `k-app.jsx` (shell/router/home), `k-login.jsx`,
`k-absence.jsx`, `k-expense.jsx`, `k-flow.jsx`, `k-misc.jsx` (most screens), `k-data.jsx`
(mock data), `k-i18n.js` (EN/SV).

**Maintenance workflow (ongoing):** when the design changes, the owner points at the design
repo's **git log**; we diff what changed in `design/SPHERE - Full Prototype/` (or the design
system) and implement just that delta. The app is the source of record; the prototype is the
spec.

## Foundation decisions

| Concern | Approach |
|---|---|
| Navigation | React Navigation: bottom-tabs (Hem · Lön/Payslips · Kalender · Profil + center FAB; manager swaps to `me`/`employees` + Approvals), native-stack per tab, auth gate, mirrors `k-app.jsx` `nav.push/pop/go` |
| i18n | **react-i18next**. Extract the ~460 EN↔SV pairs from `k-i18n.js` into `key→{en,sv}` resources; screens use `t('key')` — NOT runtime DOM swapping (impossible in RN). Persist language (Async/secure store); month/weekday/currency handled by `Intl` + a `kr()` money formatter util |
| App state | **Zustand** for session: `authed`, active company, employee/manager mode, scenario, language, notification-read set |
| Server data | **TanStack Query** over a contract-first API client with a `USE_MOCKS` switch; typed DTOs + mock fixtures from `k-data.jsx`, shaped to the real `/api/v1` backend (see Plan-2 data note). Backend wiring stays behind the switch for now |
| Reuse rule | Compose screens from existing `K*`; build new components in `src/components/<category>/`, export from the barrel, add a spec entry so they appear in the Overview |

## New components to build (the gaps) — add to the library, not inline
- `KBalanceTiles` — 3-up soft-mint balance cards (used/remaining) — payslips, balanceDetail, employeeDetail
- `KCalendarMonth` — month grid with activity markers + tap-to-detail (extend/parallel to the flow `KCalendar` range picker) — calendar screen
- `KApprovalRow` — approval list row with inline approve/reject + undo — approvals
- `KRejectSheet` — bottom sheet with reason `KTextArea` + submit — approveDetail/approvals
- `KCollapsibleSection` — section header + chevron toggling a group of rows — home, payslips
- `money.ts` util — `kr(n, {sign})` → "24 380 kr", "−890 kr", "+1 240 kr" (mirror prototype `kr()`)
- Small: two-step login form composition, editable profile field sheet (compose `KTextField` + `KBottomSheet`)

## Data layer (typed mocks, contract-first)
`src/api/types.ts` DTOs + `src/mocks/` fixtures from `k-data.jsx`: ME, PERIOD, UPCOMING(+SICK2),
TODOS, ACTIVITY, SCENARIOS, PAYSLIPS, BALANCES, ABSENCE_TYPES, EXP_CATS, BANK_ACCOUNTS,
COMPANIES, CALENDAR_EVENTS, TEAM, APPROVALS. Mark optionals (`reason`, `flag`, `sickHistory`,
`linked`) `?`. Status literal types: `'action'|'pending'|'approved'|'rejected'|'info'`. The
`SCENARIOS` switch (Standard / Sick 2 days) drives home feed + activity. Replicate the
`withHistory()/genDays()` helpers as fixture builders.

## Build order (incremental, reviewable)

**Step A — App foundation.** Navigation graph (tabs + stack + auth gate + mode toggle),
Zustand session store, react-i18next setup with extracted EN/SV resources + language switch,
money/date utils, the contract-first API client + typed mocks. App boots to the login gate.

**Step B — New shared components** (the gap list above), each with a spec entry in the Overview.

**Step C — Screens, in priority groups** (each composed from `K*`, every interactable a
`testID`, all copy via `t()`):
- **Group 1 — entry & core:** Login (2-step + BankID), Home (pay hero + collapsible To-do/
  Registrations/Previous + activity), Profile (+ language switch, logout), Companies (switch + toast).
- **Group 2 — pay:** Payslips list (+ balance tiles), Payslip detail (breakdown + "Stämmer din
  lön?" check), Upcoming, PayCheck (contact payroll), BalanceDetail.
- **Group 3 — flows:** Absence (type → dates → cert >7d → confirm → success), Expense (receipt →
  category/amount/desc → confirm → success, "inget kvitto" path), Complete/fix, Status/regDetail.
- **Group 4 — calendar & notifications:** Calendar (month grid + events), Notifications (mark read).
- **Group 5 — manager:** Approvals (list + inline approve/reject + undo), ApproveDetail (+ reject
  sheet), Team, EmployeeDetail, Employment, BankAccounts.

**Step D — Wire & verify.** Point `App.tsx` at the app navigator (keep the Design System Overview
reachable via a profile/dev entry). Verify each screen against the running prototype.

## Progress

- ✅ **Foundation** — navigation (auth gate → tabs via KTabBar + center FAB), Zustand session,
  react-i18next EN/SV + ported `localize()` for mock-data strings, money util, typed mocks.
- ✅ **Group 1** — Login (2-step mock), Home (sticky/docking pay hero, collapsible sections,
  manager to-dos), Profile + My companies + Bank accounts + Employment details + Language sheet.
- ✅ **Home detail flows** — Complete (attach receipt/certificate) + Details status timeline
  (KStatusTimeline), all statuses. New shared components: KFieldRow, KStatusTimeline,
  KCollapsibleSection, KProductCard, KTopMenu, KOptimisticUndo.
- ✅ **Mode-based tabs** — employee (Home/Pay/Calendar/Profile) vs manager (Home/Me/Employees/Profile).
- ✅ **Parity fixes** — body text → ink; KCard = .ds-mcard; real chevron icons; KAttachment
  camera+plus+clear; outlined danger button; sentence-case section labels; app-bg + bell badges.
- ✅ **Group 2 — pay** — PayslipsScreen (Pay tab), PayslipDetail (+ "Stämmer din lön?" → PayCheck),
  UpcomingScreen, BalanceDetailScreen; KBalanceTiles; Pay tab + Home pay-hero → Upcoming wired.
- ✅ **Group 3 — register flows** — center-FAB register hub + AbsenceFlow (type → dates → cert>7d →
  confirm → success) + ExpenseFlow (receipt → category/amount/desc → confirm → success, "inget kvitto"
  path), both via KFlowShell. Flows render as an **in-shell overlay** so the tab bar stays visible
  (mirrors the prototype); tapping a tab or "Go to home" closes the flow.
- ✅ **Notification bell** — shared `KNotificationBell` on every root tab (Home/Pay/Profile), single
  `useUnreadNotifCount()` source; not shown on flow/detail screens (per the prototype's app-bar rule).
- ✅ **Register-flow fidelity pass** — segmented `KSteps` paginator (not "N/M"); `KIcon` header
  actions; calendar taken from the prototype CSS (wide inset-3 pills, brand-100 continuous band,
  brand-500 today ring, month arrows); underlined `KTextLink` opt-outs; `KAttachment` built-in picker
  sheet (Take photo / Choose a file); `KSuccess` per-line icons on the gradient; `KBottomSheet` and the
  register/flow FABs (`KOverlayFab`) stop above / paint over the tab bar so the menu + FAB stay visible.

**Fidelity discipline (mandatory going forward):** for every new screen, read its prototype
function in k-misc.jsx / k-flow.jsx / k-app.jsx and reproduce it EXACTLY — layout, copy, colors
(default text = --ink; muted = ink-2/ink-3), card = .ds-mcard, icons via KIcon, sizes/paddings from
the source. Reuse K* first; new components go in the library + Overview. Self-audit against the
source before declaring done — do not rely on the user to find diffs.

### Remaining (in order)
- **Group 4 — calendar & notifications** (NEXT): CalendarScreen (month grid + events; new
  `KCalendarMonth`), NotificationsScreen (list + mark-all-read; wire the bell's onPress + real
  notification fixtures, replacing the `useUnreadNotifCount()` seed).
- **Group 5 — manager:** MeScreen, EmployeesScreen/Team, ApprovalsScreen (+ inline approve/reject +
  optimistic undo), ApproveDetailScreen (+ reject sheet), EmployeeDetailScreen.

## Verification
- `npx tsc --noEmit` clean after each step; run on web (`npm start` → `w`) — needs Node ≥ 20.19.4.
- Compare each screen side-by-side with the prototype (`Kontek Anställd-app.html`): layout, copy,
  states. Toggle **EN/SV** and confirm every visible string switches via `t()`.
- Exercise flows end-to-end on mocks: absence submit appears in activity; expense "no receipt"
  creates a to-do; approve→undo works; company switch re-seeds the feed; manager/employee toggle
  swaps tabs.
- Every interactable has a `testID`.

## Notes
- Backend integration (real `/api/v1` via the gateway, Visma OIDC) stays behind `USE_MOCKS`;
  flip per-feature later — not in this plan's scope.
- Keep the Design System Overview intact; new gap components join it.
