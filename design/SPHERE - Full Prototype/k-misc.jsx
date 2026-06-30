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
      <span style={{ flex: 1, fontSize: "var(--t-caption)", fontWeight: 600, letterSpacing: "0.005em", textTransform: "none", color: "var(--ink-3)" }}>{label}</span>
      <Icon name="chevD" size={18} stroke="var(--ink-3)" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s var(--ease)" }} />
    </button>
  );
  return (
    <div style={{ padding: "4px 16px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
      {!store.isManager && (
        <BalanceTiles balances={(store.activeCompany && store.activeCompany.balances) || BALANCES} nav={nav} />
      )}
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
      <div style={{ background: "linear-gradient(145deg, #F0FAF4 0%, #DBEFE3 100%)", borderRadius: "var(--r-sheet)", padding: "20px 22px", color: "var(--signature)", border: "1px solid rgba(32,59,60,0.06)", boxShadow: "0 16px 34px -14px rgba(32,59,60,0.26)" }}>
        <div style={{ fontSize: "var(--t-eyebrow)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--green-deep)", fontWeight: 600 }}>{p.month}</div>
        <div className="tnum" style={{ fontSize: "var(--t-display)", fontWeight: 700, letterSpacing: "-0.03em", marginTop: 6 }}>{kr(p.net)}</div>
        <div style={{ fontSize: "var(--t-caption)", color: "var(--ink-3)", marginTop: 2 }}>Net pay · paid {p.payday}</div>
      </div>

      {/* breakdown — header outside the card */}
      <div>
        <button onClick={() => setOpenDetails(o => !o)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "2px 4px 10px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "var(--font)", textAlign: "left" }}>
          <span style={{ flex: 1, fontSize: "var(--t-caption)", fontWeight: 600, letterSpacing: "0.005em", textTransform: "none", color: "var(--ink-3)" }}>Details</span>
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
          <span style={{ flex: 1, fontSize: "var(--t-caption)", fontWeight: 600, letterSpacing: "0.005em", textTransform: "none", color: "var(--ink-3)" }}>Is your pay correct</span>
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
              <div style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: "0.005em", textTransform: "none", color: "var(--ink-3)", borderBottom: "1px solid var(--line)", paddingBottom: 3, marginBottom: 3 }}>{g}</div>
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
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 13, background: "var(--surface)", border: "1px solid transparent", borderRadius: "var(--r-md)", marginBottom: 14 }}>
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

