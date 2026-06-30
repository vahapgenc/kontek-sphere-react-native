// ============================================================
// k-misc.jsx — Payslips, Upcoming, History, Profile, Status, Notifications
// ============================================================
const { useState: useStateM } = React;

// ---------------- Payslips list ----------------
function PayslipsScreen({ nav, store }) {
  const [openKommande, setOpenKommande] = useStateM(true);
  const [openSenaste, setOpenSenaste] = useStateM(true);
  const planned = [
    { id: "pl-jun", month: "Juni 2026", payday: "25 juni", est: store.upcoming.estNet, prelim: true, current: true },
    { id: "pl-jul", month: "Juli 2026", payday: "25 juli", est: 25120, prelim: true },
  ];
  const head = (label, open, toggle) => (
    <button onClick={toggle} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "2px 4px 10px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "var(--font)", textAlign: "left" }}>
      <span style={{ flex: 1, fontSize: "var(--t-caption)", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--ink-3)" }}>{label}</span>
      <Icon name="chevD" size={18} stroke="var(--ink-3)" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s var(--ease)" }} />
    </button>
  );
  return (
    <div style={{ padding: "4px 16px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        {head("Upcoming", openKommande, () => setOpenKommande(o => !o))}
        {openKommande && (
          <List>
            {planned.map((p) => (
              <Row key={p.id} icon="calendar" title={p.month} sub={`Estimated payment ${p.payday}`}
                onClick={p.current ? () => nav.push("upcoming") : undefined}
                right={p.current
                  ? <><span className="ds-row__value" style={{ color: "var(--ink-3)" }}>~{kr(p.est)}</span><span className="ds-row__chev"><Icon name="chevR" /></span></>
                  : <span className="ds-row__value" style={{ color: "var(--ink-3)" }}>~{kr(p.est)}</span>} />
            ))}
          </List>
        )}
      </div>
      <div>
        {head("Recent", openSenaste, () => setOpenSenaste(o => !o))}
        {openSenaste && (
          <List>
            {PAYSLIPS.map((p) => (
              <Row key={p.id} icon="payslip" title={p.month} sub={`Paid ${p.payday.replace(", 2026", "")}`}
                onClick={() => nav.push("payslip", { id: p.id })}
                right={<><span className="ds-row__value">{kr(p.net)}</span><span className="ds-row__chev"><Icon name="chevR" /></span></>} />
            ))}
          </List>
        )}
      </div>
    </div>
  );
}

// ---------------- Payslip detail ----------------
function PayslipDetail({ nav, store, params }) {
  const p = PAYSLIPS.find(x => x.id === params.id) || PAYSLIPS[0];
  const groups = [...new Set(p.rows.filter(r => r.group !== "Net").map(r => r.group))];
  const [confirmed, setConfirmed] = useStateM(false);
  const [openWhy, setOpenWhy] = useStateM(true);
  const [openDetails, setOpenDetails] = useStateM(true);
  const [pdfOpen, setPdfOpen] = useStateM(false);
  return (
    <div style={{ padding: "4px 16px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
      {/* hero */}
      <div style={{ background: "#203B3C", borderRadius: "var(--r-panel)", padding: "20px 22px", color: "var(--on-dark)", boxShadow: "var(--shadow-md)" }}>
        <div style={{ fontSize: "var(--t-eyebrow)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--status-badge)", fontWeight: 600 }}>{p.month}</div>
        <div className="tnum" style={{ fontSize: "var(--t-display)", fontWeight: 700, letterSpacing: "-0.03em", marginTop: 6 }}>{kr(p.net)}</div>
        <div style={{ fontSize: "var(--t-caption)", opacity: 0.82, marginTop: 2 }}>Net pay · paid {p.payday}</div>
      </div>

      {/* breakdown — header outside the card */}
      <div>
        <button onClick={() => setOpenDetails(o => !o)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "2px 4px 10px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "var(--font)", textAlign: "left" }}>
          <span style={{ flex: 1, fontSize: "var(--t-caption)", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--ink-3)" }}>Details</span>
          <Icon name="chevD" size={18} stroke="var(--ink-3)" style={{ transform: openDetails ? "rotate(180deg)" : "none", transition: "transform .2s var(--ease)" }} />
        </button>
        {openDetails && (
          <Card pad={0}>
            {groups.map((g) => (
              <div key={g}>
                <div style={{ padding: "0 16px" }}>
                  {p.rows.filter(r => r.group === g).map((r, i, arr) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, padding: "9px 0", borderBottom: "1px solid var(--line-2)" }}>
                      <div style={{ flex: 1, minWidth: 0 }}><span style={{ fontSize: "var(--t-body-sm)" }}>{r.label}</span>{r.qty && <span style={{ fontSize: "var(--t-caption)", color: "var(--ink-3)", marginLeft: 8 }}>{r.qty}</span>}</div>
                      <span className="tnum" style={{ fontSize: "var(--t-body-sm)", fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0, color: r.amount < 0 ? "var(--danger)" : "var(--ink)" }}>{kr(r.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, padding: "16px", background: "var(--brand-50)", borderTop: "1px solid var(--line)" }}>
              <span style={{ fontSize: "var(--t-title)", fontWeight: 700 }}>Paid</span>
              <span className="tnum" style={{ fontSize: "var(--t-h3)", fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0, color: "var(--brand-900)" }}>{kr(p.net)}</span>
            </div>
            <div style={{ padding: 16, borderTop: "1px solid var(--line-2)" }}>
              <Button full variant="secondary" onClick={() => setPdfOpen(true)}>View as PDF</Button>
            </div>
          </Card>
        )}
      </div>

      {/* Stämmer din lön — header outside the card */}
      <div>
        <button onClick={() => setOpenWhy(o => !o)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "2px 4px 10px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "var(--font)", textAlign: "left" }}>
          <span style={{ flex: 1, fontSize: "var(--t-caption)", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--ink-3)" }}>Is your pay correct</span>
          <Icon name="chevD" size={18} stroke="var(--ink-3)" style={{ transform: openWhy ? "rotate(180deg)" : "none", transition: "transform .2s var(--ease)" }} />
        </button>
        {openWhy && (
          <Card>
            {p.notes && <p style={{ margin: "0 0 14px", fontSize: "var(--t-body-sm)", color: "var(--ink-2)", lineHeight: 1.5 }}>{p.notes}</p>}
            {!confirmed ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Button full onClick={() => setConfirmed(true)}>Yes, everything is correct</Button>
                <Button full variant="secondary" onClick={() => nav.push("paycheck", { id: p.id })}>No – contact payroll</Button>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--ok-soft)", color: "var(--ok-text)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="checkCirc" size={22} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: "var(--t-title)" }}>Thanks – you're all done</div>
                  <div style={{ fontSize: "var(--t-body-sm)", color: "var(--ink-3)" }}>We've noted that your pay is correct.</div>
                </div>
                <button onClick={() => setConfirmed(false)} style={{ border: "none", background: "none", color: "var(--signature)", fontWeight: 600, fontSize: "var(--t-body-sm)", cursor: "pointer", fontFamily: "var(--font)" }}>Undo</button>
              </div>
            )}
          </Card>
        )}
      </div>

      <PdfSheet open={pdfOpen} onClose={() => setPdfOpen(false)} p={p} me={store.ME} />
    </div>
  );
}

// ---------------- PDF preview + download ----------------
function PdfSheet({ open, onClose, p, me }) {
  const groups = [...new Set(p.rows.filter(r => r.group !== "Net").map(r => r.group))];
  return (
    <Sheet open={open} onClose={onClose} title="Pay Slip" full>
      <div style={{ paddingBottom: 12 }}>
        <Button full onClick={() => downloadPayslipPDF(p, me)}>Download PDF</Button>
      </div>
      {/* A4-styled document preview */}
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 6, boxShadow: "var(--shadow-md)", padding: "26px 24px", margin: "4px 0 8px", aspectRatio: "210/297", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid var(--ink)", paddingBottom: 12 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.01em" }}>{me.employer}</div>
            <div style={{ fontSize: 10.5, color: "var(--ink-3)", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.08em" }}>Pay Slip</div>
          </div>
          <div style={{ textAlign: "right", fontSize: 10.5, color: "var(--ink-2)" }}>
            <div style={{ fontWeight: 700, fontSize: 12 }}>{p.month}</div>
            <div style={{ marginTop: 2 }}>Paid on {p.payday}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 24, marginTop: 14, fontSize: 11 }}>
          <div>
            <div style={{ color: "var(--ink-3)", fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.06em" }}>Employee</div>
            <div style={{ fontWeight: 600, marginTop: 1 }}>{me.name}</div>
          </div>
          <div>
            <div style={{ color: "var(--ink-3)", fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.06em" }}>Position</div>
            <div style={{ fontWeight: 600, marginTop: 1 }}>{me.role}</div>
          </div>
        </div>
        <div style={{ marginTop: 16, flex: 1 }}>
          {groups.map(g => (
            <div key={g} style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-3)", borderBottom: "1px solid var(--line)", paddingBottom: 3, marginBottom: 3 }}>{g}</div>
              {p.rows.filter(r => r.group === g).map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "3px 0", fontSize: 11 }}>
                  <span style={{ flex: 1, minWidth: 0 }}>{r.label}{r.qty ? `  (${r.qty})` : ""}</span>
                  <span className="tnum" style={{ fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0, color: r.amount < 0 ? "var(--danger)" : "var(--ink)" }}>{kr(r.amount)}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid var(--ink)", paddingTop: 10, marginTop: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em" }}>Paid</span>
          <span className="tnum" style={{ fontSize: 16, fontWeight: 800, whiteSpace: "nowrap" }}>{kr(p.net)}</span>
        </div>
        <div style={{ fontSize: 8.5, color: "var(--ink-3)", marginTop: 12, lineHeight: 1.4 }}>
          This pay slip is a summary of your pay for the period. If you have questions, contact {me.hrName}, {me.hrRole}.
        </div>
      </div>
    </Sheet>
  );
}

// ---------------- Kontakta lön (the "new box" — only reached when something's wrong) ----------------
function PayslipCheck({ nav, store, params }) {
  const p = PAYSLIPS.find(x => x.id === params.id) || PAYSLIPS[0];
  const [sent, setSent] = useStateM(false);
  const [msg, setMsg] = useStateM("");

  if (sent) {
    return <Success
      title="Sent to payroll"
      status="pending"
      lines={[
        { text: <><b>{store.ME.hrName}</b> ({store.ME.hrRole}) has received your query about {p.month}.</>, icon: "bell" },
        { text: "You will receive a reply in the app, usually within 1–2 working days.", icon: "clock" },
        { text: "The pay will be corrected on the next payroll run if something was wrong.", icon: "wallet" },
      ]}
      primaryLabel="Go to home" onPrimary={() => nav.go("home")}
      secondaryLabel="Back to pay slip" onSecondary={() => { nav.pop(); }}
    />;
  }

  return (
    <FlowShell onClose={() => nav.pop()} title="Contact payroll"
      footer={<Button full size="lg" disabled={!msg.trim()} onClick={() => setSent(true)}>Send to payroll</Button>}>
      <p style={{ fontSize: "var(--t-body-sm)", color: "var(--ink-2)", lineHeight: 1.5, marginTop: 0, marginBottom: 18 }}>Briefly describe what you think is wrong, and <b>{store.ME.hrName}</b> will look into it and correct it if needed.</p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 13, background: "var(--surface)", border: "1px solid var(--line-2)", borderRadius: "var(--r-md)", marginBottom: 14 }}>
        <div className="ds-avatar">{store.ME.hrName.split(" ").map(s => s[0]).join("")}</div>
        <div><div style={{ fontWeight: 600, fontSize: "var(--t-body-sm)" }}>{store.ME.hrName}</div><div style={{ fontSize: "var(--t-caption)", color: "var(--ink-3)" }}>{store.ME.hrRole}</div></div>
      </div>
      <label style={{ fontSize: "var(--t-caption)", fontWeight: 700, color: "var(--ink-2)" }}>What is it about?</label>
      <textarea value={msg} onChange={e => setMsg(e.target.value)} rows={4} placeholder={`E.g. "I worked 3 unsocial hours shifts in ${p.month.toLowerCase()} but only see 2 on the pay slip."`} style={{ width: "100%", marginTop: 8, border: "1.5px solid var(--line)", borderRadius: "var(--r-md)", padding: "13px 16px", fontSize: "var(--t-body-sm)", fontFamily: "var(--font)", outline: "none", resize: "none", lineHeight: 1.45, background: "var(--surface)", color: "var(--ink)" }} />
      <div style={{ marginTop: 12 }}>
        <Badge tone="neutral">Regarding: {p.month}</Badge>
      </div>
    </FlowShell>
  );
}

// ---------------- Upcoming pay ----------------
function UpcomingScreen({ nav, store }) {
  const u = store.upcoming;
  const delta = u.estNet - u.prevNet;
  return (
    <div style={{ padding: "4px 16px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ background: "#203B3C", borderRadius: "var(--r-panel)", padding: "20px 22px", color: "var(--on-dark)", boxShadow: "var(--shadow-md)" }}>
        <Badge tone="brand" style={{ background: "rgba(255,255,255,0.16)", color: "#fff" }} dot>Preliminary</Badge>
        <div className="tnum" style={{ fontSize: "var(--t-display)", fontWeight: 700, letterSpacing: "-0.03em", marginTop: 10 }}>{kr(u.estNet)}</div>
        <div style={{ fontSize: "var(--t-caption)", opacity: 0.85, marginTop: 2 }}>Estimated net pay · paid on {u.payday}</div>
      </div>

      <div>
        <SectionLabel>What's included</SectionLabel>
        <Card pad={0}>
          <div style={{ padding: "4px 16px" }}>
            {u.items.map((it, i) => (
              <div key={it.id} onClick={it.linked ? () => nav.push("complete", { id: it.linked }) : undefined} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < u.items.length - 1 ? "1px solid var(--line-2)" : "none", cursor: it.linked ? "pointer" : "default" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: "var(--t-body-sm)", fontWeight: it.type === "base" ? 700 : 500 }}>{it.label}</span>
                  {it.linked && <button onClick={(e) => { e.stopPropagation(); nav.push("complete", { id: it.linked }); }} style={{ display: "inline-flex", alignItems: "center", padding: 0, border: "none", background: "transparent", borderBottom: "1.5px solid var(--warn)", color: "var(--warn)", fontFamily: "var(--font)", fontSize: "var(--t-caption)", fontWeight: 600, cursor: "pointer", lineHeight: 1.3, paddingBottom: 1 }}>Fix</button>}
                </div>
                <span className="tnum" style={{ fontSize: "var(--t-body-sm)", fontWeight: 700, color: it.amount < 0 ? "var(--danger)" : "var(--ink)" }}>{kr(it.amount)}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px", background: "var(--brand-50)", borderTop: "1px solid var(--line)" }}>
            <span style={{ fontWeight: 700 }}>Estimated net</span>
            <span className="tnum" style={{ fontWeight: 700, color: "var(--brand-900)" }}>{kr(u.estNet)}</span>
          </div>
        </Card>
      </div>

      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--warn-bg)", color: "var(--warn)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="arrowDown" size={22} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: "var(--t-body-sm)" }}>{kr(delta)} vs May</div>
            <div style={{ fontSize: "var(--t-caption)", color: "var(--ink-3)" }}>Mainly due to sick deduction this period</div>
          </div>
        </div>
      </Card>

      <InfoNote icon="info" tone="info">This is a <b>preliminary</b> calculation. It is updated when you register absence or expenses, and is finalised shortly before pay day.</InfoNote>
    </div>
  );
}

// ---------------- History ----------------
function HistoryScreen({ nav, store }) {
  const all = store.activity;
  const [openReg, setOpenReg] = useStateM(true);
  const [openTid, setOpenTid] = useStateM(true);
  const head = (label, open, toggle) => (
    <button onClick={toggle} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "2px 4px 10px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "var(--font)", textAlign: "left" }}>
      <span style={{ flex: 1, fontSize: "var(--t-caption)", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--ink-3)" }}>{label}</span>
      <Icon name="chevD" size={18} stroke="var(--ink-3)" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s var(--ease)" }} />
    </button>
  );
  return (
    <div style={{ padding: "4px 16px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        {head(`Registered · ${store.upcoming.month}`, openReg, () => setOpenReg(o => !o))}
        {openReg && (
          <List>
            {all.map((a) => {
              const m = STATUS_META[a.status];
              return <Row key={a.id} icon={a.icon} title={a.title} sub={a.sub}
                onClick={() => nav.push("status", { id: a.id })}
                right={<Badge tone={m.tone} dot>{m.label}</Badge>} />;
            })}
          </List>
        )}
      </div>
      <div>
        {head("Previous", openTid, () => setOpenTid(o => !o))}
        {openTid && (
          <List>
            <Row icon="calendar" title="Annual leave" sub="April 14–18 · 5 days" right={<Badge tone="ok" dot>Approved</Badge>} />
            <Row icon="receipt" title="Expense – travel" sub="April 2 · SEK 420" right={<Badge tone="ok" dot>Paid</Badge>} />
          </List>
        )}
      </div>
    </div>
  );
}

// ---------------- Status detail ----------------
function StatusDetail({ nav, store, params }) {
  const a = store.activity.find(x => x.id === params.id);
  if (!a) return <div style={{ padding: 24, color: "var(--ink-3)" }}>Not found.</div>;
  const m = STATUS_META[a.status];
  const stepStatus = a.status === "approved" ? 2 : a.status === "rejected" ? 1 : 1;
  const steps = a.status === "rejected"
    ? [
        { label: "Registered", done: true, by: "You" },
        { label: "Rejected", done: true, by: store.ME.hrName },
      ]
    : [
        { label: "Registered", done: true, by: "You" },
        { label: "Awaiting approval", done: a.status !== "action", by: store.ME.hrName },
        { label: "Included in pay", done: a.status === "approved", by: store.upcoming.payday },
      ];
  return (
    <div style={{ padding: "8px 16px 28px", display: "flex", flexDirection: "column", gap: 18, minHeight: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, paddingTop: 8 }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, display: "grid", placeItems: "center", background: a.status === "action" ? "var(--warn-bg)" : "#203B3C", color: a.status === "action" ? "var(--warn)" : "#fff", flexShrink: 0 }}><Icon name={a.icon} size={28} /></div>
        <div style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
          <div style={{ fontSize: "var(--t-h2)", fontWeight: 700, letterSpacing: "-0.02em" }}>{a.title}</div>
          <div style={{ fontSize: "var(--t-body-sm)", color: "var(--ink-3)", marginTop: 2 }}>{a.sub}</div>
        </div>
        <Badge tone={m.tone} dot style={{ flexShrink: 0 }}>{m.label}</Badge>
      </div>

      {a.amount !== 0 && a.status !== "rejected" && (
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "var(--t-body-sm)", color: "var(--ink-2)" }}>Impact on pay</span>
            <span className="tnum" style={{ fontSize: "var(--t-h3)", fontWeight: 700, color: a.amount < 0 ? "var(--danger)" : "var(--ok)" }}>{kr(a.amount, { plus: a.amount > 0 })}</span>
          </div>
        </Card>
      )}

      <div>
        <SectionLabel>Status</SectionLabel>
        <Card>
          {steps.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", minHeight: i < steps.length - 1 ? 58 : 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", alignSelf: "stretch" }}>
                <div style={{ width: 26, height: 26, borderRadius: 99, display: "grid", placeItems: "center", background: s.done ? "var(--green)" : "var(--line-2)", color: s.done ? "#fff" : "var(--ink-3)", flexShrink: 0 }}>
                  {s.done ? <Icon name="check" size={15} sw={2.6} /> : <span style={{ fontSize: "var(--t-caption)", fontWeight: 700 }}>{i + 1}</span>}
                </div>
                {i < steps.length - 1 && <div style={{ width: 2, flex: 1, background: "#66777A" }} />}
              </div>
              <div style={{ paddingTop: 2 }}>
                <div style={{ fontWeight: 700, fontSize: "var(--t-body-sm)", color: s.done ? "var(--ink)" : "var(--ink-3)" }}>{s.label}</div>
                <div style={{ fontSize: "var(--t-caption)", color: "var(--ink-3)", marginTop: 1 }}>{s.by}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {a.status === "rejected" && a.reason && (
        <InfoNote tone="danger" icon="warn" title="Why was it rejected?">{a.reason}</InfoNote>
      )}

      {a.status !== "approved" && (
        <Button full size="lg" variant="danger" style={{ marginTop: "auto" }} onClick={() => { store.removeActivity(a.id); nav.go("home"); }}>Delete registration</Button>
      )}
    </div>
  );
}

// ---------------- Notifications ----------------
function NotificationsScreen({ nav, store, notifRead, onItemRead, onMarkAll }) {
  const items = [
    { id: "n-sick", icon: "warn", tone: "warn", title: "Upload medical certificate", sub: "Your sick period is longer than 7 days", time: "Today", todo: "a-sick", unread: true },
    { id: "n-exp", icon: "warn", tone: "warn", title: "Expense missing receipt", sub: "Parking · SEK 180", time: "Today", todo: "a-exp", unread: true },
    { id: "n-vab", icon: "checkCirc", tone: "ok", title: "Child sick care approved", sub: `${store.ME.hrName} approved your child sick care day`, time: "Yesterday" },
    { id: "n-pay", icon: "payslip", tone: "info", title: "Pay slip for May is ready", sub: "Paid May 25", time: "May 25", payslip: "ps-2026-05" },
  ];
  const anyUnread = items.some(n => n.unread && !(notifRead || []).includes(n.id));
  return (
    <div style={{ padding: "4px 16px 28px", display: "flex", flexDirection: "column", gap: 10 }}>
      {anyUnread && <div style={{ display: "flex", justifyContent: "flex-end" }}><button onClick={onMarkAll} style={{ padding: 0, fontFamily: "var(--font)", fontSize: "var(--t-body-sm)", fontWeight: 600, color: "var(--action)", whiteSpace: "nowrap", background: "transparent", border: "none", cursor: "pointer" }}>Mark all as read</button></div>}
      {items.map((n) => {
        const isNew = n.unread && !(notifRead || []).includes(n.id);
        const onClick = () => {
          if (n.unread) onItemRead && onItemRead(n.id);
          if (n.todo) nav.push("complete", { id: n.todo });
          else if (n.payslip) nav.push("payslip", { id: n.payslip });
        };
        return (
        <div key={n.id} onClick={(n.todo || n.payslip || n.unread) ? onClick : undefined} style={{ display: "flex", gap: 13, padding: 14, background: "var(--surface)", border: "1px solid var(--line-2)", borderRadius: "var(--r-lg)", boxShadow: "var(--sh-1)", cursor: (n.todo || n.payslip || n.unread) ? "pointer" : "default", alignItems: "flex-start" }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, display: "grid", placeItems: "center",
            background: n.tone === "warn" ? "var(--warn-bg)" : n.tone === "ok" ? "var(--ok-bg)" : "var(--info-bg)",
            color: n.tone === "warn" ? "var(--warn)" : n.tone === "ok" ? "var(--ok)" : "var(--info)" }}>
            <Icon name={n.todo ? "warn" : n.tone === "info" ? "info" : n.icon} size={21} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
              <span style={{ fontWeight: isNew ? 700 : 600, fontSize: "var(--t-title)", display: "inline-flex", alignItems: "center", gap: 7 }}>
                {isNew && <span style={{ width: 9, height: 9, borderRadius: 99, background: "var(--green)", flexShrink: 0 }} />}
                {n.title}
              </span>
              <span style={{ fontSize: "var(--t-caption)", color: "var(--ink-3)", flexShrink: 0 }}>{n.time}</span>
            </div>
            <div style={{ fontSize: "var(--t-body)", fontWeight: isNew ? 600 : 400, color: "var(--ink-3)", marginTop: 2 }}>{n.sub}</div>
            {n.todo && <div style={{ marginTop: 8 }}><Badge tone="warn" dot>Tap to fix</Badge></div>}
          </div>
        </div>
      );})}
    </div>
  );
}

// ---------------- Profile ----------------
function ProfileScreen({ nav, store }) {
  const others = [{ id: "c2", name: "Café Hörnan AB", role: "Hourly staff" }];
  return (
    <div style={{ padding: "4px 16px 28px", display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "4px 4px 0" }}>
        <div className="ds-avatar ds-avatar--lg">{store.ME.name.split(" ").map(s => s[0]).join("")}</div>
        <div><div style={{ fontSize: "var(--t-h3)", fontWeight: 700 }}>{store.ME.name}</div><div style={{ fontSize: "var(--t-body-sm)", color: "var(--ink-3)" }}>{store.ME.role} · {store.ME.employer}</div></div>
      </div>

      <div>
        <SectionLabel>My companies</SectionLabel>
        <List>
          <Row icon="building" title={store.ME.employer} sub={`${store.ME.role} · Active`} onClick={() => nav.push("companies")} />
        </List>
      </div>

      <List header="My balances">
        {BALANCES.map((b) => (
          <Row key={b.id} icon={b.icon} title={b.label}
            right={<span className="ds-row__value">{b.value} <span style={{ fontSize: "var(--t-caption)", color: "var(--ink-3)", fontWeight: 500 }}>{b.unit}</span></span>} />
        ))}
      </List>

      <List header="Pay & contact">
        <Row icon="user" title={store.ME.hrName} sub={`${store.ME.hrRole} · ${store.ME.employer}`} onClick={() => {}} right={<span className="ds-row__chev"><Icon name="phone" stroke="var(--signature)" /></span>} />
        <Row icon="wallet" title="Bank account" sub="•••• 4471 · Swedbank" onClick={() => {}} />
        <Row icon="doc" title="My employment details" onClick={() => {}} />
      </List>

      <List header="App">
        <Row icon="bell" title="Notifications" onClick={() => nav.push("notifications")} />
        <Row icon="help" title="Help & FAQ" onClick={() => {}} />
        <Row icon="logOut" title="Log out" onClick={() => store.logout && store.logout()} />
      </List>
      <div style={{ textAlign: "center", fontSize: "var(--t-caption)", color: "var(--ink-3)" }}>Kontek · Pay & HR · v1.0 (prototype)</div>
    </div>
  );
}

// ---------------- Companies screen ----------------
function CompaniesScreen({ store }) {
  const companies = [
    {
      id: "c1",
      name: store.ME.employer,
      role: store.ME.role,
      active: true,
      permissions: ["Register absence", "Register expenses", "View pay slips"],
    },
    {
      id: "c2",
      name: "Café Hörnan AB",
      role: "Extrapersonal",
      active: false,
      permissions: ["Register absence"],
    },
  ];
  return (
    <div style={{ padding: "12px 16px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
      {companies.map((c) => (
        <div key={c.id} style={{ background: "var(--surface)", borderRadius: "var(--r-lg)", border: "1px solid var(--line-2)", boxShadow: "var(--sh-1)", overflow: "hidden" }}>
          {/* Company header */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 16px 14px" }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, flexShrink: 0, display: "grid", placeItems: "center",
              background: c.active ? "#203B3C" : "var(--bg-2, #eef0f4)", color: c.active ? "#fff" : "var(--ink-3)" }}>
              <Icon name="building" size={24} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "var(--t-title)", fontWeight: 700, lineHeight: 1.2 }}>{c.name}</div>
              <div style={{ fontSize: "var(--t-body-sm)", color: "var(--ink-3)", marginTop: 3 }}>{c.role}</div>
            </div>
            <Badge tone={c.active ? "ok" : "info"} dot>{c.active ? "Active" : "Inactive"}</Badge>
          </div>
          {/* Divider */}
          <div style={{ height: 1, background: "var(--line-2)", margin: "0 16px" }} />
          {/* Permissions */}
          <div style={{ padding: "14px 16px 16px" }}>
            <div style={{ fontSize: "var(--t-caption)", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--signature)", marginBottom: 12 }}>Permissions</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {c.permissions.map((p) => (
                <div key={p} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Icon name="check" size={18} stroke="var(--ok)" />
                  <span style={{ fontSize: "var(--t-body)" }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CompanyRow({ label, value, last }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 16px", borderBottom: last ? "none" : "1px solid var(--line-2)", gap: 12 }}>
      <span style={{ fontSize: "var(--t-body)", color: "var(--ink-3)" }}>{label}</span>
      <span style={{ fontSize: "var(--t-body)", fontWeight: 600, textAlign: "right" }}>{value}</span>
    </div>
  );
}

Object.assign(window, { PayslipsScreen, PayslipDetail, PayslipCheck, UpcomingScreen, HistoryScreen, StatusDetail, NotificationsScreen, ProfileScreen, CompaniesScreen });
