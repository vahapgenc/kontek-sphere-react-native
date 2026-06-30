/* Kontek Next — Mobile app shells. Two navigation variants that share the
   same screen bodies (MDashboard / MLon / MTime / MPlaceholder).
   - MTabBarApp:  dark bottom tab bar + "Mer" bottom sheet
   - MDrawerApp:  top app bar + hamburger → slide-in drawer (mirrors desktop rail) */
const { useState: mUseState } = React;

const M_ASSETS = '../../../assets/';

/* which screen body to render for a given nav id */
function renderScreen(id, onNavigate) {
  if (id === 'overview') return <MDashboard onNavigate={onNavigate} />;
  if (id === 'payroll') return <MLon onNavigate={onNavigate} />;
  if (id === 'time') return <MTime />;
  const meta = {
    sphere: { icon: 'orbit', name: 'Sphere' },
    employees: { icon: 'users', name: 'Anställda' },
    reports: { icon: 'fileText', name: 'Rapporter' },
    market: { icon: 'store', name: 'Marknadsplats' },
    settings: { icon: 'settings', name: 'Inställningar' },
    help: { icon: 'helpCircle', name: 'Hjälp' },
  }[id] || { icon: 'dashboard', name: 'Kontek Next' };
  return <MPlaceholder icon={meta.icon} name={meta.name} />;
}

/* shared light top app bar (company + alerts + avatar). `left` slot is optional.
   `topInset` clears the device status bar: iOS overlays its status bar (56),
   Android renders one in-flow already (use ~14). */
