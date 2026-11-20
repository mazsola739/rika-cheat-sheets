/*
 * Az elv-plakátok képei: saját rajzok SVG-ben (400 × 300), "fotós" színátmenetekkel.
 * Minden jelenet egy függvény: (lang) => SVG-jelölés, a kártya id-jével.
 * A közös színátmeneteket (DEFS) az oldal egyszer teszi be a dokumentumba.
 */
(() => {
  'use strict';

  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const f1 = (n) => Math.round(n * 10) / 10;

  /** Mindig ugyanazt a "véletlen" sort adja, így a csillagok nem ugrálnak. */
  const rand = (seed) => () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  const stars = (n, seed, maxY) => {
    const r = rand(seed);
    return range(n).map(() =>
      `<circle cx="${f1(r() * 400)}" cy="${f1(r() * maxY)}" r="${f1(0.5 + r() * 1.2)}" fill="#fff" opacity="${f1(0.35 + r() * 0.6)}"/>`).join('');
  };

  const lin = (id, stops, extra = 'x1="0" y1="0" x2="0" y2="1"') =>
    `<linearGradient id="${id}" ${extra}>${stops.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('')}</linearGradient>`;
  const rad = (id, stops, extra = '') =>
    `<radialGradient id="${id}" ${extra}>${stops.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('')}</radialGradient>`;
  const user = (y1, y2) => `gradientUnits="userSpaceOnUse" x1="0" y1="${y1}" x2="0" y2="${y2}"`;

  const DEFS = [
    lin('ps-dusk', [[0, '#2e3a6b'], [0.45, '#8a6aa6'], [0.8, '#f4a7a1'], [1, '#ffd8a8']]),
    lin('ps-dawn', [[0, '#9cc3e6'], [0.6, '#f3d9d0'], [1, '#fde9d4']]),
    lin('ps-day', [[0, '#4f9bd9'], [0.7, '#a8d3f0'], [1, '#e2f1fa']]),
    lin('ps-night', [[0, '#070b1f'], [0.6, '#1b2850'], [1, '#3b4c80']]),
    lin('ps-desert', [[0, '#e9824a'], [0.55, '#f6b46a'], [1, '#fde3a8']]),
    lin('ps-wall', [[0, '#efe4d2'], [1, '#cdbb9f']]),
    lin('ps-studio', [[0, '#f3eee6'], [1, '#d6cbbb']]),
    lin('ps-indoor', [[0, '#4a3f36'], [1, '#2a231d']]),
    lin('ps-stage', [[0, '#2b1d3a'], [1, '#120c1a']]),
    lin('ps-office', [[0, '#4a5260'], [1, '#2b3038']]),
    lin('ps-deep', [[0, '#5fb0e8'], [0.45, '#1f4f78'], [1, '#0a1a2c']]),
    lin('ps-stone', [[0, '#c9bfb1'], [1, '#8d8275']], 'x1="0" y1="0" x2="1" y2="1"'),
    lin('ps-rock', [[0, '#c27d50'], [1, '#6e3f25']], 'x1="0" y1="0" x2="1" y2="1"'),
    lin('ps-sea', [[0, '#5b8099'], [1, '#27445a']], user(140, 300)),
    lin('ps-sea-dusk', [[0, '#8c7aa8'], [1, '#364670']], user(170, 300)),
    lin('ps-sea-night', [[0, '#22325a'], [1, '#0a1330']], user(210, 300)),
    lin('ps-sand', [[0, '#eedcbd'], [1, '#c9ad84']], user(200, 300)),
    lin('ps-grass', [[0, '#7ea35a'], [1, '#3c5c2c']], user(160, 300)),
    lin('ps-wood', [[0, '#8b5e3c'], [1, '#5e3c24']], user(190, 300)),
    lin('ps-beam', [[0, '#fff3bf', 0.75], [1, '#fff3bf', 0]], 'gradientUnits="userSpaceOnUse" x1="281" y1="0" x2="0" y2="0"'),
    rad('ps-sun', [[0, '#fff7dc'], [0.35, '#ffd9a0', 0.9], [1, '#ffd9a0', 0]]),
    rad('ps-glow', [[0, '#ffb35c', 0.7], [1, '#ffb35c', 0]]),
    rad('ps-lamp', [[0, '#fff3bf', 0.85], [1, '#fff3bf', 0]]),
    rad('ps-vig', [[0.6, '#000', 0], [1, '#000', 0.38]], 'cx=".5" cy=".5" r=".75"'),
  ].join('');

  /* ---------- segédrajzok ---------- */

  const clock = (cx, cy, hour, minute) => {
    const hand = (deg, len) => {
      const a = (deg * Math.PI) / 180;
      return `${f1(cx + len * Math.sin(a))} ${f1(cy - len * Math.cos(a))}`;
    };
    const ticks = range(12).map((i) => {
      const inner = i % 3 === 0 ? 40 : 45;
      return `M${hand(i * 30, inner)}L${hand(i * 30, 51)}`;
    }).join('');
    return `<ellipse cx="${cx + 6}" cy="${cy + 64}" rx="46" ry="5" fill="#000" opacity=".12"/>
      <circle cx="${cx + 4}" cy="${cy + 5}" r="60" fill="#000" opacity=".15"/>
      <circle cx="${cx}" cy="${cy}" r="58" fill="#fffdf8" stroke="#343a40" stroke-width="7"/>
      <path d="${ticks}" stroke="#343a40" stroke-width="3" stroke-linecap="round"/>
      <path d="M${cx} ${cy}L${hand((hour % 12) * 30 + minute / 2, 26)}" stroke="#212529" stroke-width="6" stroke-linecap="round"/>
      <path d="M${cx} ${cy}L${hand(minute * 6, 40)}" stroke="#212529" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${cy}" r="4.5" fill="#c92a2a"/>`;
  };

  const pine = (x, base, height, fill) => `<path d="M${x - height * 0.32} ${base}L${x} ${base - height}L${x + height * 0.32} ${base}Z" fill="${fill}"/>`;

  /* ---------- a jelenetek ---------- */

  const SCENES = {
    'rubber-duck': () => `
      <rect width="400" height="300" fill="url(#ps-dusk)"/>
      <circle cx="292" cy="172" r="72" fill="url(#ps-sun)"/>
      <circle cx="292" cy="172" r="20" fill="#fff4d6"/>
      <rect y="178" width="400" height="122" fill="url(#ps-sea-dusk)"/>
      <path d="M258 190h68M246 202h92M266 216h52M280 232h24" stroke="#ffd8a8" stroke-width="3" stroke-linecap="round" opacity=".6"/>
      <path d="M0 262h60M110 284h80M300 268h70" stroke="#fff" stroke-width="1.5" opacity=".18"/>
      <ellipse cx="148" cy="238" rx="66" ry="7" fill="#1d2140" opacity=".35"/>
      <path d="M100 206L88 180L120 196Z" fill="#fcc419"/>
      <ellipse cx="146" cy="214" rx="52" ry="24" fill="#ffd43b"/>
      <path d="M96 218Q146 252 198 218Q192 236 146 238Q102 236 96 218Z" fill="#f2b705"/>
      <path d="M124 206Q150 190 174 208Q150 222 124 206Z" fill="#fab005"/>
      <circle cx="184" cy="180" r="21" fill="#ffd43b"/>
      <path d="M200 182Q222 177 224 188Q213 197 198 190Z" fill="#f76707"/>
      <circle cx="190" cy="174" r="3.2" fill="#212529"/>
      <circle cx="191" cy="173" r="1" fill="#fff"/>
      <path d="M170 169Q176 162 185 164M110 204Q118 196 130 197" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".65"/>
      <path d="M84 230Q100 224 116 230T148 230T180 230T212 230" stroke="#c9b6e0" stroke-width="2.5" fill="none" opacity=".7"/>`,

    yagni: () => {
      const posts = range(11).map((i) => `M${112 + i * 18} 112V122`).join('');
      const truss = range(13).map((i) => `${i ? 'L' : 'M'}${116 + i * 14} ${i % 2 ? 148 : 131}`).join('');
      return `
      <rect width="400" height="300" fill="url(#ps-day)"/>
      <path d="M0 175L50 140L95 160L150 118L215 158L270 128L330 162L400 136V300H0Z" fill="#a9bccb"/>
      <path d="M0 205L60 182L130 198L210 176L290 196L360 180L400 190V300H0Z" fill="#c98e63"/>
      <path d="M0 240Q200 222 400 236V300H0Z" fill="#8f5536"/>
      <path d="M170 300Q215 262 268 250Q320 242 400 246V254Q326 252 280 260Q236 270 204 300Z" fill="#6aa5c8"/>
      <rect x="196" y="148" width="10" height="100" fill="#4a4d52"/>
      <path d="M0 128H122Q132 190 120 300H0Z" fill="url(#ps-rock)"/>
      <path d="M20 150L60 160M30 190L90 196M12 232L70 242M50 270L104 276" stroke="#5e331d" stroke-width="2" opacity=".5"/>
      <rect x="104" y="122" width="190" height="9" fill="#3f4246"/>
      <path d="M104 112H294${posts}" stroke="#3f4246" stroke-width="2.5" fill="none"/>
      <path d="${truss}M116 148H284" stroke="#3f4246" stroke-width="2.5" fill="none"/>
      <path d="M294 122l5 2-3 3 4 3-6 1" stroke="#3f4246" stroke-width="2" fill="none"/>`;
    },

    dry: () => `
      <rect width="400" height="300" fill="url(#ps-desert)"/>
      <circle cx="300" cy="118" r="84" fill="url(#ps-sun)"/>
      <circle cx="300" cy="118" r="30" fill="#fff1c4"/>
      <path d="M0 196Q70 168 150 190T300 182T400 176V300H0Z" fill="#e6ad6a"/>
      <path d="M0 236Q110 206 220 232T400 226V300H0Z" fill="#d2914e"/>
      <path d="M30 272Q120 252 210 270M260 262Q320 250 390 258" stroke="#b97a3c" stroke-width="2" fill="none" opacity=".6"/>
      <ellipse cx="230" cy="248" rx="64" ry="8" fill="#9c6a35" opacity=".45"/>
      <rect x="168" y="204" width="64" height="42" rx="4" fill="#a08670"/>
      <path d="M168 218H232M168 232H232M186 204V218M210 204V218M178 218V232M198 218V232M220 218V232M188 232V246M210 232V246" stroke="#7a604b" stroke-width="2"/>
      <ellipse cx="200" cy="204" rx="32" ry="6" fill="#4d3c2f"/>
      <path d="M174 204V152M226 204V152" stroke="#5b3a24" stroke-width="6" stroke-linecap="round"/>
      <path d="M158 156L200 126L242 156Z" fill="#7a4a2a"/>
      <path d="M158 156L200 126L200 156Z" fill="#8f5a35"/>
      <path d="M172 162H228" stroke="#5b3a24" stroke-width="4"/>
      <path d="M200 162V180" stroke="#3d2a1c" stroke-width="2"/>
      <path d="M191 180H209L206 195H194Z" fill="#6c757d"/>`,

    aha: () => {
      const signs = [[112, -14], [124, 194], [140, 20], [154, 166], [170, -34], [184, 208], [198, 6]];
      const boards = signs.map(([y, a]) => `<g transform="translate(199 ${y}) rotate(${a})">
        <path d="M4 -9H74L86 0L74 9H4Z" fill="#f4e6c8" stroke="#6b4a2f" stroke-width="2"/>
        <path d="M16 0H62" stroke="#a07850" stroke-width="2.5" stroke-linecap="round"/></g>`).join('');
      return `
      <rect width="400" height="300" fill="url(#ps-dawn)"/>
      <path d="M0 214Q200 196 400 212V300H0Z" fill="url(#ps-grass)"/>
      <path d="M150 300L196 208H206L262 300Z" fill="#cdb995"/>
      <ellipse cx="202" cy="266" rx="26" ry="4" fill="#2f4a22" opacity=".45"/>
      <rect x="194" y="96" width="10" height="170" rx="2" fill="#6b4a2f"/>
      ${boards}
      <path d="M192 96L199 88L206 96Z" fill="#5a3d26"/>`;
    },

    'boy-scout': () => {
      const r = rand(77);
      const trees = range(18).map((i) => pine(-6 + i * 24 + r() * 8, 216, 40 + r() * 46, '#0e1822')).join('');
      return `
      <rect width="400" height="300" fill="url(#ps-night)"/>
      ${stars(45, 11, 150)}
      ${trees}
      <path d="M0 214Q200 204 400 214V300H0Z" fill="#1d2a20"/>
      <circle cx="268" cy="236" r="100" fill="url(#ps-glow)"/>
      <path d="M52 248L118 160L184 248Z" fill="#d9822b"/>
      <path d="M118 160L184 248H168L118 172Z" fill="#b2621a"/>
      <path d="M118 160L100 248H136Z" fill="#6f3810"/>
      <path d="M216 186L196 244" stroke="#8d6e4c" stroke-width="4" stroke-linecap="round"/>
      <path d="M188 242H204L208 262H182Z" fill="#e0c068"/>
      <path d="M190 252L192 262M196 252V262M202 252L204 262" stroke="#b8963c" stroke-width="1.5"/>
      <ellipse cx="236" cy="256" rx="8" ry="4" fill="#6c6f73"/><ellipse cx="300" cy="256" rx="8" ry="4" fill="#6c6f73"/><ellipse cx="268" cy="260" rx="9" ry="4" fill="#5c5f63"/>
      <path d="M240 254L298 240M240 240L298 254" stroke="#5b3a24" stroke-width="8" stroke-linecap="round"/>
      <path d="M268 246Q240 222 256 196Q260 214 270 208Q264 188 278 172Q300 204 288 226Q296 214 296 204Q312 232 268 246Z" fill="#ff8c2b"/>
      <path d="M270 244Q256 228 266 212Q270 222 276 218Q276 206 284 198Q294 222 284 236Q280 244 270 244Z" fill="#ffd43b"/>
      <circle cx="262" cy="166" r="1.8" fill="#ffc078"/><circle cx="282" cy="150" r="1.4" fill="#ffc078"/><circle cx="274" cy="134" r="1.2" fill="#ffc078" opacity=".7"/>`;
    },

    'premature-optimization': () => `
      <rect width="400" height="300" fill="url(#ps-day)"/>
      <rect x="250" y="118" width="150" height="82" fill="#d6cfc3"/>
      <rect x="262" y="130" width="126" height="20" fill="#e03131"/>
      <path d="M276 140H374" stroke="#fff" stroke-width="5" stroke-dasharray="14 8" opacity=".85"/>
      <rect x="270" y="162" width="44" height="38" fill="#9fc5e0"/><rect x="330" y="162" width="52" height="38" fill="#9fc5e0"/>
      <rect y="198" width="400" height="102" fill="#6b6e73"/>
      <path d="M40 300L90 198M140 300L160 198M240 300L230 198M340 300L300 198" stroke="#e9ecef" stroke-width="3" opacity=".55"/>
      <path d="M14 196H66M6 210H56M22 224H74" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".75"/>
      <ellipse cx="206" cy="250" rx="66" ry="5" fill="#000" opacity=".25"/>
      <path d="M92 200H158Q176 207 158 214H92Z" fill="#e9ecef" stroke="#495057" stroke-width="2"/>
      <path d="M100 200L90 189H108L115 200ZM100 214L90 225H108L115 214Z" fill="#e03131"/>
      <path d="M92 200Q50 207 92 214Q74 207 92 200Z" fill="#ff922b"/>
      <path d="M92 203Q72 207 92 211Z" fill="#ffe066"/>
      <path d="M150 160H262L250 214H164Z" fill="none" stroke="#ced4da" stroke-width="4" stroke-linejoin="round"/>
      <path d="M172 160L176 214M194 160L196 214M216 160V214M238 160L234 214M153 178H258M157 196H254" stroke="#ced4da" stroke-width="2"/>
      <path d="M150 160L134 148H120" stroke="#ced4da" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M164 214L160 232H252" stroke="#868e96" stroke-width="4" fill="none"/>
      <circle cx="168" cy="240" r="7.5" fill="#343a40"/><circle cx="246" cy="240" r="7.5" fill="#343a40"/>`,

    srp: () => `
      <rect width="400" height="300" fill="url(#ps-night)"/>
      ${stars(40, 5, 170)}
      <circle cx="70" cy="58" r="14" fill="#f1f3f5" opacity=".92"/>
      <path d="M281 108L0 62L0 158Z" fill="url(#ps-beam)"/>
      <rect y="214" width="400" height="86" fill="url(#ps-sea-night)"/>
      <path d="M40 236H120M160 252H230M30 272H90M300 264H380" stroke="#8aa2d6" stroke-width="1.5" opacity=".35"/>
      <path d="M200 254Q236 214 296 218Q342 222 368 254Q300 264 200 254Z" fill="#23262d"/>
      <path d="M264 222L271 120H291L298 222Z" fill="#f1f3f5"/>
      <path d="M266 196L267.6 174H294.4L296 196Z" fill="#e03131"/>
      <path d="M269 152L270 138H292L293 152Z" fill="#e03131"/>
      <path d="M284 120H291L298 222H289Z" fill="#000" opacity=".12"/>
      <rect x="264" y="116" width="34" height="5" fill="#343a40"/>
      <circle cx="281" cy="108" r="32" fill="url(#ps-lamp)"/>
      <rect x="270" y="100" width="22" height="16" fill="#ffe066"/>
      <path d="M275 100V116M281 100V116M287 100V116" stroke="#495057" stroke-width="1.2"/>
      <path d="M266 100L281 86L296 100Z" fill="#c92a2a"/>
      <rect x="277" y="206" width="8" height="14" rx="1" fill="#495057"/>
      <path d="M268 232H294M272 244H290M276 256H286" stroke="#ffe066" stroke-width="2" opacity=".5"/>`,

    ocp: () => `
      <rect width="400" height="300" fill="url(#ps-dusk)"/>
      <circle cx="90" cy="200" r="84" fill="url(#ps-sun)"/>
      <circle cx="90" cy="200" r="24" fill="#fff1d0"/>
      <path d="M0 252Q200 176 400 252V300H0Z" fill="#2e3a24"/>
      <path d="M196 216Q202 180 197 150Q195 132 199 112" stroke="#22190f" stroke-width="10" fill="none" stroke-linecap="round"/>
      <path d="M198 168Q176 152 156 150M199 156Q224 140 246 138M197 136Q184 120 168 110M199 128Q214 110 232 104" stroke="#22190f" stroke-width="5" fill="none" stroke-linecap="round"/>
      <g fill="#26331d">
        <circle cx="154" cy="146" r="20"/><circle cx="170" cy="126" r="22"/><circle cx="246" cy="132" r="22"/>
        <circle cx="230" cy="100" r="20"/><circle cx="200" cy="102" r="27"/><circle cx="184" cy="92" r="20"/>
        <circle cx="214" cy="86" r="19"/><circle cx="148" cy="128" r="15"/><circle cx="264" cy="118" r="16"/>
      </g>
      <path d="M198 188Q228 180 258 166" stroke="#8ce99a" stroke-width="4" fill="none" stroke-linecap="round"/>
      <g fill="#69db7c">
        <ellipse cx="228" cy="176" rx="9" ry="4" transform="rotate(-40 228 176)"/>
        <ellipse cx="244" cy="166" rx="9" ry="4" transform="rotate(30 244 166)"/>
        <ellipse cx="260" cy="160" rx="10" ry="4.5" transform="rotate(-20 260 160)"/>
        <ellipse cx="214" cy="190" rx="8" ry="3.5" transform="rotate(25 214 190)"/>
      </g>`,

    lsp: () => `
      <rect width="400" height="300" fill="url(#ps-dawn)"/>
      <rect y="190" width="400" height="110" fill="url(#ps-sea)"/>
      <path d="M0 212H70M120 230H200M290 220H380M40 262H130M250 278H340" stroke="#fff" stroke-width="1.5" opacity=".25"/>
      <path d="M300 190L318 168L332 178L344 160L366 190Z" fill="#e7f5ff"/>
      <path d="M104 238Q116 214 200 212Q288 210 302 238Q250 250 200 248Q140 250 104 238Z" fill="#f1f8fd"/>
      <path d="M104 238Q200 256 302 238L298 250Q200 268 108 250Z" fill="#9fd0f2"/>
      <path d="M70 70q8-7 15 0q7-7 15 0M120 52q6-5 11 0q5-5 11 0M160 82q7-6 13 0q6-6 13 0" stroke="#343a40" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <ellipse cx="200" cy="232" rx="30" ry="5" fill="#7fb4d8" opacity=".6"/>
      <ellipse cx="200" cy="196" rx="21" ry="32" fill="#212529"/>
      <ellipse cx="195" cy="203" rx="13" ry="23" fill="#f8f9fa"/>
      <circle cx="196" cy="160" r="14" fill="#212529"/>
      <circle cx="190" cy="156" r="3.4" fill="#fff"/><circle cx="189.4" cy="155.4" r="1.6" fill="#212529"/>
      <path d="M184 160L169 151L183 166Z" fill="#f59f00"/>
      <path d="M218 186Q232 200 226 214M182 186Q170 196 172 210" stroke="#212529" stroke-width="7" fill="none" stroke-linecap="round"/>
      <ellipse cx="190" cy="228" rx="7" ry="3" fill="#f59f00"/><ellipse cx="208" cy="228" rx="7" ry="3" fill="#f59f00"/>`,

    isp: () => {
      const colors = ['#868e96', '#adb5bd', '#4dabf7', '#ffd43b', '#69db7c', '#f783ac', '#ced4da'];
      const buttons = range(80).map((i) => {
        const col = i % 16;
        const row = Math.floor(i / 16);
        return `<rect x="${140 + col * 10}" y="${212 + row * 9}" width="7" height="5" rx="1.5" fill="${colors[(i * 5 + row) % colors.length]}"/>`;
      }).join('');
      return `
      <rect width="400" height="300" fill="url(#ps-indoor)"/>
      <circle cx="320" cy="60" r="150" fill="url(#ps-lamp)" opacity=".35"/>
      <rect y="196" width="400" height="104" fill="url(#ps-wood)"/>
      <path d="M0 214Q100 210 200 216T400 212M0 246Q120 240 240 248T400 244M0 278Q150 270 260 282T400 276" stroke="#4a2f1b" stroke-width="1.5" fill="none" opacity=".6"/>
      <g transform="rotate(-8 200 230)">
        <ellipse cx="206" cy="264" rx="106" ry="8" fill="#000" opacity=".3"/>
        <rect x="100" y="198" width="208" height="62" rx="18" fill="#2b2d31"/>
        <rect x="108" y="201" width="192" height="6" rx="3" fill="#3d4046"/>
        <circle cx="122" cy="229" r="9" fill="#e03131"/>
        <circle cx="120" cy="226" r="3" fill="#fff" opacity=".35"/>
        ${buttons}
      </g>`;
    },

    dip: () => `
      <rect width="400" height="300" fill="url(#ps-wall)"/>
      <rect y="246" width="400" height="54" fill="url(#ps-wood)"/>
      <rect y="238" width="400" height="9" fill="#f8f1e4"/>
      <circle cx="120" cy="116" r="126" fill="url(#ps-lamp)"/>
      <path d="M120 242V112" stroke="#343a40" stroke-width="5"/>
      <ellipse cx="120" cy="246" rx="26" ry="6" fill="#343a40"/>
      <path d="M84 112H156L141 64H99Z" fill="#ffe8a3"/>
      <path d="M120 64L141 64L156 112H128Z" fill="#f2d27a"/>
      <rect x="290" y="172" width="44" height="62" rx="7" fill="#f8f9fa" stroke="#ced4da" stroke-width="2"/>
      <circle cx="306" cy="192" r="3.5" fill="#495057"/><circle cx="318" cy="192" r="3.5" fill="#495057"/>
      <rect x="300" y="206" width="24" height="18" rx="5" fill="#212529"/>
      <path d="M312 224Q312 256 270 258Q190 262 128 250" stroke="#212529" stroke-width="3.5" fill="none"/>`,

    soc: () => `
      <rect width="400" height="150" fill="url(#ps-dawn)"/>
      <circle cx="300" cy="132" r="50" fill="url(#ps-sun)"/>
      <rect y="140" width="400" height="74" fill="url(#ps-sea)"/>
      <path d="M0 160H90M140 172H260M300 158H390M30 190H150M220 198H340" stroke="#fff" stroke-width="1.5" opacity=".22"/>
      <rect y="206" width="400" height="94" fill="url(#ps-sand)"/>
      <path d="M0 216Q50 226 100 216T200 218T300 214T400 218" stroke="#d2be98" stroke-width="5" fill="none" opacity=".8"/>
      <path d="M0 210Q40 200 80 210T160 210T240 210T320 210T400 210" stroke="#fff" stroke-width="5" fill="none" opacity=".88"/>
      <path d="M90 70q7-6 13 0q6-6 13 0M130 54q5-4 9 0q4-4 9 0" stroke="#5c6b7a" stroke-width="2" fill="none" stroke-linecap="round"/>`,

    composition: () => {
      const stones = [[200, 252, 50, 16, '#6f726e'], [197, 226, 38, 13, '#a2a49f'], [203, 204, 29, 11, '#7c7f7a'], [198, 186, 21, 9, '#b3b4ae'], [201, 170, 14, 7.5, '#8d8f8a'], [199, 158, 8, 5, '#c4c4bd']];
      return `
      <rect width="400" height="300" fill="url(#ps-dawn)"/>
      <rect y="150" width="400" height="60" fill="url(#ps-sea)"/>
      <rect y="204" width="400" height="96" fill="url(#ps-sand)"/>
      <path d="M0 206Q50 198 100 206T200 206T300 206T400 206" stroke="#fff" stroke-width="4" fill="none" opacity=".8"/>
      <ellipse cx="218" cy="266" rx="84" ry="10" fill="#8f7a5c" opacity=".35"/>
      ${stones.map(([x, y, rx, ry, c]) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${c}"/>
        <ellipse cx="${f1(x - rx * 0.3)}" cy="${f1(y - ry * 0.35)}" rx="${f1(rx * 0.45)}" ry="${f1(ry * 0.32)}" fill="#fff" opacity=".18"/>`).join('')}`;
    },

    demeter: () => {
      const n = 17;
      const links = range(n).map((k) => {
        const t = k / (n - 1);
        const x = (1 - t) ** 2 * 104 + 2 * (1 - t) * t * 116 + t * t * 228;
        const y = (1 - t) ** 2 * -10 + 2 * (1 - t) * t * 140 + t * t * 228;
        const dx = 2 * (1 - t) * (116 - 104) + 2 * t * (228 - 116);
        const dy = 2 * (1 - t) * (140 + 10) + 2 * t * (228 - 140);
        const a = (Math.atan2(dy, dx) * 180) / Math.PI;
        return `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="9" ry="${k % 2 ? 2.2 : 5}" transform="rotate(${f1(a)} ${f1(x)} ${f1(y)})"/>`;
      }).join('');
      return `
      <rect width="400" height="300" fill="url(#ps-deep)"/>
      <path d="M60 0H100L40 300H0ZM170 0H200L190 300H140ZM290 0H330L380 300H320Z" fill="#fff" opacity=".07"/>
      <path d="M0 8Q25 2 50 8T100 8T150 8T200 8T250 8T300 8T350 8T400 8" stroke="#d0ebff" stroke-width="3" fill="none" opacity=".6"/>
      <g fill="none" stroke="#adb5bd" stroke-width="3">${links}</g>
      <circle cx="228" cy="236" r="6" stroke="#adb5bd" stroke-width="3.5" fill="none"/>
      <path d="M228 242V286M214 252H242M200 268Q206 290 228 288Q250 290 256 268" stroke="#adb5bd" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M194 262L200 272L207 264ZM262 262L256 272L249 264Z" fill="#adb5bd"/>
      <g fill="none" stroke="#d0ebff" stroke-width="1.5" opacity=".7"><circle cx="150" cy="120" r="3"/><circle cx="158" cy="96" r="2"/><circle cx="146" cy="74" r="2.5"/><circle cx="262" cy="214" r="3"/><circle cx="270" cy="190" r="2"/></g>
      <path d="M0 290Q100 280 200 292T400 288V300H0Z" fill="#081321"/>`;
    },

    pola: (lang) => `
      <rect width="400" height="300" fill="url(#ps-wall)"/>
      <circle cx="80" cy="40" r="120" fill="url(#ps-lamp)" opacity=".5"/>
      <rect y="268" width="400" height="32" fill="url(#ps-wood)"/>
      <rect x="132" y="40" width="136" height="232" fill="#5b3a24"/>
      <rect x="140" y="48" width="120" height="224" fill="#a8693b"/>
      <rect x="152" y="64" width="96" height="70" rx="3" fill="none" stroke="#8a5530" stroke-width="3"/>
      <rect x="152" y="150" width="96" height="104" rx="3" fill="none" stroke="#8a5530" stroke-width="3"/>
      <rect x="162" y="86" width="76" height="28" rx="3" fill="#f8f9fa" stroke="#adb5bd"/>
      <text x="200" y="106" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="16" letter-spacing="1" fill="#c92a2a">${lang === 'hu' ? 'TOLNI' : 'PUSH'}</text>
      <path d="M243 170V220" stroke="#6e4022" stroke-width="4" opacity=".45"/>
      <path d="M232 168H241M232 218H241" stroke="#adb5bd" stroke-width="4"/>
      <path d="M238 166V220" stroke="#e9ecef" stroke-width="8" stroke-linecap="round"/>
      <ellipse cx="200" cy="274" rx="80" ry="4" fill="#000" opacity=".18"/>`,

    ssot: () => `
      <rect width="400" height="300" fill="url(#ps-wall)"/>
      <rect y="262" width="400" height="38" fill="url(#ps-wood)"/>
      ${clock(124, 136, 10, 10)}
      ${clock(276, 136, 3, 40)}`,

    'fail-fast': () => `
      <rect width="400" height="122" fill="url(#ps-day)"/>
      <rect y="120" width="400" height="180" fill="url(#ps-deep)"/>
      <path d="M150 122L246 122L306 176L290 250L214 288L130 262L104 186Z" fill="#cfe8fb" opacity=".45"/>
      <path d="M150 122L104 186L130 262L170 232L190 160Z" fill="#fff" opacity=".12"/>
      <path d="M164 122L186 88L198 98L214 70L230 96L244 122Z" fill="#f8fbff"/>
      <path d="M214 70L230 96L244 122H212Z" fill="#d0e7f8"/>
      <path d="M0 122H400" stroke="#e7f5ff" stroke-width="2" opacity=".85"/>
      <path d="M318 108H372L364 121H326Z" fill="#343a40"/>
      <rect x="334" y="96" width="24" height="12" fill="#f1f3f5"/>
      <rect x="346" y="84" width="6" height="12" fill="#e03131"/>
      <circle cx="356" cy="76" r="5" fill="#dee2e6" opacity=".8"/><circle cx="364" cy="68" r="6" fill="#dee2e6" opacity=".6"/>`,

    convention: () => {
      const dash = [[166, 174], [182, 194], [204, 220], [234, 256], [272, 300]].map(([y1, y2]) => {
        const w = (y) => 1 + ((y - 160) / 140) * 7;
        return `M${f1(200 - w(y1) / 2)} ${y1}H${f1(200 + w(y1) / 2)}L${f1(200 + w(y2) / 2)} ${y2}H${f1(200 - w(y2) / 2)}Z`;
      }).join('');
      return `
      <rect width="400" height="300" fill="url(#ps-day)"/>
      <path d="M0 170L80 150L160 166L250 146L330 162L400 152V300H0Z" fill="#9fb59a"/>
      <rect y="160" width="400" height="140" fill="url(#ps-grass)"/>
      <circle cx="60" cy="186" r="12" fill="#2f5524"/><rect x="58" y="194" width="4" height="12" fill="#4a3424"/>
      <circle cx="350" cy="190" r="14" fill="#2f5524"/><rect x="348" y="200" width="4" height="14" fill="#4a3424"/>
      <path d="M186 160H214L370 300H30Z" fill="#4a4e54"/>
      <path d="M188 160L44 300M212 160L356 300" stroke="#f1f3f5" stroke-width="3"/>
      <path d="${dash}" fill="#ffd43b"/>
      <rect x="214" y="181" width="11" height="7" rx="1.5" fill="#1c7ed6"/>
      <ellipse cx="252" cy="262" rx="30" ry="4" fill="#000" opacity=".3"/>
      <rect x="230" y="226" width="44" height="30" rx="7" fill="#e03131"/>
      <rect x="236" y="214" width="32" height="16" rx="5" fill="#c92a2a"/>
      <rect x="239" y="217" width="26" height="10" rx="3" fill="#a5d8ff"/>
      <rect x="233" y="236" width="8" height="5" rx="1" fill="#ffd8a8"/><rect x="263" y="236" width="8" height="5" rx="1" fill="#ffd8a8"/>
      <rect x="232" y="254" width="9" height="8" rx="2" fill="#212529"/><rect x="263" y="254" width="9" height="8" rx="2" fill="#212529"/>`;
    },

    'progressive-enhancement': () => {
      const rise = 180 / 13;
      const steps = range(13).map((k) => `h20v${f1(-rise)}`).join('');
      const edges = range(13).map((k) => `M${40 + 20 * k} ${f1(268 - rise * k)}h20`).join('');
      return `
      <rect width="400" height="300" fill="url(#ps-wall)"/>
      <rect y="268" width="400" height="32" fill="#bdb3a3"/>
      <rect x="300" y="88" width="100" height="12" fill="#9c9284"/>
      <path d="M40 268${steps}H330V112L84 286H40Z" fill="#9aa1a8"/>
      <path d="${edges}" stroke="#ffd43b" stroke-width="2.5"/>
      <path d="M28 238L290 56Q302 48 314 52V64L40 250Z" fill="#d0ebff" opacity=".35"/>
      <path d="M28 238L290 56Q302 48 316 54" stroke="#212529" stroke-width="9" fill="none" stroke-linecap="round"/>
      <g stroke="#343a40" stroke-width="5" stroke-linecap="round" fill="none">
        <path d="M193 140L190 164L182 178M190 164L202 172L203 180M193 146L182 158M193 146L204 156"/>
      </g>
      <circle cx="195" cy="130" r="8.5" fill="#343a40"/>
      <path d="M66 268L80 234L94 268Z" fill="#ffd43b" stroke="#343a40" stroke-width="2"/>
      <path d="M80 245V256M80 261V262" stroke="#343a40" stroke-width="3" stroke-linecap="round"/>`;
    },

    'mobile-first': () => {
      const pad = (cs, dark, light) => cs.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${dark}"/>`).join('')
        + cs.map(([x, y, r]) => `<circle cx="${x - r * 0.25}" cy="${y - r * 0.3}" r="${f1(r * 0.55)}" fill="${light}"/>`).join('');
      return `
      <rect width="400" height="300" fill="url(#ps-studio)"/>
      <circle cx="200" cy="120" r="150" fill="#fff" opacity=".35"/>
      <rect y="246" width="400" height="54" fill="#cdbfaa"/>
      <path d="M0 246H400" stroke="#b5a78f" stroke-width="2"/>
      <ellipse cx="200" cy="268" rx="84" ry="6" fill="#000" opacity=".2"/>
      <path d="M196 220Q176 196 196 182Q218 168 202 146Q192 132 206 116" stroke="#5b3a24" stroke-width="11" fill="none" stroke-linecap="round"/>
      <path d="M196 184Q170 176 150 170M204 150Q232 140 252 138M204 124Q190 108 176 102" stroke="#5b3a24" stroke-width="5" fill="none" stroke-linecap="round"/>
      ${pad([[138, 166, 14], [152, 159, 16], [167, 166, 13], [151, 172, 12]], '#2b8a3e', '#51cf66')}
      ${pad([[240, 136, 14], [256, 128, 17], [272, 136, 13], [256, 142, 12]], '#2b8a3e', '#51cf66')}
      ${pad([[176, 100, 13], [192, 92, 17], [208, 99, 14], [192, 106, 12]], '#2b8a3e', '#51cf66')}
      <ellipse cx="200" cy="221" rx="66" ry="4" fill="#4a3424"/>
      <rect x="128" y="217" width="144" height="12" rx="3" fill="#8f5a37"/>
      <path d="M136 229H264L252 262H148Z" fill="#7b4b2e"/>
      <rect x="156" y="262" width="12" height="5" fill="#5e3a22"/><rect x="232" y="262" width="12" height="5" fill="#5e3a22"/>`;
    },

    immutability: () => {
      const r = rand(42);
      const specks = range(70).map(() => `<circle cx="${f1(r() * 400)}" cy="${f1(r() * 300)}" r="${f1(0.8 + r() * 1.8)}" fill="#6f6559" opacity="${f1(0.15 + r() * 0.25)}"/>`).join('');
      const cx = 200;
      const cy = 150;
      const turns = 14.1;
      const k = Math.log(90 / 6) / turns;
      const at = (th) => {
        const rr = 90 * Math.exp(-k * th);
        return [cx + rr * Math.cos(-th), cy + rr * Math.sin(-th)];
      };
      const spiral = range(240).map((i) => {
        const [x, y] = at((i / 239) * turns);
        return `${i ? 'L' : 'M'}${f1(x)} ${f1(y)}`;
      }).join('');
      const ribs = range(38).map((i) => {
        const th = i * 0.22;
        const [x1, y1] = at(th);
        const [x2, y2] = at(th + Math.PI * 2);
        return `M${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}`;
      }).join('');
      return `
      <rect width="400" height="300" fill="url(#ps-stone)"/>
      ${specks}
      <path d="M0 60L60 74L96 66M300 0L312 40L340 52M330 300L352 250L400 240M0 250L40 236" stroke="#6f6559" stroke-width="1.5" fill="none" opacity=".6"/>
      <circle cx="${cx}" cy="${cy}" r="97" fill="#9c8f7c"/>
      <circle cx="${cx + 3}" cy="${cy + 3}" r="96" fill="none" stroke="#e2d9cb" stroke-width="3" opacity=".5"/>
      <circle cx="${cx}" cy="${cy}" r="90" fill="#cbbda6"/>
      <path d="${ribs}" stroke="#8a7b66" stroke-width="2" opacity=".85"/>
      <path d="${spiral}" stroke="#5e5043" stroke-width="3" fill="none"/>
      <circle cx="${cx}" cy="${cy}" r="5" fill="#8a7b66"/>`;
    },

    'pure-functions': () => {
      const far = 'M0 160L40 126L90 140L130 112L180 138L230 108L290 134L340 116L400 140V160Z';
      const near = 'M0 160L58 104L96 128L150 70L206 122L262 84L318 126L360 100L400 132V160Z';
      const snow = 'M150 70L136 85L146 83L154 91L163 82ZM262 84L250 97L258 95L266 102L274 96Z';
      const range3 = `<path d="${far}" fill="#a9b7c6"/><path d="${near}" fill="#6d7d8f"/><path d="${snow}" fill="#f8f9fa"/>`;
      return `
      <rect width="400" height="160" fill="url(#ps-dawn)"/>
      <g transform="translate(0 320) scale(1 -1)"><rect width="400" height="160" fill="url(#ps-dawn)"/></g>
      ${range3}
      <g transform="translate(0 320) scale(1 -1)" opacity=".62">${range3}</g>
      <rect y="160" width="400" height="140" fill="#5c7c99" opacity=".2"/>
      <path d="M0 160H400" stroke="#fff" stroke-width="1" opacity=".55"/>
      <path d="M40 240H90M150 262H230M290 246H350M80 284H140" stroke="#fff" stroke-width="1.5" opacity=".22"/>`;
    },
    kiss: () => `
      <rect width="400" height="300" fill="url(#ps-day)"/>
      <g fill="#fff" opacity=".92"><ellipse cx="80" cy="226" rx="74" ry="22"/><circle cx="58" cy="210" r="24"/><circle cx="98" cy="202" r="31"/></g>
      <g fill="#fff" opacity=".82"><ellipse cx="322" cy="256" rx="92" ry="24"/><circle cx="300" cy="240" r="26"/><circle cx="342" cy="232" r="33"/></g>
      <g fill="#fff" opacity=".7"><ellipse cx="320" cy="64" rx="48" ry="12"/><circle cx="306" cy="56" r="14"/><circle cx="330" cy="51" r="18"/></g>
      <path d="M36 176Q100 96 160 142T248 122" stroke="#fff" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round" fill="none" opacity=".9"/>
      <g transform="translate(300 112) rotate(-14)">
        <path d="M60 0L-44 -4L-38 8Z" fill="#e9ecef"/>
        <path d="M60 0L-38 8L-30 25Z" fill="#c3cad1"/>
        <path d="M60 0L-52 -18L-38 8Z" fill="#fff"/>
        <path d="M60 0L-38 8" stroke="#adb5bd" stroke-width="1.4"/>
      </g>
      <path d="M220 136h-26M226 150h-18M214 122h-14" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".8"/>`,

    'magic-numbers': () => {
      const sparkle = (x, y, s) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -8L2 -2L8 0L2 2L0 8L-2 2L-8 0L-2 -2Z" fill="#fff"/>`;
      return `
      <rect width="400" height="300" fill="url(#ps-stage)"/>
      <path d="M200 0L118 262H282Z" fill="#fff3bf" opacity=".12"/>
      <rect y="252" width="400" height="48" fill="#3b2a1f"/>
      <path d="M0 252H400" stroke="#5c4330" stroke-width="3"/>
      <ellipse cx="200" cy="256" rx="96" ry="12" fill="url(#ps-lamp)" opacity=".7"/>
      <path d="M0 0H72Q60 80 78 160Q62 230 86 300H0Z" fill="#8f1d2c"/>
      <path d="M400 0H328Q340 80 322 160Q338 230 314 300H400Z" fill="#8f1d2c"/>
      <path d="M30 0Q22 120 40 300M356 0Q366 120 352 300" stroke="#6b1220" stroke-width="5" fill="none"/>
      <path d="M0 0H400V26Q350 42 300 26Q250 42 200 26Q150 42 100 26Q50 42 0 26Z" fill="#a61e2f"/>
      <ellipse cx="200" cy="247" rx="56" ry="10" fill="#111"/>
      <rect x="166" y="196" width="68" height="50" fill="#1b1b1d"/>
      <rect x="166" y="230" width="68" height="8" fill="#c92a2a"/>
      <ellipse cx="200" cy="196" rx="34" ry="7.5" fill="#000" stroke="#3a3a3d" stroke-width="2.5"/>
      <path d="M252 214L300 182" stroke="#111" stroke-width="6" stroke-linecap="round"/>
      <path d="M292 187L300 182" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
      <g font-family="Georgia, 'Times New Roman', serif" fill="#ffe066" text-anchor="middle">
        <text x="200" y="160" font-size="44" font-weight="700">42</text>
        <text x="146" y="124" font-size="26" transform="rotate(-12 146 124)">18</text>
        <text x="256" y="116" font-size="22" transform="rotate(10 256 116)">0.73</text>
        <text x="190" y="78" font-size="17" opacity=".8">86400</text>
        <text x="270" y="160" font-size="28" transform="rotate(14 270 160)">7</text>
      </g>
      ${sparkle(120, 160, 1)}${sparkle(300, 90, 0.8)}${sparkle(236, 60, 0.6)}${sparkle(160, 60, 0.7)}${sparkle(306, 176, 1.1)}`;
    },

    'self-documenting': (lang) => {
      const labels = lang === 'hu' ? ['CUKOR', 'LISZT', 'FAHÉJ'] : ['SUGAR', 'FLOUR', 'CINNAMON'];
      const jars = [[95, '#c92a2a', '#fff'], [200, '#1c7ed6', '#f1e6d0'], [305, '#2f9e44', '#b5651d']].map(([x, lid, fill], i) => `
        <rect x="${x - 30}" y="108" width="60" height="14" rx="3" fill="${lid}"/>
        <rect x="${x - 38}" y="120" width="76" height="86" rx="14" fill="#e7f5ff" opacity=".55" stroke="#adb5bd" stroke-width="2"/>
        <rect x="${x - 34}" y="150" width="68" height="52" rx="10" fill="${fill}"/>
        <rect x="${x - 30}" y="130" width="60" height="22" rx="2" fill="#fffdf5" stroke="#868e96"/>
        <text x="${x}" y="145.5" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="${labels[i].length > 6 ? 9 : 11}" fill="#343a40">${labels[i]}</text>
        <path d="M${x - 26} 158V196" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".45"/>`).join('');
      return `
      <rect width="400" height="300" fill="url(#ps-wall)"/>
      <circle cx="200" cy="60" r="170" fill="url(#ps-lamp)" opacity=".45"/>
      <rect y="262" width="400" height="38" fill="url(#ps-wood)"/>
      <rect x="30" y="206" width="340" height="12" rx="2" fill="#8b5e3c"/>
      <path d="M60 218V236L76 218M340 218V236L324 218" stroke="#5e3c24" stroke-width="4" fill="none"/>
      ${jars}`;
    },

    'early-return': () => `
      <rect width="400" height="300" fill="url(#ps-indoor)"/>
      <path d="M0 40H400M0 80H400M0 120H400M0 160H400M0 200H400M0 240H400" stroke="#000" stroke-width="2" opacity=".18"/>
      <path d="M40 0V40M120 40V80M60 80V120M330 0V40M280 40V80M350 80V120M30 160V200M370 160V200M90 200V240M310 200V240" stroke="#000" stroke-width="2" opacity=".18"/>
      <rect x="146" y="66" width="108" height="198" fill="#141218"/>
      <rect x="154" y="74" width="92" height="190" fill="#ffe3a8"/>
      <circle cx="200" cy="170" r="90" fill="url(#ps-lamp)" opacity=".55"/>
      <path d="M204 74H246V264H204Z" fill="#3b2f2a"/>
      <circle cx="212" cy="174" r="3" fill="#e0b04a"/>
      <rect x="160" y="34" width="80" height="24" rx="4" fill="#12101a" stroke="#f783ac" stroke-width="2"/>
      <text x="200" y="51" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="14" letter-spacing="3" fill="#f783ac">VIP</text>
      <rect y="262" width="400" height="38" fill="#2a2430"/>
      <ellipse cx="200" cy="268" rx="80" ry="8" fill="#ffe3a8" opacity=".3"/>
      <path d="M112 210Q200 254 288 210" stroke="#c92a2a" stroke-width="7" fill="none" stroke-linecap="round"/>
      <g fill="#e0b04a"><rect x="106" y="204" width="9" height="60" rx="2"/><rect x="285" y="204" width="9" height="60" rx="2"/>
      <circle cx="110.5" cy="202" r="7"/><circle cx="289.5" cy="202" r="7"/></g>
      <ellipse cx="110.5" cy="264" rx="14" ry="4" fill="#b8892f"/><ellipse cx="289.5" cy="264" rx="14" ry="4" fill="#b8892f"/>`,

    'dead-code': () => {
      const stone = (x, top, w, label, size) => `
        <path d="M${x - w} 262V${top + w}Q${x - w} ${top} ${x} ${top}Q${x + w} ${top} ${x + w} ${top + w}V262Z" fill="#8a8f98"/>
        <path d="M${x + w * 0.4} ${top + 4}Q${x + w} ${top + 6} ${x + w} ${top + w}V262H${x + w * 0.55}Z" fill="#000" opacity=".15"/>
        <text x="${x}" y="${top + w + 12}" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="${size}" fill="#5c616a">${label}</text>`;
      return `
      <rect width="400" height="300" fill="url(#ps-dusk)"/>
      <circle cx="312" cy="70" r="26" fill="#fff4d6"/>
      <circle cx="312" cy="70" r="60" fill="url(#ps-sun)" opacity=".5"/>
      <path d="M0 222Q120 192 220 214T400 206V300H0Z" fill="#2a2340"/>
      <path d="M70 254L76 176M75 200L52 176M76 186L98 164M74 220L94 206M52 176L42 178M98 164L108 166" stroke="#15121f" stroke-width="5" stroke-linecap="round" fill="none"/>
      ${stone(176, 168, 30, '//', 26)}${stone(258, 196, 22, 'v1', 18)}${stone(322, 214, 17, 'TODO', 10)}
      <path d="M0 256Q200 240 400 256V300H0Z" fill="#1b162b"/>
      <path d="M150 262l4-9 3 9M214 262l3-8 4 8M300 262l3-7 3 7" stroke="#3d3556" stroke-width="2" fill="none"/>
      <ellipse cx="120" cy="250" rx="110" ry="10" fill="#fff" opacity=".06"/><ellipse cx="300" cy="244" rx="120" ry="9" fill="#fff" opacity=".06"/>`;
    },

    'user-input': () => `
      <rect width="400" height="300" fill="url(#ps-day)"/>
      <path d="M0 196L90 178L180 194L280 172L400 190V300H0Z" fill="#9fb59a"/>
      <rect y="200" width="400" height="100" fill="url(#ps-grass)"/>
      <path d="M160 200H240L340 300H60Z" fill="#555b62"/>
      <path d="M200 206V222M200 236V258M200 272V300" stroke="#f1f3f5" stroke-width="3"/>
      <rect x="56" y="148" width="64" height="72" fill="#f1f3f5" stroke="#868e96" stroke-width="2"/>
      <rect x="50" y="140" width="76" height="11" fill="#c92a2a"/>
      <rect x="66" y="160" width="44" height="26" fill="#a5d8ff" stroke="#868e96"/>
      <circle cx="88" cy="176" r="6" fill="#343a40"/><path d="M80 186Q88 178 96 186" fill="#343a40"/>
      <rect x="124" y="196" width="10" height="48" fill="#495057"/>
      <path d="M134 202H306" stroke="#fff" stroke-width="10"/>
      <path d="M134 202H306" stroke="#e03131" stroke-width="10" stroke-dasharray="18 18"/>
      <ellipse cx="200" cy="270" rx="40" ry="5" fill="#000" opacity=".25"/>
      <rect x="170" y="236" width="60" height="30" rx="9" fill="#1c7ed6"/>
      <rect x="178" y="224" width="44" height="18" rx="5" fill="#1971c2"/>
      <rect x="182" y="227" width="36" height="12" rx="3" fill="#d0ebff"/>
      <circle cx="180" cy="252" r="4.5" fill="#ffe066"/><circle cx="220" cy="252" r="4.5" fill="#ffe066"/>
      <rect x="172" y="264" width="10" height="7" rx="2" fill="#212529"/><rect x="218" y="264" width="10" height="7" rx="2" fill="#212529"/>`,

    gigo: () => `
      <rect width="400" height="300" fill="url(#ps-indoor)"/>
      <circle cx="200" cy="40" r="170" fill="url(#ps-lamp)" opacity=".3"/>
      <rect y="250" width="400" height="50" fill="#3a322b"/>
      <path d="M150 72H250L220 122H180Z" fill="#adb5bd" stroke="#495057" stroke-width="2"/>
      <rect x="138" y="120" width="124" height="112" rx="8" fill="#868e96" stroke="#495057" stroke-width="2"/>
      <circle cx="170" cy="152" r="14" fill="#f8f9fa" stroke="#495057" stroke-width="2"/><path d="M170 152L178 144" stroke="#e03131" stroke-width="2.5"/>
      <rect x="196" y="140" width="50" height="24" rx="3" fill="#2b2d31"/><path d="M202 152H238" stroke="#69db7c" stroke-width="2" stroke-dasharray="4 3"/>
      <circle cx="160" cy="210" r="4" fill="#69db7c"/><circle cx="174" cy="210" r="4" fill="#ffd43b"/><circle cx="188" cy="210" r="4" fill="#ff6b6b"/>
      <rect x="150" y="232" width="12" height="18" fill="#495057"/><rect x="238" y="232" width="12" height="18" fill="#495057"/>
      <rect x="262" y="198" width="100" height="10" fill="#495057"/>
      <g fill="#343a40"><circle cx="272" cy="212" r="5"/><circle cx="296" cy="212" r="5"/><circle cx="320" cy="212" r="5"/><circle cx="344" cy="212" r="5"/></g>
      <g transform="rotate(18 196 50)"><rect x="186" y="34" width="18" height="28" rx="3" fill="#e03131"/><rect x="186" y="40" width="18" height="6" fill="#f8f9fa"/></g>
      <path d="M150 34H184M156 28V40M164 28V40M172 28V40M184 34L192 28V40Z" stroke="#e9ecef" stroke-width="2.5" fill="none" stroke-linejoin="round"/>
      <path d="M214 46Q226 20 244 40Q232 34 226 52Q222 40 214 46Z" fill="#ffd43b"/>
      <g transform="rotate(-10 318 186)"><rect x="306" y="172" width="16" height="24" rx="3" fill="#e03131"/><rect x="306" y="178" width="16" height="5" fill="#f8f9fa"/></g>
      <path d="M330 192H352M334 187V197M341 187V197M352 192L358 187V197Z" stroke="#e9ecef" stroke-width="2" fill="none" stroke-linejoin="round"/>
      <path d="M262 104Q270 92 262 80Q254 68 262 56" stroke="#dee2e6" stroke-width="3" fill="none" opacity=".35"/>`,

    'divide-conquer': () => `
      <rect width="400" height="300" fill="url(#ps-dawn)"/>
      <circle cx="320" cy="90" r="70" fill="url(#ps-sun)"/>
      <path d="M20 300L210 48L392 300Z" fill="#7d8b99"/>
      <path d="M210 48L392 300H256Z" fill="#66727f"/>
      <path d="M210 48L180 88L196 84L210 98L224 85L240 92Z" fill="#f8f9fa"/>
      <path d="M118 292L252 254L150 218L240 182L170 152L226 122L196 96" stroke="#f3e3c3" stroke-width="4" stroke-dasharray="4 5" fill="none" stroke-linejoin="round"/>
      <path d="M210 48V20" stroke="#343a40" stroke-width="3"/>
      <path d="M211 21L238 29L211 38Z" fill="#e03131"/>
      <circle cx="150" cy="204" r="4" fill="#343a40"/>
      <path d="M150 208V218M150 218L146 226M150 218L155 225M150 211L157 214" stroke="#343a40" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <path d="M0 300Q100 262 200 282T400 270V300Z" fill="#5c7a4a"/>`,

    'no-copy-paste': () => {
      const sheets = [[60, 60, -18], [110, 36, 12], [300, 46, -8], [340, 96, 20], [36, 126, 8]].map(([x, y, a]) => `
        <g transform="rotate(${a} ${x} ${y})"><rect x="${x - 14}" y="${y - 18}" width="28" height="36" fill="#fff"/>
        <path d="M${x - 9} ${y - 10}h18M${x - 9} ${y - 4}h18M${x - 9} ${y + 2}h12M${x - 9} ${y + 8}h16" stroke="#adb5bd" stroke-width="1.5"/></g>`).join('');
      return `
      <rect width="400" height="300" fill="url(#ps-office)"/>
      <rect y="250" width="400" height="50" fill="#23272e"/>
      <ellipse cx="200" cy="252" rx="110" ry="8" fill="#000" opacity=".3"/>
      <rect x="120" y="170" width="160" height="80" fill="#ced4da"/>
      <path d="M124 194H276M124 222H276" stroke="#adb5bd" stroke-width="2"/>
      <rect x="190" y="182" width="20" height="4" rx="2" fill="#868e96"/><rect x="190" y="208" width="20" height="4" rx="2" fill="#868e96"/>
      <rect x="110" y="130" width="180" height="44" rx="6" fill="#e9ecef"/>
      <path d="M118 131H282L300 126H100Z" fill="#8ce99a" opacity=".75"/>
      <rect x="116" y="116" width="168" height="16" rx="4" fill="#adb5bd"/>
      <rect x="236" y="140" width="44" height="22" rx="3" fill="#343a40"/>
      <circle cx="246" cy="151" r="3" fill="#69db7c"/><rect x="254" y="147" width="20" height="8" rx="1" fill="#74c0fc"/>
      <path d="M110 158L56 170L60 180L110 170Z" fill="#adb5bd"/>
      <g transform="rotate(-12 80 166)"><rect x="62" y="156" width="36" height="9" fill="#fff"/><rect x="64" y="151" width="36" height="9" fill="#f8f9fa"/></g>
      ${sheets}`;
    },

    'commit-often': () => {
      const bricks = Array.from({ length: 10 }, (_, i) => `M${i * 40} 252V300M${i * 40 + 20} 270V300`).join('');
      return `
      <rect width="400" height="300" fill="url(#ps-day)"/>
      <ellipse cx="80" cy="244" rx="110" ry="50" fill="#8ce99a"/><ellipse cx="300" cy="248" rx="140" ry="44" fill="#a9e34b" opacity=".8"/>
      <g fill="#495057"><rect x="322" y="176" width="54" height="64"/><rect x="316" y="160" width="14" height="22"/><rect x="368" y="160" width="14" height="22"/>
      <path d="M316 160h4v-6h6v6h4M368 160h4v-6h6v6h4"/></g>
      <rect x="342" y="196" width="12" height="16" rx="6" fill="#ff6b6b"/>
      <rect y="240" width="400" height="60" fill="#c0703a"/>
      <rect y="236" width="400" height="9" fill="#51cf66"/>
      <path d="M0 270H400${bricks}" stroke="#8f4d22" stroke-width="2"/>
      <rect x="54" y="168" width="96" height="18" fill="#c0703a"/><rect x="54" y="164" width="96" height="7" fill="#51cf66"/>
      <g fill="#ffd43b" stroke="#e8a400" stroke-width="2"><circle cx="78" cy="146" r="7"/><circle cx="102" cy="146" r="7"/><circle cx="126" cy="146" r="7"/></g>
      <circle cx="214" cy="160" r="54" fill="url(#ps-lamp)"/>
      <path d="M200 236V136" stroke="#495057" stroke-width="4"/>
      <circle cx="200" cy="134" r="5" fill="#ffd43b"/>
      <path d="M202 140L248 154L202 168Z" fill="#40c057"/>
      <path d="M214 154l6 6 12-12" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <g transform="translate(244 96) rotate(8)"><rect x="-13" y="-13" width="26" height="26" rx="2" fill="#1c7ed6"/>
      <rect x="-8" y="-13" width="14" height="9" fill="#dee2e6"/><rect x="-9" y="2" width="18" height="11" fill="#fff"/></g>`;
    },

    'read-error': () => {
      const gauge = (cx, cy) => {
        const ticks = Array.from({ length: 9 }, (_, i) => {
          const a = ((-120 + i * 30) * Math.PI) / 180;
          return `M${f1(cx + 46 * Math.sin(a))} ${f1(cy - 46 * Math.cos(a))}L${f1(cx + 54 * Math.sin(a))} ${f1(cy - 54 * Math.cos(a))}`;
        }).join('');
        return `<circle cx="${cx}" cy="${cy}" r="62" fill="#0f1116" stroke="#3a3f48" stroke-width="4"/>
          <path d="${ticks}" stroke="#ced4da" stroke-width="2.5"/>
          <path d="M${cx} ${cy}L${cx - 30} ${cy + 22}" stroke="#ff6b6b" stroke-width="3.5" stroke-linecap="round"/>
          <circle cx="${cx}" cy="${cy}" r="5" fill="#ced4da"/>`;
      };
      return `
      <rect width="400" height="300" fill="url(#ps-night)"/>
      <path d="M150 120L195 60H205L250 120Z" fill="#2b3346"/>
      <path d="M200 70V78M200 88V100M200 110V120" stroke="#ffe066" stroke-width="2" opacity=".6"/>
      <path d="M0 120Q200 76 400 120V300H0Z" fill="#1a1d24"/>
      ${gauge(126, 200)}${gauge(274, 200)}
      <circle cx="200" cy="168" r="44" fill="url(#ps-glow)"/>
      <path d="M200 148L222 186H178Z" fill="#fab005" stroke="#1a1d24" stroke-width="2"/>
      <path d="M200 160V173M200 179V180" stroke="#1a1d24" stroke-width="4" stroke-linecap="round"/>
      <rect x="186" y="232" width="28" height="14" rx="2" fill="#ff6b6b" opacity=".85"/>
      <path d="M190 232V229M210 232V229" stroke="#ff6b6b" stroke-width="3"/>`;
    },

    'code-for-humans': () => `
      <rect width="400" height="300" fill="url(#ps-indoor)"/>
      <circle cx="120" cy="140" r="170" fill="url(#ps-lamp)" opacity=".7"/>
      <rect y="210" width="400" height="90" fill="url(#ps-wood)"/>
      <ellipse cx="86" cy="212" rx="26" ry="6" fill="#343a40"/>
      <path d="M86 210L106 150L76 112" stroke="#343a40" stroke-width="5" fill="none" stroke-linejoin="round"/>
      <path d="M58 106L96 92L104 114L68 128Z" fill="#e8590c"/>
      <ellipse cx="84" cy="120" rx="10" ry="4" fill="#fff3bf" transform="rotate(-20 84 120)"/>
      <ellipse cx="200" cy="258" rx="70" ry="6" fill="#000" opacity=".25"/>
      <path d="M140 222Q170 212 200 218V256Q172 248 140 258Z" fill="#fffdf5"/>
      <path d="M200 218Q230 212 260 222V258Q228 248 200 256Z" fill="#f4ecdc"/>
      <path d="M150 228Q172 222 192 226M150 236Q172 230 192 234M150 244Q172 238 186 241M208 226Q228 222 250 228M208 234Q228 230 250 236M208 242Q228 238 244 243" stroke="#adb5bd" stroke-width="1.5" fill="none"/>
      <circle cx="186" cy="240" r="9" stroke="#212529" stroke-width="2.5" fill="#fff" fill-opacity=".15"/>
      <circle cx="212" cy="240" r="9" stroke="#212529" stroke-width="2.5" fill="#fff" fill-opacity=".15"/>
      <path d="M195 239Q199 236 203 239M177 238L168 234M221 238L230 234" stroke="#212529" stroke-width="2" fill="none"/>
      <rect x="292" y="182" width="36" height="42" rx="5" fill="#fffdf8" stroke="#ced4da" stroke-width="2"/>
      <path d="M328 192Q342 194 340 206Q338 216 328 214" stroke="#ced4da" stroke-width="4" fill="none"/>
      <text x="310" y="208" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#e8590c">&lt;/&gt;</text>
      <path d="M302 172Q296 160 304 150M314 170Q308 158 316 146" stroke="#fff" stroke-width="2.5" fill="none" opacity=".45" stroke-linecap="round"/>`,
  };

  window.PRINCIPLE_SCENES = { defs: DEFS, draw: SCENES };
})();
