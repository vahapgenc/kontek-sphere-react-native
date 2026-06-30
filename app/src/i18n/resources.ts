// i18n resources — EN/SV pairs extracted from design/SPHERE - Full Prototype/k-i18n.js.
// Screens add their own namespaces as they are built; `common` holds shared strings
// (nav, statuses, buttons). Swedish is the canonical product language.

export const resources = {
  sv: {
    common: {
      tab: { home: 'Hem', pay: 'Lön', payslips: 'Lön', calendar: 'Kalender', profile: 'Profil', approvals: 'Godkännanden', employees: 'Anställda', me: 'Mitt' },
      status: { action: 'Åtgärda', pending: 'Inväntar godkännande', approved: 'Godkänd', rejected: 'Nekad', info: 'Info' },
      action: {
        continue: 'Fortsätt', submit: 'Skicka', cancel: 'Avbryt', approve: 'Godkänn', reject: 'Neka',
        save: 'Spara', undo: 'Ångra', signIn: 'Logga in', logout: 'Logga ut', back: 'Tillbaka',
        registerMore: 'Registrera mer', markAllRead: 'Markera alla som lästa', bankId: 'Logga in med Mobilt BankID',
      },
      label: { language: 'Språk', swedish: 'Svenska', english: 'Engelska', email: 'E-post', password: 'Lösenord' },
      auth: {
        eyebrow: 'Sphere · Anställd', welcome: 'Välkommen tillbaka',
        subtitle: 'Din lön, frånvaro och utlägg — allt på ett ställe.',
        or: 'eller', trouble: 'Problem att logga in?', contactAdmin: 'Kontakta din administratör',
        enterPassword: 'Ange lösenord', forgot: 'Glömt lösenord?', show: 'Visa', hide: 'Dölj',
        signingIn: 'Loggar in…', emailPlaceholder: 'namn@företag.se',
      },
    },
  },
  en: {
    common: {
      tab: { home: 'Home', pay: 'Pay', payslips: 'Pay', calendar: 'Calendar', profile: 'Profile', approvals: 'Approvals', employees: 'Employees', me: 'Me' },
      status: { action: 'Action', pending: 'Awaiting approval', approved: 'Approved', rejected: 'Rejected', info: 'Info' },
      action: {
        continue: 'Continue', submit: 'Submit', cancel: 'Cancel', approve: 'Approve', reject: 'Reject',
        save: 'Save', undo: 'Undo', signIn: 'Sign in', logout: 'Log out', back: 'Back',
        registerMore: 'Register more', markAllRead: 'Mark all as read', bankId: 'Sign in with Mobile BankID',
      },
      label: { language: 'Language', swedish: 'Swedish', english: 'English', email: 'Work email', password: 'Password' },
      auth: {
        eyebrow: 'Sphere · Employee', welcome: 'Welcome back',
        subtitle: 'Your pay, absence and expenses — all in one place.',
        or: 'or', trouble: 'Trouble signing in?', contactAdmin: 'Contact your administrator',
        enterPassword: 'Enter password', forgot: 'Forgot password?', show: 'Show', hide: 'Hide',
        signingIn: 'Signing in…', emailPlaceholder: 'name@company.com',
      },
    },
  },
} as const;

export type AppLang = keyof typeof resources;
