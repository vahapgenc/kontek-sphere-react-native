// @ds-adherence-ignore -- internal desktop UI kit helper; not a standalone DS component
/* Kontek Next — Sidebar (new app shell: near-black teal, mint CTA, inline expandable submenus) */
const { useState: knUseState } = React;

function LogoLockup({ collapsed }) {
  if (collapsed) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src="../../assets/kontek-logo-white-sm.png" alt="Kontek"
          style={{ height: 26, width: 'auto', objectFit: 'contain', objectPosition: 'left', clipPath: 'inset(0 78% 0 0)', marginLeft: 2 }} />
      </div>
    );
  }
  return (
    <img src="../../assets/kontek-logo-white-sm.png" alt="Kontek"
      style={{ height: 30, width: 'auto', display: 'block' }} />
  );
}

function CtaButton({ collapsed }) {
  const [hover, setHover] = knUseState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
        width: '100%', border: 'none', cursor: 'pointer',
        background: hover ? 'var(--shell-cta-hi)' : 'var(--shell-cta)', color: 'var(--shell-cta-ink)',
        borderRadius: 12, padding: collapsed ? '12px 0' : '13px 16px',
        fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 600,
        transition: 'background 140ms', whiteSpace: 'nowrap',
      }}>
      <Icon name="plus" size={18} stroke="var(--shell-cta-ink)" strokeWidth={2.2} />
      {!collapsed && <span>Ny lönekörning</span>}
    </button>
  );
}

function SubNavItem({ label, active, onClick }) {
  const [hover, setHover] = knUseState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', width: '100%', textAlign: 'left',
        height: 38, padding: '0 10px 0 50px', border: 'none', cursor: 'pointer',
        borderRadius: 10,
        background: active ? 'var(--shell-active)' : hover ? 'var(--shell-hover)' : 'transparent',
        color: (active || hover) ? 'var(--shell-ink)' : 'var(--shell-ink-2)',
        fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: active ? 600 : 500,
        transition: 'background 140ms, color 140ms', whiteSpace: 'nowrap',
      }}>
      {label}
    </button>
  );
}

