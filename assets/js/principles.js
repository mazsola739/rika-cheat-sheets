/*
 * Elvek oldal. Az elrendezés a refactoring.guru katalógusát idézi, a tartalom saját:
 *  - bal oldalt piros oldalsáv fa-menüvel (csoportok → elvek), keskeny képernyőn lenyíló menü,
 *  - #catalog: szivárványkerék + csoportonként képes csempék,
 *  - #<id>:    egy elv oldala: szándék + plakát-mém, probléma, megoldás, hasonlat,
 *              mikor használd, előnyök/hátrányok, kapcsolódó elvek, előző/következő.
 * Tartalom: principles-data.js, képek: principles-scenes.js
 */
(() => {
  'use strict';

  const { h, svg, t, tx, addStrings, codeBlock, mountArt, getLang } = window.Rika;
  const DATA = window.PRINCIPLES;
  const GROUP_KEYS = Object.keys(DATA.groups);
  // csoportonként egymás után (a kerék szeletei és a lapozás is ezt a sorrendet követi)
  const ORDER = DATA.order || [];
  const rank = (card) => (ORDER.includes(card.id) ? ORDER.indexOf(card.id) : ORDER.length + DATA.cards.indexOf(card));
  const CARDS = [...DATA.cards].sort((a, b) => GROUP_KEYS.indexOf(a.group) - GROUP_KEYS.indexOf(b.group) || rank(a) - rank(b));
  const GUIDE = DATA.guide || {};
  const POSTERS = DATA.posters || {};
  const SCENES = window.PRINCIPLE_SCENES || { defs: '', draw: {} };
  const N = CARDS.length;

  addStrings({
    hu: {
      'pr.docTitle': 'Elvek · Rika cheat sheets',
      'pr.desc': 'A tiszta kód alapelvei (KISS, YAGNI, DRY, SOLID…) katalógusban, saját plakát-mémekkel, kódpéldákkal, előnyökkel és hátrányokkal.',
      'pr.kicker': 'Tiszta kód, röviden',
      'pr.title': 'Elvek',
      'pr.lead': 'KISS, YAGNI, DRY, SOLID és társaik. Mindegyikhez mém, probléma, megoldás, előnyök és hátrányok.',
      'pr.menu': 'Elvek menü',
      'pr.catalog': 'Katalógus',
      'pr.catalogTitle': 'Az elvek katalógusa',
      'pr.catalogLead': 'A tiszta kód legfontosabb elvei egy helyen. Mindegyikhez van plakát-mém, probléma és megoldás kóddal, hétköznapi hasonlat, előnyök és hátrányok.',
      'pr.groups': 'Csoportok',
      'pr.hint': 'Vidd az egeret egy szelet fölé a mémjéért, kattints a megnyitáshoz. Billentyűzettel: ← → lépked, Enter megnyitja.',
      'pr.wheelLine1': 'A tiszta kód',
      'pr.wheelLine2': 'alapelvei',
      'pr.wheelCount': '{n} elv',
      'pr.wheel': 'Az elvek kereke',
      'pr.principles': 'elv',
      'pr.crumbs': 'Hol vagy',
      'pr.aka': 'Teljes név:',
      'pr.intent': 'Szándék',
      'pr.problem': 'Probléma',
      'pr.solution': 'Megoldás',
      'pr.analogy': 'Hétköznapi hasonlat',
      'pr.when': 'Mikor használd?',
      'pr.proscons': 'Előnyök és hátrányok',
      'pr.pros': 'Előnyök',
      'pr.cons': 'Hátrányok',
      'pr.related': 'Kapcsolódó elvek',
      'pr.bad': 'Nem így',
      'pr.good': 'Inkább így',
      'pr.watch': 'Vigyázz:',
      'pr.prev': '← Előző',
      'pr.next': 'Következő →',
      'pr.pager': 'Lapozás az elvek között',
      'pr.posterAlt': 'Plakát: {title} – {caption}',
    },
    en: {
      'pr.docTitle': 'Principles · Rika cheat sheets',
      'pr.desc': 'Clean-code principles (KISS, YAGNI, DRY, SOLID…) as a catalog, with original poster memes, code examples, pros and cons.',
      'pr.kicker': 'Clean code, in short',
      'pr.title': 'Principles',
      'pr.lead': 'KISS, YAGNI, DRY, SOLID and friends. Each with a meme, the problem, the solution, and the trade-offs.',
      'pr.menu': 'Principles menu',
      'pr.catalog': 'Catalog',
      'pr.catalogTitle': 'The catalog of principles',
      'pr.catalogLead': 'The key clean-code principles in one place. Each comes with a poster meme, the problem and the solution in code, a real-world analogy, and pros and cons.',
      'pr.groups': 'Groups',
      'pr.hint': 'Hover a slice to see its meme, click to open it. Keyboard: ← → to step, Enter to open.',
      'pr.wheelLine1': 'Clean code',
      'pr.wheelLine2': 'principles',
      'pr.wheelCount': '{n} principles',
      'pr.wheel': 'The principles wheel',
      'pr.principles': 'principles',
      'pr.crumbs': 'You are here',
      'pr.aka': 'Also known as:',
      'pr.intent': 'Intent',
      'pr.problem': 'Problem',
      'pr.solution': 'Solution',
      'pr.analogy': 'Real-world analogy',
      'pr.when': 'When to use it',
      'pr.proscons': 'Pros and cons',
      'pr.pros': 'Pros',
      'pr.cons': 'Cons',
      'pr.related': 'Relations with other principles',
      'pr.bad': 'Nope',
      'pr.good': 'Better',
      'pr.watch': 'Watch out:',
      'pr.prev': '← Previous',
      'pr.next': 'Next →',
      'pr.pager': 'Step through the principles',
      'pr.posterAlt': 'Poster: {title} – {caption}',
    },
  });

  const layoutEl = document.getElementById('guru');
  const heroEl = document.getElementById('wheel-hero');
  const sideEl = document.getElementById('side');
  const sideBody = document.getElementById('side-body');
  const sideToggle = document.getElementById('side-toggle');
  const sideCurrent = document.getElementById('side-current');
  const mainEl = document.getElementById('guru-main');

  let active = -1; // a megnyitott elv indexe (-1 = katalógus)
  let lastVisited = -1; // ezt a szeletet emeli ki a kerék
  let view = null; // 'catalog' vagy 'p:<index>' – hogy ne rajzoljuk újra feleslegesen
  let wheelEl = null;

  mountArt(document.getElementById('splash'), { variant: 'compact', id: 'pr', seed: 913 })(1);

  // a plakátképek közös színátmenetei, egyszer a dokumentumban
  document.body.append(svg('svg', {
    class: 'ps-defs', width: '0', height: '0', 'aria-hidden': 'true', focusable: 'false', html: `<defs>${SCENES.defs}</defs>`,
  }));

  /* ---------- színek, segédek ---------- */

  const hueOf = (i) => (28 + i * (330 / N)) % 360;
  const sliceColor = (i) => `hsl(${hueOf(i).toFixed(0)} 72% ${i % 2 ? 51 : 56}%)`;
  const innerColor = (i) => `hsl(${hueOf(i).toFixed(0)} 58% ${i % 2 ? 36 : 40}%)`;
  const lightColor = (i) => `hsl(${hueOf(i).toFixed(0)} 90% 86%)`;
  /* csoportszín = a csoport középső szeletének színe, kicsit sötétebben (feliratokhoz, vonalakhoz) */
  const GROUP_COLORS = Object.fromEntries(GROUP_KEYS.map((key) => {
    const idx = CARDS.map((card, i) => (card.group === key ? i : -1)).filter((i) => i >= 0);
    return [key, `hsl(${hueOf(idx[Math.floor(idx.length / 2)] ?? 0).toFixed(0)} 68% 42%)`];
  }));
  const indexOf = (id) => CARDS.findIndex((card) => card.id === id);
  const sideLabel = (card) => {
    const big = tx(card.big);
    return big.length <= 2 ? `${big} · ${card.name.replace(/ Principle$/, '')}` : big;
  };

  const ICONS = {
    intent: 'M4 5h16v11h-9l-5 4v-4H4zM8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01',
    problem: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM9 10h.01M15 10h.01M8.5 16.5q3.5-3 7 0',
    solution: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM9 10h.01M15 10h.01M8.5 14q3.5 3.5 7 0',
    analogy: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.3 1.1 2.2h5c0-.9.4-1.6 1.1-2.2A6 6 0 0 0 12 3z',
    when: 'M13 2 4 14h7l-1 8 9-12h-7z',
    proscons: 'M3 12.5l3.5 3.5L12 9M15 9l6 6M21 9l-6 6',
    related: 'M4 8h15M15 4l4 4-4 4M20 16H5M9 12l-4 4 4 4',
    catalog: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  };
  const icon = (name, cls = 'gicon') => svg('svg', { class: cls, viewBox: '0 0 24 24', 'aria-hidden': 'true' }, svg('path', { d: ICONS[name] }));

  const scene = (id, cls) => {
    const draw = SCENES.draw[id];
    return svg('svg', {
      class: cls,
      viewBox: '0 0 400 300',
      preserveAspectRatio: 'xMidYMid slice',
      'aria-hidden': 'true',
      html: draw ? `${draw(getLang())}<rect width="400" height="300" fill="url(#ps-vig)"/>` : '',
    });
  };

  /* ---------- a kerék (csak a katalógusban), a ByteByteGo-féle infografikák mintájára ---------- */

  const R = 280; // a szeletek külső széle
  const R1 = 134; // a belső, sötétebb gyűrű külső széle
  const R0 = 86; // a fehér közép
  const STEP = 360 / N;
  const f1 = (n) => n.toFixed(1);
  const polar = (r, deg) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [r * Math.cos(a), r * Math.sin(a)];
  };
  const sectorPath = (r0, r1, a0, a1) => {
    const [x0, y0] = polar(r1, a0);
    const [x1, y1] = polar(r1, a1);
    const [x2, y2] = polar(r0, a1);
    const [x3, y3] = polar(r0, a0);
    const large = a1 - a0 > 180 ? 1 : 0;
    return `M${f1(x0)} ${f1(y0)}A${r1} ${r1} 0 ${large} 1 ${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}A${r0} ${r0} 0 ${large} 0 ${f1(x3)} ${f1(y3)}Z`;
  };

  /* csoportonként: az első és utolsó szelet, a közép szöge, és melyik oldalra kerül a magyarázó doboz */
  const GROUP_ARCS = Object.fromEntries(GROUP_KEYS.map((key, gi) => {
    const idx = CARDS.map((card, i) => (card.group === key ? i : -1)).filter((i) => i >= 0);
    const mid = ((idx[0] + idx[idx.length - 1] + 1) / 2) * STEP;
    return [key, { gi, idx, mid, side: mid <= 180 ? 'right' : 'left' }];
  }));

  /* csoport-ikonok a belső gyűrűre (saját rajz, 24×24) */
  const GROUP_ICONS = {
    core: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.3 1.1 2.2h5c0-.9.4-1.6 1.1-2.2A6 6 0 0 0 12 3z',
    debug: 'M8 10h8v5a4 4 0 0 1-8 0zM9 10a3 3 0 0 1 6 0M4 13h4M16 13h4M5 8l3 2M19 8l-3 2M5 19l3-2M19 19l-3-2',
    workflow: 'M6 4v11M6 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM18 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM18 9c0 5-7 4-12 8',
    solid: 'M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5',
    design: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM15.5 8.5l-2 5-5 2 2-5z',
    frontend: 'M3 5h18v14H3zM3 9h18M6 7h.01M9 7h.01',
    values: 'M12 20s-7.5-4.6-7.5-10.2A4.1 4.1 0 0 1 12 7.4a4.1 4.1 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z',
    laws: 'M12 3v17M7 20h10M5 7h14M7 7l-3 7a3 3 0 0 0 6 0zM17 7l-3 7a3 3 0 0 0 6 0z',
  };

  let peekEl = null;
  let linksEl = null;
  let peekIndex = -1;

  const isNarrow = () => (wheelEl ? wheelEl.getBoundingClientRect().width < 480 : false);

  function renderWheel() {
    if (!wheelEl) return;
    const narrow = isNarrow();
    const root = svg('svg', { viewBox: '-300 -300 600 600', role: 'group', 'aria-label': t('pr.wheel') });

    const focusIndex = lastVisited >= 0 ? lastVisited : 0;
    const slices = svg('g', { class: 'slices' });
    CARDS.forEach((card, i) => {
      const a0 = i * STEP;
      const mid = a0 + STEP / 2;
      const [dx, dy] = polar(12, mid);
      const label = tx(card.big);
      // sok szeletnél kisebb betű, hogy elférjen a keskeny szeletben
      const base = (narrow ? 24 : 17) * Math.min(1, 36 / N);
      const size = Math.min(label.length <= 2 ? base * 1.5 : base, 132 / (label.length * 0.56));
      slices.append(svg('a', {
        class: `slice${i === lastVisited ? ' is-active' : ''}`,
        href: `#${card.id}`,
        'data-index': String(i),
        tabindex: i === focusIndex ? '0' : '-1',
        'aria-label': `${label} – ${card.name}`,
      },
      svg('g', { class: 'slice-g', style: `--slice:${sliceColor(i)};--inner:${innerColor(i)};--dx:${f1(dx)}px;--dy:${f1(dy)}px` },
        svg('path', { class: 's-out', d: sectorPath(R1, R, a0, a0 + STEP) }),
        svg('path', { class: 's-in', d: sectorPath(R0, R1, a0, a0 + STEP) }),
        svg('text', {
          transform: `rotate(${f1(mid - 90)}) translate(${(R1 + R) / 2 + 2} 0)${mid > 180 ? ' rotate(180)' : ''}`,
          'text-anchor': 'middle',
          'dominant-baseline': 'central',
          'font-size': f1(size),
        }, label))));
    });

    // a belső gyűrűn csoportonként egy ikon
    const icons = svg('g', { class: 'ring-icons', 'aria-hidden': 'true' },
      GROUP_KEYS.map((key) => {
        const [x, y] = polar((R0 + R1) / 2, GROUP_ARCS[key].mid);
        return svg('g', { class: 'ring-icon', transform: `translate(${f1(x)} ${f1(y)})` },
          svg('circle', { r: 17 }),
          svg('path', { d: GROUP_ICONS[key] || GROUP_ICONS.core, transform: 'translate(-10.5 -10.5) scale(0.875)' }));
      }));

    // fehér közép, címmel
    const center = svg('g', { class: 'center', 'aria-hidden': 'true' },
      svg('circle', { r: R0 - 3 }),
      svg('text', { class: 'center-title', y: -12, 'text-anchor': 'middle' }, t('pr.wheelLine1')),
      svg('text', { class: 'center-title', y: 10, 'text-anchor': 'middle' }, t('pr.wheelLine2')),
      svg('text', { class: 'center-count', y: 36, 'text-anchor': 'middle' }, t('pr.wheelCount', { n: N })));

    root.append(slices, icons, center);
    wheelEl.replaceChildren(root);
  }

  /** Rámutatáskor a kerék közepén megjelenik az elv plakát-mémje. */
  function showPeek(i) {
    if (!peekEl) return;
    if (i < 0) {
      peekEl.classList.remove('is-on');
      return;
    }
    if (i !== peekIndex) {
      peekIndex = i;
      peekEl.replaceChildren(posterBox(CARDS[i], 'poster poster-mini') || '');
    }
    peekEl.classList.add('is-on');
  }

  /** Szaggatott vezetővonalak a számozott dobozoktól a csoportjuk szeleteihez (csak ha mellettük vannak). */
  function drawLinks() {
    if (!linksEl || !wheelEl) return;
    const block = linksEl.parentElement;
    const svgEl = wheelEl.querySelector('svg');
    const left = block.querySelector('.callouts-left');
    if (!svgEl || !left || left.getBoundingClientRect().right > svgEl.getBoundingClientRect().left) {
      linksEl.replaceChildren();
      return;
    }
    const b = block.getBoundingClientRect();
    const s = svgEl.getBoundingClientRect();
    const scale = s.width / 600;
    const cx = s.left + s.width / 2 - b.left;
    const cy = s.top + s.height / 2 - b.top;
    linksEl.setAttribute('viewBox', `0 0 ${f1(b.width)} ${f1(b.height)}`);
    linksEl.replaceChildren(...[...block.querySelectorAll('.callout')].flatMap((box) => {
      const arc = GROUP_ARCS[box.dataset.group];
      const color = GROUP_COLORS[box.dataset.group];
      const rect = box.getBoundingClientRect();
      const num = box.querySelector('.co-num').getBoundingClientRect();
      const isLeft = arc.side === 'left';
      const sx = (isLeft ? rect.right + 6 : rect.left - 6) - b.left;
      const sy = num.top + num.height / 2 - b.top;
      const [px, py] = polar(R + 8, arc.mid);
      const ex = cx + px * scale;
      const ey = cy + py * scale;
      const d = `M${f1(sx)} ${f1(sy)}C${f1(sx + (isLeft ? 50 : -50))} ${f1(sy)} ${f1(cx + px * scale * 1.3)} ${f1(cy + py * scale * 1.3)} ${f1(ex)} ${f1(ey)}`;
      return [svg('path', { class: 'wl-path', d, stroke: color }), svg('circle', { cx: f1(ex), cy: f1(ey), r: 4, fill: color })];
    }));
  }

  let linksTimer;
  const scheduleLinks = () => {
    clearTimeout(linksTimer);
    linksTimer = setTimeout(drawLinks, 60);
  };

  /* ---------- a katalógus teteje: cím, kerék, körülötte a számozott csoportdobozok ---------- */

  function callout(key) {
    const arc = GROUP_ARCS[key];
    return h('section', { class: 'callout', 'data-group': key, style: `--g:${GROUP_COLORS[key]};--n:${arc.gi}` },
      h('header', { class: 'co-head' },
        h('span', { class: 'co-num', 'aria-hidden': 'true' }, String(arc.gi + 1)),
        h('h3', { class: 'co-title' }, h('a', { href: `#group-${key}` }, tx(DATA.groups[key])))),
      h('ul', { class: `co-box${arc.idx.length > 6 ? ' is-long' : ''}` }, arc.idx.map((i) => h('li', {},
        h('a', { href: `#${CARDS[i].id}`, 'data-index': String(i) }, sideLabel(CARDS[i]))))));
  }

  function renderHero() {
    wheelEl = h('div', { class: 'wheel' });
    peekEl = h('div', { class: 'wheel-peek', 'aria-hidden': 'true' });
    peekIndex = -1;
    linksEl = svg('svg', { class: 'wheel-links', 'aria-hidden': 'true' });
    const side = (name) => GROUP_KEYS
      .filter((key) => GROUP_ARCS[key].side === name)
      .sort((a, b) => (name === 'right' ? GROUP_ARCS[a].mid - GROUP_ARCS[b].mid : GROUP_ARCS[b].mid - GROUP_ARCS[a].mid))
      .map(callout);
    heroEl.replaceChildren(
      h('header', { class: 'hero-head' },
        h('h2', { class: 'a-title', tabindex: '-1' }, t('pr.catalogTitle')),
        h('p', { class: 'a-lead' }, t('pr.catalogLead'))),
      h('div', { class: 'wheel-block' },
        linksEl,
        h('div', { class: 'callouts callouts-left' }, side('left')),
        h('div', { class: 'wheel-box' }, wheelEl, peekEl),
        h('div', { class: 'callouts callouts-right' }, side('right'))),
      h('p', { class: 'wheel-hint' }, t('pr.hint')));
    heroEl.hidden = false;
    renderWheel();
    requestAnimationFrame(drawLinks);
  }

  function hideHero() {
    heroEl.hidden = true;
    heroEl.replaceChildren();
    wheelEl = null;
    peekEl = null;
    linksEl = null;
  }

  /* ---------- oldalsáv ---------- */

  function renderSide() {
    sideBody.replaceChildren(
      h('p', { class: 'side-brand', 'aria-hidden': 'true' }, t('pr.title')),
      h('ul', { class: 'side-tree' },
        h('li', {}, h('a', { class: 'side-link side-top', href: '#catalog', 'aria-current': active < 0 ? 'page' : null }, icon('catalog', 'side-icon'), t('pr.catalog'))),
        GROUP_KEYS.map((key) => h('li', { class: 'side-group' },
          h('a', { class: 'side-link side-group-link', href: `#group-${key}` },
            h('span', { class: 'g-dot', style: `--g:${GROUP_COLORS[key]}`, 'aria-hidden': 'true' }), tx(DATA.groups[key])),
          h('ul', {}, CARDS.map((card, i) => (card.group === key
            ? h('li', {}, h('a', { class: 'side-link side-item', href: `#${card.id}`, 'aria-current': i === active ? 'page' : null }, sideLabel(card)))
            : null)))))));
    sideCurrent.textContent = active >= 0 ? tx(CARDS[active].big) : t('pr.catalog');
  }

  function setSideOpen(open) {
    sideEl.classList.toggle('is-open', open);
    sideToggle.setAttribute('aria-expanded', String(open));
  }

  /* ---------- katalógus ---------- */

  const tile = (card, i) => h('a', { class: 'tile', href: `#${card.id}`, style: `--a:${sliceColor(i)}` },
    h('span', { class: 'tile-art' }, scene(card.id, 'tile-pic')),
    h('span', { class: 'tile-big' }, tx(card.big)),
    h('span', { class: 'tile-name', lang: 'en' }, card.name));

  function renderCatalog() {
    renderHero();
    mainEl.replaceChildren(h('div', { class: 'cat-groups' }, GROUP_KEYS.map((key) => {
      const items = CARDS.map((card, i) => [card, i]).filter(([card]) => card.group === key);
      return h('section', { class: 'cat-group', id: `group-${key}`, style: `--g:${GROUP_COLORS[key]}` },
        h('h3', { class: 'cat-group-title' }, h('span', { class: 'g-dot', 'aria-hidden': 'true' }), tx(DATA.groups[key]),
          h('span', { class: 'cat-group-count' }, String(items.length))),
        DATA.groupInfo?.[key] ? h('p', { class: 'cat-group-desc' }, tx(DATA.groupInfo[key])) : null,
        h('ul', { class: 'tiles' }, items.map(([card, i]) => h('li', {}, tile(card, i)))));
    })));
  }

  /* ---------- egy elv oldala ---------- */

  const smallFace = (mood) => svg('svg', { class: `face face-${mood}`, viewBox: '0 0 48 48', 'aria-hidden': 'true' },
    svg('circle', { cx: 24, cy: 24, r: 20 }),
    mood === 'nope'
      ? [svg('path', { d: 'M13 17l7 3.5-7 3.5M35 17l-7 3.5 7 3.5' }), svg('path', { d: 'M15 35q9-8 18 0' }), svg('path', { d: 'M11 12l7 2M37 12l-7 2' })]
      : [svg('path', { d: 'M13 21q3.5-6 7 0M28 21q3.5-6 7 0' }), svg('path', { d: 'M14 28q10 12 20 0z', class: 'mouth' })]);

  function posterBox(card, cls = 'poster') {
    const data = POSTERS[card.id];
    if (!data) return null;
    const title = tx(data.title) || tx(card.big);
    const caption = tx(data.caption);
    return h('div', { class: cls, role: 'img', 'aria-label': t('pr.posterAlt', { title, caption }) },
      h('div', { class: 'poster-frame' }, scene(card.id, 'poster-pic')),
      h('p', { class: `poster-title${title.length > 11 ? ' is-long' : ''}`, 'aria-hidden': 'true' }, title),
      h('p', { class: 'poster-cap', 'aria-hidden': 'true' }, caption));
  }

  const poster = (card) => {
    const box = posterBox(card);
    return box ? h('figure', { class: 'poster-fig' }, box) : null;
  };

  const section = (name, title, ...children) => h('section', { class: `a-sec a-${name}` },
    h('h3', { class: 'a-h' }, h('span', { class: 'a-icon' }, icon(name)), title), children);

  const list = (items, cls) => (items?.length ? h('ul', { class: cls }, items.map((item) => h('li', {}, tx(item)))) : null);

  const pagerLink = (card, dir) => h('a', { class: `pn-link pn-${dir < 0 ? 'prev' : 'next'}`, href: `#${card.id}` },
    h('small', {}, dir < 0 ? t('pr.prev') : t('pr.next')), h('strong', {}, tx(card.big)));

  function renderArticle(i) {
    const card = CARDS[i];
    const more = GUIDE[card.id] || {};
    const lang = card.lang || 'js';
    const big = tx(card.big);
    const related = (more.related || []).map(([id, text]) => [indexOf(id), text]).filter(([j]) => j >= 0);

    mainEl.replaceChildren(h('article', { class: 'art', style: `--c:${lightColor(i)};--a:${sliceColor(i)}` },
      h('nav', { class: 'crumbs', 'aria-label': t('pr.crumbs') },
        h('a', { href: '#catalog' }, t('pr.title')), h('span', { 'aria-hidden': 'true' }, ' / '),
        h('a', { href: `#group-${card.group}` }, tx(DATA.groups[card.group])), h('span', { 'aria-hidden': 'true' }, ' / '),
        h('span', { 'aria-current': 'page' }, big)),
      h('h2', { class: 'a-title', tabindex: '-1' }, h('span', { class: 'hl' }, big)),
      card.name !== big ? h('p', { class: 'aka' }, h('strong', {}, t('pr.aka')), ' ', h('span', { lang: 'en' }, card.name)) : null,

      section('intent', t('pr.intent'), h('p', { class: 'intent' }, tx(card.summary)), poster(card)),
      section('problem', t('pr.problem'),
        more.problem ? h('p', {}, tx(more.problem)) : null,
        h('div', { class: 'prow prow-bad' }, smallFace('nope'), codeBlock(card.bad, { lang, label: `✗ ${t('pr.bad')}` }))),
      section('solution', t('pr.solution'),
        h('p', {}, tx(card.why)),
        h('div', { class: 'prow prow-good' }, smallFace('yep'), codeBlock(card.good, { lang, label: `✓ ${t('pr.good')}` }))),
      more.analogy ? section('analogy', t('pr.analogy'), h('p', { class: 'analogy' }, tx(more.analogy))) : null,
      section('when', t('pr.when'), list(more.when, 'when'), h('p', { class: 'watch' }, h('strong', {}, t('pr.watch')), ' ', tx(card.watch))),
      more.pros || more.cons
        ? section('proscons', t('pr.proscons'), h('div', { class: 'pc' },
          h('div', { class: 'pc-col pros' }, h('h4', {}, t('pr.pros')), list(more.pros, 'pc-list')),
          h('div', { class: 'pc-col cons' }, h('h4', {}, t('pr.cons')), list(more.cons, 'pc-list'))))
        : null,
      related.length
        ? section('related', t('pr.related'), h('ul', { class: 'rel' }, related.map(([j, text]) => h('li', {},
          h('a', { class: 'rel-link', href: `#${CARDS[j].id}` }, sideLabel(CARDS[j])), ': ', tx(text)))))
        : null,
      h('nav', { class: 'pn', 'aria-label': t('pr.pager') }, pagerLink(CARDS[(i - 1 + N) % N], -1), pagerLink(CARDS[(i + 1) % N], 1))));
    hideHero();
  }

  /* ---------- útvonal: a cím #része dönti el, mit mutatunk ---------- */

  function route({ navigated = false, force = false } = {}) {
    const hash = decodeURIComponent(location.hash.slice(1));
    const i = indexOf(hash);
    const next = i >= 0 ? `p:${i}` : 'catalog';
    active = i;
    if (i >= 0) lastVisited = i;

    if (force || next !== view) {
      view = next;
      if (i >= 0) renderArticle(i);
      else renderCatalog();
      mainEl.classList.remove('swap');
      void mainEl.offsetWidth; // újraindítja a beúszást
      mainEl.classList.add('swap');
    }
    document.title = i >= 0 ? `${tx(CARDS[i].big)} · ${t('pr.docTitle')}` : t('pr.docTitle');
    renderSide();
    setSideOpen(false);

    if (hash.startsWith('group-')) {
      document.getElementById(hash)?.scrollIntoView({ block: 'start' });
    } else if (navigated) {
      const top = i >= 0 ? layoutEl : heroEl;
      if (top.getBoundingClientRect().top < 0) top.scrollIntoView({ block: 'start' });
      top.querySelector('.a-title')?.focus({ preventScroll: true });
    }
  }

  /* ---------- események ---------- */

  window.addEventListener('hashchange', () => route({ navigated: true }));

  // ugyanarra a linkre kattintva nincs hashchange: ilyenkor is görgessünk és csukjuk a menüt
  layoutEl.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    if (link.getAttribute('href') === location.hash || (link.getAttribute('href') === '#catalog' && !location.hash)) {
      event.preventDefault();
      route({ navigated: true });
    }
  });

  sideToggle.addEventListener('click', () => setSideOpen(!sideEl.classList.contains('is-open')));

  heroEl.addEventListener('keydown', (event) => {
    const slice = event.target.closest('.slice');
    if (!slice) return;
    const i = Number(slice.dataset.index);
    let next = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (i + 1) % N;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (i - 1 + N) % N;
    else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      location.hash = CARDS[i].id;
      return;
    }
    if (next === null) return;
    event.preventDefault();
    const target = wheelEl?.querySelector(`.slice[data-index="${next}"]`);
    if (!target) return;
    wheelEl.querySelectorAll('.slice').forEach((el) => el.setAttribute('tabindex', '-1'));
    target.setAttribute('tabindex', '0');
    target.focus();
  });

  // szelet vagy a dobozok egy eleme fölött: a mém a kerék közepén
  const peekTarget = (node) => node?.closest?.('[data-index]');
  heroEl.addEventListener('mouseover', (event) => {
    const target = peekTarget(event.target);
    if (target) showPeek(Number(target.dataset.index));
  });
  heroEl.addEventListener('mouseout', (event) => {
    if (!peekTarget(event.target) || peekTarget(event.relatedTarget)) return;
    const focused = peekTarget(document.activeElement);
    showPeek(focused && heroEl.contains(focused) ? Number(focused.dataset.index) : -1);
  });
  heroEl.addEventListener('focusin', (event) => {
    const target = peekTarget(event.target);
    showPeek(target ? Number(target.dataset.index) : -1);
  });
  heroEl.addEventListener('focusout', (event) => {
    if (!peekTarget(event.relatedTarget)) showPeek(-1);
  });

  let lastNarrow = null;
  window.addEventListener('resize', () => {
    const narrow = isNarrow();
    if (wheelEl && narrow !== lastNarrow) {
      lastNarrow = narrow;
      renderWheel();
    }
    scheduleLinks();
  });
  document.fonts?.ready.then(scheduleLinks);

  document.addEventListener('rika:lang', () => route({ force: true }));

  route();
  lastNarrow = isNarrow();
})();