function MTopBar({ left, topInset = 56 }) {
  return (
    <header style={{ flexShrink: 0, position: 'relative', zIndex: 4, display: 'flex', alignItems: 'center', gap: 10, padding: topInset + 'px 14px 12px', background: 'var(--canvas)', borderBottom: '1px solid var(--line-2)' }}>
      {left}
      <button style={{ flex: left ? 'none' : 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 10, padding: '8px 12px', boxShadow: 'var(--shadow-xs)', justifyContent: left ? 'center' : 'flex-start' }}>
        <MIcon name="building" size={17} stroke="var(--signature)" />
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13.5, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Norrström Industrier AB</span>
        <MIcon name="chevronDown" size={15} stroke="var(--ink-3)" />
      </button>
      <button title="Aviseringar" style={{ position: 'relative', width: 40, height: 40, borderRadius: 999, flexShrink: 0, cursor: 'pointer', background: 'var(--surface)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <MIcon name="bell" size={19} stroke="var(--ink-2)" />
        <span style={{ position: 'absolute', top: 8, right: 9, width: 7, height: 7, borderRadius: 999, background: 'var(--red)', border: '1.5px solid var(--surface)' }} />
      </button>
    </header>
  );
}

/* ============================ TAB BAR VARIANT ============================ */
function MTabBarApp({ topInset = 56 }) {
  const [active, setActive] = mUseState('overview');
  const [sheet, setSheet] = mUseState(false);
  const go = (id) => { setActive(id); setSheet(false); };

  const tabs = [
    { id: 'overview', icon: 'dashboard', label: 'Översikt' },
    { id: 'payroll', icon: 'banknote', label: 'Lön', badge: '1' },
    { id: 'time', icon: 'clock', label: 'Time', badge: '7' },
    { id: 'more', icon: 'moreHorizontal', label: 'Mer' },
  ];
  const moreActive = !['overview', 'payroll', 'time'].includes(active);

  const sheetItems = [
    { id: 'sphere', icon: 'orbit', label: 'Sphere' },
    { id: 'employees', icon: 'users', label: 'Anställda' },
    { id: 'reports', icon: 'fileText', label: 'Rapporter' },
    { id: 'market', icon: 'store', label: 'Marknadsplats' },
    { id: 'settings', icon: 'settings', label: 'Inställningar' },
    { id: 'help', icon: 'helpCircle', label: 'Hjälp' },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--canvas)', position: 'relative', overflow: 'hidden' }}>
      <MTopBar topInset={topInset} />
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {renderScreen(active, go)}
      </div>

      {/* bottom tab bar — dark teal rail echoing the desktop sidebar */}
      <nav style={{ flexShrink: 0, background: 'var(--shell-bg)', position: 'relative', zIndex: 5, paddingBottom: 26, paddingTop: 9, display: 'flex', alignItems: 'stretch' }}>
        <span aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(97,188,143,0.35), transparent)' }} />
        {tabs.map(t => {
          const on = t.id === 'more' ? moreActive : active === t.id;
          return (
            <button key={t.id} onClick={() => t.id === 'more' ? setSheet(true) : go(t.id)}
              style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, padding: '4px 0' }}>
              <span style={{ position: 'relative' }}>
                <MIcon name={t.icon} size={23} stroke={on ? '#A9E3BE' : 'var(--shell-ink-2)'} strokeWidth={on ? 2 : 1.75} />
                {t.badge && (
                  <span style={{ position: 'absolute', top: -5, right: -9, minWidth: 16, height: 16, borderRadius: 999, background: 'var(--green)', color: '#06321F', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px', border: '1.5px solid var(--shell-bg)' }}>{t.badge}</span>
                )}
              </span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10.5, fontWeight: on ? 700 : 500, color: on ? '#A9E3BE' : 'var(--shell-ink-2)', letterSpacing: '0.01em' }}>{t.label}</span>
            </button>
          );
        })}
      </nav>

      {/* "Mer" bottom sheet */}
      <div onClick={() => setSheet(false)} style={{ position: 'absolute', inset: 0, zIndex: 20, background: 'rgba(5,18,18,0.42)', opacity: sheet ? 1 : 0, pointerEvents: sheet ? 'auto' : 'none', transition: 'opacity 240ms var(--ease)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 21, background: 'var(--surface)', borderRadius: '22px 22px 0 0', padding: '10px 16px 34px', boxShadow: '0 -12px 40px rgba(5,34,37,0.22)', transform: sheet ? 'translateY(0)' : 'translateY(110%)', transition: 'transform 280ms var(--ease)' }}>
        <div style={{ width: 38, height: 5, borderRadius: 999, background: 'var(--line)', margin: '0 auto 14px' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {sheetItems.map(it => (
            <button key={it.id} onClick={() => go(it.id)} style={{ display: 'flex', alignItems: 'center', gap: 11, cursor: 'pointer', background: 'var(--surface-2)', border: '1px solid var(--line-2)', borderRadius: 12, padding: '13px 14px', textAlign: 'left' }}>
              <MIcon name={it.icon} size={20} stroke="var(--signature)" />
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{it.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================= DRAWER VARIANT ============================= */
function MDrawerNavItem({ icon, label, badge, active, onClick }) {
  return (
    <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 13, width: '100%', textAlign: 'left', height: 46, padding: '0 12px', borderRadius: 11, border: 'none', cursor: 'pointer', background: active ? 'var(--shell-active)' : 'transparent', color: active ? 'var(--shell-ink)' : 'var(--shell-ink-2)' }}>
      <MIcon name={icon} size={20} stroke={active ? 'var(--shell-ink)' : 'currentColor'} />
      <span style={{ flex: 1, fontFamily: 'var(--font-ui)', fontSize: 14.5, fontWeight: active ? 600 : 500 }}>{label}</span>
      {badge && <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--shell-cta-ink)', background: 'var(--shell-cta)', borderRadius: 999, padding: '2px 8px' }}>{badge}</span>}
    </button>
  );
}

function MDrawerApp({ topInset = 56 }) {
  const [active, setActive] = mUseState('overview');
  const [open, setOpen] = mUseState(false);
  const go = (id) => { setActive(id); setOpen(false); };

  const main = [
    { id: 'overview', icon: 'dashboard', label: 'Översikt' },
    { id: 'payroll', icon: 'banknote', label: 'Lön', badge: '1' },
    { id: 'time', icon: 'clock', label: 'Time', badge: '7' },
    { id: 'sphere', icon: 'orbit', label: 'Sphere' },
    { id: 'employees', icon: 'users', label: 'Anställda' },
    { id: 'reports', icon: 'fileText', label: 'Rapporter' },
    { id: 'market', icon: 'store', label: 'Marknadsplats' },
  ];
  const bottom = [
    { id: 'settings', icon: 'settings', label: 'Inställningar' },
    { id: 'help', icon: 'helpCircle', label: 'Hjälp' },
  ];

  const hamburger = (
    <button onClick={() => setOpen(true)} title="Meny" style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, cursor: 'pointer', background: 'var(--surface)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <MIcon name="menu" size={20} stroke="var(--ink)" />
    </button>
  );

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--canvas)', position: 'relative', overflow: 'hidden' }}>
      <MTopBar left={hamburger} topInset={topInset} />
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 24 }}>
        {renderScreen(active, go)}
      </div>

      {/* scrim */}
      <div onClick={() => setOpen(false)} style={{ position: 'absolute', inset: 0, zIndex: 30, background: 'rgba(5,18,18,0.5)', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity 240ms var(--ease)' }} />

      {/* drawer */}
      <aside style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 290, zIndex: 31, background: 'var(--shell-bg)', boxShadow: '8px 0 40px rgba(0,0,0,0.4)', transform: open ? 'translateX(0)' : 'translateX(-104%)', transition: 'transform 300ms var(--ease)', display: 'flex', flexDirection: 'column', padding: '54px 16px 22px', overflow: 'hidden' }}>
        <span aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(150% 60% at 60% 104%, rgba(128,192,160,0.40) 0%, rgba(74,124,108,0.16) 48%, transparent 76%)' }} />

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 6px 22px' }}>
          <img src={M_ASSETS + 'kontek-logo-white-sm.png'} alt="Kontek" style={{ height: 28, width: 'auto', display: 'block' }} />
          <button onClick={() => setOpen(false)} style={{ width: 34, height: 34, borderRadius: 999, cursor: 'pointer', background: 'rgba(255,255,255,0.08)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MIcon name="x" size={18} stroke="var(--shell-ink-2)" />
          </button>
        </div>

        <button style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, width: '100%', border: 'none', cursor: 'pointer', background: 'var(--shell-cta)', color: 'var(--shell-cta-ink)', borderRadius: 12, padding: '13px 16px', fontFamily: 'var(--font-ui)', fontSize: 14.5, fontWeight: 600, marginBottom: 18 }}>
          <MIcon name="plus" size={18} stroke="var(--shell-cta-ink)" strokeWidth={2.2} /> Ny lönekörning
        </button>

        <nav style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 3, overflowY: 'auto' }}>
          {main.map(it => <MDrawerNavItem key={it.id} {...it} active={active === it.id} onClick={() => go(it.id)} />)}
        </nav>

        <div style={{ flex: 1, minHeight: 8 }} />
        <div style={{ position: 'relative', borderTop: '1px solid var(--shell-line)', margin: '12px 0' }} />
        <nav style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 3 }}>
          {bottom.map(it => <MDrawerNavItem key={it.id} {...it} active={active === it.id} onClick={() => go(it.id)} />)}
        </nav>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 11, marginTop: 14, padding: '10px 8px', borderTop: '1px solid var(--shell-line)' }}>
          <span style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--guide)', color: '#fff', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>AL</span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: 'block', fontSize: 13.5, fontWeight: 600, color: 'var(--shell-ink)' }}>Anna Lindqvist</span>
            <span style={{ display: 'block', fontSize: 12, color: 'var(--on-dark-3)' }}>Lönechef</span>
          </span>
          <MIcon name="logOut" size={18} stroke="var(--on-dark-3)" />
        </div>
      </aside>
    </div>
  );
}

