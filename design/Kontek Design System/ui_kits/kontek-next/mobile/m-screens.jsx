/* Kontek Next — Mobile screens (shared by both nav variants).
   Each screen renders ONLY the scrollable body (large title + content);
   the app shell supplies the top chrome and the navigation.
   Brand tokens come from ../tokens.css. Open Sans throughout. */
const { useState: sUseState } = React;

/* ---------- shared bits ---------- */
const MUI = 'var(--font-ui)';

function MScreen({ children }) {
  return (
    <div style={{ fontFamily: MUI, color: 'var(--ink)', padding: '8px 20px 28px', display: 'flex', flexDirection: 'column' }}>
      {children}
    </div>
  );
}

function MTitle({ eyebrow, title, sub }) {
  return (
    <div style={{ margin: '6px 2px 20px' }}>
      {eyebrow && <div style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--green-deep)' }}>{eyebrow}</div>}
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, lineHeight: 1.08, letterSpacing: '-0.02em', fontWeight: 700, color: 'var(--ink)', margin: eyebrow ? '7px 0 0' : 0 }}>{title}</h1>
      {sub && <p style={{ fontSize: 14.5, color: 'var(--ink-3)', margin: '7px 0 0', lineHeight: 1.45, textWrap: 'pretty' }}>{sub}</p>}
    </div>
  );
}

function MSectionHeader({ title, action, onAction }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '26px 2px 12px' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--ink)', margin: 0 }}>{title}</h2>
      {action && (
        <button onClick={onAction} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: MUI, fontSize: 13, fontWeight: 600, color: 'var(--green-deep)', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
          {action} <MIcon name="chevronRight" size={14} stroke="var(--green-deep)" />
        </button>
      )}
    </div>
  );
}

function MStatusPill({ children, tone = 'ok' }) {
  const map = {
    ok: { bg: 'var(--ok-soft)', fg: 'var(--ok-text)' },
    warn: { bg: 'var(--warn-soft)', fg: 'var(--warn-text)' },
    info: { bg: 'var(--info-soft)', fg: 'var(--info-text)' },
    neutral: { bg: 'var(--surface-2)', fg: 'var(--ink-3)' },
  }[tone];
  return (
    <span style={{ fontSize: 11.5, fontWeight: 600, color: map.fg, background: map.bg, borderRadius: 999, padding: '4px 10px', lineHeight: 1.3, whiteSpace: 'nowrap' }}>{children}</span>
  );
}

function MProgress({ pct }) {
  return (
    <div style={{ height: 6, background: 'rgba(238,242,239,0.16)', borderRadius: 999, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: pct + '%', background: 'var(--green)', borderRadius: 999 }} />
    </div>
  );
}

