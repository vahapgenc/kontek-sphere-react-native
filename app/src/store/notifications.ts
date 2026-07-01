// Unread notification count — a single source of truth shared by the bell on
// every root screen so the badge is identical everywhere. Mirrors the prototype
// (k-app.jsx): employee sees the "n-sick"/"n-exp" to-dos; a manager additionally
// sees the two approval notifications. Group 4 (notifications feature) will
// replace this seed with the full notification fixtures + screen.
import { useSession } from './session';

const NOTIF_UNREAD_EMPLOYEE = ['n-sick', 'n-exp'];
const NOTIF_UNREAD_MANAGER = ['n-appr-abs', 'n-appr-exp'];

/** Live unread count for the app-bar bell, keyed to mode + the read set. */
export function useUnreadNotifCount(): number {
  const mode = useSession((s) => s.mode);
  const notifRead = useSession((s) => s.notifRead);
  const ids =
    mode === 'manager'
      ? [...NOTIF_UNREAD_EMPLOYEE, ...NOTIF_UNREAD_MANAGER]
      : NOTIF_UNREAD_EMPLOYEE;
  return ids.filter((id) => !notifRead.has(id)).length;
}
