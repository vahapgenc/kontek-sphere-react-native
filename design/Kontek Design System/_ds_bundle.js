/* @ds-bundle: {"format":3,"namespace":"KontekDesignSystemDesktopRemix_e29591","components":[],"sourceHashes":{"ds-overview.js":"68e79242aa37","ui_kits/kontek-next/dashboard.jsx":"97df6aac584d","ui_kits/kontek-next/icons.jsx":"7a67a24142ad","ui_kits/kontek-next/mobile/android-frame.jsx":"70c8c3059eeb","ui_kits/kontek-next/mobile/design-canvas.jsx":"bd8746af6e58","ui_kits/kontek-next/mobile/ios-frame.jsx":"be3343be4b51","ui_kits/kontek-next/mobile/m-apps.jsx":"2508ce2e6fbb","ui_kits/kontek-next/mobile/m-icons.jsx":"9b69c0b28a85","ui_kits/kontek-next/mobile/m-screens.jsx":"47756f93e5b3","ui_kits/kontek-next/sidebar.jsx":"ff8bb26e4b9b","ui_kits/kontek-next/topbar.jsx":"51267ed66c80"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.KontekDesignSystemDesktopRemix_e29591 = window.KontekDesignSystemDesktopRemix_e29591 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ds-overview.js
try { (() => {
/* Kontek Next — Design System Overview.
   Two-level accordion (group → spec). Each spec lazy-loads its live
   preview card in an iframe and is auto-sized to its content height. */
(function () {
  'use strict';

  // Curated spec list. `file` is relative to preview/. Order = display order.
  const DATA = [{
    group: 'Atoms',
    items: [{
      file: 'colors.html',
      name: 'Färger',
      sub: 'Kärnpalett, ytor och texttoner'
    }, {
      file: 'colors-status.html',
      name: 'Statusfärger',
      sub: 'Återkopplingstoner — info, lyckat, varning, fel'
    }, {
      file: 'app-background.html',
      name: 'App-bakgrund',
      sub: 'Den enda sanktionerade gradienten — blek skog'
    }, {
      file: 'typography.html',
      name: 'Typografi',
      sub: 'Open Sans, finjusterad över alla ytor'
    }, {
      file: 'type-scale.html',
      name: 'Typskala',
      sub: 'Storlekssteg för text'
    }, {
      file: 'type-display.html',
      name: 'Display-typografi',
      sub: 'Rubriker och stora tal'
    }, {
      file: 'grid.html',
      name: 'Rutnät',
      sub: '12-kolumners layoutrutnät'
    }, {
      file: 'spacing.html',
      name: 'Avstånd',
      sub: 'Mellanrum och indrag'
    }, {
      file: 'sizing.html',
      name: 'Storlekar',
      sub: 'Skala för bredd och höjd'
    }, {
      file: 'radii.html',
      name: 'Corner radius',
      sub: 'Mjuka hörn, aldrig skarpa'
    }, {
      file: 'shadows.html',
      name: 'Skuggor',
      sub: 'Höjd och lyft'
    }, {
      file: 'touch-targets.html',
      name: 'Tryckytor',
      sub: '48px minimum — iOS & Android'
    }, {
      file: 'motion.html',
      name: 'Rörelse',
      sub: 'Varaktighet och easing'
    }, {
      file: 'icons.html',
      name: 'Ikoner',
      sub: 'Lucide-linjeikoner, 24px'
    }, {
      file: 'illustrations.html',
      name: 'Illustrationer',
      sub: 'Sparsam, geometrisk, matt stil'
    }, {
      file: 'logo.html',
      name: 'Logotyp',
      sub: 'Symbol, ordbild och friyta'
    }, {
      file: 'guides.html',
      name: 'Principer',
      sub: 'Grunden bakom alla mönster'
    }, {
      file: 'voice-tone.html',
      name: 'Röst & ton',
      sub: 'Lugn, varm, svensk, andra person'
    }, {
      file: 'utilities.html',
      name: 'Hjälpklasser',
      sub: 'Enkla, komponerbara verktygsklasser'
    }]
  }, {
    group: 'Molecules',
    items: [{
      file: 'buttons.html',
      name: 'Knappar',
      sub: 'Fyra typer som skapar hierarki'
    }, {
      file: 'text-input.html',
      name: 'Textfält',
      sub: 'Etikett, hjälptext, 48px höjd'
    }, {
      file: 'text-area.html',
      name: 'Textområde',
      sub: 'Flerradig fritext'
    }, {
      file: 'select.html',
      name: 'Rullgardin',
      sub: 'Väljer ur en längre lista'
    }, {
      file: 'search.html',
      name: 'Sök',
      sub: 'Filtrerar listor och vyer'
    }, {
      file: 'checkbox.html',
      name: 'Kryssruta',
      sub: 'Välj noll, en eller flera'
    }, {
      file: 'radio.html',
      name: 'Radioknapp',
      sub: 'Välj exakt ett alternativ'
    }, {
      file: 'switch.html',
      name: 'Växel',
      sub: 'Slår på/av direkt'
    }, {
      file: 'segmented-control.html',
      name: 'Segmentkontroll',
      sub: 'Växlar mellan 2–4 likvärdiga vyer'
    }, {
      file: 'badges.html',
      name: 'Etiketter',
      sub: 'Statuspiller och märken'
    }, {
      file: 'avatar.html',
      name: 'Avatar',
      sub: 'Cirkulär identitetsmarkör, fem storlekar'
    }, {
      file: 'icon-tiles.html',
      name: 'Ikonbrickor & chips',
      sub: 'Åtgärdsbrickor, mjuka chips & avatarer'
    }, {
      file: 'floating-card.html',
      name: 'Flytande kort',
      sub: 'Ett recept för varje kortyta — --sh-1'
    }, {
      file: 'product-card.html',
      name: 'Produktkort',
      sub: 'Innehållskort'
    }, {
      file: 'pay-hero.html',
      name: 'Lön-/hjältekort',
      sub: 'Mjukt mint-hjältekort — aldrig mörk fyllning'
    }, {
      file: 'list-rows.html',
      name: 'Listrader',
      sub: 'Inramade grupper och helbredds-listor'
    }, {
      file: 'fab.html',
      name: 'Flytande åtgärdsknapp',
      sub: 'Den enda bestående skapa-åtgärden'
    }, {
      file: 'feedback-mobile.html',
      name: 'Återkoppling',
      sub: 'Banner, snackbar och toast'
    }, {
      file: 'loading.html',
      name: 'Laddning',
      sub: 'Skelett, spinner och dra-för-att-uppdatera'
    }]
  }, {
    group: 'Organisms',
    items: [{
      file: 'app-bar.html',
      name: 'Appfält',
      sub: 'Toppchrome — stor rubrik, kompakt och mörkt'
    }, {
      file: 'frosted-bar.html',
      name: 'Frostat appfält',
      sub: 'Transparent i vila, frostar in vid skroll'
    }, {
      file: 'tab-bar.html',
      name: 'Flikfält',
      sub: 'Primär navigation — ljust och mörkt'
    }, {
      file: 'navigation-patterns.html',
      name: 'Navigationsmönster',
      sub: 'Flikfält · drawer · hybrid — när används vilket'
    }, {
      file: 'nav-item.html',
      name: 'Toppmeny (desktop)',
      sub: 'Vågrät desktop-navigation — 80px bar'
    }, {
      file: 'bottom-sheet.html',
      name: 'Bottenark',
      sub: 'Innehållsark och åtgärdsark'
    }, {
      file: 'dialog.html',
      name: 'Dialog',
      sub: 'Bekräftelser och varningar'
    }, {
      file: 'optimistic-undo.html',
      name: 'Optimistisk ångra',
      sub: 'Godkänn direkt, återställ med ett tryck'
    }, {
      file: 'status-row.html',
      name: 'Återkopplingspanel',
      sub: 'Tumbetyg och valfri kommentar'
    }]
  }];
  const SVG_CHEV = '<svg class="%C%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';
  const groupsEl = document.getElementById('groups');
  const allItems = [];

  // ---- Build DOM ----
  DATA.forEach(function (g) {
    const group = document.createElement('section');
    group.className = 'group';
    const head = document.createElement('div');
    head.className = 'group-head';
    head.innerHTML = SVG_CHEV.replace('%C%', 'group-chev') + '<span class="group-name">' + g.group + '</span>' + '<span class="count">' + g.items.length + '</span>';
    const countEl = head.querySelector('.count');
    const totalCount = g.items.length;
    head.addEventListener('click', function () {
      group.classList.toggle('collapsed');
    });
    group.appendChild(head);
    const body = document.createElement('div');
    body.className = 'group-body';
    g.items.forEach(function (it) {
      const item = document.createElement('article');
      item.className = 'item';
      item.dataset.search = (it.name + ' ' + it.sub).toLowerCase();
      const ihead = document.createElement('div');
      ihead.className = 'item-head';
      ihead.innerHTML = SVG_CHEV.replace('%C%', 'item-chev') + '<div class="item-text"><div class="item-name">' + it.name + '</div>' + '<div class="item-sub">' + it.sub + '</div></div>';
      const ibody = document.createElement('div');
      ibody.className = 'item-body';
      const inner = document.createElement('div');
      inner.className = 'item-inner';
      const frame = document.createElement('iframe');
      frame.title = it.name;
      frame.dataset.src = 'preview/' + it.file;
      inner.appendChild(frame);
      ibody.appendChild(inner);
      ihead.addEventListener('click', function () {
        toggleItem(item);
      });
      item.appendChild(ihead);
      item.appendChild(ibody);
      body.appendChild(item);
      allItems.push({
        el: item,
        body: ibody,
        frame: frame,
        group: group,
        countEl: countEl,
        total: totalCount
      });
    });
    group.appendChild(body);
    group._countEl = countEl;
    group._total = totalCount;
    groupsEl.appendChild(group);
  });

  // ---- toolbar count ----
  (function () {
    var tc = document.getElementById('tcount');
    if (tc) tc.innerHTML = '<b>' + allItems.length + '</b> delar · alla med riktlinjer';
  })();

  // ---- iframe sizing ----
  function sizeFrame(frame) {
    try {
      const doc = frame.contentDocument;
      if (!doc || !doc.body) return;
      const h = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight);
      frame.style.height = h + 'px';
      const item = frame.closest('.item');
      if (item && item.classList.contains('open')) {
        frame.closest('.item-body').style.height = h + 1 + 'px'; // +1 for top border
      }
    } catch (e) {/* same-origin expected; ignore */}
  }
  function loadFrame(frame) {
    if (frame.dataset.loaded) return;
    frame.dataset.loaded = '1';
    frame.addEventListener('load', function () {
      sizeFrame(frame);
      // resize when inner content reflows (fonts, etc.)
      try {
        const doc = frame.contentDocument;
        const ro = new ResizeObserver(function () {
          sizeFrame(frame);
        });
        ro.observe(doc.body);
      } catch (e) {}
      // a couple of late re-measures for webfont swap
      setTimeout(function () {
        sizeFrame(frame);
      }, 250);
      setTimeout(function () {
        sizeFrame(frame);
      }, 700);
    });
    frame.src = frame.dataset.src;
  }

  // ---- open / close ----
  function openItem(item) {
    const rec = recordFor(item);
    item.classList.add('open');
    loadFrame(rec.frame);
    // if already loaded, size immediately; else load handler will do it
    if (rec.frame.dataset.loaded && rec.frame.style.height) {
      rec.body.style.height = parseFloat(rec.frame.style.height) + 1 + 'px';
    } else {
      rec.body.style.height = '600px'; // provisional until measured
    }
  }
  function closeItem(item) {
    item.classList.remove('open');
    recordFor(item).body.style.height = '0px';
  }
  function toggleItem(item) {
    if (item.classList.contains('open')) closeItem(item);else openItem(item);
  }
  function recordFor(item) {
    return allItems.find(function (r) {
      return r.el === item;
    });
  }

  // ---- toolbar ----
  document.getElementById('expand-all').addEventListener('click', function () {
    DATA_groups().forEach(function (g) {
      g.classList.remove('collapsed');
    });
    allItems.forEach(function (r) {
      if (isVisible(r.el) && !r.el.classList.contains('open')) openItem(r.el);
    });
  });
  document.getElementById('collapse-all').addEventListener('click', function () {
    allItems.forEach(function (r) {
      if (r.el.classList.contains('open')) closeItem(r.el);
    });
  });
  function DATA_groups() {
    return Array.prototype.slice.call(document.querySelectorAll('.group'));
  }
  function isVisible(el) {
    return el.style.display !== 'none';
  }

  // ---- filter ----
  const filterEl = document.getElementById('filter');
  const emptyEl = document.getElementById('empty');
  const emptyQ = document.getElementById('empty-q');
  filterEl.addEventListener('input', function () {
    const q = filterEl.value.trim().toLowerCase();
    let anyVisible = false;
    DATA_groups().forEach(function (group) {
      let shown = 0;
      group.querySelectorAll('.item').forEach(function (item) {
        const match = !q || item.dataset.search.indexOf(q) !== -1;
        item.style.display = match ? '' : 'none';
        if (match) shown++;
      });
      group._countEl.textContent = q ? shown : group._total;
      group.style.display = shown ? '' : 'none';
      if (q) group.classList.remove('collapsed');
      if (shown) anyVisible = true;
    });
    emptyQ.textContent = filterEl.value.trim();
    emptyEl.classList.toggle('show', !anyVisible);
  });

  // re-measure open frames on window resize (debounced)
  let rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      allItems.forEach(function (r) {
        if (r.el.classList.contains('open')) sizeFrame(r.frame);
      });
    }, 150);
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ds-overview.js", error: String((e && e.message) || e) }); }

