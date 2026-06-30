/* Kontek Next — Design System Overview.
   Two-level accordion (group → spec). Each spec lazy-loads its live
   preview card in an iframe and is auto-sized to its content height. */
(function () {
  'use strict';

  // Curated spec list. `file` is relative to preview/. Order = display order.
  const DATA = [
    { group: 'Atoms', items: [
      { file: 'colors.html',        name: 'Färger',           sub: 'Kärnpalett, ytor och texttoner' },
      { file: 'colors-status.html', name: 'Statusfärger',     sub: 'Återkopplingstoner — info, lyckat, varning, fel' },
      { file: 'app-background.html', name: 'App-bakgrund',      sub: 'Den enda sanktionerade gradienten — blek skog' },
      { file: 'typography.html',    name: 'Typografi',        sub: 'Open Sans, finjusterad över alla ytor' },
      { file: 'type-scale.html',    name: 'Typskala',         sub: 'Storlekssteg för text' },
      { file: 'type-display.html',  name: 'Display-typografi', sub: 'Rubriker och stora tal' },
      { file: 'grid.html',          name: 'Rutnät',           sub: '12-kolumners layoutrutnät' },
      { file: 'spacing.html',       name: 'Avstånd',          sub: 'Mellanrum och indrag' },
      { file: 'sizing.html',        name: 'Storlekar',        sub: 'Skala för bredd och höjd' },
      { file: 'radii.html',         name: 'Corner radius',    sub: 'Mjuka hörn, aldrig skarpa' },
      { file: 'shadows.html',       name: 'Skuggor',          sub: 'Höjd och lyft' },
      { file: 'touch-targets.html', name: 'Tryckytor',        sub: '48px minimum — iOS & Android' },
      { file: 'motion.html',        name: 'Rörelse',          sub: 'Varaktighet och easing' },
      { file: 'icons.html',         name: 'Ikoner',           sub: 'Lucide-linjeikoner, 24px' },
      { file: 'illustrations.html', name: 'Illustrationer',   sub: 'Sparsam, geometrisk, matt stil' },
      { file: 'logo.html',          name: 'Logotyp',          sub: 'Symbol, ordbild och friyta' },
      { file: 'guides.html',        name: 'Principer',        sub: 'Grunden bakom alla mönster' },
      { file: 'voice-tone.html',    name: 'Röst & ton',       sub: 'Lugn, varm, svensk, andra person' },
      { file: 'utilities.html',     name: 'Hjälpklasser',     sub: 'Enkla, komponerbara verktygsklasser' },
    ]},
    { group: 'Molecules', items: [
      { file: 'buttons.html',           name: 'Knappar',            sub: 'Fyra typer som skapar hierarki' },
      { file: 'text-input.html',        name: 'Textfält',           sub: 'Etikett, hjälptext, 48px höjd' },
      { file: 'text-area.html',         name: 'Textområde',         sub: 'Flerradig fritext' },
      { file: 'select.html',            name: 'Rullgardin',         sub: 'Väljer ur en längre lista' },
      { file: 'search.html',            name: 'Sök',                sub: 'Filtrerar listor och vyer' },
      { file: 'checkbox.html',          name: 'Kryssruta',          sub: 'Välj noll, en eller flera' },
      { file: 'radio.html',             name: 'Radioknapp',         sub: 'Välj exakt ett alternativ' },
      { file: 'switch.html',            name: 'Växel',              sub: 'Slår på/av direkt' },
      { file: 'segmented-control.html', name: 'Segmentkontroll',    sub: 'Växlar mellan 2–4 likvärdiga vyer' },
      { file: 'badges.html',            name: 'Etiketter',          sub: 'Statuspiller och märken' },
      { file: 'avatar.html',            name: 'Avatar',             sub: 'Cirkulär identitetsmarkör, fem storlekar' },
      { file: 'icon-tiles.html',        name: 'Ikonbrickor & chips', sub: 'Åtgärdsbrickor, mjuka chips & avatarer' },
      { file: 'floating-card.html',     name: 'Flytande kort',      sub: 'Ett recept för varje kortyta — --sh-1' },
      { file: 'product-card.html',      name: 'Produktkort',        sub: 'Innehållskort' },
      { file: 'pay-hero.html',          name: 'Lön-/hjältekort',    sub: 'Mjukt mint-hjältekort — aldrig mörk fyllning' },
      { file: 'list-rows.html',         name: 'Listrader',          sub: 'Inramade grupper och helbredds-listor' },
      { file: 'fab.html',               name: 'Flytande åtgärdsknapp', sub: 'Den enda bestående skapa-åtgärden' },
      { file: 'feedback-mobile.html',   name: 'Återkoppling',       sub: 'Banner, snackbar och toast' },
      { file: 'loading.html',           name: 'Laddning',           sub: 'Skelett, spinner och dra-för-att-uppdatera' },
    ]},
    { group: 'Organisms', items: [
      { file: 'app-bar.html',             name: 'Appfält',            sub: 'Toppchrome — stor rubrik, kompakt och mörkt' },
      { file: 'frosted-bar.html',         name: 'Frostat appfält',    sub: 'Transparent i vila, frostar in vid skroll' },
      { file: 'tab-bar.html',             name: 'Flikfält',           sub: 'Primär navigation — ljust och mörkt' },
      { file: 'navigation-patterns.html', name: 'Navigationsmönster', sub: 'Flikfält · drawer · hybrid — när används vilket' },
      { file: 'nav-item.html',            name: 'Toppmeny (desktop)',  sub: 'Vågrät desktop-navigation — 80px bar' },
      { file: 'bottom-sheet.html',        name: 'Bottenark',          sub: 'Innehållsark och åtgärdsark' },
      { file: 'dialog.html',              name: 'Dialog',             sub: 'Bekräftelser och varningar' },
      { file: 'optimistic-undo.html',     name: 'Optimistisk ångra',  sub: 'Godkänn direkt, återställ med ett tryck' },
      { file: 'status-row.html',          name: 'Återkopplingspanel', sub: 'Tumbetyg och valfri kommentar' },
    ]},
  ];

  const SVG_CHEV = '<svg class="%C%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';

  const groupsEl = document.getElementById('groups');
  const allItems = [];

  // ---- Build DOM ----
  DATA.forEach(function (g) {
    const group = document.createElement('section');
    group.className = 'group';

    const head = document.createElement('div');
    head.className = 'group-head';
    head.innerHTML =
      SVG_CHEV.replace('%C%', 'group-chev') +
      '<span class="group-name">' + g.group + '</span>' +
      '<span class="count">' + g.items.length + '</span>';
    const countEl = head.querySelector('.count');
    const totalCount = g.items.length;
    head.addEventListener('click', function () { group.classList.toggle('collapsed'); });
    group.appendChild(head);

    const body = document.createElement('div');
    body.className = 'group-body';

    g.items.forEach(function (it) {
      const item = document.createElement('article');
      item.className = 'item';
      item.dataset.search = (it.name + ' ' + it.sub).toLowerCase();

      const ihead = document.createElement('div');
      ihead.className = 'item-head';
      ihead.innerHTML =
        SVG_CHEV.replace('%C%', 'item-chev') +
        '<div class="item-text"><div class="item-name">' + it.name + '</div>' +
        '<div class="item-sub">' + it.sub + '</div></div>';

      const ibody = document.createElement('div');
      ibody.className = 'item-body';
      const inner = document.createElement('div');
      inner.className = 'item-inner';
      const frame = document.createElement('iframe');
      frame.title = it.name;
      frame.dataset.src = 'preview/' + it.file;
      inner.appendChild(frame);
      ibody.appendChild(inner);

      ihead.addEventListener('click', function () { toggleItem(item); });

      item.appendChild(ihead);
      item.appendChild(ibody);
      body.appendChild(item);

      allItems.push({ el: item, body: ibody, frame: frame, group: group, countEl: countEl, total: totalCount });
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
        frame.closest('.item-body').style.height = (h + 1) + 'px'; // +1 for top border
      }
    } catch (e) { /* same-origin expected; ignore */ }
  }

  function loadFrame(frame) {
    if (frame.dataset.loaded) return;
    frame.dataset.loaded = '1';
    frame.addEventListener('load', function () {
      sizeFrame(frame);
      // resize when inner content reflows (fonts, etc.)
      try {
        const doc = frame.contentDocument;
        const ro = new ResizeObserver(function () { sizeFrame(frame); });
        ro.observe(doc.body);
      } catch (e) {}
      // a couple of late re-measures for webfont swap
      setTimeout(function () { sizeFrame(frame); }, 250);
      setTimeout(function () { sizeFrame(frame); }, 700);
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
      rec.body.style.height = (parseFloat(rec.frame.style.height) + 1) + 'px';
    } else {
      rec.body.style.height = '600px'; // provisional until measured
    }
  }
  function closeItem(item) {
    item.classList.remove('open');
    recordFor(item).body.style.height = '0px';
  }
  function toggleItem(item) {
    if (item.classList.contains('open')) closeItem(item); else openItem(item);
  }
  function recordFor(item) { return allItems.find(function (r) { return r.el === item; }); }

  // ---- toolbar ----
  document.getElementById('expand-all').addEventListener('click', function () {
    DATA_groups().forEach(function (g) { g.classList.remove('collapsed'); });
    allItems.forEach(function (r) { if (isVisible(r.el) && !r.el.classList.contains('open')) openItem(r.el); });
  });
  document.getElementById('collapse-all').addEventListener('click', function () {
    allItems.forEach(function (r) { if (r.el.classList.contains('open')) closeItem(r.el); });
  });
  function DATA_groups() { return Array.prototype.slice.call(document.querySelectorAll('.group')); }
  function isVisible(el) { return el.style.display !== 'none'; }

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
      allItems.forEach(function (r) { if (r.el.classList.contains('open')) sizeFrame(r.frame); });
    }, 150);
  });
})();