/* The dark payroll-status hero card (Översikt + Lön). */
function MPayrollHero({ onApprove }) {
  return (
    <div style={{ background: 'var(--signature)', borderRadius: 18, padding: 20, boxShadow: 'var(--shadow-md)', position: 'relative', overflow: 'hidden' }}>
      <span aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(120% 80% at 100% 0%, rgba(97,188,143,0.20) 0%, transparent 55%)' }} />
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <span style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(97,188,143,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <MIcon name="checkCircle" size={22} stroke="#61BC8F" />
          </span>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#61BC8F' }}>Lönekörning · Maj</span>
        </div>
        <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--on-dark)', lineHeight: 1.3, textWrap: 'pretty' }}>Norrström Industrier AB är klar för granskning</div>
        <div style={{ fontSize: 13, color: 'var(--on-dark-2)', marginTop: 6, lineHeight: 1.4 }}>32 anställda · utbetalning 25 maj · inga avvikelser</div>
        <div style={{ marginTop: 16 }}><MProgress pct={82} /></div>
        <div style={{ fontSize: 12, color: 'var(--on-dark-3)', marginTop: 8 }}>4 av 5 steg klara — sista steget är ditt godkännande</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 18 }}>
          <button onClick={onApprove} style={{ height: 48, border: 'none', borderRadius: 12, background: '#61BC8F', color: '#122121', fontFamily: MUI, fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 6px 18px rgba(97,188,143,0.30)' }}>
            Granska &amp; godkänn <MIcon name="arrowRight" size={17} stroke="#122121" />
          </button>
          <button style={{ height: 44, borderRadius: 12, background: 'transparent', color: 'var(--on-dark-2)', border: '1px solid rgba(238,242,239,0.18)', fontFamily: MUI, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>Visa detaljer</button>
        </div>
      </div>
    </div>
  );
}

/* ============================ ÖVERSIKT ============================ */
function MProductRow({ icon, name, tagline, stat, statLabel, onClick }) {
  return (
    <button onClick={onClick} style={{ textAlign: 'left', width: '100%', cursor: 'pointer', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, padding: 16, display: 'flex', alignItems: 'center', gap: 14, boxShadow: 'var(--shadow-sm)' }}>
      <span style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--green-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <MIcon name={icon} size={22} stroke="#2E7D5B" />
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>{name}</span>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--green-deep)', fontVariantNumeric: 'tabular-nums' }}>{stat}</span>
          <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{statLabel}</span>
        </span>
        <span style={{ display: 'block', fontSize: 13, color: 'var(--ink-3)', marginTop: 3, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tagline}</span>
      </span>
      <MIcon name="chevronRight" size={18} stroke="var(--ink-4)" />
    </button>
  );
}

function MDashboard({ onNavigate }) {
  return (
    <MScreen>
      <MTitle eyebrow="Måndag 25 maj" title="God morgon, Anna" sub="En körning väntar på dig. Allt annat är lugnt." />
      <MPayrollHero onApprove={() => onNavigate && onNavigate('payroll')} />

      <MSectionHeader title="Dina produkter" action="Hantera" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <MProductRow icon="banknote" name="Lön" tagline="Kör lön, skatt och utbetalningar." stat="1" statLabel="väntar" onClick={() => onNavigate && onNavigate('payroll')} />
        <MProductRow icon="clock" name="Time" tagline="Tid, frånvaro och scheman." stat="7" statLabel="att attestera" onClick={() => onNavigate && onNavigate('time')} />
        <MProductRow icon="orbit" name="Sphere" tagline="Medarbetardata och dokument." stat="32" statLabel="anställda" onClick={() => onNavigate && onNavigate('sphere')} />
      </div>

      <div style={{ marginTop: 16, background: 'var(--surface)', border: '1px solid var(--green-line)', borderRadius: 14, padding: 16, display: 'flex', alignItems: 'center', gap: 14, backgroundImage: 'linear-gradient(100deg, var(--green-soft) 0%, var(--surface) 60%)' }}>
        <span style={{ width: 42, height: 42, borderRadius: 11, background: '#fff', border: '1px solid var(--green-line)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <MIcon name="store" size={21} stroke="#2E7D5B" />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink)' }}>Utöka från Marknadsplatsen</div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-2)', marginTop: 2, lineHeight: 1.4 }}>Pension, reseräkningar och 20+ integrationer.</div>
        </div>
        <MIcon name="arrowUpRight" size={18} stroke="var(--green-deep)" />
      </div>
    </MScreen>
  );
}

/* ============================== LÖN ============================== */
function MStatTile({ value, label }) {
  return (
    <div style={{ flex: 1, minWidth: 0, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, padding: '13px 12px', boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums', lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 4, lineHeight: 1.3 }}>{label}</div>
    </div>
  );
}

function MRunRow({ month, date, amount, isLast }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: isLast ? 'none' : '1px solid var(--line-2)' }}>
      <span style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <MIcon name="banknote" size={18} stroke="var(--ink-3)" />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink)' }}>{month}</div>
        <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 1 }}>Utbetald {date}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>{amount}</div>
        <div style={{ marginTop: 4 }}><MStatusPill tone="ok">Utbetald</MStatusPill></div>
      </div>
    </div>
  );
}

function MLon({ onNavigate }) {
  return (
    <MScreen>
      <MTitle title="Lön" sub="Maj 2025 · Norrström Industrier AB" />
      <button style={{ height: 50, border: 'none', borderRadius: 12, background: 'var(--shell-cta)', color: 'var(--shell-cta-ink)', fontFamily: MUI, fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 18, boxShadow: '0 6px 18px rgba(97,188,143,0.28)' }}>
        <MIcon name="plus" size={19} stroke="var(--shell-cta-ink)" strokeWidth={2.2} /> Ny lönekörning
      </button>

      <MPayrollHero />

      <MSectionHeader title="Den här körningen" />
      <div style={{ display: 'flex', gap: 10 }}>
        <MStatTile value="32" label="anställda" />
        <MStatTile value="1,24 Mkr" label="att utbetala" />
        <MStatTile value="25 maj" label="utbetalning" />
      </div>

      <MSectionHeader title="Tidigare körningar" action="Alla" />
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        <MRunRow month="April 2025" date="25 apr" amount="1,21 Mkr" />
        <MRunRow month="Mars 2025" date="25 mar" amount="1,19 Mkr" />
        <MRunRow month="Februari 2025" date="25 feb" amount="1,18 Mkr" isLast />
      </div>
    </MScreen>
  );
}