// ui_kits/kontek-next/dashboard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// @ds-adherence-ignore -- internal desktop UI kit helper; not a standalone DS component
/* Kontek Next — Dashboard content (greeting, payroll status, products, marketplace nudge) */

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
  }, "Ut\xF6ka Kontek Next fr\xE5n Marknadsplatsen"), /*#__PURE__*/React.createElement("div", {
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
/* Kontek Next — Icon set (Lucide line icons, MIT). 24×24, 1.75 stroke. */
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

// ui_kits/kontek-next/mobile/android-frame.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// Android.jsx — Simplified Android (Material 3) device frame
// Status bar + top app bar + content + gesture nav + keyboard.
// Based on Figma M3 spec. No dependencies, no image assets.
// Exports (to window): AndroidDevice, AndroidStatusBar, AndroidAppBar, AndroidListItem, AndroidNavBar, AndroidKeyboard
//
// Usage — wrap your screen content in <AndroidDevice> to get the bezel, status
// bar and gesture nav (props: title, large, keyboard, dark):
//
//   <AndroidDevice title="Inbox" large>
//     ...your screen content...
//   </AndroidDevice>
//   <AndroidDevice title="Compose" keyboard>…</AndroidDevice>
/* END USAGE */

const MD_C = {
  surface: '#f4fbf8',
  surfaceVariant: '#dae5e1',
  inverseOnSurface: '#ecf2ef',
  secondaryContainer: '#cde8e1',
  primaryFixedDim: '#83d5c6',
  onSurface: '#171d1b',
  onSurfaceVar: '#49454f',
  onPrimaryContainer: '#00201c',
  primary: '#006a60',
  frameBorder: 'rgba(116,119,117,0.5)'
};

// ─────────────────────────────────────────────────────────────
// Status bar (time left, wifi/cell/battery right)
// ─────────────────────────────────────────────────────────────
function AndroidStatusBar({
  dark = false
}) {
  const c = dark ? '#fff' : MD_C.onSurface;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      position: 'relative',
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 128,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 400,
      letterSpacing: 0.25,
      lineHeight: '20px',
      color: c
    }
  }, "9:30")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: 8,
      transform: 'translateX(-50%)',
      width: 24,
      height: 24,
      borderRadius: 100,
      background: '#2e2e2e'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      paddingRight: 2
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    style: {
      marginRight: -2
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 13.3L.67 5.97a10.37 10.37 0 0114.66 0L8 13.3z",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    style: {
      marginRight: -2
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14.67 14.67V1.33L1.33 14.67h13.34z",
    fill: c
  }))), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3.75",
    y: "2",
    width: "8.5",
    height: "13",
    rx: "1.5",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "5.5",
    y: "0.9",
    width: "5",
    height: "2",
    rx: "0.5",
    fill: c
  }))));
}

// ─────────────────────────────────────────────────────────────
// Top app bar (Material 3 small/medium)
// ─────────────────────────────────────────────────────────────
function AndroidAppBar({
  title = 'Title',
  large = false
}) {
  const iconDot = /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: MD_C.onSurfaceVar,
      opacity: 0.3
    }
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: MD_C.surface,
      padding: '4px 4px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, iconDot, !large && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 22,
      fontWeight: 400,
      color: MD_C.onSurface,
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, title), large && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), iconDot), large && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 16px 20px',
      fontSize: 28,
      fontWeight: 400,
      color: MD_C.onSurface,
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// List item (Material 3)
// ─────────────────────────────────────────────────────────────
function AndroidListItem({
  headline,
  supporting,
  leading
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '12px 16px',
      minHeight: 56,
      boxSizing: 'border-box',
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, leading && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: MD_C.primary,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
      fontWeight: 500,
      flexShrink: 0
    }
  }, leading), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: MD_C.onSurface,
      lineHeight: '24px'
    }
  }, headline), supporting && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: MD_C.onSurfaceVar,
      lineHeight: '20px'
    }
  }, supporting)));
}

// ─────────────────────────────────────────────────────────────
// Gesture nav bar (pill)
// ─────────────────────────────────────────────────────────────
function AndroidNavBar({
  dark = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 108,
      height: 4,
      borderRadius: 2,
      background: dark ? '#fff' : MD_C.onSurface,
      opacity: 0.4
    }
  }));
}

