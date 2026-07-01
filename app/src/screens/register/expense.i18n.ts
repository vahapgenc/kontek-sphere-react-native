// i18n for the multi-step expense registration flow (ExpenseFlowScreen).
// Native port of the ExpenseFlow copy in k-expense.jsx. Swedish strings are
// taken verbatim from design/SPHERE - Full Prototype/k-i18n.js where the
// prototype provides them; the rest follow the same house style.
export const expenseEn = {
  // ── Step kickers + titles ──
  kickerExpense: 'Expense',
  kickerConfirm: 'Confirm',
  detailsTitle: 'What is the expense for?',
  confirmTitle: 'Does everything look right?',

  // ── Receipt upload ──
  uploadReceipt: 'Upload receipt',
  uploadReceiptHint: 'PDF eller foto · max 10 MB',
  autoFilled: "We've filled in the details for you – please check they are correct.",
  noReceiptToggle: "I don't have a receipt right now",

  // ── Category ──
  categoryLabel: 'Category',
  categoryPlaceholder: 'Choose a category',
  categorySheetTitle: 'Category',
  categorySheetSub: 'Choose what the expense is for',

  // ── Amount + description ──
  amountLabel: 'Amount',
  currency: 'kr',
  descriptionLabel: 'Description',
  descriptionOptional: 'optional',
  descriptionPlaceholder: 'E.g. Parking at client visit',

  // ── Notes ──
  noReceiptNoteTitle: 'No receipt – no payment',
  noReceiptNoteBody:
    'Without a receipt the expense cannot be paid out. You can save it now and attach a receipt later – it will appear under To do on the home page until then.',
  payImpactNoteTitle: 'How this affects your pay',
  payImpactNoteBody:
    'Expenses are paid out tax-free with your pay. The amount therefore does not affect your tax.',

  // ── Confirm summary ──
  summaryCategory: 'Category',
  summaryAmount: 'Amount',
  summaryDescription: 'Description',
  summaryReceipt: 'Receipt',
  summaryReceiptMissing: 'Missing – attach later',
  confirmNoteTitle: 'When you confirm',
  confirmNoteWithReceipt:
    'The expense will be sent to {{hrName}} for approval and paid out on the next pay.',
  confirmNoteNoReceipt:
    'The expense will be saved. It will not be paid out until you have attached a receipt.',

  // ── Footer CTAs ──
  continue: 'Continue',
  continueNoReceipt: 'Continue without receipt',
  confirmSend: 'Confirm & send for approval',
  saveExpense: 'Save expense',
  cancel: 'Cancel',

  // ── Success ──
  successRegisteredTitle: 'Expense registered',
  successSavedTitle: 'Expense saved',
  successNotificationSent: 'Notification sent to {{hrName}} for approval.',
  successWillBePaid: 'Will be paid on {{payday}}: {{amount}}.',
  successFollowStatus: 'You can follow the status on the home page.',
  successSavedNotPaid: 'The expense is saved but cannot be paid out yet.',
  successNoReceiptNoPay: 'No receipt = no payment. Attach a receipt to get the expense paid.',
  successFindUnderTodo: 'You can find it under To do on the home page.',
  goToHome: 'Go to home',
  registerMore: 'Register more',
};

export const expenseSv: typeof expenseEn = {
  // ── Step kickers + titles ──
  kickerExpense: 'Utlägg',
  kickerConfirm: 'Bekräfta',
  detailsTitle: 'Vad gäller utlägget?',
  confirmTitle: 'Ser allt rätt ut?',

  // ── Receipt upload ──
  uploadReceipt: 'Ladda upp kvitto',
  uploadReceiptHint: 'PDF eller foto · max 10 MB',
  autoFilled: 'Vi har fyllt i uppgifterna åt dig – kontrollera att de stämmer.',
  noReceiptToggle: 'Jag har inget kvitto just nu',

  // ── Category ──
  categoryLabel: 'Kategori',
  categoryPlaceholder: 'Välj en kategori',
  categorySheetTitle: 'Kategori',
  categorySheetSub: 'Välj vad utlägget gäller',

  // ── Amount + description ──
  amountLabel: 'Belopp',
  currency: 'kr',
  descriptionLabel: 'Beskrivning',
  descriptionOptional: 'valfritt',
  descriptionPlaceholder: 'T.ex. Parkering vid kundbesök',

  // ── Notes ──
  noReceiptNoteTitle: 'Inget kvitto – ingen utbetalning',
  noReceiptNoteBody:
    'Utan ett kvitto kan utlägget inte betalas ut. Du kan spara det nu och bifoga ett kvitto senare – det visas under Att göra på startsidan tills dess.',
  payImpactNoteTitle: 'Så påverkas din lön',
  payImpactNoteBody:
    'Utlägg betalas ut skattefritt med din lön. Beloppet påverkar därför inte din skatt.',

  // ── Confirm summary ──
  summaryCategory: 'Kategori',
  summaryAmount: 'Belopp',
  summaryDescription: 'Beskrivning',
  summaryReceipt: 'Kvitto',
  summaryReceiptMissing: 'Saknas – bifoga senare',
  confirmNoteTitle: 'När du bekräftar',
  confirmNoteWithReceipt:
    'Utlägget skickas till {{hrName}} för godkännande och betalas ut på nästa lön.',
  confirmNoteNoReceipt:
    'Utlägget sparas. Det betalas inte ut förrän du har bifogat ett kvitto.',

  // ── Footer CTAs ──
  continue: 'Fortsätt',
  continueNoReceipt: 'Fortsätt utan kvitto',
  confirmSend: 'Bekräfta & skicka för godkännande',
  saveExpense: 'Spara utlägg',
  cancel: 'Avbryt',

  // ── Success ──
  successRegisteredTitle: 'Utlägg registrerat',
  successSavedTitle: 'Utlägg sparat',
  successNotificationSent: 'Avisering skickad till {{hrName}} för godkännande.',
  successWillBePaid: 'Betalas ut {{payday}}: {{amount}}.',
  successFollowStatus: 'Du kan följa statusen på startsidan.',
  successSavedNotPaid: 'Utlägget är sparat men kan inte betalas ut ännu.',
  successNoReceiptNoPay:
    'Inget kvitto = ingen utbetalning. Bifoga ett kvitto för att få utlägget utbetalt.',
  successFindUnderTodo: 'Du hittar den under Att göra på startsidan.',
  goToHome: 'Gå till start',
  registerMore: 'Registrera mer',
};
