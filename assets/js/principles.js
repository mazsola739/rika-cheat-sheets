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

  const { h, svg, t, tx, addStrings, codeBlock, getLang } = window.Rika;
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
      'pr.lead': 'KISS, YAGNI, DRY, SOLID és társaik.',
      'pr.menu': 'Elvek menü',
      'pr.catalog': 'Katalógus',
      'pr.catalogTitle': 'Az elvek katalógusa',
      'pr.groups': 'Csoportok',
      'pr.dialHint': 'Forgasd a kereket az ujjaddal vagy a nyilakkal. A jelölő alatti elvet a kártyán nyitod meg, vagy koppints még egyszer a szeletére.',
      'pr.dialPrev': 'Előző elv',
      'pr.dialNext': 'Következő elv',
      'pr.open': 'Megnyitom',
      'pr.hint': 'Mutass egy szeletre vagy egy névre: kigyullad a nyilával és a listájával együtt. Kattints a megnyitáshoz. Billentyűzettel: ← → lépked, Enter megnyitja.',
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
      'pr.lead': 'KISS, YAGNI, DRY, SOLID and friends.',
      'pr.menu': 'Principles menu',
      'pr.catalog': 'Catalog',
      'pr.catalogTitle': 'The catalog of principles',
      'pr.groups': 'Groups',
      'pr.dialHint': 'Turn the wheel with your finger or the arrows. Open the principle under the marker from the card, or tap its slice again.',
      'pr.dialPrev': 'Previous principle',
      'pr.dialNext': 'Next principle',
      'pr.open': 'Open it',
      'pr.hint': 'Point at a slice or a name: it lights up together with its arrow and list. Click to open it. Keyboard: ← → to step, Enter to open.',
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


  // a plakátképek közös színátmenetei, egyszer a dokumentumban
  document.body.append(svg('svg', {
    class: 'ps-defs', width: '0', height: '0', 'aria-hidden': 'true', focusable: 'false', html: `<defs>${SCENES.defs}</defs>`,
  }));

  /* ---------- színek, segédek ---------- */

  /* minden csoport egy szín (8 színfolt a keréken), a csoporton belül a szeletek világosabb/sötétebb váltakozva */
  const GROUP_HUE = Object.fromEntries(GROUP_KEYS.map((key, gi) => [key, (28 + gi * (330 / GROUP_KEYS.length)) % 360]));
  const hueOf = (i) => GROUP_HUE[CARDS[i].group];
  const sliceColor = (i) => `hsl(${hueOf(i).toFixed(0)} 72% ${i % 2 ? 50 : 58}%)`;
  const innerColor = (i) => `hsl(${hueOf(i).toFixed(0)} 58% ${i % 2 ? 34 : 40}%)`;
  const lightColor = (i) => `hsl(${hueOf(i).toFixed(0)} 90% ${i % 2 ? 83 : 88}%)`;
  /* csoportszín: kicsit sötétebben (feliratokhoz, vonalakhoz) */
  const GROUP_COLORS = Object.fromEntries(GROUP_KEYS.map((key) => [key, `hsl(${GROUP_HUE[key].toFixed(0)} 68% 42%)`]));
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

  let linksEl = null;

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

    // a belső gyűrűn a csoport sorszáma, ugyanaz, mint a mellette lévő számozott dobozon
    const icons = svg('g', { class: 'ring-icons', 'aria-hidden': 'true' },
      GROUP_KEYS.map((key) => {
        const [x, y] = polar((R0 + R1) / 2, GROUP_ARCS[key].mid);
        return svg('g', { class: 'ring-icon', 'data-group': key, transform: `translate(${f1(x)} ${f1(y)})`, style: `--g:${GROUP_COLORS[key]}` },
          svg('circle', { r: 16 }),
          svg('text', { class: 'ring-num', 'text-anchor': 'middle', 'dominant-baseline': 'central', y: 1 }, String(GROUP_ARCS[key].gi + 1)));
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

  /*
   * Kiemelés rámutatáskor (szeleten vagy a dobozban egy néven): az elv szelete élesebb lesz,
   * a többi halványul, a csoportja nyila kigyullad és a szelet felé "folyik", a dobozban pedig
   * kiemelődik a neve. Így látszik, hová ugrik a kattintás.
   */
  function setFocus(i) {
    if (!heroEl || heroEl.hidden) return;
    heroEl.querySelectorAll('.is-focus').forEach((el) => el.classList.remove('is-focus'));
    const card = i >= 0 ? CARDS[i] : null;
    heroEl.classList.toggle('has-focus', Boolean(card));
    if (!card) return;
    heroEl.querySelectorAll(`[data-index="${i}"], [data-group="${card.group}"]`).forEach((el) => el.classList.add('is-focus'));
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
      const [px, py] = polar(R + 16, arc.mid);
      const ex = cx + px * scale;
      const ey = cy + py * scale;
      const c2x = cx + px * scale * 1.3;
      const c2y = cy + py * scale * 1.3;
      const d = `M${f1(sx)} ${f1(sy)}C${f1(sx + (isLeft ? 50 : -50))} ${f1(sy)} ${f1(c2x)} ${f1(c2y)} ${f1(ex)} ${f1(ey)}`;
      // nyílhegy a vonal végén, a kerék felé fordítva
      const len = Math.hypot(ex - c2x, ey - c2y) || 1;
      const ux = (ex - c2x) / len;
      const uy = (ey - c2y) / len;
      const tipX = ex + ux * 8;
      const tipY = ey + uy * 8;
      const arrow = `M${f1(tipX)} ${f1(tipY)}L${f1(ex - uy * 6)} ${f1(ey + ux * 6)}L${f1(ex + uy * 6)} ${f1(ey - ux * 6)}Z`;
      const group = box.dataset.group;
      return [
        svg('path', { class: 'wl-path', 'data-group': group, d, stroke: color }),
        svg('path', { class: 'wl-arrow', 'data-group': group, d: arrow, fill: color }),
      ];
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

  /* ---------- telefonon: forgatható félkerék ----------
   * A kerék nagy, és csak a teteje lóg be alulról, mint egy tárcsa. Ujjal oldalra húzva forog,
   * elengedve a legközelebbi szeletre ugrik. Ami a jelölő alatt van, annak a kártyája látszik fölötte.
   * Körbeér: az utolsó elv után újra az első jön.
   */

  const phoneQuery = window.matchMedia('(max-width: 760px)');
  const D = { W: 400, H: 232, cy: 436, rIn: 258, rOut: 392, rBand: 226, step: 9.5 };
  let dialPos = 0; // hányadik elv van a jelölő alatt (törtszám forgatás közben)
  let dialAnim = 0;
  let dialEls = null;

  const mod = (n, m) => ((n % m) + m) % m;
  const dialPolar = (r, deg) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [D.W / 2 + r * Math.cos(a), D.cy + r * Math.sin(a)];
  };
  const dialSector = (r0, r1, a0, a1) => {
    const [x0, y0] = dialPolar(r1, a0);
    const [x1, y1] = dialPolar(r1, a1);
    const [x2, y2] = dialPolar(r0, a1);
    const [x3, y3] = dialPolar(r0, a0);
    return `M${f1(x0)} ${f1(y0)}A${r1} ${r1} 0 0 1 ${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}A${r0} ${r0} 0 0 0 ${f1(x3)} ${f1(y3)}Z`;
  };

  function drawDial() {
    if (!dialEls) return;
    const base = Math.round(dialPos);
    const sel = mod(base, N);
    const parts = [];
    for (let k = -7; k <= 7; k++) {
      const i = mod(base + k, N);
      const card = CARDS[i];
      const a0 = (base + k - dialPos - 0.5) * D.step;
      const a1 = a0 + D.step;
      const mid = (a0 + a1) / 2;
      const isSel = i === sel;
      const label = tx(card.big);
      const size = Math.min(label.length <= 2 ? 24 : 17, 118 / (label.length * 0.56));
      const [lx, ly] = dialPolar((D.rIn + D.rOut) / 2, mid);
      const first = i === 0 || CARDS[i - 1].group !== card.group;
      const [bx, by] = dialPolar((D.rBand + D.rIn) / 2, mid);
      parts.push(svg('g', { class: `dial-slice${isSel ? ' is-sel' : ''}`, 'data-index': String(i) },
        svg('path', { class: 'ds-band', d: dialSector(D.rBand, D.rIn - 3, a0, a1), fill: GROUP_COLORS[card.group] }),
        svg('path', { class: 'ds-out', d: dialSector(D.rIn, D.rOut, a0 + 0.15, a1 - 0.15), fill: isSel ? sliceColor(i) : lightColor(i) }),
        svg('text', {
          class: 'ds-label',
          transform: `translate(${f1(lx)} ${f1(ly)}) rotate(${f1(mid - 90)})`,
          'text-anchor': 'middle',
          'dominant-baseline': 'central',
          'font-size': f1(size),
        }, label),
        first ? svg('text', { class: 'ds-num', x: f1(bx), y: f1(by), 'text-anchor': 'middle', 'dominant-baseline': 'central' }, String(GROUP_ARCS[card.group].gi + 1)) : null));
    }
    dialEls.slices.replaceChildren(...parts);
    if (dialEls.shown !== sel) {
      dialEls.shown = sel;
      fillDialCard(sel);
    }
  }

  function fillDialCard(i) {
    const card = CARDS[i];
    const arc = GROUP_ARCS[card.group];
    dialEls.card.style.setProperty('--g', GROUP_COLORS[card.group]);
    dialEls.card.replaceChildren(
      h('div', { class: 'dc-pic' }, scene(card.id, 'dc-scene')),
      h('div', { class: 'dc-text' },
        h('p', { class: 'dc-group' },
          h('span', { class: 'co-num', 'aria-hidden': 'true' }, String(arc.gi + 1)),
          `${tx(DATA.groups[card.group])} · ${arc.idx.indexOf(i) + 1}/${arc.idx.length}`),
        h('h3', { class: 'dc-title' }, tx(card.big)),
        tx(card.big) !== card.name ? h('p', { class: 'dc-name' }, card.name) : null,
        h('a', { class: 'btn btn-primary dc-open', href: `#${card.id}` }, `${t('pr.open')} →`)));
  }

  function spinTo(target) {
    cancelAnimationFrame(dialAnim);
    const from = dialPos;
    const dist = target - from;
    const done = () => { lastVisited = mod(Math.round(dialPos), N); };
    if (Math.abs(dist) < 0.001) { dialPos = target; drawDial(); done(); return; }
    const start = performance.now();
    const dur = Math.min(520, 180 + Math.abs(dist) * 70);
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      dialPos = from + dist * (1 - (1 - p) ** 3);
      drawDial();
      if (p < 1) dialAnim = requestAnimationFrame(tick);
      else done();
    };
    dialAnim = requestAnimationFrame(tick);
  }

  function renderDial() {
    dialPos = lastVisited >= 0 ? lastVisited : 0;
    const slices = svg('g', { class: 'dial-slices' });
    const wheel = svg('svg', {
      class: 'dial-svg',
      viewBox: `0 0 ${D.W} ${D.H}`,
      tabindex: '0',
      role: 'group',
      'aria-label': `${t('pr.wheel')}. ${t('pr.dialHint')}`,
    },
    slices,
    svg('path', { class: 'dial-marker', d: `M${D.W / 2 - 12} 22h24l-12 16z` }));
    const card = h('div', { class: 'dial-card', 'aria-live': 'polite' });
    const arrow = (dir) => h('button', {
      type: 'button',
      class: `dial-arrow dial-${dir < 0 ? 'prev' : 'next'}`,
      'aria-label': t(dir < 0 ? 'pr.dialPrev' : 'pr.dialNext'),
      onclick: () => spinTo(Math.round(dialPos) + dir),
    }, dir < 0 ? '‹' : '›');
    dialEls = { slices, card, shown: -1 };

    // húzás: vízszintesen forgat, függőlegesen hagyja görgetni az oldalt
    let drag = null;
    wheel.addEventListener('pointerdown', (event) => {
      cancelAnimationFrame(dialAnim);
      const pxPerStep = (wheel.getBoundingClientRect().width / D.W) * ((D.rIn + D.rOut) / 2) * ((D.step * Math.PI) / 180);
      drag = { x: event.clientX, pos: dialPos, pxPerStep, moved: false, id: event.pointerId };
    });
    wheel.addEventListener('pointermove', (event) => {
      if (!drag || event.pointerId !== drag.id) return;
      const dx = event.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) < 6) return;
      if (!drag.moved) {
        drag.moved = true;
        wheel.setPointerCapture(event.pointerId);
      }
      dialPos = drag.pos - dx / drag.pxPerStep;
      drawDial();
    });
    wheel.addEventListener('pointerup', (event) => {
      if (!drag || event.pointerId !== drag.id) return;
      const wasDrag = drag.moved;
      drag = null;
      if (wasDrag) {
        spinTo(Math.round(dialPos));
        return;
      }
      // koppintás: a szeletre forgat, a már kiválasztottat megnyitja
      const slice = event.target.closest?.('.dial-slice');
      if (!slice) {
        spinTo(Math.round(dialPos));
        return;
      }
      const i = Number(slice.dataset.index);
      const sel = mod(Math.round(dialPos), N);
      if (i === sel) {
        location.hash = CARDS[i].id;
        return;
      }
      let diff = mod(i - sel, N);
      if (diff > N / 2) diff -= N;
      spinTo(Math.round(dialPos) + diff);
    });
    wheel.addEventListener('pointercancel', () => {
      drag = null;
      spinTo(Math.round(dialPos));
    });
    wheel.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') spinTo(Math.round(dialPos) + 1);
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') spinTo(Math.round(dialPos) - 1);
      else if (event.key === 'Enter' || event.key === ' ') location.hash = CARDS[mod(Math.round(dialPos), N)].id;
      else return;
      event.preventDefault();
    });

    heroEl.replaceChildren(
      h('header', { class: 'hero-head' }, h('h2', { class: 'a-title', tabindex: '-1' }, t('pr.catalogTitle'))),
      h('div', { class: 'dial' }, card, h('div', { class: 'dial-wheel' }, arrow(-1), wheel, arrow(1))),
      h('p', { class: 'wheel-hint' }, t('pr.dialHint')));
    heroEl.hidden = false;
    drawDial();
  }

  function renderHero() {
    dialEls = null;
    if (phoneQuery.matches) {
      wheelEl = null;
      linksEl = null;
      renderDial();
      return;
    }
    wheelEl = h('div', { class: 'wheel' });
    linksEl = svg('svg', { class: 'wheel-links', 'aria-hidden': 'true' });
    const side = (name) => GROUP_KEYS
      .filter((key) => GROUP_ARCS[key].side === name)
      .sort((a, b) => (name === 'right' ? GROUP_ARCS[a].mid - GROUP_ARCS[b].mid : GROUP_ARCS[b].mid - GROUP_ARCS[a].mid))
      .map(callout);
    heroEl.replaceChildren(
      h('header', { class: 'hero-head' },
        h('h2', { class: 'a-title', tabindex: '-1' }, t('pr.catalogTitle'))),
      h('div', { class: 'wheel-block' },
        linksEl,
        h('div', { class: 'callouts callouts-left' }, side('left')),
        h('div', { class: 'wheel-box' }, wheelEl),
        h('div', { class: 'callouts callouts-right' }, side('right'))),
      h('p', { class: 'wheel-hint' }, t('pr.hint')));
    heroEl.hidden = false;
    renderWheel();
    requestAnimationFrame(drawLinks);
  }

  function hideHero() {
    cancelAnimationFrame(dialAnim);
    dialEls = null;
    heroEl.hidden = true;
    heroEl.replaceChildren();
    wheelEl = null;
    linksEl = null;
  }

  /* ---------- oldalsáv ---------- */

  function renderSide() {
    sideBody.replaceChildren(
      h('p', { class: 'side-brand', 'aria-hidden': 'true' }, h('span', { class: 'hl' }, t('pr.title'))),
      h('ul', { class: 'side-tree' },
        h('li', {}, h('a', { class: 'side-link side-top', href: '#catalog', 'aria-current': active < 0 ? 'page' : null }, icon('catalog', 'side-icon'), t('pr.catalog'))),
        GROUP_KEYS.map((key) => h('li', { class: 'side-group', 'data-group': key, style: `--g:${GROUP_COLORS[key]}` },
          h('a', { class: 'side-link side-group-link', href: `#group-${key}` },
            h('span', { class: 'side-num', 'aria-hidden': 'true' }, String(GROUP_KEYS.indexOf(key) + 1)), tx(DATA.groups[key])),
          h('ul', {}, CARDS.map((card, i) => (card.group === key
            ? h('li', {}, h('a', { class: 'side-link side-item', href: `#${card.id}`, 'aria-current': i === active ? 'page' : null }, sideLabel(card)))
            : null)))))));
    sideCurrent.textContent = active >= 0 ? tx(CARDS[active].big) : t('pr.catalog');
  }

  function setSideOpen(open) {
    sideEl.classList.toggle('is-open', open);
    sideToggle.setAttribute('aria-expanded', String(open));
  }

  /** Az oldalsáv a saját görgetésén belül odagördül egy elemhez (az oldal nem mozdul). */
  function scrollSideTo(el) {
    if (!el || sideEl.scrollHeight <= sideEl.clientHeight + 4) return;
    const sideBox = sideEl.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    if (box.top >= sideBox.top + 40 && box.bottom <= sideBox.bottom - 40) return; // már látszik
    sideEl.scrollTo({ top: sideEl.scrollTop + box.top - sideBox.top - 48, behavior: 'smooth' });
  }

  /*
   * Görgetéskövetés a katalógusban: amelyik csoportnál jársz, az emelődik ki az oldalsávban,
   * és az oldalsáv is odagördül. Elv-oldalon az aktuális elvhez gördül.
   */
  let spyGroup;
  function markSideGroup(key) {
    if (key === spyGroup) return;
    spyGroup = key;
    sideBody.querySelectorAll('.side-group.is-current').forEach((el) => el.classList.remove('is-current'));
    const groupEl = key ? sideBody.querySelector(`.side-group[data-group="${key}"]`) : null;
    if (groupEl) groupEl.classList.add('is-current');
    sideCurrent.textContent = key ? tx(DATA.groups[key]) : t('pr.catalog');
    scrollSideTo(groupEl || sideBody.querySelector('.side-top'));
  }

  function spyScroll() {
    if (view !== 'catalog') return;
    const line = window.innerHeight * 0.35;
    const sections = [...mainEl.querySelectorAll('.cat-group')];
    let current = null;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= line) current = section.id.replace(/^group-/, '');
    }
    // a lap alján az utolsó csoport nem ér fel a vonalig, de akkor már az az aktuális
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    const last = sections[sections.length - 1];
    if (atBottom && last && last.getBoundingClientRect().top < window.innerHeight) current = last.id.replace(/^group-/, '');
    markSideGroup(current);
  }

  let spyFrame = 0;
  window.addEventListener('scroll', () => {
    if (spyFrame) return;
    spyFrame = requestAnimationFrame(() => {
      spyFrame = 0;
      spyScroll();
    });
  }, { passive: true });

  /* ---------- katalógus ---------- */

  // a polaroidok enyhén ferdén állnak, mint egy scrapbookban; kettő egymás mellett sosem egyforma
  const TILTS = [-1.6, 1.2, -0.7, 1.5, -1.2, 0.6, -0.4, 1.0];
  const tile = (card, i) => h('a', { class: 'tile', href: `#${card.id}`, style: `--a:${sliceColor(i)};--tilt:${TILTS[i % TILTS.length]}deg` },
    h('span', { class: 'tile-art' }, scene(card.id, 'tile-pic')),
    h('span', { class: 'tile-big' }, tx(card.big)),
    h('span', { class: 'tile-name', lang: 'en' }, card.name));

  function renderCatalog() {
    renderHero();
    mainEl.replaceChildren(h('div', { class: 'cat-groups' }, GROUP_KEYS.map((key) => {
      const items = CARDS.map((card, i) => [card, i]).filter(([card]) => card.group === key);
      return h('section', { class: 'cat-group', id: `group-${key}`, style: `--g:${GROUP_COLORS[key]}` },
        h('h3', { class: 'cat-group-title' }, h('span', { class: 'co-num', 'aria-hidden': 'true' }, String(GROUP_ARCS[key].gi + 1)), tx(DATA.groups[key]),
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
    spyGroup = undefined;

    if (hash.startsWith('group-')) {
      document.getElementById(hash)?.scrollIntoView({ block: 'start' });
    } else if (navigated) {
      const top = i >= 0 ? layoutEl : heroEl;
      if (top.getBoundingClientRect().top < 0) top.scrollIntoView({ block: 'start' });
      top.querySelector('.a-title')?.focus({ preventScroll: true });
    }
    // az oldalsáv kövesse: katalógusban a csoportot, elv-oldalon magát az elvet
    if (i >= 0) scrollSideTo(sideBody.querySelector('.side-item[aria-current="page"]'));
    else requestAnimationFrame(spyScroll);
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

  // szelet vagy a dobozok egy neve fölött: kiemelés a szeleten, a nyílon és a listában
  const focusTarget = (node) => node?.closest?.('[data-index]');
  heroEl.addEventListener('mouseover', (event) => {
    const target = focusTarget(event.target);
    if (target) setFocus(Number(target.dataset.index));
  });
  heroEl.addEventListener('mouseout', (event) => {
    if (!focusTarget(event.target) || focusTarget(event.relatedTarget)) return;
    const focused = focusTarget(document.activeElement);
    setFocus(focused && heroEl.contains(focused) ? Number(focused.dataset.index) : -1);
  });
  heroEl.addEventListener('focusin', (event) => {
    const target = focusTarget(event.target);
    setFocus(target ? Number(target.dataset.index) : -1);
  });
  heroEl.addEventListener('focusout', (event) => {
    if (!focusTarget(event.relatedTarget)) setFocus(-1);
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
  // telefon és asztali nézet között váltva a katalógus teteje (kerék / tárcsa) újrarajzolódik
  phoneQuery.addEventListener('change', () => { if (!heroEl.hidden) renderHero(); });

  route();
  lastNarrow = isNarrow();
})();
