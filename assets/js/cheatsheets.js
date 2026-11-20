/*
 * Cheat sheetek: lista (#) és egy-egy sheet (#flexbox).
 * Egy sheet felépítése:
 *  - fent a kattintgatós „poszter”: elrendezés-játszótér (flexbox, grid) vagy CSS-generátor
 *    (színek, gradiens, árnyék, keret, gomb) – csúszkák, élő előnézet, másolható CSS,
 *  - alatta a felsorolós rész blueprint stílusban: sötét tervrajz, középső dobozból ágazó vonalak.
 * Tartalom: cheatsheets-data.js
 */
(() => {
  'use strict';

  const { h, svg, t, tx, addStrings, highlight, copyText, codeBlock, mountArt, normalize, bindSearchShortcut, PALETTE } = window.Rika;
  const SHEETS = window.CHEATSHEETS;
  const NEON = ['#69db7c', '#ffa94d', '#ffd43b', '#b197fc', '#74c0fc', '#f783ac', '#63e6be', '#ff8787'];

  addStrings({
    hu: {
      'cs.docTitle': 'Cheat sheetek · Rika cheat sheets',
      'cs.desc': 'Frontend puskák blueprint stílusban, kattintgatós CSS-generátorokkal: Flexbox, Grid, színek, árnyékok, JavaScript, Git, React.',
      'cs.kicker': 'Frontend puskák',
      'cs.title': 'Cheat sheetek',
      'cs.lead': 'Egy oldalon a lényeg.',
      'cs.searchLabel': 'Keresés a cheat sheetek között',
      'cs.searchPh': 'Keresés: flex, gradient, regex…',
      'cs.all': 'Mind',
      'cs.levels': 'Szint',
      'cs.level.kezdo': 'Kezdő',
      'cs.level.kozep': 'Középhaladó',
      'cs.level.halado': 'Haladó',
      'cs.entries': '{n} sor · kb. {m} perc',
      'cs.interactive': 'kattintgatós',
      'cs.open': 'Megnyitom →',
      'cs.back': '← Összes cheat sheet',
      'cs.print': 'Nyomtatás / PDF',
      'cs.copyHint': 'Kattints a kódra a másoláshoz.',
      'cs.none': 'Nincs ilyen cheat sheet. Próbálj más szót.',
      'cs.notFound': 'Ez a cheat sheet nem létezik (még).',
      'cs.sheet': 'CHEAT SHEET',
      'cs.pg': 'játszótér',
      'cs.pgHint': 'Kattintgass, és figyeld, hogyan változik az elrendezés és a kód.',
      'cs.genHint': 'Húzd a csúszkákat, válassz színt – az előnézet és a CSS azonnal változik.',
      'cs.pgItems': 'Elemek száma',
      'cs.pgGap': 'Térköz',
      'cs.pgCode': 'Ez a CSS',
      'cs.formats': 'Ugyanez a szín (kattints a másoláshoz)',
      'cs.btnLabel': 'Kattints rám',
      'cs.box': 'doboz',
      'cs.tbProject': 'Projekt',
      'cs.tbTitle': 'Megnevezés',
      'cs.tbSheet': 'Lap',
      'cs.tbScale': 'Lépték',
      'cs.tbDrawn': 'Rajzolta',
    },
    en: {
      'cs.docTitle': 'Cheat sheets · Rika cheat sheets',
      'cs.desc': 'Frontend cheat sheets in blueprint style, with clickable CSS generators: Flexbox, Grid, colors, shadows, JavaScript, Git, React.',
      'cs.kicker': 'Frontend cheat sheets',
      'cs.title': 'Cheat sheets',
      'cs.lead': 'The essentials on one page.',
      'cs.searchLabel': 'Search cheat sheets',
      'cs.searchPh': 'Search: flex, gradient, regex…',
      'cs.all': 'All',
      'cs.levels': 'Level',
      'cs.level.kezdo': 'Beginner',
      'cs.level.kozep': 'Intermediate',
      'cs.level.halado': 'Advanced',
      'cs.entries': '{n} lines · about {m} min',
      'cs.interactive': 'clickable',
      'cs.open': 'Open →',
      'cs.back': '← All cheat sheets',
      'cs.print': 'Print / PDF',
      'cs.copyHint': 'Click any code to copy it.',
      'cs.none': 'No cheat sheet like that. Try another word.',
      'cs.notFound': 'This cheat sheet does not exist (yet).',
      'cs.sheet': 'CHEAT SHEET',
      'cs.pg': 'playground',
      'cs.pgHint': 'Click around and watch the layout and the code change.',
      'cs.genHint': 'Drag the sliders, pick colors – the preview and the CSS change right away.',
      'cs.pgItems': 'Items',
      'cs.pgGap': 'Gap',
      'cs.pgCode': 'The CSS',
      'cs.formats': 'The same color (click to copy)',
      'cs.btnLabel': 'Click me',
      'cs.box': 'box',
      'cs.tbProject': 'Project',
      'cs.tbTitle': 'Title',
      'cs.tbSheet': 'Sheet',
      'cs.tbScale': 'Scale',
      'cs.tbDrawn': 'Drawn by',
    },
  });

  const app = document.getElementById('app');
  let level = 'all';
  let query = '';

  const countItems = (sheet) => sheet.sections.reduce((n, s) => n + s.items.length, 0);
  const minutes = (sheet) => Math.max(2, Math.round(countItems(sheet) / 5));
  const sheetById = (id) => SHEETS.find((s) => s.id === id);
  const searchText = (sheet) => normalize([
    tx(sheet.title), sheet.id, sheet.tags.join(' '), tx(sheet.intro),
    ...sheet.sections.flatMap((s) => [tx(s.title), ...s.items.flatMap(([code, note]) => [code, tx(note)])]),
  ].join(' '));

  /* ---------- lista: dossziéfüles kártyák ---------- */

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

  function sheetCard(sheet) {
    const color = PALETTE[SHEETS.indexOf(sheet) % PALETTE.length];
    return h('a', { class: 'card sheet-card', href: `#${sheet.id}`, style: `--c:${color.c};--a:${color.a}` },
      h('h2', { class: 'sheet-tab' },
        h('span', { class: 'sheet-tab-title' }, tx(sheet.title)),
        h('span', { class: 'sheet-icon', 'aria-hidden': 'true' }, sheet.icon || '')),
      h('p', { class: 'sheet-intro' }, tx(sheet.intro)),
      h('p', { class: 'sheet-meta' },
        h('span', { class: `level level-${sheet.level}` }, t(`cs.level.${sheet.level}`)),
        sheet.playground ? h('span', { class: 'sheet-play' }, `▶ ${t('cs.interactive')}`) : null,
        h('span', {}, t('cs.entries', { n: countItems(sheet), m: minutes(sheet) }))),
      h('p', { class: 'sheet-tags' }, sheet.tags.map((tag) => h('span', {}, `#${tag}`))),
      h('span', { class: 'sheet-open' }, t('cs.open')));
  }

  /* ---------- kattintható kód ---------- */

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

  /* ---------- a felsorolós rész: blueprint ---------- */

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
      h('div', { class: 'bp-hub' },
        sheet.icon ? h('span', { class: 'bp-hub-icon', 'aria-hidden': 'true' }, sheet.icon) : null,
        h('span', { class: 'bp-hub-title' }, tx(sheet.title))),
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

  /* ---------- kattintgatós poszter 1: elrendezés-játszótér (flexbox / grid) ---------- */

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

  const optionPills = (name, options, current, onPick) => h('div', { class: 'pg-options' }, options.map((option) => h('label', { class: 'pg-option' },
    h('input', { type: 'radio', name, value: option, checked: current === option, onchange: () => onPick(option) }),
    h('span', {}, option))));

  function renderPlayground(kind) {
    const cfg = PLAYGROUNDS[kind];
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
        optionPills(`${kind}-${prop}`, options, state[prop], (option) => { state[prop] = option; update(); }))),
      rangeControl(t('cs.pgGap'), 0, 40, 1, gap, 'px', (value) => { gap = value; update(); }),
      rangeControl(t('cs.pgItems'), 1, cfg.maxItems, 1, count, '', (value) => { count = value; update(); }));

    update();
    return posterCard(`${cfg.name} ${t('cs.pg')}`, t('cs.pgHint'), controls, h('div', {}, stage, codeHost));
  }

  /* ---------- kattintgatós poszter 2: CSS-generátorok ---------- */

  const hexToRgb = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const alphaText = (pct) => String(Math.round(pct) / 100);
  const withAlpha = (hex, pct) => {
    if (pct >= 100) return hex;
    const [r, g, b] = hexToRgb(hex);
    return `rgb(${r} ${g} ${b} / ${alphaText(pct)})`;
  };
  const toHsl = (hex) => {
    const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let hue = 0;
    let sat = 0;
    if (max !== min) {
      const d = max - min;
      sat = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      hue = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      hue *= 60;
    }
    return [Math.round(hue), Math.round(sat * 100), Math.round(l * 100)];
  };

  /*
   * Egy generátor: vezérlők (range | color | pick | check), és rules(state) → szabályok listája.
   * Egy szabály: { sel: '' | ':hover', lines: ['prop: érték;', …] }. A megjelenített CSS a
   * className-mel készül, az élő előnézet ugyanezt kapja egy saját <style>-ban.
   */
  const GENERATORS = {
    colors: {
      name: { hu: 'Színválasztó & háttérminta', en: 'Color picker & background pattern' },
      className: '.box',
      controls: [
        { key: 'color', type: 'color', label: { hu: 'Szín', en: 'Color' }, value: '#7048e8' },
        { key: 'alpha', type: 'range', label: { hu: 'Átlátszóság', en: 'Opacity' }, min: 0, max: 100, value: 100, unit: '%' },
        { key: 'pattern', type: 'pick', label: { hu: 'Minta', en: 'Pattern' }, options: ['none', 'stripes', 'dots', 'checks', 'grid'], value: 'stripes' },
        { key: 'size', type: 'range', label: { hu: 'Mintaméret', en: 'Pattern size' }, min: 8, max: 64, value: 28, unit: 'px' },
        { key: 'bg', type: 'color', label: { hu: 'Alapszín', en: 'Base color' }, value: '#fff4e6' },
      ],
      rules(s) {
        const c = withAlpha(s.color, s.alpha);
        const size = s.size;
        if (s.pattern === 'none') return [{ sel: '', lines: [`background-color: ${c};`] }];
        const patterns = {
          stripes: [`repeating-linear-gradient(45deg, ${c} 0 ${size / 4}px, transparent ${size / 4}px ${size / 2}px)`],
          dots: [`radial-gradient(${c} 22%, transparent 24%)`, `${size}px ${size}px`],
          checks: [`conic-gradient(${c} 25%, transparent 0 50%, ${c} 0 75%, transparent 0)`, `${size}px ${size}px`],
          grid: [`linear-gradient(${c} 2px, transparent 2px), linear-gradient(90deg, ${c} 2px, transparent 2px)`, `${size}px ${size}px`],
        };
        const [image, bgSize] = patterns[s.pattern];
        return [{ sel: '', lines: [`background-color: ${s.bg};`, `background-image: ${image};`, ...(bgSize ? [`background-size: ${bgSize};`] : [])] }];
      },
      extra(s) {
        const [r, g, b] = hexToRgb(s.color);
        const [hue, sat, light] = toHsl(s.color);
        const a = s.alpha < 100 ? ` / ${alphaText(s.alpha)}` : '';
        const hexA = s.alpha < 100 ? Math.round((s.alpha / 100) * 255).toString(16).padStart(2, '0') : '';
        const formats = [`${s.color}${hexA}`, `rgb(${r} ${g} ${b}${a})`, `hsl(${hue} ${sat}% ${light}%${a})`];
        return h('div', { class: 'gen-formats' },
          h('p', { class: 'gen-formats-title' }, t('cs.formats')),
          h('div', { class: 'gen-chips' }, formats.map((text) => h('button', {
            type: 'button', class: 'gen-chip', 'data-copy': text, 'aria-label': t('copy.aria', { label: text }),
          }, h('span', { class: 'gen-swatch', style: `background:${text}`, 'aria-hidden': 'true' }), text))));
      },
    },
    gradient: {
      name: { hu: 'Színátmenet-generátor', en: 'Gradient generator' },
      className: '.box',
      controls: [
        { key: 'type', type: 'pick', label: { hu: 'Típus', en: 'Type' }, options: ['linear', 'radial', 'conic'], value: 'linear' },
        { key: 'angle', type: 'range', label: { hu: 'Szög', en: 'Angle' }, min: 0, max: 360, value: 135, unit: 'deg' },
        { key: 'c1', type: 'color', label: { hu: '1. szín', en: 'Color 1' }, value: '#ff6b6b' },
        { key: 'c2', type: 'color', label: { hu: '2. szín', en: 'Color 2' }, value: '#ffd43b' },
        { key: 'three', type: 'check', label: { hu: 'Harmadik szín', en: 'Third color' }, value: true },
        { key: 'c3', type: 'color', label: { hu: '3. szín', en: 'Color 3' }, value: '#4dabf7' },
      ],
      rules(s) {
        const colors = [s.c1, s.c2, ...(s.three ? [s.c3] : [])].join(', ');
        const value = s.type === 'linear'
          ? `linear-gradient(${s.angle}deg, ${colors})`
          : s.type === 'radial' ? `radial-gradient(circle, ${colors})` : `conic-gradient(from ${s.angle}deg, ${colors}${s.three ? '' : `, ${s.c1}`})`;
        return [{ sel: '', lines: [`background: ${value};`] }];
      },
    },
    shadow: {
      name: { hu: 'Árnyékgenerátor', en: 'Box shadow generator' },
      className: '.card',
      controls: [
        { key: 'x', type: 'range', label: { hu: 'Vízszintes (x)', en: 'Horizontal (x)' }, min: -40, max: 40, value: 6, unit: 'px' },
        { key: 'y', type: 'range', label: { hu: 'Függőleges (y)', en: 'Vertical (y)' }, min: -40, max: 40, value: 12, unit: 'px' },
        { key: 'blur', type: 'range', label: { hu: 'Elmosás', en: 'Blur' }, min: 0, max: 80, value: 24, unit: 'px' },
        { key: 'spread', type: 'range', label: { hu: 'Terjedés', en: 'Spread' }, min: -20, max: 40, value: 0, unit: 'px' },
        { key: 'color', type: 'color', label: { hu: 'Szín', en: 'Color' }, value: '#2b2a28' },
        { key: 'alpha', type: 'range', label: { hu: 'Erősség', en: 'Strength' }, min: 0, max: 100, value: 30, unit: '%' },
        { key: 'inset', type: 'check', label: { hu: 'Belső árnyék (inset)', en: 'Inner shadow (inset)' }, value: false },
        { key: 'radius', type: 'range', label: { hu: 'Lekerekítés', en: 'Corner radius' }, min: 0, max: 60, value: 16, unit: 'px' },
      ],
      rules(s) {
        return [{
          sel: '',
          lines: [
            `box-shadow: ${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${withAlpha(s.color, s.alpha)};`,
            `border-radius: ${s.radius}px;`,
          ],
        }];
      },
    },
    border: {
      name: { hu: 'Keret- és sarokgenerátor', en: 'Border & radius generator' },
      className: '.box',
      controls: [
        { key: 'width', type: 'range', label: { hu: 'Vastagság', en: 'Width' }, min: 0, max: 16, value: 4, unit: 'px' },
        { key: 'style', type: 'pick', label: { hu: 'Stílus', en: 'Style' }, options: ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge'], value: 'dashed' },
        { key: 'color', type: 'color', label: { hu: 'Szín', en: 'Color' }, value: '#1c7ed6' },
        { key: 'tl', type: 'range', label: { hu: 'Bal felső sarok', en: 'Top left corner' }, min: 0, max: 90, value: 30, unit: 'px' },
        { key: 'tr', type: 'range', label: { hu: 'Jobb felső sarok', en: 'Top right corner' }, min: 0, max: 90, value: 8, unit: 'px' },
        { key: 'br', type: 'range', label: { hu: 'Jobb alsó sarok', en: 'Bottom right corner' }, min: 0, max: 90, value: 30, unit: 'px' },
        { key: 'bl', type: 'range', label: { hu: 'Bal alsó sarok', en: 'Bottom left corner' }, min: 0, max: 90, value: 8, unit: 'px' },
        { key: 'outline', type: 'check', label: { hu: 'Outline (fókuszkeret)', en: 'Outline (focus ring)' }, value: false },
        { key: 'offset', type: 'range', label: { hu: 'Outline távolsága', en: 'Outline offset' }, min: 0, max: 16, value: 4, unit: 'px' },
      ],
      rules(s) {
        const same = s.tl === s.tr && s.tr === s.br && s.br === s.bl;
        return [{
          sel: '',
          lines: [
            `border: ${s.width}px ${s.style} ${s.color};`,
            `border-radius: ${same ? `${s.tl}px` : `${s.tl}px ${s.tr}px ${s.br}px ${s.bl}px`};`,
            ...(s.outline ? [`outline: 3px solid ${s.color};`, `outline-offset: ${s.offset}px;`] : []),
          ],
        }];
      },
    },
    button: {
      name: { hu: 'Gombgenerátor', en: 'Button generator' },
      className: '.btn',
      preview: 'button',
      controls: [
        { key: 'bg', type: 'color', label: { hu: 'Háttér', en: 'Background' }, value: '#ffa94d' },
        { key: 'fg', type: 'color', label: { hu: 'Szöveg', en: 'Text' }, value: '#2b2a28' },
        { key: 'font', type: 'range', label: { hu: 'Betűméret', en: 'Font size' }, min: 12, max: 30, value: 18, unit: 'px' },
        { key: 'py', type: 'range', label: { hu: 'Belső tér fent-lent', en: 'Padding top/bottom' }, min: 4, max: 30, value: 10, unit: 'px' },
        { key: 'px', type: 'range', label: { hu: 'Belső tér oldalt', en: 'Padding left/right' }, min: 8, max: 60, value: 24, unit: 'px' },
        { key: 'radius', type: 'range', label: { hu: 'Lekerekítés', en: 'Corner radius' }, min: 0, max: 40, value: 12, unit: 'px' },
        { key: 'bw', type: 'range', label: { hu: 'Keret', en: 'Border' }, min: 0, max: 6, value: 2, unit: 'px' },
        { key: 'shadow', type: 'range', label: { hu: 'Árnyék', en: 'Shadow' }, min: 0, max: 10, value: 4, unit: 'px' },
        { key: 'lift', type: 'check', label: { hu: 'Megemelkedik hoverre', en: 'Lifts on hover' }, value: true },
      ],
      rules(s) {
        const base = [
          `padding: ${s.py}px ${s.px}px;`,
          `background: ${s.bg};`,
          `color: ${s.fg};`,
          `font-size: ${s.font}px;`,
          `font-weight: 700;`,
          `border: ${s.bw}px solid ${s.fg};`,
          `border-radius: ${s.radius}px;`,
          ...(s.shadow ? [`box-shadow: ${s.shadow}px ${s.shadow}px 0 ${s.fg};`] : []),
          'cursor: pointer;',
          'transition: transform 0.15s, box-shadow 0.15s;',
        ];
        const rules = [{ sel: '', lines: base }];
        if (s.lift) {
          rules.push({ sel: ':hover', lines: ['transform: translate(-2px, -2px);', ...(s.shadow ? [`box-shadow: ${s.shadow + 2}px ${s.shadow + 2}px 0 ${s.fg};`] : [])] });
          rules.push({ sel: ':active', lines: ['transform: translate(1px, 1px);', ...(s.shadow ? [`box-shadow: ${Math.max(0, s.shadow - 2)}px ${Math.max(0, s.shadow - 2)}px 0 ${s.fg};`] : [])] });
        }
        return rules;
      },
    },
  };

  function rangeControl(label, min, max, step, value, unit, onInput) {
    const out = h('output', {}, `${value}${unit}`);
    return h('label', { class: 'pg-range' },
      h('span', {}, `${label}: `, out),
      h('input', {
        type: 'range', min: String(min), max: String(max), step: String(step), value: String(value),
        oninput: (event) => {
          const v = Number(event.target.value);
          out.textContent = `${v}${unit}`;
          onInput(v);
        },
      }));
  }

  let generatorSeq = 0;

  function renderGenerator(kind) {
    const cfg = GENERATORS[kind];
    const state = Object.fromEntries(cfg.controls.map((c) => [c.key, c.value]));
    const scope = `gen-${kind}-${++generatorSeq}`;
    const style = h('style');
    const target = cfg.preview === 'button'
      ? h('button', { type: 'button', class: 'gen-target' }, t('cs.btnLabel'))
      : h('div', { class: 'gen-target' }, kind === 'shadow' || kind === 'border' ? h('span', { class: 'gen-label' }, cfg.className) : null);
    const stage = h('div', { class: `gen-stage gen-${kind}`, id: scope }, target);
    const extraHost = h('div', { class: 'gen-extra' });
    const codeHost = h('div', { class: 'pg-code' });

    const update = () => {
      const rules = cfg.rules(state);
      style.textContent = rules.map((r) => `#${scope} .gen-target${r.sel} { ${r.lines.join(' ')} }`).join('\n');
      const css = rules.map((r) => `${cfg.className}${r.sel} {\n${r.lines.map((line) => `  ${line}`).join('\n')}\n}`).join('\n');
      codeHost.replaceChildren(codeBlock(css, { lang: 'css', label: t('cs.pgCode') }));
      extraHost.replaceChildren(cfg.extra ? cfg.extra(state) : '');
    };

    const controls = h('div', { class: 'pg-controls' }, cfg.controls.map((c) => {
      const label = tx(c.label);
      if (c.type === 'range') return rangeControl(label, c.min, c.max, c.step || 1, state[c.key], c.unit === 'deg' ? '°' : c.unit, (v) => { state[c.key] = v; update(); });
      if (c.type === 'color') {
        const code = h('code', {}, state[c.key]);
        return h('label', { class: 'gen-color' },
          h('input', { type: 'color', value: state[c.key], oninput: (event) => { state[c.key] = event.target.value; code.textContent = event.target.value; update(); } }),
          h('span', {}, label), code);
      }
      if (c.type === 'check') {
        return h('label', { class: 'gen-check' },
          h('input', { type: 'checkbox', checked: state[c.key], onchange: (event) => { state[c.key] = event.target.checked; update(); } }),
          h('span', {}, label));
      }
      return h('fieldset', { class: 'pg-field' },
        h('legend', {}, label),
        optionPills(`${scope}-${c.key}`, c.options, state[c.key], (option) => { state[c.key] = option; update(); }));
    }));

    update();
    return posterCard(tx(cfg.name), t('cs.genHint'), controls, h('div', {}, style, stage, extraHost, codeHost));
  }

  /** A kattintgatós tábla a blueprint lap tetején, tervrajz stílusban, a lap saját színével. */
  const posterCard = (title, hint, controls, output) => h('section', { class: 'card playground no-print' },
    h('header', { class: 'card-head' }, h('h2', { class: 'card-title' }, h('span', { class: 'hl' }, title))),
    h('p', { class: 'pg-hint' }, hint),
    h('div', { class: 'pg-layout' }, controls, output));

  function renderPoster(kind) {
    if (PLAYGROUNDS[kind]) return renderPlayground(kind);
    if (GENERATORS[kind]) return renderGenerator(kind);
    return null;
  }

  /* ---------- egy sheet ---------- */

  function renderSheet(sheet) {
    document.title = `${tx(sheet.title)} · ${t('cs.docTitle')}`;
    const index = SHEETS.indexOf(sheet);
    const color = PALETTE[index % PALETTE.length];

    const head = h('header', { class: 'sheet-head' },
      h('a', { class: 'back no-print', href: '#' }, t('cs.back')),
      h('h1', { class: 'sheet-title' },
        h('span', { class: 'sheet-name' }, tx(sheet.title)),
        sheet.icon ? h('span', { class: 'sheet-name-icon', 'aria-hidden': 'true' }, sheet.icon) : null,
        h('span', { class: 'sheet-sub' }, t('cs.sheet'))),
      h('p', { class: 'sheet-intro' }, tx(sheet.intro)),
      h('div', { class: 'sheet-tools no-print' },
        h('span', { class: `level level-${sheet.level}` }, t(`cs.level.${sheet.level}`)),
        h('span', { class: 'sheet-count' }, t('cs.entries', { n: countItems(sheet), m: minutes(sheet) })),
        h('button', { type: 'button', class: 'btn btn-ghost', onclick: () => window.print() }, t('cs.print'))));

    app.classList.add('desk');
    app.replaceChildren(h('article', { class: 'sheet wrap view-blueprint', style: `--c:${color.c};--a:${color.a}` },
      h('div', { class: 'sheet-paper' },
        deskTools(),
        ...['tl', 'tr', 'bl', 'br'].map((corner) => h('span', { class: `bp-tape bp-tape-${corner} no-print`, 'aria-hidden': 'true' })),
        drawingFrame(),
        head, renderPoster(sheet.playground), renderBlueprint(sheet), titleBlock(sheet, index))));
  }

  /* ---------- tervezőasztal: keret zónajelekkel, szövegmező, vonalzó, háromszög, ceruza ---------- */

  /** Műszaki rajz kerete: körben sávban a zónák jelei (fent-lent számok, oldalt betűk). */
  function drawingFrame() {
    const zones = (side, n, label) => Array.from({ length: n }, (_, i) =>
      h('span', { class: `bp-zone bp-zone-${side}`, style: `--z:${((i + 0.5) / n).toFixed(4)}` }, label(i)));
    const letter = (i) => 'ABCDEF'[i];
    const number = (i) => String(i + 1);
    return h('div', { class: 'bp-frame', 'aria-hidden': 'true' },
      zones('top', 8, number), zones('bottom', 8, number), zones('left', 6, letter), zones('right', 6, letter));
  }

  /** A szövegmező a lap jobb alsó sarkában, mint egy igazi tervrajzon. */
  function titleBlock(sheet, index) {
    const cell = (key, label, value) => h('div', { class: `tb-cell tb-${key}` },
      h('span', { class: 'tb-label' }, label),
      h('span', { class: 'tb-value' }, value));
    return h('footer', { class: 'bp-title-block' },
      cell('project', t('cs.tbProject'), 'Rika cheat sheets'),
      cell('sheet', t('cs.tbSheet'), `${index + 1} / ${SHEETS.length}`),
      cell('title', t('cs.tbTitle'), tx(sheet.title)),
      cell('scale', t('cs.tbScale'), '1 : 1'),
      cell('drawn', t('cs.tbDrawn'), 'Rika'),
      cell('level', t('cs.levels'), t(`cs.level.${sheet.level}`)));
  }

  /** Az asztalon heverő eszközök (csak díszítés, széles képernyőn). */
  function deskTools() {
    const ruler = h('div', { class: 'desk-ruler' },
      Array.from({ length: 12 }, (_, i) => h('span', { style: `--n:${i}` }, String(i))));
    const setSquare = svg('svg', { class: 'desk-square', viewBox: '0 0 200 200' },
      svg('path', { d: 'M8 192V8l184 184Z M40 160V86l74 74Z', 'fill-rule': 'evenodd' }),
      svg('path', { class: 'desk-square-ticks', d: Array.from({ length: 17 }, (_, i) => `M8 ${20 + i * 10}h${i % 5 === 0 ? 12 : 6}`).join('') }));
    const pencil = svg('svg', { class: 'desk-pencil', viewBox: '0 0 240 20' },
      svg('path', { class: 'pc-wood', d: 'M36 2 6 10l30 8Z' }),
      svg('path', { class: 'pc-lead', d: 'M15 7.6 6 10l9 2.4Z' }),
      svg('rect', { class: 'pc-body', x: 36, y: 2, width: 166, height: 16 }),
      svg('rect', { class: 'pc-light', x: 36, y: 2, width: 166, height: 5 }),
      svg('rect', { class: 'pc-dark', x: 36, y: 13, width: 166, height: 5 }),
      svg('rect', { class: 'pc-metal', x: 202, y: 1.5, width: 15, height: 17 }),
      svg('rect', { class: 'pc-eraser', x: 217, y: 2, width: 19, height: 16, rx: 3 }));
    return h('div', { class: 'desk-tools no-print', 'aria-hidden': 'true' }, ruler, setSquare, pencil);
  }

  /* ---------- másolás kattintásra ---------- */

  app.addEventListener('click', (event) => {
    const node = event.target.closest('[data-copy]');
    if (node) copyText(node.dataset.copy);
  });
  app.addEventListener('keydown', (event) => {
    const node = event.target.closest('[data-copy]');
    if (node && node.tagName !== 'BUTTON' && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      copyText(node.dataset.copy);
    }
  });

  /* ---------- útvonal ---------- */

  function route() {
    app.classList.remove('desk');
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
