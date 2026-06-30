// @ds-adherence-ignore -- internal desktop UI kit helper; not a standalone DS component
/* Kontek Next — Topbar (sits inside the white panel: welcome + company) */
function Topbar() {
  const [hover, setHover] = knUseState(false);
  return (
    <header style={{
      flexShrink: 0, display: 'flex', alignItems: 'center', gap: 16,
      padding: '18px 22px 18px 24px', background: 'transparent',
      borderBottom: '1px solid var(--line-2)',
    }}>
      {/* avatar + greeting */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 13, minWidth: 0 }}>
        <span style={{
          width: 42, height: 42, borderRadius: 999, flexShrink: 0,
          border: '1.5px solid var(--signature)', background: 'var(--surface)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="userRound" size={21} stroke="var(--signature)" />
        </span>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 16, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
            Välkommen, Anna
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.2, marginTop: 1 }}>Lönechef</div>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {/* company switcher */}
      <button
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 11, cursor: 'pointer',
          background: 'var(--surface)', border: '1px solid var(--line)',
          boxShadow: hover ? 'var(--elev-pop)' : 'none',
          borderRadius: 10, padding: '9px 14px', transition: 'box-shadow 160ms', whiteSpace: 'nowrap',
        }}>
        <Icon name="building" size={18} stroke="var(--signature)" />
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>Norrström Industrier AB</span>
        <Icon name="chevronDown" size={16} stroke="var(--ink-3)" />
      </button>
    </header>
  );
}

window.Topbar = Topbar;
