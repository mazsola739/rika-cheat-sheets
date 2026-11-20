/*
 * Cheat sheetek: lista (#) és egy-egy sheet (#flexbox) három nézetben:
 *  - poster:    kézzel rajzolt kártyák számozott, filctollas címekkel
 *  - notebook:  vonalas füzetlap, washi tape címkékkel
 *  - blueprint: sötét tervrajz, középső dobozból ágazó vonalakkal
 * Tartalom: cheatsheets-data.js
 */
(() => {
  'use strict';

  const { h, svg, t, tx, addStrings, store, highlight, copyText, codeBlock, mountArt, normalize, bindSearchShortcut, PALETTE } = window.Rika;
  const SHEETS = window.CHEATSHEETS;
  const VIEW_KEY = 'rika-cheat-sheets:sheets:view';
  const VIEWS = ['poster', 'notebook', 'blueprint'];
  const NEON = ['#69db7c', '#ffa94d', '#ffd43b', '#b197fc', '#74c0fc', '#f783ac', '#63e6be', '#ff8787'];

  addStrings({
    hu: {
      'cs.docTitle': 'Cheat sheetek · Rika cheat sheets',
      'cs.desc': 'Kézzel rajzolt frontend puskák: Flexbox, Grid, CSS, JavaScript, DOM, Git, React – másolható kóddal.',
      'cs.kicker': 'Frontend puskák',
      'cs.title': 'Cheat sheetek',
      'cs.lead': 'Egy oldalon a lényeg. Kattints egy kódra, és már másolhatod is.',
      'cs.searchLabel': 'Keresés a cheat sheetek között',
      'cs.searchPh': 'Keresés: flex, map, git…',
      'cs.all': 'Mind',
      'cs.levels': 'Szint',
      'cs.level.kezdo': 'Kezdő',
      'cs.level.kozep': 'Középhaladó',
      'cs.level.halado': 'Haladó',
      'cs.entries': '{n} sor · kb. {m} perc',
      'cs.open': 'Megnyitom →',
      'cs.back': '← Összes cheat sheet',
      'cs.view': 'Nézet',
      'cs.view.poster': 'Poszter',
      'cs.view.notebook': 'Füzet',
      'cs.view.blueprint': 'Blueprint',
      'cs.print': 'Nyomtatás / PDF',
      'cs.copyHint': 'Kattints a kódra a másoláshoz.',
      'cs.none': 'Nincs ilyen cheat sheet. Próbálj más szót.',
      'cs.notFound': 'Ez a cheat sheet nem létezik (még).',
      'cs.sheet': 'CHEAT SHEET',
      'cs.pg': 'játszótér',
      'cs.pgHint': 'Kattintgass, és figyeld, hogyan változik az elrendezés és a kód.',
      'cs.pgItems': 'Elemek száma',
      'cs.pgGap': 'Térköz',
      'cs.pgCode': 'Ez a CSS',
    },
    en: {
      'cs.docTitle': 'Cheat sheets · Rika cheat sheets',
      'cs.desc': 'Hand-drawn frontend cheat sheets: Flexbox, Grid, CSS, JavaScript, DOM, Git, React – with copyable code.',
      'cs.kicker': 'Frontend cheat sheets',
      'cs.title': 'Cheat sheets',
      'cs.lead': 'The essentials on one page. Click any code to copy it.',
      'cs.searchLabel': 'Search cheat sheets',
      'cs.searchPh': 'Search: flex, map, git…',
      'cs.all': 'All',
      'cs.levels': 'Level',
      'cs.level.kezdo': 'Beginner',
      'cs.level.kozep': 'Intermediate',
      'cs.level.halado': 'Advanced',
      'cs.entries': '{n} lines · about {m} min',
      'cs.open': 'Open →',
      'cs.back': '← All cheat sheets',
      'cs.view': 'View',
      'cs.view.poster': 'Poster',
      'cs.view.notebook': 'Notebook',
      'cs.view.blueprint': 'Blueprint',
      'cs.print': 'Print / PDF',
      'cs.copyHint': 'Click any code to copy it.',
      'cs.none': 'No cheat sheet like that. Try another word.',
      'cs.notFound': 'This cheat sheet does not exist (yet).',
      'cs.sheet': 'CHEAT SHEET',
      'cs.pg': 'playground',
      'cs.pgHint': 'Click around and watch the layout and the code change.',
      'cs.pgItems': 'Items',
      'cs.pgGap': 'Gap',
      'cs.pgCode': 'The CSS',
    },
  });

  const app = document.getElementById('app');
  let view = VIEWS.includes(store.get(VIEW_KEY, 'poster')) ? store.get(VIEW_KEY, 'poster') : 'poster';
  let level = 'all';
  let query = '';

  const countItems = (sheet) => sheet.sections.reduce((n, s) => n + s.items.length, 0);
  const minutes = (sheet) => Math.max(2, Math.round(countItems(sheet) / 5));
  const sheetById = (id) => SHEETS.find((s) => s.id === id);
  const searchText = (sheet) => normalize([
    tx(sheet.title), sheet.id, sheet.tags.join(' '), tx(sheet.intro),
    ...sheet.sections.flatMap((s) => [tx(s.title), ...s.items.flatMap(([code, note]) => [code, tx(note)])]),
  ].join(' '));

  /* ---------- lista ---------- */

  function renderIndex() {
    document.title = t('cs.docTitle');
    const search = h('input', {
      type: 'search', id: 'cs-search', autocomplete: 'off', placeholder: t('cs.searchPh'), value: query,
    });
    const grid = h('div', { class: 'sheet-grid' });
    const chips = h('ul', { class: 'chips', 'aria-label': t('cs.levels') });

    const draw = () => {
      const q = normalize(query.trim());
      const visible = SHEETS.filter((s) => (level === 'all' || s.level === level) && (!q || searchText(s).includes(q)));
      chips.replaceChildren(...['all', 'kezdo', 'kozep', 'halado'].map((key) =>
        h('li', {}, h('button', {
          type: 'button', class: 'chip', 'aria-pressed': String(level === key),
          onclick: () => { level = key; draw(); },
        }, key === 'all' ? t('cs.all') : t(`cs.level.${key}`)))));
      grid.replaceChildren(...(visible.length ? visible.map(sheetCard) : [h('p', { class: 'empty' }, t('cs.none'))]));
    };

    search.addEventListener('input', () => { query = search.value; draw(); });
    bindSearchShortcut(search);

    const head = h('section', { class: 'page-head wrap' },
      h('div', { class: 'splash', id: 'splash' }),
      h('div', { class: 'page-head-text' },
        h('p', { class: 'kicker' }, t('cs.kicker')),
        h('h1', { class: 'page-title' }, h('span', { class: 'hl hl-orange' }, t('cs.title'))),
        h('p', { class: 'lead' }, t('cs.lead'))));

    app.replaceChildren(head, h('section', { class: 'wrap' },
      h('div', { class: 'toolbar' },
        h('label', { class: 'search' }, h('span', { class: 'sr-only' }, t('cs.searchLabel')), search, h('kbd', { 'aria-hidden': 'true' }, '/')),
        chips),
      grid));
    mountArt(document.getElementById('splash'), { variant: 'compact', id: 'cs', seed: 4242 })(1);
    draw();
  }

  function sheetCard(sheet, index) {
    const color = PALETTE[SHEETS.indexOf(sheet) % PALETTE.length];
    return h('a', { class: 'card sheet-card', href: `#${sheet.id}`, style: `--c:${color.c};--a:${color.a}` },
      h('header', { class: 'card-head' },
        h('span', { class: 'badge', 'aria-hidden': 'true' }, String(SHEETS.indexOf(sheet) + 1)),
        h('h2', { class: 'card-title' }, h('span', { class: 'hl' }, tx(sheet.title)))),
      h('p', { class: 'sheet-intro' }, tx(sheet.intro)),
      h('p', { class: 'sheet-meta' },
        h('span', { class: `level level-${sheet.level}` }, t(`cs.level.${sheet.level}`)),
        h('span', {}, t('cs.entries', { n: countItems(sheet), m: minutes(sheet) }))),
      h('p', { class: 'sheet-tags' }, sheet.tags.map((tag) => h('span', {}, `#${tag}`))),
      h('span', { class: 'sheet-open' }, t('cs.open')));
  }

  /* ---------- egy sheet ---------- */

  function codeNode(code, lang) {
    const multi = code.includes('\n');
    return h(multi ? 'pre' : 'code', {
      class: multi ? 'cs-code cs-multi' : 'cs-code',
      tabindex: '0',
      role: 'button',
      'data-copy': code,
      title: t('cs.copyHint'),
      'aria-label': t('copy.aria', { label: code.split('\n')[0] }),
      html: multi ? `<code>${highlight(code, lang)}</code>` : highlight(code, lang),
    });
  }

  function renderPosterOrNotebook(sheet) {
    return h('div', { class: 'cs-sections' },
      sheet.sections.map((section, i) => {
        const color = PALETTE[i % PALETTE.length];
        return h('section', { class: 'cs-section', style: `--c:${color.c};--a:${color.a}` },
          h('h2', { class: 'cs-title' },
            h('span', { class: 'badge', 'aria-hidden': 'true' }, String(i + 1)),
            h('span', { class: 'hl tape' }, tx(section.title))),
          h('ul', { class: 'cs-items' },
            section.items.map(([code, note]) => h('li', {},
              codeNode(code, sheet.lang),
              note ? h('span', { class: 'cs-note' }, tx(note)) : null))));
      }));
  }

  function renderBlueprint(sheet) {
    const rows = [];
    sheet.sections.forEach((section, i) => {
      const color = NEON[i % NEON.length];
      rows.push(h('li', { class: 'bp-section', style: `--n:${color}` }, tx(section.title)));
      section.items.forEach(([code, note]) => {
        rows.push(h('li', { class: 'bp-row', style: `--n:${color}` },
          h('span', { class: 'bp-dot', 'aria-hidden': 'true' }),
          h('span', { class: 'bp-label' }, tx(note)),
          h('span', { class: 'bp-dash', 'aria-hidden': 'true' }),
          codeNode(code, sheet.lang)));
      });
    });
    const curves = svg('svg', { class: 'bp-curves', 'aria-hidden': 'true' });
    const board = h('div', { class: 'bp-board' },
      curves,
      h('div', { class: 'bp-hub' }, h('span', { class: 'bp-hub-title' }, tx(sheet.title))),
      h('ul', { class: 'bp-rows' }, rows));
    requestAnimationFrame(() => drawCurves(board));
    return board;
  }

  function drawCurves(board) {
    const curves = board.querySelector('.bp-curves');
    const hub = board.querySelector('.bp-hub');
    if (!curves || !hub || getComputedStyle(hub).display === 'none') {
      curves?.replaceChildren();
      return;
    }
    const base = board.getBoundingClientRect();
    const hubBox = hub.getBoundingClientRect();
    const x0 = hubBox.right - base.left;
    const y0 = hubBox.top + hubBox.height / 2 - base.top;
    curves.setAttribute('viewBox', `0 0 ${base.width} ${base.height}`);
    curves.setAttribute('width', base.width);
    curves.setAttribute('height', base.height);
    curves.replaceChildren(...[...board.querySelectorAll('.bp-row')].map((row) => {
      const dot = row.querySelector('.bp-dot').getBoundingClientRect();
      const x1 = dot.left - base.left;
      const y1 = dot.top + dot.height / 2 - base.top;
      const mx = x0 + (x1 - x0) * 0.55;
      return svg('path', {
        d: `M${x0} ${y0}C${mx} ${y0} ${mx} ${y1} ${x1} ${y1}`,
        style: `stroke:${getComputedStyle(row).getPropertyValue('--n')}`,
      });
    }));
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const board = app.querySelector('.bp-board');
      if (board) drawCurves(board);
    }, 120);
  });

  /* ---------- játszótér (flexbox / grid) ---------- */

  const PLAYGROUNDS = {
    flexbox: {
      name: 'Flexbox',
      display: 'flex',
      props: {
        'flex-direction': ['row', 'row-reverse', 'column', 'column-reverse'],
        'flex-wrap': ['nowrap', 'wrap'],
        'justify-content': ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
        'align-items': ['stretch', 'flex-start', 'center', 'flex-end', 'baseline'],
      },
      items: 5,
      maxItems: 10,
    },
    grid: {
      name: 'Grid',
      display: 'grid',
      props: {
        'grid-template-columns': ['repeat(3, 1fr)', '1fr 2fr', '160px 1fr', 'repeat(auto-fit, minmax(110px, 1fr))'],
        'justify-items': ['stretch', 'start', 'center', 'end'],
        'align-items': ['stretch', 'start', 'center', 'end'],
      },
      items: 6,
      maxItems: 12,
    },
  };

  function renderPlayground(kind) {
    const cfg = PLAYGROUNDS[kind];
    if (!cfg) return null;
    const state = Object.fromEntries(Object.entries(cfg.props).map(([prop, options]) => [prop, options[0]]));
    let gap = 12;
    let count = cfg.items;

    const stage = h('div', { class: `pg-stage pg-${kind}`, 'aria-hidden': 'true' });
    const codeHost = h('div', { class: 'pg-code' });

    const update = () => {
      stage.style.cssText = `display:${cfg.display};gap:${gap}px;` +
        Object.entries(state).map(([prop, value]) => `${prop}:${value}`).join(';');
      stage.replaceChildren(...Array.from({ length: count }, (_, i) =>
        h('span', { class: 'pg-item', style: `--i:${i % 8};--w:${44 + (i % 3) * 22}px;--h:${40 + ((i + 1) % 3) * 18}px` }, String(i + 1))));
      const css = `.container {\n  display: ${cfg.display};\n${Object.entries(state).map(([p, v]) => `  ${p}: ${v};`).join('\n')}\n  gap: ${gap}px;\n}`;
      codeHost.replaceChildren(codeBlock(css, { lang: 'css', label: t('cs.pgCode') }));
    };

    const controls = h('div', { class: 'pg-controls' },
      Object.entries(cfg.props).map(([prop, options]) => h('fieldset', { class: 'pg-field' },
        h('legend', {}, h('code', {}, prop)),
        h('div', { class: 'pg-options' }, options.map((option) => h('label', { class: 'pg-option' },
          h('input', {
            type: 'radio', name: `${kind}-${prop}`, value: option, checked: state[prop] === option,
            onchange: () => { state[prop] = option; update(); },
          }),
          h('span', {}, option)))))),
      h('label', { class: 'pg-range' }, h('span', {}, `${t('cs.pgGap')}: `, h('output', {}, `${gap}px`)),
        h('input', {
          type: 'range', min: '0', max: '40', value: String(gap),
          oninput: (e) => { gap = Number(e.target.value); e.target.previousElementSibling.querySelector('output').textContent = `${gap}px`; update(); },
        })),
      h('label', { class: 'pg-range' }, h('span', {}, `${t('cs.pgItems')}: `, h('output', {}, String(count))),
        h('input', {
          type: 'range', min: '1', max: String(cfg.maxItems), value: String(count),
          oninput: (e) => { count = Number(e.target.value); e.target.previousElementSibling.querySelector('output').textContent = String(count); update(); },
        })));

    update();
    return h('section', { class: 'card playground no-print', style: '--c:#99e9f2;--a:#0c8599' },
      h('header', { class: 'card-head' },
        h('h2', { class: 'card-title' }, h('span', { class: 'hl' }, `${cfg.name} ${t('cs.pg')}`))),
      h('p', { class: 'pg-hint' }, t('cs.pgHint')),
      h('div', { class: 'pg-layout' }, controls, h('div', {}, stage, codeHost)));
  }

  function renderSheet(sheet) {
    document.title = `${tx(sheet.title)} · ${t('cs.docTitle')}`;
    const index = SHEETS.indexOf(sheet);
    const color = PALETTE[index % PALETTE.length];

    const viewSwitch = h('div', { class: 'seg', role: 'group', 'aria-label': t('cs.view') },
      VIEWS.map((key) => h('button', {
        type: 'button', 'aria-pressed': String(view === key),
        onclick: () => { view = key; store.set(VIEW_KEY, key); renderSheet(sheet); },
      }, t(`cs.view.${key}`))));

    const title = tx(sheet.title);
    const head = h('header', { class: 'sheet-head' },
      h('a', { class: 'back no-print', href: '#' }, t('cs.back')),
      h('h1', { class: 'sheet-title' },
        h('span', { class: 'sheet-name' }, title),
        h('span', { class: 'sheet-sub' }, t('cs.sheet'))),
      h('p', { class: 'sheet-intro' }, tx(sheet.intro)),
      h('div', { class: 'sheet-tools no-print' },
        h('span', { class: `level level-${sheet.level}` }, t(`cs.level.${sheet.level}`)),
        h('span', { class: 'sheet-count' }, t('cs.entries', { n: countItems(sheet), m: minutes(sheet) })),
        viewSwitch,
        h('button', { type: 'button', class: 'btn btn-ghost', onclick: () => window.print() }, t('cs.print'))));

    const body = view === 'blueprint' ? renderBlueprint(sheet) : renderPosterOrNotebook(sheet);
    app.replaceChildren(h('article', { class: `sheet wrap view-${view}`, style: `--c:${color.c};--a:${color.a}` },
      h('div', { class: 'sheet-paper' }, head, renderPlayground(sheet.playground), body)));
  }

  /* ---------- másolás kattintásra ---------- */

  app.addEventListener('click', (event) => {
    const node = event.target.closest('[data-copy]');
    if (node) copyText(node.dataset.copy);
  });
  app.addEventListener('keydown', (event) => {
    const node = event.target.closest('[data-copy]');
    if (node && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      copyText(node.dataset.copy);
    }
  });

  /* ---------- útvonal ---------- */

  function route() {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) {
      renderIndex();
      return;
    }
    const sheet = sheetById(id);
    if (sheet) renderSheet(sheet);
    else app.replaceChildren(h('section', { class: 'wrap' }, h('p', { class: 'empty' }, t('cs.notFound')), h('p', { class: 'empty' }, h('a', { href: '#' }, t('cs.back')))));
  }

  window.addEventListener('hashchange', () => {
    route();
    window.scrollTo(0, 0);
  });
  document.addEventListener('rika:lang', route);
  route();
})();
