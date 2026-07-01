// Detail-screens i18n — flat key → string maps for the 'detail' namespace.
// Chrome (app-bar titles, timeline step labels, buttons, section headers) for the
// Complete flow (CompleteScreen) and the status/Details screen (StatusScreen).
//
// EN copy ported from CompleteFlow (k-expense.jsx) + StatusDetail (k-misc.jsx);
// SV taken verbatim from design/SPHERE - Full Prototype/k-i18n.js where available.
// Registered via i18n.addResourceBundle in ../../i18n/index.ts.

export const detailEn = {
  // App bar titles
  completeTitle: 'Complete',
  detailsTitle: 'Details',

  // Complete flow — attachment + note
  attachReceipt: 'Attach receipt',
  attachReceiptHint: 'Take photo or choose file',
  uploadCertificate: 'Upload medical certificate',
  uploadCertificateHint: 'PDF or photo · max 10 MB',
  whyNeeded: 'Why is this needed?',

  // Complete flow — footer buttons
  submit: 'Submit',
  deleteRegistration: 'Delete registration',

  // Complete flow — done / deleted confirmations
  receiptAttachedTitle: 'Receipt attached',
  certificateUploadedTitle: 'Certificate uploaded',
  registrationDeletedTitle: 'Registration deleted',
  goToHome: 'Go to home',

  // Status screen — sections
  status: 'Status',
  impactOnPay: 'Impact on pay',
  whyRejected: 'Why was it rejected?',

  // Status screen — timeline step labels
  stepRegistered: 'Registered',
  stepAwaitingApproval: 'Awaiting approval',
  stepIncludedInPay: 'Included in pay',
  stepRejected: 'Rejected',
  by: 'You',

  // Fallback
  notFound: 'Not found.',
};

export const detailSv: typeof detailEn = {
  completeTitle: 'Komplettera',
  detailsTitle: 'Detaljer',

  attachReceipt: 'Bifoga kvitto',
  attachReceiptHint: 'Ta foto eller välj fil',
  uploadCertificate: 'Ladda upp läkarintyg',
  uploadCertificateHint: 'PDF eller foto · max 10 MB',
  whyNeeded: 'Varför behövs detta?',

  submit: 'Skicka',
  deleteRegistration: 'Ta bort registrering',

  receiptAttachedTitle: 'Kvitto bifogat',
  certificateUploadedTitle: 'Intyg uppladdat',
  registrationDeletedTitle: 'Registrering borttagen',
  goToHome: 'Gå till start',

  status: 'Status',
  impactOnPay: 'Påverkan på lön',
  whyRejected: 'Varför avslogs det?',

  stepRegistered: 'Registrerad',
  stepAwaitingApproval: 'Inväntar godkännande',
  stepIncludedInPay: 'Ingår i lön',
  stepRejected: 'Avslagen',
  by: 'Du',

  notFound: 'Hittades inte.',
};
