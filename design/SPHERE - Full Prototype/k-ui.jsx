// ============================================================
// k-ui.jsx — shared primitives & icons for the Kontek prototype
// Exports to window. Loaded before app screens.
// ============================================================
const { useState, useEffect, useRef } = React;

// ---------- Icons (simple stroke set) ----------
function Icon({ name, size = 24, stroke = "currentColor", sw = 1.7, style }) {
  const p = { fill: "none", stroke, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    home:      <><path d="M3 10.5 12 3l9 7.5" {...p} /><path d="M5 9.5V20h14V9.5" {...p} /><path d="M9.5 20v-6h5v6" {...p} /></>,
    payslip:   <><rect x="5" y="3" width="14" height="18" rx="2.5" {...p} /><path d="M8.5 8h7M8.5 12h7M8.5 16h4" {...p} /></>,
    plus:      <><path d="M12 5v14M5 12h14" {...p} /></>,
    minus:     <><path d="M5 12h14" {...p} /></>,
    calendar:  <><rect x="4" y="5" width="16" height="16" rx="2.5" {...p} /><path d="M4 9.5h16M8 3v4M16 3v4" {...p} /></>,
    receipt:   <><path d="M6 3h12v18l-2.5-1.5L13 21l-2.5-1.5L8 21l-2-1.2V3z" {...p} /><path d="M9 8h6M9 12h6" {...p} /></>,
    user:      <><circle cx="12" cy="8" r="3.5" {...p} /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" {...p} /></>,
    bell:      <><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" {...p} /><path d="M10 20a2 2 0 0 0 4 0" {...p} /></>,
    chevR:     <><path d="M9 5l7 7-7 7" {...p} /></>,
    chevL:     <><path d="M15 5l-7 7 7 7" {...p} /></>,
    chevD:     <><path d="M5 9l7 7 7-7" {...p} /></>,
    close:     <><path d="M6 6l12 12M18 6L6 18" {...p} /></>,
    check:     <><path d="M5 12.5l4.5 4.5L19 6.5" {...p} /></>,
    checkCirc: <><circle cx="12" cy="12" r="9" {...p} /><path d="M8.5 12.2l2.4 2.4 4.6-5" {...p} /></>,
    info:      <><circle cx="12" cy="12" r="9" {...p} /><path d="M12 11v5M12 8h.01" {...p} /></>,
    warn:      <><path d="M12 4l9 16H3l9-16Z" {...p} /><path d="M12 10v4M12 17h.01" {...p} /></>,
    clock:     <><circle cx="12" cy="12" r="9" {...p} /><path d="M12 7.5V12l3 2" {...p} /></>,
    upload:    <><path d="M12 16V5m0 0L8 9m4-4 4 4" {...p} /><path d="M5 18.5h14" {...p} /></>,
    camera:    <><path d="M4 8.5A2 2 0 0 1 6 6.5h2l1.2-2h5.6L16 6.5h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9Z" {...p} /><circle cx="12" cy="13" r="3.2" {...p} /></>,
    doc:       <><path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" {...p} /><path d="M14 3v4h4" {...p} /></>,
    arrowDown: <><path d="M12 5v14M6 13l6 6 6-6" {...p} /></>,
    sun:       <><circle cx="12" cy="12" r="4" {...p} /><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5" {...p} /></>,
    heart:     <><path d="M12 20s-7-4.5-9.2-9C1.3 8 2.8 5 6 5c2 0 3.2 1.3 4 2.5C10.8 6.3 12 5 14 5c3.2 0 4.7 3 3.2 6-2.2 4.5-5.2 9-5.2 9Z" {...p} /></>,
    child:     <><circle cx="12" cy="6" r="2.5" {...p} /><path d="M12 8.5V15M8 11l4-1 4 1M9.5 20l2.5-5 2.5 5" {...p} /></>,
    plane:     <><path d="M21 15l-7-2V6.5a1.5 1.5 0 0 0-3 0V13l-7 2v2l7-1.5V19l-2 1.2V22l3.5-1 3.5 1v-1.8L14 19v-3.5L21 17z" {...p} /></>,
    wallet:    <><rect x="3" y="6" width="18" height="13" rx="2.5" {...p} /><path d="M3 10h18M16.5 14.5h.01" {...p} /></>,
    phone:     <><rect x="6.5" y="2.5" width="11" height="19" rx="2.5" {...p} /><path d="M10.5 18.5h3" {...p} /></>,
    help:      <><circle cx="12" cy="12" r="9" {...p} /><path d="M9.5 9.5a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3M12 16.5h.01" {...p} /></>,
    edit:      <><path d="M4 20h4L18.5 9.5a2 2 0 0 0-3-3L5 17v3z" {...p} /><path d="M14 7l3 3" {...p} /></>,
    trash:     <><path d="M4 7h16M9 7V4.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V7M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13M10 11v6M14 11v6" {...p} /></>,
    arrowR:    <><path d="M5 12h14M13 6l6 6-6 6" {...p} /></>,
    external:  <><path d="M14 4h6v6" {...p} /><path d="M20 4l-8.5 8.5" {...p} /><path d="M19 13.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5.5" {...p} /></>,
    building:  <><rect x="4" y="2" width="16" height="20" rx="2" {...p} /><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" {...p} /></>,
    logOut:    <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" {...p} /><path d="M16 17l5-5-5-5M21 12H9" {...p} /></>,
    approvals: <><rect x="5" y="4" width="14" height="17" rx="2.5" {...p} /><path d="M9 4.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 4.5V6H9V4.5Z" {...p} /><path d="M8.8 13l2.1 2.1L15.2 11" {...p} /></>,
    swap:      <><path d="M7 8h11M7 8l3-3M7 8l3 3" {...p} /><path d="M17 16H6M17 16l-3-3M17 16l-3 3" {...p} /></>,
    globe:     <><circle cx="12" cy="12" r="9" {...p} /><path d="M3 12h18M12 3c2.5 2.4 3.8 5.6 3.8 9S14.5 18.6 12 21c-2.5-2.4-3.8-5.6-3.8-9S9.5 5.4 12 3Z" {...p} /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} aria-hidden="true">
      {paths[name] || null}
    </svg>
  );
}