// ---------------- Balance stat tiles (informational, dark/pay theme) ----------------
function BalanceTiles({ balances, title = "My balances", nav, personId }) {
  return (
    <div>
      <SectionLabel>{title}</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {balances.map((b) => (
          <button key={b.id} onClick={nav ? () => nav.push("balanceDetail", { balanceId: b.id, personId }) : undefined}
            style={{ position: "relative", textAlign: "left", fontFamily: "var(--font)", border: "1px solid rgba(32,59,60,0.06)", background: "linear-gradient(145deg, #F0FAF4 0%, #DBEFE3 100%)", borderRadius: "var(--r-panel)", padding: "16px 13px 14px", boxShadow: "var(--sh-1)", display: "flex", flexDirection: "column", minHeight: 112, cursor: nav ? "pointer" : "default" }}>
            <span style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
              <span className="tnum" style={{ fontSize: "var(--t-h1)", fontWeight: 700, lineHeight: 1, color: "var(--signature)" }}>{b.value}</span>
              <span style={{ fontSize: "var(--t-caption)", color: "var(--green-deep)", fontWeight: 600 }}>{b.unit}</span>
            </span>
            <span style={{ fontSize: "var(--t-caption)", color: "var(--ink-3)", lineHeight: 1.3, marginTop: "auto", paddingTop: 12 }}>{b.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------- Balance detail (when these days were taken) ----------------
function BalanceDetailScreen({ nav, store, params }) {
  const { balanceId, personId } = params;
  const member = personId ? (store.team || []).find(m => m.id === personId) : null;
  const balances = member ? (member.balances || []) : ((store.activeCompany && store.activeCompany.balances) || BALANCES);
  const bal = balances.find(b => b.id === balanceId);
  if (!bal) return <div style={{ padding: 24, color: "var(--ink-3)" }}>Not found.</div>;
  const history = bal.history || [];
  const totalDays = history.reduce((n, s) => n + (parseInt(s.meta, 10) || 0), 0);
  const sectionTitle = balanceId === "sem" ? "Leave taken this year" : balanceId === "vab" ? "Child sick care taken" : "Sick leave this year";
  return (
    <div style={{ padding: "8px 16px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Stat hero — matches the tile */}
      <div style={{ background: "linear-gradient(145deg, #F0FAF4 0%, #DBEFE3 100%)", borderRadius: "var(--r-sheet)", padding: "20px 22px", color: "var(--signature)", border: "1px solid rgba(32,59,60,0.06)", boxShadow: "0 16px 34px -14px rgba(32,59,60,0.26)" }}>
        {member && <div style={{ fontSize: "var(--t-eyebrow)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--green-deep)", fontWeight: 600, marginBottom: 8 }}>{member.name}</div>}
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span className="tnum" style={{ fontSize: "var(--t-display)", fontWeight: 700, lineHeight: 1 }}>{bal.value}</span>
          <span style={{ fontSize: "var(--t-body)", color: "var(--green-deep)", fontWeight: 600 }}>{bal.unit}</span>
        </div>
        <div style={{ fontSize: "var(--t-body-sm)", color: "var(--ink-3)", marginTop: 4 }}>{bal.label}</div>
      </div>

      {/* History */}
      <div>
        <SectionLabel>{sectionTitle}</SectionLabel>
        {history.length === 0 ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px", background: "var(--surface)", border: "1px solid transparent", borderRadius: "var(--r-panel)", boxShadow: "var(--sh-1)" }}>
            <span style={{ width: 36, height: 36, borderRadius: 11, flexShrink: 0, display: "grid", placeItems: "center", background: "var(--ok-soft)", color: "var(--ok)" }}><Icon name="check" size={19} sw={2.2} /></span>
            <span style={{ fontSize: "var(--t-body)", color: "var(--ink-3)" }}>Nothing registered this year.</span>
          </div>
        ) : (
          <div style={{ background: "var(--surface)", borderRadius: "var(--r-panel)", border: "1px solid transparent", boxShadow: "var(--sh-1)", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "12px 16px", background: "var(--bg)", borderBottom: "1px solid var(--line-2)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: "var(--t-body-sm)", color: "var(--ink-3)" }}>
                <Icon name="calendar" size={17} stroke="var(--ink-3)" />
                {history.length} occasions
              </span>
            </div>
            {history.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "12px 16px", borderTop: i === 0 ? "none" : "1px solid var(--line-2)" }}>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: "block", fontSize: "var(--t-body)", color: "var(--ink-2)" }}>{s.range}</span>
                  {s.weekday && <span style={{ display: "block", fontSize: "var(--t-caption)", color: "var(--ink-3)", marginTop: 1 }}>{s.weekday}</span>}
                </span>
                <span className="tnum" style={{ fontSize: "var(--t-body-sm)", color: "var(--ink-3)", flexShrink: 0 }}>{s.meta}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------- Me (personal hub) ----------------
function MeScreen({ nav, store }) {
  const ac = store.activeCompany;
  const recentSlips = (PAYSLIPS || []).slice(0, 3);
  return (
    <div style={{ padding: "4px 16px 28px", display: "flex", flexDirection: "column", gap: 18 }}>
      <BalanceTiles balances={ac.balances || BALANCES} nav={nav} />
      <List header="Pay slips">
        <Row icon="payslip" title="Upcoming pay" sub={store.upcoming.month}
          onClick={() => nav.push("upcoming")}
          right={<Icon name="chevR" size={20} stroke="var(--ink-4)" />} />
        {recentSlips.map(p => (
          <Row key={p.id} icon="payslip" title={p.month} sub={kr(p.net)}
            onClick={() => nav.push("payslip", { id: p.id })} />
        ))}
        <Row icon="payslip" title="All pay slips" sub={`${(PAYSLIPS || []).length} slips`}
          onClick={() => nav.push("payslips")}
          right={<Icon name="chevR" size={20} stroke="var(--ink-4)" />} />
      </List>
      <List header="Calendar">
        <Row icon="calendar" title="My calendar" sub="Registrations and upcoming"
          onClick={() => nav.push("calendar")}
          right={<Icon name="chevR" size={20} stroke="var(--ink-4)" />} />
      </List>
    </div>
  );
}

// ---------------- Upcoming pay ----------------
function UpcomingScreen({ nav, store }) {
  const u = store.upcoming;
  const delta = u.estNet - u.prevNet;
  return (
    <div style={{ padding: "4px 16px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ background: "linear-gradient(145deg, #F0FAF4 0%, #DBEFE3 100%)", borderRadius: "var(--r-sheet)", padding: "20px 22px", color: "var(--signature)", border: "1px solid rgba(32,59,60,0.06)", boxShadow: "0 16px 34px -14px rgba(32,59,60,0.26)" }}>
        <Badge tone="brand" style={{ background: "var(--green-soft)", color: "var(--green-deep)" }} dot>Preliminary</Badge>
        <div className="tnum" style={{ fontSize: "var(--t-display)", fontWeight: 700, letterSpacing: "-0.03em", marginTop: 10 }}>{kr(u.estNet)}</div>
        <div style={{ fontSize: "var(--t-caption)", color: "var(--ink-3)", marginTop: 2 }}>Estimated net pay · paid on {u.payday}</div>
      </div>

      <div>
        <SectionLabel>What's included</SectionLabel>
        <Card pad={0}>
          <div style={{ padding: "4px 16px" }}>
            {u.items.map((it, i) => (
              <div key={it.id} onClick={it.linked ? () => nav.push("complete", { id: it.linked }) : undefined} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < u.items.length - 1 ? "1px solid var(--line-2)" : "none", cursor: it.linked ? "pointer" : "default" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: "var(--t-body-sm)", fontWeight: it.type === "base" ? 700 : 500 }}>{it.label}</span>
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
      <span style={{ flex: 1, fontSize: "var(--t-caption)", fontWeight: 600, letterSpacing: "0.005em", textTransform: "none", color: "var(--ink-3)" }}>{label}</span>
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
        <div style={{ width: 56, height: 56, borderRadius: 16, display: "grid", placeItems: "center", background: a.status === "action" ? "var(--warn-bg)" : "#053F22", color: a.status === "action" ? "var(--warn)" : "#fff", flexShrink: 0 }}><Icon name={a.icon} size={28} /></div>
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
    ...(store.isManager ? [
      { id: "n-appr-abs", icon: "approvals", tone: "info", title: "New absence to approve", sub: "Erik Holm · Vacation · 12–16 June", time: "Today", approval: true, unread: true },
      { id: "n-appr-exp", icon: "approvals", tone: "info", title: "New expense to approve", sub: "Sara Nilsson · 540 kr", time: "Today", approval: true, unread: true },
    ] : []),
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
          else if (n.approval) nav.go("approvals");
        };
        return (
        <div key={n.id} onClick={(n.todo || n.payslip || n.approval || n.unread) ? onClick : undefined} style={{ display: "flex", gap: 13, padding: 14, background: "var(--surface)", border: "1px solid transparent", borderRadius: "var(--r-panel)", boxShadow: "0 10px 28px -12px rgba(18,33,33,0.18), 0 2px 8px -3px rgba(18,33,33,0.07)", cursor: (n.todo || n.payslip || n.approval || n.unread) ? "pointer" : "default", alignItems: "flex-start" }}>
          <div style={{ width: 40, height: 24, marginTop: 1, flexShrink: 0, display: "grid", placeItems: "center",
            color: n.tone === "warn" ? "var(--warn)" : n.tone === "ok" ? "var(--ok)" : "var(--info)" }}>
            <Icon name={n.approval ? "approvals" : n.todo ? "warn" : n.tone === "info" ? "info" : n.icon} size={22} />
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
          </div>
        </div>
      );})}
    </div>
  );
}

// ---------------- Profile ----------------
function ProfileScreen({ nav, store }) {
  const ac = store.activeCompany;
  const employments = store.companies.length;
  const [langOpen, setLangOpen] = useStateM(false);
  const LANGUAGES = [
    { id: "Swedish", label: "Svenska", sub: "Swedish" },
    { id: "English", label: "English", sub: "English" },
  ];
  return (
    <div style={{ padding: "4px 16px 28px", display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "4px 4px 0" }}>
        <div className="ds-avatar ds-avatar--lg">{store.ME.name.split(" ").map(s => s[0]).join("")}</div>
        <div><div style={{ fontSize: "var(--t-h3)", fontWeight: 700 }}>{store.ME.name}</div><div style={{ fontSize: "var(--t-body-sm)", color: "var(--ink-3)" }}>{ac.role} · {ac.name}</div></div>
      </div>

      <div>
        <SectionLabel>My companies</SectionLabel>
        <List>
          <Row icon="building" title={ac.name} sub={`${ac.kind === "manager" ? "Approver" : "Employee"} · ${employments} employments`} onClick={() => nav.push("companies")} />
        </List>
      </div>

      <List header="Pay & contact">
        <Row icon="user" title={store.ME.hrName} sub={`${store.ME.hrRole} · ${store.ME.employer}`} onClick={() => {}} right={<span className="ds-row__chev"><Icon name="phone" stroke="var(--signature)" /></span>} />
        <Row icon="wallet" title="Bank account" sub={(() => { const p = (store.bankAccounts || []).find(b => b.primary); return p ? `${p.bank} · ${p.number}` : "No account"; })()} onClick={() => nav.push("bankAccounts")} />
        <Row icon="doc" title="My employment details" onClick={() => nav.push("employment")} />
      </List>

      <List header="App">
        <Row icon="globe" title="Language" onClick={() => setLangOpen(true)}
          right={<span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--ink-3)", fontSize: "var(--t-body)" }}>{store.language}<Icon name="chevR" size={20} stroke="var(--ink-4)" /></span>} />
        <Row icon="logOut" title="Log out" onClick={() => store.logout && store.logout()} right={null} />
      </List>
      <div style={{ textAlign: "center", fontSize: "var(--t-caption)", color: "var(--ink-3)" }}>Kontek · Pay & HR · v1.0 (prototype)</div>

      {/* Language chooser */}
      <Sheet open={langOpen} onClose={() => setLangOpen(false)} title="Language" sub="Choose the language for the app">
        <div style={{ padding: "4px 0 8px", display: "flex", flexDirection: "column", gap: 8 }}>
          {LANGUAGES.map((l) => {
            const selected = store.language === l.id;
            return (
              <button key={l.id}
                onClick={() => { store.setLanguage(l.id); setLangOpen(false); store.setFlash && store.setFlash(`Language set to ${l.label}`); }}
                style={{ display: "flex", alignItems: "center", gap: 13, width: "100%", textAlign: "left", padding: "14px 14px",
                  fontFamily: "var(--font)", cursor: "pointer", borderRadius: "var(--r-panel)",
                  background: selected ? "var(--green-soft)" : "var(--surface-1)",
                  border: selected ? "1.5px solid var(--signature)" : "1px solid var(--line-2)" }}>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: "block", fontSize: "var(--t-title)", fontWeight: 700 }}>{l.label}</span>
                  <span style={{ display: "block", fontSize: "var(--t-body-sm)", color: "var(--ink-3)", marginTop: 1 }}>{l.sub}</span>
                </span>
                {selected && <Icon name="check" size={22} stroke="var(--signature)" sw={2.2} />}
              </button>
            );
          })}
        </div>
      </Sheet>
    </div>
  );
}

// ---------------- Companies screen ----------------
function CompaniesScreen({ store }) {
  const companies = store.companies;
  return (
    <div style={{ padding: "12px 16px 28px", display: "flex", flexDirection: "column", gap: 16 }}>

      {companies.map((c) => {
        const current = store.companyCtx === c.id;
        const selectable = c.active && !current;
        const Tag = selectable ? "button" : "div";
        const isManager = c.kind === "manager";
        return (
          <Tag
            key={c.id}
            onClick={selectable ? () => store.setCompany(c.id) : undefined}
            style={{
              display: "block", width: "100%", textAlign: "left", padding: 0, margin: 0,
              fontFamily: "var(--font)", cursor: selectable ? "pointer" : "default",
              background: "var(--surface)", borderRadius: "var(--r-panel)", overflow: "hidden",
              border: current ? "1.5px solid var(--signature)" : "1px solid var(--line-2)",
              boxShadow: current ? "0 0 0 3px color-mix(in srgb, var(--signature) 12%, transparent), var(--sh-1)" : "var(--sh-1)",
              opacity: c.active ? 1 : 0.72,
            }}
          >
            {/* Company header */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 16px 14px" }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, flexShrink: 0, display: "grid", placeItems: "center",
                background: c.active ? "#053F22" : "var(--surface-2, #eef0f4)", color: c.active ? "#fff" : "var(--ink-3)" }}>
                <Icon name="building" size={24} stroke={c.active ? "#fff" : "var(--ink-3)"} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "var(--t-title)", fontWeight: 700, lineHeight: 1.2 }}>{c.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
                  <span style={{ fontSize: "var(--t-body-sm)", color: "var(--ink-3)" }}>{c.role}</span>
                </div>
              </div>
              {current
                ? <Badge tone={c.active ? "ok" : "neutral"} dot>{c.active ? "Active" : "Inactive"}</Badge>
                : <Badge tone={c.active ? "ok" : "neutral"} dot>{c.active ? "Active" : "Inactive"}</Badge>}
            </div>
            {/* Divider */}
            <div style={{ height: 1, background: "var(--line-2)", margin: "0 16px" }} />
            {/* Permissions */}
            <div style={{ padding: "14px 16px 16px" }}>
              <div style={{ fontSize: "var(--t-caption)", fontWeight: 600, letterSpacing: "0.005em", textTransform: "none", color: "var(--ink-3)", marginBottom: 12 }}>Permissions</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {c.permissions.map((p) => {
                  const isApprove = /^Approve/.test(p);
                  return (
                    <div key={p} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Icon name="check" size={18} stroke={isApprove ? "var(--signature)" : "var(--ok)"} />
                      <span style={{ fontSize: "var(--t-body)", fontWeight: 400 }}>{p}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Tag>
        );
      })}
    </div>
  );
}

// ---------------- Approvals (manager) ----------------
function ApprovalInitials(name) {
  return name.split(" ").map(s => s[0]).slice(0, 2).join("");
}

function ApprovalsScreen({ nav, store }) {
  const sections = [
    { kind: "absence", label: "Absence", items: store.approvals.absence },
    { kind: "expense", label: "Expenses", items: store.approvals.expense },
  ];
  const total = store.approvals.absence.length + store.approvals.expense.length;
  const processed = store.processed || [];
  const timeOf = (ts) => "Today " + new Date(ts).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  return (
    <div style={{ padding: "8px 16px 28px", display: "flex", flexDirection: "column", gap: 22 }}>
      {total === 0 ? (
        <div style={{ padding: "28px 16px 8px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 14 }}>
          <span style={{ width: 64, height: 64, borderRadius: 20, display: "grid", placeItems: "center", background: "var(--ok-bg)", color: "var(--ok)" }}>
            <Icon name="checkCirc" size={34} sw={1.8} />
          </span>
          <div>
            <div style={{ fontSize: "var(--t-h3)", fontWeight: 700 }}>All caught up</div>
            <div style={{ fontSize: "var(--t-body)", color: "var(--ink-3)", marginTop: 4 }}>No requests waiting for your approval.</div>
          </div>
        </div>
      ) : (
        <React.Fragment>
          {/* Summary */}
          <div style={{ margin: "0 2px" }}>
            <span style={{ fontSize: "var(--t-body-sm)", color: "var(--ink-3)" }}>{`${total} ${total === 1 ? "request" : "requests"} waiting for your approval`}</span>
          </div>
          {sections.map((sec) => sec.items.length > 0 && (
            <div key={sec.kind}>
              {/* Section header */}
              <div style={{ display: "flex", alignItems: "center", gap: 9, margin: "0 4px 10px" }}>
                <span style={{ fontSize: "var(--t-caption)", fontWeight: 600, letterSpacing: "0.005em", textTransform: "none", color: "var(--ink-3)" }}>{sec.label}</span>
                <span style={{ minWidth: 18, height: 18, padding: "0 5px", borderRadius: "var(--r-pill)", background: "var(--ink-3)", color: "#fff", fontSize: 11, fontWeight: 700, lineHeight: "18px", textAlign: "center", boxSizing: "border-box" }}>{sec.items.length}</span>
                {sec.kind === sections[0].kind && (
                  <button onClick={() => store.approveEverything()} style={{ marginLeft: "auto", border: "none", background: "none", padding: "4px 2px", color: "var(--signature)", fontFamily: "var(--font)", fontSize: "var(--t-body-sm)", fontWeight: 700, cursor: "pointer" }}>Approve all</button>
                )}
              </div>
              {/* Card with request rows */}
              <div style={{ background: "var(--surface)", borderRadius: "var(--r-panel)", border: "1px solid transparent", boxShadow: "var(--sh-1)", overflow: "hidden" }}>
                {sec.items.map((it, i) => (
                  <div key={it.id} style={{ display: "flex", alignItems: "center", gap: 13, padding: "14px 14px", borderTop: i === 0 ? "none" : "1px solid var(--line-2)" }}>
                    <button onClick={() => nav.push("approveDetail", { kind: sec.kind, id: it.id })}
                      style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 13, border: "none", background: "transparent", padding: 0, textAlign: "left", cursor: "pointer", fontFamily: "var(--font)" }}>
                      <span style={{ width: 44, height: 44, borderRadius: "50%", flexShrink: 0, display: "grid", placeItems: "center", background: "#395F61", color: "#fff", fontSize: "var(--t-body-sm)", fontWeight: 700, letterSpacing: "0.02em" }}>{ApprovalInitials(it.name)}</span>
                      <span style={{ minWidth: 0 }}>
                        <span style={{ display: "block", fontSize: "var(--t-title)", fontWeight: 700, lineHeight: 1.25 }}>{it.name}</span>
                        <span style={{ display: "block", fontSize: "var(--t-body-sm)", color: "var(--ink-3)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sec.kind !== 'expense' ? `${it.type} · ` : ''}{it.range} · {it.meta}</span>
                      </span>
                    </button>
                    <button onClick={() => store.approveRequest(sec.kind, it.id)}
                      style={{ flexShrink: 0, border: "none", borderRadius: "var(--r-pill)", padding: "9px 18px", background: "var(--green)", color: "#fff", fontFamily: "var(--font)", fontSize: "var(--t-body-sm)", fontWeight: 700, cursor: "pointer", minHeight: 40 }}>
                      Approve
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </React.Fragment>
      )}

      {/* Processed history */}
      {processed.length > 0 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, margin: "0 4px 10px" }}>
            <span style={{ fontSize: "var(--t-caption)", fontWeight: 600, letterSpacing: "0.005em", textTransform: "none", color: "var(--ink-3)" }}>Processed</span>
            <span style={{ minWidth: 18, height: 18, padding: "0 5px", borderRadius: "var(--r-pill)", background: "var(--surface-2)", color: "var(--ink-3)", fontSize: 11, fontWeight: 700, lineHeight: "18px", textAlign: "center", boxSizing: "border-box" }}>{processed.length}</span>
          </div>
          <div style={{ background: "var(--surface)", borderRadius: "var(--r-panel)", border: "1px solid transparent", boxShadow: "var(--sh-1)", overflow: "hidden" }}>
            {processed.map((p, i) => {
              const approved = p._action === "approve";
              return (
                <div key={p.id + p._at} style={{ display: "flex", alignItems: "center", gap: 13, padding: "13px 14px", borderTop: i === 0 ? "none" : "1px solid var(--line-2)" }}>
                  <span style={{ width: 40, height: 40, borderRadius: "50%", flexShrink: 0, display: "grid", placeItems: "center", background: "#395F61", color: "#fff", fontSize: "var(--t-body-sm)", fontWeight: 700 }}>{ApprovalInitials(p.name)}</span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: "block", fontSize: "var(--t-title)", fontWeight: 700, lineHeight: 1.25 }}>{p.name}</span>
                    <span style={{ display: "block", fontSize: "var(--t-body-sm)", color: "var(--ink-3)", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.category ? timeOf(p._at) : `${p.type} · ${timeOf(p._at)}`}</span>
                    {!approved && p._reason && <span style={{ display: "block", fontSize: "var(--t-caption)", color: "var(--ink-4)", marginTop: 2, fontStyle: "italic" }}>“{p._reason}”</span>}
                  </span>
                  <Badge tone={approved ? "ok" : "danger"} dot style={{ flexShrink: 0, alignSelf: "center" }}>{approved ? "Approved" : "Rejected"}</Badge>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------- Approve detail (full screen) ----------------
function ApproveDetailScreen({ nav, store, params }) {
  const { kind, id } = params;
  const item = (store.approvals[kind] || []).find(x => x.id === id);
  const isExpense = kind === "expense";
  const [receiptOpen, setReceiptOpen] = useStateM(false);
  const [rejectOpen, setRejectOpen] = useStateM(false);
  const [reason, setReason] = useStateM("");

  if (!item) {
    return (
      <div style={{ padding: "40px 16px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 14 }}>
        <span style={{ width: 60, height: 60, borderRadius: 18, display: "grid", placeItems: "center", background: "var(--ok-bg)", color: "var(--ok)" }}><Icon name="checkCirc" size={32} sw={1.8} /></span>
        <div style={{ fontSize: "var(--t-title)", fontWeight: 700 }}>This request has been handled</div>
        <Button variant="ghost" onClick={() => nav.pop()}>Back to approvals</Button>
      </div>
    );
  }

  const rows = isExpense
    ? [["Date", `${item.range} 2026`], ["Registered", item.registered]]
    : [["Type", item.type], ["Period", `${item.range} 2026`], ["Duration", item.meta], ["Registered", item.registered]];

  return (
    <div style={{ padding: "8px 16px 24px", display: "flex", flexDirection: "column", gap: 18, minHeight: "100%", boxSizing: "border-box" }}>
      {/* Person header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ width: 52, height: 52, borderRadius: "50%", flexShrink: 0, display: "grid", placeItems: "center", background: "#395F61", color: "#fff", fontSize: "var(--t-title)", fontWeight: 700 }}>{ApprovalInitials(item.name)}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "var(--t-h3)", fontWeight: 700, lineHeight: 1.15 }}>{item.name}</div>
          <div style={{ fontSize: "var(--t-body-sm)", color: "var(--ink-3)", marginTop: 2 }}>{item.role}</div>
        </div>
        <Badge tone="info" dot>Awaiting approval</Badge>
      </div>

      {/* Section label */}
      <div style={{ fontSize: "var(--t-caption)", fontWeight: 600, letterSpacing: "0.005em", textTransform: "none", color: "var(--ink-3)", margin: "2px 2px -4px" }}>{isExpense ? "Expense" : "Absence"}</div>

      {/* Detail card */}
      <div style={{ background: "var(--surface)", borderRadius: "var(--r-panel)", border: "1px solid transparent", boxShadow: "var(--sh-1)", overflow: "hidden" }}>
        {rows.map(([k, v], i) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "14px 16px", borderTop: i === 0 ? "none" : "1px solid var(--line-2)" }}>
            <span style={{ fontSize: "var(--t-body)", color: "var(--ink-3)", flexShrink: 0 }}>{k}</span>
            <span style={{ fontSize: "var(--t-body)", fontWeight: "var(--w-semibold)", textAlign: "right", whiteSpace: "nowrap" }}>{v}</span>
          </div>
        ))}
        {item.impact && (() => {
          const neg = /^[−-]/.test(item.impact);
          const flat = /no change/i.test(item.impact);
          const col = flat ? "var(--ink-2)" : neg ? "var(--danger)" : "var(--ok)";
          return (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "14px 16px", background: flat ? "var(--surface-1)" : (neg ? "var(--danger-bg)" : "var(--ok-bg)"), borderTop: "1px solid var(--line-2)" }}>
              <span style={{ fontSize: "var(--t-body)", fontWeight: "var(--w-semibold)", color: "var(--ink)", flexShrink: 0 }}>Impact on pay</span>
              <span style={{ fontSize: "var(--t-body)", fontWeight: "var(--w-semibold)", color: col, whiteSpace: "nowrap" }}>{item.impact}</span>
            </div>
          );
        })()}
      </div>

      {/* Receipt (expense only, clickable) */}
      {isExpense && (
        <button onClick={() => setReceiptOpen(true)}
          style={{ display: "flex", alignItems: "center", gap: 13, width: "100%", padding: "14px 16px", background: "var(--surface)", border: "1px solid transparent", borderRadius: "var(--r-panel)", boxShadow: "var(--sh-1)", cursor: "pointer", fontFamily: "var(--font)" }}>
          <span style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, display: "grid", placeItems: "center", background: "var(--green-soft)", color: "var(--green-deep)" }}><Icon name="doc" size={22} /></span>
          <span style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
            <span style={{ display: "block", fontSize: "var(--t-title)", fontWeight: 700 }}>Receipt attached</span>
            <span style={{ display: "block", fontSize: "var(--t-body-sm)", color: "var(--ink-3)", marginTop: 2 }}>{item.meta}</span>
          </span>
          <span style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 4, color: "var(--signature)", fontWeight: 700, fontSize: "var(--t-body-sm)" }}>View <Icon name="chevR" size={18} stroke="var(--signature)" /></span>
        </button>
      )}

      {/* Note banner */}
      <div style={{ display: "flex", gap: 11, alignItems: "flex-start", padding: "14px 16px", background: "var(--info-bg)", border: "1px solid var(--info)", borderRadius: "var(--r-panel)" }}>
        <span style={{ flexShrink: 0, marginTop: 1 }}><Icon name="info" size={19} stroke="var(--info)" /></span>
        <div style={{ fontSize: "var(--t-body)", color: "var(--ink-2)", lineHeight: 1.5 }}>{item.note}</div>
      </div>

      {/* Actions */}
      <div style={{ marginTop: "auto", paddingTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
        <Button variant="approve" full onClick={() => { store.approveRequest(kind, id); nav.pop(); }}>Approve</Button>
        <Button variant="danger" full onClick={() => setRejectOpen(true)}>Reject</Button>
      </div>

      {/* Receipt viewer */}
      <Sheet open={receiptOpen} onClose={() => setReceiptOpen(false)} title="Receipt" sub={item.meta}>
        {(() => {
          const total = parseInt(String(item.meta).replace(/[^\d]/g, ""), 10) || 0;
          const net = Math.round(total / 1.25);
          const vat = total - net;
          const kr = (n) => n.toLocaleString("sv-SE") + " kr";
          const vendor = { Consumables: "STÄDDEPÅN AB", Travel: "SJ AB", Equipment: "CLAS OHLSON" }[item.category] || "KVITTO AB";
          return (
            <div style={{ padding: "2px 2px 12px" }}>
              <div style={{ background: "#fff", borderRadius: 12, border: "1px solid transparent", boxShadow: "var(--sh-1)", overflow: "hidden", fontFamily: "var(--font-mono, ui-monospace, monospace)", color: "var(--ink)" }}>
                <div style={{ padding: "20px 22px 16px", textAlign: "center", borderBottom: "1px dashed var(--line)" }}>
                  <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "0.12em" }}>{vendor}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4 }}>Org.nr 556xxx-xxxx · {item.range} 2026</div>
                </div>
                <div style={{ padding: "16px 22px", display: "flex", flexDirection: "column", gap: 11, fontSize: 13, whiteSpace: "nowrap" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><span style={{ color: "var(--ink-2)" }}>{item.category || "Item"}</span><span>{kr(net)}</span></div>
                  <div style={{ height: 1, borderTop: "1px dashed var(--line)" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--ink-3)" }}><span>Net</span><span>{kr(net)}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--ink-3)" }}><span>VAT 25%</span><span>{kr(vat)}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 15, paddingTop: 4, borderTop: "1px solid var(--line-2)" }}><span>TOTAL</span><span>{kr(total)}</span></div>
                </div>
                <div style={{ padding: "12px 22px 18px", textAlign: "center", fontSize: 11, color: "var(--ink-4)", borderTop: "1px dashed var(--line)" }}>
                  Card ····6677 · Approved<br />Thank you for your purchase
                </div>
              </div>
            </div>
          );
        })()}
      </Sheet>

      {/* Reject reason */}
      <Sheet open={rejectOpen} onClose={() => setRejectOpen(false)} title="Reject" sub={`Let ${item.name.split(" ")[0]} know why this was rejected`}>
        <div style={{ padding: "4px 2px 8px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="ds-field">
            <label className="ds-label" htmlFor="reject-reason">Reason</label>
            <textarea id="reject-reason" className="ds-input" rows={3} autoFocus value={reason}
              onChange={(e) => setReason(e.target.value)} placeholder="e.g. Not enough cover on these dates"
              style={{ resize: "none", lineHeight: 1.45, padding: "12px 14px", height: "auto" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Button variant="danger" full disabled={!reason.trim()} onClick={() => { store.rejectRequest(kind, id, reason.trim()); setRejectOpen(false); nav.pop(); }}>Confirm rejection</Button>
            <Button variant="ghost" full onClick={() => setRejectOpen(false)}>Cancel</Button>
          </div>
        </div>
      </Sheet>
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

// ---------------- Bank accounts screen ----------------
function BankAccountsScreen({ store }) {
  const accounts = store.bankAccounts || [];
  const [confirmId, setConfirmId] = useStateM(null);
  const confirmAcct = accounts.find(a => a.id === confirmId);
  const canDelete = accounts.length > 1;

  return (
    <div style={{ padding: "8px 16px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
      <p style={{ margin: "0 2px", fontSize: "var(--t-body)", color: "var(--ink-3)", lineHeight: 1.5 }}>
        Your salary is paid to the account marked <b style={{ color: "var(--ink)" }}>Salary account</b>. You can switch which account receives your pay, or remove an account you no longer use.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {accounts.map((a) => (
          <div key={a.id} style={{
            background: "var(--surface)", borderRadius: "var(--r-panel)", overflow: "hidden",
            border: a.primary ? "1.5px solid var(--signature)" : "1px solid var(--line-2)",
            boxShadow: "var(--sh-1)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 16px 14px" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, display: "grid", placeItems: "center", background: "#053F22", color: "#fff" }}>
                <Icon name="wallet" size={22} stroke="#fff" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "var(--t-title)", fontWeight: 700, lineHeight: 1.2 }}>{a.bank}</div>
                <div style={{ fontSize: "var(--t-body-sm)", color: "var(--ink-3)", marginTop: 2 }}>{a.clearing} · {a.number}</div>
              </div>
              {a.primary && <Badge tone="ok" dot>Salary account</Badge>}
            </div>
            <div style={{ height: 1, background: "var(--line-2)", margin: "0 16px" }} />
            <div style={{ display: "flex", padding: "8px 8px" }}>
              {!a.primary && (
                <button onClick={() => { store.setPrimaryBank(a.id); store.setFlash && store.setFlash("Salary account updated"); }}
                  style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "10px 12px", border: "none", background: "transparent", color: "var(--signature)", fontFamily: "var(--font)", fontSize: "var(--t-body-sm)", fontWeight: 600, cursor: "pointer", borderRadius: 10 }}>
                  <Icon name="check" size={17} stroke="var(--signature)" /> Use for salary
                </button>
              )}
              {canDelete && (
                <button onClick={() => setConfirmId(a.id)}
                  style={{ flex: a.primary ? 1 : "0 0 auto", marginLeft: a.primary ? 0 : "auto", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "10px 16px", border: "none", background: "transparent", color: "var(--danger)", fontFamily: "var(--font)", fontSize: "var(--t-body-sm)", fontWeight: 600, cursor: "pointer", borderRadius: 10 }}>
                  <Icon name="trash" size={17} stroke="var(--danger)" /> Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => store.setFlash && store.setFlash("Adding an account is not available in this prototype")}
        style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px", borderRadius: "var(--r-panel)", border: "1.5px dashed var(--line)", background: "transparent", color: "var(--signature)", fontFamily: "var(--font)", fontSize: "var(--t-body)", fontWeight: 600, cursor: "pointer" }}>
        <Icon name="plus" size={20} stroke="var(--signature)" /> Add bank account
      </button>

      {/* Delete confirmation sheet */}
      <Sheet open={!!confirmId} onClose={() => setConfirmId(null)} title="Remove bank account?">
        {confirmAcct && (
          <div style={{ padding: "4px 4px 8px", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "var(--surface-1)", border: "1px solid transparent", borderRadius: "var(--r-panel)" }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, flexShrink: 0, display: "grid", placeItems: "center", background: "#053F22", color: "#fff" }}>
                <Icon name="wallet" size={20} stroke="#fff" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "var(--t-title)" }}>{confirmAcct.bank}</div>
                <div style={{ fontSize: "var(--t-body-sm)", color: "var(--ink-3)" }}>{confirmAcct.clearing} · {confirmAcct.number}</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 11, alignItems: "flex-start", padding: "12px 14px", background: "var(--warn-bg)", borderRadius: "var(--r-panel)" }}>
              <span style={{ flexShrink: 0, marginTop: 1 }}><Icon name="info" size={19} stroke="var(--warn)" /></span>
              <div style={{ fontSize: "var(--t-body-sm)", color: "var(--ink-2)", lineHeight: 1.5 }}>
                {confirmAcct.primary
                  ? <>This is your <b>salary account</b>. If you remove it, you must set another account for salary before the next pay run — otherwise your pay cannot be paid out.</>
                  : <>This account will be removed from your profile. It won't affect any pay that has already been paid out. You can add it again later.</>}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Button variant="danger" full onClick={() => { store.removeBank(confirmAcct.id); setConfirmId(null); store.setFlash && store.setFlash("Bank account removed"); }}>
                Yes, remove account
              </Button>
              <Button variant="ghost" full onClick={() => setConfirmId(null)}>Cancel</Button>
            </div>
          </div>
        )}
      </Sheet>
    </div>
  );
}

// ---------------- Calendar (employee registrations) ----------------
const CAL_STATUS = {
  action:   { tone: "warn",    label: "Action required" },
  pending:  { tone: "info",    label: "Awaiting approval" },
  approved: { tone: "ok",      label: "Approved" },
  rejected: { tone: "danger",  label: "Rejected" },
};
const CAL_DOT = { ok: "var(--ok)", warn: "var(--warn)", info: "var(--info)", brand: "var(--signature)", neutral: "var(--ink-3)", danger: "var(--danger)" };

function CalendarScreen({ nav, store }) {
  const events = CALENDAR_EVENTS;
  const byDate = {};
  events.forEach(e => e.dates.forEach(d => { (byDate[d] = byDate[d] || []).push(e); }));

  const [cursor, setCursor] = useStateM({ y: 2026, m: 5 }); // June 2026
  const [selected, setSelected] = useStateM("2026-06-08");

  const pad = (n) => String(n).padStart(2, "0");
  const iso = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
  const first = new Date(cursor.y, cursor.m, 1);
  const startCol = (first.getDay() + 6) % 7; // Mon = 0
  const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate();
  const monthLabel = first.toLocaleString("en-GB", { month: "long", year: "numeric" });
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const cells = [];
  for (let i = 0; i < startCol; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const move = (delta) => { const nm = cursor.m + delta; setCursor({ y: cursor.y + Math.floor(nm / 12), m: ((nm % 12) + 12) % 12 }); setSelected(null); };
  const _now = new Date();
  const todayISO = iso(_now.getFullYear(), _now.getMonth(), _now.getDate());
  const goToday = () => { setCursor({ y: _now.getFullYear(), m: _now.getMonth() }); setSelected(todayISO); };

  const selEvents = selected ? (byDate[selected] || []) : [];
  const selLabel = selected ? new Date(selected).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }) : null;

  return (
    <div style={{ padding: "8px 16px 28px", display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Calendar card */}
      <div style={{ background: "var(--surface)", borderRadius: "var(--r-panel)", border: "1px solid transparent", boxShadow: "var(--sh-1)", padding: "14px 14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <button onClick={() => move(-1)} aria-label="Previous month" style={{ width: 36, height: 36, display: "grid", placeItems: "center", border: "none", background: "transparent", borderRadius: 10, cursor: "pointer", color: "var(--ink-2)" }}><Icon name="chevL" size={20} /></button>
          <div style={{ fontSize: "var(--t-title)", fontWeight: 700 }}>{monthLabel}</div>
          <button onClick={() => move(1)} aria-label="Next month" style={{ width: 36, height: 36, display: "grid", placeItems: "center", border: "none", background: "transparent", borderRadius: 10, cursor: "pointer", color: "var(--ink-2)" }}><Icon name="chevR" size={20} /></button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 4 }}>
          {weekdays.map(w => (
            <div key={w} style={{ textAlign: "center", fontSize: "var(--t-caption)", fontWeight: 700, color: "var(--ink-4)", padding: "2px 0" }}>{w}</div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
          {cells.map((d, i) => {
            if (d === null) return <div key={"b" + i} />;
            const date = iso(cursor.y, cursor.m, d);
            const evs = byDate[date] || [];
            const isSel = selected === date;
            const isToday = date === todayISO;
            return (
              <button key={date} onClick={() => setSelected(date)}
                style={{ position: "relative", minHeight: 46, display: "flex", alignItems: "center", justifyContent: "center",
                  border: isToday && !isSel ? "1.5px solid var(--signature)" : "1.5px solid transparent", borderRadius: 11, cursor: "pointer", fontFamily: "var(--font)",
                  background: isSel ? "var(--signature)" : "transparent",
                  color: isSel ? "#fff" : (isToday ? "var(--signature)" : "var(--ink)"), fontSize: "var(--t-body)", fontWeight: (isSel || isToday) ? 700 : 500 }}>
                {d}
                {evs.length > 0 && (
                  <span style={{ position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)", width: 5, height: 5, borderRadius: 99, background: isSel ? "rgba(255,255,255,0.85)" : CAL_DOT[evs[0].tone] }} />
                )}
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
          <button onClick={goToday} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: "var(--r-pill)", border: "1px solid var(--line)", background: "var(--surface-1)", color: "var(--signature)", fontFamily: "var(--font)", fontSize: "var(--t-body-sm)", fontWeight: 700, cursor: "pointer" }}>Today</button>
        </div>
      </div>

      {/* Selected day detail */}
      <div>
        <div style={{ fontSize: "var(--t-caption)", fontWeight: 600, letterSpacing: "0.005em", textTransform: "none", color: "var(--ink-3)", padding: "0 4px 10px" }}>
          {selected ? selLabel : "Select a day"}
        </div>
        {selEvents.length > 0 ? (
          <List>
            {selEvents.map(e => {
              const m = CAL_STATUS[e.status] || CAL_STATUS.pending;
              return (
                <Row key={e.id} icon={e.icon} title={e.title}
                  sub={<div style={{ display: "flex", flexDirection: "column", gap: 1 }}><span>{e.meta}</span><span style={{ fontSize: "var(--t-caption)", color: "var(--ink-4)" }}>{e.note}</span></div>}
                  onClick={() => nav.push("regDetail", { id: e.id })}
                  right={<Badge tone={m.tone} dot>{m.label}</Badge>} />
              );
            })}
          </List>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px", background: "var(--surface)", border: "1px solid transparent", borderRadius: "var(--r-panel)", boxShadow: "var(--sh-1)" }}>
            <span style={{ width: 38, height: 38, borderRadius: 12, flexShrink: 0, display: "grid", placeItems: "center", background: "var(--surface-2)", color: "var(--ink-3)" }}><Icon name="calendar" size={20} /></span>
            <div style={{ fontSize: "var(--t-body)", color: "var(--ink-3)" }}>{selected ? "Nothing registered on this day." : "Tap a day to see your registrations."}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------- Registration detail (from calendar) ----------------
function RegDetailScreen({ nav, store, params }) {
  const e = CALENDAR_EVENTS.find(x => x.id === params.id);
  if (!e) return <div style={{ padding: 24, color: "var(--ink-3)" }}>Not found.</div>;
  const m = CAL_STATUS[e.status] || CAL_STATUS.pending;
  const isExpense = e.icon === "receipt";
  const fmt = (d) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  const when = e.dates.length > 1 ? `${fmt(e.dates[0])} – ${fmt(e.dates[e.dates.length - 1])}` : fmt(e.dates[0]);
  const rows = isExpense
    ? [["Amount", e.meta], ["Date", when]]
    : [["Type", e.title], ["Period", when], ["Duration", e.meta]];

  return (
    <div style={{ padding: "8px 16px 24px", display: "flex", flexDirection: "column", gap: 18, minHeight: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, paddingTop: 4 }}>
        <div style={{ width: 52, height: 52, borderRadius: 15, display: "grid", placeItems: "center", background: "#053F22", color: "#fff", flexShrink: 0 }}><Icon name={e.icon} size={26} /></div>
        <div style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
          <div style={{ fontSize: "var(--t-h3)", fontWeight: 700, lineHeight: 1.15 }}>{e.title}</div>
          <div style={{ fontSize: "var(--t-body-sm)", color: "var(--ink-3)", marginTop: 2 }}>{when}</div>
        </div>
        <Badge tone={m.tone} dot style={{ flexShrink: 0 }}>{m.label}</Badge>
      </div>

      <div style={{ background: "var(--surface)", borderRadius: "var(--r-panel)", border: "1px solid transparent", boxShadow: "var(--sh-1)", overflow: "hidden" }}>
        {rows.map(([k, v], i) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "14px 16px", borderTop: i === 0 ? "none" : "1px solid var(--line-2)" }}>
            <span style={{ fontSize: "var(--t-body)", color: "var(--ink-3)", flexShrink: 0 }}>{k}</span>
            <span style={{ fontSize: "var(--t-body)", fontWeight: "var(--w-semibold)", textAlign: "right", whiteSpace: "nowrap" }}>{v}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 11, alignItems: "flex-start", padding: "14px 16px", background: "var(--info-bg)", border: "1px solid var(--info)", borderRadius: "var(--r-panel)" }}>
        <span style={{ flexShrink: 0, marginTop: 1 }}><Icon name="info" size={19} stroke="var(--info)" /></span>
        <div style={{ fontSize: "var(--t-body)", color: "var(--ink-2)", lineHeight: 1.5 }}>{e.note}</div>
      </div>
    </div>
  );
}

// ---------------- Employment details ----------------
function EmploymentDetailsScreen({ store }) {
  const me = store.ME;
  const personal = [
    ["Name", me.name],
    ["Personal ID", me.personalId],
    ["Address", me.address],
    ["Phone", me.phone],
    ["Email", me.email],
  ];
  const employment = [
    ["Employer", store.activeCompany.name],
    ["Role", store.activeCompany.role],
    ["Employment type", me.employmentType],
    ["Start date", me.startDate],
    ["Manager", me.manager],
  ];
  const renderSection = (label, rows) => (
    <div>
      <SectionLabel>{label}</SectionLabel>
      <Card pad={0}>
        <div style={{ padding: "4px 16px" }}>
          {rows.map(([k, v], i) => (
            <div key={k} style={{ display: "flex", flexDirection: "column", gap: 2, padding: "12px 0", borderBottom: i < rows.length - 1 ? "1px solid var(--line-2)" : "none" }}>
              <span style={{ fontSize: "var(--t-caption)", color: "var(--ink-3)" }}>{k}</span>
              <span style={{ fontSize: "var(--t-body)", fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
  return (
    <div style={{ padding: "4px 16px 28px", display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "4px 4px 0" }}>
        <div className="ds-avatar ds-avatar--lg">{me.name.split(" ").map(s => s[0]).join("")}</div>
        <div>
          <div style={{ fontSize: "var(--t-h3)", fontWeight: 700 }}>{me.name}</div>
          <div style={{ fontSize: "var(--t-body-sm)", color: "var(--ink-3)" }}>{store.activeCompany.role} · {store.activeCompany.name}</div>
        </div>
      </div>
      {renderSection("Personal details", personal)}
      {renderSection("Employment", employment)}
    </div>
  );
}

// ---------------- Team (manager) ----------------
function TeamScreen({ nav, store }) {
  const team = [...(store.team || [])].sort((a, b) => a.name.localeCompare(b.name, "sv"));
  const pend = {};
  ["absence", "expense"].forEach(k => (store.approvals[k] || []).forEach(x => { pend[x.name] = (pend[x.name] || 0) + 1; }));
  return (
    <div style={{ padding: "8px 16px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
      <p style={{ margin: "0 2px", fontSize: "var(--t-body)", color: "var(--ink-3)", lineHeight: 1.5 }}>
        You approve absence and expenses for these employees.
      </p>
      <div style={{ background: "var(--surface)", borderRadius: "var(--r-panel)", border: "1px solid transparent", boxShadow: "var(--sh-1)", overflow: "hidden" }}>
        {team.map((p, i) => (
          <button key={p.id || p.name} onClick={() => nav.push("employeeDetail", { id: p.id })}
            style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 13, padding: "13px 14px", border: 0, borderTop: i === 0 ? "0" : "1px solid var(--line-2)", background: "transparent", cursor: "pointer", fontFamily: "var(--font)" }}>
            <span style={{ width: 42, height: 42, borderRadius: "50%", flexShrink: 0, display: "grid", placeItems: "center", background: "#395F61", color: "#fff", fontSize: "var(--t-body-sm)", fontWeight: 700 }}>{ApprovalInitials(p.name)}</span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: "block", fontSize: "var(--t-title)", fontWeight: 700, lineHeight: 1.25 }}>{p.name}</span>
              <span style={{ display: "block", fontSize: "var(--t-body-sm)", color: "var(--ink-3)", marginTop: 1 }}>{p.role}</span>
            </span>
            {pend[p.name]
              ? <Badge tone="info" dot>{`${pend[p.name]} pending`}</Badge>
              : <Badge tone="ok" dot>Up to date</Badge>}
            <Icon name="chevR" size={20} stroke="var(--ink-4)" style={{ flexShrink: 0 }} />
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------- Employee detail (manager taps a team member) ----------------
function EmployeeDetailScreen({ nav, store, params }) {
  const member = (store.team || []).find(m => m.id === params.id);
  if (!member) return <div style={{ padding: 24, color: "var(--ink-3)" }}>Not found.</div>;
  const pending = [
    ...(store.approvals.absence || []).filter(x => x.name === member.name).map(x => ({ ...x, _kind: "absence" })),
    ...(store.approvals.expense || []).filter(x => x.name === member.name).map(x => ({ ...x, _kind: "expense" })),
  ];
  return (
    <div style={{ padding: "8px 16px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Person header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ width: 52, height: 52, borderRadius: "50%", flexShrink: 0, display: "grid", placeItems: "center", background: "#395F61", color: "#fff", fontSize: "var(--t-title)", fontWeight: 700 }}>{ApprovalInitials(member.name)}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "var(--t-h3)", fontWeight: 700, lineHeight: 1.15 }}>{member.name}</div>
          <div style={{ fontSize: "var(--t-body-sm)", color: "var(--ink-3)", marginTop: 2 }}>{member.role}</div>
        </div>
      </div>

      {/* Wellbeing flag */}
      {member.flag && (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 11, padding: "12px 14px", background: "var(--warn-soft)", border: "1px solid color-mix(in srgb, var(--warn) 22%, transparent)", borderRadius: "var(--r-panel)" }}>
          <span style={{ flexShrink: 0, marginTop: 1, color: "var(--warn)" }}><Icon name="warn" size={18} /></span>
          <span style={{ fontSize: "var(--t-body-sm)", color: "var(--warn-text)", lineHeight: 1.4 }}>{member.flag}</span>
        </div>
      )}

      {/* Balances — same as the employee sees their own */}
      <BalanceTiles balances={member.balances || []} title="Balances" nav={nav} personId={member.id} />

      {/* Needs your approval */}
      <div>
        <SectionLabel>Needs your approval</SectionLabel>
        {pending.length === 0 ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px", background: "var(--surface)", border: "1px solid transparent", borderRadius: "var(--r-panel)", boxShadow: "var(--sh-1)" }}>
            <span style={{ width: 36, height: 36, borderRadius: 11, flexShrink: 0, display: "grid", placeItems: "center", background: "var(--ok-soft)", color: "var(--ok)" }}><Icon name="check" size={19} sw={2.2} /></span>
            <span style={{ fontSize: "var(--t-body)", color: "var(--ink-3)" }}>Up to date — nothing waiting for approval.</span>
          </div>
        ) : (
          <div style={{ background: "var(--surface)", borderRadius: "var(--r-panel)", border: "1px solid transparent", boxShadow: "var(--sh-1)", overflow: "hidden" }}>
            {pending.map((it, i) => (
              <div key={it.id} style={{ display: "flex", alignItems: "center", gap: 13, padding: "14px 14px", borderTop: i === 0 ? "none" : "1px solid var(--line-2)" }}>
                <button onClick={() => nav.push("approveDetail", { kind: it._kind, id: it.id })}
                  style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 13, border: "none", background: "transparent", padding: 0, textAlign: "left", cursor: "pointer", fontFamily: "var(--font)" }}>
                  <span style={{ width: 38, height: 38, borderRadius: 11, flexShrink: 0, display: "grid", placeItems: "center", background: "var(--green-soft)", color: "var(--green-deep)" }}>
                    <Icon name={it._kind === "expense" ? "receipt" : "calendar"} size={20} />
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <span style={{ display: "block", fontSize: "var(--t-title)", fontWeight: 700, lineHeight: 1.25 }}>{it._kind === "expense" ? "Expense" : it.type}</span>
                    <span style={{ display: "block", fontSize: "var(--t-body-sm)", color: "var(--ink-3)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.range} · {it.meta}</span>
                  </span>
                </button>
                <button onClick={() => store.approveRequest(it._kind, it.id)}
                  style={{ flexShrink: 0, border: "none", borderRadius: "var(--r-pill)", padding: "9px 18px", background: "var(--green)", color: "#fff", fontFamily: "var(--font)", fontSize: "var(--t-body-sm)", fontWeight: 700, cursor: "pointer", minHeight: 40 }}>
                  Approve
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

// ---------------- Employees (approvals + team) ----------------
function EmployeesScreen({ nav, store }) {
  const approvalCount = store.approvals.absence.length + store.approvals.expense.length;
  const teamCount = (store.team || []).length;
  const cards = [
    { id: "approvals", icon: "approvals", title: "Approvals", sub: "Requests waiting for your approval", count: approvalCount },
    { id: "team", icon: "user", title: "Team", sub: `${teamCount} employees you approve for`, count: 0 },
  ];
  return (
    <div style={{ padding: "12px 16px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
      {cards.map(c => (
        <button key={c.id} onClick={() => nav.push(c.id)}
          style={{ display: "flex", alignItems: "center", gap: 16, textAlign: "left", width: "100%",
            border: "1px solid transparent", background: "var(--surface)", borderRadius: "var(--r-panel)",
            padding: 18, cursor: "pointer", boxShadow: "var(--sh-1)", fontFamily: "var(--font)" }}>
          <span style={{ width: 52, height: 52, borderRadius: 15, flexShrink: 0, display: "grid", placeItems: "center", background: "var(--green-soft)", color: "var(--green-deep)" }}>
            <Icon name={c.icon} size={26} />
          </span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: "var(--t-h3)", fontWeight: 700 }}>{c.title}</span>
              {c.count > 0 && (
                <span style={{ width: 22, height: 22, padding: 0, display: "grid", placeItems: "center", borderRadius: "var(--r-pill)", background: "var(--ink-3)", color: "#fff", fontSize: 12, fontWeight: 700, lineHeight: 1, textAlign: "center", boxSizing: "border-box", flexShrink: 0 }}>{c.count}</span>
              )}
            </span>
            <span style={{ display: "block", fontSize: "var(--t-body-sm)", color: "var(--ink-3)", marginTop: 2 }}>{c.sub}</span>
          </span>
          <Icon name="chevR" size={22} stroke="var(--ink-4)" style={{ flexShrink: 0 }} />
        </button>
      ))}
    </div>
  );
}

Object.assign(window, { MeScreen, EmployeesScreen, PayslipsScreen, PayslipDetail, PayslipCheck, UpcomingScreen, HistoryScreen, StatusDetail, NotificationsScreen, ProfileScreen, CompaniesScreen, BankAccountsScreen, ApprovalsScreen, ApproveDetailScreen, CalendarScreen, RegDetailScreen, TeamScreen, EmployeeDetailScreen, BalanceDetailScreen, EmploymentDetailsScreen });
