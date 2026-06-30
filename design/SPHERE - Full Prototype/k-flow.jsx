// ============================================================
// k-flow.jsx — shared scaffolding for multi-step flows
// FlowShell, Calendar, ImpactCard, Attachment, OptionCard, Success, InfoNote
// ============================================================
const { useState: useStateF } = React;

// ---------- Full-screen flow shell ----------
function FlowShell({ onClose, onBack, step, total, title, kicker, children, footer }) {
  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", background: "radial-gradient(130% 55% at 82% 0%, rgba(141,211,190,0.38) 0%, rgba(141,211,190,0) 58%), radial-gradient(120% 50% at 0% 12%, rgba(141,211,190,0.20) 0%, rgba(141,211,190,0) 50%), linear-gradient(180deg, #CFEAE2 0%, #E1F3EE 30%, #F1F8F6 66%, #FFFFFF 100%)" }}>
      <div className="ds-appbar" style={{ flexShrink: 0, paddingTop: 50, zIndex: 5 }}>
        <div className="ds-appbar__bar">
          <button className="ds-appbar__action" onClick={onBack || onClose}>
            <Icon name={onBack ? "chevL" : "close"} />
          </button>
          {typeof step === "number" ? (
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}><Steps total={total} current={step} /></div>
          ) : <div className="ds-appbar__title">{title}</div>}
          <div style={{ width: 48, flexShrink: 0 }} />
        </div>
      </div>
      <div style={{ flex: 1, padding: "20px 20px 16px" }}>
        {kicker && <div className="ds-eyebrow" style={{ marginBottom: 8 }}>{kicker}</div>}
        {title && typeof step === "number" && <h1 className="ds-h1" style={{ margin: "0 0 18px" }}>{title}</h1>}
        {children}
      </div>
      {footer && <div className="ds-cta-bar" style={{ paddingBottom: 24, background: "transparent", borderTop: "none", boxShadow: "none" }}>{footer}</div>}
    </div>
  );
}

// ---------- Option card (radio) ----------
function OptionCard({ icon, title, desc, selected, onClick, badge, badgeTone }) {
  return (
    <button onClick={onClick} style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 14, padding: 15, fontFamily: "var(--font)", cursor: "pointer",
      background: "var(--surface)", borderRadius: "var(--r-panel)",
      border: selected ? "2px solid var(--signature)" : "1px solid transparent",
      boxShadow: selected ? "0 0 0 3px rgba(32,59,60,0.12), var(--sh-1)" : "var(--sh-1)",
      transition: "border-color var(--gaia-transition-state), box-shadow var(--gaia-transition-state)" }}>
      {icon && <div style={{ width: 44, height: 44, borderRadius: 12, background: selected ? "var(--signature)" : "var(--green-soft)", color: selected ? "#fff" : "var(--green-deep)", display: "grid", placeItems: "center", flexShrink: 0, transition: "all .15s ease" }}><Icon name={icon} size={23} /></div>}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "var(--t-title)", fontWeight: 600, lineHeight: 1.25, color: "var(--ink)" }}>
          {title}
          {badge && <Badge tone={badgeTone || "neutral"} style={{ marginLeft: 8, verticalAlign: "middle" }}>{badge}</Badge>}
        </div>
        {desc && <div style={{ fontSize: "var(--t-body-sm)", color: "var(--ink-3)", marginTop: 2 }}>{desc}</div>}
      </div>
      <div style={{ width: 24, height: 24, borderRadius: 99, flexShrink: 0, border: selected ? "none" : "2px solid var(--ink-3)", background: selected ? "var(--signature)" : "transparent", display: "grid", placeItems: "center" }}>
        {selected && <Icon name="check" size={15} stroke="#fff" sw={3} />}
      </div>
    </button>
  );
}