// ─────────────────────────────────────────────────────────────
// Device frame — wraps everything
// ─────────────────────────────────────────────────────────────
function AndroidDevice({
  children,
  width = 412,
  height = 892,
  dark = false,
  title,
  large = false,
  keyboard = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 18,
      overflow: 'hidden',
      background: dark ? '#1d1b20' : MD_C.surface,
      border: `8px solid ${MD_C.frameBorder}`,
      boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement(AndroidStatusBar, {
    dark: dark
  }), title !== undefined && /*#__PURE__*/React.createElement(AndroidAppBar, {
    title: title,
    large: large
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, children), keyboard && /*#__PURE__*/React.createElement(AndroidKeyboard, null), /*#__PURE__*/React.createElement(AndroidNavBar, {
    dark: dark
  }));
}

// ─────────────────────────────────────────────────────────────
// Keyboard — Gboard (Material 3)
// ─────────────────────────────────────────────────────────────
function AndroidKeyboard() {
  let _k = 0;
  const key = (l, {
    flex = 1,
    bg = MD_C.surface,
    r = 6,
    minW,
    fs = 21
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: _k++,
    style: {
      height: 46,
      borderRadius: r,
      flex,
      minWidth: minW,
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Roboto, system-ui',
      fontSize: fs,
      color: MD_C.onPrimaryContainer
    }
  }, l);
  const row = (keys, style = {}) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      justifyContent: 'center',
      ...style
    }
  }, keys.map(l => key(l)));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: MD_C.inverseOnSurface,
      padding: '0 8px 8px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], {
    padding: '0 20px'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, key('', {
    bg: MD_C.surfaceVariant
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flex: 7,
      minWidth: 274
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l))), key('', {
    bg: MD_C.surfaceVariant
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, key('?123', {
    bg: MD_C.secondaryContainer,
    r: 100,
    minW: 58,
    fs: 14
  }), key(',', {
    bg: MD_C.surfaceVariant
  }), key('', {
    flex: 3,
    minW: 154
  }), key('.', {
    bg: MD_C.surfaceVariant
  }), key('', {
    bg: MD_C.primaryFixedDim,
    r: 100,
    minW: 58
  }))));
}
Object.assign(window, {
  AndroidDevice,
  AndroidStatusBar,
  AndroidAppBar,
  AndroidListItem,
  AndroidNavBar,
  AndroidKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/kontek-next/mobile/android-frame.jsx", error: String((e && e.message) || e) }); }

// ui_kits/kontek-next/mobile/design-canvas.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Exports (to window): DesignCanvas, DCSection, DCArtboard, DCPostIt.
// Artboards are reorderable (grip-drag), deletable, labels/titles are
// inline-editable, and any artboard can be opened in a fullscreen focus
// overlay (←/→/Esc). State persists to a .design-canvas.state.json sidecar
// via the host bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>
//
// Artboards are static design frames, not scroll regions — never use
// height: 100% + overflow: auto/scroll on inner elements; size each artboard
// to fit its content (explicit pixel height, or let it grow).
/* END USAGE */

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
  // isolation:isolate contains artboard content's z-indexes so a
  // z-indexed child (sticky navbar etc.) can't paint over .dc-header or
  // the .dc-menu popover that drops into the top of the card.
  '.dc-card{isolation:isolate;transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}',
  // Per-artboard header: grip + label on the left, delete/expand on the
  // right. Single flex row; when the artboard's on-screen width is too
  // narrow for both the label yields (ellipsis, then hidden entirely below
  // ~4ch via the container query) and the buttons stay on the row.
  '.dc-header{position:absolute;bottom:100%;left:-4px;margin-bottom:calc(4px * var(--dc-inv-zoom,1));z-index:2;', '  display:flex;align-items:center;container-type:inline-size}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px;flex:1 1 auto;min-width:0}', '.dc-grip{flex:0 0 auto;cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s,opacity .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{flex:1 1 auto;min-width:0;cursor:pointer;border-radius:4px;padding:3px 6px;', '  display:flex;align-items:center;transition:background .12s;overflow:hidden}',
  // Below ~4ch of label room: hide the label entirely, and drop the grip to
  // hover-only (same reveal rule as .dc-btns) so a narrow header is clean
  // until the card is moused.
  '@container (max-width: 110px){', '  .dc-labeltext{display:none}', '  .dc-grip{opacity:0}', '  [data-dc-slot]:hover .dc-grip{opacity:1}', '}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-labeltext .dc-editable{overflow:hidden;text-overflow:ellipsis;max-width:100%}', '.dc-labeltext .dc-editable:focus{overflow:visible;text-overflow:clip}', '.dc-btns{flex:0 0 auto;margin-left:auto;display:flex;gap:2px;opacity:0;transition:opacity .12s}', '[data-dc-slot]:hover .dc-btns,.dc-btns:has(.dc-menu){opacity:1}', '.dc-expand,.dc-kebab{width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center;', '  font:inherit;transition:background .12s,color .12s}', '.dc-expand:hover,.dc-kebab:hover{background:rgba(0,0,0,.06);color:#2a251f}',
  // Slot hosting an open menu floats above later siblings (which otherwise
  // paint on top — same z-index:auto, later DOM order) so the popup isn't
  // clipped by the next card.
  '[data-dc-slot]:has(.dc-menu){z-index:10}', '.dc-menu{position:absolute;top:100%;right:0;margin-top:4px;background:#fff;border-radius:8px;', '  box-shadow:0 8px 28px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.05);padding:4px;min-width:160px;z-index:10}', '.dc-menu button{display:block;width:100%;padding:7px 10px;border:0;background:transparent;', '  border-radius:5px;font-family:inherit;font-size:13px;font-weight:500;line-height:1.2;', '  color:#29261b;cursor:pointer;text-align:left;transition:background .12s;white-space:nowrap}', '.dc-menu button:hover{background:rgba(0,0,0,.05)}', '.dc-menu hr{border:0;border-top:1px solid rgba(0,0,0,.08);margin:4px 2px}', '.dc-menu .dc-danger{color:#c96442}', '.dc-menu .dc-danger:hover{background:rgba(201,100,66,.1)}',
  // Chrome (titles / labels / buttons) counter-scales against the viewport
  // zoom so it stays a constant on-screen size. --dc-inv-zoom is set by
  // DCViewport on every transform update and inherits to all descendants —
  // any overlay inside the world (e.g. a TweaksPanel on an artboard) can use
  // it the same way.
  //
  // The header uses transform:scale (out-of-flow, so layout impact doesn't
  // matter) with its world-space width set to card-width / inv-zoom so that
  // after counter-scaling its on-screen width exactly matches the card's —
  // that's what lets the container query + text-overflow behave against the
  // card's visible edge at every zoom level.
  //
  // The section head uses CSS zoom instead of transform so its layout box
  // grows with the counter-scale, pushing the card row down — otherwise the
  // constant-screen-size title would overflow into the (shrinking) world-
  // space gap and overlap the artboard headers at low zoom.
  '.dc-header{width:calc((100% + 4px) / var(--dc-inv-zoom,1));', '  transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom left}', '.dc-sectionhead{zoom:var(--dc-inv-zoom,1)}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// Recursively unwrap React.Fragment so <>…</> grouping doesn't hide
// DCSection/DCArtboard children from the type-based walks below.
function dcFlatten(children) {
  const out = [];
  React.Children.forEach(children, c => {
    if (c && c.type === React.Fragment) out.push(...dcFlatten(c.props.children));else out.push(c);
  });
  return out;
}

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, hidden
// artboards, focused artboard). Order/titles/labels/hidden persist to a
// .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Fragments are flattened; wrapping in other
  // elements still opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  dcFlatten(children).forEach(sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const abs = [];
    dcFlatten(sec.props.children).forEach(ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (aid) abs.push([aid, ab]);
    });
    // hidden is scoped to one source revision — when the agent regenerates
    // (artboard-ID set changes), prior deletes don't apply to new content.
    const srcKey = abs.map(([k]) => k).join('\x1f');
    const hidden = persisted.srcKey === srcKey ? persisted.hidden || [] : [];
    const srcIds = [];
    abs.forEach(([aid, ab]) => {
      if (hidden.includes(aid)) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  // Persist viewport across reloads so the user lands back where they were
  // after an agent edit or browser refresh. The sandbox origin is already
  // per-project; pathname keeps multiple canvas files in one project apart.
  const tfKey = 'dc-viewport:' + location.pathname;
  const saveT = React.useRef(0);
  const lastPostedScale = React.useRef();
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    // Exposed for zoom-invariant chrome (labels, buttons, TweaksPanel).
    el.style.setProperty('--dc-inv-zoom', String(1 / scale));
    // Keep the host toolbar's % readout in sync with the canvas scale. Pan
    // ticks leave scale unchanged — skip the cross-frame post for those.
    if (lastPostedScale.current !== scale) {
      lastPostedScale.current = scale;
      window.parent.postMessage({
        type: '__dc_zoom',
        scale
      }, '*');
    }
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    }, 200);
  }, [tfKey]);
  React.useLayoutEffect(() => {
    const flush = () => {
      clearTimeout(saveT.current);
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    };
    try {
      const s = JSON.parse(localStorage.getItem(tfKey) || 'null');
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = {
          x: s.x,
          y: s.y,
          scale: Math.min(maxScale, Math.max(minScale, s.scale))
        };
        apply();
      }
    } catch {}
    // Flush on pagehide and unmount so a reload within the 200ms debounce
    // window doesn't drop the last pan/zoom.
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // --dc-inv-zoom consumers (.dc-sectionhead's CSS zoom, each section's
      // marginBottom) reflow on every scale change, vertically shifting the
      // world layout — so a world point mathematically pinned under the cursor
      // drifts as you zoom (content creeps up on zoom-in, down on zoom-out).
      // Anchor the DOM element under the cursor instead: record its screen Y,
      // apply the transform + --dc-inv-zoom, then cancel whatever vertical
      // drift the reflow introduced so it stays put on screen.
      let marker = null,
        markerY0 = 0;
      if (k !== 1) {
        const hit = document.elementFromPoint(cx, cy);
        marker = hit && hit.closest ? hit.closest('[data-dc-slot],[data-dc-section]') : null;
        if (marker) markerY0 = marker.getBoundingClientRect().top;
      }
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
      if (marker) {
        // A pure zoom around (cx, cy) maps screen Y → cy + (Y - cy) * k. Any
        // departure after the --dc-inv-zoom reflow is the layout drift.
        const drift = marker.getBoundingClientRect().top - (cy + (markerY0 - cy) * k);
        if (Math.abs(drift) > 0.1) {
          t.y -= drift;
          apply();
        }
      }
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        // trackpad pinch, or ctrl/cmd + smooth-scroll mouse. Notched
        // wheels fall through to the fixed-step branch below.
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    // Host-driven zoom (toolbar % menu). Zooms around viewport centre so the
    // visible midpoint stays fixed — matching the host's iframe-zoom feel.
    const onHostMsg = e => {
      const d = e.data;
      if (d && d.type === '__dc_set_zoom' && typeof d.scale === 'number') {
        const r = vp.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2, d.scale / tf.current.scale);
      } else if (d && d.type === '__dc_probe') {
        // Host's [readyGen] reset asks whether a canvas is present; it
        // fires on the iframe's native 'load', which for canvases with
        // images/fonts is after our mount-time announce, so re-announce.
        // Clear the pan-tick guard so apply() re-posts the current scale
        // even if it's unchanged — the host just reset dcScale to 1.
        window.parent.postMessage({
          type: '__dc_present'
        }, '*');
        lastPostedScale.current = undefined;
        apply();
      }
    };
    window.addEventListener('message', onHostMsg);
    // Announce canvas mode so the host toolbar proxies its % control here
    // instead of scaling the iframe element (which would just shrink the
    // viewport window of an infinite canvas). The apply() that follows emits
    // the initial __dc_zoom so the toolbar % is correct before first pinch.
    // lastPostedScale reset mirrors the __dc_probe handler: the layout
    // effect's restore-path apply() may already have posted the restored
    // scale (before __dc_present), so clear the guard to re-post it in order.
    window.parent.postMessage({
      type: '__dc_present'
    }, '*');
    lastPostedScale.current = undefined;
    apply();
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('message', onHostMsg);
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(dcFlatten(children));
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const sec = ctx && sid && ctx.section(sid) || {};
  // Must match DesignCanvas's srcKey computation exactly (it filters falsy
  // IDs), or onDelete persists a srcKey that DesignCanvas never recognizes.
  const allIds = artboards.map(a => a.props.id ?? a.props.label).filter(Boolean);
  const srcKey = allIds.join('\x1f');
  const hidden = sec.srcKey === srcKey ? sec.hidden || [] : [];
  const srcOrder = allIds.filter(k => !hidden.includes(k));
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));

  // marginBottom counter-scales so the on-screen gap between sections stays
  // constant — otherwise at low zoom the (world-space) gap collapses while
  // the screen-constant sectionhead below it doesn't, and the title reads as
  // belonging to the section above. paddingBottom below is just enough for
  // the 24px artboard-header (abs-positioned above each card) plus ~8px, so
  // the title sits tight against its own row at every zoom.
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 'calc(80px * var(--dc-inv-zoom, 1))',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-sectionhead",
    style: {
      paddingBottom: 36
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onDelete: () => ctx && ctx.patchSection(sid, x => ({
      hidden: [...(x.srcKey === srcKey ? x.hidden || [] : []), k],
      srcKey
    })),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}

