// i18n strings for the pay-detail flow screens (Pay slip detail, Pay check,
// Upcoming pay). Flat key maps for the 'paydetail' namespace. Swedish is verbatim
// from design/SPHERE - Full Prototype/k-i18n.js where a translation exists; the
// lead wires this namespace into i18n (do NOT edit app/src/i18n/index.ts here).

export const payDetailEn = {
  // ── Pay slip detail ───────────────────────────────────────
  payslipTitle: 'Pay slip',
  netPaidSub: 'Net pay · paid {{payday}}',
  details: 'Details',
  paid: 'Paid',
  viewAsPdf: 'View as PDF',

  // "Is your pay correct?" prompt
  isYourPayCorrect: 'Is your pay correct',
  yesCorrect: 'Yes, everything is correct',
  noContactPayroll: 'No – contact payroll',
  thanksAllDone: "Thanks – you're all done",
  notedCorrect: "We've noted that your pay is correct.",
  undo: 'Undo',

  // ── Pay check (contact payroll) ───────────────────────────
  contactPayroll: 'Contact payroll',
  sendToPayroll: 'Send to payroll',
  // {{name}} is interpolated (the HR contact). Kept as a single sentence per prototype.
  contactIntro:
    'Briefly describe what you think is wrong, and {{name}} will look into it and correct it if needed.',
  whatIsItAbout: 'What is it about?',
  messagePlaceholder:
    'E.g. "I worked 3 unsocial hours shifts in {{month}} but only see 2 on the pay slip."',
  regarding: 'Regarding: {{month}}',

  // Pay check success (sent to payroll)
  sentToPayroll: 'Sent to payroll',
  sentLineReceived: '{{name}} ({{role}}) has received your query about {{month}}.',
  sentLineReply: 'You will receive a reply in the app, usually within 1–2 working days.',
  sentLineCorrected: 'The pay will be corrected on the next payroll run if something was wrong.',
  goToHome: 'Go to home',
  backToPaySlip: 'Back to pay slip',

  // ── Upcoming pay ──────────────────────────────────────────
  upcomingTitle: 'Upcoming pay',
  preliminary: 'Preliminary',
  estimatedNetSub: 'Estimated net pay · paid on {{payday}}',
  whatsIncluded: "What's included",
  estimatedNet: 'Estimated net',
  deltaVsPrev: '{{delta}} vs May',
  deltaReason: 'Mainly due to sick deduction this period',
  upcomingNote:
    'This is a preliminary calculation. It is updated when you register absence or expenses, and is finalised shortly before pay day.',

  // Shared
  notFound: 'Not found.',
};

export const payDetailSv = {
  // ── Pay slip detail ───────────────────────────────────────
  payslipTitle: 'Lönespecifikation',
  netPaidSub: 'Nettolön · utbetald {{payday}}',
  details: 'Detaljer',
  paid: 'Utbetald',
  viewAsPdf: 'Visa som PDF',

  // "Is your pay correct?" prompt
  isYourPayCorrect: 'Stämmer din lön',
  yesCorrect: 'Ja, allt stämmer',
  noContactPayroll: 'Nej – kontakta lön',
  thanksAllDone: 'Tack – du är klar',
  notedCorrect: 'Vi har noterat att din lön stämmer.',
  undo: 'Ångra',

  // ── Pay check (contact payroll) ───────────────────────────
  contactPayroll: 'Kontakta lön',
  sendToPayroll: 'Skicka till lön',
  contactIntro:
    'Beskriv kort vad du tror är fel, så {{name}} tittar på det och rättar vid behov.',
  whatIsItAbout: 'Vad gäller det?',
  messagePlaceholder:
    'T.ex. "Jag jobbade 3 OB-pass i {{month}} men ser bara 2 på lönespecifikationen."',
  regarding: 'Gäller: {{month}}',

  // Pay check success (sent to payroll)
  sentToPayroll: 'Skickat till lön',
  sentLineReceived: '{{name}} ({{role}}) har tagit emot din fråga om {{month}}.',
  sentLineReply: 'Du får svar i appen, oftast inom 1–2 arbetsdagar.',
  sentLineCorrected: 'Lönen rättas vid nästa lönekörning om något var fel.',
  goToHome: 'Gå till start',
  backToPaySlip: 'Tillbaka till lönespecifikation',

  // ── Upcoming pay ──────────────────────────────────────────
  upcomingTitle: 'Kommande lön',
  preliminary: 'Preliminär',
  estimatedNetSub: 'Beräknad nettolön · utbetald {{payday}}',
  whatsIncluded: 'Det här ingår',
  estimatedNet: 'Beräknad nettolön',
  deltaVsPrev: '{{delta}} mot maj',
  deltaReason: 'Främst på grund av sjukavdrag denna period',
  upcomingNote:
    'Detta är en preliminär beräkning. Den uppdateras när du registrerar frånvaro eller utlägg och fastställs strax före lönedagen.',

  // Shared
  notFound: 'Hittades inte.',
};