// ---------- money formatting ----------
function kr(n, opts = {}) {
  const s = new Intl.NumberFormat("sv-SE", { minimumFractionDigits: 0, maximumFractionDigits: 0, ...opts }).format(Math.abs(n));
  return (n < 0 ? "−" : opts.plus ? "+" : "") + s + " kr";
}

// ---------- Badge / status pill (token-built atom) ----------
function Badge({ tone = "info", children, dot = false, style }) {
  const map = {
    ok:     ["var(--ok)", "var(--ok-bg)"],
    warn:   ["var(--warn)", "var(--warn-bg)"],
    info:   ["var(--info)", "var(--info-bg)"],
    danger: ["var(--danger)", "var(--danger-bg)"],
    neutral:["var(--ink-3)", "var(--surface-2)"],
    brand:  ["var(--signature)", "var(--green-soft)"],
  };
  const [fg, bg] = map[tone] || map.info;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 10px", borderRadius: "var(--r-pill)", background: bg, color: fg,
      fontSize: "var(--t-micro)", fontWeight: 600, lineHeight: 1.3, letterSpacing: "0.01em",
      whiteSpace: "nowrap", ...style,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: 99, background: fg }} />}
      {children}
    </span>
  );
}

// ---------- Card (ds-mcard) ----------
function Card({ children, pad, style, onClick }) {
  return (
    <div className="ds-mcard" onClick={onClick} style={{
      cursor: onClick ? "pointer" : undefined,
      ...(pad !== undefined ? { padding: pad } : null), ...style,
    }}>{children}</div>
  );
}

// ---------- Inset list group (ds-list--inset) ----------
function List({ children, header, inset = true, style }) {
  return (
    <div>
      {header && <div className="ds-list__header" style={{ padding: "0 4px 10px" }}>{header}</div>}
      <ul className={"ds-list" + (inset ? " ds-list--inset" : "")} style={{ margin: 0, ...style }}>{children}</ul>
    </div>
  );
}

// ---------- Collapsible card — header sits INSIDE the card (DS pattern) ----------
function CollapsibleCard({ title, right, children, defaultOpen = true, open: openProp, onToggle }) {
  const [openS, setOpenS] = useState(defaultOpen);
  const open = openProp !== undefined ? openProp : openS;
  const toggle = onToggle || (() => setOpenS(o => !o));
  return (
    <div className="ds-mcard" style={{ padding: 0, overflow: "hidden" }}>
      <button onClick={toggle} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "var(--font)", textAlign: "left", borderBottom: open ? "1px solid var(--line-2)" : "none" }}>
        <span style={{ flex: 1, display: "inline-flex", alignItems: "center", gap: 8, whiteSpace: "nowrap", fontSize: "var(--t-caption)", fontWeight: 600, letterSpacing: "0.005em", textTransform: "none", color: "var(--ink-3)" }}>{title}{right}</span>
        <Icon name="chevD" size={18} stroke="var(--ink-3)" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s var(--ease)", flexShrink: 0 }} />
      </button>
      {open && children}
    </div>
  );
}

