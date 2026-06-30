// Home screen i18n — flat key → string maps for the 'home' namespace.
// EN copy ported from k-app.jsx (the Home screen); SV taken verbatim from
// design/SPHERE - Full Prototype/k-i18n.js where available.
// The lead wires this namespace into i18next — do not register it here.

export const homeEn = {
  // App bar greeting + subtitle
  greetingMorning: 'Good morning',
  roleApprover: 'Approver',
  roleEmployee: 'Employee',

  // Upcoming pay hero
  upcomingPay: 'Upcoming pay',
  preliminary: 'Preliminary',
  details: 'Details',
  hideDetails: 'Hide details',
  kollektivavtalPrefix: 'Additions and deductions follow your ',
  kollektivavtal: 'kollektivavtal',
  kollektivavtalSuffix: '.',

  // Sections
  toDo: 'To do',
  myRegistrationsFor: 'My registrations for',
  previous: 'Previous',

  // To do
  fix: 'Fix',
  review: 'Review',
  nothingToDoTitle: 'Nothing to do right now',
  nothingToDoSub: 'You have nothing that needs your attention.',

  // Registrations
  nothingRegisteredYet: 'Nothing registered yet',
  registeredPrefix: 'Registered',

  // Status pill labels (mirror STATUS_META in k-app.jsx)
  statusAction: 'Action required',
  statusPending: 'Awaiting approval',
  statusApproved: 'Approved',
  statusRejected: 'Rejected',
  statusInfo: 'Info',

  // Previous (static rows in the prototype)
  prevAnnualLeaveTitle: 'Annual leave',
  prevAnnualLeaveSub: 'April 14–18 · 5 days',
  prevExpenseTravelTitle: 'Expense – travel',
  prevExpenseTravelSub: 'April 2 · SEK 420',
  prevChildSickTitle: 'Child sick care',
  prevChildSickSub: 'March 18 · 1 day',
  prevPayslipTitle: 'Pay slip March',
  prevPayslipSub: 'Paid March 25',
  paid: 'Paid',
  approved: 'Approved',
};

export const homeSv: typeof homeEn = {
  greetingMorning: 'God morgon',
  roleApprover: 'Attestant',
  roleEmployee: 'Anställd',

  upcomingPay: 'Kommande lön',
  preliminary: 'Preliminär',
  details: 'Detaljer',
  hideDetails: 'Dölj detaljer',
  kollektivavtalPrefix: 'Tillägg och avdrag följer ditt ',
  kollektivavtal: 'kollektivavtal',
  kollektivavtalSuffix: '.',

  toDo: 'Att göra',
  myRegistrationsFor: 'Mina registreringar för',
  previous: 'Tidigare',

  fix: 'Åtgärda',
  review: 'Granska',
  nothingToDoTitle: 'Inget att göra just nu',
  nothingToDoSub: 'Du har inget som kräver din uppmärksamhet.',

  nothingRegisteredYet: 'Inget registrerat ännu',
  registeredPrefix: 'Registrerad',

  statusAction: 'Åtgärda',
  statusPending: 'Inväntar godkännande',
  statusApproved: 'Godkänd',
  statusRejected: 'Nekad',
  statusInfo: 'Info',

  prevAnnualLeaveTitle: 'Semester',
  prevAnnualLeaveSub: '14–18 april · 5 dagar',
  prevExpenseTravelTitle: 'Utlägg – resa',
  prevExpenseTravelSub: '2 april · 420 kr',
  prevChildSickTitle: 'Vård av barn',
  prevChildSickSub: '18 mars · 1 dag',
  prevPayslipTitle: 'Lönebesked mars',
  prevPayslipSub: 'Utbetalt 25 mars',
  paid: 'Utbetald',
  approved: 'Godkänd',
};
