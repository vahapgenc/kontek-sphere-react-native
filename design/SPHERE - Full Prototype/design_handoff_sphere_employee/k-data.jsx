// ============================================================
// k-data.jsx — mock data for the prototype (English)
// ============================================================

// The signed-in employee
const ME = {
  name: "Sara Lindqvist",
  role: "Store Sales Associate",
  employer: "Nordvik Retail AB",
  hrName: "Petra Sjögren",
  hrRole: "Payroll Administrator",
  monthlyGross: 31200,
};

// Period info
const PERIOD = {
  label: "June 2026",
  payday: "June 25",
  daysToPay: 17,
  reportDeadline: "June 18",
};

// Preliminary upcoming pay — what the home screen visualises
const UPCOMING = {
  month: "June 2026",
  payday: "June 25, 2026",
  estNet: 24380,
  prevNet: 25120,
  base: 31200,
  items: [
    { id: "u1", label: "Monthly salary", amount: 31200, type: "base" },
    { id: "u2", label: "Unsocial hours (3 shifts)", amount: 1240, type: "add" },
    { id: "u3", label: "Sick deduction, 2 days", amount: -2180, type: "deduct", linked: "a-sick" },
    { id: "u4", label: "Tax (prelim.)", amount: -7100, type: "tax" },
  ],
};

// Things that need the employee's attention (the "To do" list)
// status: action | pending | approved | rejected | info
const TODOS = [
  { id: "a-exp", kind: "expense", title: "Expense missing receipt", sub: "Parking · SEK 180 · June 3", status: "action", cta: "Attach receipt",
    detail: "You have registered an expense but have not attached a receipt. Without a receipt the expense cannot be paid out." },
  { id: "a-sick", kind: "absence", title: "Sick leave needs certificate", sub: "June 8–9 · day 8 of sick period", status: "action", cta: "Upload certificate",
    detail: "Your sick period is longer than 7 days. From day 8 onwards you need to upload a medical certificate for sick pay to be paid out." },
];

// Activity / status feed (registered this period)
const ACTIVITY = [
  { id: "act1", kind: "absence", icon: "calendar", title: "Child sick care", sub: "June 1 · 1 day", registered: "June 2", status: "approved", who: "Approved by Petra", amount: -1090 },
  { id: "act2", kind: "expense", icon: "receipt", title: "Expense – supplies", sub: "May 28 · receipt attached", registered: "May 29", status: "pending", who: "Awaiting approval", amount: 540 },
  { id: "act3", kind: "absence", icon: "calendar", title: "Annual leave", sub: "June 12–16 · 5 days", registered: "June 5", status: "pending", who: "Awaiting approval", amount: 0 },
  { id: "act4", kind: "expense", icon: "receipt", title: "Expense – lunch", sub: "May 26 · SEK 320", registered: "May 27", status: "rejected", who: "Rejected by Petra", amount: 320,
    reason: "Lunch is not considered a reimbursable expense according to the company's travel policy. Contact Petra if you think this is a mistake." },
];

// ---- Alternative scenario: employee has been sick 2 days (June 8–9) ----
// Less than 7 days → no medical certificate required. Waiting day deduction (once) +
// sick deduction for 2 days, sick pay from day 2.
const UPCOMING_SICK2 = {
  month: "June 2026",
  payday: "June 25, 2026",
  estNet: 23270,
  prevNet: 25120,
  base: 31200,
  items: [
    { id: "s1", label: "Monthly salary", amount: 31200, type: "base" },
    { id: "s2", label: "Unsocial hours (2 shifts)", amount: 820, type: "add" },
    { id: "s3", label: "Waiting day deduction", amount: -890, type: "deduct" },
    { id: "s4", label: "Sick deduction, 2 days", amount: -2020, type: "deduct" },
    { id: "s5", label: "Sick pay (day 2)", amount: 760, type: "add" },
    { id: "s6", label: "Tax (prelim.)", amount: -6600, type: "tax" },
  ],
};
const TODOS_SICK2 = []; // 2 days < 7 → no certificate, nothing to do
const ACTIVITY_SICK2 = [
  { id: "sact1", kind: "absence", icon: "calendar", title: "Sick leave", sub: "June 8–9 · 2 days", registered: "June 10", status: "pending", who: "Awaiting approval", amount: -2150 },
  { id: "sact2", kind: "expense", icon: "receipt", title: "Expense – supplies", sub: "May 28 · receipt attached", registered: "May 29", status: "pending", who: "Awaiting approval", amount: 540 },
];