// Per-artboard export (kind: 'png' | 'html'). Both paths share the same
// self-contained clone: computed styles baked in, @font-face / <img> /
// inline-style background-image urls inlined as data URIs. PNG wraps the
// clone in foreignObject→canvas at 3× the artboard's natural width×height
// (same pipeline the host uses for page captures); HTML wraps it in a
// minimal standalone document. Both are independent of viewport zoom.
async function dcExport(node, w, h, name, kind) {
  try {
    await document.fonts.ready;
  } catch {}
  const toDataURL = url => fetch(url).then(r => r.blob()).then(b => new Promise(res => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => res(url);
    fr.readAsDataURL(b);
  })).catch(() => url);

  // Collect @font-face rules. ss.cssRules throws SecurityError on
  // cross-origin sheets (e.g. fonts.googleapis.com) — in that case fetch
  // the CSS text directly (those endpoints send ACAO:*) and regex-extract
  // the blocks. @import and @media/@supports are walked so nested
  // @font-face rules aren't missed.
  const fontRules = [],
    pending = [],
    seen = new Set();
  const scrapeCss = href => {
    if (seen.has(href)) return;
    seen.add(href);
    pending.push(fetch(href).then(r => r.text()).then(css => {
      for (const m of css.match(/@font-face\s*{[^}]*}/g) || []) fontRules.push({
        css: m,
        base: href
      });
      for (const m of css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)/g)) scrapeCss(new URL(m[1], href).href);
    }).catch(() => {}));
  };
  const walk = (rules, base) => {
    for (const r of rules) {
      if (r.type === CSSRule.FONT_FACE_RULE) fontRules.push({
        css: r.cssText,
        base
      });else if (r.type === CSSRule.IMPORT_RULE && r.styleSheet) {
        const ibase = r.styleSheet.href || base;
        try {
          walk(r.styleSheet.cssRules, ibase);
        } catch {
          scrapeCss(ibase);
        }
      } else if (r.cssRules) walk(r.cssRules, base);
    }
  };
  for (const ss of document.styleSheets) {
    const base = ss.href || location.href;
    try {
      walk(ss.cssRules, base);
    } catch {
      if (ss.href) scrapeCss(ss.href);
    }
  }
  while (pending.length) await pending.shift();
  const fontCss = (await Promise.all(fontRules.map(async rule => {
    let out = rule.css,
      m;
    const re = /url\((['"]?)([^'")]+)\1\)/g;
    while (m = re.exec(rule.css)) {
      if (m[2].indexOf('data:') === 0) continue;
      let abs;
      try {
        abs = new URL(m[2], rule.base).href;
      } catch {
        continue;
      }
      out = out.split(m[0]).join('url("' + (await toDataURL(abs)) + '")');
    }
    return out;
  }))).join('\n');
  const cloneStyled = src => {
    if (src.nodeType === 8 || src.nodeType === 1 && src.tagName === 'SCRIPT') return document.createTextNode('');
    const dst = src.cloneNode(false);
    if (src.nodeType === 1) {
      const cs = getComputedStyle(src);
      let txt = '';
      for (let i = 0; i < cs.length; i++) txt += cs[i] + ':' + cs.getPropertyValue(cs[i]) + ';';
      dst.setAttribute('style', txt + 'animation:none;transition:none;');
      if (src.tagName === 'CANVAS') try {
        const im = document.createElement('img');
        im.src = src.toDataURL();
        im.setAttribute('style', txt);
        return im;
      } catch {}
    }
    for (let c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneStyled(c));
    return dst;
  };
  const clone = cloneStyled(node);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  // Drop the card's own shadow/radius so the export is a flush w×h rect;
  // the artboard's own background (if any) is already in the computed style.
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  const jobs = [];
  clone.querySelectorAll('img').forEach(el => {
    const s = el.getAttribute('src');
    if (s && s.indexOf('data:') !== 0) jobs.push(toDataURL(el.src).then(d => el.setAttribute('src', d)));
  });
  [clone, ...clone.querySelectorAll('*')].forEach(el => {
    const bg = el.style.backgroundImage;
    if (!bg) return;
    let m;
    const re = /url\(["']?([^"')]+)["']?\)/g;
    while (m = re.exec(bg)) {
      const tok = m[0],
        url = m[1];
      if (url.indexOf('data:') === 0) continue;
      jobs.push(toDataURL(url).then(d => {
        el.style.backgroundImage = el.style.backgroundImage.split(tok).join('url("' + d + '")');
      }));
    }
  });
  await Promise.all(jobs);
  const xml = new XMLSerializer().serializeToString(clone);
  const save = (blob, ext) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.' + ext;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  if (kind === 'html') {
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>' + name + '</title>' + (fontCss ? '<style>' + fontCss + '</style>' : '') + '</head><body style="margin:0">' + xml + '</body></html>';
    return save(new Blob([html], {
      type: 'text/html'
    }), 'html');
  }

  // PNG: the SVG's own width/height must be the output resolution — an
  // <img>-loaded SVG rasterizes at its intrinsic size, so sizing it at 1×
  // and ctx.scale()-ing up would just upscale a 1× bitmap. viewBox maps the
  // w×h foreignObject onto the px·w × px·h SVG canvas so the browser renders
  // the HTML at full resolution.
  const px = 3;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w * px + '" height="' + h * px + '" viewBox="0 0 ' + w + ' ' + h + '"><foreignObject width="' + w + '" height="' + h + '">' + (fontCss ? '<style><![CDATA[' + fontCss + ']]></style>' : '') + xml + '</foreignObject></svg>';
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = () => rej(new Error('svg load failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const cv = document.createElement('canvas');
  cv.width = w * px;
  cv.height = h * px;
  cv.getContext('2d').drawImage(img, 0, 0);
  cv.toBlob(blob => save(blob, 'png'), 'image/png');
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus,
  onDelete
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);
  const cardRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);

  // ⋯ menu: close on any outside pointerdown. Two-click delete lives inside
  // the menu — first click arms the row, second commits; closing disarms.
  React.useEffect(() => {
    if (!menuOpen) {
      setConfirming(false);
      return;
    }
    const off = e => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, [menuOpen]);
  const doExport = kind => {
    setMenuOpen(false);
    if (!cardRef.current) return;
    const name = String(label || id || 'artboard').replace(/[^\w\s.-]+/g, '_');
    dcExport(cardRef.current, width, height, name, kind).catch(e => console.error('[design-canvas] export failed:', e));
  };

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-header",
    "data-omelette-chrome": "",
    style: {
      color: DC.label
    },
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-btns"
  }, /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "dc-kebab",
    title: "More",
    onClick: () => setMenuOpen(o => !o)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2.5",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "6",
    r: "1.1"
  }))), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "dc-menu",
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('png')
  }, "Download PNG"), /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('html')
  }, "Download HTML"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    className: "dc-danger",
    onClick: () => {
      if (confirming) {
        setMenuOpen(false);
        onDelete();
      } else setConfirming(true);
    }
  }, confirming ? 'Click again to delete' : 'Delete'))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))))), /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    // Sections whose artboards are all deleted have slotIds:[] — step past
    // them to the next non-empty section so ↑/↓ doesn't dead-end.
    const n = sectionOrder.length;
    for (let i = 1; i < n; i++) {
      const ns = sectionOrder[((secIdx + d * i) % n + n) % n];
      const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
      if (first) {
        ctx.setFocus(`${ns}/${first}`);
        return;
      }
    }
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.filter(sid => sectionMeta[sid].slotIds.length).map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/kontek-next/mobile/design-canvas.jsx", error: String((e && e.message) || e) }); }

