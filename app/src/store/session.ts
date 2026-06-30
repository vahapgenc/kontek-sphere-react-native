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

  login: () => void;
  logout: () => void;
  setCompany: (id: string, mode: CompanyMode) => void;
  setScenario: (s: Scenario) => void;
  setLang: (l: Lang) => void;
  markNotifRead: (id: string) => void;
  markAllNotifRead: (ids: string[]) => void;
}

export const useSession = create<SessionState>((set) => ({
  authed: false,
  companyId: 'nordvik',
  mode: 'employee',
  scenario: 'Standard',
  lang: 'sv',
  notifRead: new Set<string>(),

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
}));