/* ============================== TIME ============================== */
function MAttestRow({ initials, name, period, hours, done, onToggle, isLast }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderBottom: isLast ? 'none' : '1px solid var(--line-2)' }}>
      <span style={{ width: 38, height: 38, borderRadius: 999, background: done ? 'var(--green-soft)' : 'var(--guide)', color: done ? '#2E7D5B' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12.5, fontWeight: 600, flexShrink: 0 }}>
        {done ? <MIcon name="check" size={18} stroke="#2E7D5B" strokeWidth={2.4} /> : initials}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14.5, fontWeight: 600, color: done ? 'var(--ink-3)' : 'var(--ink)', textDecoration: done ? 'line-through' : 'none' }}>{name}</div>
        <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 1 }}>{period} · {hours}</div>
      </div>
      <button onClick={onToggle} style={{ cursor: 'pointer', borderRadius: 8, padding: '8px 13px', fontFamily: MUI, fontSize: 13, fontWeight: 600, border: done ? '1px solid var(--line)' : 'none', background: done ? 'var(--surface)' : 'var(--signature)', color: done ? 'var(--ink-3)' : '#fff', whiteSpace: 'nowrap' }}>
        {done ? 'Ångra' : 'Godkänn'}
      </button>
    </div>
  );
}

function MTime() {
  const reports = [
    { id: 1, initials: 'EH', name: 'Erik Holm', period: 'Vecka 20', hours: '38,5 h' },
    { id: 2, initials: 'SN', name: 'Sara Nilsson', period: 'Vecka 20', hours: '40 h' },
    { id: 3, initials: 'JL', name: 'Johan Lund', period: 'Vecka 20', hours: '36 h' },
    { id: 4, initials: 'MA', name: 'Maja Andersson', period: 'Vecka 20', hours: '40 h' },
    { id: 5, initials: 'PB', name: 'Per Berg', period: 'Vecka 20', hours: '32 h' },
    { id: 6, initials: 'LK', name: 'Lina Karlsson', period: 'Vecka 20', hours: '40 h' },
    { id: 7, initials: 'OF', name: 'Oskar Falk', period: 'Vecka 20', hours: '37,5 h' },
  ];
  const [done, setDone] = sUseState({});
  const remaining = reports.length - Object.values(done).filter(Boolean).length;
  const toggle = (id) => setDone(d => ({ ...d, [id]: !d[id] }));

  return (
    <MScreen>
      <MTitle title="Time" sub="Tid, frånvaro och scheman för maj." />

      <div style={{ background: 'var(--signature)', borderRadius: 16, padding: 18, display: 'flex', alignItems: 'center', gap: 14, boxShadow: 'var(--shadow-md)' }}>
        <span style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(97,188,143,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <MIcon name="listChecks" size={22} stroke="#61BC8F" />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--on-dark)', fontVariantNumeric: 'tabular-nums', lineHeight: 1.1 }}>
            {remaining === 0 ? 'Allt klart' : remaining + ' tidrapporter'}
          </div>
          <div style={{ fontSize: 13, color: 'var(--on-dark-2)', marginTop: 2 }}>{remaining === 0 ? 'Inga rapporter väntar på dig.' : 'väntar på din attestering'}</div>
        </div>
      </div>

      <MSectionHeader title="Att attestera" />
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        {reports.map((r, i) => (
          <MAttestRow key={r.id} {...r} done={!!done[r.id]} onToggle={() => toggle(r.id)} isLast={i === reports.length - 1} />
        ))}
      </div>

      <MSectionHeader title="Frånvaro denna vecka" />
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderBottom: '1px solid var(--line-2)' }}>
          <span style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--info-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><MIcon name="plane" size={18} stroke="var(--info)" /></span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink)' }}>Anna Berg</div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 1 }}>Semester · 20–23 maj</div>
          </div>
          <MStatusPill tone="info">Godkänd</MStatusPill>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px' }}>
          <span style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--warn-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><MIcon name="heartPulse" size={18} stroke="var(--warn)" /></span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink)' }}>Tomas Ek</div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 1 }}>VAB · 21 maj</div>
          </div>
          <MStatusPill tone="warn">Väntar</MStatusPill>
        </div>
      </div>
    </MScreen>
  );
}

/* ========================== PLACEHOLDER ========================== */
function MPlaceholder({ icon, name }) {
  return (
    <MScreen>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '64px 24px', gap: 16 }}>
        <span style={{ width: 60, height: 60, borderRadius: 16, background: 'var(--green-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MIcon name={icon} size={28} stroke="#2E7D5B" />
        </span>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--ink)' }}>{name}</div>
          <p style={{ fontSize: 14, color: 'var(--ink-3)', margin: '8px 0 0', lineHeight: 1.5, maxWidth: 240, textWrap: 'pretty' }}>Den här ytan ingår inte i mobilprototypen än — fokus ligger på Översikt, Lön och Time.</p>
        </div>
      </div>
    </MScreen>
  );
}

Object.assign(window, { MScreen, MTitle, MSectionHeader, MStatusPill, MPayrollHero, MDashboard, MLon, MTime, MPlaceholder });