// ui_kits/kontek-next/mobile/ios-frame.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports (to window): IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard
//
// Usage — wrap your screen content in <IOSDevice> to get the bezel, status bar
// and home indicator (props: title, dark, keyboard):
//
//   <IOSDevice title="Settings">
//     ...your screen content...
//   </IOSDevice>
//   <IOSDevice dark title="Search" keyboard>…</IOSDevice>
/* END USAGE */

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({
  dark = false,
  time = '9:41'
}) {
  const c = dark ? '#fff' : '#000';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 154,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '21px 24px 19px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 20,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '-apple-system, "SF Pro", system-ui',
      fontWeight: 590,
      fontSize: 17,
      lineHeight: '22px',
      color: c
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      paddingTop: 1,
      paddingRight: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "12",
    viewBox: "0 0 19 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7.5",
    width: "3.2",
    height: "4.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.8",
    y: "5",
    width: "3.2",
    height: "7",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9.6",
    y: "2.5",
    width: "3.2",
    height: "9.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14.4",
    y: "0",
    width: "3.2",
    height: "12",
    rx: "0.7",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z",
    fill: c
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "10.5",
    r: "1.5",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "27",
    height: "13",
    viewBox: "0 0 27 13"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "23",
    height: "12",
    rx: "3.5",
    stroke: c,
    strokeOpacity: "0.35",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "9",
    rx: "2",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z",
    fill: c,
    fillOpacity: "0.4"
  }))));
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({
  children,
  dark = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      minWidth: 44,
      borderRadius: 9999,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: dark ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0 4px'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({
  title = 'Title',
  dark = false,
  trailingIcon = true
}) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = content => /*#__PURE__*/React.createElement(IOSGlassPill, {
    dark: dark
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, content));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingTop: 62,
      paddingBottom: 10,
      position: 'relative',
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px'
    }
  }, pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "20",
    viewBox: "0 0 12 20",
    fill: "none",
    style: {
      marginLeft: -1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 2L2 10l8 8",
    stroke: muted,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), trailingIcon && pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "6",
    viewBox: "0 0 22 6"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "3",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "3",
    r: "2.5",
    fill: muted
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      fontFamily: '-apple-system, system-ui',
      fontSize: 34,
      fontWeight: 700,
      lineHeight: '41px',
      color: text,
      letterSpacing: 0.4
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({
  title,
  detail,
  icon,
  chevron = true,
  isLast = false,
  dark = false
}) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 52,
      padding: '0 16px',
      position: 'relative',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      letterSpacing: -0.43
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 7,
      background: icon,
      marginRight: 12,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      color: text
    }
  }, title), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: sec,
      marginRight: 6
    }
  }, detail), chevron && /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "14",
    viewBox: "0 0 8 14",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l6 6-6 6",
    stroke: ter,
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: icon ? 58 : 16,
      height: 0.5,
      background: sep
    }
  }));
}
function IOSList({
  header,
  children,
  dark = false
}) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return /*#__PURE__*/React.createElement("div", null, header && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '-apple-system, system-ui',
      fontSize: 13,
      color: hc,
      textTransform: 'uppercase',
      padding: '8px 36px 6px',
      letterSpacing: -0.08
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 26,
      margin: '0 16px',
      overflow: 'hidden'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children,
  width = 402,
  height = 874,
  dark = false,
  title,
  keyboard = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 48,
      overflow: 'hidden',
      position: 'relative',
      background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 11,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 126,
      height: 37,
      borderRadius: 24,
      background: '#000',
      zIndex: 50
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement(IOSStatusBar, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, title !== undefined && /*#__PURE__*/React.createElement(IOSNavBar, {
    title: title,
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, children), keyboard && /*#__PURE__*/React.createElement(IOSKeyboard, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 60,
      height: 34,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingBottom: 8,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 139,
      height: 5,
      borderRadius: 100,
      background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)'
    }
  })));
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({
  dark = false
}) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: /*#__PURE__*/React.createElement("svg", {
      width: "19",
      height: "17",
      viewBox: "0 0 19 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z",
      fill: glyph
    })),
    del: /*#__PURE__*/React.createElement("svg", {
      width: "23",
      height: "17",
      viewBox: "0 0 23 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z",
      fill: "none",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 5l7 7M17 5l-7 7",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinecap: "round"
    })),
    ret: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "14",
      viewBox: "0 0 20 14"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 1v6H4m0 0l4-4M4 7l4 4",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))
  };
  const key = (content, {
    w,
    flex,
    ret,
    fs = 25,
    k
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      height: 42,
      borderRadius: 8.5,
      flex: flex ? 1 : undefined,
      width: w,
      minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs,
      fontWeight: 458,
      color: ret ? '#fff' : glyph
    }
  }, content);
  const row = (keys, pad = 0) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      justifyContent: 'center',
      padding: `0 ${pad}px`
    }
  }, keys.map(l => key(l, {
    flex: true,
    k: l
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 15,
      borderRadius: 27,
      overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: dark ? '0 -2px 20px rgba(0,0,0,0.09)' : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      padding: '8px 22px 13px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, ['"The"', 'the', 'to'].map((w, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 25,
      background: '#ccc',
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      color: sugg,
      letterSpacing: -0.43,
      lineHeight: '22px'
    }
  }, w)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      padding: '0 6.5px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], 20), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14.25,
      alignItems: 'center'
    }
  }, key(icons.shift, {
    w: 45,
    k: 'shift'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      flex: 1
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l, {
    flex: true,
    k: l
  }))), key(icons.del, {
    w: 45,
    k: 'del'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, key('ABC', {
    w: 92.25,
    fs: 18,
    k: 'abc'
  }), key('', {
    flex: true,
    k: 'space'
  }), key(icons.ret, {
    w: 92.25,
    ret: true,
    k: 'ret'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      width: '100%',
      position: 'relative'
    }
  }));
}
Object.assign(window, {
  IOSDevice,
  IOSStatusBar,
  IOSNavBar,
  IOSGlassPill,
  IOSList,
  IOSListRow,
  IOSKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/kontek-next/mobile/ios-frame.jsx", error: String((e && e.message) || e) }); }

// ui_kits/kontek-next/mobile/m-apps.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Kontek Next — Mobile app shells. Two navigation variants that share the
   same screen bodies (MDashboard / MLon / MTime / MPlaceholder).
   - MTabBarApp:  dark bottom tab bar + "Mer" bottom sheet
   - MDrawerApp:  top app bar + hamburger → slide-in drawer (mirrors desktop rail) */
const {
  useState: mUseState
} = React;
const M_ASSETS = '../../../assets/';

/* which screen body to render for a given nav id */
function renderScreen(id, onNavigate) {
  if (id === 'overview') return /*#__PURE__*/React.createElement(MDashboard, {
    onNavigate: onNavigate
  });
  if (id === 'payroll') return /*#__PURE__*/React.createElement(MLon, {
    onNavigate: onNavigate
  });
  if (id === 'time') return /*#__PURE__*/React.createElement(MTime, null);
  const meta = {
    sphere: {
      icon: 'orbit',
      name: 'Sphere'
    },
    employees: {
      icon: 'users',
      name: 'Anställda'
    },
    reports: {
      icon: 'fileText',
      name: 'Rapporter'
    },
    market: {
      icon: 'store',
      name: 'Marknadsplats'
    },
    settings: {
      icon: 'settings',
      name: 'Inställningar'
    },
    help: {
      icon: 'helpCircle',
      name: 'Hjälp'
    }
  }[id] || {
    icon: 'dashboard',
    name: 'Kontek Next'
  };
  return /*#__PURE__*/React.createElement(MPlaceholder, {
    icon: meta.icon,
    name: meta.name
  });
}

/* shared light top app bar (company + alerts + avatar). `left` slot is optional.
   `topInset` clears the device status bar: iOS overlays its status bar (56),
   Android renders one in-flow already (use ~14). */
function MTopBar({
  left,
  topInset = 56
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      flexShrink: 0,
      position: 'relative',
      zIndex: 4,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: topInset + 'px 14px 12px',
      background: 'var(--canvas)',
      borderBottom: '1px solid var(--line-2)'
    }
  }, left, /*#__PURE__*/React.createElement("button", {
    style: {
      flex: left ? 'none' : 1,
      minWidth: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      cursor: 'pointer',
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      borderRadius: 10,
      padding: '8px 12px',
      boxShadow: 'var(--shadow-xs)',
      justifyContent: left ? 'center' : 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "building",
    size: 17,
    stroke: "var(--signature)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 13.5,
      fontWeight: 600,
      color: 'var(--ink)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, "Norrstr\xF6m Industrier AB"), /*#__PURE__*/React.createElement(MIcon, {
    name: "chevronDown",
    size: 15,
    stroke: "var(--ink-3)"
  })), /*#__PURE__*/React.createElement("button", {
    title: "Aviseringar",
    style: {
      position: 'relative',
      width: 40,
      height: 40,
      borderRadius: 999,
      flexShrink: 0,
      cursor: 'pointer',
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "bell",
    size: 19,
    stroke: "var(--ink-2)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 8,
      right: 9,
      width: 7,
      height: 7,
      borderRadius: 999,
      background: 'var(--red)',
      border: '1.5px solid var(--surface)'
    }
  })));
}

