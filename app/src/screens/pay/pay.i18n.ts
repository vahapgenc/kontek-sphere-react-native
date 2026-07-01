// Pay screens i18n — flat key → string maps for the 'pay' namespace.
// EN copy ported from k-misc.jsx (PayslipsScreen + BalanceDetailScreen); SV taken
// verbatim from design/SPHERE - Full Prototype/k-i18n.js where available.
// The lead wires this namespace into i18next — do not register it here.

export const payEn = {
  // App bars
  title: 'Pay',
  balanceDetailTitle: 'Balance',

  // Section headers (collapsible)
  upcoming: 'Upcoming',
  recent: 'Recent',

  // Balance tiles group label
  myBalances: 'My balances',

  // Upcoming / recent rows
  estimatedPayment: 'Estimated payment {{payday}}',
  paid: 'Paid {{payday}}',

  // Balance detail history titles (per balance id)
  historyLeave: 'Leave taken this year',
  historyVab: 'Child sick care taken',
  historySick: 'Sick leave this year',
  occasions: '{{count}} occasions',
  nothingRegistered: 'Nothing registered this year.',

  notFound: 'Not found.',
};

export const paySv: typeof payEn = {
  // App bars
  title: 'Lön',
  balanceDetailTitle: 'Saldo',

  // Section headers (collapsible)
  upcoming: 'Kommande',
  recent: 'Senaste',

  // Balance tiles group label
  myBalances: 'Mina saldon',

  // Upcoming / recent rows
  estimatedPayment: 'Beräknad utbetalning {{payday}}',
  paid: 'Utbetald {{payday}}',

  // Balance detail history titles (per balance id)
  historyLeave: 'Uttagen ledighet i år',
  historyVab: 'Uttagen vård av barn',
  historySick: 'Sjukfrånvaro i år',
  occasions: '{{count}} tillfällen',
  nothingRegistered: 'Inget registrerat i år.',

  notFound: 'Hittades inte.',
};
