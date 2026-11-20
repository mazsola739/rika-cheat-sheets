/*
 * Cheat sheetek tartalma (magyarul és angolul).
 *
 * Egy sor: [kód, magyarázat]  — a magyarázat lehet sima szöveg vagy { hu, en }.
 * Több soros kódhoz használj \n-t. A kód mindkét nyelven ugyanaz.
 * level: 'kezdo' | 'kozep' | 'halado'
 * lang: a kódkiemelés nyelve ('css' | 'js' | 'sh')
 * playground: 'flexbox' | 'grid' (opcionális interaktív játszótér)
 */
window.CHEATSHEETS = [
  {
    id: 'flexbox',
    title: 'Flexbox',
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
    id: 'js-arrays',
    title: { hu: 'JS tömbmetódusok', en: 'JS array methods' },
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
    id: 'async-js',
    title: { hu: 'Aszinkron JavaScript', en: 'Async JavaScript' },
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