const SCENARIOS = {
  "Standard":    { upcoming: UPCOMING,       activity: ACTIVITY,       todos: TODOS },
  "Sick 2 days": { upcoming: UPCOMING_SICK2, activity: ACTIVITY_SICK2, todos: TODOS_SICK2 },
};

// Payslips
const PAYSLIPS = [
  {
    id: "ps-2026-05", month: "May 2026", payday: "May 25, 2026", net: 25120, gross: 31200,
    rows: [
      { group: "Pay", label: "Monthly salary", qty: "1", amount: 31200 },
      { group: "Pay", label: "Unsocial hours", qty: "4 shifts", amount: 1680 },
      { group: "Deductions", label: "Preliminary tax (30%)", qty: "", amount: -8420 },
      { group: "Deductions", label: "Child sick care deduction", qty: "1 day", amount: -1090 },
      { group: "Net", label: "Paid", qty: "", amount: 25120, bold: true },
    ],
    notes: "Your pay is slightly lower this month because you were home 1 day for child sick care. You will receive compensation from the Social Insurance Agency instead.",
  },
  {
    id: "ps-2026-04", month: "April 2026", payday: "April 25, 2026", net: 24990, gross: 31200,
    rows: [
      { group: "Pay", label: "Monthly salary", qty: "1", amount: 31200 },
      { group: "Pay", label: "Unsocial hours", qty: "3 shifts", amount: 1240 },
      { group: "Deductions", label: "Preliminary tax (30%)", qty: "", amount: -8550 },
      { group: "Deductions", label: "Waiting day deduction", qty: "1", amount: -890 },
      { group: "Deductions", label: "Sick deduction", qty: "1 day", amount: -1010 },
      { group: "Net", label: "Paid", qty: "", amount: 24990, bold: true },
    ],
    notes: "Pay is lower this month due to 1 sick day – a waiting day deduction and a sick deduction have been applied.",
  },
  {
    id: "ps-2026-03", month: "March 2026", payday: "March 25, 2026", net: 24710, gross: 31200,
    rows: [
      { group: "Pay", label: "Monthly salary", qty: "1", amount: 31200 },
      { group: "Deductions", label: "Preliminary tax (30%)", qty: "", amount: -8490 },
      { group: "Net", label: "Paid", qty: "", amount: 24710, bold: true },
    ],
    notes: "Everything is as usual this month – no deductions other than tax.",
  },
];

// Absence balances
const BALANCES = [
  { id: "sem", label: "Annual leave days remaining", value: 18, unit: "days", tone: "brand", icon: "calendar" },
  { id: "vab", label: "Child sick care this year", value: 6, unit: "days", tone: "info", icon: "calendar" },
  { id: "sick", label: "Sick days this year", value: 4, unit: "days", tone: "neutral", icon: "calendar" },
];

// Absence types for registration
const ABSENCE_TYPES = [
  { id: "sick", label: "Sick leave", icon: "calendar", desc: "When you are sick and unable to work", needsCert: "after7", certNote: "Medical certificate required from day 8." },
  { id: "vab", label: "Child sick care", icon: "calendar", desc: "Care of sick child", needsCert: "after7", certNote: "Certificate required after day 7." },
  { id: "vacation", label: "Annual leave", icon: "calendar", desc: "Planned leave", needsCert: "no" },
  { id: "parental", label: "Parental leave", icon: "calendar", desc: "On leave with parental benefit", needsCert: "no" },
  { id: "leave", label: "Other leave", icon: "calendar", desc: "Other or additional absence", needsCert: "no" },
];

Object.assign(window, { ME, PERIOD, UPCOMING, TODOS, ACTIVITY, PAYSLIPS, BALANCES, ABSENCE_TYPES, SCENARIOS, UPCOMING_SICK2, ACTIVITY_SICK2, TODOS_SICK2 });