/* ============================= HYBRID VARIANT =============================
   Bottom tab bar for the four primary destinations + a raised, centred
   create action (the FAB folded into the bar). The centre button opens a
   quick-action sheet — "Ny lönekörning" and friends — so the most common
   create is always one thumb-tap away regardless of the current screen. */
function MHybridApp({ topInset = 56 }) {
  const [active, setActive] = mUseState('overview');
  const [sheet, setSheet] = mUseState(false);
  const go = (id) => { setActive(id); setSheet(false); };

  const tabs = [
    { id: 'overview', icon: 'dashboard', label: 'Översikt' },
    { id: 'payroll', icon: 'banknote', label: 'Lön', badge: '1' },
    { id: 'time', icon: 'clock', label: 'Time', badge: '7' },
    { id: 'reports', icon: 'fileText', label: 'Rapporter' },
  ];

  const quickActions = [
    { id: 'run', icon: 'banknote', label: 'Ny lönekörning' },
    { id: 'employee', icon: 'userRound', label: 'Ny anställd' },
    { id: 'absence', icon: 'plane', label: 'Registrera frånvaro' },
    { id: 'report', icon: 'fileText', label: 'Skapa rapport' },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--canvas)', position: 'relative', overflow: 'hidden' }}>
      <MTopBar topInset={topInset} />
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {renderScreen(active, go)}
      </div>

      {/* bottom bar with a raised centre create action */}
      <nav style={{ flexShrink: 0, background: 'var(--surface)', borderTop: '1px solid var(--line)', position: 'relative', zIndex: 5, paddingBottom: 26, paddingTop: 8, display: 'flex', alignItems: 'stretch' }}>
        {tabs.slice(0, 2).map(t => <MHybridTab key={t.id} {...t} active={active === t.id} onClick={() => go(t.id)} />)}

        {/* centre FAB */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <button onClick={() => setSheet(true)} aria-label="Skapa ny" style={{ marginTop: -26, width: 58, height: 58, borderRadius: 20, border: 'none', cursor: 'pointer', background: 'var(--shell-cta)', color: 'var(--shell-cta-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 22px rgba(97,188,143,0.40), 0 2px 6px rgba(18,33,33,0.16)' }}>
            <MIcon name="plus" size={28} stroke="var(--shell-cta-ink)" strokeWidth={2.2} />
          </button>
        </div>

        {tabs.slice(2).map(t => <MHybridTab key={t.id} {...t} active={active === t.id} onClick={() => go(t.id)} />)}
      </nav>

      {/* quick-action sheet */}
      <div onClick={() => setSheet(false)} style={{ position: 'absolute', inset: 0, zIndex: 20, background: 'rgba(5,18,18,0.42)', opacity: sheet ? 1 : 0, pointerEvents: sheet ? 'auto' : 'none', transition: 'opacity 240ms var(--ease)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 21, background: 'var(--surface)', borderRadius: '24px 24px 0 0', padding: '10px 16px 34px', boxShadow: '0 -12px 40px rgba(5,34,37,0.22)', transform: sheet ? 'translateY(0)' : 'translateY(110%)', transition: 'transform 280ms var(--ease)' }}>
        <div style={{ width: 40, height: 5, borderRadius: 999, background: 'var(--line)', margin: '0 auto 14px' }} />
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em', margin: '0 2px 14px' }}>Skapa ny</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {quickActions.map(a => (
            <button key={a.id} onClick={() => setSheet(false)} style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%', minHeight: 48, padding: '14px 16px', textAlign: 'left', border: 'none', background: 'var(--surface-2)', borderRadius: 12, fontFamily: 'var(--font-ui)', fontSize: 16, fontWeight: 500, color: 'var(--ink)', cursor: 'pointer' }}>
              <MIcon name={a.icon} size={22} stroke="var(--signature)" /> {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MHybridTab({ icon, label, badge, active, onClick }) {
  const col = active ? 'var(--signature)' : 'var(--ink-3)';
  return (
    <button onClick={onClick} style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '6px 0' }}>
      <span style={{ position: 'relative', display: 'inline-flex' }}>
        <MIcon name={icon} size={23} stroke={col} strokeWidth={active ? 2.1 : 1.85} />
        {badge && <span style={{ position: 'absolute', top: -5, right: -10, minWidth: 16, height: 16, borderRadius: 999, background: 'var(--green)', color: 'var(--ground)', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px', border: '2px solid var(--surface)' }}>{badge}</span>}
      </span>
      <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10.5, fontWeight: active ? 600 : 500, color: col }}>{label}</span>
    </button>
  );
}

Object.assign(window, { MTabBarApp, MDrawerApp, MHybridApp, MHybridTab });
