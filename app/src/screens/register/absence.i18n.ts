// Absence registration flow i18n — flat key → string maps for the 'absence' namespace.
// EN copy ported from design/SPHERE - Full Prototype/k-absence.jsx; SV taken verbatim
// from design/SPHERE - Full Prototype/k-i18n.js where available.
// The lead wires this namespace into i18next — do not register it here.

export const absenceEn = {
  // Kickers / titles
  kickerAbsence: 'Absence',
  stepTypeTitle: 'What is the absence for?',
  stepDatesTitle: 'Which days?',
  stepCertTitleSick: 'Upload medical certificate',
  stepCertTitle: 'Upload certificate',
  kickerStepRequired: 'Step required',
  stepConfirmTitle: 'Does everything look right?',
  kickerConfirm: 'Confirm',

  // Type step
  badgeMayRequireCert: 'May require certificate',
  continue: 'Continue',

  // Dates step
  selectedPeriod: 'Selected period',
  noneSelected: 'None selected',
  daysOne: '{{count}} day',
  daysOther: '{{count}} days',
  howThisAffectsPay: 'How this affects your pay',
  salaryNoteSick:
    'A waiting day deduction is applied once at the start of the sick period. From day 2 you receive sick pay from your employer.',
  salaryNoteVab:
    'Your pay is reduced for child sick care days. You apply for compensation from the Social Insurance Agency yourself.',
  salaryNoteVacation:
    'Annual leave does not affect your net pay – you receive holiday pay instead of regular pay.',
  salaryNoteParental:
    'Your pay is reduced for the relevant days. Compensation is applied for separately via the Social Insurance Agency.',
  salaryNoteNoImpact: 'This absence does not affect your net pay.',
  salaryNoteDefault:
    'Your pay is reduced for the days you are absent. Any compensation is handled separately.',
  certNoteSickLonger:
    'For sick leave a medical certificate is required from day 8. Your period is longer than 7 days – you will upload the certificate in the next step.',
  certNoteSickWithin:
    'For sick leave a medical certificate is required from day 8. Your period is within 7 days – no certificate needed.',
  certNoteVabLonger:
    'For child sick care a certificate is required after day 7. Your period is longer than 7 days.',
  certNoteVabWithin:
    'For child sick care a certificate is required after day 7. No certificate needed for this period.',

  // Cert step
  attachMedicalCertificate: 'Attach medical certificate',
  attachCertificate: 'Attach certificate',
  attachHint: 'PDF or photo · max 10 MB',
  noCertificateYet: "I don't have a certificate yet",
  certificateRequired: 'Certificate required',
  certificateRequiredBody:
    'Since the absence is longer than 7 days, a certificate must be attached for compensation to be paid out.',
  whatHappensThen: 'What happens then?',
  noCertConsequenceBody:
    'You can register the absence now, but sick pay will not be paid until the certificate is uploaded. You will find a reminder on the home page under To do.',
  continueWithCert: 'Continue',
  continueWithoutCert: 'Continue without certificate',

  // Confirm step
  labelType: 'Type',
  labelPeriod: 'Period',
  labelCertificate: 'Certificate',
  labelPayImpact: 'Pay impact',
  certMissingUploadLater: 'Missing – upload later',
  payImpactNone: 'None',
  payImpactNoneHoliday: 'None (holiday pay)',
  whenYouConfirm: 'When you confirm',
  whenYouConfirmBody:
    'A notification is sent to {{hrName}} for approval. You can follow the status on the home page and make changes until it is approved.',
  confirmAndSend: 'Confirm & send for approval',
  cancel: 'Cancel',

  // Success
  registeredTitle: '{{type}} registered',
  successNotified: 'A notification has been sent to {{hrName}} for approval.',
  successPeriod: 'Period: {{range}} ({{days}}).',
  successNoImpactVacation:
    'Your pay is not affected – holiday pay is paid as usual.',
  successNoImpact: 'Your pay is not affected by this absence.',
  successImpact: 'Affects the pay on {{payday}} by approx. {{amount}}.',
  successCertReminder:
    "Don't forget to upload your certificate – otherwise sick pay may not be paid.",
  successFollowStatus:
    'You can follow the status on the home page until it is approved.',
  goToHome: 'Go to home',
  registerMore: 'Register more',
};