function NavItem({ id, icon, label, active, badge, children, collapsed, onClick, expanded, activeSub, onSubClick }) {
  const [hover, setHover] = knUseState(false);
  // Flyout is now ONLY for the collapsed rail. When expanded, children render inline.
  const showFly = hover && collapsed && children;
  const bg = active ? 'var(--shell-active)' : hover ? 'var(--shell-hover)' : 'transparent';
  return (
    <div style={{ position: 'relative' }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <button
        onClick={onClick}
        style={{
          display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left',
          padding: collapsed ? '0' : '0 10px 0 8px', height: 44, justifyContent: collapsed ? 'center' : 'flex-start',
          borderRadius: 10, border: 'none', cursor: 'pointer', background: bg,
          color: active ? 'var(--shell-ink)' : 'var(--shell-ink-2)',
          fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: active ? 600 : 500,
          transition: 'background 140ms, color 140ms',
        }}>
        <span style={{
          width: 30, height: 30, borderRadius: 8, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: active ? 'rgba(255,255,255,0.10)' : 'transparent',
        }}>
          <Icon name={icon} size={18} stroke={active ? 'var(--shell-ink)' : 'currentColor'} />
        </span>
        {!collapsed && <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>}
        {!collapsed && badge && (
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--shell-cta-ink)', background: 'var(--shell-cta)', borderRadius: 999, padding: '2px 8px', lineHeight: 1.4 }}>{badge}</span>
        )}
        {!collapsed && children && (
          <Icon name="chevronDown" size={16} stroke="currentColor"
            style={{ transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 160ms', opacity: 0.85 }} />
        )}
      </button>

      {/* Inline accordion submenu — replaces the dropdown when expanded */}
      {!collapsed && children && expanded && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
          {children.map((c, i) => (
            <SubNavItem key={i} label={c.label}
              active={activeSub === id + ':' + c.label}
              onClick={() => onSubClick && onSubClick(c.label)} />
          ))}
        </div>
      )}

      {showFly && (
        <div style={{
          position: 'absolute', left: 'calc(100% + 12px)', top: 0,
          minWidth: 210, background: 'var(--surface)', borderRadius: 12, padding: 7,
          boxShadow: 'var(--elev-menu)', border: '1px solid var(--line-2)', zIndex: 40,
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-4)', padding: '6px 10px 8px' }}>{label}</div>
          {(children || [{ label: 'Öppna' }]).map((c, i) => (
            <div key={i} style={flyItemStyle(i === 0 && !!active)}>{c.label}</div>
          ))}
          <span style={{
            position: 'absolute', left: -6, top: 16, width: 12, height: 12, background: 'var(--surface)',
            borderLeft: '1px solid var(--line-2)', borderBottom: '1px solid var(--line-2)', transform: 'rotate(45deg)',
          }} />
        </div>
      )}
    </div>
  );
}

function flyItemStyle(active) {
  return {
    padding: '9px 10px', borderRadius: 8, fontSize: 13.5, fontWeight: active ? 600 : 500,
    color: active ? 'var(--ink)' : 'var(--ink-2)', cursor: 'pointer',
    background: active ? 'var(--surface-2)' : 'transparent', whiteSpace: 'nowrap',
  };
}

function CompanySwitcher({ collapsed }) {
  const [hover, setHover] = knUseState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      title="Byt företag"
      style={{
        display: 'flex', alignItems: 'center', gap: 11, width: '100%', textAlign: 'left',
        padding: collapsed ? '0' : '0 10px', height: 46, justifyContent: collapsed ? 'center' : 'flex-start',
        borderRadius: 10, border: '1px solid var(--shell-line)', cursor: 'pointer',
        background: hover ? 'var(--shell-hover)' : 'transparent', transition: 'background 140ms',
      }}>
      <span style={{
        width: 30, height: 30, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(255,255,255,0.08)',
      }}>
        <Icon name="building" size={17} stroke="var(--green)" />
      </span>
      {!collapsed && (
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: 'block', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--on-dark-3)', lineHeight: 1.3 }}>Företag</span>
          <span style={{ display: 'block', fontSize: 13.5, fontWeight: 600, color: 'var(--shell-ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.3 }}>Norrström Industrier AB</span>
        </span>
      )}
      {!collapsed && <Icon name="chevronDown" size={15} stroke="var(--on-dark-3)" />}
    </button>
  );
}

function UserProfile({ collapsed }) {
  const [hover, setHover] = knUseState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      title="Anna Lindqvist"
      style={{
        display: 'flex', alignItems: 'center', gap: 11, width: '100%', textAlign: 'left',
        padding: collapsed ? '0' : '0 8px', height: 46, justifyContent: collapsed ? 'center' : 'flex-start',
        borderRadius: 10, border: 'none', cursor: 'pointer',
        background: hover ? 'var(--shell-hover)' : 'transparent', transition: 'background 140ms',
      }}>
      <span style={{
        width: 32, height: 32, borderRadius: 999, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--guide)', color: '#fff', fontSize: 12.5, fontWeight: 600,
      }}>AL</span>
      {!collapsed && (
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: 'block', fontSize: 13.5, fontWeight: 600, color: 'var(--shell-ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.3 }}>Anna Lindqvist</span>
          <span style={{ display: 'block', fontSize: 12, color: 'var(--on-dark-3)', lineHeight: 1.3 }}>Lönechef</span>
        </span>
      )}
      {!collapsed && <Icon name="chevronDown" size={15} stroke="var(--on-dark-3)" />}
    </button>
  );
}

