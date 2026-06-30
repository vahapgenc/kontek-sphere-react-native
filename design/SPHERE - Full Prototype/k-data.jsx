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
  email: "sara.lindqvist@nordvik.se",
  phone: "+46 70 123 45 67",
  address: "Storgatan 12, 972 31 Luleå",
  personalId: "19910412-2384",
  employmentType: "Permanent · Full-time",
  startDate: "1 March 2021",
  manager: "Petra Sjögren",
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

// --- Balance histories (drives the per-balance detail: when days were taken) ---
const _WD = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const _MO = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function _fmtDay(iso) {
  var d = new Date(iso + "T00:00:00");
  return { range: d.getDate() + " " + _MO[d.getMonth()], weekday: _WD[d.getDay()], meta: "1 day" };
}
const SICK_POOL = ["2026-01-19", "2026-02-09", "2026-03-09", "2026-03-24", "2026-04-14", "2026-05-06", "2026-05-19", "2026-06-09", "2026-06-23", "2026-09-15", "2026-10-12", "2026-11-09"];
const VAB_POOL = ["2026-01-27", "2026-02-17", "2026-03-31", "2026-04-28", "2026-05-13", "2026-06-02", "2026-09-22", "2026-10-20", "2026-11-24"];
const LEAVE_POOL = [
  { range: "16–20 Feb",    weekday: "Monday–Friday",    meta: "5 days" },
  { range: "13–17 Apr",    weekday: "Monday–Friday",    meta: "5 days" },
  { range: "29 Apr–1 May", weekday: "Wednesday–Friday", meta: "3 days" },
  { range: "8–12 Jun",     weekday: "Monday–Friday",    meta: "5 days" },
];
function genDays(pool, n, offset) {
  if (!n || n <= 0) return [];
  var out = [], start = (offset || 0) % pool.length;
  for (var i = 0; i < n; i++) out.push(_fmtDay(pool[(start + i) % pool.length]));
  return out;
}
function genLeave(offset) {
  var s = (offset || 0) % LEAVE_POOL.length;
  return [LEAVE_POOL[s], LEAVE_POOL[(s + 1) % LEAVE_POOL.length]];
}
function withHistory(balArr, offset, sickOverride) {
  return balArr.map(function (b) {
    var history = [];
    if (b.id === "sem") history = genLeave(offset);
    else if (b.id === "vab") history = genDays(VAB_POOL, b.value, offset);
    else if (b.id === "sick") history = sickOverride || genDays(SICK_POOL, b.value, offset);
    return Object.assign({}, b, { history: history });
  });
}
const TOBIAS_SICK = [
  { range: "13–14 Jan",     weekday: "Tuesday–Wednesday", meta: "2 days" },
  { range: "2 Feb",         weekday: "Monday",            meta: "1 day" },
  { range: "23–25 Feb",     weekday: "Monday–Wednesday",  meta: "3 days" },
  { range: "16 Mar",        weekday: "Monday",            meta: "1 day" },
  { range: "30 Mar–1 Apr",  weekday: "Monday–Wednesday",  meta: "3 days" },
  { range: "21 Apr",        weekday: "Tuesday",           meta: "1 day" },
  { range: "11–13 May",     weekday: "Monday–Wednesday",  meta: "3 days" },
  { range: "27 May",        weekday: "Wednesday",         meta: "1 day" },
  { range: "4–5 Jun",       weekday: "Thursday–Friday",   meta: "2 days" },
  { range: "18 Jun",        weekday: "Thursday",          meta: "1 day" },
];

// Absence balances
const BALANCES = withHistory([
  { id: "sem", label: "Annual leave days remaining", value: 18, unit: "days", tone: "brand", icon: "calendar" },
  { id: "vab", label: "Child sick care this year", value: 6, unit: "days", tone: "info", icon: "calendar" },
  { id: "sick", label: "Sick days this year", value: 4, unit: "days", tone: "neutral", icon: "calendar" },
], 0);