// ---------- Button (ds-btn) ----------
const BTN_VARIANT = {
  primary: "ds-btn--primary",
  dark: "ds-btn--primary",
  secondary: "ds-btn--secondary",
  outline: "ds-btn--secondary",
  ghost: "ds-btn--transparent",
  soft: "ds-btn--secondary",
  approve: "ds-btn--approve",
  danger: "ds-btn--danger",
  "secondary-cta": "ds-btn--secondary-cta",
};
function Button({ children, variant = "primary", size = "md", full, onClick, disabled, icon, style }) {
  const cls = ["ds-btn", BTN_VARIANT[variant] || "ds-btn--primary",
    size === "lg" && "ds-btn--lg", size === "sm" && "ds-btn--sm",
    full && "ds-btn--block"].filter(Boolean).join(" ");
  return (
    <button className={cls} onClick={disabled ? undefined : onClick} disabled={disabled} style={style}>
      {icon && <Icon name={icon} />}
      {children}
    </button>
  );
}

// ---------- Row (ds-row) ----------
function Row({ icon, iconClass = "", title, sub, right, onClick, last, full, dense, style }) {
  const Tag = onClick ? "button" : "li";
  return (
    <Tag className={"ds-row" + (full ? " ds-row--full" : "")} onClick={onClick} style={{ ...(dense ? { minHeight: 52 } : null), ...(sub ? { alignItems: "flex-start" } : null), ...style }}>
      {icon && (
        <span className={"ds-row__lead " + iconClass} style={{ ...(dense ? { width: 34, height: 34 } : null), alignSelf: "center" }}>
          {typeof icon === "string" ? <Icon name={icon} size={dense ? 18 : 21} /> : icon}
        </span>
      )}
      <span className="ds-row__body">
        <span className="ds-row__title" style={dense ? { fontSize: "var(--t-title)" } : undefined}>{title}</span>
        {sub && <span className="ds-row__sub" style={dense ? { fontSize: "var(--t-body)" } : undefined}>{sub}</span>}
      </span>
      {right !== undefined ? <span className="ds-row__trail" style={{ alignSelf: "center" }}>{right}</span>
        : (onClick && <span className="ds-row__chev" style={{ alignSelf: "center" }}><Icon name="chevR" /></span>)}
    </Tag>
  );
}

// ---------- Bottom sheet (ds-sheet + ds-scrim) ----------
function Sheet({ open, onClose, children, title, sub, full = false }) {
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (open) { setMounted(true); const t = setTimeout(() => setShown(true), 20); return () => clearTimeout(t); }
    else { setShown(false); const t = setTimeout(() => setMounted(false), 320); return () => clearTimeout(t); }
  }, [open]);
  if (!mounted) return null;
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: "calc(var(--tabbar-h) + var(--safe-bottom))", zIndex: 80 }}>
      <div className={"ds-scrim" + (shown ? " is-open" : "")} onClick={onClose} />
      <div className={"ds-sheet" + (shown ? " is-open" : "")} style={{ maxHeight: full ? "92%" : "86%" }}>
        <div className="ds-sheet__grip" />
        {title && <div className="ds-sheet__title">{title}</div>}
        {sub && <div className="ds-sheet__sub">{sub}</div>}
        {children}
      </div>
    </div>
  );
}

// ---------- Segmented control (ds-segmented) ----------
function Segmented({ options, value, onChange, style }) {
  return (
    <div className="ds-segmented" style={style}>
      {options.map(o => {
        const v = typeof o === "string" ? o : o.value;
        const label = typeof o === "string" ? o : o.label;
        return (
          <button key={v} className={"seg" + (v === value ? " is-active" : "")} onClick={() => onChange(v)}>{label}</button>
        );
      })}
    </div>
  );
}

// ---------- Section label (ds-list__header) ----------
function SectionLabel({ children, action, onAction }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", margin: "0 4px 10px" }}>
      <div className="ds-list__header" style={{ padding: 0 }}>{children}</div>
      {action && <button onClick={onAction} style={{ border: "none", background: "none", color: "var(--signature)", fontWeight: 600, fontSize: "var(--t-body-sm)", cursor: "pointer", fontFamily: "var(--font)" }}>{action}</button>}
    </div>
  );
}

// ---------- Stepper dots ----------
function Steps({ total, current }) {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          height: 5, borderRadius: 99, transition: "all .3s ease",
          width: i === current ? 22 : 5,
          background: i <= current ? "var(--brand-600)" : "var(--line)",
        }} />
      ))}
    </div>
  );
}