function Sidebar({ active, setActive, collapsed, onToggle }) {
  // Inline accordion state: which parent is expanded, and which sub-item is selected.
  const [openMenu, setOpenMenu] = knUseState(active);
  const [activeSub, setActiveSub] = knUseState(null);

  const handleNav = (item) => {
    setActive(item.id);
    if (item.children) setOpenMenu(prev => (prev === item.id ? null : item.id));
    else setActiveSub(null);
  };
  const handleSub = (parentId, label) => { setActive(parentId); setActiveSub(parentId + ':' + label); };

  const main = [
    { id: 'overview', icon: 'dashboard', label: 'Översikt', children: [{ label: 'Start' }, { label: 'Att göra' }, { label: 'Kalender' }] },
    { id: 'payroll', icon: 'banknote', label: 'Lön', badge: '1', children: [{ label: 'Lönekörningar' }, { label: 'Utbetalningar' }, { label: 'Skatt & avgifter' }] },
    { id: 'time', icon: 'clock', label: 'Time', children: [{ label: 'Tidrapporter' }, { label: 'Frånvaro' }, { label: 'Scheman' }] },
    { id: 'sphere', icon: 'orbit', label: 'Sphere', children: [{ label: 'Anställda' }, { label: 'Dokument' }, { label: 'Onboarding' }] },
    { id: 'employees', icon: 'users', label: 'Anställda' },
    { id: 'reports', icon: 'fileText', label: 'Rapporter' },
    { id: 'market', icon: 'store', label: 'Marknadsplats' },
  ];
  const bottom = [
    { id: 'settings', icon: 'settings', label: 'Inställningar' },
    { id: 'help', icon: 'helpCircle', label: 'Hjälp' },
  ];
  return (
    <aside style={{
      width: collapsed ? 84 : 280, minWidth: 0, flexShrink: 0, flexGrow: 0, boxSizing: 'border-box', height: '100%',
      background: 'var(--shell-bg)', position: 'relative', overflow: 'visible',
      display: 'flex', flexDirection: 'column', padding: collapsed ? '22px 16px' : '24px 18px',
      transition: 'padding 200ms var(--ease)', zIndex: 10,
    }}>
      {/* soft green glow filling the lower portion of the menu, fading to near-black at the top */}
      <span style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(125% 66% at 54% 96%, rgba(126,196,154,0.55) 0%, rgba(74,130,108,0.26) 40%, rgba(60,104,92,0.08) 60%, transparent 72%)' }} />

      <div style={{ position: 'relative', padding: collapsed ? '2px 0 24px' : '2px 6px 26px' }}>
        <LogoLockup collapsed={collapsed} />
      </div>

      <div style={{ position: 'relative', marginBottom: 22 }}><CtaButton collapsed={collapsed} /></div>

      <nav style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {main.map(item => (
          <NavItem key={item.id} {...item} collapsed={collapsed} active={active === item.id}
            expanded={!collapsed && openMenu === item.id} activeSub={activeSub}
            onClick={() => handleNav(item)} onSubClick={(label) => handleSub(item.id, label)} />
        ))}
      </nav>

      {/* push Inställningar / Hjälp to the very bottom of the sidebar */}
      <div style={{ flex: 1 }} />

      {/* divider — separates main nav from Inställningar / Hjälp */}
      <div style={{ position: 'relative', borderTop: '1px solid var(--shell-line)', margin: '14px 0' }} />

      <nav style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {bottom.map(item => (
          <NavItem key={item.id} {...item} collapsed={collapsed} active={active === item.id}
            onClick={() => handleNav(item)} />
        ))}
      </nav>

      {/* collapse toggle — straddles the sidebar / content boundary */}
      <button onClick={onToggle} title={collapsed ? 'Expandera' : 'Fäll ihop'}
        style={{
          position: 'absolute', right: -16, bottom: 26, width: 32, height: 32, borderRadius: 999,
          background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--elev-pop)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 30,
        }}>
        <span style={{ display: 'flex' }}>
          <Icon name={collapsed ? 'chevronsRight' : 'chevronsLeft'} size={16} stroke="var(--ink-2)" />
        </span>
      </button>
    </aside>
  );
}

window.Sidebar = Sidebar;
window.LogoLockup = LogoLockup;
