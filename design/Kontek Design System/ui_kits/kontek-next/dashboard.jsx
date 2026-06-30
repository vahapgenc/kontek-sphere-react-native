// @ds-adherence-ignore -- internal desktop UI kit helper; not a standalone DS component
/* Kontek Next — Dashboard content (greeting, payroll status, products, marketplace nudge) */

function Greeting() {
  return (
    <div style={{ marginBottom: 26 }}>
      <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--green-deep)' }}>Måndag 25 maj</span>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 42, lineHeight: 1.06, letterSpacing: '-0.02em', color: 'var(--ink)', margin: '8px 0 0', fontWeight: 700 }}>
        God morgon, Anna
      </h1>
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: 15, color: 'var(--ink-3)', margin: '8px 0 0' }}>
        En körning väntar på dig. Allt annat är lugnt.
      </p>
    </div>
  );
}

function PayrollStatus() {
  return (
    <div style={{
      background: 'var(--signature)', borderRadius: 16, padding: '22px 24px',
      display: 'flex', alignItems: 'center', gap: 20, boxShadow: 'var(--shadow-md)',
      position: 'relative', overflow: 'hidden',
    }}>
      <span style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(97,188,143,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name="checkCircle" size={24} stroke="#61BC8F" />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#61BC8F' }}>Lönekörning · Maj</span>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 17, fontWeight: 600, color: 'var(--on-dark)', marginTop: 5 }}>
          Norrström Industrier AB är klar för granskning
        </div>
        <div style={{ fontSize: 13.5, color: 'var(--on-dark-2)', marginTop: 3 }}>
          32 anställda · utbetalning 25 maj · inga avvikelser
        </div>
        <div style={{ height: 6, background: 'rgba(238,242,239,0.14)', borderRadius: 999, marginTop: 14, maxWidth: 360, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '82%', background: '#61BC8F', borderRadius: 999 }} />
        </div>
        <div style={{ fontSize: 12, color: 'var(--on-dark-3)', marginTop: 7 }}>4 av 5 steg klara — sista steget är ditt godkännande</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flexShrink: 0 }}>
        <button style={{
          background: '#61BC8F', color: '#122121', border: 'none', borderRadius: 8, padding: '11px 20px',
          fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 600, cursor: 'pointer', boxShadow: '0 6px 18px rgba(97,188,143,0.32)',
          display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
        }}>
          Granska &amp; godkänn <Icon name="arrowRight" size={16} stroke="#122121" />
        </button>
        <button style={{
          background: 'transparent', color: 'var(--on-dark-2)', border: '1px solid rgba(238,242,239,0.18)', borderRadius: 8,
          padding: '9px 20px', fontFamily: 'var(--font-ui)', fontSize: 13.5, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
        }}>
          Visa detaljer
        </button>
      </div>
    </div>
  );
}

function ProductCard({ icon, name, tagline, stat, statLabel }) {
  const [hover, setHover] = knUseState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, padding: 20,
        boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)', cursor: 'pointer',
        transform: hover ? 'translateY(-2px)' : 'none', transition: 'transform 180ms var(--ease), box-shadow 180ms',
        display: 'flex', flexDirection: 'column',
      }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ width: 40, height: 40, borderRadius: 11, background: 'var(--green-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={icon} size={21} stroke="#2E7D5B" />
        </span>
        <Icon name="arrowUpRight" size={18} stroke={hover ? 'var(--green-deep)' : 'var(--ink-3)'} />
      </div>
      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 17, fontWeight: 600, color: 'var(--ink)', marginTop: 16 }}>{name}</div>
      <div style={{ fontSize: 13.5, color: 'var(--ink-3)', lineHeight: 1.45, marginTop: 4, flex: 1 }}>{tagline}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--line)' }}>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 18, fontWeight: 600, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>{stat}</span>
        <span style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>{statLabel}</span>
      </div>
    </div>
  );
}

function ProductGrid() {
  const products = [
    { icon: 'banknote', name: 'Lön', tagline: 'Kör lön, skatt och utbetalningar — automatiskt.', stat: '1', statLabel: 'körning väntar' },
    { icon: 'clock', name: 'Time', tagline: 'Tid, frånvaro och scheman, rakt in i lönen.', stat: '7', statLabel: 'tidrapporter att attestera' },
    { icon: 'orbit', name: 'Sphere', tagline: 'Medarbetardata och dokument samlat på ett ställe.', stat: '32', statLabel: 'aktiva anställda' },
  ];
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '32px 0 14px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--ink)', margin: 0, whiteSpace: 'nowrap' }}>Dina produkter</h2>
        <a style={{ fontSize: 13, fontWeight: 600, color: 'var(--green-deep)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
          Hantera <Icon name="chevronRight" size={15} />
        </a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {products.map(p => <ProductCard key={p.name} {...p} />)}
      </div>
    </div>
  );
}

function MarketplaceNudge() {
  const [hover, setHover] = knUseState(false);
  return (
    <div style={{
      marginTop: 16, background: 'var(--surface)', border: '1px solid var(--green-line)', borderRadius: 14,
      padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 18,
      backgroundImage: 'linear-gradient(90deg, var(--green-soft) 0%, var(--surface) 55%)',
    }}>
      <span style={{ width: 42, height: 42, borderRadius: 11, background: '#fff', border: '1px solid var(--green-line)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name="store" size={21} stroke="#2E7D5B" />
      </span>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>Utöka Kontek Next från Marknadsplatsen</div>
        <div style={{ fontSize: 13.5, color: 'var(--ink-2)', marginTop: 2 }}>Pensionsadministration, reseräkningar och 20+ integrationer — aktiveras på minuter.</div>
      </div>
      <button
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          background: hover ? 'var(--green-soft)' : 'transparent', color: 'var(--green-deep)', border: '1px solid var(--green-line)',
          borderRadius: 8, padding: '10px 17px', fontFamily: 'var(--font-ui)', fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap', flexShrink: 0,
        }}>
        Utforska <Icon name="arrowRight" size={15} />
      </button>
    </div>
  );
}

function Dashboard() {
  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: '34px 36px 56px' }}>
      <PayrollStatus />
      <ProductGrid />
      <MarketplaceNudge />
    </div>
  );
}

window.Dashboard = Dashboard;
