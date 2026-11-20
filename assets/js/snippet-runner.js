/*
 * Snippet-futtató: a kártyán (vagy kódablakban) lévő kódot és a példát egy külön Web Workerben futtatja,
 * így egy elrontott (pl. végtelen ciklusos) kód sem fagyasztja le az oldalt.
 *
 *  - steps(example):                 a példa szövegéből lépések: { expr, expected }
 *                                    (a várt érték a sor végi // megjegyzés, vagy a következő // sor)
 *  - run(code, steps):               lefuttatja, és visszaadja az eredményeket szövegként
 *  - stepMatches(result, step, logs): egyezik-e a kapott érték (vagy a konzolra írt sorok) a várttal
 */
(() => {
  'use strict';

  /* ---------- a példa felbontása lépésekre ---------- */

  /** Egy sor kód része és a // utáni megjegyzés (a szövegekben lévő // nem számít). */
  function codeSplit(line) {
    let quote = null;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (quote) {
        if (c === '\\') i++;
        else if (c === quote) quote = null;
        continue;
      }
      if (c === "'" || c === '"' || c === '`') quote = c;
      else if (c === '/' && line[i + 1] === '/') return [line.slice(0, i), line.slice(i + 2).trim()];
    }
    return [line, null];
  }

  /** Nyitott zárójelek száma (szövegeken kívül), és hogy épp egy `...` szövegben járunk-e. */
  function openState(text) {
    let depth = 0;
    let quote = null;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (quote) {
        if (c === '\\') i++;
        else if (c === quote) quote = null;
        continue;
      }
      if (c === "'" || c === '"' || c === '`') quote = c;
      else if ('([{'.includes(c)) depth++;
      else if (')]}'.includes(c)) depth--;
    }
    return { depth, inTemplate: quote === '`' };
  }

  function steps(example) {
    const out = [];
    let buffer = '';
    let bufferExpected = null;
    for (const raw of String(example || '').split('\n')) {
      const line = raw.replace(/\s+$/, '');
      if (!buffer && /^\s*\/\//.test(line)) {
        // csak megjegyzés: az előző lépés várt értéke (vagy annak folytatása)
        const text = line.replace(/^\s*\/\/\s?/, '').trim();
        const last = out[out.length - 1];
        if (last && text) {
          if (last.expected == null) {
            last.expected = text;
            last.fromNextLine = true;
          } else if (last.fromNextLine) last.expected += ` ${text}`;
        }
        continue;
      }
      const [code, comment] = codeSplit(line);
      buffer += (buffer ? '\n' : '') + code;
      if (comment) bufferExpected = comment;
      const state = openState(buffer);
      if (state.depth > 0 || state.inTemplate) continue;
      const expr = buffer.trim().replace(/;+\s*$/, '');
      if (expr) out.push({ expr, expected: bufferExpected });
      buffer = '';
      bufferExpected = null;
    }
    if (buffer.trim()) out.push({ expr: buffer.trim().replace(/;+\s*$/, ''), expected: bufferExpected });
    return out;
  }

  /* ---------- érték szöveggé (a workerben fut) ---------- */

  function fmt(value, depth = 0) {
    const type = typeof value;
    if (type === 'string') return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;
    if (type === 'function') return `[Function${value.name ? ` ${value.name}` : ''}]`;
    if (type === 'bigint') return `${value}n`;
    if (type === 'symbol') return value.toString();
    if (value === undefined) return 'undefined';
    if (value === null || type !== 'object') return Object.is(value, -0) ? '-0' : String(value);
    if (depth > 4) return Array.isArray(value) ? '[…]' : '{…}';
    if (Array.isArray(value)) return `[${value.map((item) => fmt(item, depth + 1)).join(', ')}]`;
    if (value instanceof Date) return Number.isNaN(value.getTime()) ? 'Invalid Date' : `Date(${value.toISOString()})`;
    if (value instanceof RegExp) return String(value);
    if (value instanceof Error) return `${value.name}: ${value.message}`;
    if (value instanceof Map) return `Map(${value.size}) { ${[...value].map(([k, v]) => `${fmt(k, depth + 1)} => ${fmt(v, depth + 1)}`).join(', ')} }`;
    if (value instanceof Set) return `Set(${value.size}) { ${[...value].map((v) => fmt(v, depth + 1)).join(', ')} }`;
    if (typeof value.then === 'function') return 'Promise';
    const entries = Object.entries(value);
    if (!entries.length) return '{}';
    // a szám- és sima nevű kulcsok idézőjel nélkül, ahogy a példák is írják
    return `{ ${entries.map(([k, v]) => `${/^(?:[A-Za-z_$][\w$]*|\d+)$/.test(k) ? k : `'${k}'`}: ${fmt(v, depth + 1)}`).join(', ')} }`;
  }

  /*
   * A futtató függvény: a snippet kódja és utána a lépések, egy közös függvénytörzsben.
   * A direkt eval látja a snippet deklarációit, a példa var-jai pedig a következő lépéseket.
   * A __logStep jelzi, melyik lépéshez tartozik egy konzolra írt sor.
   */
  const BODY_TAIL = [
    ';const __out = [];',
    'for (let __i = 0; __i < __exprs.length; __i++) {',
    '  globalThis.__logStep = __i;',
    '  try { __out.push({ ok: true, value: eval(__exprs[__i]) }); }',
    '  catch (__err) { __out.push({ ok: false, error: String((__err && __err.message) || __err) }); }',
    '}',
    'return __out;',
  ].join('\n');

  function buildRunner(code) {
    // eslint-disable-next-line no-new-func
    return new Function('__exprs', `${code}\n${BODY_TAIL}`);
  }

  /** A workerben futó rész (szövegként kerül át a Blob-ba). */
  function workerMain() {
    const PENDING = 'did not settle';
    const timeoutAfter = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error(PENDING)), ms));
    self.onmessage = async (event) => {
      const { id, code, exprs } = event.data;
      const logs = [];
      const log = (...args) => {
        const step = globalThis.__logStep || 0;
        (logs[step] = logs[step] || []).push(args.map((a) => (typeof a === 'string' ? a : fmt(a))).join(' '));
      };
      console.log = log;
      console.info = log;
      console.warn = log;
      console.error = log;
      console.debug = log;
      let results;
      try {
        results = buildRunner(code)(exprs);
      } catch (error) {
        results = exprs.map(() => ({ ok: false, error: String((error && error.message) || error) }));
      }
      for (const result of results) {
        if (result.ok && result.value && typeof result.value.then === 'function') {
          try {
            result.value = await Promise.race([result.value, timeoutAfter(1500)]);
            result.async = true;
          } catch (error) {
            if (String(error && error.message) === PENDING) result.pending = true;
            else {
              result.ok = false;
              result.error = String((error && error.message) || error);
            }
          }
        }
        if (result.ok) result.value = result.pending ? 'Promise { <pending> }' : fmt(result.value);
      }
      // a késleltetett (setTimeout) konzolsorok is beérjenek
      await new Promise((resolve) => setTimeout(resolve, 30));
      self.postMessage({ id, results, logs });
    };
  }

  /* ---------- a worker kezelése (csak böngészőben) ---------- */

  let worker = null;
  let seq = 0;
  const pending = new Map();

  function getWorker() {
    if (worker) return worker;
    const source = [fmt.toString(), `const BODY_TAIL = ${JSON.stringify(BODY_TAIL)};`, buildRunner.toString(), `(${workerMain.toString()})();`].join('\n');
    const url = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
    worker = new Worker(url);
    worker.onmessage = (event) => {
      const done = pending.get(event.data.id);
      if (done) {
        pending.delete(event.data.id);
        done(event.data);
      }
    };
    worker.onerror = (event) => {
      event.preventDefault();
      for (const [, done] of pending) done({ fatal: event.message || 'Error' });
      pending.clear();
    };
    return worker;
  }

  /** Futtatás; végtelen ciklusnál a workert leállítjuk, és legközelebb újat indítunk. */
  function run(code, list, { timeout = 3000 } = {}) {
    const w = getWorker();
    const id = ++seq;
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        pending.delete(id);
        w.terminate();
        if (worker === w) worker = null;
        resolve({ timeout: true });
      }, timeout);
      pending.set(id, (data) => {
        clearTimeout(timer);
        resolve(data);
      });
      // a példa const / let változóiból var lesz, hogy a következő lépés is lássa őket
      w.postMessage({ id, code, exprs: list.map((step) => step.expr.replace(/^(const|let)\s/, 'var ')) });
    });
  }

  /* ---------- összevetés a várt értékkel ---------- */

  const norm = (text) => String(text)
    .replace(/\s+/g, '')
    .replace(/"/g, "'")
    .replace(/,(?=[\]}])/g, '')
    .replace(/;$/, '');
  const unquote = (text) => text.replace(/^'(.*)'$/, '$1');

  function matches(actual, expected) {
    if (expected == null || actual == null) return false;
    const a = norm(actual);
    // a várt érték utáni magyarázat nem számít: "true (Saturday)", "x | megjegyzés"
    const candidates = [expected, expected.replace(/\s*\|.*$/, ''), expected.replace(/\s*\([^()]*\)\s*$/, '')]
      .map(norm)
      .filter(Boolean);
    for (const e of candidates) {
      if (a === e || unquote(a) === unquote(e)) return true;
      // ~1.5708: elég, ha annyi tizedesjegyre egyezik
      const approx = e.match(/^~(-?\d+(?:\.(\d+))?)$/);
      if (approx && a !== '' && Number.isFinite(Number(a))) {
        const digits = (approx[2] || '').length;
        if (Number(a).toFixed(digits) === Number(approx[1]).toFixed(digits)) return true;
      }
    }
    return false;
  }

  /** Egy lépés eredménye egyezik-e: az értéke, vagy ha az nem, a konzolra írt sorai. */
  function stepMatches(result, step, logs) {
    if (!result || !result.ok || step.expected == null) return false;
    if (matches(result.value, step.expected)) return true;
    if (logs && logs.length) {
      const strip = (text) => norm(text).replace(/'/g, '');
      return strip(logs.join(',')) === strip(step.expected) || strip(logs.join('')) === strip(step.expected);
    }
    return false;
  }

  const api = { steps, run, matches, stepMatches, fmt, buildRunner };
  if (typeof window !== 'undefined') window.SnippetRunner = api;
  if (typeof module !== 'undefined') module.exports = api;
})();
