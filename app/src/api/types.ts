// ============================================================
// types.ts — typed shapes for the Sphere prototype data
// Ported from design/SPHERE - Full Prototype/k-data.jsx
// ============================================================

/** Status literals used across to-dos, activity feed, calendar events. */
export type Status = 'action' | 'pending' | 'approved' | 'rejected' | 'info';

/** Whether a company gives the user the employee or manager experience. */
export type CompanyKind = 'employee' | 'manager';

/** Generic page wrapper for future API parity (Spring Data style). */
export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

// ---- The signed-in employee -------------------------------

export interface Me {
  name: string;
  role: string;
  employer: string;
  hrName: string;
  hrRole: string;
  monthlyGross: number;
  email: string;
  phone: string;
  address: string;
  personalId: string;
  employmentType: string;
  startDate: string;
  manager: string;
}

// ---- Period info ------------------------------------------

export interface Period {
  label: string;
  payday: string;
  daysToPay: number;
  reportDeadline: string;
}

// ---- Preliminary upcoming pay -----------------------------

export type UpcomingItemType = 'base' | 'add' | 'deduct' | 'tax';

export interface UpcomingItem {
  id: string;
  label: string;
  amount: number;
  type: UpcomingItemType;
  /** Links to a related to-do (e.g. a sick-leave item). */
  linked?: string;
}

export interface Upcoming {
  month: string;
  payday: string;
  estNet: number;
  prevNet: number;
  base: number;
  items: UpcomingItem[];
}

// ---- To-do list (needs the employee's attention) ----------

export type TodoKind = 'expense' | 'absence';

export interface Todo {
  id: string;
  kind: TodoKind;
  title: string;
  sub: string;
  status: Status;
  cta: string;
  detail: string;
}

// ---- Activity / status feed -------------------------------

export type ActivityKind = 'absence' | 'expense';

export interface ActivityItem {
  id: string;
  kind: ActivityKind;
  icon: string;
  title: string;
  sub: string;
  registered: string;
  status: Status;
  who: string;
  amount: number;
  /** Present when an item was rejected and has an explanation. */
  reason?: string;
}

// ---- Scenarios --------------------------------------------

export interface Scenario {
  upcoming: Upcoming;
  activity: ActivityItem[];
  todos: Todo[];
}

export type Scenarios = Record<string, Scenario>;

// ---- Payslips ---------------------------------------------

export type PayslipRowGroup = 'Pay' | 'Deductions' | 'Net';

export interface PayslipRow {
  group: PayslipRowGroup;
  label: string;
  qty: string;
  amount: number;
  /** Bold the net/paid row. */
  bold?: boolean;
}

export interface Payslip {
  id: string;
  month: string;
  payday: string;
  net: number;
  gross: number;
  rows: PayslipRow[];
  notes: string;
}

// ---- Balance histories ------------------------------------

/** A single history entry for a balance (a taken day or range). */
export interface HistoryEntry {
  range: string;
  weekday: string;
  meta: string;
}

export type BalanceId = 'sem' | 'vab' | 'sick';
export type BalanceTone = 'brand' | 'info' | 'neutral';

export interface Balance {
  id: BalanceId;
  label: string;
  value: number;
  unit: string;
  tone?: BalanceTone;
  icon?: string;
  history: HistoryEntry[];
}

// ---- Absence types for registration -----------------------

export type CertRequirement = 'no' | 'after7';

export interface AbsenceType {
  id: string;
  code: number;
  label: string;
  icon: string;
  desc: string;
  needsCert: CertRequirement;
  /** Note shown when a certificate may be required. */
  certNote?: string;
}

// ---- Expense categories -----------------------------------

export interface ExpenseCategory {
  id: string;
  code: number;
  label: string;
  icon: string;
}

// ---- Bank accounts ----------------------------------------

export interface BankAccount {
  id: string;
  bank: string;
  clearing: string;
  number: string;
  holder: string;
  primary: boolean;
}

// ---- Companies --------------------------------------------

export interface Company {
  id: string;
  name: string;
  role: string;
  active: boolean;
  kind: CompanyKind;
  permissions: string[];
  balances: Balance[];
}

// ---- Calendar events --------------------------------------

export type CalendarTone = 'info' | 'warn' | 'neutral' | 'brand';

export interface CalendarEvent {
  id: string;
  icon: string;
  tone: CalendarTone;
  title: string;
  meta: string;
  note: string;
  status: Status;
  dates: string[];
}

// ---- Manager's team ---------------------------------------

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  balances: Balance[];
  /** Flag shown for members needing attention. */
  flag?: string;
  /** Explicit sick history override for the member. */
  sickHistory?: HistoryEntry[];
}

// ---- Pending approvals ------------------------------------

export interface AbsenceApproval {
  id: string;
  name: string;
  role: string;
  type: string;
  range: string;
  meta: string;
  registered: string;
  impact: string;
  submitted: string;
  note: string;
}

export interface ExpenseApproval {
  id: string;
  name: string;
  role: string;
  type: string;
  category: string;
  meta: string;
  range: string;
  registered: string;
  impact: string;
  submitted: string;
  note: string;
}

export interface Approvals {
  absence: AbsenceApproval[];
  expense: ExpenseApproval[];
}