// Absence types for registration
const ABSENCE_TYPES = [
  { id: "sick", code: 1, label: "Sick leave", icon: "heart", desc: "When you are sick and unable to work", needsCert: "after7", certNote: "Medical certificate required from day 8." },
  { id: "pregnancy", code: 2, label: "Pregnancy leave", icon: "heart", desc: "Pregnancy leave before the due date", needsCert: "no" },
  { id: "parental", code: 3, label: "Parental leave", icon: "child", desc: "On leave with parental benefit", needsCert: "no" },
  { id: "paternity", code: 4, label: "Leave at child's birth", icon: "child", desc: "Leave in connection with the birth of a child", needsCert: "no" },
  { id: "vab", code: 5, label: "Child sick care", icon: "child", desc: "Care of sick child", needsCert: "after7", certNote: "Certificate required after day 7." },
  { id: "contact_day", code: 6, label: "Contact day", icon: "calendar", desc: "Contact day for a child with a disability", needsCert: "no" },
  { id: "military", code: 7, label: "Military service", icon: "building", desc: "Military refresher service", needsCert: "no" },
  { id: "civil_defence", code: 8, label: "Civil defence", icon: "building", desc: "Civil defence service", needsCert: "no" },
  { id: "training", code: 9, label: "Training", icon: "doc", desc: "Study or training leave", needsCert: "no" },
  { id: "vacation", code: 10, label: "Annual leave", icon: "sun", desc: "Planned leave", needsCert: "no" },
  { id: "unpaid", code: 11, label: "Unpaid leave", icon: "calendar", desc: "Unpaid leave from work", needsCert: "no" },
  { id: "work_injury", code: 12, label: "Work injury", icon: "warn", desc: "Absence due to a work-related injury", needsCert: "no" },
  { id: "union", code: 13, label: "Union duties", icon: "user", desc: "Trade union activities", needsCert: "no" },
  { id: "compensatory", code: 14, label: "Time off in lieu", icon: "clock", desc: "Time off in lieu of overtime", needsCert: "no" },
  { id: "family_care", code: 15, label: "Care of close relative", icon: "heart", desc: "Care of a seriously ill close relative", needsCert: "no" },
  { id: "permission", code: 16, label: "Permission", icon: "calendar", desc: "Short paid leave (e.g. family event)", needsCert: "no" },
  { id: "furlough", code: 17, label: "Furlough", icon: "building", desc: "Temporarily laid off by the employer", needsCert: "no" },
  { id: "working_time_account", code: 19, label: "Working time account", icon: "clock", desc: "Time off from your working-time account", needsCert: "no" },
  { id: "leave", code: 18, label: "Other absence", icon: "calendar", desc: "Other or additional absence", needsCert: "no" },
];

// Expense categories for registration (Skatteverket benefit/expense codes)
const EXP_CATS = [
  { id: "car", code: 2100, label: "Car", icon: "receipt" },
  { id: "food", code: 2105, label: "Meals", icon: "receipt" },
  { id: "housing_small", code: 2110, label: "Housing – house", icon: "receipt" },
  { id: "housing_other", code: 2112, label: "Housing – other", icon: "receipt" },
  { id: "interest", code: 2115, label: "Interest", icon: "receipt" },
  { id: "loan_computer", code: 2117, label: "Loaned computer", icon: "receipt" },
  { id: "fuel", code: 2125, label: "Fuel", icon: "receipt" },
  { id: "parking", code: 2130, label: "Parking", icon: "receipt" },
  { id: "rut", code: 2140, label: "RUT work", icon: "receipt" },
  { id: "rot", code: 2145, label: "ROT work", icon: "receipt" },
  { id: "paid_fuel", code: 2150, label: "Paid for fuel", icon: "receipt" },
  { id: "other", code: 2120, label: "Other", icon: "receipt" },
];

// Connected bank accounts (the employee's payout accounts)
const BANK_ACCOUNTS = [
  { id: "ba1", bank: "Swedbank", clearing: "8327-9", number: "•••• 4471", holder: "Sara Lindqvist", primary: true },
  { id: "ba2", bank: "SEB", clearing: "5294", number: "•••• 0182", holder: "Sara Lindqvist", primary: false },
];

