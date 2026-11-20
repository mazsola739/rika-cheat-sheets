/*
 * Frontend roadmap: pipálás, mentés a böngészőbe, letöltés (.png / .md / .json), visszatöltés.
 * A tartalom a roadmap-data.js-ben van, magyarul és angolul.
 */
(() => {
  'use strict';

  const { h, svg, store, t, tx, addStrings, getLang, toast, downloadBlob, isoDate, humanDate, hashString, splatterDots, mountArt, RAINBOW } = window.Rika;
  const DATA = window.ROADMAP;
  const STORE_KEY = `rika-cheat-sheets:roadmap:${DATA.id}:v1`;
  const LEVELS = new Set(['must', 'good', 'extra']);

  addStrings({
    hu: {
      'rm.docTitle': 'Roadmap: frontend → fullstack · Rika cheat sheets',
      'rm.desc': 'Pipálható roadmap az én utam szerint: HTML, CSS, JavaScript, TypeScript, React, kitérők, aztán Node.js és Express a fullstackig.',
      'rm.kicker': 'Frontendtől fullstackig · az én utam',
      'rm.lead': 'HTML, CSS, JavaScript, TypeScript, React – néha kitérővel –, aztán Node.js és Express. Pipáld ki, amit már tudsz: minél többet tudsz, annál színesebb.',
      'rm.legend': 'Jelmagyarázat',
      'rm.level.must': 'Muszáj tudni',
      'rm.level.good': 'Jó tudni',
      'rm.level.extra': 'Extra / lehetőség',
      'rm.progress': 'Haladás',
      'rm.progressAria': 'Összes haladás',
      'rm.actions': 'Mentés & letöltés',
      'rm.hint': 'A pipáid ebben a böngészőben maguktól megmaradnak. Ha másik gépen is kellenek, mentsd el .json-be, és ott töltsd vissza.',
      'rm.png': 'Kép letöltése (.png)',
      'rm.md': 'Checklist (.md)',
      'rm.json': 'Mentés (.json)',
      'rm.import': 'Betöltés (.json)',
      'rm.reset': 'Nullázás',
      'rm.stage': '{n}. szakasz',
      'rm.done': 'KÉSZ!',
      'rm.end': 'Soha nem ér véget… :)',
      'rm.mine': 'Saját haladásom',
      'rm.doneOf': '{n} / {all} kész',
      'rm.mdTitle': '{title} – saját haladás',
      'rm.saved': 'mentes',
      'rm.toastPng': 'Kép letöltve ✓',
      'rm.toastPngFail': 'Nem sikerült elkészíteni a képet.',
      'rm.toastMd': 'Checklist letöltve ✓',
      'rm.toastJson': 'Mentés letöltve ✓',
      'rm.badFile': 'Ez nem egy roadmap-mentés (.json).',
      'rm.confirmImport': 'A betöltés lecseréli a mostani {n} pipádat. Mehet?',
      'rm.loaded': 'Betöltve: {n} pipa',
      'rm.nothing': 'Még nincs mit nullázni.',
      'rm.confirmReset': 'Biztosan törlöd az összes pipát? Ezt nem lehet visszavonni (csak ha van .json mentésed).',
      'rm.cleared': 'Minden pipa törölve.',
    },
    en: {
      'rm.docTitle': 'Roadmap: frontend → fullstack · Rika cheat sheets',
      'rm.desc': 'A roadmap you can tick off, along my own path: HTML, CSS, JavaScript, TypeScript, React, a few detours, then Node.js and Express to fullstack.',
      'rm.kicker': 'From frontend to fullstack · my path',
      'rm.lead': 'HTML, CSS, JavaScript, TypeScript, React – with a few detours – then Node.js and Express. Tick off what you already know: the more you know, the more colorful it gets.',
      'rm.legend': 'Legend',
      'rm.level.must': 'Must know',
      'rm.level.good': 'Good to know',
      'rm.level.extra': 'Optional extra',
      'rm.progress': 'Progress',
      'rm.progressAria': 'Overall progress',
      'rm.actions': 'Save & download',
      'rm.hint': 'Your ticks stay in this browser automatically. To use them on another device, save a .json backup and load it there.',
      'rm.png': 'Download image (.png)',
      'rm.md': 'Checklist (.md)',
      'rm.json': 'Backup (.json)',
      'rm.import': 'Load (.json)',
      'rm.reset': 'Reset',
      'rm.stage': 'Stage {n}',
      'rm.done': 'DONE!',
      'rm.end': 'Keep learning :)',
      'rm.mine': 'My progress',
      'rm.doneOf': '{n} / {all} done',
      'rm.mdTitle': '{title} – my progress',
      'rm.saved': 'backup',
      'rm.toastPng': 'Image downloaded ✓',
      'rm.toastPngFail': 'Could not create the image.',
      'rm.toastMd': 'Checklist downloaded ✓',
      'rm.toastJson': 'Backup downloaded ✓',
      'rm.badFile': 'That is not a roadmap backup (.json).',
      'rm.confirmImport': 'Loading replaces your current {n} ticks. Continue?',
      'rm.loaded': 'Loaded: {n} ticks',
      'rm.nothing': 'Nothing to reset yet.',
      'rm.confirmReset': 'Delete all ticks? This cannot be undone (unless you have a .json backup).',
      'rm.cleared': 'All ticks cleared.',
    },
  });

  const INK = '#2b2a28';
  const INK_SOFT = '#5c5850';
  const INK_FAINT = '#8a8579';
  const PAPER = '#fbf8f1';
  const CARD = '#fffdf8';
  const GRAY_HL = '#e6e2d8';
  const TITLE_COLORS = ['#e03131', '#f76707', '#f59f00', '#2f9e44', '#0c8599', '#1c7ed6', '#7048e8', '#d6336c'];

  /* ---------- adat ---------- */

  function parseItem(topicId, [key, hu, ...rest]) {
    const level = LEVELS.has(rest[rest.length - 1]) ? rest.pop() : 'must';
    const en = rest[0] ?? hu;
    return { id: `${topicId}.${key}`, label: { hu, en }, level };
  }

  let topicNumber = 0;
  const stages = DATA.stages.map((stage) => ({
    ...stage,
    topics: stage.topics.map((topic) => ({
      ...topic,
      number: ++topicNumber,
      items: topic.items.map((item) => parseItem(topic.id, item)),
    })),
  }));
  const allItems = stages.flatMap((stage) => stage.topics.flatMap((topic) => topic.items));
  const validIds = new Set(allItems.map((item) => item.id));
  if (validIds.size !== allItems.length) console.warn('[roadmap] Duplikált azonosító van a roadmap-data.js-ben.');

  let done = new Set((store.get(STORE_KEY, null)?.done || []).filter((id) => validIds.has(id)));
  const save = () => store.set(STORE_KEY, { version: 1, done: [...done] });

  function tally(items) {
    const n = items.filter((item) => done.has(item.id)).length;
    return { n, all: items.length, p: items.length ? n / items.length : 0 };
  }

  /** 0% haladásnál is maradjon egy kis szín, 100%-nál teljes. */
  const colorPct = (p) => `${Math.round(25 + 75 * p)}%`;

  /* ---------- megjelenítés ---------- */

  const road = document.getElementById('road');
  // a fejléc képe ugyanolyan, mint a többi oldalon (teljes színű)
  mountArt(document.getElementById('splash'), { variant: 'compact', id: 'rm' })(1);

  const tickSvg = () =>
    svg('svg', { class: 'tick', viewBox: '0 0 24 24', 'aria-hidden': 'true' },
      svg('path', { d: 'M3.5 12.5c2.2 1.4 3.6 3.2 5 6.3C11.6 11.4 15.6 6.6 21 3' }));

  /* Egy "levél": pipálható kis doboz az ág végén. */
  function renderLeaf(item) {
    const levelText = t(`rm.level.${item.level}`);
    return h('li', { class: `leaf level-${item.level}` },
      h('label', {},
        h('input', { type: 'checkbox', 'data-id': item.id, checked: done.has(item.id) }),
        h('span', { class: 'box', 'aria-hidden': 'true' }, tickSvg()),
        h('span', { class: 'text' },
          tx(item.label),
          item.level === 'must' ? null : h('span', { class: 'sr-only' }, ` (${levelText})`)),
        h('span', { class: 'dot', title: levelText, 'aria-hidden': 'true' })));
  }

  /*
   * Egy ág: középen a téma doboza (az úton), két oldalra szaggatott ágak a pontokhoz.
   * A pontok első fele balra, a második jobbra kerül, hogy sorban olvasható maradjon.
   */
  function renderBranch(topic) {
    const half = Math.ceil(topic.items.length / 2);
    return h('div', { class: 'branch', 'data-topic': topic.id },
      svg('svg', { class: 'branch-lines', 'aria-hidden': 'true' }),
      h('ul', { class: 'leaves leaves-left', 'aria-labelledby': `topic-${topic.id}` }, topic.items.slice(0, half).map(renderLeaf)),
      h('div', { class: 'topic' },
        h('span', { class: 'badge', 'aria-hidden': 'true' }, String(topic.number)),
        h('h3', { class: 'topic-title', id: `topic-${topic.id}` }, tx(topic.title)),
        h('span', { class: 'count' }),
        h('span', { class: 'stamp', 'aria-hidden': 'true' }, t('rm.done'))),
      h('ul', { class: 'leaves leaves-right', 'aria-labelledby': `topic-${topic.id}` }, topic.items.slice(half).map(renderLeaf)));
  }

  /* A szaggatott ágak kirajzolása a téma dobozától minden levélig (csak széles nézetben). */
  function drawBranchLines(branch) {
    const lines = branch.querySelector('.branch-lines');
    if (getComputedStyle(lines).display === 'none') return;
    const base = branch.getBoundingClientRect();
    const node = branch.querySelector('.topic').getBoundingClientRect();
    const y0 = node.top + node.height / 2 - base.top;
    const curve = (x0, x1, y1) => {
      const mx = (x0 + x1) / 2;
      return svg('path', { d: `M${x0.toFixed(1)} ${y0.toFixed(1)}C${mx.toFixed(1)} ${y0.toFixed(1)} ${mx.toFixed(1)} ${y1.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}` });
    };
    const paths = [];
    branch.querySelectorAll('.leaves-left .leaf').forEach((leaf) => {
      const b = leaf.getBoundingClientRect();
      paths.push(curve(node.left - base.left, b.right - base.left, b.top + b.height / 2 - base.top));
    });
    branch.querySelectorAll('.leaves-right .leaf').forEach((leaf) => {
      const b = leaf.getBoundingClientRect();
      paths.push(curve(node.right - base.left, b.left - base.left, b.top + b.height / 2 - base.top));
    });
    lines.setAttribute('viewBox', `0 0 ${base.width.toFixed(1)} ${base.height.toFixed(1)}`);
    lines.setAttribute('width', base.width.toFixed(1));
    lines.setAttribute('height', base.height.toFixed(1));
    lines.replaceChildren(...paths);
  }

  const drawAllBranches = () => road.querySelectorAll('.branch').forEach(drawBranchLines);
  let branchTimer;
  window.addEventListener('resize', () => {
    clearTimeout(branchTimer);
    branchTimer = setTimeout(drawAllBranches, 100);
  });
  document.fonts?.ready.then(drawAllBranches);

  function renderStage(stage, index) {
    const rows = stage.topics.map(renderBranch);
    return h('section', {
      class: 'stage',
      'data-stage': stage.id,
      style: `--c:${stage.color};--a:${stage.accent}`,
      'aria-labelledby': `stage-${stage.id}`,
    },
    h('header', { class: 'stage-banner' },
      h('p', { class: 'stage-kicker' }, t('rm.stage', { n: index + 1 })),
      h('h2', { id: `stage-${stage.id}` }, h('span', { class: 'hl' }, tx(stage.title))),
      h('p', { class: 'stage-sub' }, tx(stage.subtitle)),
      h('div', { class: 'mini' },
        h('span', { class: 'mini-bar', 'aria-hidden': 'true' }, h('span', { class: 'mini-fill' })),
        h('span', { class: 'mini-count' }))),
    rows);
  }

  function render() {
    road.replaceChildren(...stages.map(renderStage), h('p', { class: 'end' }, t('rm.end')));
    refresh();
    requestAnimationFrame(drawAllBranches);
  }

  function refresh(celebrate = false) {
    for (const stage of stages) {
      const stageEl = road.querySelector(`[data-stage="${stage.id}"]`);
      const st = tally(stage.topics.flatMap((topic) => topic.items));
      stageEl.querySelector('.stage-banner').style.setProperty('--pct', colorPct(st.p));
      stageEl.querySelector('.mini-fill').style.width = `${st.p * 100}%`;
      stageEl.querySelector('.mini-count').textContent = `${st.n} / ${st.all}`;

      for (const topic of stage.topics) {
        const branch = stageEl.querySelector(`[data-topic="${topic.id}"]`);
        const node = branch.querySelector('.topic');
        const tt = tally(topic.items);
        const complete = tt.n === tt.all;
        branch.style.setProperty('--pct', colorPct(tt.p));
        node.querySelector('.count').textContent = `${tt.n}/${tt.all}`;
        if (celebrate && complete && !branch.classList.contains('complete')) burst(node, stage.accent);
        branch.classList.toggle('complete', complete);
      }
    }

    const total = tally(allItems);
    const percent = Math.round(total.p * 100);
    document.getElementById('track-cover').style.width = `${100 - total.p * 100}%`;
    document.getElementById('track').setAttribute('aria-valuenow', String(percent));
    document.getElementById('total-count').textContent = `${total.n} / ${total.all} · ${percent}%`;
  }

  function burst(card, accent) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    for (let i = 0; i < 16; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 70;
      const dot = h('span', {
        class: 'burst',
        'aria-hidden': 'true',
        style: `--dx:${(Math.cos(angle) * distance).toFixed(1)}px;--dy:${(Math.sin(angle) * distance).toFixed(1)}px;` +
          `--s:${(6 + Math.random() * 12).toFixed(1)}px;--col:${i % 3 === 0 ? accent : RAINBOW[i % RAINBOW.length]}`,
      });
      dot.addEventListener('animationend', () => dot.remove());
      card.append(dot);
    }
  }

  road.addEventListener('change', (event) => {
    const input = event.target.closest('input[type="checkbox"][data-id]');
    if (!input) return;
    if (input.checked) done.add(input.dataset.id);
    else done.delete(input.dataset.id);
    save();
    refresh(true);
  });

  document.addEventListener('rika:lang', render);

  /* ---------- letöltés: Markdown checklist ---------- */

  function toMarkdown() {
    const total = tally(allItems);
    const lines = [
      `# ${t('rm.mdTitle', { title: DATA.title })}`,
      '',
      `_${humanDate()} · ${t('rm.doneOf', { n: total.n, all: total.all })} (${Math.round(total.p * 100)}%)_`,
      '',
    ];
    stages.forEach((stage, index) => {
      const st = tally(stage.topics.flatMap((topic) => topic.items));
      lines.push(`## ${index + 1}. ${tx(stage.title)} (${st.n}/${st.all})`, '');
      for (const topic of stage.topics) {
        const tt = tally(topic.items);
        lines.push(`### ${topic.number}. ${tx(topic.title)} (${tt.n}/${tt.all})`, '');
        for (const item of topic.items) {
          const tag = item.level === 'must' ? '' : ` _(${t(`rm.level.${item.level}`).toLowerCase()})_`;
          lines.push(`- [${done.has(item.id) ? 'x' : ' '}] ${tx(item.label)}${tag}`);
        }
        lines.push('');
      }
    });
    return lines.join('\n');
  }

  /* ---------- letöltés: JSON mentés és visszatöltés ---------- */

  function toJson() {
    return JSON.stringify({
      app: 'rika-cheat-sheets',
      roadmap: DATA.id,
      version: 1,
      exportedAt: new Date().toISOString(),
      done: [...done].sort(),
    }, null, 2);
  }

  const importInput = document.getElementById('import-file');
  importInput.addEventListener('change', async () => {
    const file = importInput.files[0];
    importInput.value = '';
    if (!file) return;
    let ids;
    try {
      const data = JSON.parse(await file.text());
      if (!data || !Array.isArray(data.done)) throw new Error('not a backup');
      ids = data.done.filter((id) => typeof id === 'string' && validIds.has(id));
    } catch {
      toast(t('rm.badFile'));
      return;
    }
    if (done.size && !confirm(t('rm.confirmImport', { n: done.size }))) return;
    done = new Set(ids);
    save();
    render();
    toast(t('rm.loaded', { n: ids.length }));
  });

  function resetAll() {
    if (!done.size) {
      toast(t('rm.nothing'));
      return;
    }
    if (!confirm(t('rm.confirmReset'))) return;
    done = new Set();
    save();
    render();
    toast(t('rm.cleared'));
  }

  /* ---------- letöltés: kép (canvasra rajzolva, kézírásos betűkkel) ---------- */

  const FONTS = {
    brand: '600 18px "Shantell Sans"',
    title: '800 58px "Shantell Sans"',
    stage: '800 30px "Shantell Sans"',
    topic: '700 18px "Shantell Sans"',
    count: '600 15px "Shantell Sans"',
    item: '19px "Patrick Hand"',
    small: '18px "Patrick Hand"',
  };

  async function loadFonts() {
    if (!document.fonts?.load) return;
    const sample = 'Aa Őő Űű Áá Éé';
    try {
      await Promise.all(Object.values(FONTS).map((font) => document.fonts.load(font, sample)));
    } catch {
      /* tartalék betűvel is elkészül */
    }
  }

  function mixHex(a, b, ratio) {
    const pa = parseInt(a.slice(1), 16);
    const pb = parseInt(b.slice(1), 16);
    const channel = (shift) => Math.round(((pa >> shift) & 255) * ratio + ((pb >> shift) & 255) * (1 - ratio));
    return `rgb(${channel(16)}, ${channel(8)}, ${channel(0)})`;
  }

  function wrapText(ctx, text, maxWidth) {
    const lines = [];
    let line = '';
    for (const word of text.split(' ')) {
      const test = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(test).width > maxWidth) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  function roughRect(ctx, x, y, w, hgt, seed, { stroke = INK, width = 2, fill } = {}) {
    let s = seed;
    const jitter = () => {
      s = (Math.imul(s, 1103515245) + 12345) >>> 0;
      return ((s >>> 16) / 65535 - 0.5) * 2.4;
    };
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fillRect(x, y, w, hgt);
    }
    ctx.strokeStyle = stroke;
    ctx.lineWidth = width;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x + jitter(), y + jitter());
    ctx.lineTo(x + w + jitter(), y + jitter());
    ctx.lineTo(x + w + jitter(), y + hgt + jitter());
    ctx.lineTo(x + jitter(), y + hgt + jitter());
    ctx.closePath();
    ctx.stroke();
  }

  function marker(ctx, x, y, w, hgt, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y + hgt * 0.16);
    ctx.lineTo(x + w, y);
    ctx.lineTo(x + w - 2, y + hgt);
    ctx.lineTo(x + 3, y + hgt * 0.94);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function tick(ctx, x, y, s, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(x + s * 0.12, y + s * 0.55);
    ctx.quadraticCurveTo(x + s * 0.3, y + s * 0.68, x + s * 0.4, y + s * 0.95);
    ctx.quadraticCurveTo(x + s * 0.65, y + s * 0.35, x + s * 1.15, y - s * 0.12);
    ctx.stroke();
    ctx.restore();
  }

  function rainbowBar(ctx, x, y, w, hgt, p) {
    const gradient = ctx.createLinearGradient(x, 0, x + w, 0);
    RAINBOW.forEach((color, i) => gradient.addColorStop(i / (RAINBOW.length - 1), color));
    ctx.save();
    ctx.fillStyle = CARD;
    ctx.fillRect(x, y, w, hgt);
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, w * p, hgt);
    ctx.beginPath();
    ctx.rect(x + w * p, y, w * (1 - p), hgt);
    ctx.clip();
    ctx.strokeStyle = '#ddd7c9';
    ctx.lineWidth = 2;
    for (let i = -hgt; i < w; i += 7) {
      ctx.beginPath();
      ctx.moveTo(x + i, y + hgt);
      ctx.lineTo(x + i + hgt, y);
      ctx.stroke();
    }
    ctx.restore();
    roughRect(ctx, x, y, w, hgt, 7, { width: 2.4 });
  }

  function drawDotGrid(ctx, w, hgt) {
    ctx.fillStyle = 'rgba(43, 42, 40, 0.07)';
    for (let y = 12; y < hgt; y += 24) {
      for (let x = 12; x < w; x += 24) {
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function drawSplash(ctx, w, headHeight, p) {
    const dots = splatterDots(200, 20261120).slice(0, Math.round(24 + 176 * p));
    ctx.save();
    ctx.beginPath();
    ctx.rect(w * 0.5, 0, w * 0.5, headHeight - 24);
    ctx.clip();
    ctx.translate(w - 660, -45);
    for (const d of dots) {
      ctx.globalAlpha = d.o;
      ctx.fillStyle = d.c;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawHeader(ctx, margin, total) {
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.font = FONTS.brand;
    ctx.fillStyle = INK_SOFT;
    ctx.fillText('Rika cheat sheets', margin, 38);

    ctx.font = FONTS.title;
    const [first, ...rest] = DATA.title.split(' ');
    let x = margin;
    [...first].forEach((ch, i) => {
      ctx.fillStyle = TITLE_COLORS[i % TITLE_COLORS.length];
      ctx.fillText(ch, x, 64);
      x += ctx.measureText(ch).width;
    });
    ctx.fillStyle = INK;
    ctx.fillText(` ${rest.join(' ')}`, x, 64);

    ctx.font = FONTS.small;
    ctx.fillStyle = INK_SOFT;
    ctx.fillText(`${t('rm.mine')} · ${humanDate()}`, margin, 146);

    rainbowBar(ctx, margin, 182, 460, 22, total.p);
    ctx.font = FONTS.topic;
    ctx.fillStyle = INK;
    ctx.fillText(`${t('rm.doneOf', { n: total.n, all: total.all })} · ${Math.round(total.p * 100)}%`, margin + 480, 183);

    ctx.font = FONTS.small;
    let lx = margin;
    const ly = 220;
    for (const [level, color] of [['must', '#ffd43b'], ['good', '#ffa94d'], ['extra', null]]) {
      const label = t(`rm.level.${level}`);
      ctx.beginPath();
      ctx.arc(lx + 6, ly + 11, 5.5, 0, Math.PI * 2);
      ctx.lineWidth = 1.6;
      if (color) {
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = INK;
        ctx.stroke();
      } else {
        ctx.strokeStyle = INK_FAINT;
        ctx.setLineDash([2.5, 2.5]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.fillStyle = INK_SOFT;
      ctx.fillText(label, lx + 18, ly);
      lx += 18 + ctx.measureText(label).width + 26;
    }
  }

  /** Egy szakasz oszlopa. draw=false esetén csak megméri a magasságát. */
  function drawStage(ctx, stage, index, x, y0, w, draw) {
    let y = y0;
    const st = tally(stage.topics.flatMap((topic) => topic.items));
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';

    ctx.font = FONTS.stage;
    const title = `${index + 1}. ${tx(stage.title)}`;
    if (draw) {
      marker(ctx, x - 6, y + 2, ctx.measureText(title).width + 14, 34, mixHex(stage.color, GRAY_HL, 0.25 + 0.75 * st.p));
      ctx.fillStyle = INK;
      ctx.fillText(title, x, y);
    }
    y += 46;

    if (draw) {
      ctx.fillStyle = CARD;
      ctx.fillRect(x, y, w, 10);
      ctx.fillStyle = stage.accent;
      ctx.fillRect(x, y, w * st.p, 10);
      roughRect(ctx, x, y, w, 10, hashString(stage.id), { width: 1.8 });
    }
    y += 18;

    ctx.font = FONTS.small;
    if (draw) {
      ctx.fillStyle = INK_SOFT;
      ctx.fillText(t('rm.doneOf', { n: st.n, all: st.all }), x, y);
    }
    y += 28;

    for (const topic of stage.topics) {
      const tt = tally(topic.items);
      const complete = tt.n === tt.all;
      y += 10;

      ctx.font = FONTS.topic;
      const titleLines = wrapText(ctx, `${topic.number}. ${tx(topic.title)}`, w - 46);
      if (draw) {
        if (complete) {
          const widest = Math.max(...titleLines.map((line) => ctx.measureText(line).width));
          marker(ctx, x - 4, y - 1, widest + 10, titleLines.length * 23 + 2, stage.color);
        }
        ctx.fillStyle = INK;
        titleLines.forEach((line, i) => ctx.fillText(line, x, y + i * 23));
        ctx.font = FONTS.count;
        ctx.textAlign = 'right';
        ctx.fillStyle = complete ? stage.accent : INK_FAINT;
        ctx.fillText(`${tt.n}/${tt.all}`, x + w, y + 2);
        ctx.textAlign = 'left';
      }
      y += titleLines.length * 23 + 6;

      ctx.font = FONTS.item;
      for (const item of topic.items) {
        const checked = done.has(item.id);
        const lines = wrapText(ctx, tx(item.label), w - 28);
        if (draw) {
          if (checked) {
            ctx.save();
            ctx.globalAlpha = 0.8;
            ctx.fillStyle = stage.color;
            lines.forEach((line, i) => ctx.fillRect(x + 24, y + i * 22 + 11, ctx.measureText(line).width + 4, 9));
            ctx.restore();
          }
          roughRect(ctx, x + 1, y + 3, 15, 15, hashString(item.id), { width: 1.8, fill: CARD });
          if (checked) tick(ctx, x + 1, y + 3, 15, stage.accent);
          ctx.fillStyle = item.level === 'extra' ? INK_FAINT : INK;
          lines.forEach((line, i) => ctx.fillText(line, x + 26, y + i * 22));
        }
        y += lines.length * 22 + 3;
      }
    }
    return y - y0;
  }

  async function downloadPng(button) {
    button.disabled = true;
    try {
      await loadFonts();
      const W = 1400;
      const MARGIN = 56;
      const GAP = 26;
      const HEAD = 266;
      const colW = (W - 2 * MARGIN - GAP * (stages.length - 1)) / stages.length;
      const measure = document.createElement('canvas').getContext('2d');
      const heights = stages.map((stage, i) => drawStage(measure, stage, i, 0, 0, colW, false));
      const H = Math.ceil(HEAD + Math.max(...heights) + 76);

      const scale = 2;
      const canvas = document.createElement('canvas');
      canvas.width = W * scale;
      canvas.height = H * scale;
      const ctx = canvas.getContext('2d');
      ctx.scale(scale, scale);

      const total = tally(allItems);
      ctx.fillStyle = PAPER;
      ctx.fillRect(0, 0, W, H);
      drawDotGrid(ctx, W, H);
      drawSplash(ctx, W, HEAD, total.p);
      drawHeader(ctx, MARGIN, total);
      stages.forEach((stage, i) => drawStage(ctx, stage, i, MARGIN + i * (colW + GAP), HEAD, colW, true));

      ctx.font = FONTS.small;
      ctx.fillStyle = INK_FAINT;
      ctx.textAlign = 'center';
      ctx.fillText(t('footer.tagline'), W / 2, H - 42);

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (!blob) throw new Error('canvas.toBlob returned null');
      downloadBlob(blob, `${DATA.id}-roadmap-${getLang()}-${isoDate()}.png`);
      toast(t('rm.toastPng'));
    } catch (error) {
      console.error(error);
      toast(t('rm.toastPngFail'));
    } finally {
      button.disabled = false;
    }
  }

  /* ---------- gombok ---------- */

  document.getElementById('actions').addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    switch (button.dataset.action) {
      case 'png':
        downloadPng(button);
        break;
      case 'md':
        downloadBlob(new Blob([toMarkdown()], { type: 'text/markdown;charset=utf-8' }), `${DATA.id}-roadmap-${getLang()}-${isoDate()}.md`);
        toast(t('rm.toastMd'));
        break;
      case 'json':
        downloadBlob(new Blob([toJson()], { type: 'application/json' }), `${DATA.id}-roadmap-${t('rm.saved')}-${isoDate()}.json`);
        toast(t('rm.toastJson'));
        break;
      case 'import':
        importInput.click();
        break;
      case 'reset':
        resetAll();
        break;
      default:
        break;
    }
  });

  render();
})();