/* ============================ TAB BAR VARIANT ============================ */
function MTabBarApp({
  topInset = 56
}) {
  const [active, setActive] = mUseState('overview');
  const [sheet, setSheet] = mUseState(false);
  const go = id => {
    setActive(id);
    setSheet(false);
  };
  const tabs = [{
    id: 'overview',
    icon: 'dashboard',
    label: 'Översikt'
  }, {
    id: 'payroll',
    icon: 'banknote',
    label: 'Lön',
    badge: '1'
  }, {
    id: 'time',
    icon: 'clock',
    label: 'Time',
    badge: '7'
  }, {
    id: 'more',
    icon: 'moreHorizontal',
    label: 'Mer'
  }];
  const moreActive = !['overview', 'payroll', 'time'].includes(active);
  const sheetItems = [{
    id: 'sphere',
    icon: 'orbit',
    label: 'Sphere'
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
  }, {
    id: 'settings',
    icon: 'settings',
    label: 'Inställningar'
  }, {
    id: 'help',
    icon: 'helpCircle',
    label: 'Hjälp'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--canvas)',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(MTopBar, {
    topInset: topInset
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch'
    }
  }, renderScreen(active, go)), /*#__PURE__*/React.createElement("nav", {
    style: {
      flexShrink: 0,
      background: 'var(--shell-bg)',
      position: 'relative',
      zIndex: 5,
      paddingBottom: 26,
      paddingTop: 9,
      display: 'flex',
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: 1,
      background: 'linear-gradient(90deg, transparent, rgba(97,188,143,0.35), transparent)'
    }
  }), tabs.map(t => {
    const on = t.id === 'more' ? moreActive : active === t.id;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => t.id === 'more' ? setSheet(true) : go(t.id),
      style: {
        flex: 1,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
        padding: '4px 0'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement(MIcon, {
      name: t.icon,
      size: 23,
      stroke: on ? '#A9E3BE' : 'var(--shell-ink-2)',
      strokeWidth: on ? 2 : 1.75
    }), t.badge && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: -5,
        right: -9,
        minWidth: 16,
        height: 16,
        borderRadius: 999,
        background: 'var(--green)',
        color: '#06321F',
        fontSize: 10,
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 4px',
        border: '1.5px solid var(--shell-bg)'
      }
    }, t.badge)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-ui)',
        fontSize: 10.5,
        fontWeight: on ? 700 : 500,
        color: on ? '#A9E3BE' : 'var(--shell-ink-2)',
        letterSpacing: '0.01em'
      }
    }, t.label));
  })), /*#__PURE__*/React.createElement("div", {
    onClick: () => setSheet(false),
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 20,
      background: 'rgba(5,18,18,0.42)',
      opacity: sheet ? 1 : 0,
      pointerEvents: sheet ? 'auto' : 'none',
      transition: 'opacity 240ms var(--ease)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 21,
      background: 'var(--surface)',
      borderRadius: '22px 22px 0 0',
      padding: '10px 16px 34px',
      boxShadow: '0 -12px 40px rgba(5,34,37,0.22)',
      transform: sheet ? 'translateY(0)' : 'translateY(110%)',
      transition: 'transform 280ms var(--ease)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 5,
      borderRadius: 999,
      background: 'var(--line)',
      margin: '0 auto 14px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10
    }
  }, sheetItems.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.id,
    onClick: () => go(it.id),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      cursor: 'pointer',
      background: 'var(--surface-2)',
      border: '1px solid var(--line-2)',
      borderRadius: 12,
      padding: '13px 14px',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: it.icon,
    size: 20,
    stroke: "var(--signature)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--ink)'
    }
  }, it.label))))));
}

/* ============================= DRAWER VARIANT ============================= */
function MDrawerNavItem({
  icon,
  label,
  badge,
  active,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 13,
      width: '100%',
      textAlign: 'left',
      height: 46,
      padding: '0 12px',
      borderRadius: 11,
      border: 'none',
      cursor: 'pointer',
      background: active ? 'var(--shell-active)' : 'transparent',
      color: active ? 'var(--shell-ink)' : 'var(--shell-ink-2)'
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: icon,
    size: 20,
    stroke: active ? 'var(--shell-ink)' : 'currentColor'
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontFamily: 'var(--font-ui)',
      fontSize: 14.5,
      fontWeight: active ? 600 : 500
    }
  }, label), badge && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: 'var(--shell-cta-ink)',
      background: 'var(--shell-cta)',
      borderRadius: 999,
      padding: '2px 8px'
    }
  }, badge));
}
function MDrawerApp({
  topInset = 56
}) {
  const [active, setActive] = mUseState('overview');
  const [open, setOpen] = mUseState(false);
  const go = id => {
    setActive(id);
    setOpen(false);
  };
  const main = [{
    id: 'overview',
    icon: 'dashboard',
    label: 'Översikt'
  }, {
    id: 'payroll',
    icon: 'banknote',
    label: 'Lön',
    badge: '1'
  }, {
    id: 'time',
    icon: 'clock',
    label: 'Time',
    badge: '7'
  }, {
    id: 'sphere',
    icon: 'orbit',
    label: 'Sphere'
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
  const hamburger = /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(true),
    title: "Meny",
    style: {
      width: 40,
      height: 40,
      borderRadius: 10,
      flexShrink: 0,
      cursor: 'pointer',
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "menu",
    size: 20,
    stroke: "var(--ink)"
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--canvas)',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(MTopBar, {
    left: hamburger,
    topInset: topInset
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      paddingBottom: 24
    }
  }, renderScreen(active, go)), /*#__PURE__*/React.createElement("div", {
    onClick: () => setOpen(false),
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 30,
      background: 'rgba(5,18,18,0.5)',
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'auto' : 'none',
      transition: 'opacity 240ms var(--ease)'
    }
  }), /*#__PURE__*/React.createElement("aside", {
    style: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: 290,
      zIndex: 31,
      background: 'var(--shell-bg)',
      boxShadow: '8px 0 40px rgba(0,0,0,0.4)',
      transform: open ? 'translateX(0)' : 'translateX(-104%)',
      transition: 'transform 300ms var(--ease)',
      display: 'flex',
      flexDirection: 'column',
      padding: '54px 16px 22px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: 'radial-gradient(150% 60% at 60% 104%, rgba(128,192,160,0.40) 0%, rgba(74,124,108,0.16) 48%, transparent 76%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '6px 6px 22px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: M_ASSETS + 'kontek-logo-white-sm.png',
    alt: "Kontek",
    style: {
      height: 28,
      width: 'auto',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(false),
    style: {
      width: 34,
      height: 34,
      borderRadius: 999,
      cursor: 'pointer',
      background: 'rgba(255,255,255,0.08)',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "x",
    size: 18,
    stroke: "var(--shell-ink-2)"
  }))), /*#__PURE__*/React.createElement("button", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 9,
      width: '100%',
      border: 'none',
      cursor: 'pointer',
      background: 'var(--shell-cta)',
      color: 'var(--shell-cta-ink)',
      borderRadius: 12,
      padding: '13px 16px',
      fontFamily: 'var(--font-ui)',
      fontSize: 14.5,
      fontWeight: 600,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "plus",
    size: 18,
    stroke: "var(--shell-cta-ink)",
    strokeWidth: 2.2
  }), " Ny l\xF6nek\xF6rning"), /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      overflowY: 'auto'
    }
  }, main.map(it => /*#__PURE__*/React.createElement(MDrawerNavItem, _extends({
    key: it.id
  }, it, {
    active: active === it.id,
    onClick: () => go(it.id)
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 8
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderTop: '1px solid var(--shell-line)',
      margin: '12px 0'
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    }
  }, bottom.map(it => /*#__PURE__*/React.createElement(MDrawerNavItem, _extends({
    key: it.id
  }, it, {
    active: active === it.id,
    onClick: () => go(it.id)
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      marginTop: 14,
      padding: '10px 8px',
      borderTop: '1px solid var(--shell-line)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 999,
      background: 'var(--guide)',
      color: '#fff',
      fontSize: 13,
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, "AL"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13.5,
      fontWeight: 600,
      color: 'var(--shell-ink)'
    }
  }, "Anna Lindqvist"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 12,
      color: 'var(--on-dark-3)'
    }
  }, "L\xF6nechef")), /*#__PURE__*/React.createElement(MIcon, {
    name: "logOut",
    size: 18,
    stroke: "var(--on-dark-3)"
  }))));
}

/* ============================= HYBRID VARIANT =============================
   Bottom tab bar for the four primary destinations + a raised, centred
   create action (the FAB folded into the bar). The centre button opens a
   quick-action sheet — "Ny lönekörning" and friends — so the most common
   create is always one thumb-tap away regardless of the current screen. */
