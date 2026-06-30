// ============================================================
// k-app.jsx — App shell, router, bottom nav, Home screen
// ============================================================
const { useState: useStateA, useEffect: useEffectA, useRef: useRefA, useCallback } = React;

// Notifications that start unread and require/track user action
const NOTIF_UNREAD_IDS = ["n-sick", "n-exp"];

// ---------------- App bar (ds-appbar) ----------------
function AppBar({ title, onBack, right, subtitle, large, eyebrow, scrolled, noDivider }) {
  const frost = scrolled
    ? { background: "rgba(242,248,245,0.92)", backdropFilter: "blur(16px) saturate(150%)", WebkitBackdropFilter: "blur(16px) saturate(150%)", borderBottom: noDivider ? "none" : "1px solid rgba(18,33,33,0.07)" }
    : { background: "transparent", backdropFilter: "none", WebkitBackdropFilter: "none", borderBottom: "none" };
  if (large) {
    return (
      <div className="ds-appbar" style={{ flexShrink: 0, paddingTop: 50, zIndex: 6, transition: "background .25s ease, border-color .25s ease", ...frost }}>
        <div style={{ height: 20 }} />
        <div className="ds-appbar__large">
          {eyebrow && <div className="ds-appbar__eyebrow">{eyebrow}</div>}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <h1 className="ds-appbar__h1" style={{ minWidth: 0 }}>{title}</h1>
            {right && <div style={{ flexShrink: 0 }}>{right}</div>}
          </div>
          {subtitle && <div style={{ fontSize: "var(--t-body-sm)", color: "var(--ink-3)", marginTop: 4 }}>{subtitle}</div>}
        </div>
      </div>
    );
  }
  return (
    <div className="ds-appbar" style={{ flexShrink: 0, paddingTop: 50, zIndex: 6, transition: "background .25s ease, border-color .25s ease", ...frost }}>
      <div className="ds-appbar__bar">
        {onBack && <button className="ds-appbar__action" onClick={onBack}><Icon name="chevL" /></button>}
        <div className="ds-appbar__title">{title}</div>
        {right ? right : (onBack && <div style={{ width: 48, flexShrink: 0 }} />)}
      </div>
    </div>
  );
}