// ---------- Minimal PDF generator + download for a payslip ----------
function downloadPayslipPDF(p, me) {
  // WinAnsi-safe escaping; map dashes/minus to hyphen
  const esc = (s) => {
    s = String(s).replace(/[\u2012\u2013\u2014\u2212]/g, "-");
    let out = "";
    for (const ch of s) {
      const c = ch.codePointAt(0);
      if (ch === "(" || ch === ")" || ch === "\\") out += "\\" + ch;
      else if (c < 128) out += ch;
      else if (c < 256) out += "\\" + c.toString(8).padStart(3, "0");
      else out += "?";
    }
    return out;
  };
  const W = 595, left = 56, right = 539;
  const ops = [];
  const text = (x, y, size, bold, str) => ops.push(`BT /${bold ? "F2" : "F1"} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${esc(str)}) Tj ET`);
  const rtext = (x, y, size, bold, str) => { // right-aligned (approx via Helvetica width)
    const wf = (bold ? 0.55 : 0.5) * size;
    text(x - String(str).length * wf, y, size, bold, str);
  };
  const line = (y) => ops.push(`${left} ${y} m ${right} ${y} l S`);

  let y = 786;
  text(left, y, 16, true, me.employer); y -= 16;
  text(left, y, 9, false, "LONEBESKED"); 
  rtext(right, 786, 12, true, p.month);
  rtext(right, 770, 9, false, "Utbetalas " + p.payday);
  y -= 14; ops.push("0.2 w"); line(y); y -= 22;

  text(left, y, 8, false, "ANSTALLD"); text(left + 150, y, 8, false, "BEFATTNING"); y -= 12;
  text(left, y, 11, false, me.name); text(left + 150, y, 11, false, me.role); y -= 26;

  const groups = [...new Set(p.rows.filter(r => r.group !== "Netto").map(r => r.group))];
  groups.forEach(g => {
    text(left, y, 8, true, g.toUpperCase()); y -= 4; ops.push("0.4 w"); line(y); y -= 14;
    p.rows.filter(r => r.group === g).forEach(r => {
      text(left, y, 10, false, r.label + (r.qty ? "  (" + r.qty + ")" : ""));
      rtext(right, y, 10, false, krPlain(r.amount));
      y -= 15;
    });
    y -= 8;
  });
  ops.push("1 w"); line(y + 2); y -= 18;
  text(left, y, 12, true, "UTBETALT");
  rtext(right, y, 13, true, krPlain(p.net)); y -= 40;
  text(left, y, 8, false, "Vid fragor, kontakta " + me.hrName + ", " + me.hrRole + ".");

  const stream = ops.join("\n");
  const objs = {
    1: "<</Type/Catalog/Pages 2 0 R>>",
    2: "<</Type/Pages/Kids[3 0 R]/Count 1>>",
    3: `<</Type/Page/Parent 2 0 R/MediaBox[0 0 ${W} 842]/Resources<</Font<</F1 5 0 R/F2 6 0 R>>>>/Contents 4 0 R>>`,
    4: `<</Length ${stream.length}>>\nstream\n${stream}\nendstream`,
    5: "<</Type/Font/Subtype/Type1/BaseFont/Helvetica/Encoding/WinAnsiEncoding>>",
    6: "<</Type/Font/Subtype/Type1/BaseFont/Helvetica-Bold/Encoding/WinAnsiEncoding>>",
  };
  let pdf = "%PDF-1.4\n";
  const offs = {};
  for (let i = 1; i <= 6; i++) { offs[i] = pdf.length; pdf += `${i} 0 obj\n${objs[i]}\nendobj\n`; }
  const xref = pdf.length;
  pdf += "xref\n0 7\n0000000000 65535 f \n";
  for (let i = 1; i <= 6; i++) pdf += String(offs[i]).padStart(10, "0") + " 00000 n \n";
  pdf += `trailer\n<</Size 7/Root 1 0 R>>\nstartxref\n${xref}\n%%EOF`;

  const bytes = new Uint8Array(pdf.length);
  for (let i = 0; i < pdf.length; i++) bytes[i] = pdf.charCodeAt(i) & 0xff;
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Lonebesked-${p.month.replace(/\s/g, "-")}.pdf`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
// plain ascii money for PDF (no nbsp/minus glyph issues)
function krPlain(n) {
  const s = Math.abs(n).toLocaleString("sv-SE").replace(/\u00a0/g, " ");
  return (n < 0 ? "-" : "") + s + " kr";
}

Object.assign(window, { Icon, kr, Badge, Card, List, CollapsibleCard, Button, Row, Sheet, Segmented, SectionLabel, Steps, downloadPayslipPDF });