export const absenceSv: typeof absenceEn = {
  // Kickers / titles
  kickerAbsence: 'Frånvaro',
  stepTypeTitle: 'Vad gäller frånvaron?',
  stepDatesTitle: 'Vilka dagar?',
  stepCertTitleSick: 'Ladda upp läkarintyg',
  stepCertTitle: 'Ladda upp intyg',
  kickerStepRequired: 'Obligatoriskt steg',
  stepConfirmTitle: 'Ser allt rätt ut?',
  kickerConfirm: 'Bekräfta',

  // Type step
  badgeMayRequireCert: 'Kan kräva intyg',
  continue: 'Fortsätt',

  // Dates step
  selectedPeriod: 'Vald period',
  noneSelected: 'Ingen vald',
  daysOne: '{{count}} dag',
  daysOther: '{{count}} dagar',
  howThisAffectsPay: 'Så påverkas din lön',
  salaryNoteSick:
    'Ett karensavdrag görs en gång i början av sjukperioden. Från dag 2 får du sjuklön från din arbetsgivare.',
  salaryNoteVab:
    'Din lön minskas för dagar med vård av barn. Du ansöker själv om ersättning från Försäkringskassan.',
  salaryNoteVacation:
    'Semester påverkar inte din nettolön – du får semesterlön i stället för vanlig lön.',
  salaryNoteParental:
    'Din lön minskas för de aktuella dagarna. Ersättning ansöks separat via Försäkringskassan.',
  salaryNoteNoImpact: 'Den här frånvaron påverkar inte din nettolön.',
  salaryNoteDefault:
    'Din lön minskas för de dagar du är frånvarande. Eventuell ersättning hanteras separat.',
  certNoteSickLonger:
    'Vid sjukfrånvaro krävs ett läkarintyg från dag 8. Din period är längre än 7 dagar – du laddar upp intyget i nästa steg.',
  certNoteSickWithin:
    'Vid sjukfrånvaro krävs ett läkarintyg från dag 8. Din period är inom 7 dagar – inget intyg behövs.',
  certNoteVabLonger:
    'Vid vård av barn krävs ett intyg efter dag 7. Din period är längre än 7 dagar.',
  certNoteVabWithin:
    'Vid vård av barn krävs ett intyg efter dag 7. Inget intyg behövs för den här perioden.',

  // Cert step
  attachMedicalCertificate: 'Bifoga läkarintyg',
  attachCertificate: 'Bifoga intyg',
  attachHint: 'PDF eller foto · max 10 MB',
  noCertificateYet: 'Jag har inget intyg ännu',
  certificateRequired: 'Intyg krävs',
  certificateRequiredBody:
    'Eftersom frånvaron är längre än 7 dagar måste ett intyg bifogas för att ersättning ska betalas ut.',
  whatHappensThen: 'Vad händer då?',
  noCertConsequenceBody:
    'Du kan registrera frånvaron nu, men sjuklön betalas inte ut förrän intyget har laddats upp. Du hittar en påminnelse på startsidan under Att göra.',
  continueWithCert: 'Fortsätt',
  continueWithoutCert: 'Fortsätt utan intyg',

  // Confirm step
  labelType: 'Typ',
  labelPeriod: 'Period',
  labelCertificate: 'Intyg',
  labelPayImpact: 'Lönepåverkan',
  certMissingUploadLater: 'Saknas – ladda upp senare',
  payImpactNone: 'Ingen',
  payImpactNoneHoliday: 'Ingen (semesterlön)',
  whenYouConfirm: 'När du bekräftar',
  whenYouConfirmBody:
    'En avisering skickas till {{hrName}} för godkännande. Du kan följa statusen på startsidan och göra ändringar tills den är godkänd.',
  confirmAndSend: 'Bekräfta & skicka för godkännande',
  cancel: 'Avbryt',

  // Success
  registeredTitle: '{{type}} registrerad',
  successNotified: 'En avisering har skickats till {{hrName}} för godkännande.',
  successPeriod: 'Period: {{range}} ({{days}}).',
  successNoImpactVacation:
    'Din lön påverkas inte – semesterlön betalas som vanligt.',
  successNoImpact: 'Din lön påverkas inte av den här frånvaron.',
  successImpact: 'Påverkar lönen den {{payday}} med cirka {{amount}}.',
  successCertReminder:
    'Glöm inte att ladda upp ditt intyg – annars kanske sjuklön inte betalas ut.',
  successFollowStatus:
    'Du kan följa statusen på startsidan tills den är godkänd.',
  goToHome: 'Gå till start',
  registerMore: 'Registrera mer',
};