// ---------------- Bottom nav (ds-tabbar, hybrid mint create) ----------------
function BottomNav({ tab, onTab, onRegister, hubOpen, notifUnread, notifCount, todoCount, isManager, approvalCount }) {
  const items = [
    { id: "home", label: "Home", icon: "home", badge: todoCount },
    isManager
      ? { id: "me", label: "Me", icon: "payslip" }
      : { id: "payslips", label: "Pay", icon: "payslip" },
    { id: "_reg" },
    isManager
      ? { id: "employees", label: "Employees", icon: "approvals", badge: approvalCount }
      : { id: "calendar", label: "Calendar", icon: "calendar" },
    { id: "profile", label: "Profile", icon: "user" },
  ];
  return (
    <nav className="ds-tabbar" style={{ flexShrink: 0, zIndex: 90, position: "relative" }}>
      {items.map(it => {
        if (it.id === "_reg") {
          return (
            <button key="reg" className="ds-tab" onClick={onRegister} aria-label="Register" aria-expanded={hubOpen} style={{ overflow: "visible", position: "relative", zIndex: 40 }}>
              <span style={{ marginTop: -24, width: 56, height: 56, display: "grid", placeItems: "center", borderRadius: "var(--r-pill)",
                background: hubOpen ? "var(--green)" : "var(--status-badge)", color: "var(--shell-cta-ink)",
                boxShadow: "0 8px 18px rgba(18,33,33,0.18), 0 2px 6px rgba(18,33,33,0.12)",
                transition: "background var(--gaia-transition-state), box-shadow var(--gaia-transition-state)" }}>
                <Icon name={hubOpen ? "close" : "plus"} size={26} sw={2.2} />
              </span>
            </button>
          );
        }
        return (
          <button key={it.id} className={"ds-tab" + (tab === it.id ? " is-active" : "")} onClick={() => onTab(it.id)}>
            <span className="ds-tab__icon">
              <Icon name={it.icon} />
              {it.badge > 0 && <span className="ds-tab__badge">{it.badge}</span>}
            </span>
            <span className="ds-tab__label">{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

// ---------------- Snackbar / flash ----------------
function Flash({ flash, onClose }) {
  const [mounted, setMounted] = useStateA(!!flash);
  const [shown, setShown] = useStateA(false);
  useEffectA(() => {
    if (flash) { setMounted(true); const t = setTimeout(() => setShown(true), 20); return () => clearTimeout(t); }
    setShown(false); const t = setTimeout(() => setMounted(false), 260); return () => clearTimeout(t);
  }, [flash && flash.id]);
  if (!mounted || !flash) return null;
  return (
    <div style={{ position: "absolute", left: 12, right: 12, bottom: "calc(var(--tabbar-h) + var(--safe-bottom) + 12px)", zIndex: 95,
      display: "flex", alignItems: "center", gap: 10, padding: "12px 12px 12px 16px",
      background: "#173534", color: "#fff", borderRadius: "var(--r-panel)", boxShadow: "0 12px 30px rgba(18,33,33,0.32)",
      transform: shown ? "translateY(0)" : "translateY(12px)", opacity: shown ? 1 : 0,
      transition: "transform .26s var(--ease), opacity .26s var(--ease)" }}>
      {flash.tone && <span style={{ flexShrink: 0, display: "inline-flex", color: flash.tone === "danger" ? "#F2B5A8" : "#9DDFB5" }}>
        <Icon name={flash.tone === "danger" ? "close" : "check"} size={19} sw={2.2} />
      </span>}
      <span style={{ flex: 1, minWidth: 0, fontSize: "var(--t-body-sm)", fontWeight: 500, lineHeight: 1.4 }}>{flash.text}</span>
      {flash.action && (
        <button onClick={flash.onAction} style={{ flexShrink: 0, border: "none", background: "transparent", color: "#9DDFB5",
          fontFamily: "var(--font)", fontSize: "var(--t-body-sm)", fontWeight: 700, cursor: "pointer", padding: "8px 12px", borderRadius: 10 }}>
          {flash.action}
        </button>
      )}
    </div>
  );
}

// ---------------- Status helpers ----------------
const STATUS_META = {
  action:   { tone: "warn",    label: "Action required" },
  pending:  { tone: "info",    label: "Awaiting approval" },
  approved: { tone: "ok",      label: "Approved" },
  rejected: { tone: "danger",  label: "Rejected" },
  info:     { tone: "neutral", label: "Info" },
};

// ---------------- Home screen ----------------
function HomeScreen({ nav, store, scrolled }) {
  const u = store.upcoming;
  const delta = u.estNet - u.prevNet;
  const [openDetails, setOpenDetails] = useStateA(false);
  const [openTodo, setOpenTodo] = useStateA(true);
  const [openPerioden, setOpenPerioden] = useStateA(true);
  const [openTidigare, setOpenTidigare] = useStateA(false);
  const actionItems = store.todos.filter(t => t.status === "action");
  const approvalItems = store.isManager
    ? [
        ...store.approvals.absence.map(x => ({ ...x, _kind: "absence" })),
        ...store.approvals.expense.map(x => ({ ...x, _kind: "expense" })),
      ]
    : [];
  const todoTotal = actionItems.length + approvalItems.length;

  return (
    <div style={{ padding: "16px 16px 28px", display: "flex", flexDirection: "column", gap: 22 }}>
      {/* Kommande lön hero — sticky */}
      <div style={{
        position: "sticky", top: 0, zIndex: 5, color: "var(--signature)", overflow: "hidden",
        transition: "background .25s ease, border-radius .25s ease, box-shadow .25s ease, padding .25s ease, margin .25s ease",
        ...(scrolled ? {
          background: "rgba(242,248,245,0.92)",
          backdropFilter: "blur(16px) saturate(150%)",
          WebkitBackdropFilter: "blur(16px) saturate(150%)",
          border: "none",
          borderBottom: "1px solid rgba(18,33,33,0.07)",
          borderRadius: 0,
          padding: "12px 16px 14px",
          marginLeft: -16, marginRight: -16,
          boxShadow: "none",
        } : {
          background: "linear-gradient(145deg, #F0FAF4 0%, #DBEFE3 100%)",
          border: "1px solid rgba(32,59,60,0.06)",
          borderRadius: 24,
          padding: "20px 22px",
          boxShadow: "0 16px 34px -14px rgba(32,59,60,0.26)",
        }),
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "var(--t-eyebrow)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--green-deep)" }}>Upcoming pay · {PERIOD.payday}</span>
          <Badge tone="brand" style={{ background: "var(--green-soft)", color: "var(--green-deep)" }} dot>Preliminary</Badge>
        </div>
        <div className="tnum" style={{ fontSize: "var(--t-display)", fontWeight: 700, letterSpacing: "-0.02em", marginTop: 10, lineHeight: 1.04 }}>{kr(u.estNet)}</div>

        <button onClick={() => setOpenDetails(o => !o)} style={{ marginTop: 12, marginLeft: -10, display: "inline-flex", alignItems: "center", gap: 6, minHeight: 40, padding: "8px 14px", borderRadius: "var(--r-pill)", border: "none", background: "rgba(32,59,60,0.06)", color: "var(--green-deep)", fontFamily: "var(--font)", fontSize: "var(--t-body-sm)", fontWeight: 600, cursor: "pointer" }}>
          {openDetails ? "Hide details" : "Details"}
          <Icon name="chevD" size={17} style={{ transform: openDetails ? "rotate(180deg)" : "none", transition: "transform .2s var(--ease)" }} />
        </button>

        {openDetails && (
          <div className="fade-up" style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--green-line)" }}>
            {u.items.map((it) => (
              <div key={it.id} onClick={it.linked ? () => nav.push("complete", { id: it.linked }) : undefined} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, padding: "8px 0", cursor: it.linked ? "pointer" : "default" }}>
                <span style={{ fontSize: "var(--t-body-sm)", color: "var(--ink)", flex: 1, minWidth: 0 }}>
                  {it.label}
                </span>
                <span className="tnum" style={{ fontSize: "var(--t-body-sm)", fontWeight: 600, whiteSpace: "nowrap", color: it.amount < 0 ? "var(--red)" : "var(--signature)" }}>{kr(it.amount, { plus: it.amount > 0 })}</span>
              </div>
            ))}
            <p style={{ margin: "0", paddingTop: 12, borderTop: "1px solid var(--green-line)", fontSize: "var(--t-caption)", color: "var(--ink-3)", lineHeight: 1.5 }}>
              Additions and deductions follow your{" "}
              <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "var(--green-deep)", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 2, whiteSpace: "nowrap" }}>
                kollektivavtal<Icon name="external" size={13} style={{ verticalAlign: "-1px", marginLeft: 3 }} />
              </a>.
            </p>
          </div>
        )}
      </div>

      {/* To do — collapsible */}
      <div>
        <button onClick={() => setOpenTodo(o => !o)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "2px 4px 10px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "var(--font)", textAlign: "left" }}>
          <span style={{ flex: 1, display: "inline-flex", alignItems: "center", gap: 8, whiteSpace: "nowrap", fontSize: "var(--t-caption)", fontWeight: 600, letterSpacing: "0.005em", textTransform: "none", color: "var(--ink-3)" }}>To do
            {todoTotal > 0 && <span style={{ minWidth: 18, height: 18, padding: "0 5px", borderRadius: "var(--r-pill)", background: "var(--ink-3)", color: "#fff", fontSize: 11, fontWeight: 700, lineHeight: "18px", textAlign: "center", boxSizing: "border-box" }}>{todoTotal}</span>}
          </span>
          <Icon name="chevD" size={18} stroke="var(--ink-3)" style={{ transform: openTodo ? "rotate(180deg)" : "none", transition: "transform .2s var(--ease)" }} />
        </button>
        {openTodo && (todoTotal > 0 ? (
          <List>
            {actionItems.map(t => (
              <Row key={t.id} dense icon={t.kind === "expense" ? "receipt" : "calendar"}
                title={t.title} sub={t.sub} onClick={() => nav.push("complete", { id: t.id })}
                right={<Badge tone="warn" dot>Fix</Badge>} />
            ))}
            {approvalItems.map(a => (
              <button key={a.id} className="ds-row" onClick={() => nav.go("employees")} style={{ minHeight: 52 }}>
                <span style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, display: "grid", placeItems: "center", background: "#395F61", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: "0.02em" }}>{a.name.split(" ").map(s => s[0]).slice(0, 2).join("")}</span>
                <span className="ds-row__body">
                  <span className="ds-row__title" style={{ fontSize: "var(--t-title)" }}>{a.name}{!a.category ? ` · ${a.type}` : ''}</span>
                  <span className="ds-row__sub" style={{ fontSize: "var(--t-body)" }}>{a.range} · {a.meta}</span>
                </span>
                <span className="ds-row__trail"><Badge tone="info" dot>Review</Badge></span>
              </button>
            ))}
          </List>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 16px", background: "var(--surface)", border: "1px solid transparent", borderRadius: "var(--r-panel)", boxShadow: "var(--sh-1)" }}>
            <span style={{ width: 38, height: 38, borderRadius: 12, flexShrink: 0, display: "grid", placeItems: "center", background: "var(--ok-bg)", color: "var(--ok)" }}><Icon name="check" size={20} sw={2.2} /></span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "var(--t-title)", fontWeight: 600 }}>Nothing to do right now</div>
              <div style={{ fontSize: "var(--t-body)", color: "var(--ink-3)", marginTop: 1 }}>You have nothing that needs your attention.</div>
            </div>
          </div>
        ))}
      </div>

      {/* Den här perioden — collapsible */}
      <div>
        <button onClick={() => setOpenPerioden(o => !o)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "2px 4px 10px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "var(--font)", textAlign: "left" }}>
          <span style={{ flex: 1, fontSize: "var(--t-caption)", fontWeight: 600, letterSpacing: "0.005em", textTransform: "none", color: "var(--ink-3)" }}>My registrations for {store.upcoming.month.split(" ")[0]}</span>
          <Icon name="chevD" size={18} stroke="var(--ink-3)" style={{ transform: openPerioden ? "rotate(180deg)" : "none", transition: "transform .2s var(--ease)" }} />
        </button>
        {openPerioden && (store.activity.length === 0
          ? <Card><div style={{ padding: 6, textAlign: "center", color: "var(--ink-3)", fontSize: "var(--t-body-sm)" }}>Nothing registered yet</div></Card>
          : <List>
              {[...store.activity].sort((a, b) => {
                const dateMap = { "2 juni": 2, "29 maj": 29, "5 juni": 5, "27 maj": 27 };
                const monthMap = { "May": 5, "June": 6 };
                const parseDate = (str) => {
                  const parts = str.split(" ");
                  return monthMap[parts[0]] * 100 + parseInt(parts[1]);
                };
                return parseDate(b.registered) - parseDate(a.registered);
              }).map((a) => {
                const m = STATUS_META[a.status];
                return (
                  <Row key={a.id} dense icon={a.icon} title={a.title} sub={<div style={{ display: "flex", flexDirection: "column", gap: 1 }}><span>{a.sub}</span><span style={{ fontSize: "var(--t-caption)", color: "var(--ink-4)" }}>Registered {a.registered}</span></div>}
                    onClick={() => nav.push("status", { id: a.id })}
                    right={<Badge tone={m.tone} dot>{m.label}</Badge>} />
                );
              })}
            </List>)}
      </div>

      {/* Tidigare — collapsible */}
      <div>
        <button onClick={() => setOpenTidigare(o => !o)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "2px 4px 10px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "var(--font)", textAlign: "left" }}>
          <span style={{ flex: 1, fontSize: "var(--t-caption)", fontWeight: 600, letterSpacing: "0.005em", textTransform: "none", color: "var(--ink-3)" }}>Previous</span>
          <Icon name="chevD" size={18} stroke="var(--ink-3)" style={{ transform: openTidigare ? "rotate(180deg)" : "none", transition: "transform .2s var(--ease)" }} />
        </button>
        {openTidigare && (
          <List>
            <Row dense icon="calendar" title="Annual leave" sub="April 14–18 · 5 days" right={<Badge tone="ok" dot>Approved</Badge>} />
            <Row dense icon="receipt" title="Expense – travel" sub="April 2 · SEK 420" right={<Badge tone="ok" dot>Paid</Badge>} />
            <Row dense icon="calendar" title="Child sick care" sub="March 18 · 1 day" right={<Badge tone="ok" dot>Approved</Badge>} />
            <Row dense icon="payslip" title="Pay slip March" sub="Paid March 25" right={<Badge tone="ok" dot>Paid</Badge>} />
          </List>
        )}
      </div>
    </div>
  );
}

function QuickAction({ icon, label, sub, onClick }) {
  return (
    <button onClick={onClick} style={{ textAlign: "left", border: "1px solid transparent", background: "var(--surface)", borderRadius: "var(--r-panel)", padding: 16, cursor: "pointer", boxShadow: "var(--sh-1)", fontFamily: "var(--font)" }}>
      <div style={{ width: 42, height: 42, borderRadius: 12, background: "var(--brand-100)", color: "var(--brand-700)", display: "grid", placeItems: "center" }}><Icon name={icon} size={23} /></div>
      <div style={{ fontSize: "var(--t-body)", fontWeight: 700, marginTop: 12 }}>{label}</div>
      <div style={{ fontSize: "var(--t-caption)", color: "var(--ink-3)", marginTop: 1 }}>{sub}</div>
    </button>
  );
}

// ---------------- Register hub (sheet) ----------------
function RegisterHub({ open, onClose, nav, layout = "Lista" }) {
  const go = (s) => { onClose(); setTimeout(() => nav.push(s), 120); };
  return (
    <Sheet open={open} onClose={onClose} title="What would you like to register?" sub="Choose what to add">
      {layout === "Kort" ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, paddingBottom: 4 }}>
          {[
            { id: "absence", icon: "calendar", title: "Absence", sub: "Sick, child sick care, annual leave" },
            { id: "expense", icon: "receipt", title: "Expense", sub: "With or without receipt" },
          ].map(o => (
            <button key={o.id} onClick={() => go(o.id)} style={{ textAlign: "left", border: "1px solid transparent", background: "var(--surface)", borderRadius: "var(--r-panel)", boxShadow: "0 10px 28px -12px rgba(18,33,33,0.18), 0 2px 8px -3px rgba(18,33,33,0.07)", padding: 18, cursor: "pointer", fontFamily: "var(--font)", display: "flex", flexDirection: "column", gap: 10, minHeight: 132 }}>
              <span style={{ width: 46, height: 46, borderRadius: 13, background: "var(--green-soft)", color: "var(--green-deep)", display: "grid", placeItems: "center" }}><Icon name={o.icon} size={24} /></span>
              <span style={{ marginTop: "auto" }}>
                <span style={{ display: "block", fontSize: "var(--t-title)", fontWeight: 700 }}>{o.title}</span>
                <span style={{ display: "block", fontSize: "var(--t-caption)", color: "var(--ink-3)", marginTop: 2 }}>{o.sub}</span>
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="ds-actionsheet">
          {[
            { id: "absence", icon: "calendar", title: "Absence", sub: "Sick leave, child sick care, annual leave, parental leave" },
            { id: "expense", icon: "receipt", title: "Expense", sub: "Add an expense, with or without receipt" },
          ].map(o => (
            <button key={o.id} className="ds-actionsheet__item" onClick={() => go(o.id)} style={{ background: "var(--surface)", border: "1px solid transparent", borderRadius: "var(--r-panel)", boxShadow: "0 10px 28px -12px rgba(18,33,33,0.18), 0 2px 8px -3px rgba(18,33,33,0.07)", padding: "14px" }}>
              <span style={{ width: 40, height: 40, borderRadius: 12, background: "#053F22", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={o.icon} stroke="#fff" size={22} />
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0, flex: 1 }}>
                <span style={{ fontWeight: 600 }}>{o.title}</span>
                <span style={{ fontSize: "var(--t-caption)", color: "var(--ink-3)", fontWeight: 400 }}>{o.sub}</span>
              </span>
              <span style={{ color: "var(--ink-4)", display: "inline-flex", flexShrink: 0 }}><Icon name="chevR" size={20} /></span>
            </button>
          ))}
        </div>
      )}
    </Sheet>
  );
}

// ---------------- Tweaks ----------------
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "scenario": "Standard",
  "brand": "#203B3C",
  "corners": "Soft",
  "regLayout": "List"
}/*EDITMODE-END*/;