function MHybridApp({
  topInset = 56
}) {
  const [active, setActive] = mUseState('overview');
  const [sheet, setSheet] = mUseState(false);
  const go = id => {
    setActive(id);
    setSheet(false);
  };
  const tabs = [{
    id: 'overview',
    icon: 'dashboard',
    label: 'Översikt'
  }, {
    id: 'payroll',
    icon: 'banknote',
    label: 'Lön',
    badge: '1'
  }, {
    id: 'time',
    icon: 'clock',
    label: 'Time',
    badge: '7'
  }, {
    id: 'reports',
    icon: 'fileText',
    label: 'Rapporter'
  }];
  const quickActions = [{
    id: 'run',
    icon: 'banknote',
    label: 'Ny lönekörning'
  }, {
    id: 'employee',
    icon: 'userRound',
    label: 'Ny anställd'
  }, {
    id: 'absence',
    icon: 'plane',
    label: 'Registrera frånvaro'
  }, {
    id: 'report',
    icon: 'fileText',
    label: 'Skapa rapport'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--canvas)',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(MTopBar, {
    topInset: topInset
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch'
    }
  }, renderScreen(active, go)), /*#__PURE__*/React.createElement("nav", {
    style: {
      flexShrink: 0,
      background: 'var(--surface)',
      borderTop: '1px solid var(--line)',
      position: 'relative',
      zIndex: 5,
      paddingBottom: 26,
      paddingTop: 8,
      display: 'flex',
      alignItems: 'stretch'
    }
  }, tabs.slice(0, 2).map(t => /*#__PURE__*/React.createElement(MHybridTab, _extends({
    key: t.id
  }, t, {
    active: active === t.id,
    onClick: () => go(t.id)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSheet(true),
    "aria-label": "Skapa ny",
    style: {
      marginTop: -26,
      width: 58,
      height: 58,
      borderRadius: 20,
      border: 'none',
      cursor: 'pointer',
      background: 'var(--shell-cta)',
      color: 'var(--shell-cta-ink)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 22px rgba(97,188,143,0.40), 0 2px 6px rgba(18,33,33,0.16)'
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "plus",
    size: 28,
    stroke: "var(--shell-cta-ink)",
    strokeWidth: 2.2
  }))), tabs.slice(2).map(t => /*#__PURE__*/React.createElement(MHybridTab, _extends({
    key: t.id
  }, t, {
    active: active === t.id,
    onClick: () => go(t.id)
  })))), /*#__PURE__*/React.createElement("div", {
    onClick: () => setSheet(false),
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 20,
      background: 'rgba(5,18,18,0.42)',
      opacity: sheet ? 1 : 0,
      pointerEvents: sheet ? 'auto' : 'none',
      transition: 'opacity 240ms var(--ease)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 21,
      background: 'var(--surface)',
      borderRadius: '24px 24px 0 0',
      padding: '10px 16px 34px',
      boxShadow: '0 -12px 40px rgba(5,34,37,0.22)',
      transform: sheet ? 'translateY(0)' : 'translateY(110%)',
      transition: 'transform 280ms var(--ease)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 5,
      borderRadius: 999,
      background: 'var(--line)',
      margin: '0 auto 14px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 20,
      fontWeight: 700,
      color: 'var(--ink)',
      letterSpacing: '-0.01em',
      margin: '0 2px 14px'
    }
  }, "Skapa ny"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, quickActions.map(a => /*#__PURE__*/React.createElement("button", {
    key: a.id,
    onClick: () => setSheet(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      width: '100%',
      minHeight: 48,
      padding: '14px 16px',
      textAlign: 'left',
      border: 'none',
      background: 'var(--surface-2)',
      borderRadius: 12,
      fontFamily: 'var(--font-ui)',
      fontSize: 16,
      fontWeight: 500,
      color: 'var(--ink)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: a.icon,
    size: 22,
    stroke: "var(--signature)"
  }), " ", a.label)))));
}
function MHybridTab({
  icon,
  label,
  badge,
  active,
  onClick
}) {
  const col = active ? 'var(--signature)' : 'var(--ink-3)';
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      flex: 1,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
      padding: '6px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: icon,
    size: 23,
    stroke: col,
    strokeWidth: active ? 2.1 : 1.85
  }), badge && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -5,
      right: -10,
      minWidth: 16,
      height: 16,
      borderRadius: 999,
      background: 'var(--green)',
      color: 'var(--ground)',
      fontSize: 10,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 4px',
      border: '2px solid var(--surface)'
    }
  }, badge)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 10.5,
      fontWeight: active ? 600 : 500,
      color: col
    }
  }, label));
}
Object.assign(window, {
  MTabBarApp,
  MDrawerApp,
  MHybridApp,
  MHybridTab
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/kontek-next/mobile/m-apps.jsx", error: String((e && e.message) || e) }); }

// ui_kits/kontek-next/mobile/m-icons.jsx
try { (() => {
/* Kontek Next — Mobile icon set (Lucide line icons, MIT). 24×24, 1.75 stroke.
   Superset of the desktop icons.jsx plus a few mobile-chrome glyphs.
   Exposes <MIcon> so it never collides with the desktop kit's <Icon>. */
const M_ICON_PATHS = {
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
  chevronLeft: '<path d="m15 18-6-6 6-6"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  arrowLeft: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  checkCircle: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  arrowUpRight: '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  helpCircle: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  building: '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
  userRound: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
  logOut: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>',
  menu: '<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  moreHorizontal: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  listChecks: '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
  coins: '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>',
  plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
  heartPulse: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>',
  send: '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>'
};
function MIcon({
  name,
  size = 18,
  stroke = 'currentColor',
  strokeWidth = 1.75,
  style
}) {
  const d = M_ICON_PATHS[name] || '';
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
window.MIcon = MIcon;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/kontek-next/mobile/m-icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/kontek-next/mobile/m-screens.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Kontek Next — Mobile screens (shared by both nav variants).
   Each screen renders ONLY the scrollable body (large title + content);
   the app shell supplies the top chrome and the navigation.
   Brand tokens come from ../tokens.css. Open Sans throughout. */
const {
  useState: sUseState
} = React;

/* ---------- shared bits ---------- */
const MUI = 'var(--font-ui)';
function MScreen({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MUI,
      color: 'var(--ink)',
      padding: '8px 20px 28px',
      display: 'flex',
      flexDirection: 'column'
    }
  }, children);
}
function MTitle({
  eyebrow,
  title,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '6px 2px 20px'
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--green-deep)'
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 30,
      lineHeight: 1.08,
      letterSpacing: '-0.02em',
      fontWeight: 700,
      color: 'var(--ink)',
      margin: eyebrow ? '7px 0 0' : 0
    }
  }, title), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14.5,
      color: 'var(--ink-3)',
      margin: '7px 0 0',
      lineHeight: 1.45,
      textWrap: 'pretty'
    }
  }, sub));
}
function MSectionHeader({
  title,
  action,
  onAction
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      margin: '26px 2px 12px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 19,
      fontWeight: 700,
      letterSpacing: '-0.01em',
      color: 'var(--ink)',
      margin: 0
    }
  }, title), action && /*#__PURE__*/React.createElement("button", {
    onClick: onAction,
    style: {
      background: 'none',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      fontFamily: MUI,
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--green-deep)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3
    }
  }, action, " ", /*#__PURE__*/React.createElement(MIcon, {
    name: "chevronRight",
    size: 14,
    stroke: "var(--green-deep)"
  })));
}
function MStatusPill({
  children,
  tone = 'ok'
}) {
  const map = {
    ok: {
      bg: 'var(--ok-soft)',
      fg: 'var(--ok-text)'
    },
    warn: {
      bg: 'var(--warn-soft)',
      fg: 'var(--warn-text)'
    },
    info: {
      bg: 'var(--info-soft)',
      fg: 'var(--info-text)'
    },
    neutral: {
      bg: 'var(--surface-2)',
      fg: 'var(--ink-3)'
    }
  }[tone];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 600,
      color: map.fg,
      background: map.bg,
      borderRadius: 999,
      padding: '4px 10px',
      lineHeight: 1.3,
      whiteSpace: 'nowrap'
    }
  }, children);
}
function MProgress({
  pct
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: 'rgba(238,242,239,0.16)',
      borderRadius: 999,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: pct + '%',
      background: 'var(--green)',
      borderRadius: 999
    }
  }));
}

/* The dark payroll-status hero card (Översikt + Lön). */
function MPayrollHero({
  onApprove
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--signature)',
      borderRadius: 18,
      padding: 20,
      boxShadow: 'var(--shadow-md)',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: 'radial-gradient(120% 80% at 100% 0%, rgba(97,188,143,0.20) 0%, transparent 55%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 42,
      height: 42,
      borderRadius: 12,
      background: 'rgba(97,188,143,0.16)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "checkCircle",
    size: 22,
    stroke: "#61BC8F"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#61BC8F'
    }
  }, "L\xF6nek\xF6rning \xB7 Maj")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      color: 'var(--on-dark)',
      lineHeight: 1.3,
      textWrap: 'pretty'
    }
  }, "Norrstr\xF6m Industrier AB \xE4r klar f\xF6r granskning"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--on-dark-2)',
      marginTop: 6,
      lineHeight: 1.4
    }
  }, "32 anst\xE4llda \xB7 utbetalning 25 maj \xB7 inga avvikelser"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(MProgress, {
    pct: 82
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--on-dark-3)',
      marginTop: 8
    }
  }, "4 av 5 steg klara \u2014 sista steget \xE4r ditt godk\xE4nnande"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9,
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onApprove,
    style: {
      height: 48,
      border: 'none',
      borderRadius: 12,
      background: '#61BC8F',
      color: '#122121',
      fontFamily: MUI,
      fontSize: 15,
      fontWeight: 600,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      boxShadow: '0 6px 18px rgba(97,188,143,0.30)'
    }
  }, "Granska & godk\xE4nn ", /*#__PURE__*/React.createElement(MIcon, {
    name: "arrowRight",
    size: 17,
    stroke: "#122121"
  })), /*#__PURE__*/React.createElement("button", {
    style: {
      height: 44,
      borderRadius: 12,
      background: 'transparent',
      color: 'var(--on-dark-2)',
      border: '1px solid rgba(238,242,239,0.18)',
      fontFamily: MUI,
      fontSize: 14,
      fontWeight: 500,
      cursor: 'pointer'
    }
  }, "Visa detaljer"))));
}

/* ============================ ÖVERSIKT ============================ */
function MProductRow({
  icon,
  name,
  tagline,
  stat,
  statLabel,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      textAlign: 'left',
      width: '100%',
      cursor: 'pointer',
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      borderRadius: 14,
      padding: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 12,
      background: 'var(--green-soft)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: icon,
    size: 22,
    stroke: "#2E7D5B"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--ink)'
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      color: 'var(--green-deep)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, stat), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--ink-3)'
    }
  }, statLabel)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      color: 'var(--ink-3)',
      marginTop: 3,
      lineHeight: 1.4,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, tagline)), /*#__PURE__*/React.createElement(MIcon, {
    name: "chevronRight",
    size: 18,
    stroke: "var(--ink-4)"
  }));
}
function MDashboard({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement(MScreen, null, /*#__PURE__*/React.createElement(MTitle, {
    eyebrow: "M\xE5ndag 25 maj",
    title: "God morgon, Anna",
    sub: "En k\xF6rning v\xE4ntar p\xE5 dig. Allt annat \xE4r lugnt."
  }), /*#__PURE__*/React.createElement(MPayrollHero, {
    onApprove: () => onNavigate && onNavigate('payroll')
  }), /*#__PURE__*/React.createElement(MSectionHeader, {
    title: "Dina produkter",
    action: "Hantera"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(MProductRow, {
    icon: "banknote",
    name: "L\xF6n",
    tagline: "K\xF6r l\xF6n, skatt och utbetalningar.",
    stat: "1",
    statLabel: "v\xE4ntar",
    onClick: () => onNavigate && onNavigate('payroll')
  }), /*#__PURE__*/React.createElement(MProductRow, {
    icon: "clock",
    name: "Time",
    tagline: "Tid, fr\xE5nvaro och scheman.",
    stat: "7",
    statLabel: "att attestera",
    onClick: () => onNavigate && onNavigate('time')
  }), /*#__PURE__*/React.createElement(MProductRow, {
    icon: "orbit",
    name: "Sphere",
    tagline: "Medarbetardata och dokument.",
    stat: "32",
    statLabel: "anst\xE4llda",
    onClick: () => onNavigate && onNavigate('sphere')
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      background: 'var(--surface)',
      border: '1px solid var(--green-line)',
      borderRadius: 14,
      padding: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      backgroundImage: 'linear-gradient(100deg, var(--green-soft) 0%, var(--surface) 60%)'
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
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "store",
    size: 21,
    stroke: "#2E7D5B"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 600,
      color: 'var(--ink)'
    }
  }, "Ut\xF6ka fr\xE5n Marknadsplatsen"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--ink-2)',
      marginTop: 2,
      lineHeight: 1.4
    }
  }, "Pension, reser\xE4kningar och 20+ integrationer.")), /*#__PURE__*/React.createElement(MIcon, {
    name: "arrowUpRight",
    size: 18,
    stroke: "var(--green-deep)"
  })));
}

