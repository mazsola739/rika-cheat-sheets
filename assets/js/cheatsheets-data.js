/*
 * Cheat sheetek tartalma (magyarul és angolul).
 *
 * Egy sor: [kód, magyarázat]  — a magyarázat lehet sima szöveg vagy { hu, en }.
 * Több soros kódhoz használj \n-t. A kód mindkét nyelven ugyanaz.
 * level: 'kezdo' | 'kozep' | 'halado'
 * lang: a kódkiemelés nyelve ('css' | 'js' | 'sh')
 * icon: kis jel a fül mellett (pl. '≡', '∑', '⚠')
 * playground: kattintgatós poszter a lista fölött (opcionális):
 *   'flexbox' | 'grid' (elrendezés) vagy 'colors' | 'gradient' | 'shadow' | 'border' | 'button' (generátor)
 * A lista (sections) mindig blueprint stílusban jelenik meg.
 */
window.CHEATSHEETS = [
  {
    id: 'flexbox',
    title: 'Flexbox',
    icon: '⇄',
    level: 'kezdo',
    lang: 'css',
    tags: ['css', 'layout'],
    playground: 'flexbox',
    intro: {
      hu: 'Egydimenziós elrendezés: sorba vagy oszlopba rendezi az elemeket, és szétosztja köztük a helyet.',
      en: 'One-dimensional layout: lines items up in a row or a column and shares the space between them.',
    },
    sections: [
      {
        title: { hu: 'A konténeren', en: 'On the container' },
        items: [
          ['display: flex;', { hu: 'bekapcsolja a flexet, a gyerekek egy sorba állnak', en: 'turns flex on, children line up in a row' }],
          ['flex-direction: column;', { hu: 'a fő tengely iránya: row, column, row-reverse, column-reverse', en: 'main axis direction: row, column, row-reverse, column-reverse' }],
          ['flex-wrap: wrap;', { hu: 'ha nem fér ki, új sorba törik', en: 'wraps onto new lines when items do not fit' }],
          ['flex-flow: row wrap;', { hu: 'direction + wrap egyben', en: 'direction + wrap in one' }],
          ['gap: 1rem;', { hu: 'térköz az elemek között, margin helyett', en: 'space between items, instead of margins' }],
        ],
      },
      {
        title: { hu: 'Igazítás', en: 'Alignment' },
        items: [
          ['justify-content: space-between;', { hu: 'a fő tengely mentén: flex-start, center, space-between, space-around, space-evenly', en: 'along the main axis: flex-start, center, space-between, space-around, space-evenly' }],
          ['align-items: center;', { hu: 'a kereszttengely mentén: stretch (alap), flex-start, center, baseline', en: 'along the cross axis: stretch (default), flex-start, center, baseline' }],
          ['align-content: space-between;', { hu: 'több sor esetén a sorok elosztása', en: 'distributes the lines when there are several' }],
          ['place-content: center;', { hu: 'align-content + justify-content röviden', en: 'shorthand for align-content + justify-content' }],
        ],
      },
      {
        title: { hu: 'Az elemeken', en: 'On the items' },
        items: [
          ['flex-grow: 1;', { hu: 'mennyit kapjon a maradék helyből', en: 'how much of the free space it takes' }],
          ['flex-shrink: 0;', { hu: '0 = sosem zsugorodik', en: '0 = never shrinks' }],
          ['flex-basis: 200px;', { hu: 'kiinduló méret a fő tengelyen', en: 'starting size on the main axis' }],
          ['flex: 1;', { hu: 'röviden: grow 1, shrink 1, basis 0', en: 'shorthand: grow 1, shrink 1, basis 0' }],
          ['align-self: flex-end;', { hu: 'egyetlen elem saját igazítása', en: 'alignment for a single item' }],
          ['order: -1;', { hu: 'vizuális sorrend (a DOM nem változik!)', en: 'visual order (the DOM stays the same!)' }],
        ],
      },
      {
        title: { hu: 'Gyakori minták', en: 'Common patterns' },
        items: [
          ['.center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}', { hu: 'tökéletes középre igazítás', en: 'perfect centering' }],
          ['.nav {\n  display: flex;\n  justify-content: space-between;\n}', { hu: 'logó balra, menü jobbra', en: 'logo on the left, menu on the right' }],
          ['.push { margin-left: auto; }', { hu: 'egy elemet a sor végére tol', en: 'pushes one item to the end' }],
          ['.cols > * { flex: 1; }', { hu: 'egyforma széles oszlopok', en: 'equal-width columns' }],
          ['body {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n}\nmain { flex: 1; }', { hu: 'a lábléc mindig alul marad (sticky footer)', en: 'the footer stays at the bottom (sticky footer)' }],
        ],
      },
    ],
  },
  {
    id: 'grid',
    title: 'CSS Grid',
    icon: '▦',
    level: 'kozep',
    lang: 'css',
    tags: ['css', 'layout'],
    playground: 'grid',
    intro: {
      hu: 'Kétdimenziós elrendezés: sorok és oszlopok egyszerre. Oldalvázhoz és kártyarácshoz ideális.',
      en: 'Two-dimensional layout: rows and columns at the same time. Great for page skeletons and card grids.',
    },
    sections: [
      {
        title: { hu: 'A rács megadása', en: 'Defining the grid' },
        items: [
          ['display: grid;', { hu: 'bekapcsolja a gridet', en: 'turns grid on' }],
          ['grid-template-columns: 200px 1fr 1fr;', { hu: 'oszlopok; az fr a maradék hely egy része', en: 'columns; fr is a share of the free space' }],
          ['grid-template-columns: repeat(3, 1fr);', { hu: '3 egyforma oszlop', en: '3 equal columns' }],
          ['grid-template-rows: auto 1fr auto;', { hu: 'a sorok magassága', en: 'row heights' }],
          ['gap: 16px 24px;', { hu: 'sorköz és oszlopköz', en: 'row gap and column gap' }],
        ],
      },
      {
        title: { hu: 'Reszponzívan', en: 'Responsive' },
        items: [
          ['grid-template-columns:\n  repeat(auto-fit, minmax(240px, 1fr));', { hu: 'annyi oszlop, amennyi kifér, media query nélkül', en: 'as many columns as fit, no media query needed' }],
          ['minmax(200px, 1fr)', { hu: 'legalább 200px, legfeljebb 1fr', en: 'at least 200px, at most 1fr' }],
          ['auto-fill / auto-fit', { hu: 'az auto-fill megtartja az üres sávokat, az auto-fit összecsukja', en: 'auto-fill keeps empty tracks, auto-fit collapses them' }],
          ['grid-auto-rows: 120px;', { hu: 'az automatikusan létrejövő sorok magassága', en: 'height of implicitly created rows' }],
        ],
      },
      {
        title: { hu: 'Elemek elhelyezése', en: 'Placing items' },
        items: [
          ['grid-column: 1 / 3;', { hu: 'az 1. vonaltól a 3.-ig (2 oszlop)', en: 'from line 1 to line 3 (2 columns)' }],
          ['grid-column: span 2;', { hu: '2 oszlopnyi széles', en: 'spans 2 columns' }],
          ['grid-column: 1 / -1;', { hu: 'teljes szélesség', en: 'full width' }],
          ['grid-row: 2 / 4;', { hu: 'sorokra ugyanígy', en: 'the same for rows' }],
          ['justify-self: end;\nalign-self: center;', { hu: 'egy elem igazítása a saját cellájában', en: 'aligns one item inside its cell' }],
        ],
      },
      {
        title: { hu: 'Nevesített területek', en: 'Template areas' },
        items: [
          ['.page {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  grid-template-areas:\n    "head head"\n    "side main"\n    "foot foot";\n}', { hu: 'az elrendezést szinte lerajzolod', en: 'you basically draw the layout' }],
          ['header { grid-area: head; }', { hu: 'elem hozzárendelése egy területhez', en: 'assigns an element to an area' }],
          ['"side ."', { hu: 'a pont üres cellát jelent', en: 'a dot means an empty cell' }],
        ],
      },
      {
        title: { hu: 'Igazítás', en: 'Alignment' },
        items: [
          ['place-items: center;', { hu: 'minden cella tartalma középen', en: 'centers the content of every cell' }],
          ['justify-items: start;', { hu: 'vízszintes igazítás a cellákon belül', en: 'horizontal alignment inside the cells' }],
          ['justify-content: center;', { hu: 'az egész rács igazítása a konténerben', en: 'aligns the whole grid inside its container' }],
        ],
      },
    ],
  },
  {
    id: 'css-selectors',
    title: { hu: 'CSS szelektorok & box model', en: 'CSS selectors & box model' },
    icon: '#',
    level: 'kezdo',
    lang: 'css',
    tags: ['css'],
    intro: {
      hu: 'Hogyan célozz meg pontosan egy elemet, ki nyer, ha két szabály ütközik, és miből áll egy doboz.',
      en: 'How to target exactly the element you want, who wins when two rules clash, and what a box is made of.',
    },
    sections: [
      {
        title: { hu: 'Alap szelektorok', en: 'Basic selectors' },
        items: [
          ['p { }', { hu: 'elem', en: 'element' }],
          ['.card { }', { hu: 'osztály', en: 'class' }],
          ['#main { }', { hu: 'id (stílushoz ritkán kell)', en: 'id (rarely needed for styling)' }],
          ['[href^="https"] { }', { hu: 'attribútum, ami így kezdődik', en: 'attribute that starts with' }],
          ['* { }', { hu: 'minden elem', en: 'everything' }],
        ],
      },
      {
        title: { hu: 'Kombinátorok', en: 'Combinators' },
        items: [
          ['nav a { }', { hu: 'leszármazott, bármilyen mélyen', en: 'descendant, at any depth' }],
          ['ul > li { }', { hu: 'közvetlen gyerek', en: 'direct child' }],
          ['h2 + p { }', { hu: 'a közvetlenül utána jövő testvér', en: 'the very next sibling' }],
          ['h2 ~ p { }', { hu: 'minden utána jövő testvér', en: 'all following siblings' }],
        ],
      },
      {
        title: { hu: 'Pszeudo-osztályok', en: 'Pseudo-classes' },
        items: [
          ['a:hover { }', { hu: 'egér fölötte', en: 'mouse over it' }],
          ['button:focus-visible { }', { hu: 'billentyűzetes fókusz', en: 'keyboard focus' }],
          ['li:nth-child(2n) { }', { hu: 'minden második', en: 'every second one' }],
          ['li:first-child { }', { hu: 'az első (last-child: az utolsó)', en: 'the first one (last-child: the last)' }],
          [':not(.active) { }', { hu: 'ami NEM ilyen', en: 'anything that is NOT this' }],
          ['.card:has(img) { }', { hu: 'szülő, amiben van img', en: 'a parent that contains an img' }],
        ],
      },
      {
        title: { hu: 'Pszeudo-elemek', en: 'Pseudo-elements' },
        items: [
          ['.tag::before { content: "#"; }', { hu: 'tartalom az elem elé', en: 'content before the element' }],
          ['.link::after { content: "→"; }', { hu: 'tartalom az elem után', en: 'content after the element' }],
          ['input::placeholder { }', { hu: 'a placeholder szöveg', en: 'the placeholder text' }],
          ['::selection { }', { hu: 'a kijelölt szöveg', en: 'selected text' }],
        ],
      },
      {
        title: { hu: 'Specificitás', en: 'Specificity' },
        items: [
          ['p  →  0-0-1', { hu: 'elem, pszeudo-elem', en: 'element, pseudo-element' }],
          ['.btn:hover  →  0-2-0', { hu: 'osztály, pszeudo-osztály, attribútum', en: 'class, pseudo-class, attribute' }],
          ['#nav  →  1-0-0', { hu: 'id', en: 'id' }],
          ['style="" / !important', { hu: 'mindent visz – inkább kerüld', en: 'beats everything – better avoid it' }],
        ],
      },
      {
        title: 'Box model',
        items: [
          ['*, *::before, *::after {\n  box-sizing: border-box;\n}', { hu: 'a width a paddinget és a bordert is tartalmazza', en: 'width includes padding and border' }],
          ['margin: 0 auto;', { hu: 'blokk vízszintes középre igazítása', en: 'centers a block horizontally' }],
          ['padding: 8px 16px;', { hu: 'fent-lent 8, jobbra-balra 16', en: 'top/bottom 8, left/right 16' }],
          ['margin-block: 1rem;\npadding-inline: 2rem;', { hu: 'logikai tulajdonságok, írásiránytól függetlenek', en: 'logical properties, writing-direction aware' }],
        ],
      },
    ],
  },
  {
    id: 'css-colors',
    title: { hu: 'Színek & háttér', en: 'Colors & background' },
    icon: '▧',
    level: 'kezdo',
    lang: 'css',
    tags: ['css', 'generator', 'color'],
    playground: 'colors',
    intro: {
      hu: 'Színválasztó minden formátumban (hex, rgb, hsl), és háttérminták, amiket egy sor CSS-sel rajzolsz.',
      en: 'A color picker in every format (hex, rgb, hsl), and background patterns drawn with one line of CSS.',
    },
    sections: [
      {
        title: { hu: 'Színformátumok', en: 'Color formats' },
        items: [
          ['color: #7048e8;', { hu: 'hex: piros-zöld-kék 00–ff', en: 'hex: red-green-blue 00–ff' }],
          ['color: #7048e880;', { hu: 'hex átlátszósággal (az utolsó két jegy)', en: 'hex with alpha (the last two digits)' }],
          ['color: rgb(112 72 232 / 50%);', { hu: 'rgb, perjel után az átlátszóság', en: 'rgb, alpha after the slash' }],
          ['color: hsl(255 78% 60%);', { hu: 'hsl: árnyalat, telítettség, világosság – könnyű variálni', en: 'hsl: hue, saturation, lightness – easy to tweak' }],
          ['color: oklch(60% 0.2 285);', { hu: 'modern, egyenletes világosságú színtér', en: 'a modern space with even lightness' }],
          ['color: color-mix(in srgb, var(--c) 40%, white);', { hu: 'két szín keverése', en: 'mix two colors' }],
          ['color: currentColor;', { hu: 'az aktuális szövegszín (ikonokhoz, keretekhez)', en: 'the current text color (for icons, borders)' }],
        ],
      },
      {
        title: { hu: 'Háttér', en: 'Background' },
        items: [
          ['background-color: #fffdf8;', { hu: 'háttérszín', en: 'background color' }],
          ['background-image: url("hero.webp");', { hu: 'háttérkép (vagy gradiens)', en: 'background image (or a gradient)' }],
          ['background-size: cover;', { hu: 'cover = kitölti, contain = belefér; vagy méret: 40px 40px', en: 'cover = fills it, contain = fits inside; or a size: 40px 40px' }],
          ['background-position: center top;', { hu: 'a kép helye', en: 'where the image sits' }],
          ['background-repeat: no-repeat;', { hu: 'ismétlődés: repeat, repeat-x, no-repeat, space', en: 'tiling: repeat, repeat-x, no-repeat, space' }],
          ['background: #000 url("a.png") center / cover no-repeat;', { hu: 'rövidítve, egy sorban', en: 'the shorthand, in one line' }],
          ['background-attachment: fixed;', { hu: 'a háttér nem görög az oldallal', en: 'the background does not scroll with the page' }],
        ],
      },
    ],
  },
  {
    id: 'css-gradient',
    title: { hu: 'Színátmenet', en: 'Gradients' },
    icon: '◐',
    level: 'kezdo',
    lang: 'css',
    tags: ['css', 'generator', 'gradient'],
    playground: 'gradient',
    intro: {
      hu: 'Lineáris, kör alakú és kúpos színátmenetek – kép nélkül, bármilyen méretben élesen.',
      en: 'Linear, radial and conic gradients – no image needed, sharp at any size.',
    },
    sections: [
      {
        title: { hu: 'Típusok', en: 'Types' },
        items: [
          ['background: linear-gradient(135deg, #ff6b6b, #4dabf7);', { hu: 'egyenes irányban; szög vagy to right / to bottom', en: 'in a straight line; an angle or to right / to bottom' }],
          ['background: radial-gradient(circle, #ffd43b, #e8590c);', { hu: 'középről kifelé (circle vagy ellipse)', en: 'from the center outwards (circle or ellipse)' }],
          ['background: conic-gradient(from 90deg, red, yellow, lime, red);', { hu: 'körbe forogva – tortadiagramhoz is', en: 'around a point – handy for pie charts' }],
        ],
      },
      {
        title: { hu: 'Színpontok', en: 'Color stops' },
        items: [
          ['linear-gradient(90deg, #f00 0%, #f00 50%, #00f 50%)', { hu: 'éles határ: két szín ugyanannál a pontnál', en: 'hard edge: two colors at the same point' }],
          ['linear-gradient(#e64980 30%, #7048e8)', { hu: 'színpont helye százalékban', en: 'stop position in percent' }],
          ['repeating-linear-gradient(45deg, #000 0 10px, #fff 10px 20px)', { hu: 'ismétlődő csíkok', en: 'repeating stripes' }],
        ],
      },
      {
        title: { hu: 'Trükkök', en: 'Tricks' },
        items: [
          ['background:\n  linear-gradient(rgb(0 0 0 / 0.5), transparent),\n  url("photo.webp") center / cover;', { hu: 'sötétítő réteg egy kép fölött, hogy a szöveg olvasható legyen', en: 'a darkening layer over an image so text stays readable' }],
          ['.title {\n  background: linear-gradient(90deg, #f06, #48f);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}', { hu: 'színátmenetes szöveg', en: 'gradient text' }],
          ['border-image: linear-gradient(#f06, #48f) 1;', { hu: 'színátmenetes keret', en: 'a gradient border' }],
        ],
      },
    ],
  },
  {
    id: 'css-shadow',
    title: { hu: 'Árnyékok', en: 'Shadows' },
    icon: '❏',
    level: 'kezdo',
    lang: 'css',
    tags: ['css', 'generator', 'shadow'],
    playground: 'shadow',
    intro: {
      hu: 'box-shadow, text-shadow és drop-shadow: mélység, kiemelés és ragyogás néhány számmal.',
      en: 'box-shadow, text-shadow and drop-shadow: depth, emphasis and glow with a few numbers.',
    },
    sections: [
      {
        title: 'box-shadow',
        items: [
          ['box-shadow: 4px 6px 12px 0 rgb(0 0 0 / 0.25);', { hu: 'x, y, elmosás, terjedés, szín', en: 'x, y, blur, spread, color' }],
          ['box-shadow: inset 0 2px 6px rgb(0 0 0 / 0.3);', { hu: 'belső árnyék (benyomott hatás)', en: 'inner shadow (pressed look)' }],
          ['box-shadow: 4px 4px 0 #2b2a28;', { hu: 'éles, elmosás nélküli „rajzolt” árnyék', en: 'a sharp, unblurred “drawn” shadow' }],
          ['box-shadow: 0 1px 2px #0002, 0 8px 24px #0003;', { hu: 'több réteg vesszővel – természetesebb', en: 'several layers with commas – looks more natural' }],
          ['box-shadow: 0 0 0 3px #4dabf7;', { hu: 'keret helyett: nem tolja el az elrendezést', en: 'instead of a border: it does not shift the layout' }],
        ],
      },
      {
        title: { hu: 'Szöveg & kép', en: 'Text & images' },
        items: [
          ['text-shadow: 0 2px 4px rgb(0 0 0 / 0.4);', { hu: 'szövegárnyék (nincs spread)', en: 'text shadow (no spread)' }],
          ['text-shadow: 0 0 8px #74c0fc, 0 0 16px #74c0fc;', { hu: 'neon ragyogás', en: 'neon glow' }],
          ['filter: drop-shadow(0 6px 8px rgb(0 0 0 / 0.3));', { hu: 'a kép valódi alakját követi (PNG, SVG)', en: 'follows the real shape of the image (PNG, SVG)' }],
        ],
      },
    ],
  },
  {
    id: 'css-border',
    title: { hu: 'Keret & lekerekítés', en: 'Border & radius' },
    icon: '▢',
    level: 'kezdo',
    lang: 'css',
    tags: ['css', 'generator', 'border'],
    playground: 'border',
    intro: {
      hu: 'Keretek, sarkok és outline – a fókuszkeret az akadálymentesség miatt is fontos.',
      en: 'Borders, corners and outlines – the focus outline matters for accessibility too.',
    },
    sections: [
      {
        title: 'border',
        items: [
          ['border: 2px solid #1c7ed6;', { hu: 'vastagság, stílus, szín', en: 'width, style, color' }],
          ['border-style: dashed;', { hu: 'solid, dashed, dotted, double, groove, ridge', en: 'solid, dashed, dotted, double, groove, ridge' }],
          ['border-bottom: 3px solid currentColor;', { hu: 'csak az egyik oldal', en: 'one side only' }],
          ['box-sizing: border-box;', { hu: 'a keret a megadott méreten belül marad', en: 'the border stays inside the given size' }],
        ],
      },
      {
        title: 'border-radius',
        items: [
          ['border-radius: 12px;', { hu: 'mind a négy sarok', en: 'all four corners' }],
          ['border-radius: 16px 4px 16px 4px;', { hu: 'sorban: bal felső, jobb felső, jobb alsó, bal alsó', en: 'in order: top left, top right, bottom right, bottom left' }],
          ['border-radius: 50%;', { hu: 'kör (négyzetből) vagy ellipszis', en: 'a circle (from a square) or an ellipse' }],
          ['border-radius: 999px;', { hu: 'kapszula / pill gomb', en: 'pill-shaped button' }],
          ['border-radius: 30% 70% 60% 40% / 40% 30% 70% 60%;', { hu: 'organikus „paca” forma', en: 'an organic “blob” shape' }],
        ],
      },
      {
        title: 'outline',
        items: [
          ['outline: 3px solid #4dabf7;\noutline-offset: 3px;', { hu: 'nem foglal helyet, és elemelhető az elemtől', en: 'takes no space and can sit away from the element' }],
          [':focus-visible {\n  outline: 3px solid #4dabf7;\n}', { hu: 'billentyűzetes fókusz jelzése – ne vedd el!', en: 'shows keyboard focus – don’t remove it!' }],
        ],
      },
    ],
  },
  {
    id: 'css-button',
    title: { hu: 'Gombgenerátor', en: 'Button generator' },
    icon: '◉',
    level: 'kozep',
    lang: 'css',
    tags: ['css', 'generator', 'button'],
    playground: 'button',
    intro: {
      hu: 'Rakd össze a saját gombodat: szín, méret, sarok, keret, árnyék és hover – a CSS-t egyben kimásolhatod.',
      en: 'Build your own button: color, size, corners, border, shadow and hover – copy the CSS in one go.',
    },
    sections: [
      {
        title: { hu: 'Alap', en: 'Basics' },
        items: [
          ['<button type="button" class="btn">Mentés</button>', { hu: 'valódi <button> – nem div', en: 'a real <button> – not a div' }],
          ['.btn {\n  padding: 10px 22px;\n  font: inherit;\n  cursor: pointer;\n}', { hu: 'belső tér, örökölt betű, mutató kurzor', en: 'padding, inherited font, pointer cursor' }],
          ['.btn { min-height: 44px; }', { hu: 'mobilon legalább 44px magas legyen', en: 'at least 44px tall on touch screens' }],
        ],
      },
      {
        title: { hu: 'Állapotok', en: 'States' },
        items: [
          ['.btn:hover { transform: translateY(-2px); }', { hu: 'egér fölötte', en: 'mouse over it' }],
          ['.btn:active { transform: translateY(1px); }', { hu: 'lenyomva', en: 'pressed' }],
          ['.btn:focus-visible { outline: 3px solid #4dabf7; }', { hu: 'billentyűzetes fókusz', en: 'keyboard focus' }],
          ['.btn:disabled { opacity: 0.5; cursor: not-allowed; }', { hu: 'letiltva', en: 'disabled' }],
          ['.btn { transition: transform 0.15s, box-shadow 0.15s; }', { hu: 'finom átmenet az állapotok között', en: 'a smooth change between states' }],
        ],
      },
    ],
  },
  {
    id: 'js-basics',
    title: { hu: 'JS alapok', en: 'JS basics' },
    icon: 'x',
    level: 'kezdo',
    lang: 'js',
    tags: ['js', 'basics'],
    intro: {
      hu: 'Változók, adattípusok, feltételek és ciklusok – amiből minden JavaScript program felépül.',
      en: 'Variables, data types, conditions and loops – what every JavaScript program is built from.',
    },
    sections: [
      {
        title: { hu: 'Változók', en: 'Variables' },
        items: [
          ['const name = "Rika";', { hu: 'nem lehet újra értéket adni neki – ez legyen az alap', en: 'cannot be reassigned – make this your default' }],
          ['let count = 0;\ncount += 1;', { hu: 'ha az értéke változni fog', en: 'when the value will change' }],
          ['var old = true;', { hu: 'régi forma, függvény-hatókörű – inkább kerüld', en: 'the old way, function-scoped – better avoid it' }],
          ['const { title, year } = movie;', { hu: 'destructuring: mezők kiszedése objektumból', en: 'destructuring: pull fields out of an object' }],
          ['const [first, ...rest] = list;', { hu: 'tömbből az első elem és a többi', en: 'the first item of an array and the rest' }],
        ],
      },
      {
        title: { hu: 'Adattípusok', en: 'Data types' },
        items: [
          ['typeof "hi"      // "string"\ntypeof 42        // "number"\ntypeof true      // "boolean"\ntypeof undefined // "undefined"', { hu: 'primitív típusok és a typeof', en: 'primitive types and typeof' }],
          ['typeof null      // "object" (régi hiba)\nArray.isArray([]) // true', { hu: 'a null és a tömb trükkös – erre van Array.isArray', en: 'null and arrays are tricky – use Array.isArray' }],
          ['10n + 5n         // 15n (BigInt)\nSymbol("id")     // egyedi kulcs', { hu: 'ritkább típusok: BigInt, Symbol', en: 'rarer types: BigInt, Symbol' }],
          ['Number("42")  String(42)  Boolean(0)', { hu: 'kifejezett átalakítás egyik típusból a másikba', en: 'explicit conversion between types' }],
          ['0, "", null, undefined, NaN, false', { hu: 'a „falsy” értékek – minden más igaznak számít', en: 'the falsy values – everything else counts as true' }],
        ],
      },
      {
        title: { hu: 'Feltételek', en: 'Conditions' },
        items: [
          ['if (age >= 18) {\n  enter();\n} else if (age >= 14) {\n  askParent();\n} else {\n  stop();\n}', { hu: 'if / else if / else', en: 'if / else if / else' }],
          ['const label = isOpen ? "Close" : "Open";', { hu: 'ternary: rövid if, ami értéket ad vissza', en: 'ternary: a short if that returns a value' }],
          ['switch (status) {\n  case "ok": show(); break;\n  case "error": warn(); break;\n  default: wait();\n}', { hu: 'sok egyenlőség-vizsgálat egy értékre', en: 'many equality checks on one value' }],
          ['a === b   a !== b', { hu: 'mindig a szigorú összehasonlítást használd (== helyett)', en: 'always use strict comparison (instead of ==)' }],
          ['const name = user?.profile?.name ?? "Guest";', { hu: '?. biztonságos elérés, ?? alapérték null/undefined esetén', en: '?. safe access, ?? default for null/undefined' }],
        ],
      },
      {
        title: { hu: 'Ciklusok', en: 'Loops' },
        items: [
          ['for (let i = 0; i < 3; i++) {\n  console.log(i);\n}', { hu: 'klasszikus számlálós ciklus', en: 'the classic counting loop' }],
          ['for (const item of items) { … }', { hu: 'végig egy tömb (vagy string, Map, Set) elemein', en: 'over the items of an array (or string, Map, Set)' }],
          ['for (const key in obj) { … }', { hu: 'egy objektum kulcsain – tömbre ne használd', en: 'over the keys of an object – not for arrays' }],
          ['while (queue.length) {\n  handle(queue.shift());\n}', { hu: 'amíg a feltétel igaz', en: 'while the condition is true' }],
          ['do { roll(); } while (dice !== 6);', { hu: 'legalább egyszer lefut', en: 'runs at least once' }],
          ['break;    continue;', { hu: 'kilépés a ciklusból / ugrás a következő körre', en: 'leave the loop / skip to the next round' }],
        ],
      },
    ],
  },
  {
    id: 'js-strings',
    title: { hu: 'Stringek', en: 'Strings' },
    icon: '“”',
    level: 'kezdo',
    lang: 'js',
    tags: ['js', 'string'],
    intro: {
      hu: 'Szövegek létrehozása, keresése, darabolása és átalakítása. A stringek nem változnak: minden metódus újat ad vissza.',
      en: 'Create, search, cut and transform text. Strings never change: every method returns a new one.',
    },
    sections: [
      {
        title: { hu: 'Létrehozás', en: 'Creating' },
        items: [
          ['const hello = `Szia, ${name}!`;', { hu: 'template literal: változó a szövegben', en: 'template literal: a variable inside the text' }],
          ['const poem = `első sor\nmásodik sor`;', { hu: 'többsoros szöveg backtickkel', en: 'multi-line text with backticks' }],
          ['"abc".length       // 3\n"abc"[0]           // "a"\n"abc".at(-1)       // "c"', { hu: 'hossz és egy karakter', en: 'length and a single character' }],
        ],
      },
      {
        title: { hu: 'Keresés', en: 'Searching' },
        items: [
          ['"frontend".includes("end")    // true', { hu: 'benne van-e', en: 'does it contain it' }],
          ['"photo.png".endsWith(".png")   // true', { hu: 'így végződik / így kezdődik (startsWith)', en: 'ends with / starts with (startsWith)' }],
          ['"banana".indexOf("an")         // 1\n"banana".lastIndexOf("an")     // 3', { hu: 'hol van (-1, ha nincs)', en: 'where it is (-1 if missing)' }],
        ],
      },
      {
        title: { hu: 'Vágás & darabolás', en: 'Cutting & splitting' },
        items: [
          ['"JavaScript".slice(0, 4)   // "Java"\n"JavaScript".slice(-6)     // "Script"', { hu: 'részlet kivágása (negatív index a végétől)', en: 'cut out a part (negative index counts from the end)' }],
          ['"a,b,c".split(",")          // ["a", "b", "c"]', { hu: 'darabolás tömbbé', en: 'split into an array' }],
          ['["a", "b"].join(" + ")      // "a + b"', { hu: 'vissza szöveggé', en: 'and back into text' }],
        ],
      },
      {
        title: { hu: 'Átalakítás', en: 'Transforming' },
        items: [
          ['"  hi  ".trim()             // "hi"', { hu: 'szóközök le a két végéről (trimStart, trimEnd)', en: 'remove spaces from both ends (trimStart, trimEnd)' }],
          ['"rika".toUpperCase()        // "RIKA"', { hu: 'nagybetűs / kisbetűs (toLowerCase)', en: 'upper case / lower case (toLowerCase)' }],
          ['"a-b-c".replaceAll("-", "/")  // "a/b/c"', { hu: 'csere – a replace csak az elsőt cseréli', en: 'replace – replace() only swaps the first one' }],
          ['"7".padStart(3, "0")        // "007"', { hu: 'kitöltés adott hosszra (padEnd)', en: 'pad to a given length (padEnd)' }],
          ['"ha".repeat(3)              // "hahaha"', { hu: 'ismétlés', en: 'repeat' }],
          ['"é".localeCompare("f", "hu")', { hu: 'nyelvhelyes összehasonlítás rendezéshez', en: 'language-aware comparison for sorting' }],
        ],
      },
    ],
  },
  {
    id: 'js-numbers',
    title: { hu: 'Számok, Math & dátumok', en: 'Numbers, Math & dates' },
    icon: '∑',
    level: 'kezdo',
    lang: 'js',
    tags: ['js', 'number', 'date'],
    intro: {
      hu: 'Számok átalakítása és formázása, a Math objektum, és a dátumok, amikkel mindenki megszenved egyszer.',
      en: 'Converting and formatting numbers, the Math object, and dates – everyone struggles with them once.',
    },
    sections: [
      {
        title: { hu: 'Számok', en: 'Numbers' },
        items: [
          ['Number("3.5")       // 3.5\nparseInt("42px")    // 42', { hu: 'szövegből szám (a parseInt megáll az első nem-számnál)', en: 'text to number (parseInt stops at the first non-digit)' }],
          ['(3.14159).toFixed(2)   // "3.14"', { hu: 'adott tizedesjegyre, szövegként', en: 'to a fixed number of decimals, as text' }],
          ['Number.isNaN(x)   Number.isInteger(x)', { hu: 'ellenőrzés: NaN-e, egész-e', en: 'checks: is it NaN, is it an integer' }],
          ['(1234567.891).toLocaleString("hu-HU")  // "1 234 567,891"', { hu: 'helyi formázás ezres elválasztóval', en: 'local formatting with thousand separators' }],
          ['0.1 + 0.2 === 0.3   // false!', { hu: 'lebegőpontos pontatlanság – pénzt egész fillérben számolj', en: 'floating point imprecision – count money in whole cents' }],
        ],
      },
      {
        title: 'Math',
        items: [
          ['Math.round(2.5)   // 3\nMath.floor(2.9)   // 2\nMath.ceil(2.1)    // 3', { hu: 'kerekítés: legközelebbi, lefelé, felfelé', en: 'rounding: nearest, down, up' }],
          ['Math.max(...nums)   Math.min(...nums)', { hu: 'legnagyobb / legkisebb (tömbből spread-del)', en: 'largest / smallest (spread an array)' }],
          ['Math.floor(Math.random() * 6) + 1', { hu: 'véletlen egész 1 és 6 között', en: 'a random integer from 1 to 6' }],
          ['Math.abs(-4)  Math.sqrt(16)  2 ** 10', { hu: 'abszolút érték, gyök, hatvány', en: 'absolute value, square root, power' }],
          ['Math.min(Math.max(x, 0), 100)', { hu: 'érték beszorítása 0 és 100 közé (clamp)', en: 'clamp a value between 0 and 100' }],
        ],
      },
      {
        title: { hu: 'Dátumok', en: 'Dates' },
        items: [
          ['const now = new Date();\nconst d = new Date(2026, 0, 31); // január = 0!', { hu: 'most, illetve adott nap – a hónap 0-tól számol', en: 'now, or a given day – months count from 0' }],
          ['d.getFullYear()  d.getMonth()  d.getDate()  d.getDay()', { hu: 'év, hónap (0–11), nap, a hét napja (0 = vasárnap)', en: 'year, month (0–11), day, weekday (0 = Sunday)' }],
          ['d.toISOString()   // "2026-01-30T23:00:00.000Z"', { hu: 'szabványos formátum (UTC-ben!)', en: 'standard format (in UTC!)' }],
          ['d.toLocaleDateString("hu-HU", { dateStyle: "long" })', { hu: 'emberi formátum: „2026. január 31.”', en: 'human format: “January 31, 2026” with en-US' }],
          ['const days = (b - a) / 86_400_000;', { hu: 'két dátum különbsége napokban (ms-ban számol)', en: 'difference of two dates in days (it counts in ms)' }],
          ['Date.now()', { hu: 'ezredmásodpercek 1970 óta – időméréshez jó', en: 'milliseconds since 1970 – good for timing' }],
        ],
      },
    ],
  },
  {
    id: 'js-arrays',
    title: { hu: 'JS tömbmetódusok', en: 'JS array methods' },
    icon: '≡',
    level: 'kezdo',
    lang: 'js',
    tags: ['javascript'],
    intro: {
      hu: 'A leggyakoribb tömbmetódusok egy helyen. Figyeld, melyik ad vissza új tömböt, és melyik írja át az eredetit.',
      en: 'The most used array methods in one place. Watch which ones return a new array and which ones change the original.',
    },
    sections: [
      {
        title: { hu: 'Bejárás & átalakítás', en: 'Loop & transform' },
        items: [
          ['arr.forEach(x => console.log(x));', { hu: 'végigmegy rajta, nem ad vissza semmit', en: 'loops over it, returns nothing' }],
          ['arr.map(x => x * 2);', { hu: 'új tömb, minden elem átalakítva', en: 'new array, every item transformed' }],
          ['arr.filter(x => x > 5);', { hu: 'csak a feltételnek megfelelők', en: 'only the matching items' }],
          ['arr.reduce((sum, x) => sum + x, 0);', { hu: 'egyetlen értékké gyúrja', en: 'boils it down to one value' }],
          ['arr.flatMap(x => [x, x]);', { hu: 'map + egy szintnyi lapítás', en: 'map + flatten one level' }],
        ],
      },
      {
        title: { hu: 'Keresés', en: 'Finding' },
        items: [
          ['arr.find(x => x.id === 3);', { hu: 'az első találat (vagy undefined)', en: 'the first match (or undefined)' }],
          ['arr.findIndex(x => x > 5);', { hu: 'az első találat indexe (vagy -1)', en: 'index of the first match (or -1)' }],
          ['arr.includes(42);', { hu: 'benne van?', en: 'is it in there?' }],
          ['arr.some(x => x < 0);', { hu: 'legalább egy igaz?', en: 'is at least one true?' }],
          ['arr.every(Boolean);', { hu: 'mind igaz?', en: 'are all of them true?' }],
          ['arr.at(-1);', { hu: 'az utolsó elem', en: 'the last item' }],
        ],
      },
      {
        title: { hu: 'Hozzáadás & törlés (átírja!)', en: 'Add & remove (mutates!)' },
        items: [
          ['arr.push(4);\narr.pop();', { hu: 'a végére tesz / a végéről vesz', en: 'add to / take from the end' }],
          ['arr.unshift(0);\narr.shift();', { hu: 'az elejére tesz / az elejéről vesz', en: 'add to / take from the start' }],
          ['arr.splice(1, 2);', { hu: 'az 1. indextől 2 elemet kivesz', en: 'removes 2 items from index 1' }],
          ['arr.slice(1, 3);', { hu: 'egy részlet másolata – ez NEM írja át', en: 'a copy of a part – this does NOT mutate' }],
          ['const all = [...a, ...b];', { hu: 'összefűzés spreaddel', en: 'concatenate with spread' }],
        ],
      },
      {
        title: { hu: 'Rendezés', en: 'Sorting' },
        items: [
          ['nums.sort((a, b) => a - b);', { hu: 'számok növekvőben (helyben rendez!)', en: 'numbers ascending (sorts in place!)' }],
          ['names.sort((a, b) => a.localeCompare(b));', { hu: 'szövegek, ékezethelyesen', en: 'strings, locale-aware' }],
          ['arr.toSorted();\narr.toReversed();', { hu: 'új tömböt adnak, az eredeti marad', en: 'return a new array, the original stays' }],
          ['arr.with(0, "first");', { hu: 'másolat, egy elem kicserélve', en: 'a copy with one item replaced' }],
        ],
      },
      {
        title: { hu: 'Létrehozás & átváltás', en: 'Create & convert' },
        items: [
          ['Array.from({ length: 3 }, (_, i) => i);', { hu: '[0, 1, 2]', en: '[0, 1, 2]' }],
          ['[...new Set(arr)];', { hu: 'duplikátumok nélkül', en: 'without duplicates' }],
          ['Object.entries(obj).map(([key, value]) => key);', { hu: 'objektum bejárása tömbként', en: 'loop over an object as an array' }],
          ['Object.groupBy(users, u => u.role);', { hu: 'csoportosítás kulcs szerint', en: 'group by a key' }],
          ['arr.join(", ");', { hu: 'szöveggé fűzi', en: 'joins into a string' }],
        ],
      },
    ],
  },
  {
    id: 'regex',
    title: { hu: 'Regex', en: 'Regex' },
    icon: '.*',
    level: 'kozep',
    lang: 'js',
    tags: ['js', 'regex', 'string'],
    intro: {
      hu: 'Reguláris kifejezések: mintakeresés szövegben. Ijesztőnek tűnik, de pár jellel a legtöbb feladat megoldható.',
      en: 'Regular expressions: pattern matching in text. They look scary, but a few symbols cover most tasks.',
    },
    sections: [
      {
        title: { hu: 'Létrehozás & flagek', en: 'Creating & flags' },
        items: [
          ['const re = /macska/i;', { hu: 'literál; i = kis- és nagybetű mindegy', en: 'literal; i = case-insensitive' }],
          ['new RegExp(word, "g")', { hu: 'változóból építve', en: 'built from a variable' }],
          ['g  i  m  s  u', { hu: 'flagek: mind (global), kisbetű mindegy, többsoros, a . a sortörésre is, unicode', en: 'flags: all matches, ignore case, multiline, . matches newlines, unicode' }],
        ],
      },
      {
        title: { hu: 'Karakterek', en: 'Characters' },
        items: [
          ['\\d  \\w  \\s', { hu: 'számjegy, betű/szám/_, szóköz-féle', en: 'digit, word character, whitespace' }],
          ['\\D  \\W  \\S', { hu: 'az előzők ellentéte', en: 'the opposite of the above' }],
          ['.', { hu: 'bármilyen karakter (a sortörést kivéve)', en: 'any character (except a newline)' }],
          ['[abc]  [a-z]  [^0-9]', { hu: 'karakterhalmaz, tartomány, tagadás', en: 'character set, range, negation' }],
          ['\\.  \\(  \\/', { hu: 'különleges jel szó szerint: visszaperjellel', en: 'a special character literally: escape it' }],
        ],
      },
      {
        title: { hu: 'Mennyiségek', en: 'Quantifiers' },
        items: [
          ['a*  a+  a?', { hu: '0 vagy több, 1 vagy több, 0 vagy 1', en: '0 or more, 1 or more, 0 or 1' }],
          ['\\d{4}  \\d{2,4}  \\d{3,}', { hu: 'pontosan 4, 2–4, legalább 3', en: 'exactly 4, 2 to 4, at least 3' }],
          ['<.+?>', { hu: 'lusta (?): a lehető legrövidebb egyezés', en: 'lazy (?): the shortest possible match' }],
        ],
      },
      {
        title: { hu: 'Horgonyok & csoportok', en: 'Anchors & groups' },
        items: [
          ['^start  end$', { hu: 'a szöveg (vagy m flaggel a sor) eleje / vége', en: 'start / end of the text (or of the line with m)' }],
          ['\\bcat\\b', { hu: 'szóhatár: csak a „cat” szó, a „category” nem', en: 'word boundary: only the word “cat”, not “category”' }],
          ['(ab)+   (?:ab)+', { hu: 'csoport (visszakérhető), nem mentő csoport', en: 'capturing group, non-capturing group' }],
          ['/(?<year>\\d{4})-(?<month>\\d{2})/', { hu: 'nevesített csoport: match.groups.year', en: 'named group: match.groups.year' }],
          ['cat|dog', { hu: 'vagy', en: 'or' }],
        ],
      },
      {
        title: { hu: 'Használat', en: 'Using it' },
        items: [
          ['/^\\d+$/.test("2026")   // true', { hu: 'illeszkedik-e (true / false)', en: 'does it match (true / false)' }],
          ['"a1b22".match(/\\d+/g)   // ["1", "22"]', { hu: 'az összes egyezés g flaggel', en: 'all matches with the g flag' }],
          ['for (const m of text.matchAll(/#(\\w+)/g)) tags.push(m[1]);', { hu: 'végig az egyezéseken, csoportokkal', en: 'loop over matches, with groups' }],
          ['"2026-01-31".replace(/(\\d+)-(\\d+)-(\\d+)/, "$3.$2.$1")', { hu: 'csere csoport-hivatkozással: „31.01.2026”', en: 'replace with group references: “31.01.2026”' }],
          ['"a, b ,c".split(/\\s*,\\s*/)', { hu: 'darabolás mintával', en: 'split by a pattern' }],
        ],
      },
      {
        title: { hu: 'Gyakori minták', en: 'Common patterns' },
        items: [
          ['/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/', { hu: 'egyszerű e-mail ellenőrzés (nem tökéletes, de elég)', en: 'a simple email check (not perfect, but enough)' }],
          ['/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i', { hu: 'hex színkód', en: 'hex color code' }],
          ['str.replace(/\\s+/g, " ").trim()', { hu: 'több szóköz helyett egy', en: 'collapse repeated spaces' }],
        ],
      },
    ],
  },
  {
    id: 'errors-json',
    title: { hu: 'Hibák & JSON', en: 'Errors & JSON' },
    icon: '⚠',
    level: 'kozep',
    lang: 'js',
    tags: ['js', 'errors', 'json'],
    intro: {
      hu: 'Hibák elkapása és dobása, a hibatípusok, és a JSON – amivel az adat a szerver, a böngésző és a localStorage között utazik.',
      en: 'Catching and throwing errors, the error types, and JSON – how data travels between server, browser and localStorage.',
    },
    sections: [
      {
        title: { hu: 'Hibakezelés', en: 'Handling errors' },
        items: [
          ['try {\n  risky();\n} catch (error) {\n  console.error(error.message);\n} finally {\n  hideSpinner();\n}', { hu: 'try / catch / finally – a finally mindig lefut', en: 'try / catch / finally – finally always runs' }],
          ['throw new Error("Nincs ilyen felhasználó");', { hu: 'saját hiba dobása (mindig Error objektumot dobj)', en: 'throw your own error (always throw an Error object)' }],
          ['class ValidationError extends Error {\n  constructor(field) {\n    super(`Hibás mező: ${field}`);\n    this.name = "ValidationError";\n  }\n}', { hu: 'saját hibatípus', en: 'your own error type' }],
          ['throw new Error("Mentés sikertelen", { cause: error });', { hu: 'az eredeti hiba továbbadása (cause)', en: 'keep the original error (cause)' }],
          ['window.addEventListener("unhandledrejection", e => report(e.reason));', { hu: 'el nem kapott Promise-hibák figyelése', en: 'listen for unhandled promise errors' }],
        ],
      },
      {
        title: { hu: 'Hibatípusok', en: 'Error types' },
        items: [
          ['TypeError', { hu: 'rossz típusú érték – pl. undefined.name', en: 'a value of the wrong type – e.g. undefined.name' }],
          ['ReferenceError', { hu: 'nem létező változó', en: 'a variable that does not exist' }],
          ['SyntaxError', { hu: 'hibás kód – vagy hibás JSON a JSON.parse-nak', en: 'broken code – or broken JSON for JSON.parse' }],
          ['RangeError', { hu: 'érték a megengedett tartományon kívül', en: 'a value outside the allowed range' }],
          ['error instanceof TypeError', { hu: 'típus szerinti elágazás a catch-ben', en: 'branch on the type inside catch' }],
        ],
      },
      {
        title: 'JSON',
        items: [
          ['JSON.stringify({ name: "Rika", age: 30 })', { hu: 'objektumból szöveg', en: 'object to text' }],
          ['JSON.stringify(data, null, 2)', { hu: 'szépen behúzva, olvashatóan', en: 'pretty-printed with indentation' }],
          ['const user = JSON.parse(text);', { hu: 'szövegből objektum – hibás szövegnél SyntaxError', en: 'text to object – throws SyntaxError on bad text' }],
          ['JSON.parse(text, (key, value) => key === "date" ? new Date(value) : value)', { hu: 'reviver: értékek átalakítása beolvasáskor', en: 'reviver: convert values while parsing' }],
          ['undefined, függvény, Symbol', { hu: 'ezek kimaradnak a JSON-ból, a Date szöveggé válik', en: 'these are left out of JSON, a Date becomes a string' }],
        ],
      },
      {
        title: { hu: 'Tárolás a böngészőben', en: 'Storing in the browser' },
        items: [
          ['localStorage.setItem("todos", JSON.stringify(todos));', { hu: 'mentés – csak szöveget tud tárolni', en: 'save – it can only store text' }],
          ['const todos = JSON.parse(localStorage.getItem("todos") ?? "[]");', { hu: 'visszaolvasás alapértékkel', en: 'read it back with a default' }],
          ['localStorage.removeItem("todos");  sessionStorage', { hu: 'törlés; a sessionStorage a fül bezárásáig él', en: 'remove; sessionStorage lives until the tab closes' }],
        ],
      },
    ],
  },
  {
    id: 'js-globals',
    title: { hu: 'Globális függvények & időzítők', en: 'Global functions & timers' },
    icon: '()',
    level: 'kozep',
    lang: 'js',
    tags: ['js', 'timers', 'url'],
    intro: {
      hu: 'Beépített függvények, amik bárhonnan elérhetők: számátalakítás, URL-kódolás, időzítők és másolás.',
      en: 'Built-in functions available everywhere: number parsing, URL encoding, timers and copying.',
    },
    sections: [
      {
        title: { hu: 'Számok', en: 'Numbers' },
        items: [
          ['parseInt("08", 10)   parseFloat("3.5kg")', { hu: 'szövegből szám – a parseInt-nek add meg a számrendszert', en: 'text to number – give parseInt the radix' }],
          ['isNaN("abc")   Number.isNaN("abc")', { hu: 'a globális isNaN előbb átalakít – a Number.isNaN pontosabb', en: 'global isNaN converts first – Number.isNaN is stricter' }],
          ['isFinite(x)', { hu: 'véges szám-e (nem Infinity, nem NaN)', en: 'is it a finite number (not Infinity or NaN)' }],
        ],
      },
      {
        title: 'URL',
        items: [
          ['encodeURIComponent("kék & sárga")', { hu: 'érték biztonságosan URL-be: „k%C3%A9k%20%26%20s%C3%A1rga”', en: 'safely put a value into a URL' }],
          ['decodeURIComponent(param)', { hu: 'és vissza', en: 'and back' }],
          ['const params = new URLSearchParams(location.search);\nparams.get("page");', { hu: 'a ?page=2 típusú paraméterek kényelmesen', en: '?page=2 style parameters, the easy way' }],
          ['const url = new URL("/api/users", location.origin);', { hu: 'URL összerakása részekből', en: 'build a URL from parts' }],
        ],
      },
      {
        title: { hu: 'Időzítők', en: 'Timers' },
        items: [
          ['const id = setTimeout(() => save(), 500);\nclearTimeout(id);', { hu: 'egyszer, késleltetve – és a visszavonása', en: 'once, after a delay – and cancelling it' }],
          ['const id = setInterval(tick, 1000);\nclearInterval(id);', { hu: 'ismétlődve, amíg le nem állítod', en: 'repeatedly, until you stop it' }],
          ['requestAnimationFrame(draw);', { hu: 'animációhoz: a következő képkocka előtt fut', en: 'for animation: runs before the next frame' }],
          ['queueMicrotask(() => …)', { hu: 'a mostani feladat után, még a setTimeout előtt', en: 'after the current task, before any setTimeout' }],
        ],
      },
      {
        title: { hu: 'Másolás & egyéb', en: 'Copying & more' },
        items: [
          ['const copy = structuredClone(original);', { hu: 'mély másolat – beágyazott objektumokkal együtt', en: 'a deep copy – nested objects included' }],
          ['globalThis', { hu: 'a globális objektum mindenhol (böngésző, Node, worker)', en: 'the global object everywhere (browser, Node, worker)' }],
          ['eval(code)', { hu: 'szövegből futtat kódot – ne használd, biztonsági kockázat', en: 'runs code from text – don’t use it, it’s a security risk' }],
        ],
      },
    ],
  },
  {
    id: 'async-js',
    title: { hu: 'Aszinkron JavaScript', en: 'Async JavaScript' },
    icon: '↻',
    level: 'kozep',
    lang: 'js',
    tags: ['javascript', 'async'],
    intro: {
      hu: 'Promise, async/await, fetch és az event loop: hogyan vársz valamire úgy, hogy közben nem fagy le az oldal.',
      en: 'Promises, async/await, fetch and the event loop: how to wait for something without freezing the page.',
    },
    sections: [
      {
        title: 'Promise',
        items: [
          ['const p = new Promise((resolve, reject) => {\n  setTimeout(() => resolve("done"), 1000);\n});', { hu: 'ígéret egy később érkező értékre', en: 'a promise of a value that arrives later' }],
          ['p.then(value => use(value))\n .catch(err => show(err))\n .finally(() => hideSpinner());', { hu: 'siker, hiba, és ami mindig lefut', en: 'success, error, and what always runs' }],
          ['Promise.resolve(42);', { hu: 'már teljesült promise', en: 'an already resolved promise' }],
        ],
      },
      {
        title: 'async / await',
        items: [
          ['async function load(url) {\n  const res = await fetch(url);\n  return res.json();\n}', { hu: 'az await megvárja a promise-t', en: 'await waits for the promise' }],
          ['try {\n  await load(url);\n} catch (err) {\n  console.error(err);\n}', { hu: 'hibakezelés try/catch-csel', en: 'handle errors with try/catch' }],
          ['const sleep = ms => new Promise(r => setTimeout(r, ms));', { hu: 'várakozás: await sleep(500)', en: 'waiting: await sleep(500)' }],
        ],
      },
      {
        title: { hu: 'Párhuzamosan', en: 'In parallel' },
        items: [
          ['await Promise.all([a(), b()]);', { hu: 'mind kell; egy hiba = az egész hiba', en: 'need all of them; one failure = failure' }],
          ['await Promise.allSettled([a(), b()]);', { hu: 'mindet megvárja, a hibásakat is', en: 'waits for all, failures included' }],
          ['await Promise.race([a(), timeout(5000)]);', { hu: 'az első, ami végez', en: 'the first to settle wins' }],
          ['await Promise.any([a(), b()]);', { hu: 'az első sikeres', en: 'the first to succeed' }],
        ],
      },
      {
        title: 'fetch',
        items: [
          ['const res = await fetch("/api/users");\nif (!res.ok) throw new Error(res.status);\nconst users = await res.json();', { hu: 'GET + hibaellenőrzés (a 404 magától nem dob!)', en: 'GET + error check (a 404 does not throw on its own!)' }],
          ['await fetch("/api/users", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify(user),\n});', { hu: 'POST, JSON törzzsel', en: 'POST with a JSON body' }],
          ['const ctrl = new AbortController();\nfetch(url, { signal: ctrl.signal });\nctrl.abort();', { hu: 'kérés megszakítása', en: 'cancel a request' }],
          ['fetch(url, { signal: AbortSignal.timeout(5000) });', { hu: 'időkorlát 5 másodperc', en: '5 second timeout' }],
        ],
      },
      {
        title: { hu: 'Event loop – mit ír ki?', en: 'Event loop – what does it log?' },
        items: [
          ['console.log(1);\nsetTimeout(() => console.log(2));\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);\n// 1, 4, 3, 2', { hu: 'szinkron → microtask (promise) → macrotask (setTimeout)', en: 'sync → microtasks (promises) → macrotasks (setTimeout)' }],
          ['queueMicrotask(() => flush());', { hu: 'saját microtask ütemezése', en: 'schedule your own microtask' }],
        ],
      },
    ],
  },
  {
    id: 'dom',
    title: { hu: 'DOM kezelés', en: 'DOM manipulation' },
    icon: '</>',
    level: 'kezdo',
    lang: 'js',
    tags: ['javascript', 'dom'],
    intro: {
      hu: 'Elemek kiválasztása, módosítása, létrehozása és eseménykezelés – keretrendszer nélkül.',
      en: 'Selecting, changing and creating elements, and handling events – no framework needed.',
    },
    sections: [
      {
        title: { hu: 'Kiválasztás', en: 'Selecting' },
        items: [
          ['document.querySelector(".card");', { hu: 'az első találat', en: 'the first match' }],
          ['document.querySelectorAll("li");', { hu: 'mind (NodeList, van forEach-e)', en: 'all of them (NodeList, has forEach)' }],
          ['document.getElementById("app");', { hu: 'id alapján', en: 'by id' }],
          ['el.closest(".card");', { hu: 'a legközelebbi illeszkedő ős', en: 'the nearest matching ancestor' }],
        ],
      },
      {
        title: { hu: 'Tartalom & stílus', en: 'Content & style' },
        items: [
          ['el.textContent = "Hello";', { hu: 'biztonságos szöveg', en: 'safe text' }],
          ['el.innerHTML = "<b>Hi</b>";', { hu: 'HTML – felhasználói adattal XSS-veszély!', en: 'HTML – an XSS risk with user data!' }],
          ['el.classList.toggle("active");', { hu: 'add, remove, contains is van', en: 'also add, remove, contains' }],
          ['el.dataset.id;', { hu: 'a data-id attribútum', en: 'the data-id attribute' }],
          ['el.style.setProperty("--color", "tomato");', { hu: 'CSS változó JS-ből', en: 'a CSS variable from JS' }],
          ['el.setAttribute("aria-expanded", "true");', { hu: 'attribútum írása', en: 'write an attribute' }],
        ],
      },
      {
        title: { hu: 'Létrehozás & törlés', en: 'Create & remove' },
        items: [
          ['const li = document.createElement("li");', { hu: 'új elem', en: 'a new element' }],
          ['list.append(li);\nlist.prepend(li);', { hu: 'a végére / az elejére', en: 'at the end / at the start' }],
          ['el.remove();', { hu: 'törlés', en: 'remove it' }],
          ['el.insertAdjacentHTML("beforeend", html);', { hu: 'HTML beszúrása adott helyre', en: 'insert HTML at a position' }],
          ['const copy = tpl.content.cloneNode(true);', { hu: 'egy <template> másolása', en: 'clone a <template>' }],
        ],
      },
      {
        title: { hu: 'Események', en: 'Events' },
        items: [
          ['btn.addEventListener("click", handleClick);', { hu: 'feliratkozás', en: 'subscribe' }],
          ['event.preventDefault();', { hu: 'az alapművelet tiltása (pl. form submit)', en: 'block the default action (e.g. form submit)' }],
          ['list.addEventListener("click", (event) => {\n  const item = event.target.closest("li");\n  if (item) select(item);\n});', { hu: 'delegálás: egy listener sok elemre', en: 'delegation: one listener for many items' }],
          ['el.addEventListener("scroll", fn, { passive: true });', { hu: 'opciók: passive, once, signal', en: 'options: passive, once, signal' }],
          ['document.addEventListener("DOMContentLoaded", init);', { hu: 'amikor kész a DOM', en: 'when the DOM is ready' }],
        ],
      },
      {
        title: { hu: 'Méret & görgetés', en: 'Size & scroll' },
        items: [
          ['el.getBoundingClientRect();', { hu: 'méret és pozíció', en: 'size and position' }],
          ['el.scrollIntoView({ behavior: "smooth" });', { hu: 'odagörget', en: 'scrolls to it' }],
          ['new IntersectionObserver(onVisible).observe(el);', { hu: 'látszik-e (lazy load, animáció)', en: 'is it visible? (lazy loading, animations)' }],
        ],
      },
    ],
  },
  {
    id: 'git',
    title: 'Git',
    icon: '⎇',
    level: 'kezdo',
    lang: 'sh',
    tags: ['git', 'tools'],
    intro: {
      hu: 'A napi Git-parancsok: mentés, branchek, feltöltés és visszavonás.',
      en: 'Everyday Git commands: saving, branches, pushing and undoing.',
    },
    sections: [
      {
        title: { hu: 'Kezdés', en: 'Getting started' },
        items: [
          ['git init', { hu: 'új repó ebben a mappában', en: 'new repo in this folder' }],
          ['git clone <url>', { hu: 'meglévő repó letöltése', en: 'download an existing repo' }],
          ['git config --global user.name "Your Name"', { hu: 'ki vagy (egyszer kell)', en: 'who you are (once)' }],
        ],
      },
      {
        title: { hu: 'Napi munka', en: 'Everyday' },
        items: [
          ['git status', { hu: 'mi változott?', en: 'what changed?' }],
          ['git add .', { hu: 'minden változás mehet a következő commitba', en: 'stage every change for the next commit' }],
          ['git commit -m "Add navbar"', { hu: 'pillanatkép üzenettel', en: 'a snapshot with a message' }],
          ['git log --oneline', { hu: 'rövid történet', en: 'compact history' }],
          ['git diff', { hu: 'mi változott pontosan', en: 'what exactly changed' }],
        ],
      },
      {
        title: 'Branch',
        items: [
          ['git switch -c feature/menu', { hu: 'új branch és átváltás rá', en: 'create a branch and switch to it' }],
          ['git switch main', { hu: 'váltás', en: 'switch' }],
          ['git merge feature/menu', { hu: 'beolvasztás a mostani branchbe', en: 'merge into the current branch' }],
          ['git branch -d feature/menu', { hu: 'branch törlése', en: 'delete a branch' }],
        ],
      },
      {
        title: { hu: 'Távoli repó', en: 'Remote' },
        items: [
          ['git remote -v', { hu: 'hova mutat?', en: 'where does it point?' }],
          ['git push -u origin main', { hu: 'első feltöltés', en: 'first push' }],
          ['git pull', { hu: 'letöltés + merge', en: 'fetch + merge' }],
          ['git fetch', { hu: 'csak letöltés', en: 'fetch only' }],
        ],
      },
      {
        title: { hu: 'Visszavonás', en: 'Undo' },
        items: [
          ['git restore app.js', { hu: 'helyi módosítás eldobása', en: 'discard local changes' }],
          ['git restore --staged app.js', { hu: 'kivétel a következő commitból', en: 'unstage' }],
          ['git commit --amend', { hu: 'az utolsó commit javítása (push előtt!)', en: 'fix the last commit (before pushing!)' }],
          ['git revert <hash>', { hu: 'egy commit visszacsinálása új committal', en: 'undo a commit with a new commit' }],
          ['git stash\ngit stash pop', { hu: 'félretesz, majd visszavesz', en: 'shelve, then bring back' }],
        ],
      },
    ],
  },
  {
    id: 'react-hooks',
    title: { hu: 'React hookok', en: 'React hooks' },
    icon: '⚛',
    level: 'kozep',
    lang: 'js',
    tags: ['react', 'javascript'],
    intro: {
      hu: 'Állapot, mellékhatások, referenciák és context – a hookok, amiket naponta használsz.',
      en: 'State, side effects, refs and context – the hooks you use every day.',
    },
    sections: [
      {
        title: 'useState',
        items: [
          ['const [count, setCount] = useState(0);', { hu: 'állapot + beállító függvény', en: 'state + setter' }],
          ['setCount(c => c + 1);', { hu: 'az előző értékből számolj', en: 'compute from the previous value' }],
          ['setUser(u => ({ ...u, name }));', { hu: 'objektumot mindig másolj, ne írd át', en: 'always copy objects, never mutate' }],
        ],
      },
      {
        title: 'useEffect',
        items: [
          ['useEffect(() => {\n  document.title = title;\n}, [title]);', { hu: 'lefut, ha a függőség változik', en: 'runs when a dependency changes' }],
          ['useEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id);\n}, []);', { hu: 'takarítás: a visszaadott függvény', en: 'cleanup: the returned function' }],
          ['useEffect(load, []);', { hu: 'üres tömb: csak egyszer, megjelenéskor', en: 'empty array: only once, on mount' }],
        ],
      },
      {
        title: 'useRef',
        items: [
          ['const inputRef = useRef(null);\n<input ref={inputRef} />', { hu: 'DOM elem elérése', en: 'access a DOM element' }],
          ['inputRef.current.focus();', { hu: 'a .current-ben van', en: 'it lives in .current' }],
          ['const renders = useRef(0);', { hu: 'érték, ami nem okoz újrarenderelést', en: 'a value that does not trigger a re-render' }],
        ],
      },
      {
        title: 'useContext',
        items: [
          ['const ThemeContext = createContext("light");', { hu: 'context létrehozása', en: 'create a context' }],
          ['<ThemeContext.Provider value="dark">\n  <App />\n</ThemeContext.Provider>', { hu: 'érték biztosítása lefelé', en: 'provide a value downwards' }],
          ['const theme = useContext(ThemeContext);', { hu: 'kiolvasás bárhol alatta', en: 'read it anywhere below' }],
        ],
      },
      {
        title: { hu: 'Teljesítmény', en: 'Performance' },
        items: [
          ['const total = useMemo(() => sum(items), [items]);', { hu: 'drága számítás eltárolása', en: 'cache an expensive calculation' }],
          ['const onSave = useCallback(() => save(id), [id]);', { hu: 'stabil függvény-referencia', en: 'a stable function reference' }],
          ['export default memo(Row);', { hu: 'csak akkor renderel, ha a props változik', en: 'only re-renders when props change' }],
        ],
      },
      {
        title: { hu: 'useReducer & saját hook', en: 'useReducer & custom hooks' },
        items: [
          ['const [state, dispatch] = useReducer(reducer, initial);\ndispatch({ type: "add", item });', { hu: 'összetettebb állapothoz', en: 'for more complex state' }],
          ['function useToggle(initial = false) {\n  const [on, setOn] = useState(initial);\n  return [on, () => setOn(o => !o)];\n}', { hu: 'saját hook: a neve use…-val kezdődik', en: 'custom hook: its name starts with use…' }],
        ],
      },
    ],
  },
];