// ---- Companies the employee belongs to ----
// "employee"  → standard self-service experience (Nordvik Retail)
// "manager"   → can also approve the team's leave & expenses (Boden Bygg)
const COMPANIES = [
  {
    id: "nordvik", name: "Nordvik Retail AB", role: "Store Sales Associate",
    active: true, kind: "employee",
    permissions: ["Register absence", "Register expenses", "View pay slips"],
    balances: withHistory([
      { id: "sem",  label: "Annual leave days remaining", value: 18, unit: "days", tone: "brand",   icon: "calendar" },
      { id: "vab",  label: "Child sick care this year",   value: 6,  unit: "days", tone: "info",    icon: "calendar" },
      { id: "sick", label: "Sick days this year",          value: 4,  unit: "days", tone: "neutral", icon: "calendar" },
    ], 0),
  },
  {
    id: "boden", name: "Boden Bygg AB", role: "Site Manager",
    active: true, kind: "manager",
    permissions: ["Approve leave & absence", "Approve expenses", "Register absence", "Register expenses", "View pay slips"],
    balances: withHistory([
      { id: "sem",  label: "Annual leave days remaining", value: 25, unit: "days", tone: "brand",   icon: "calendar" },
      { id: "vab",  label: "Child sick care this year",   value: 3,  unit: "days", tone: "info",    icon: "calendar" },
      { id: "sick", label: "Sick days this year",          value: 1,  unit: "days", tone: "neutral", icon: "calendar" },
    ], 2),
  },
  {
    id: "cafe", name: "Café Hörnan AB", role: "Hourly staff",
    active: false, kind: "employee",
    permissions: ["Register absence"],
    balances: withHistory([
      { id: "sem",  label: "Annual leave days remaining", value: 0, unit: "days", tone: "brand",   icon: "calendar" },
      { id: "sick", label: "Sick days this year",          value: 2, unit: "days", tone: "neutral", icon: "calendar" },
    ], 4),
  },
];

// ---- The employee's own registrations, by day (drives the Calendar) ----
const CALENDAR_EVENTS = [
  { id: "ce1", icon: "calendar", tone: "info",    title: "Child sick care", meta: "1 day",  note: "Home with a sick child (VAB).", status: "approved", dates: ["2026-06-01"] },
  { id: "ce2", icon: "receipt", tone: "warn",    title: "Expense – parking", meta: "SEK 180", note: "Parking on a client visit. Receipt still missing.", status: "action", dates: ["2026-06-03"] },
  { id: "ce3", icon: "calendar", tone: "neutral", title: "Sick leave", meta: "2 days", note: "Home sick. A medical certificate is needed from day 8.", status: "pending", dates: ["2026-06-08", "2026-06-09"] },
  { id: "ce4", icon: "calendar", tone: "brand",   title: "Annual leave", meta: "5 days", note: "Summer holiday.", status: "pending", dates: ["2026-06-12", "2026-06-13", "2026-06-14", "2026-06-15", "2026-06-16"] },
  { id: "ce5", icon: "receipt", tone: "warn",    title: "Expense – supplies", meta: "SEK 540", note: "Store supplies. Receipt attached.", status: "pending", dates: ["2026-05-28"] },
  { id: "ce6", icon: "receipt", tone: "warn",    title: "Expense – pharmacy", meta: "SEK 95",  note: "Prescription medicine while off sick.", status: "approved", dates: ["2026-06-08"] },
];

// ---- The manager's team (the employees they approve absence & expenses for) ----
const mkBal = (sem, vab, sick, offset, sickHist) => withHistory([
  { id: "sem",  label: "Annual leave days remaining", value: sem,  unit: "days" },
  { id: "vab",  label: "Child sick care this year",   value: vab,  unit: "days" },
  { id: "sick", label: "Sick days this year",          value: sick, unit: "days" },
], offset, sickHist);
const TEAM = [
  { id: "tm-erik",   name: "Erik Holm",       role: "Warehouse Worker",    balances: mkBal(18, 2, 3, 0) },
  { id: "tm-johan",  name: "Johan Lund",      role: "Carpenter",           balances: mkBal(21, 6, 1, 1) },
  { id: "tm-anders", name: "Anders Berg",     role: "Site Electrician",    balances: mkBal(12, 0, 5, 2) },
  { id: "tm-maja",   name: "Maja Andersson",  role: "Site Engineer",       balances: mkBal(24, 3, 2, 3) },
  { id: "tm-olle",   name: "Olle Persson",    role: "Carpenter",           balances: mkBal(16, 4, 0, 4) },
  { id: "tm-sara",   name: "Sara Nilsson",    role: "Project Coordinator", balances: mkBal(19, 1, 4, 5) },
  { id: "tm-lena",   name: "Lena Ekström",    role: "Site Supervisor",     balances: mkBal(27, 0, 2, 6) },
  { id: "tm-karl",   name: "Karl Nyström",    role: "Carpenter",           balances: mkBal(14, 5, 6, 7) },
  { id: "tm-petra",  name: "Petra Holm",      role: "Administrator",       balances: mkBal(22, 2, 1, 8) },
  { id: "tm-tobias", name: "Tobias Frisk",    role: "Carpenter", flag: "Frequent short-term sick leave — 10 occasions this year", balances: mkBal(9, 4, 18, 9, TOBIAS_SICK), sickHistory: TOBIAS_SICK },
];