// ---------- Info note (ds-banner) — static DS banner, shown by default ----------
function InfoNote({ tone = "info", icon = "info", title, children, collapsible = false, defaultOpen = false }) {
  const [open, setOpen] = useStateF(defaultOpen);
  const mod = { info: "", warn: " ds-banner--warn", ok: " ds-banner--ok", danger: " ds-banner--danger" }[tone] || "";
  if (!collapsible) {
    return (
      <div className={"ds-banner" + mod}>
        <span className="ds-banner__icon"><Icon name={icon} /></span>
        <div className="ds-banner__body">
          {title && <div className="ds-banner__title">{title}</div>}
          <div className="ds-banner__text" style={{ fontSize: "var(--t-body-sm)" }}>{children}</div>
        </div>
      </div>
    );
  }
  return (
    <div className={"ds-banner" + mod} style={{ display: "block" }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 11, border: "none", background: "transparent", cursor: "pointer", fontFamily: "var(--font)", textAlign: "left", padding: 0 }}>
        <span className="ds-banner__icon" style={{ marginTop: 0 }}><Icon name={icon} /></span>
        <span className="ds-banner__title" style={{ flex: 1, margin: 0 }}>{title || "Good to know"}</span>
        <Icon name="chevD" size={18} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s var(--ease)", opacity: 0.7 }} />
      </button>
      {open && <div className="ds-banner__text" style={{ fontSize: "var(--t-body-sm)", marginTop: 8, paddingLeft: 31 }}>{children}</div>}
    </div>
  );
}

