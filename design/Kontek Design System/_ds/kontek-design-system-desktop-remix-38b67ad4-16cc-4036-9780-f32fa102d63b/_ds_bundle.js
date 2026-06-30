/* @ds-bundle: {"format":3,"namespace":"KontekDesignSystemDesktop_e45a60","components":[],"sourceHashes":{"ui_kits/kontek-next/dashboard.jsx":"3c81b39b87b4","ui_kits/kontek-next/icons.jsx":"107ae54f1f53","ui_kits/kontek-next/sidebar.jsx":"42dbed36bed4","ui_kits/kontek-next/topbar.jsx":"a8feb71b64d8"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.KontekDesignSystemDesktop_e45a60 = window.KontekDesignSystemDesktop_e45a60 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/kontek-next/dashboard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Kontek — Dashboard content (greeting, payroll status, products, marketplace nudge) */

function Greeting() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 26
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--green-deep)'
    }
  }, "M\xE5ndag 25 maj"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 42,
      lineHeight: 1.06,
      letterSpacing: '-0.02em',
      color: 'var(--ink)',
      margin: '8px 0 0',
      fontWeight: 700
    }
  }, "God morgon, Anna"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 15,
      color: 'var(--ink-3)',
      margin: '8px 0 0'
    }
  }, "En k\xF6rning v\xE4ntar p\xE5 dig. Allt annat \xE4r lugnt."));
}
function PayrollStatus() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--signature)',
      borderRadius: 16,
      padding: '22px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      boxShadow: 'var(--shadow-md)',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 12,
      background: 'rgba(97,188,143,0.16)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "checkCircle",
    size: 24,
    stroke: "#61BC8F"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#61BC8F'
    }
  }, "L\xF6nek\xF6rning \xB7 Maj"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 17,
      fontWeight: 600,
      color: 'var(--on-dark)',
      marginTop: 5
    }
  }, "Norrstr\xF6m Industrier AB \xE4r klar f\xF6r granskning"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: 'var(--on-dark-2)',
      marginTop: 3
    }
  }, "32 anst\xE4llda \xB7 utbetalning 25 maj \xB7 inga avvikelser"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: 'rgba(238,242,239,0.14)',
      borderRadius: 999,
      marginTop: 14,
      maxWidth: 360,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: '82%',
      background: '#61BC8F',
      borderRadius: 999
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--on-dark-3)',
      marginTop: 7
    }
  }, "4 av 5 steg klara \u2014 sista steget \xE4r ditt godk\xE4nnande")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      background: '#61BC8F',
      color: '#122121',
      border: 'none',
      borderRadius: 8,
      padding: '11px 20px',
      fontFamily: 'var(--font-ui)',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      boxShadow: '0 6px 18px rgba(97,188,143,0.32)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      whiteSpace: 'nowrap'
    }
  }, "Granska & godk\xE4nn ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrowRight",
    size: 16,
    stroke: "#122121"
  })), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'transparent',
      color: 'var(--on-dark-2)',
      border: '1px solid rgba(238,242,239,0.18)',
      borderRadius: 8,
      padding: '9px 20px',
      fontFamily: 'var(--font-ui)',
      fontSize: 13.5,
      fontWeight: 500,
      cursor: 'pointer',
      whiteSpace: 'nowrap'
    }
  }, "Visa detaljer")));
}
function ProductCard({
  icon,
  name,
  tagline,
  stat,
  statLabel
}) {
  const [hover, setHover] = knUseState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      borderRadius: 14,
      padding: 20,
      boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      cursor: 'pointer',
      transform: hover ? 'translateY(-2px)' : 'none',
      transition: 'transform 180ms var(--ease), box-shadow 180ms',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 11,
      background: 'var(--green-soft)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 21,
    stroke: "#2E7D5B"
  })), /*#__PURE__*/React.createElement(Icon, {
    name: "arrowUpRight",
    size: 18,
    stroke: hover ? 'var(--green-deep)' : 'var(--ink-3)'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 17,
      fontWeight: 600,
      color: 'var(--ink)',
      marginTop: 16
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: 'var(--ink-3)',
      lineHeight: 1.45,
      marginTop: 4,
      flex: 1
    }
  }, tagline), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 7,
      marginTop: 16,
      paddingTop: 14,
      borderTop: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 18,
      fontWeight: 600,
      color: 'var(--ink)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, stat), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: 'var(--ink-3)'
    }
  }, statLabel)));
}
function ProductGrid() {
  const products = [{
    icon: 'banknote',
    name: 'Lön',
    tagline: 'Kör lön, skatt och utbetalningar — automatiskt.',
    stat: '1',
    statLabel: 'körning väntar'
  }, {
    icon: 'clock',
    name: 'Time',
    tagline: 'Tid, frånvaro och scheman, rakt in i lönen.',
    stat: '7',
    statLabel: 'tidrapporter att attestera'
  }, {
    icon: 'orbit',
    name: 'Sphere',
    tagline: 'Medarbetardata och dokument samlat på ett ställe.',
    stat: '32',
    statLabel: 'aktiva anställda'
  }];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      margin: '32px 0 14px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 24,
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: 'var(--ink)',
      margin: 0,
      whiteSpace: 'nowrap'
    }
  }, "Dina produkter"), /*#__PURE__*/React.createElement("a", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--green-deep)',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      cursor: 'pointer'
    }
  }, "Hantera ", /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    size: 15
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 16
    }
  }, products.map(p => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: p.name
  }, p)))));
}
function MarketplaceNudge() {
  const [hover, setHover] = knUseState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      background: 'var(--surface)',
      border: '1px solid var(--green-line)',
      borderRadius: 14,
      padding: '18px 22px',
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      backgroundImage: 'linear-gradient(90deg, var(--green-soft) 0%, var(--surface) 55%)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 42,
      height: 42,
      borderRadius: 11,
      background: '#fff',
      border: '1px solid var(--green-line)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "store",
    size: 21,
    stroke: "#2E7D5B"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--ink)'
    }
  }, "Ut\xF6ka Kontek fr\xE5n Marknadsplatsen"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: 'var(--ink-2)',
      marginTop: 2
    }
  }, "Pensionsadministration, reser\xE4kningar och 20+ integrationer \u2014 aktiveras p\xE5 minuter.")), /*#__PURE__*/React.createElement("button", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: hover ? 'var(--green-soft)' : 'transparent',
      color: 'var(--green-deep)',
      border: '1px solid var(--green-line)',
      borderRadius: 8,
      padding: '10px 17px',
      fontFamily: 'var(--font-ui)',
      fontSize: 13.5,
      fontWeight: 600,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      whiteSpace: 'nowrap',
      flexShrink: 0
    }
  }, "Utforska ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrowRight",
    size: 15
  })));
}
function Dashboard() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 980,
      margin: '0 auto',
      padding: '34px 36px 56px'
    }
  }, /*#__PURE__*/React.createElement(PayrollStatus, null), /*#__PURE__*/React.createElement(ProductGrid, null), /*#__PURE__*/React.createElement(MarketplaceNudge, null));
}
window.Dashboard = Dashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/kontek-next/dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/kontek-next/icons.jsx
try { (() => {
/* Kontek — Icon set (Lucide line icons, MIT). 24×24, 1.75 stroke. */
const KN_ICON_PATHS = {
  dashboard: '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
  banknote: '<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  orbit: '<path d="M20.341 6.484A10 10 0 0 1 10.266 21.85"/><path d="M3.659 17.516A10 10 0 0 1 13.74 2.152"/><circle cx="12" cy="12" r="3"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  fileText: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
  store: '<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  checkCircle: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  sparkles: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
  calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  trendingUp: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  arrowUpRight: '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  helpCircle: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  building: '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
  chevronsLeft: '<path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/>',
  chevronsRight: '<path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/>',
  userRound: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
  logOut: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>'
};
function Icon({
  name,
  size = 18,
  stroke = 'currentColor',
  strokeWidth = 1.75,
  style
}) {
  const d = KN_ICON_PATHS[name] || '';
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: style,
    dangerouslySetInnerHTML: {
      __html: d
    }
  });
}
window.Icon = Icon;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/kontek-next/icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/kontek-next/sidebar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Kontek — Sidebar (new app shell: near-black teal, mint CTA, inline expandable submenus) */
const {
  useState: knUseState
} = React;
function LogoLockup({
  collapsed
}) {
  if (collapsed) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/kontek-logo-white-sm.png",
      alt: "Kontek",
      style: {
        height: 26,
        width: 'auto',
        objectFit: 'contain',
        objectPosition: 'left',
        clipPath: 'inset(0 78% 0 0)',
        marginLeft: 2
      }
    }));
  }
  return /*#__PURE__*/React.createElement("img", {
    src: "../../assets/kontek-logo-white-sm.png",
    alt: "Kontek",
    style: {
      height: 30,
      width: 'auto',
      display: 'block'
    }
  });
}
function CtaButton({
  collapsed
}) {
  const [hover, setHover] = knUseState(false);
  return /*#__PURE__*/React.createElement("button", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 9,
      width: '100%',
      border: 'none',
      cursor: 'pointer',
      background: hover ? 'var(--shell-cta-hi)' : 'var(--shell-cta)',
      color: 'var(--shell-cta-ink)',
      borderRadius: 12,
      padding: collapsed ? '12px 0' : '13px 16px',
      fontFamily: 'var(--font-ui)',
      fontSize: 14,
      fontWeight: 600,
      transition: 'background 140ms',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 18,
    stroke: "var(--shell-cta-ink)",
    strokeWidth: 2.2
  }), !collapsed && /*#__PURE__*/React.createElement("span", null, "Ny l\xF6nek\xF6rning"));
}
function SubNavItem({
  label,
  active,
  onClick
}) {
  const [hover, setHover] = knUseState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      textAlign: 'left',
      height: 38,
      padding: '0 10px 0 50px',
      border: 'none',
      cursor: 'pointer',
      borderRadius: 10,
      background: active ? 'var(--shell-active)' : hover ? 'var(--shell-hover)' : 'transparent',
      color: active || hover ? 'var(--shell-ink)' : 'var(--shell-ink-2)',
      fontFamily: 'var(--font-ui)',
      fontSize: 14,
      fontWeight: active ? 600 : 500,
      transition: 'background 140ms, color 140ms',
      whiteSpace: 'nowrap'
    }
  }, label);
}
function NavItem({
  id,
  icon,
  label,
  active,
  badge,
  children,
  collapsed,
  onClick,
  expanded,
  activeSub,
  onSubClick
}) {
  const [hover, setHover] = knUseState(false);
  // Flyout is now ONLY for the collapsed rail. When expanded, children render inline.
  const showFly = hover && collapsed && children;
  const bg = active ? 'var(--shell-active)' : hover ? 'var(--shell-hover)' : 'transparent';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      width: '100%',
      textAlign: 'left',
      padding: collapsed ? '0' : '0 10px 0 8px',
      height: 44,
      justifyContent: collapsed ? 'center' : 'flex-start',
      borderRadius: 10,
      border: 'none',
      cursor: 'pointer',
      background: bg,
      color: active ? 'var(--shell-ink)' : 'var(--shell-ink-2)',
      fontFamily: 'var(--font-ui)',
      fontSize: 14,
      fontWeight: active ? 600 : 500,
      transition: 'background 140ms, color 140ms'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 8,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: active ? 'rgba(255,255,255,0.10)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 18,
    stroke: active ? 'var(--shell-ink)' : 'currentColor'
  })), !collapsed && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, label), !collapsed && badge && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--shell-cta-ink)',
      background: 'var(--shell-cta)',
      borderRadius: 999,
      padding: '2px 8px',
      lineHeight: 1.4
    }
  }, badge), !collapsed && children && /*#__PURE__*/React.createElement(Icon, {
    name: "chevronDown",
    size: 16,
    stroke: "currentColor",
    style: {
      transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)',
      transition: 'transform 160ms',
      opacity: 0.85
    }
  })), !collapsed && children && expanded && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      marginTop: 2
    }
  }, children.map((c, i) => /*#__PURE__*/React.createElement(SubNavItem, {
    key: i,
    label: c.label,
    active: activeSub === id + ':' + c.label,
    onClick: () => onSubClick && onSubClick(c.label)
  }))), showFly && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 'calc(100% + 12px)',
      top: 0,
      minWidth: 210,
      background: 'var(--surface)',
      borderRadius: 12,
      padding: 7,
      boxShadow: 'var(--elev-menu)',
      border: '1px solid var(--line-2)',
      zIndex: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--ink-4)',
      padding: '6px 10px 8px'
    }
  }, label), (children || [{
    label: 'Öppna'
  }]).map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: flyItemStyle(i === 0 && !!active)
  }, c.label)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: -6,
      top: 16,
      width: 12,
      height: 12,
      background: 'var(--surface)',
      borderLeft: '1px solid var(--line-2)',
      borderBottom: '1px solid var(--line-2)',
      transform: 'rotate(45deg)'
    }
  })));
}
function flyItemStyle(active) {
  return {
    padding: '9px 10px',
    borderRadius: 8,
    fontSize: 13.5,
    fontWeight: active ? 600 : 500,
    color: active ? 'var(--ink)' : 'var(--ink-2)',
    cursor: 'pointer',
    background: active ? 'var(--surface-2)' : 'transparent',
    whiteSpace: 'nowrap'
  };
}
function CompanySwitcher({
  collapsed
}) {
  const [hover, setHover] = knUseState(false);
  return /*#__PURE__*/React.createElement("button", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    title: "Byt f\xF6retag",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      width: '100%',
      textAlign: 'left',
      padding: collapsed ? '0' : '0 10px',
      height: 46,
      justifyContent: collapsed ? 'center' : 'flex-start',
      borderRadius: 10,
      border: '1px solid var(--shell-line)',
      cursor: 'pointer',
      background: hover ? 'var(--shell-hover)' : 'transparent',
      transition: 'background 140ms'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 8,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255,255,255,0.08)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "building",
    size: 17,
    stroke: "var(--green)"
  })), !collapsed && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 10.5,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--on-dark-3)',
      lineHeight: 1.3
    }
  }, "F\xF6retag"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13.5,
      fontWeight: 600,
      color: 'var(--shell-ink)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      lineHeight: 1.3
    }
  }, "Norrstr\xF6m Industrier AB")), !collapsed && /*#__PURE__*/React.createElement(Icon, {
    name: "chevronDown",
    size: 15,
    stroke: "var(--on-dark-3)"
  }));
}
function UserProfile({
  collapsed
}) {
  const [hover, setHover] = knUseState(false);
  return /*#__PURE__*/React.createElement("button", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    title: "Anna Lindqvist",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      width: '100%',
      textAlign: 'left',
      padding: collapsed ? '0' : '0 8px',
      height: 46,
      justifyContent: collapsed ? 'center' : 'flex-start',
      borderRadius: 10,
      border: 'none',
      cursor: 'pointer',
      background: hover ? 'var(--shell-hover)' : 'transparent',
      transition: 'background 140ms'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 999,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--guide)',
      color: '#fff',
      fontSize: 12.5,
      fontWeight: 600
    }
  }, "AL"), !collapsed && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13.5,
      fontWeight: 600,
      color: 'var(--shell-ink)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      lineHeight: 1.3
    }
  }, "Anna Lindqvist"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 12,
      color: 'var(--on-dark-3)',
      lineHeight: 1.3
    }
  }, "L\xF6nechef")), !collapsed && /*#__PURE__*/React.createElement(Icon, {
    name: "chevronDown",
    size: 15,
    stroke: "var(--on-dark-3)"
  }));
}
function Sidebar({
  active,
  setActive,
  collapsed,
  onToggle
}) {
  // Inline accordion state: which parent is expanded, and which sub-item is selected.
  const [openMenu, setOpenMenu] = knUseState(active);
  const [activeSub, setActiveSub] = knUseState(null);
  const handleNav = item => {
    setActive(item.id);
    if (item.children) setOpenMenu(prev => prev === item.id ? null : item.id);else setActiveSub(null);
  };
  const handleSub = (parentId, label) => {
    setActive(parentId);
    setActiveSub(parentId + ':' + label);
  };
  const main = [{
    id: 'overview',
    icon: 'dashboard',
    label: 'Översikt',
    children: [{
      label: 'Start'
    }, {
      label: 'Att göra'
    }, {
      label: 'Kalender'
    }]
  }, {
    id: 'payroll',
    icon: 'banknote',
    label: 'Lön',
    badge: '1',
    children: [{
      label: 'Lönekörningar'
    }, {
      label: 'Utbetalningar'
    }, {
      label: 'Skatt & avgifter'
    }]
  }, {
    id: 'time',
    icon: 'clock',
    label: 'Time',
    children: [{
      label: 'Tidrapporter'
    }, {
      label: 'Frånvaro'
    }, {
      label: 'Scheman'
    }]
  }, {
    id: 'sphere',
    icon: 'orbit',
    label: 'Sphere',
    children: [{
      label: 'Anställda'
    }, {
      label: 'Dokument'
    }, {
      label: 'Onboarding'
    }]
  }, {
    id: 'employees',
    icon: 'users',
    label: 'Anställda'
  }, {
    id: 'reports',
    icon: 'fileText',
    label: 'Rapporter'
  }, {
    id: 'market',
    icon: 'store',
    label: 'Marknadsplats'
  }];
  const bottom = [{
    id: 'settings',
    icon: 'settings',
    label: 'Inställningar'
  }, {
    id: 'help',
    icon: 'helpCircle',
    label: 'Hjälp'
  }];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: collapsed ? 84 : 280,
      minWidth: 0,
      flexShrink: 0,
      flexGrow: 0,
      boxSizing: 'border-box',
      height: '100%',
      background: 'var(--shell-bg)',
      position: 'relative',
      overflow: 'visible',
      display: 'flex',
      flexDirection: 'column',
      padding: collapsed ? '22px 16px' : '24px 18px',
      transition: 'padding 200ms var(--ease)',
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: 'radial-gradient(125% 66% at 54% 96%, rgba(126,196,154,0.55) 0%, rgba(74,130,108,0.26) 40%, rgba(60,104,92,0.08) 60%, transparent 72%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: collapsed ? '2px 0 24px' : '2px 6px 26px'
    }
  }, /*#__PURE__*/React.createElement(LogoLockup, {
    collapsed: collapsed
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement(CtaButton, {
    collapsed: collapsed
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, main.map(item => /*#__PURE__*/React.createElement(NavItem, _extends({
    key: item.id
  }, item, {
    collapsed: collapsed,
    active: active === item.id,
    expanded: !collapsed && openMenu === item.id,
    activeSub: activeSub,
    onClick: () => handleNav(item),
    onSubClick: label => handleSub(item.id, label)
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderTop: '1px solid var(--shell-line)',
      margin: '14px 0'
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, bottom.map(item => /*#__PURE__*/React.createElement(NavItem, _extends({
    key: item.id
  }, item, {
    collapsed: collapsed,
    active: active === item.id,
    onClick: () => handleNav(item)
  })))), /*#__PURE__*/React.createElement("button", {
    onClick: onToggle,
    title: collapsed ? 'Expandera' : 'Fäll ihop',
    style: {
      position: 'absolute',
      right: -16,
      bottom: 26,
      width: 32,
      height: 32,
      borderRadius: 999,
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      boxShadow: 'var(--elev-pop)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      zIndex: 30
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: collapsed ? 'chevronsRight' : 'chevronsLeft',
    size: 16,
    stroke: "var(--ink-2)"
  }))));
}
window.Sidebar = Sidebar;
window.LogoLockup = LogoLockup;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/kontek-next/sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/kontek-next/topbar.jsx
try { (() => {
/* Kontek — Topbar (sits inside the white panel: welcome + company) */
function Topbar() {
  const [hover, setHover] = knUseState(false);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '18px 22px 18px 24px',
      background: 'transparent',
      borderBottom: '1px solid var(--line-2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 13,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 42,
      height: 42,
      borderRadius: 999,
      flexShrink: 0,
      border: '1.5px solid var(--signature)',
      background: 'var(--surface)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "userRound",
    size: 21,
    stroke: "var(--signature)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--ink)',
      lineHeight: 1.2,
      whiteSpace: 'nowrap'
    }
  }, "V\xE4lkommen, Anna"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--ink-3)',
      lineHeight: 1.2,
      marginTop: 1
    }
  }, "L\xF6nechef"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 11,
      cursor: 'pointer',
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      boxShadow: hover ? 'var(--elev-pop)' : 'none',
      borderRadius: 10,
      padding: '9px 14px',
      transition: 'box-shadow 160ms',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "building",
    size: 18,
    stroke: "var(--signature)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--ink)'
    }
  }, "Norrstr\xF6m Industrier AB"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevronDown",
    size: 16,
    stroke: "var(--ink-3)"
  })));
}
window.Topbar = Topbar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/kontek-next/topbar.jsx", error: String((e && e.message) || e) }); }

})();