// ---- Pending approvals for the manager (Boden Bygg) ----
const APPROVALS = {
  absence: [
    { id: "ab1", name: "Erik Holm",    role: "Warehouse Worker",  type: "Vacation",          range: "12–16 June", meta: "5 days", registered: "5 June",  impact: "No change",   submitted: "Submitted 5 June",  note: "Planned summer leave. Erik has 18 vacation days remaining after this." },
    { id: "ab2", name: "Johan Lund",   role: "Carpenter",         type: "Child Care Leave",  range: "3 June",     meta: "1 day",  registered: "1 June",  impact: "−1 090 kr",   submitted: "Submitted 1 June",  note: "Care of sick child (VAB). Self-reported, no certificate required." },
    { id: "ab3", name: "Anders Berg",  role: "Site Electrician",  type: "Sick Leave",        range: "8–9 June",   meta: "2 days", registered: "8 June",  impact: "−2 020 kr",   submitted: "Submitted 8 June",  note: "Self-certified sick leave, within the 7-day limit — no medical certificate needed." },
    { id: "ab4", name: "Tobias Frisk",  role: "Carpenter",         type: "Sick Leave",        range: "18 June",    meta: "1 day",  registered: "18 June", impact: "−1 010 kr",   submitted: "Submitted 18 June", note: "Self-certified sick leave. This is Tobias's 10th sick occasion this year — consider a wellbeing check-in." },
    { id: "ab5", name: "Tobias Frisk",  role: "Carpenter",         type: "Sick Leave",        range: "4–5 June",   meta: "2 days", registered: "4 June",  impact: "−2 020 kr",   submitted: "Submitted 4 June",  note: "Self-certified sick leave, within the 7-day limit." },
    { id: "ab6", name: "Tobias Frisk",  role: "Carpenter",         type: "Child Care Leave",  range: "10 June",    meta: "1 day",  registered: "10 June", impact: "−1 010 kr",   submitted: "Submitted 10 June", note: "Care of sick child (VAB). Self-reported, no certificate required." },
  ],
  expense: [
    { id: "ex4", name: "Tobias Frisk",   role: "Carpenter",            type: "Expense – Travel",    category: "Travel",      meta: "640 kr",   range: "12 June", registered: "13 June", impact: "+640 kr",   submitted: "Receipt attached", note: "Fuel for site transport between Boden and Luleå." },
    { id: "ex5", name: "Tobias Frisk",   role: "Carpenter",            type: "Expense – Tools",     category: "Equipment",   meta: "1 480 kr", range: "9 June",  registered: "10 June", impact: "+1 480 kr", submitted: "Receipt attached", note: "Replacement circular saw after the old one failed on site." },
    { id: "ex1", name: "Sara Nilsson",   role: "Store Sales Associate", type: "Expense – Materials", category: "Consumables", meta: "540 kr",   range: "28 May", registered: "29 May", impact: "+540 kr",   submitted: "Receipt attached", note: "Purchase of cleaning materials for the store." },
    { id: "ex2", name: "Maja Andersson", role: "Site Engineer",         type: "Expense – Travel",    category: "Travel",      meta: "1 240 kr", range: "26 May", registered: "27 May", impact: "+1 240 kr", submitted: "Receipt attached", note: "Mileage and parking for the client visit in Luleå." },
    { id: "ex3", name: "Olle Persson",   role: "Carpenter",             type: "Expense – Tools",     category: "Equipment",   meta: "890 kr",   range: "24 May", registered: "25 May", impact: "+890 kr",   submitted: "Receipt attached", note: "Replacement cordless drill battery for the site team." },
  ],
};

Object.assign(window, { ME, PERIOD, UPCOMING, TODOS, ACTIVITY, PAYSLIPS, BALANCES, ABSENCE_TYPES, EXP_CATS, SCENARIOS, UPCOMING_SICK2, ACTIVITY_SICK2, TODOS_SICK2, BANK_ACCOUNTS, COMPANIES, APPROVALS, CALENDAR_EVENTS, TEAM });