// ---------- Calendar (single month, range or single) ----------
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DOW = ["Mo","Tu","We","Th","Fr","Sa","Su"];
function Calendar({ year = 2026, month = 5, range = false, value, onChange }) {
  // value: single -> {d} ; range -> {start, end}
  const first = new Date(year, month, 1);
  const startDow = (first.getDay() + 6) % 7; // mon=0
  const days = new Date(year, month + 1, 0).getDate();
  const today = 8;

  function pick(d) {
    if (!range) { onChange({ start: d, end: d }); return; }
    const v = value || {};
    if (v.start == null || (v.start != null && v.end != null)) { onChange({ start: d, end: null }); }
    else if (d < v.start) { onChange({ start: d, end: v.start }); }
    else { onChange({ start: v.start, end: d }); }
  }
  const v = value || {};
  const inRange = (d) => v.start != null && v.end != null && d > v.start && d < v.end;
  const isEnd = (d) => d === v.start || d === v.end;

  return (
    <div style={{ background: "var(--surface)", borderRadius: "var(--r-panel)", padding: 16, border: "1px solid transparent", boxShadow: "var(--sh-1)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontWeight: 700, fontSize: "var(--t-body)", textTransform: "capitalize" }}>{MONTHS[month]} {year}</span>
        <div style={{ display: "flex", gap: 4, color: "var(--ink-3)" }}>
          <Icon name="chevL" size={18} /><Icon name="chevR" size={18} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, textAlign: "center" }}>
        {DOW.map(d => <div key={d} style={{ fontSize: "var(--t-micro)", color: "var(--ink-3)", fontWeight: 600, padding: "2px 0 6px" }}>{d}</div>)}
        {Array.from({ length: startDow }).map((_, i) => <div key={"e" + i} />)}
        {Array.from({ length: days }).map((_, i) => {
          const d = i + 1;
          const sel = isEnd(d), mid = inRange(d);
          return (
            <button key={d} onClick={() => pick(d)} style={{ position: "relative", border: "none", cursor: "pointer", padding: 0, height: 38, fontFamily: "var(--font)", fontSize: "var(--t-body-sm)",
              background: mid ? "var(--brand-100)" : "transparent",
              borderRadius: mid ? 0 : 99,
              color: sel ? "#fff" : "var(--ink)", fontWeight: sel || d === today ? 700 : 500 }}>
              <span style={{ position: "absolute", inset: 3, borderRadius: 99, display: "grid", placeItems: "center",
                background: sel ? "var(--brand-600)" : "transparent",
                border: d === today && !sel && !mid ? "1.5px solid var(--brand-500)" : "none" }}>{d}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function fmtRange(year, month, v) {
  if (!v || v.start == null) return "Select date";
  const s = `${v.start} ${MONTHS[month].slice(0,3)}`;
  if (v.end == null || v.end === v.start) return s;
  return `${v.start}–${v.end} ${MONTHS[month].slice(0,3)}`;
}
function rangeDays(v) { if (!v || v.start == null) return 0; if (v.end == null) return 1; return v.end - v.start + 1; }

// ---------- Impact card (Kollar påverkan på kommande lön) ----------
function ImpactCard({ amount, lines, payday = PERIOD.payday }) {
  return (
    <div style={{ background: "var(--surface)", borderRadius: "var(--r-panel)", border: "1px solid transparent", boxShadow: "var(--sh-1)", overflow: "hidden" }}>
      <div style={{ padding: "14px 16px", background: "var(--brand-50)", borderBottom: "1px solid var(--line-2)", display: "flex", alignItems: "center", gap: 10 }}>
        <Icon name="wallet" size={20} stroke="var(--brand-700)" />
        <span style={{ fontWeight: 700, fontSize: "var(--t-body-sm)", color: "var(--brand-900)" }}>How your upcoming pay is affected</span>
      </div>
      <div style={{ padding: 16 }}>
        {lines.map((l, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, padding: "7px 0", borderBottom: i < lines.length - 1 ? "1px solid var(--line-2)" : "none" }}>
            <span style={{ fontSize: "var(--t-body-sm)", color: "var(--ink-2)", flex: 1, minWidth: 0 }}>{l.label}</span>
            <span className="tnum" style={{ fontSize: "var(--t-body-sm)", fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0, color: l.amount < 0 ? "var(--danger)" : l.amount > 0 ? "var(--ok)" : "var(--ink)" }}>{l.amount === 0 ? l.note || "0 kr" : kr(l.amount, { plus: l.amount > 0 })}</span>
          </div>
        ))}
        {amount !== undefined && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, marginTop: 12, paddingTop: 12, borderTop: "2px solid var(--line)" }}>
            <span style={{ fontSize: "var(--t-body-sm)", fontWeight: 700, flex: 1, minWidth: 0 }}>Estimated change</span>
            <span className="tnum" style={{ fontSize: "var(--t-h3)", fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0, color: amount < 0 ? "var(--danger)" : "var(--ok)" }}>{kr(amount, { plus: amount > 0 })}</span>
          </div>
        )}
      </div>
      <div style={{ padding: "10px 16px", background: "var(--surface-2)", fontSize: "var(--t-caption)", color: "var(--ink-3)", borderTop: "1px solid var(--line-2)" }}>
        Affects the pay paid on {payday}. Amounts are preliminary until pay is finalised.
      </div>
    </div>
  );
}

// ---------- Attachment picker ----------
function Attachment({ label = "Attach receipt", hint, value, onChange, optional }) {
  const [pickOpen, setPickOpen] = React.useState(false);
  const isCert = label.includes("certificate");
  const last4 = () => Date.now().toString().slice(-4);
  const choose = (source) => {
    setPickOpen(false);
    if (source === "camera") onChange(isCert ? "Photo_certificate.jpg" : "Photo_" + last4() + ".jpg");
    else onChange(isCert ? "Medical_certificate.pdf" : "Kvitto_" + last4() + ".jpg");
  };
  if (value) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 13, background: "var(--surface)", border: "1.5px solid var(--ok)", borderRadius: "var(--r-md)" }}>
        <div style={{ width: 40, height: 48, borderRadius: 8, background: "var(--ok-bg)", color: "var(--ok)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="doc" size={22} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "var(--t-body-sm)", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</div>
          <div style={{ fontSize: "var(--t-caption)", color: "var(--ok)", display: "flex", alignItems: "center", gap: 4, marginTop: 1 }}><Icon name="check" size={13} sw={2.5} /> Uploaded</div>
        </div>
        <button onClick={() => onChange(null)} style={{ border: "none", background: "var(--line-2)", width: 30, height: 30, borderRadius: 99, display: "grid", placeItems: "center", cursor: "pointer", color: "var(--ink-2)" }}><Icon name="close" size={16} /></button>
      </div>
    );
  }
  return (
    <>
      <button onClick={() => setPickOpen(true)} style={{ width: "100%", fontFamily: "var(--font)", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, padding: 15,
        background: "var(--surface)", border: "1.5px dashed var(--line)", borderRadius: "var(--r-md)", textAlign: "left" }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--brand-100)", color: "var(--brand-700)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="camera" size={22} /></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "var(--t-body-sm)", fontWeight: 700 }}>{label}{optional && <span style={{ color: "var(--ink-3)", fontWeight: 500 }}> · optional</span>}</div>
          {hint && <div style={{ fontSize: "var(--t-caption)", color: "var(--ink-3)", marginTop: 1 }}>{hint}</div>}
        </div>
        <Icon name="plus" size={20} stroke="var(--brand-600)" />
      </button>
      <Sheet open={pickOpen} onClose={() => setPickOpen(false)} title="Add attachment" sub="Take a photo or upload a file">
        <div style={{ padding: "4px 0 8px", display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { src: "camera", icon: "camera", title: "Take photo", desc: "Use your camera to take a picture" },
            { src: "file", icon: "upload", title: "Choose a file", desc: isCert ? "Upload a PDF or image" : "Upload a photo or PDF" },
          ].map((o) => (
            <button key={o.src} onClick={() => choose(o.src)}
              style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", textAlign: "left", padding: "14px 14px",
                fontFamily: "var(--font)", cursor: "pointer", borderRadius: "var(--r-panel)",
                background: "var(--surface-1)", border: "1px solid var(--line-2)" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, display: "grid", placeItems: "center", background: "#053F22", color: "#fff" }}><Icon name={o.icon} size={22} stroke="#fff" /></div>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "block", fontSize: "var(--t-title)", fontWeight: 700 }}>{o.title}</span>
                <span style={{ display: "block", fontSize: "var(--t-body-sm)", color: "var(--ink-3)", marginTop: 1 }}>{o.desc}</span>
              </span>
              <Icon name="chevR" size={20} stroke="var(--ink-4)" />
            </button>
          ))}
        </div>
      </Sheet>
    </>
  );
}

