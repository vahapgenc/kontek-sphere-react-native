// App session state (Zustand). Auth gate, active company / mode, demo scenario,
// language, and the notification-read set. Mirrors the prototype's `store`.
import { create } from 'zustand';

export type Lang = 'sv' | 'en';
export type CompanyMode = 'employee' | 'manager';
export type Scenario = 'Standard' | 'Sick 2 days';

interface SessionState {
  authed: boolean;
  companyId: string;
  mode: CompanyMode;
  scenario: Scenario;
  lang: Lang;
  notifRead: Set<string>;
  /** The register hub (quick-action sheet opened by the center FAB). */
  registerOpen: boolean;
  /**
   * The register flow currently open, rendered as an in-shell overlay so the
   * bottom tab bar stays visible (mirrors the prototype). `null` = no flow.
   */
  activeFlow: RegisterFlow | null;

  login: () => void;
  logout: () => void;
  setCompany: (id: string, mode: CompanyMode) => void;
  setScenario: (s: Scenario) => void;
  setLang: (l: Lang) => void;
  markNotifRead: (id: string) => void;
  markAllNotifRead: (ids: string[]) => void;
  openRegister: () => void;
  closeRegister: () => void;
  openFlow: (flow: RegisterFlow) => void;
  closeFlow: () => void;
}

export type RegisterFlow = 'absence' | 'expense';

export const useSession = create<SessionState>((set) => ({
  authed: false,
  companyId: 'nordvik',
  mode: 'employee',
  scenario: 'Standard',
  lang: 'sv',
  notifRead: new Set<string>(),
  registerOpen: false,
  activeFlow: null,

  login: () => set({ authed: true }),
  logout: () => set({ authed: false }),
  setCompany: (id, mode) => set({ companyId: id, mode }),
  setScenario: (scenario) => set({ scenario }),
  setLang: (lang) => set({ lang }),
  markNotifRead: (id) =>
    set((s) => ({ notifRead: new Set(s.notifRead).add(id) })),
  markAllNotifRead: (ids) =>
    set((s) => {
      const n = new Set(s.notifRead);
      ids.forEach((i) => n.add(i));
      return { notifRead: n };
    }),
  openRegister: () => set({ registerOpen: true }),
  closeRegister: () => set({ registerOpen: false }),
  openFlow: (flow) => set({ activeFlow: flow, registerOpen: false }),
  closeFlow: () => set({ activeFlow: null }),
}));
