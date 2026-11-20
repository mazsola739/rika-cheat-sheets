/* Rika cheat sheets · közös segédfüggvények, nyelvváltás, illusztráció (window.Rika) */
(() => {
  'use strict';

  const SVG_NS = 'http://www.w3.org/2000/svg';

  const RAINBOW = ['#ff6b6b', '#ffa94d', '#ffd43b', '#69db7c', '#38d9a9', '#4dabf7', '#9775fa', '#f783ac'];

  /* Kiemelő (c) + hangsúly (a) párok, a cheat sheet poszter színei. */
  const PALETTE = [
    { c: '#b2f2bb', a: '#2f9e44' }, // zöld
    { c: '#ffd8a8', a: '#e8590c' }, // narancs
    { c: '#ffec99', a: '#b35c00' }, // sárga
    { c: '#d0bfff', a: '#7048e8' }, // lila
    { c: '#a5d8ff', a: '#1c7ed6' }, // kék
    { c: '#fcc2d7', a: '#d6336c' }, // rózsaszín
  ];

  /* ---------- DOM ---------- */

  function setAttrs(node, attrs) {
    for (const [key, value] of Object.entries(attrs || {})) {
      if (value == null || value === false) continue;
      if (key === 'class') node.setAttribute('class', value);
      else if (key === 'style') node.style.cssText = value;
      else if (key === 'html') node.innerHTML = value;
      else if (key.startsWith('on') && typeof value === 'function') node.addEventListener(key.slice(2), value);
      else node.setAttribute(key, value === true ? '' : value);
    }
  }

  function h(tag, attrs, ...children) {
    const node = document.createElement(tag);
    setAttrs(node, attrs);
    for (const child of children.flat(Infinity)) if (child != null && child !== false) node.append(child);
    return node;
  }

  function svg(tag, attrs, ...children) {
    const node = document.createElementNS(SVG_NS, tag);
    setAttrs(node, attrs);
    for (const child of children.flat(Infinity)) if (child != null && child !== false) node.append(child);
    return node;
  }

  /* ---------- tárolás (privát módban is működjön) ---------- */

  const store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw == null ? fallback : JSON.parse(raw);
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        /* nincs tárhely: csak memóriában marad */
      }
    },
  };

  /* ---------- nyelv (HU / EN) ----------
   * Statikus szöveg: data-i18n="kulcs", attribútum: data-i18n-attr="placeholder:kulcs;aria-label:kulcs2".
   * Adatban egy szöveg lehet sima string vagy { hu, en } objektum: tx() választ.
   * Nyelvváltáskor 'rika:lang' esemény megy a document-re, az oldalak erre újrarajzolnak.
   */

  const LANG_KEY = 'rika-cheat-sheets:lang';
  const STRINGS = {
    hu: {
      'nav.menu': 'Fő menü',
      'nav.roadmap': 'Roadmap',
      'nav.sheets': 'Cheat sheetek',
      'nav.snippets': 'Snippetek',
      'nav.principles': 'Elvek',
      'lang.switch': 'Switch to English',
      'footer.tagline': 'Rika cheat sheets · minél többet tudsz, annál színesebb',
      'footer.source': 'Forráskód a GitHubon',
      'footer.portfolio': 'Portfólióm',
      'copy': 'Másol',
      'copy.aria': '{label} másolása',
      'copy.done': 'Kimásolva a vágólapra ✓',
      'code': 'Kód',
    },
    en: {
      'nav.menu': 'Main menu',
      'nav.roadmap': 'Roadmap',
      'nav.sheets': 'Cheat sheets',
      'nav.snippets': 'Snippets',
      'nav.principles': 'Principles',
      'lang.switch': 'Váltás magyarra',
      'footer.tagline': 'Rika cheat sheets · the more you know, the more colorful it gets',
      'footer.source': 'Source on GitHub',
      'footer.portfolio': 'My portfolio',
      'copy': 'Copy',
      'copy.aria': 'Copy {label}',
      'copy.done': 'Copied to clipboard ✓',
      'code': 'Code',
    },
  };

  // alapból angol; ha a látogató átváltott, a választása megmarad
  let lang = (() => {
    const saved = store.get(LANG_KEY, null);
    return saved === 'hu' || saved === 'en' ? saved : 'en';
  })();
  document.documentElement.lang = lang;

  const getLang = () => lang;

  function t(key, vars) {
    const text = STRINGS[lang]?.[key] ?? STRINGS.hu[key] ?? key;
    return vars ? text.replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? '')) : text;
  }

  const tx = (value) => (value && typeof value === 'object' && !Array.isArray(value) ? value[lang] ?? value.hu ?? value.en : value);

  function addStrings(dict) {
    for (const [code, entries] of Object.entries(dict)) Object.assign((STRINGS[code] ||= {}), entries);
  }

  function applyI18n(root = document) {
    root.querySelectorAll('[data-i18n]').forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    root.querySelectorAll('[data-i18n-attr]').forEach((node) => {
      for (const pair of node.dataset.i18nAttr.split(';')) {
        const [attr, key] = pair.split(':').map((part) => part.trim());
        if (attr && key) node.setAttribute(attr, t(key));
      }
    });
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang-toggle]').forEach((button) => {
      button.replaceChildren(
        h('span', { class: lang === 'hu' ? 'on' : null }, 'HU'),
        h('span', { class: 'sep', 'aria-hidden': 'true' }, '/'),
        h('span', { class: lang === 'en' ? 'on' : null }, 'EN'),
      );
      button.setAttribute('aria-label', t('lang.switch'));
      button.setAttribute('title', t('lang.switch'));
    });
  }

  function setLang(next) {
    if (next === lang) return;
    lang = next;
    store.set(LANG_KEY, next);
    applyI18n();
    document.dispatchEvent(new CustomEvent('rika:lang', { detail: next }));
  }

  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-lang-toggle]')) setLang(lang === 'hu' ? 'en' : 'hu');
  });
  document.addEventListener('DOMContentLoaded', () => applyI18n());

  /* ---------- véletlen, de mindig ugyanúgy ---------- */

  function mulberry32(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let x = a;
      x = Math.imul(x ^ (x >>> 15), x | 1);
      x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
  }

  function hashString(str) {
    let x = 2166136261;
    for (const ch of str) {
      x ^= ch.codePointAt(0);
      x = Math.imul(x, 16777619);
    }
    return x >>> 0;
  }

  /* ---------- festékfröccs ----------
   * A pöttyök a forrásponttól kifelé egyre kisebbek és ritkábbak. A sorrend számít:
   * az elsők a "mag", a későbbiek a szétfröccsenő cseppek, így ha csak az első N látszik,
   * a fröccs belülről kifelé nő.
   */
  function splatterDots(count, seed, { ox = 112, oy = 170, reach = 602, flat = 0.5 } = {}) {
    const r = mulberry32(seed);
    const dots = [];
    for (let i = 0; i < count; i++) {
      const t01 = i / count;
      const dist = Math.pow(t01, 0.7) * reach * (0.55 + 0.45 * r());
      const spread = 0.5 + t01 * 1.1;
      const ang = (r() + r() - 1) * spread;
      const base = (1 - t01) * 34 + 2;
      dots.push({
        x: ox + Math.cos(ang) * dist,
        y: oy + Math.sin(ang) * dist * flat,
        r: Math.max(1.6, base * (0.35 + 0.65 * Math.pow(r(), 1.4))),
        c: RAINBOW[Math.floor(r() * RAINBOW.length)],
        o: 0.72 + 0.28 * r(),
      });
    }
    return dots;
  }

  /* ---------- agy: bal fele szürke skicc, jobb fele szivárvány ---------- */

  const fmt = (n) => n.toFixed(1);

  function smoothPath(points, closed = false) {
    const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
    if (closed) {
      const start = mid(points[points.length - 1], points[0]);
      let d = `M${fmt(start[0])} ${fmt(start[1])}`;
      points.forEach((p, i) => {
        const m = mid(p, points[(i + 1) % points.length]);
        d += `Q${fmt(p[0])} ${fmt(p[1])} ${fmt(m[0])} ${fmt(m[1])}`;
      });
      return `${d}Z`;
    }
    let d = `M${fmt(points[0][0])} ${fmt(points[0][1])}`;
    for (let i = 1; i < points.length - 1; i++) {
      const m = mid(points[i], points[i + 1]);
      d += `Q${fmt(points[i][0])} ${fmt(points[i][1])} ${fmt(m[0])} ${fmt(m[1])}`;
    }
    const last = points[points.length - 1];
    return `${d}L${fmt(last[0])} ${fmt(last[1])}`;
  }

  function hemispherePath(cx, cy, rx, ry, side, r) {
    const gap = 5;
    const ph1 = r() * 6.28;
    const ph2 = r() * 6.28;
    const points = [];
    const n = 52;
    for (let i = 0; i <= n; i++) {
      const a = -Math.PI / 2 + (Math.PI * i) / n;
      const bump = 1 + 0.035 * Math.sin(a * 9 + ph1) + 0.018 * Math.sin(a * 21 + ph2);
      const widen = 1 + 0.07 * Math.sin(a);
      points.push([cx + side * (gap + rx * Math.cos(a) * bump * widen), cy + ry * Math.sin(a) * bump]);
    }
    for (let i = 1; i < 12; i++) {
      points.push([cx + side * (gap + 2 * Math.sin(i * 1.7 + ph1)), cy + ry - (2 * ry * i) / 12]);
    }
    return smoothPath(points, true);
  }

  /*
   * Tekervények áramvonalakkal: egy örvénylő vektormezőt sűrű, egyenletes közű vonalakkal
   * töltünk ki (Jobard–Lefer-féle elhelyezés). Ettől lesz az a hullámzó, "zentangle"-szerű
   * vonalminta, mint a kézzel rajzolt agyakon.
   */
  function flowField(r, cx, cy, rx, ry, side) {
    const scale = rx * 0.19;
    const vortices = Array.from({ length: 15 }, () => {
      const a = r() * Math.PI * 2;
      const d = Math.sqrt(r());
      return {
        x: cx + side * rx * 0.52 + Math.cos(a) * d * rx * 0.6,
        y: cy + Math.sin(a) * d * ry * 0.9,
        s: (r() < 0.5 ? -1 : 1) * (0.7 + r() * 0.8),
      };
    });
    const base = r() * Math.PI * 2;
    return (x, y) => {
      let vx = Math.cos(base) * 0.25;
      let vy = Math.sin(base) * 0.25 + 0.2;
      for (const v of vortices) {
        const dx = (x - v.x) / scale;
        const dy = (y - v.y) / scale;
        const f = v.s / (dx * dx + dy * dy + 1);
        vx += -dy * f;
        vy += dx * f;
      }
      return Math.atan2(vy, vx);
    };
  }

  function streamlines(field, inside, r, box, dsep) {
    const cell = dsep;
    const grid = new Map();
    const keyOf = (x, y) => `${Math.floor(x / cell)},${Math.floor(y / cell)}`;
    const add = (x, y, id, idx) => {
      const key = keyOf(x, y);
      let bucket = grid.get(key);
      if (!bucket) grid.set(key, (bucket = []));
      bucket.push(x, y, id, idx);
    };
    const crowded = (x, y, dist, id, idx) => {
      const gx = Math.floor(x / cell);
      const gy = Math.floor(y / cell);
      const d2 = dist * dist;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const bucket = grid.get(`${gx + i},${gy + j}`);
          if (!bucket) continue;
          for (let m = 0; m < bucket.length; m += 4) {
            if (bucket[m + 2] === id && Math.abs(bucket[m + 3] - idx) < 24) continue;
            const dx = bucket[m] - x;
            const dy = bucket[m + 1] - y;
            if (dx * dx + dy * dy < d2) return true;
          }
        }
      }
      return false;
    };

    const step = dsep * 0.3;
    const trace = (sx, sy, id) => {
      add(sx, sy, id, 0);
      const half = (dir) => {
        const points = [];
        let x = sx;
        let y = sy;
        for (let n = 1; n < 500; n++) {
          const a1 = field(x, y) + (dir < 0 ? Math.PI : 0);
          const mx = x + Math.cos(a1) * step * 0.5;
          const my = y + Math.sin(a1) * step * 0.5;
          const a2 = field(mx, my) + (dir < 0 ? Math.PI : 0);
          x += Math.cos(a2) * step;
          y += Math.sin(a2) * step;
          if (!inside(x, y) || crowded(x, y, dsep * 0.55, id, dir * n)) break;
          add(x, y, id, dir * n);
          points.push([x, y]);
        }
        return points;
      };
      const forward = half(1);
      const backward = half(-1).reverse();
      return [...backward, [sx, sy], ...forward];
    };

    const lines = [];
    const queue = [];
    let head = 0;
    let id = 0;
    const trySeed = (x, y) => {
      if (!inside(x, y) || crowded(x, y, dsep * 0.95, -1, 0)) return;
      const line = trace(x, y, ++id);
      if (line.length < 5) return;
      lines.push(line);
      for (let i = 0; i < line.length; i += 5) {
        const [px, py] = line[i];
        const a = field(px, py);
        const nx = -Math.sin(a) * dsep;
        const ny = Math.cos(a) * dsep;
        queue.push([px + nx, py + ny], [px - nx, py - ny]);
      }
    };
    for (let tries = 0; tries < 80; tries++) {
      trySeed(box.x + r() * box.w, box.y + r() * box.h);
      while (head < queue.length) {
        const [x, y] = queue[head++];
        trySeed(x, y);
      }
    }
    return lines;
  }

  const linePath = (points) => {
    let d = `M${fmt(points[0][0])} ${fmt(points[0][1])}`;
    for (let i = 2; i < points.length; i += 2) d += `L${fmt(points[i][0])} ${fmt(points[i][1])}`;
    return d;
  };

  function brain({ id, cx, cy, rx, ry, seed }) {
    const r = mulberry32(seed);
    const defs = svg('defs');
    const dsep = Math.max(4.2, rx / 25);
    const group = svg('g', { class: 'brain', style: `--sw:${fmt(dsep)}` }, defs);
    const gap = 5;
    const ph = r() * 6.28;
    const colorAt = (x, y) => {
      const v = Math.sin(x * 0.07 + ph) + Math.sin(y * 0.06 - ph) + Math.sin((x - y) * 0.035);
      return RAINBOW[Math.floor(((v + 3) / 6) * RAINBOW.length * 1.7 + r() * 1.6) % RAINBOW.length];
    };

    for (const side of [-1, 1]) {
      const outline = hemispherePath(cx, cy, rx, ry, side, r);
      const clipId = `${id}-${side < 0 ? 'l' : 'r'}`;
      defs.append(svg('clipPath', { id: clipId }, svg('path', { d: outline })));
      const half = svg('g', { 'clip-path': `url(#${clipId})` }, svg('path', { d: outline, class: 'brain-fill' }));

      const inside = (x, y) => {
        if (side * (x - cx) < gap + 1.5) return false;
        const nx = (x - cx - side * gap) / (rx * 1.04);
        const ny = (y - cy) / (ry * 1.0);
        return nx * nx + ny * ny < 1;
      };
      const box = { x: side < 0 ? cx - gap - rx * 1.1 : cx + gap, y: cy - ry, w: rx * 1.1, h: ry * 2 };
      const lines = streamlines(flowField(r, cx, cy, rx, ry, side), inside, r, box, dsep);

      for (const line of lines) {
        const d = linePath(line);
        if (side < 0) {
          half.append(svg('path', { d, class: 'strand' }));
        } else {
          const [sx, sy] = line[Math.floor(line.length / 2)];
          half.append(svg('g', { class: 'strand-c', style: `--g:${colorAt(sx, sy)}`, 'data-order': r().toFixed(3) },
            svg('path', { d, class: 's-out' }),
            svg('path', { d, class: 's-in' })));
        }
      }
      group.append(half, svg('path', { d: outline, class: 'brain-outline' }));
    }
    return group;
  }

  /* ---------- festékfoltok: szabálytalan pacák, cseppek, csurgások ---------- */

  function blobPath(x, y, radius, r) {
    const n = 11 + Math.floor(r() * 5);
    const points = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const k = 0.72 + r() * 0.5;
      points.push([x + Math.cos(a) * radius * k, y + Math.sin(a) * radius * k]);
    }
    return smoothPath(points, true);
  }

  function splats(count, seed, { ox, oy, reach, flat }) {
    const r = mulberry32(seed);
    const out = [];
    for (let i = 0; i < count; i++) {
      const t01 = i / count;
      const dist = Math.pow(t01, 0.75) * reach * (0.5 + 0.5 * r());
      const ang = (r() + r() - 1) * (0.55 + t01 * 1.15);
      const x = ox + Math.cos(ang) * dist;
      const y = oy + Math.sin(ang) * dist * flat;
      const size = Math.max(1.4, ((1 - t01) * 25 + 2) * (0.3 + 0.7 * Math.pow(r(), 1.3)));
      const color = RAINBOW[Math.floor(r() * RAINBOW.length)];
      const parts = [];
      if (size > 4.5) {
        parts.push(blobPath(x, y, size, r));
        if (r() < 0.3) {
          // kicsapódó, elvékonyodó csík kifelé
          const dir = ang + (r() - 0.5) * 0.6;
          const len = size * (1.5 + r() * 1.8);
          const w = size * (0.45 + r() * 0.2);
          const tx = x + Math.cos(dir) * len;
          const ty = y + Math.sin(dir) * len;
          const px = -Math.sin(dir) * w;
          const py = Math.cos(dir) * w;
          const bx = x + Math.cos(dir) * size * 0.4;
          const by = y + Math.sin(dir) * size * 0.4;
          parts.push(`M${fmt(bx + px)} ${fmt(by + py)}Q${fmt((bx + tx) / 2 + px * 0.35)} ${fmt((by + ty) / 2 + py * 0.35)} ${fmt(tx)} ${fmt(ty)}Q${fmt((bx + tx) / 2 - px * 0.35)} ${fmt((by + ty) / 2 - py * 0.35)} ${fmt(bx - px)} ${fmt(by - py)}Z`);
          parts.push(blobPath(tx + Math.cos(dir) * w * 0.9, ty + Math.sin(dir) * w * 0.9, w * 0.45, r));
        }
        const satellites = 1 + Math.floor(r() * 4);
        for (let s = 0; s < satellites; s++) {
          const sa = r() * Math.PI * 2;
          const sd = size * (1.25 + r() * 1.1);
          parts.push(blobPath(x + Math.cos(sa) * sd, y + Math.sin(sa) * sd, size * (0.1 + r() * 0.16), r));
        }
      } else {
        parts.push(blobPath(x, y, size, r));
      }
      out.push({ d: parts.join(''), c: color, o: 0.78 + 0.22 * r() });
    }
    return out;
  }

  /* ---------- kézzel rajzolt firkák a bal oldalra (csak a nagy változatban) ---------- */

  function roughRectPath(x, y, w, hgt, r) {
    const j = () => (r() - 0.5) * 3;
    return `M${fmt(x + j())} ${fmt(y + j())}L${fmt(x + w + j())} ${fmt(y + j())}L${fmt(x + w + j())} ${fmt(y + hgt + j())}L${fmt(x + j())} ${fmt(y + hgt + j())}Z`;
  }

  function doodles(r, brainLeft, brainY) {
    const g = svg('g', { class: 'doodles' });
    const anchors = {};
    const word = (key, x, y, text, fill) => {
      const w = 16 + text.length * 12;
      g.append(svg('path', { d: roughRectPath(x, y, w, 30, r), class: fill ? 'dd-line dd-fill' : 'dd-line' }));
      g.append(svg('text', { x: fmt(x + w / 2), y: fmt(y + 21), class: 'dd-text', 'text-anchor': 'middle' }, text));
      anchors[key] = { l: [x, y + 15], r: [x + w, y + 15], b: [x + w / 2, y + 30], t: [x + w / 2, y] };
    };
    const arrow = (from, to, bend = 20) => {
      const mx = (from[0] + to[0]) / 2;
      const my = (from[1] + to[1]) / 2 - bend;
      g.append(svg('path', { d: `M${fmt(from[0])} ${fmt(from[1])}Q${fmt(mx)} ${fmt(my)} ${fmt(to[0])} ${fmt(to[1])}`, class: 'dd-line dd-thin' }));
      const ang = Math.atan2(to[1] - my, to[0] - mx);
      const head = (da) => `${fmt(to[0] - 9 * Math.cos(ang + da))} ${fmt(to[1] - 9 * Math.sin(ang + da))}`;
      g.append(svg('path', { d: `M${head(0.45)}L${fmt(to[0])} ${fmt(to[1])}L${head(-0.45)}`, class: 'dd-line dd-thin' }));
    };

    // oszlopdiagram
    [22, 36, 18, 44].forEach((hgt, i) => g.append(svg('path', { d: roughRectPath(24 + i * 15, 82 - hgt, 10, hgt, r), class: i === 3 ? 'dd-line dd-fill' : 'dd-line' })));
    g.append(svg('path', { d: 'M18 84L90 84', class: 'dd-line' }));

    word('idea', 112, 40, 'IDEA', true);
    // villanykörte
    g.append(svg('circle', { cx: 250, cy: 50, r: 16, class: 'dd-line' }));
    g.append(svg('path', { d: 'M243 66L243 76L257 76L257 66M245 81L255 81M250 22L250 14M228 32L222 26M272 32L278 26', class: 'dd-line' }));

    word('plan', 40, 118, 'PLAN');
    // vonaldiagram
    g.append(svg('path', { d: 'M150 150L172 128L192 140L214 112L236 122', class: 'dd-line' }));
    [[150, 150], [172, 128], [192, 140], [214, 112], [236, 122]].forEach(([x, y]) => g.append(svg('circle', { cx: x, cy: y, r: 3.5, class: 'dd-dot' })));

    word('html', 18, 186, 'HTML', true);
    word('css', 116, 182, 'CSS');
    word('js', 196, 192, 'JS', true);

    g.append(svg('text', { x: 22, y: 278, class: 'dd-text dd-big' }, '{ }'));
    word('code', 90, 246, 'CODE');
    // fogaskerék
    g.append(svg('circle', { cx: 232, cy: 262, r: 17, class: 'dd-line dd-gear' }));
    g.append(svg('circle', { cx: 232, cy: 262, r: 6, class: 'dd-line' }));

    word('ux', 36, 312, 'UX', true);
    // teendőlista
    [0, 1, 2].forEach((i) => {
      g.append(svg('path', { d: roughRectPath(118, 302 + i * 18, 11, 11, r), class: 'dd-line dd-thin' }));
      g.append(svg('path', { d: `M136 ${308 + i * 18}L${176 - i * 10} ${308 + i * 18}`, class: 'dd-line dd-thin' }));
    });
    g.append(svg('path', { d: 'M119 309L123 313L131 301', class: 'dd-line dd-tick' }));

    word('git', 26, 370, 'GIT');
    g.append(svg('text', { x: 112, y: 396, class: 'dd-text dd-big' }, '</>'));
    word('deploy', 176, 360, 'DEPLOY', true);

    arrow(anchors.idea.l, anchors.plan.t, 14);
    arrow(anchors.plan.b, anchors.html.t, -8);
    arrow(anchors.html.r, anchors.css.l, 10);
    arrow(anchors.css.r, anchors.js.l, 10);
    arrow(anchors.code.b, anchors.ux.r, -10);
    arrow(anchors.git.r, [176, 375], 12);

    // vonalak az agy felé
    [[anchors.js.r, -30], [anchors.code.r, -10], [anchors.deploy.r, 20], [[268, 56], -40]].forEach(([from, dy]) => {
      const to = [brainLeft + 6, brainY + dy];
      g.append(svg('path', { d: `M${fmt(from[0])} ${fmt(from[1])}C${fmt(from[0] + 30)} ${fmt(from[1])} ${fmt(to[0] - 30)} ${fmt(to[1])} ${fmt(to[0])} ${fmt(to[1])}`, class: 'dd-line dd-thin dd-dash' }));
    });
    return g;
  }

  /*
   * Illusztráció egy konténerbe.
   *  - variant 'full': firkák + agy + fröccs (kezdőlap)
   *  - variant 'compact': agy + fröccs (oldalfejlécek)
   * A visszakapott függvénnyel (0..1) állítható, mennyire színes: a fröccs nő,
   * a jobb félteke tekervényei egyenként kiszíneződnek.
   */
  /*
   * Saját képfájl az illusztráció helyett: tedd be az assets/img mappába, és írd ide az útvonalát,
   * pl. 'assets/img/brain.webp'. Üresen hagyva a kódból rajzolt agy látszik.
   * A színezés képnél CSS-szűrővel megy: 0% haladásnál szürke, 100%-nál teljes színű.
   */
  const ART_IMAGE = 'assets/img/brain.webp';
  let artImagePromise;

  function findArtImage() {
    artImagePromise ||= !ART_IMAGE
      ? Promise.resolve(null)
      : new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(ART_IMAGE);
        img.onerror = () => resolve(null);
        img.src = ART_IMAGE;
      });
    return artImagePromise;
  }

  /*
   * "Színes zseblámpa" a képen (csak a kezdőlapon; a betöltéskori söprés után kapcsol be):
   *  - ha egérrel a kép fölött mozogsz, lassan elszürkül, csak a kurzor körül marad színes,
   *  - kilépéskor, kattintásra vagy görgetéskor a szín a kurzor helyéről lassan visszaárad,
   *  - véletlen ráhúzásra nem indul: kell egy kis idő a kép fölött, és nem görgetés közben,
   *  - érintésnél egy koppintás: egy pillanatra szürke, aztán onnan szétárad a szín.
   * A kör sugara (--r) és helye (--mx, --my) CSS-változó, az átmenetet a base.css adja.
   */
  const PEEK_HOVER_DELAY = 400; // ms ennyi ideig kell a kép fölött lenni
  const PEEK_AFTER_SCROLL = 600; // ms ennyivel görgetés után még nem indul

  function enableColorPeek(host) {
    const color = host.querySelector('.art-color');
    let ready = false;
    let hoverSince = 0;
    let lastScroll = 0;
    let clickedOff = false;
    const setBig = () => host.style.setProperty('--r-big', `${Math.ceil(Math.hypot(host.clientWidth, host.clientHeight) * 1.15)}px`);
    const place = (event) => {
      const box = host.getBoundingClientRect();
      host.style.setProperty('--mx', `${Math.round(event.clientX - box.left)}px`);
      host.style.setProperty('--my', `${Math.round(event.clientY - box.top)}px`);
    };
    const start = () => {
      if (ready) return;
      ready = true;
      setBig();
      host.classList.add('peek-ready');
    };
    color.addEventListener('animationend', start, { once: true });
    setTimeout(start, 4200); // ha az animationend valamiért elmaradna
    window.addEventListener('resize', () => ready && setBig());

    // görgetéskor visszajön a szín, és egy ideig nem is indul újra
    window.addEventListener('scroll', () => {
      lastScroll = performance.now();
      host.classList.remove('is-peek');
    }, { passive: true });

    host.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'mouse') hoverSince = performance.now();
    });
    host.addEventListener('pointermove', (event) => {
      if (!ready || event.pointerType !== 'mouse') return;
      place(event);
      const now = performance.now();
      if (!clickedOff && !host.classList.contains('is-peek') && now - hoverSince > PEEK_HOVER_DELAY && now - lastScroll > PEEK_AFTER_SCROLL) {
        host.classList.add('is-peek');
      }
    });
    host.addEventListener('pointerleave', () => {
      host.classList.remove('is-peek');
      clickedOff = false;
    });
    host.addEventListener('click', (event) => {
      if (!ready) return;
      place(event);
      if (host.classList.contains('is-peek')) {
        host.classList.remove('is-peek'); // egérkattintás: a szín szétárad a kurzortól
        clickedOff = true; // és úgy is marad, amíg az egér ki nem megy a képről
        return;
      }
      // érintés: azonnal szürke a koppintás körül, aztán onnan szétárad a szín
      host.classList.add('no-peek-anim', 'is-peek');
      void host.offsetWidth;
      host.classList.remove('no-peek-anim');
      requestAnimationFrame(() => requestAnimationFrame(() => host.classList.remove('is-peek')));
    });
  }

  function mountArt(host, options = {}) {
    if (!host) return () => {};
    let amount = 1;
    let imageMode = false;
    let setSvg = mountSvgArt(host, options);
    findArtImage().then((src) => {
      if (!src) return;
      imageMode = true;
      host.classList.add('has-image');
      // két réteg: alul a fekete-fehér, felül a színes, ami balról jobbra "befestődik"
      host.replaceChildren(
        h('img', { class: 'art-img art-gray', src, alt: '' }),
        h('img', { class: 'art-img art-color', src, alt: '' }),
      );
      host.style.setProperty('--gray', grayFor(amount));
      if (options.peek) enableColorPeek(host);
    });
    // 0%-nál is maradjon egy csipetnyi szín, ne legyen teljesen fakó
    const grayFor = (p) => (0.78 * (1 - p)).toFixed(3);
    return (value = 1) => {
      amount = Math.min(1, Math.max(0, value));
      if (imageMode) host.style.setProperty('--gray', grayFor(amount));
      else setSvg(amount);
    };
  }

  function mountSvgArt(host, { variant = 'compact', seed = 20261120, id = 'art' } = {}) {
    const full = variant === 'full';
    const W = full ? 1000 : 760;
    const H = full ? 420 : 340;
    const geo = full ? { cx: 465, cy: 212, rx: 138, ry: 168 } : { cx: 308, cy: 170, rx: 100, ry: 124 };
    const origin = { ox: geo.cx + geo.rx * 0.75, oy: geo.cy, reach: W - geo.cx - geo.rx * 0.6, flat: 0.5 };

    const root = svg('svg', { viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: 'xMinYMid meet', 'aria-hidden': 'true', focusable: 'false', class: 'art-svg' });
    // a firkák 300×420-as területre készültek; a kis változatban kicsinyítve
    const sketch = doodles(mulberry32(seed + 1), 310, 210);
    if (!full) sketch.setAttribute('transform', 'translate(4 40) scale(0.62)');
    const splashGroup = svg('g', { class: 'splash-dots' },
      splats(full ? 210 : 170, seed, origin).map((s) => svg('path', { d: s.d, fill: s.c, 'fill-opacity': s.o.toFixed(2), class: 'splat' })));
    root.append(sketch, splashGroup, brain({ id: `${id}-brain`, seed, ...geo }));
    host.replaceChildren(root);

    const drops = [...splashGroup.children];
    const colored = [...root.querySelectorAll('.strand-c')];
    return (amount = 1) => {
      const p = Math.min(1, Math.max(0, amount));
      const visible = Math.round(18 + (drops.length - 18) * p);
      drops.forEach((d, i) => d.classList.toggle('off', i >= visible));
      const threshold = 0.1 + 0.9 * p;
      colored.forEach((g) => g.classList.toggle('off', Number(g.dataset.order) > threshold));
    };
  }

  /* ---------- visszajelzés, másolás, letöltés ---------- */

  let toastTimer;
  function toast(message) {
    let node = document.getElementById('toast');
    if (!node) {
      node = h('div', { id: 'toast', class: 'toast', role: 'status', 'aria-live': 'polite' });
      document.body.append(node);
    }
    node.textContent = message;
    node.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove('show'), 2400);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = h('textarea', { style: 'position:fixed;top:0;left:0;opacity:0', 'aria-hidden': 'true' });
      area.value = text;
      document.body.append(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    toast(t('copy.done'));
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = h('a', { href: url, download: filename, style: 'display:none' });
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  function isoDate(date = new Date()) {
    const pad = (n) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }

  function humanDate(date = new Date()) {
    return new Intl.DateTimeFormat(lang === 'hu' ? 'hu-HU' : 'en-GB', { dateStyle: 'long' }).format(date);
  }

  /* ---------- kódkiemelés (kicsi, függőség nélkül) ---------- */

  const JS_KEYWORDS = new Set(
    ('const let var function return if else for while do switch case break continue new class extends super this ' +
      'typeof instanceof in of try catch finally throw async await yield import export from default null undefined ' +
      'true false delete void').split(' '),
  );

  const TOKEN_RE =
    /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|('(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"|`(?:\\.|[^`\\])*`)|(\b0x[\da-fA-F]+\b|\b\d+(?:\.\d+)?(?:e[+-]?\d+)?)|([A-Za-z_$][\w$]*)|([\s\S])/g;

  const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  function highlight(code, language = 'js') {
    if (language === 'text') return escapeHtml(code);
    if (language === 'sh') {
      return code
        .split('\n')
        .map((line) => {
          const hashAt = line.indexOf(' #');
          const [cmd, comment] = line.trimStart().startsWith('#') ? ['', line] : hashAt > -1 ? [line.slice(0, hashAt), line.slice(hashAt)] : [line, ''];
          const body = escapeHtml(cmd)
            .replace(/^(\s*)(git|npm|npx|node|cd|ls|mkdir)\b/, '$1<span class="tok-k">$2</span>')
            .replace(/(\s)(--?[\w-]+)/g, '$1<span class="tok-f">$2</span>')
            .replace(/(&quot;.*?&quot;)/g, '<span class="tok-s">$1</span>');
          return body + (comment ? `<span class="tok-c">${escapeHtml(comment)}</span>` : '');
        })
        .join('\n');
    }
    let out = '';
    let match;
    TOKEN_RE.lastIndex = 0;
    while ((match = TOKEN_RE.exec(code))) {
      const [token, comment, string, number, word] = match;
      if (comment) out += `<span class="tok-c">${escapeHtml(comment)}</span>`;
      else if (string) out += `<span class="tok-s">${escapeHtml(string)}</span>`;
      else if (number) out += `<span class="tok-n">${number}</span>`;
      else if (word) {
        if (language === 'js' && JS_KEYWORDS.has(word)) out += `<span class="tok-k">${word}</span>`;
        else if (/^\s*\(/.test(code.slice(TOKEN_RE.lastIndex))) out += `<span class="tok-f">${word}</span>`;
        else out += word;
      } else out += escapeHtml(token);
    }
    return out;
  }

  /** Kódblokk másológombbal. */
  function codeBlock(code, { lang: language = 'js', label } = {}) {
    const name = label || t('code');
    return h('figure', { class: 'code' },
      label ? h('figcaption', { class: 'code-label' }, label) : null,
      h('button', { type: 'button', class: 'copy', 'aria-label': t('copy.aria', { label: name }), onclick: () => copyText(code) }, t('copy')),
      h('pre', {}, h('code', { html: highlight(code, language) })));
  }

  /** "/" billentyűre a keresőbe ugrik, Esc kiüríti. */
  function bindSearchShortcut(input) {
    document.addEventListener('keydown', (event) => {
      const active = document.activeElement;
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(active?.tagName || '') || active?.isContentEditable;
      if (event.key === '/' && !typing && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        input.focus();
        input.select();
      }
    });
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && input.value) {
        input.value = '';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
  }

  /*
   * Füzetvonalak: a sortávolságot és a vonalvastagságot a kijelző képpontjaihoz igazítjuk.
   * Nem egész nagyításnál (pl. 141%) a 32px-es sor nem esik egész képpontra, és a böngésző
   * soronként másképp rajzolná a vékony vonalat. Így minden vonal pontosan egyforma.
   * Eredmény: --ruled (sortáv) és --rule-w (vonalvastagság) a :root-on.
   */
  function snapRuledLines() {
    const dpr = window.devicePixelRatio || 1;
    const line = Math.round(32 * dpr) / dpr;
    const width = Math.max(1, Math.round(1.25 * dpr)) / dpr;
    document.documentElement.style.setProperty('--ruled', `${line.toFixed(4)}px`);
    document.documentElement.style.setProperty('--rule-w', `${width.toFixed(4)}px`);
    return line;
  }
  snapRuledLines();
  window.addEventListener('resize', snapRuledLines);

  /** Ékezet- és kisbetű-független kereséshez. */
  const normalize = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  window.Rika = {
    RAINBOW,
    PALETTE,
    h,
    svg,
    store,
    getLang,
    t,
    tx,
    addStrings,
    applyI18n,
    setLang,
    mulberry32,
    hashString,
    splatterDots,
    mountArt,
    toast,
    copyText,
    downloadBlob,
    isoDate,
    humanDate,
    highlight,
    codeBlock,
    bindSearchShortcut,
    normalize,
    snapRuledLines,
  };
})();