const CORNER_SCALE = { "Sharp": 0.6, "Soft": 1, "Rounded": 1.5 };
function applyTweaks(t) {
  const r = document.documentElement.style;
  const b = t.brand;
  r.setProperty("--brand-600", b);
  r.setProperty("--brand-700", b);
  r.setProperty("--brand-900", `color-mix(in srgb, ${b}, black 28%)`);
  r.setProperty("--brand-500", `color-mix(in srgb, ${b}, white 14%)`);
  const s = CORNER_SCALE[t.corners] || 1;
  r.setProperty("--r-md", `${Math.round(12 * s)}px`);
  r.setProperty("--r-lg", `${Math.round(16 * s)}px`);
  r.setProperty("--r-xl", `${Math.round(20 * s)}px`);
}

// ---------------- Root App ----------------
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffectA(() => { applyTweaks(t); }, [t]);
  const [authed, setAuthed] = useStateA(false);
  const [tab, setTab] = useStateA("home");
  const [stack, setStack] = useStateA([]); // [{key, params}]
  const [dir, setDir] = useStateA("r");
  const [hubOpen, setHubOpen] = useStateA(false);
  const [scrolled, setScrolled] = useStateA(false);
  const firstRef = useRefA(true);
  useEffectA(() => { firstRef.current = false; }, []);

  // active scenario (from Tweaks)
  const scenario = SCENARIOS[t.scenario] || SCENARIOS["Standard"];
  const upcoming = scenario.upcoming;

  // mutable app store — re-seeded whenever the scenario changes
  const [todos, setTodos] = useStateA(() => scenario.todos.map(x => ({ ...x })));
  const [activity, setActivity] = useStateA(() => scenario.activity.map(a => ({ ...a })));
  const [flash, setFlash] = useStateA(null);
  const [notifRead, setNotifRead] = useStateA([]);
  const [language, setLanguage] = useStateA("English");
  const [bankAccounts, setBankAccounts] = useStateA(() => BANK_ACCOUNTS.map(b => ({ ...b })));

  // active company context (employee vs. manager experience)
  const [companyCtx, setCompanyCtx] = useStateA("nordvik");
  const activeCompany = COMPANIES.find(c => c.id === companyCtx) || COMPANIES[0];
  const isManager = activeCompany.kind === "manager";
  // unread notifications = employee items, plus the 2 approval items when in manager context
  const unreadIds = isManager ? NOTIF_UNREAD_IDS.concat(["n-appr-abs", "n-appr-exp"]) : NOTIF_UNREAD_IDS;
  const anyUnread = unreadIds.some(id => !notifRead.includes(id));
  const notifCount = unreadIds.filter(id => !notifRead.includes(id)).length;
  const [approvals, setApprovals] = useStateA(() => ({
    absence: APPROVALS.absence.map(x => ({ ...x })),
    expense: APPROVALS.expense.map(x => ({ ...x })),
  }));
  const [processed, setProcessed] = useStateA([]);
  const approvalCount = approvals.absence.length + approvals.expense.length;

  // transient snackbar (string or { text, action, onAction })
  const showFlash = (arg) => setFlash(typeof arg === "string" ? { id: Date.now(), text: arg } : { id: Date.now(), ...arg });
  useEffectA(() => {
    if (!flash) return;
    const tmr = setTimeout(() => setFlash(null), flash.action ? 5000 : 3000);
    return () => clearTimeout(tmr);
  }, [flash && flash.id]);
  useEffectA(() => {
    if (window.I18N) window.I18N.setLang(language === "Swedish" ? "sv" : "en");
  }, [language, authed, tab, stack.length]);
  useEffectA(() => {
    setTodos(scenario.todos.map(x => ({ ...x })));
    setActivity(scenario.activity.map(a => ({ ...a })));
    setNotifRead([]);
    setStack([]);
  }, [t.scenario]);

  const nav = {
    tab,
    stackLen: stack.length,
    push: (key, params = {}) => { setDir("r"); setStack(s => [...s, { key, params }]); },
    pop: () => { setDir("l"); setStack(s => s.slice(0, -1)); },
    reset: () => setStack([]),
    go: (t) => { setStack([]); setTab(t); },
  };

  // approve / reject a single request, with Undo
  const actOnRequest = (kind, id, verb, reason) => {
    const list = approvals[kind];
    const idx = list.findIndex(x => x.id === id);
    if (idx < 0) return;
    const removed = list[idx];
    setApprovals(a => ({ ...a, [kind]: a[kind].filter(x => x.id !== id) }));
    const entry = { ...removed, _kind: kind, _action: verb, _at: Date.now(), _reason: reason || null };
    setProcessed(p => [entry, ...p.filter(x => x.id !== removed.id)]);
    showFlash({
      text: `${removed.name} · ${verb === "approve" ? "Approved" : "Rejected"}`,
      tone: verb === "approve" ? "ok" : "danger",
      action: "Undo",
      onAction: () => {
        setApprovals(a => {
          if (a[kind].some(x => x.id === removed.id)) return a;
          const next = a[kind].slice();
          next.splice(Math.min(idx, next.length), 0, removed);
          return { ...a, [kind]: next };
        });
        setProcessed(p => p.filter(x => x.id !== removed.id));
        setFlash(null);
      },
    });
  };

  const store = {
    todos, activity, flash, ME, PERIOD, upcoming, bankAccounts,
    companies: COMPANIES, companyCtx, activeCompany, isManager, approvals, approvalCount, processed, team: TEAM,
    setCompany: (id) => {
      const c = COMPANIES.find(x => x.id === id);
      if (!c || !c.active || c.id === companyCtx) return;
      setCompanyCtx(id);
      setHubOpen(false);
    },
    approveRequest: (kind, id) => actOnRequest(kind, id, "approve"),
    rejectRequest: (kind, id, reason) => actOnRequest(kind, id, "reject", reason),
    approveAll: (kind) => {
      const removed = approvals[kind];
      if (!removed.length) return;
      setApprovals(a => ({ ...a, [kind]: [] }));
      const at = Date.now();
      const entries = removed.map(x => ({ ...x, _kind: kind, _action: "approve", _at: at, _reason: null }));
      setProcessed(p => [...entries, ...p.filter(pp => !entries.some(e => e.id === pp.id))]);
      showFlash({
        text: `${removed.length} ${kind === "absence" ? "absence requests" : "expenses"} approved`,
        tone: "ok",
        action: "Undo",
        onAction: () => { setApprovals(a => ({ ...a, [kind]: removed })); setProcessed(p => p.filter(pp => !entries.some(e => e.id === pp.id))); setFlash(null); },
      });
    },
    approveEverything: () => {
      const removed = { absence: approvals.absence, expense: approvals.expense };
      const all = [...removed.absence.map(x => ({ kind: "absence", x })), ...removed.expense.map(x => ({ kind: "expense", x }))];
      const n = all.length;
      if (!n) return;
      setApprovals({ absence: [], expense: [] });
      const at = Date.now();
      const entries = all.map(({ kind, x }) => ({ ...x, _kind: kind, _action: "approve", _at: at, _reason: null }));
      setProcessed(p => [...entries, ...p.filter(pp => !entries.some(e => e.id === pp.id))]);
      showFlash({
        text: `${n} request${n === 1 ? "" : "s"} approved`,
        tone: "ok",
        action: "Undo",
        onAction: () => { setApprovals(removed); setProcessed(p => p.filter(pp => !entries.some(e => e.id === pp.id))); setFlash(null); },
      });
    },
    resolveTodo: (id, patch) => setTodos(ts => ts.map(t => t.id === id ? { ...t, status: "pending", ...patch } : t)),
    addActivity: (item) => setActivity(a => [item, ...a]),
    removeTodo: (id) => setTodos(ts => ts.filter(t => t.id !== id)),
    removeActivity: (id) => setActivity(a => a.filter(x => x.id !== id)),
    setPrimaryBank: (id) => setBankAccounts(list => list.map(b => ({ ...b, primary: b.id === id }))),
    removeBank: (id) => setBankAccounts(list => list.filter(b => b.id !== id)),
    setFlash: showFlash,
    language, setLanguage,
    logout: () => { setStack([]); setTab("home"); setAuthed(false); },
  };

  // current screen
  const top = stack[stack.length - 1];
  const screenKey = top ? top.key : tab;
  const params = top ? top.params : {};
  useEffectA(() => { setScrolled(false); }, [screenKey]);

  const TAB_TITLES = { home: "Home", me: "Me", employees: "Employees", history: "History", payslips: "Pay", profile: "Profile", notifications: "Notifications", approvals: "Approvals", calendar: "Calendar", companies: "My companies" };
  const isRoot = !top;

  function renderScreen() {
    const props = { nav, store, params, scrolled };
    switch (screenKey) {
      case "home": return <HomeScreen {...props} />;
      case "me": return <MeScreen {...props} />;
      case "employees": return <EmployeesScreen {...props} />;
      case "payslips": return <PayslipsScreen {...props} />;
      case "payslip": return <PayslipDetail {...props} />;
      case "paycheck": return <PayslipCheck {...props} />;
      case "upcoming": return <UpcomingScreen {...props} />;
      case "history": return <HistoryScreen {...props} />;
      case "profile": return <ProfileScreen {...props} />;
      case "absence": return <AbsenceFlow {...props} />;
      case "expense": return <ExpenseFlow {...props} />;
      case "complete": return <CompleteFlow {...props} />;
      case "status": return <StatusDetail {...props} />;
      case "companies": return <CompaniesScreen {...props} />;
      case "approvals": return <ApprovalsScreen {...props} />;
      case "approveDetail": return <ApproveDetailScreen {...props} />;
      case "team": return <TeamScreen {...props} />;
      case "employeeDetail": return <EmployeeDetailScreen {...props} />;
      case "balanceDetail": return <BalanceDetailScreen {...props} />;
      case "employment": return <EmploymentDetailsScreen {...props} />;
      case "calendar": return <CalendarScreen {...props} />;
      case "regDetail": return <RegDetailScreen {...props} />;
      case "bankAccounts": return <BankAccountsScreen {...props} />;
      default: return <HomeScreen {...props} />;
    }
  }

  // App bar config per screen
  const flowScreens = ["absence", "expense", "complete", "paycheck"]; // hide chrome, full-screen flows manage their own header
  const hideChrome = flowScreens.includes(screenKey);

  let bar = null;
  if (!hideChrome) {
    // Notifications now lives as a bell in the app bar (both contexts)
    const notifBell = (
      <button onClick={() => nav.push("notifications")} className="ds-appbar__action" aria-label="Notifications" style={{ position: "relative" }}>
        <Icon name="bell" />
        {notifCount > 0 && (
          <span style={{ position: "absolute", top: 4, right: 4, minWidth: 18, height: 18, padding: "0 5px", boxSizing: "border-box",
            borderRadius: 99, background: "var(--ink-3)", color: "#fff", fontSize: 11, fontWeight: 700, lineHeight: "18px", textAlign: "center" }}>{notifCount}</span>
        )}
      </button>
    );
    if (isRoot && tab === "home") {
      bar = <AppBar large title={`Good morning, ${ME.name.split(" ")[0]}`} subtitle={`${activeCompany.name} · ${isManager ? "Approver" : "Employee"}`} right={notifBell} scrolled={scrolled} noDivider />;
    } else if (isRoot && tab === "notifications") {
      bar = <AppBar large title={TAB_TITLES[tab]} scrolled={scrolled} />;
    } else if (isRoot) {
      bar = <AppBar large title={TAB_TITLES[tab]} right={notifBell} scrolled={scrolled} />;
    } else {
      const titles = { payslip: "Pay slip", paycheck: "Is your pay correct?", upcoming: "Upcoming pay", status: "Details", regDetail: "Details", notifications: "Notifications", companies: "My companies", bankAccounts: "Bank accounts", calendar: "Calendar", payslips: "Pay", approvals: "Approvals", approveDetail: "Approve", team: "Team", employeeDetail: "Employee", employment: "My employment details" };
      let barTitle = titles[screenKey] || "";
      if (screenKey === "employeeDetail") {
        const m = (store.team || []).find(x => x.id === params.id);
        if (m) barTitle = m.name;
      }
      if (screenKey === "balanceDetail") {
        barTitle = { sem: "Annual leave", vab: "Child sick care", sick: "Sick leave" }[params.balanceId] || "Balance";
      }
      bar = <AppBar title={barTitle} onBack={() => nav.pop()} scrolled={scrolled} />;
    }
  }

  // Gate the whole app behind sign-in
  if (!authed) {
    return (
      <React.Fragment>
        <LoginScreen onLogin={() => setAuthed(true)} />
        <TweaksPanel>
          <TweakSection label="Brand" />
          <TweakColor label="Brand colour" value={t.brand}
            options={["#203B3C", "#183E24", "#395F61", "#053F22"]}
            onChange={(v) => setTweak("brand", v)} />
          <TweakSection label="Shape" />
          <TweakRadio label="Corners" value={t.corners} options={["Sharp", "Soft", "Rounded"]}
            onChange={(v) => setTweak("corners", v)} />
        </TweaksPanel>
      </React.Fragment>
    );
  }

  return (
    <div className="k-app" style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", background: "radial-gradient(130% 55% at 82% 0%, rgba(141,211,190,0.38) 0%, rgba(141,211,190,0) 58%), radial-gradient(120% 50% at 0% 12%, rgba(141,211,190,0.20) 0%, rgba(141,211,190,0) 50%), linear-gradient(180deg, #CFEAE2 0%, #E1F3EE 30%, #F1F8F6 66%, #FFFFFF 100%)" }}>
      {bar}
      <div key={screenKey + JSON.stringify(params)} className="k-scroll" onScroll={(e) => { const s = e.currentTarget.scrollTop > 4; setScrolled(v => (v === s ? v : s)); }} style={{ flex: 1, overflowY: "auto", overflowX: "hidden", background: "transparent" }}>
        {screenKey === "notifications" ? <NotificationsScreen nav={nav} store={store} notifRead={notifRead} onItemRead={(id) => setNotifRead(r => r.includes(id) ? r : [...r, id])} onMarkAll={() => setNotifRead(unreadIds)} /> : renderScreen()}
      </div>
      <BottomNav tab={isRoot ? tab : null} onTab={(t) => nav.go(t)} onRegister={() => setHubOpen(o => !o)} hubOpen={hubOpen} notifUnread={anyUnread} notifCount={notifCount} todoCount={todos.length + (isManager ? approvalCount : 0)} isManager={isManager} approvalCount={approvalCount} />
      <Flash flash={flash} onClose={() => setFlash(null)} />
      <RegisterHub open={hubOpen} onClose={() => setHubOpen(false)} nav={nav} layout={t.regLayout} />
      <TweaksPanel>
        <TweakSection label="Scenario" />
        <TweakRadio label="View mode" value={t.scenario} options={["Standard", "Sick 2 days"]}
          onChange={(v) => setTweak("scenario", v)} />
        <TweakSection label="Brand" />
        <TweakColor label="Brand colour" value={t.brand}
          options={["#203B3C", "#183E24", "#395F61", "#053F22"]}
          onChange={(v) => setTweak("brand", v)} />
        <TweakSection label="Shape" />
        <TweakRadio label="Corners" value={t.corners} options={["Sharp", "Soft", "Rounded"]}
          onChange={(v) => setTweak("corners", v)} />
        <TweakRadio label="Register menu" value={t.regLayout} options={["List", "Cards"]}
          onChange={(v) => setTweak("regLayout", v)} />
      </TweaksPanel>
    </div>
  );
}

Object.assign(window, { App, AppBar, BottomNav, STATUS_META, QuickAction });