/* ============================== LÖN ============================== */
function MStatTile({
  value,
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      borderRadius: 12,
      padding: '13px 12px',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--ink)',
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 1.1
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--ink-3)',
      marginTop: 4,
      lineHeight: 1.3
    }
  }, label));
}
function MRunRow({
  month,
  date,
  amount,
  isLast
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 16px',
      borderBottom: isLast ? 'none' : '1px solid var(--line-2)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 10,
      background: 'var(--surface-2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "banknote",
    size: 18,
    stroke: "var(--ink-3)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 600,
      color: 'var(--ink)'
    }
  }, month), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--ink-3)',
      marginTop: 1
    }
  }, "Utbetald ", date)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--ink)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, amount), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(MStatusPill, {
    tone: "ok"
  }, "Utbetald"))));
}
function MLon({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement(MScreen, null, /*#__PURE__*/React.createElement(MTitle, {
    title: "L\xF6n",
    sub: "Maj 2025 \xB7 Norrstr\xF6m Industrier AB"
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      height: 50,
      border: 'none',
      borderRadius: 12,
      background: 'var(--shell-cta)',
      color: 'var(--shell-cta-ink)',
      fontFamily: MUI,
      fontSize: 15,
      fontWeight: 600,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginBottom: 18,
      boxShadow: '0 6px 18px rgba(97,188,143,0.28)'
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "plus",
    size: 19,
    stroke: "var(--shell-cta-ink)",
    strokeWidth: 2.2
  }), " Ny l\xF6nek\xF6rning"), /*#__PURE__*/React.createElement(MPayrollHero, null), /*#__PURE__*/React.createElement(MSectionHeader, {
    title: "Den h\xE4r k\xF6rningen"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(MStatTile, {
    value: "32",
    label: "anst\xE4llda"
  }), /*#__PURE__*/React.createElement(MStatTile, {
    value: "1,24 Mkr",
    label: "att utbetala"
  }), /*#__PURE__*/React.createElement(MStatTile, {
    value: "25 maj",
    label: "utbetalning"
  })), /*#__PURE__*/React.createElement(MSectionHeader, {
    title: "Tidigare k\xF6rningar",
    action: "Alla"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      borderRadius: 14,
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement(MRunRow, {
    month: "April 2025",
    date: "25 apr",
    amount: "1,21 Mkr"
  }), /*#__PURE__*/React.createElement(MRunRow, {
    month: "Mars 2025",
    date: "25 mar",
    amount: "1,19 Mkr"
  }), /*#__PURE__*/React.createElement(MRunRow, {
    month: "Februari 2025",
    date: "25 feb",
    amount: "1,18 Mkr",
    isLast: true
  })));
}

/* ============================== TIME ============================== */
function MAttestRow({
  initials,
  name,
  period,
  hours,
  done,
  onToggle,
  isLast
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '13px 16px',
      borderBottom: isLast ? 'none' : '1px solid var(--line-2)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 999,
      background: done ? 'var(--green-soft)' : 'var(--guide)',
      color: done ? '#2E7D5B' : '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12.5,
      fontWeight: 600,
      flexShrink: 0
    }
  }, done ? /*#__PURE__*/React.createElement(MIcon, {
    name: "check",
    size: 18,
    stroke: "#2E7D5B",
    strokeWidth: 2.4
  }) : initials), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 600,
      color: done ? 'var(--ink-3)' : 'var(--ink)',
      textDecoration: done ? 'line-through' : 'none'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--ink-3)',
      marginTop: 1
    }
  }, period, " \xB7 ", hours)), /*#__PURE__*/React.createElement("button", {
    onClick: onToggle,
    style: {
      cursor: 'pointer',
      borderRadius: 8,
      padding: '8px 13px',
      fontFamily: MUI,
      fontSize: 13,
      fontWeight: 600,
      border: done ? '1px solid var(--line)' : 'none',
      background: done ? 'var(--surface)' : 'var(--signature)',
      color: done ? 'var(--ink-3)' : '#fff',
      whiteSpace: 'nowrap'
    }
  }, done ? 'Ångra' : 'Godkänn'));
}
function MTime() {
  const reports = [{
    id: 1,
    initials: 'EH',
    name: 'Erik Holm',
    period: 'Vecka 20',
    hours: '38,5 h'
  }, {
    id: 2,
    initials: 'SN',
    name: 'Sara Nilsson',
    period: 'Vecka 20',
    hours: '40 h'
  }, {
    id: 3,
    initials: 'JL',
    name: 'Johan Lund',
    period: 'Vecka 20',
    hours: '36 h'
  }, {
    id: 4,
    initials: 'MA',
    name: 'Maja Andersson',
    period: 'Vecka 20',
    hours: '40 h'
  }, {
    id: 5,
    initials: 'PB',
    name: 'Per Berg',
    period: 'Vecka 20',
    hours: '32 h'
  }, {
    id: 6,
    initials: 'LK',
    name: 'Lina Karlsson',
    period: 'Vecka 20',
    hours: '40 h'
  }, {
    id: 7,
    initials: 'OF',
    name: 'Oskar Falk',
    period: 'Vecka 20',
    hours: '37,5 h'
  }];
  const [done, setDone] = sUseState({});
  const remaining = reports.length - Object.values(done).filter(Boolean).length;
  const toggle = id => setDone(d => ({
    ...d,
    [id]: !d[id]
  }));
  return /*#__PURE__*/React.createElement(MScreen, null, /*#__PURE__*/React.createElement(MTitle, {
    title: "Time",
    sub: "Tid, fr\xE5nvaro och scheman f\xF6r maj."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--signature)',
      borderRadius: 16,
      padding: 18,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 12,
      background: 'rgba(97,188,143,0.16)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "listChecks",
    size: 22,
    stroke: "#61BC8F"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 700,
      color: 'var(--on-dark)',
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 1.1
    }
  }, remaining === 0 ? 'Allt klart' : remaining + ' tidrapporter'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--on-dark-2)',
      marginTop: 2
    }
  }, remaining === 0 ? 'Inga rapporter väntar på dig.' : 'väntar på din attestering'))), /*#__PURE__*/React.createElement(MSectionHeader, {
    title: "Att attestera"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      borderRadius: 14,
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)'
    }
  }, reports.map((r, i) => /*#__PURE__*/React.createElement(MAttestRow, _extends({
    key: r.id
  }, r, {
    done: !!done[r.id],
    onToggle: () => toggle(r.id),
    isLast: i === reports.length - 1
  })))), /*#__PURE__*/React.createElement(MSectionHeader, {
    title: "Fr\xE5nvaro denna vecka"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      borderRadius: 14,
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '13px 16px',
      borderBottom: '1px solid var(--line-2)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 10,
      background: 'var(--info-soft)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "plane",
    size: 18,
    stroke: "var(--info)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 600,
      color: 'var(--ink)'
    }
  }, "Anna Berg"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--ink-3)',
      marginTop: 1
    }
  }, "Semester \xB7 20\u201323 maj")), /*#__PURE__*/React.createElement(MStatusPill, {
    tone: "info"
  }, "Godk\xE4nd")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '13px 16px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 10,
      background: 'var(--warn-soft)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "heartPulse",
    size: 18,
    stroke: "var(--warn)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 600,
      color: 'var(--ink)'
    }
  }, "Tomas Ek"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--ink-3)',
      marginTop: 1
    }
  }, "VAB \xB7 21 maj")), /*#__PURE__*/React.createElement(MStatusPill, {
    tone: "warn"
  }, "V\xE4ntar"))));
}

/* ========================== PLACEHOLDER ========================== */
function MPlaceholder({
  icon,
  name
}) {
  return /*#__PURE__*/React.createElement(MScreen, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '64px 24px',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 60,
      height: 60,
      borderRadius: 16,
      background: 'var(--green-soft)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: icon,
    size: 28,
    stroke: "#2E7D5B"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 22,
      fontWeight: 700,
      color: 'var(--ink)'
    }
  }, name), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--ink-3)',
      margin: '8px 0 0',
      lineHeight: 1.5,
      maxWidth: 240,
      textWrap: 'pretty'
    }
  }, "Den h\xE4r ytan ing\xE5r inte i mobilprototypen \xE4n \u2014 fokus ligger p\xE5 \xD6versikt, L\xF6n och Time."))));
}
Object.assign(window, {
  MScreen,
  MTitle,
  MSectionHeader,
  MStatusPill,
  MPayrollHero,
  MDashboard,
  MLon,
  MTime,
  MPlaceholder
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/kontek-next/mobile/m-screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/kontek-next/sidebar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// @ds-adherence-ignore -- internal desktop UI kit helper; not a standalone DS component
/* Kontek Next — Sidebar (new app shell: near-black teal, mint CTA, inline expandable submenus) */
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
// @ds-adherence-ignore -- internal desktop UI kit helper; not a standalone DS component
/* Kontek Next — Topbar (sits inside the white panel: welcome + company) */
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
