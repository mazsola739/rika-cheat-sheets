/*
 * Snippetek oldal. A forrás a snippets/snippets.js, ugyanabban a formában, ahogy írod:
 *
 *   /*12. byteSize #string
 *
 *   Leírás egy vagy több bekezdésben.*\/
 *
 *   const byteSize = str => new Blob([str]).size;
 *
 *   //byteSize('Hello World'); // 11
 *
 * A fejléc: sorszám (elhagyható), név, #kategória. A leírás után jön a kód,
 * a végén a // kezdetű sorok a példák.
 */
(() => {
  'use strict';

  const { h, t, addStrings, store, highlight, copyText, mountArt, normalize, bindSearchShortcut } = window.Rika;
  const SOURCE = 'snippets/snippets.js';
  const FAV_KEY = 'rika-cheat-sheets:snippets:favorites';

  addStrings({
    hu: {
      'sn.docTitle': 'JavaScript snippetek · Rika cheat sheets',
      'sn.desc': 'Rövid, újrahasznosítható JavaScript snippetek kategóriákba rendezve, kereséssel, kedvencekkel és egy kattintásos másolással.',
      'sn.kicker': 'JavaScript, kis adagokban',
      'sn.title': 'Snippetek',
      'sn.searchLabel': 'Keresés a snippetek között',
      'sn.searchPh': 'Keresés: név, leírás…',
      'sn.favs': 'Kedvencek',
      'sn.categories': 'Kategóriák',
      'sn.all': 'Mind',
      'sn.result': '{n} snippet',
      'sn.resultOf': '{n} / {all} snippet',
      'sn.none': 'Nincs találat. Próbálj rövidebb szót, vagy válts kategóriát.',
      'sn.noFavs': 'Még nincs kedvenced: a ☆ gombbal jelölhetsz meg egy snippetet.',
      'sn.example': 'Példa',
      'sn.favAdd': '{name} hozzáadása a kedvencekhez',
      'sn.favRemove': '{name} eltávolítása a kedvencek közül',
      'sn.loadError': 'Nem sikerült betölteni a snippeteket. Helyben egy kis webszerverrel nyisd meg az oldalt (lásd README).',
      'sn.cat.array': 'Tömbök',
      'sn.cat.string': 'Szövegek',
      'sn.cat.number': 'Számok & matek',
      'sn.cat.date': 'Dátum & idő',
      'sn.cat.dom': 'DOM & böngésző',
      'sn.cat.object': 'Objektumok',
      'sn.cat.function': 'Függvények & async',
      'sn.cat.type': 'Típusellenőrzés',
      'sn.cat.node': 'Node.js',
      'sn.cat.misc': 'Egyéb',
      'sn.view': 'Nézet',
      'sn.view.notebook': 'Füzet',
      'sn.view.windows': 'Kódablak',
      'sn.pages': 'Oldalak',
      'sn.pageOf': '{p}. oldal a {n}-ből',
      'sn.pageN': '{n}. oldal',
      'sn.prevPage': 'Előző oldal',
      'sn.nextPage': 'Következő oldal',
      'sn.cont': 'folytatás',
      'sn.run': '▶ Futtatás',
      'sn.runAria': '{name} példájának futtatása',
      'sn.running': 'Fut…',
      'sn.timeout': 'Túl sokáig futott (végtelen ciklus?), leállítottam.',
      'sn.reset': 'Visszaállítás',
      'sn.editHint': 'Átírhatod a kódot és a példát, Ctrl+Enter futtatja.',
      'sn.console': 'konzol',
      'sn.matches': 'egyezik a várt eredménnyel',
      'sn.noSteps': 'Nincs futtatható példa.',
      'sn.codeLabel': '{name} kódja (átírható)',
      'sn.exampleLabel': '{name} példája (átírható)',
    },
    en: {
      'sn.docTitle': 'JavaScript snippets · Rika cheat sheets',
      'sn.desc': 'Short, reusable JavaScript snippets grouped by category, with search, favorites and one-click copy.',
      'sn.kicker': 'JavaScript in small bites',
      'sn.title': 'Snippets',
      'sn.searchLabel': 'Search snippets',
      'sn.searchPh': 'Search: name, description…',
      'sn.favs': 'Favorites',
      'sn.categories': 'Categories',
      'sn.all': 'All',
      'sn.result': '{n} snippets',
      'sn.resultOf': '{n} / {all} snippets',
      'sn.none': 'No matches. Try a shorter word or another category.',
      'sn.noFavs': 'No favorites yet: mark a snippet with the ☆ button.',
      'sn.example': 'Example',
      'sn.favAdd': 'Add {name} to favorites',
      'sn.favRemove': 'Remove {name} from favorites',
      'sn.loadError': 'Could not load the snippets. Locally, open the site through a small web server (see README).',
      'sn.cat.array': 'Arrays',
      'sn.cat.string': 'Strings',
      'sn.cat.number': 'Numbers & math',
      'sn.cat.date': 'Dates & time',
      'sn.cat.dom': 'DOM & browser',
      'sn.cat.object': 'Objects',
      'sn.cat.function': 'Functions & async',
      'sn.cat.type': 'Type checks',
      'sn.cat.node': 'Node.js',
      'sn.cat.misc': 'Other',
      'sn.view': 'View',
      'sn.view.notebook': 'Notebook',
      'sn.view.windows': 'Code windows',
      'sn.pages': 'Pages',
      'sn.pageOf': 'page {p} of {n}',
      'sn.pageN': 'Page {n}',
      'sn.prevPage': 'Previous page',
      'sn.nextPage': 'Next page',
      'sn.cont': 'continued',
      'sn.run': '▶ Run',
      'sn.runAria': 'Run the {name} example',
      'sn.running': 'Running…',
      'sn.timeout': 'It ran too long (an endless loop?), so I stopped it.',
      'sn.reset': 'Reset',
      'sn.editHint': 'You can edit the code and the example; Ctrl+Enter runs it.',
      'sn.console': 'console',
      'sn.matches': 'matches the expected result',
      'sn.noSteps': 'There is no example to run.',
      'sn.codeLabel': '{name} code (editable)',
      'sn.exampleLabel': '{name} example (editable)',
    },
  });

  /* Kategóriák sorrendje és színe (kiemelő). */
  const CATEGORIES = {
    array: '#b2f2bb',
    string: '#ffd8a8',
    number: '#ffec99',
    date: '#d0bfff',
    dom: '#a5d8ff',
    object: '#fcc2d7',
    function: '#99e9f2',
    type: '#ffc9c9',
    node: '#d8f5a2',
    misc: '#e9ecef',
  };

  /* ---------- feldolgozás ---------- */

  function parseSnippets(raw) {
    let text = raw.replace(/\r\n?/g, '\n');
    const end = text.indexOf('\n//Synopsis');
    if (end > -1) text = text.slice(0, end);
    const seen = new Set();

    return text
      .split(/^(?=\/\*\s*\d+\.)/m) // csak a számozott fejlécnél kezdődik új snippet
      .filter((block) => block.startsWith('/*'))
      .map((block) => {
        const close = block.indexOf('*/');
        if (close < 0) return null;
        const [first, ...rest] = block.slice(2, close).split('\n');
        const head = first.match(/^\s*(?:\d+\.)?\s*(.*?)\s*(?:#([\w-]+))?\s*$/);
        const title = head[1];
        const category = CATEGORIES[head[2]] ? head[2] : 'misc';
        const description = rest
          .join('\n')
          .trim()
          .split(/\n\s*\n/)
          .map((paragraph) => paragraph.replace(/\s*\n\s*/g, ' ').trim())
          .filter(Boolean);

        const lines = block.slice(close + 2).replace(/^\s*\n/, '').replace(/\s+$/, '').split('\n');
        let split = lines.length;
        while (split > 0 && (lines[split - 1].trim() === '' || lines[split - 1].trim().startsWith('//'))) split--;
        let code = lines.slice(0, split).join('\n').replace(/\s+$/, '');
        let example = lines
          .slice(split)
          .filter((line) => line.trim())
          .map((line) => {
            const rest2 = line.trim().slice(2);
            return rest2 === '' || /^\s/.test(rest2) ? `//${rest2}` : rest2;
          })
          .join('\n');
        // többsoros példa /* … */ megjegyzésben a kód végén: az is a példához tartozik
        const blockAt = code.lastIndexOf('\n/*');
        if (blockAt > -1 && code.endsWith('*/')) {
          example = [code.slice(blockAt + 3, -2).trim(), example].filter(Boolean).join('\n');
          code = code.slice(0, blockAt).replace(/\s+$/, '');
        }

        // csak a legfelső szintű (sor elején álló) deklarációk számítanak, a függvényen belüliek nem
        const names = [...code.matchAll(/^(?:const|let|var|function)\s+([A-Za-z_$][\w$]*)\s*(?:=|\()/gm)].map((m) => m[1]);
        const fn = names.length ? names[names.length - 1] : title;
        let id = fn.replace(/[^\w-]+/g, '-');
        while (seen.has(id)) id += '-2';
        seen.add(id);

        return { id, title, fn, category, description, code, example, search: normalize(`${title} ${fn} ${description.join(' ')}`) };
      })
      .filter((snippet) => snippet && snippet.code);
  }

  /* ---------- állapot ---------- */

  const VIEW_KEY = 'rika-cheat-sheets:snippets:view';
  let snippets = [];
  let category = 'all';
  let page = 0;
  const PAGE_SIZE = 10;
  const CAT_ORDER = Object.keys(CATEGORIES);
  let favOnly = false;
  let favorites = new Set(store.get(FAV_KEY, []));
  let view = store.get(VIEW_KEY, 'notebook') === 'windows' ? 'windows' : 'notebook';

  const listEl = document.getElementById('windows');
  const chipsEl = document.getElementById('categories');
  const resultEl = document.getElementById('result-line');
  const searchEl = document.getElementById('search');
  const favFilterEl = document.getElementById('fav-filter');
  const pagerEls = [document.getElementById('pager-top'), document.getElementById('pager-bottom')];

  mountArt(document.getElementById('splash'), { variant: 'compact', id: 'sn', seed: 7311 })(1);

  /* ---------- megjelenítés ---------- */

  function renderChips() {
    const counts = snippets.reduce((acc, s) => ((acc[s.category] = (acc[s.category] || 0) + 1), acc), {});
    const chip = (key, label, count, color) =>
      h('li', {},
        h('button', {
          type: 'button',
          class: 'chip',
          'aria-pressed': String(category === key),
          'data-cat': key,
          style: color ? `--cat-c:${color}` : null,
        },
        color ? h('span', { class: 'chip-swatch', 'aria-hidden': 'true' }) : null,
        label,
        h('span', { class: 'chip-count' }, String(count))));
    chipsEl.replaceChildren(
      chip('all', t('sn.all'), snippets.length),
      ...Object.keys(CATEGORIES).filter((key) => counts[key]).map((key) => chip(key, t(`sn.cat.${key}`), counts[key], CATEGORIES[key])),
    );
    document.getElementById('fav-count').textContent = String(favorites.size);
    favFilterEl.setAttribute('aria-pressed', String(favOnly));
  }

  /* ---------- futtatás a post-iten (snippet-runner.js) ---------- */

  const RUNNER = window.SnippetRunner;
  // a DOM- és Node-snippetekhez igazi oldal / Node kell, ezek a workerben nem futnak értelmesen
  const runnableCache = new Map();
  const isRunnable = (s) => {
    if (!runnableCache.has(s.id)) {
      runnableCache.set(s.id, Boolean(RUNNER) && !['dom', 'node'].includes(s.category) && RUNNER.steps(s.example).length > 0);
    }
    return runnableCache.get(s.id);
  };
  // plaintext-only: csak sima szöveg kerülhet bele (régebbi böngészőben sima contenteditable)
  const EDIT_MODE = (() => {
    try {
      const probe = document.createElement('div');
      probe.contentEditable = 'plaintext-only';
      return probe.contentEditable === 'plaintext-only' ? 'plaintext-only' : 'true';
    } catch {
      return 'true';
    }
  })();

  /** Kód vagy példa: futtatható snippetnél átírható. */
  const codePart = (s, part, text) => h('code', isRunnable(s)
    ? {
      'data-part': part,
      contenteditable: EDIT_MODE,
      spellcheck: 'false',
      'aria-label': t(part === 'code' ? 'sn.codeLabel' : 'sn.exampleLabel', { name: s.fn }),
      html: highlight(text),
    }
    : { html: highlight(text) });

  const runButtons = (s, cls) => (isRunnable(s)
    ? [
      h('button', { type: 'button', class: `${cls} run-btn`, 'data-run': s.id, 'aria-label': t('sn.runAria', { name: s.fn }), title: t('sn.editHint') }, t('sn.run')),
      h('button', { type: 'button', class: `${cls} reset-btn`, 'data-reset': s.id, hidden: true }, t('sn.reset')),
    ]
    : []);

  const runOutput = (s) => (isRunnable(s) ? h('ul', { class: 'run-out', 'aria-live': 'polite', hidden: true }) : null);

  function renderWindow(s) {
    const isFav = favorites.has(s.id);
    return h('article', { class: 'window', id: s.id, style: `--c:${CATEGORIES[s.category]}`, 'aria-labelledby': `t-${s.id}` },
      h('header', { class: 'win-bar' },
        h('span', { class: 'win-dots', 'aria-hidden': 'true' }, h('i'), h('i'), h('i')),
        h('span', { class: 'win-file' }, `${s.fn}.js`),
        h('button', {
          type: 'button',
          class: 'win-btn fav',
          'data-fav': s.id,
          'aria-pressed': String(isFav),
          'aria-label': t(isFav ? 'sn.favRemove' : 'sn.favAdd', { name: s.fn }),
        }, isFav ? '★' : '☆'),
        runButtons(s, 'win-btn'),
        h('button', { type: 'button', class: 'win-btn', 'data-copy': s.id, 'aria-label': t('copy.aria', { label: `${s.fn}.js` }) }, t('copy'))),
      h('div', { class: 'win-body' },
        h('div', { class: 'win-head' },
          h('h3', { class: 'win-title', id: `t-${s.id}` }, h('a', { href: `#${s.id}` }, s.title)),
          h('span', { class: 'win-cat' }, `#${t(`sn.cat.${s.category}`)}`)),
        s.description.map((paragraph) => h('p', { class: 'win-desc', lang: 'en' }, paragraph)),
        h('pre', { class: 'win-code' }, codePart(s, 'code', s.code)),
        s.example
          ? h('div', { class: 'win-example' },
            h('span', { class: 'win-label' }, t('sn.example')),
            h('pre', {}, codePart(s, 'example', s.example)))
          : null,
        runOutput(s)));
  }

  /* Post-it színek és enyhe elfordítás, hogy ne legyen két egyforma egymás mellett. */
  const POSTITS = ['#fff3a3', '#ffd1e8', '#d3f8c2', '#c9ecff', '#ffe0b8', '#e6d6ff'];
  const TILTS = [-1.2, 0.9, -0.6, 1.3, -0.9, 0.5, 1];
  /* A post-it utáni szöveg maradjon a füzetvonalakon: a csomagoló magasságát egész sorokra kerekítjük. */
  function alignPostits() {
    const line = parseFloat(getComputedStyle(listEl).getPropertyValue('--ln')) || 32;
    // a lista teteje essen pontosan egy füzetvonalra, így minden sor a vonalakon ül
    listEl.style.paddingTop = '0px';
    const top = listEl.getBoundingClientRect().top + window.scrollY;
    listEl.style.paddingTop = `${((line - (top % line)) % line).toFixed(4)}px`;
    listEl.querySelectorAll('.postit-wrap').forEach((wrap) => {
      wrap.style.minHeight = '';
      const height = wrap.getBoundingClientRect().height;
      wrap.style.minHeight = `${(Math.ceil(height / line - 0.01) * line).toFixed(4)}px`;
    });
  }
  let alignTimer;
  window.addEventListener('resize', () => {
    clearTimeout(alignTimer);
    alignTimer = setTimeout(() => view === 'notebook' && alignPostits(), 120);
  });
  document.fonts?.ready.then(() => view === 'notebook' && alignPostits());

  /* Füzet nézet: washi tape cím, golyóstollas leírás, a kód post-iten. */
  function renderNote(s, index) {
    const isFav = favorites.has(s.id);
    return h('article', { class: 'note', id: s.id, style: `--c:${CATEGORIES[s.category]}`, 'aria-labelledby': `t-${s.id}` },
      h('header', { class: 'note-head' },
        h('h3', { class: 'note-tape', id: `t-${s.id}` }, h('a', { href: `#${s.id}` }, `${s.title} :`)),
        h('span', { class: 'note-cat' }, `#${t(`sn.cat.${s.category}`)}`),
        h('span', { class: 'note-tools' },
          h('button', {
            type: 'button',
            class: 'note-btn fav',
            'data-fav': s.id,
            'aria-pressed': String(isFav),
            'aria-label': t(isFav ? 'sn.favRemove' : 'sn.favAdd', { name: s.fn }),
          }, isFav ? '★' : '☆'),
          runButtons(s, 'note-btn'),
          h('button', { type: 'button', class: 'note-btn', 'data-copy': s.id, 'aria-label': t('copy.aria', { label: `${s.fn}.js` }) }, t('copy')))),
      s.description.map((paragraph) => h('p', { class: 'note-desc', lang: 'en' }, paragraph)),
      h('div', { class: 'postit-wrap' },
        h('div', { class: 'postit', style: `--pi:${POSTITS[index % POSTITS.length]};--rot:${TILTS[index % TILTS.length]}deg` },
          h('pre', { class: 'postit-code' }, codePart(s, 'code', s.code)),
          s.example ? h('pre', { class: 'postit-example' }, codePart(s, 'example', s.example)) : null,
          runOutput(s))));
  }

  function renderViewSwitch() {
    document.querySelectorAll('#view-switch [data-view]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.view === view));
    });
  }

  /** A szűrt lista; a "Mind" fülön kategóriánként csoportosítva (a fájlbeli sorrend azon belül marad). */
  function filtered() {
    const query = normalize(searchEl.value.trim());
    const list = snippets.filter((s) =>
      (category === 'all' || s.category === category) &&
      (!favOnly || favorites.has(s.id)) &&
      (!query || s.search.includes(query)));
    if (category === 'all') list.sort((a, b) => CAT_ORDER.indexOf(a.category) - CAT_ORDER.indexOf(b.category));
    return list;
  }

  /*
   * Oldalszámok: kevés oldalnál mind, soknál az első, az utolsó és a környék, köztük "…".
   * Keskeny képernyőn (compact) kevesebb szám, hogy a lapozó egy sorban elférjen.
   */
  const narrowQuery = matchMedia('(max-width: 560px)');
  function pageItems(pages) {
    const compact = narrowQuery.matches;
    if (pages <= (compact ? 5 : 9)) return Array.from({ length: pages }, (_, i) => i);
    const keep = new Set([0, pages - 1, page - 1, page, page + 1]);
    if (!compact && page <= 3) [1, 2, 3, 4].forEach((p) => keep.add(p));
    if (!compact && page >= pages - 4) [pages - 5, pages - 4, pages - 3, pages - 2].forEach((p) => keep.add(p));
    const sorted = [...keep].filter((p) => p >= 0 && p < pages).sort((a, b) => a - b);
    return sorted.flatMap((p, i) => (i && p - sorted[i - 1] > 1 ? [null, p] : [p]));
  }

  let lastPages = 1;
  narrowQuery.addEventListener('change', () => renderPagers(lastPages));

  function renderPagers(pages) {
    lastPages = pages;
    for (const el of pagerEls) {
      el.hidden = pages <= 1;
      if (pages <= 1) {
        el.replaceChildren();
        continue;
      }
      el.replaceChildren(
        h('button', { type: 'button', class: 'pg pg-step', 'data-page': String(page - 1), disabled: page === 0, 'aria-label': t('sn.prevPage') }, '‹'),
        ...pageItems(pages).map((p) => (p === null
          ? h('span', { class: 'pg-gap', 'aria-hidden': 'true' }, '…')
          : h('button', {
            type: 'button',
            class: 'pg',
            'data-page': String(p),
            'aria-current': p === page ? 'page' : null,
            'aria-label': t('sn.pageN', { n: p + 1 }),
          }, String(p + 1)))),
        h('button', { type: 'button', class: 'pg pg-step', 'data-page': String(page + 1), disabled: page === pages - 1, 'aria-label': t('sn.nextPage') }, '›'));
    }
  }

  /* csoportcím a "Mind" fülön: ahol új kategória kezdődik (vagy egy oldal tetején a folytatás) */
  const groupHead = (cat, count, continued) => h('h2', { class: 'group-head', style: `--c:${CATEGORIES[cat]}` },
    h('span', { class: 'gh-tape' }, `#${t(`sn.cat.${cat}`)}`),
    h('span', { class: 'gh-count' }, continued ? `(${t('sn.cont')})` : String(count)));

  function renderList({ scroll = false } = {}) {
    renderViewSwitch();
    listEl.className = view === 'notebook' ? 'notes' : 'windows';
    const visible = filtered();
    const pages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
    page = Math.min(Math.max(page, 0), pages - 1);

    const count = visible.length === snippets.length
      ? t('sn.result', { n: snippets.length })
      : t('sn.resultOf', { n: visible.length, all: snippets.length });
    resultEl.textContent = pages > 1 ? `${count} · ${t('sn.pageOf', { p: page + 1, n: pages })}` : count;
    renderPagers(pages);

    if (!visible.length) {
      listEl.replaceChildren(h('p', { class: 'empty' }, favOnly && !favorites.size ? t('sn.noFavs') : t('sn.none')));
      return;
    }
    const start = page * PAGE_SIZE;
    const shown = visible.slice(start, start + PAGE_SIZE);
    const perCat = visible.reduce((acc, s) => ((acc[s.category] = (acc[s.category] || 0) + 1), acc), {});
    const nodes = [];
    shown.forEach((s, i) => {
      if (category === 'all' && (i === 0 || shown[i - 1].category !== s.category)) {
        nodes.push(groupHead(s.category, perCat[s.category], i === 0 && start > 0 && visible[start - 1].category === s.category));
      }
      nodes.push(view === 'notebook' ? renderNote(s, start + i) : renderWindow(s));
    });
    listEl.replaceChildren(...nodes);
    listEl.style.paddingTop = '';
    if (view === 'notebook') requestAnimationFrame(alignPostits);
    if (scroll) chipsEl.scrollIntoView({ block: 'start' });
  }

  /** Egy snippet oldalára lapoz (pl. #linkről érkezve), és visszaadja az elemét. */
  function showSnippet(id) {
    const index = filtered().findIndex((s) => s.id === id);
    if (index < 0) return null;
    page = Math.floor(index / PAGE_SIZE);
    renderList();
    return document.getElementById(id);
  }

  function renderAll() {
    renderChips();
    renderList();
  }

  /* ---------- események ---------- */

  chipsEl.addEventListener('click', (event) => {
    const button = event.target.closest('[data-cat]');
    if (!button) return;
    category = button.dataset.cat;
    page = 0;
    renderAll();
  });

  favFilterEl.addEventListener('click', () => {
    favOnly = !favOnly;
    page = 0;
    renderAll();
  });

  searchEl.addEventListener('input', () => {
    page = 0;
    renderList();
  });

  pagerEls.forEach((el) => el.addEventListener('click', (event) => {
    const button = event.target.closest('[data-page]');
    if (!button || button.disabled) return;
    page = Number(button.dataset.page);
    renderList({ scroll: true });
  }));
  bindSearchShortcut(searchEl);

  document.getElementById('view-switch').addEventListener('click', (event) => {
    const button = event.target.closest('[data-view]');
    if (!button || button.dataset.view === view) return;
    view = button.dataset.view;
    store.set(VIEW_KEY, view);
    renderList();
  });

  /* ---------- futtatás, átírás, visszaállítás ---------- */

  const snippetOf = (article) => snippets.find((x) => x.id === article?.id);
  const shorten = (expr) => {
    const oneLine = expr.replace(/\s+/g, ' ');
    return oneLine.length > 48 ? `${oneLine.slice(0, 46)}…` : oneLine;
  };
  const realign = () => view === 'notebook' && alignPostits();

  async function runSnippet(article) {
    const s = snippetOf(article);
    if (!s || !RUNNER) return;
    const codeEl = article.querySelector('[data-part="code"]');
    const exampleEl = article.querySelector('[data-part="example"]');
    const out = article.querySelector('.run-out');
    const button = article.querySelector('[data-run]');
    if (!out) return;
    const list = RUNNER.steps(exampleEl ? exampleEl.textContent : s.example);
    out.hidden = false;
    out.replaceChildren(h('li', { class: 'run-line run-wait' }, t('sn.running')));
    if (button) button.disabled = true;
    realign();

    const result = list.length ? await RUNNER.run(codeEl ? codeEl.textContent : s.code, list) : null;
    if (button) button.disabled = false;

    if (!result) out.replaceChildren(h('li', { class: 'run-line run-val' }, t('sn.noSteps')));
    else if (result.timeout) out.replaceChildren(h('li', { class: 'run-line run-err' }, `⚠ ${t('sn.timeout')}`));
    else if (result.fatal) out.replaceChildren(h('li', { class: 'run-line run-err' }, `⚠ ${result.fatal}`));
    else {
      out.replaceChildren(
        ...list.flatMap((step, i) => {
          const r = result.results?.[i] || { ok: false, error: '?' };
          const logs = result.logs?.[i] || [];
          const ok = RUNNER.stepMatches(r, step, logs);
          const line = r.ok
            ? h('li', { class: `run-line ${ok ? 'run-ok' : 'run-val'}` },
              h('span', { class: 'run-expr' }, shorten(step.expr)),
              h('span', { class: 'run-arrow', 'aria-hidden': 'true' }, ' → '),
              h('span', { class: 'run-value' }, r.value),
              ok ? h('span', { class: 'run-tick', title: t('sn.matches'), 'aria-label': t('sn.matches') }, ' ✓') : null)
            : h('li', { class: 'run-line run-err' },
              h('span', { class: 'run-expr' }, shorten(step.expr)),
              h('span', { class: 'run-arrow', 'aria-hidden': 'true' }, ' → '),
              `⚠ ${r.error}`);
          return [line, ...logs.map((text) => h('li', { class: 'run-line run-log' }, h('span', { class: 'run-log-label' }, `${t('sn.console')}: `), text))];
        }),
        h('li', { class: 'run-line run-hint' }, t('sn.editHint')),
      );
    }
    realign();
  }

  function resetSnippet(article) {
    const s = snippetOf(article);
    if (!s) return;
    const codeEl = article.querySelector('[data-part="code"]');
    const exampleEl = article.querySelector('[data-part="example"]');
    if (codeEl) codeEl.innerHTML = highlight(s.code);
    if (exampleEl) exampleEl.innerHTML = highlight(s.example);
    article.classList.remove('is-edited');
    article.querySelector('[data-reset]')?.setAttribute('hidden', '');
    const out = article.querySelector('.run-out');
    if (out) {
      out.hidden = true;
      out.replaceChildren();
    }
    realign();
  }

  // átírás közben: jelöljük, megjelenik a Visszaállítás, és a füzetvonalak igazodnak
  listEl.addEventListener('input', (event) => {
    const part = event.target.closest?.('[data-part]');
    if (!part) return;
    const article = part.closest('article');
    article.classList.add('is-edited');
    article.querySelector('[data-reset]')?.removeAttribute('hidden');
    if (view === 'notebook') {
      clearTimeout(alignTimer);
      alignTimer = setTimeout(alignPostits, 150);
    }
  });

  // Ctrl+Enter (Macen Cmd+Enter) a kódban vagy a példában: futtatás
  listEl.addEventListener('keydown', (event) => {
    const part = event.target.closest?.('[data-part]');
    if (part && event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      runSnippet(part.closest('article'));
    }
  });

  // szerkesztés után újra színezzük a kódot
  listEl.addEventListener('focusout', (event) => {
    const part = event.target.closest?.('[data-part]');
    if (part && part.closest('article')?.classList.contains('is-edited')) part.innerHTML = highlight(part.textContent);
  });

  listEl.addEventListener('click', (event) => {
    const runBtn = event.target.closest('[data-run]');
    if (runBtn) {
      runSnippet(runBtn.closest('article'));
      return;
    }
    const resetBtn = event.target.closest('[data-reset]');
    if (resetBtn) {
      resetSnippet(resetBtn.closest('article'));
      return;
    }
    const copyBtn = event.target.closest('[data-copy]');
    if (copyBtn) {
      // az esetleg átírt kódot másoljuk
      const s = snippets.find((x) => x.id === copyBtn.dataset.copy);
      const codeEl = copyBtn.closest('article')?.querySelector('[data-part="code"]');
      if (s) copyText(codeEl ? codeEl.textContent : s.code);
      return;
    }
    const favBtn = event.target.closest('[data-fav]');
    if (favBtn) {
      const id = favBtn.dataset.fav;
      if (favorites.has(id)) favorites.delete(id);
      else favorites.add(id);
      store.set(FAV_KEY, [...favorites]);
      const isFav = favorites.has(id);
      const s = snippets.find((x) => x.id === id);
      favBtn.setAttribute('aria-pressed', String(isFav));
      favBtn.setAttribute('aria-label', t(isFav ? 'sn.favRemove' : 'sn.favAdd', { name: s?.fn || id }));
      favBtn.textContent = isFav ? '★' : '☆';
      document.getElementById('fav-count').textContent = String(favorites.size);
      if (favOnly) renderList();
    }
  });

  document.addEventListener('rika:lang', renderAll);

  /* ---------- betöltés ---------- */

  fetch(SOURCE)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.text();
    })
    .then((text) => {
      snippets = parseSnippets(text);
      favorites = new Set([...favorites].filter((id) => snippets.some((s) => s.id === id)));
      renderAll();
      const target = location.hash && showSnippet(decodeURIComponent(location.hash.slice(1)));
      if (target) {
        requestAnimationFrame(() => requestAnimationFrame(() => target.scrollIntoView()));
        target.classList.add('flash');
      }
    })
    .catch((error) => {
      console.error(error);
      listEl.replaceChildren(h('p', { class: 'empty' }, t('sn.loadError')));
    });
})();