// ---------- Success screen ----------
function Success({ title, lines, status = "pending", onPrimary, primaryLabel = "Done", onSecondary, secondaryLabel }) {
  const isApproved = status === "approved";
  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", background: "radial-gradient(130% 55% at 82% 0%, rgba(141,211,190,0.38) 0%, rgba(141,211,190,0) 58%), radial-gradient(120% 50% at 0% 12%, rgba(141,211,190,0.20) 0%, rgba(141,211,190,0) 50%), linear-gradient(180deg, #CFEAE2 0%, #E1F3EE 30%, #F1F8F6 66%, #FFFFFF 100%)" }}>
      <div style={{ flex: 1, padding: "0 24px", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", minHeight: 520 }}>
        <div className="pop-in" style={{ width: 84, height: 84, borderRadius: 99, margin: "0 auto 22px", display: "grid", placeItems: "center",
          background: isApproved ? "var(--ok-bg)" : "var(--brand-100)", color: isApproved ? "var(--ok)" : "var(--brand-600)" }}>
          <Icon name={isApproved ? "checkCirc" : "check"} size={46} sw={2.2} />
        </div>
        <div className="fade-up" style={{ fontSize: "var(--t-h1)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.15 }}>{title}</div>
        <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 22, textAlign: "left", width: "100%" }}>
          {lines.map((l, i) => (
            <div key={i} style={{ display: "flex", gap: 11, alignItems: "flex-start", width: "100%" }}>
              <Icon name={l.icon || "checkCirc"} size={20} stroke={l.tone === "warn" ? "color-mix(in oklch,var(--warn),black 15%)" : "var(--brand-600)"} style={{ flexShrink: 0, marginTop: 1 }} />
              <span style={{ flex: 1, minWidth: 0, fontSize: "var(--t-body-sm)", color: "var(--ink-2)", lineHeight: 1.45 }}>{l.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flexShrink: 0, position: "sticky", bottom: 0, padding: "12px 20px 24px", display: "flex", flexDirection: "column", gap: 10, background: "transparent" }}>
        <Button full size="lg" onClick={onPrimary}>{primaryLabel}</Button>
        {onSecondary && <Button variant="secondary" full onClick={onSecondary}>{secondaryLabel}</Button>}
      </div>
    </div>
  );
}

Object.assign(window, { FlowShell, OptionCard, InfoNote, Calendar, fmtRange, rangeDays, ImpactCard, Attachment, Success, MONTHS });
