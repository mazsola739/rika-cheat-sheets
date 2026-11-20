/*
 * Fejlesztési alapelvek (magyarul és angolul).
 *
 * Egy kártya:
 *  - big:     a nagy felirat az előlapon (rövidítés vagy egy szó)
 *  - name:    a teljes név (angolul, ahogy a szakmában mondják)
 *  - group:   'core' | 'solid' | 'design' | 'frontend'
 *  - summary: egy mondat a lényegről             { hu, en }
 *  - why:     miért jó                             { hu, en }
 *  - bad / good: rövid kódpélda (a kód mindkét nyelven ugyanaz)
 *  - watch:   mire figyelj, mikor ne vidd túlzásba { hu, en }
 *  - lang:    kódkiemelés nyelve (alapból 'js')
 */
window.PRINCIPLES = {
  groups: {
    core: { hu: 'Alapelvek', en: 'Core ideas' },
    debug: { hu: 'Gondolkodás, hibakeresés', en: 'Thinking & debugging' },
    workflow: { hu: 'Munkamódszer', en: 'Workflow' },
    solid: { hu: 'SOLID', en: 'SOLID' },
    design: { hu: 'Tervezés', en: 'Design' },
    frontend: { hu: 'Frontend', en: 'Frontend' },
  },
  cards: [
    {
      id: 'kiss',
      big: 'KISS',
      name: 'Keep It Simple, Stupid',
      group: 'core',
      summary: { hu: 'Mindig a legegyszerűbb, legkönnyebben érthető megoldást válaszd – ne próbálj „okosnak tűnő”, trükkös egysorosokat írni.', en: 'Always pick the simplest, easiest-to-understand solution – don’t try to write clever-looking, tricky one-liners.' },
      why: {
        hu: 'Az egyszerű kódot könnyebb olvasni, tesztelni és javítani. A bonyolultság hibákat szül, és mindenkit lelassít – a jövőbeli magadat is.',
        en: 'Simple code is easier to read, test and fix. Complexity breeds bugs and slows everyone down – including future you.',
      },
      bad: 'const isEven = n => (n % 2 === 0 ? true : false) === true;',
      good: 'const isEven = n => n % 2 === 0;',
      watch: {
        hu: 'Egyszerű ≠ hiányos: a hibakezelés és az akadálymentesség nem „bonyolítás”.',
        en: 'Simple ≠ incomplete: error handling and accessibility are not “complexity”.',
      },
    },
    {
      id: 'yagni',
      big: 'YAGNI',
      name: "You Aren't Gonna Need It",
      group: 'core',
      summary: { hu: 'Csak azt írd meg, amire most van szükség. Ne építs bonyolult extrákat „hátha egyszer jó lesz” alapon.', en: 'Only build what you need right now. No complicated extras “just in case they come in handy one day”.' },
      why: {
        hu: 'Minden felesleges funkció több kódot, tesztet és karbantartást jelent, és sokszor soha nem lesz rá szükség – vagy egészen máshogy kell majd.',
        en: 'Every extra feature means more code, tests and maintenance – and often it is never needed, or needed in a different shape.',
      },
      bad: "function formatPrice(price, currency = 'HUF', locale, rounding, plugins = []) {\n  // 5 options, only 1 is used today\n}",
      good: 'const formatPrice = price => `${price} Ft`;',
      watch: {
        hu: 'A YAGNI nem azt jelenti, hogy sose gondolkodj előre: a tiszta, könnyen bővíthető kód belefér.',
        en: 'YAGNI does not mean “never plan ahead”: clean, easy-to-extend code is still welcome.',
      },
    },
    {
      id: 'dry',
      big: 'DRY',
      name: "Don't Repeat Yourself",
      group: 'core',
      summary: { hu: 'Ha ugyanazt a 3-4 sor kódot már másodszor-harmadszor másolod be valahova, szervezd ki egy külön függvénybe.', en: 'If you are pasting the same 3–4 lines of code for the second or third time, move them into a function of their own.' },
      why: {
        hu: 'Ha ugyanaz a szabály három helyen van, változáskor kettőt biztosan elfelejtesz.',
        en: 'If the same rule lives in three places, you will forget two of them when it changes.',
      },
      bad: 'if (user.age >= 18) showShop();\nif (user.age >= 18) showCheckout();',
      good: 'const isAdult = user => user.age >= 18;\n\nif (isAdult(user)) {\n  showShop();\n  showCheckout();\n}',
      watch: {
        hu: 'Ne vidd túlzásba: két hasonló kódrészlet nem mindig ugyanaz a tudás (lásd: AHA).',
        en: 'Don’t overdo it: two similar-looking pieces of code are not always the same knowledge (see AHA).',
      },
    },
    {
      id: 'aha',
      big: 'AHA',
      name: 'Rule of Three · Avoid Hasty Abstractions',
      group: 'core',
      summary: { hu: 'Ne aggódj, ha kétszer leírod ugyanazt – közös sablont vagy függvényt csak akkor gyárts, ha már harmadszor is ugyanazt kellene megírnod.', en: 'Don’t worry about writing the same thing twice – only make a shared template or function when you would have to write it a third time.' },
      why: {
        hu: 'A túl korán összevont kód megtelik if-ekkel és kapcsolókkal. A duplikáció olcsóbb, mint a rossz absztrakció.',
        en: 'An abstraction made too early fills up with ifs and flags. Duplication is cheaper than the wrong abstraction.',
      },
      bad: 'function renderCard(item, isUser, isProduct, hidePrice, compact) {\n  // a new flag for every new use\n}',
      good: 'function UserCard(user) { /* ... */ }\nfunction ProductCard(product) { /* ... */ }',
      watch: {
        hu: 'Ha már tisztán látod a mintát, nyugodtan vond össze.',
        en: 'Once the pattern is clear, go ahead and merge.',
      },
    },
    {
      id: 'boy-scout',
      big: { hu: 'Cserkész', en: 'Scout' },
      name: 'The Boy Scout Rule',
      group: 'core',
      summary: { hu: 'Mindig hagyj egy kicsit tisztább kódot magad után, mint ahogy találtad (pl. törölj ki egy felesleges kommentet, vagy nevezz át egy rossz változót).', en: 'Always leave the code a little cleaner than you found it (delete a useless comment, or rename a badly named variable).' },
      why: {
        hu: 'Apró javítások – jobb név, törölt halott kód – idővel nagy különbséget adnak, nagy átírás nélkül.',
        en: 'Small fixes – a better name, removed dead code – add up over time without a big rewrite.',
      },
      bad: '// TODO: fix this later (2019)\nconst d = getD(u);',
      good: 'const discount = getDiscount(user);',
      watch: {
        hu: 'Maradj kicsiben: a nagy átalakítás legyen külön feladat és külön commit.',
        en: 'Keep it small: big refactors deserve their own task and their own commit.',
      },
    },
    {
      id: 'premature-optimization',
      big: { hu: 'Előbb működjön', en: 'Work, right, fast' },
      name: 'Make It Work, Make It Right, Make It Fast',
      group: 'debug',
      summary: { hu: 'Először csak működjön a program (akár csúnyán is). Másodszor tisztítsd meg a kódot. Harmadszor – és csak ha tényleg lassú – gyorsítsd fel.', en: 'First make it work (even if it’s ugly). Then clean up the code. Only then – and only if it’s really slow – make it fast.' },
      why: {
        hu: 'A kód nagy része sosem lesz szűk keresztmetszet. A „gyors” trükkök épp ott teszik olvashatatlanná a kódot, ahol semmit sem nyersz velük.',
        en: 'Most code is never the bottleneck. Clever speed tricks make code unreadable exactly where they gain nothing.',
      },
      bad: 'for (let i = arr.length; i--; ) total += arr[i] | 0;',
      good: 'const total = arr.reduce((sum, n) => sum + n, 0);',
      watch: {
        hu: 'A nyilvánvalóan lassú dolgokat (pl. 10 000 elem egyszerre a DOM-ba) azért kerüld el.',
        en: 'Still avoid the obviously slow things, like putting 10,000 items into the DOM at once.',
      },
    },
    {
      id: 'srp',
      big: 'S',
      name: 'Single Responsibility Principle',
      group: 'solid',
      summary: { hu: 'Egy függvény csak egyetlen dolgot csináljon. Ha a nevében benne van az „és” szó (pl. validateAndSaveUser), szedd szét két függvényre.', en: 'A function should do one thing only. If its name contains “and” (like validateAndSaveUser), split it into two functions.' },
      why: {
        hu: 'Ha egy függvény adatot tölt be, formáz és a DOM-ot is írja, bármelyik változás eltörheti a többit.',
        en: 'If one function fetches data, formats it and writes the DOM, any change can break the others.',
      },
      bad: 'async function showUser(id) {\n  const user = await fetch(`/api/users/${id}`).then(r => r.json());\n  el.innerHTML = `<b>${user.name.toUpperCase()}</b>`;\n}',
      good: 'const loadUser = id => fetch(`/api/users/${id}`).then(r => r.json());\nconst formatName = user => user.name.toUpperCase();\nconst renderName = (el, name) => (el.textContent = name);',
      watch: {
        hu: 'Nem kell minden sorból külön függvény: a „felelősség” egy értelmes egység.',
        en: 'Not every line needs its own function: a “responsibility” is a meaningful unit.',
      },
    },
    {
      id: 'ocp',
      big: 'O',
      name: 'Open/Closed Principle',
      group: 'solid',
      summary: { hu: 'Bővíthető legyen új kóddal, a meglévő átírása nélkül.', en: 'Open for extension, closed for modification: add new code instead of editing old code.' },
      why: {
        hu: 'Ha minden új esetnél egy nagy if-láncot kell bővíteni, előbb-utóbb eltörsz egy régi esetet.',
        en: 'If every new case means editing a big if-chain, sooner or later you break an old case.',
      },
      bad: "function area(shape) {\n  if (shape.type === 'circle') return Math.PI * shape.r ** 2;\n  if (shape.type === 'square') return shape.a ** 2;\n  // every new shape = edit this function\n}",
      good: 'const areas = {\n  circle: s => Math.PI * s.r ** 2,\n  square: s => s.a ** 2,\n};\nconst area = shape => areas[shape.type](shape);\n// new shape = one new line in areas',
      watch: {
        hu: 'Előre nem kell mindent bővíthetővé tenni (YAGNI) – csak ott, ahol tényleg sorra jönnek az új esetek.',
        en: 'Don’t make everything pluggable up front (YAGNI) – only where new cases really keep coming.',
      },
    },
    {
      id: 'lsp',
      big: 'L',
      name: 'Liskov Substitution Principle',
      group: 'solid',
      summary: { hu: 'Egy altípusnak mindenhol működnie kell, ahol az ősét várjuk.', en: 'A subtype must work everywhere its parent type is expected.' },
      why: {
        hu: 'Ha a „speciális” változat másképp viselkedik, ott jönnek meglepő hibák, ahol senki sem számít rájuk.',
        en: 'If the “special” version behaves differently, surprising bugs show up where nobody expects them.',
      },
      bad: "class Bird { fly() { return 'flying'; } }\n\nclass Penguin extends Bird {\n  fly() { throw new Error('Penguins cannot fly'); }\n}",
      good: "class Bird { move() { return 'moving'; } }\n\nclass Penguin extends Bird {\n  move() { return 'swimming'; }\n}",
      watch: {
        hu: 'Frontendben gyakran a props-ra igaz: egy gombváltozat is fogadja el ugyanazokat a props-okat, mint a sima gomb.',
        en: 'In frontend it often applies to props: a button variant should accept the same props as the plain button.',
      },
    },
    {
      id: 'isp',
      big: 'I',
      name: 'Interface Segregation Principle',
      group: 'solid',
      summary: { hu: 'Senki ne függjön olyasmitől, amit nem használ.', en: 'No one should depend on things they don’t use.' },
      why: {
        hu: 'A kicsi, célzott interfészeket (vagy props-okat) könnyebb megérteni, tesztelni és cserélni.',
        en: 'Small, focused interfaces (or props) are easier to understand, test and replace.',
      },
      bad: '<Avatar user={user} />\n// Avatar only needs the photo and the name',
      good: '<Avatar src={user.photo} name={user.name} />',
      watch: {
        hu: 'Ne darabold túl: 15 apró prop sem jobb.',
        en: 'Don’t split too far: 15 tiny props are not better either.',
      },
    },
    {
      id: 'dip',
      big: 'D',
      name: 'Dependency Inversion Principle',
      group: 'solid',
      summary: { hu: 'A kód absztrakciókra támaszkodjon, ne konkrét megvalósításokra.', en: 'Depend on abstractions, not on concrete implementations.' },
      why: {
        hu: 'Ha a függőséget kívülről kapod, könnyű lecserélni, vagy tesztben egy álváltozatra cserélni.',
        en: 'If a dependency is passed in from outside, it is easy to swap – or to fake in a test.',
      },
      bad: "function saveNote(note) {\n  localStorage.setItem('note', JSON.stringify(note));\n}",
      good: "const saveNote = (note, storage = localStorage) =>\n  storage.setItem('note', JSON.stringify(note));\n\n// in a test: saveNote(note, fakeStorage)",
      watch: {
        hu: 'Nem kell mindent kívülről beadni – csak azt, amit tényleg cserélnél.',
        en: 'You don’t have to pass in everything – only what you might really swap.',
      },
    },
    {
      id: 'soc',
      big: 'SoC',
      name: 'Separation of Concerns',
      group: 'design',
      summary: { hu: 'A különböző feladatok külön helyre kerüljenek: tartalom, kinézet, viselkedés.', en: 'Keep different concerns apart: content, presentation, behaviour.' },
      why: {
        hu: 'A weben ez a HTML–CSS–JS hármas, Reactben a felület és a logika szétválasztása. Így minden rész külön változhat.',
        en: 'On the web it is HTML, CSS and JS; in React it means splitting UI from logic. Then each part can change on its own.',
      },
      bad: '<button onclick="this.style.color=\'red\'; save()">Save</button>',
      good: "// HTML: <button class=\"save\">Save</button>\n// CSS:  .save.done { color: red; }\nsaveBtn.addEventListener('click', () => {\n  save();\n  saveBtn.classList.add('done');\n});",
      watch: {
        hu: 'A szétválasztás felelősségekről szól, nem fájlokról: egy komponensen belül is lehet tiszta.',
        en: 'It is about responsibilities, not files: one component can still be cleanly separated.',
      },
    },
    {
      id: 'composition',
      big: { hu: 'Kompozíció', en: 'Composition' },
      name: 'Composition over inheritance',
      group: 'design',
      summary: { hu: 'Kis darabokból rakd össze, ne mély öröklési láncot építs.', en: 'Build from small pieces instead of deep inheritance chains.' },
      why: {
        hu: 'Az öröklés merev: a gyerek mindent örököl, akkor is, ha nem kell. Az összerakás rugalmas – a React is így működik.',
        en: 'Inheritance is rigid: children inherit everything, wanted or not. Composition is flexible – it is how React works.',
      },
      bad: 'class Button {}\nclass IconButton extends Button {}\nclass RedIconButton extends IconButton {}',
      good: '<Button color="red">\n  <Icon name="heart" /> Like\n</Button>',
      watch: {
        hu: 'Az öröklés nem tilos: egy rövid, egyértelmű „ez egy fajtája annak” kapcsolatnál rendben van.',
        en: 'Inheritance is not forbidden: a short, clear “is a kind of” relationship is fine.',
      },
    },
    {
      id: 'demeter',
      big: 'Demeter',
      name: 'Law of Demeter',
      group: 'design',
      summary: { hu: 'Csak a közvetlen „barátaiddal” beszélj, ne nyúlj át más objektumok belsején.', en: 'Only talk to your direct friends; don’t reach through other objects’ insides.' },
      why: {
        hu: 'A hosszú pontláncok minden belső átalakításnál eltörnek.',
        en: 'Long dot chains break whenever an inner structure changes.',
      },
      bad: 'const city = order.customer.address.city.name;',
      good: 'const city = getShippingCity(order);',
      watch: {
        hu: 'Sima adatnál (pl. egy JSON-válasznál) a pontlánc rendben van; a szabály a viselkedéssel bíró objektumokról szól.',
        en: 'For plain data, like a JSON response, dot chains are fine; the rule is about objects with behaviour.',
      },
    },
    {
      id: 'pola',
      big: 'POLA',
      name: 'Principle of Least Astonishment',
      group: 'design',
      summary: { hu: 'A kód és a felület úgy viselkedjen, ahogy az ember várja.', en: 'Code and UI should behave the way people expect.' },
      why: {
        hu: 'Ha egy getUser() közben töröl is valamit, vagy egy link gombként működik, az meglepetés – vagyis hiba.',
        en: 'If getUser() also deletes something, or a link acts like a button, that is a surprise – which means a bug.',
      },
      bad: 'function getUser(id) {\n  cache.clear();\n  return users[id];\n}',
      good: 'function getUser(id) {\n  return users[id];\n}',
      watch: {
        hu: 'A felületen is: a „Mégse” ne mentsen, és a piros gomb legyen a veszélyes.',
        en: 'In the UI too: “Cancel” should not save, and the red button should be the dangerous one.',
      },
    },
    {
      id: 'ssot',
      big: 'SSOT',
      name: 'Single Source of Truth',
      group: 'design',
      summary: { hu: 'Minden adatnak egy igazi helye legyen, a többi ebből számolódjon.', en: 'Each piece of data has one real home; everything else is derived from it.' },
      why: {
        hu: 'Ha a kosár összege külön state-ben is tárolva van, előbb-utóbb eltér a tételek összegétől.',
        en: 'If the cart total is stored in its own state too, sooner or later it drifts from the sum of the items.',
      },
      bad: 'const [items, setItems] = useState([]);\nconst [total, setTotal] = useState(0); // kept in sync by hand',
      good: 'const [items, setItems] = useState([]);\nconst total = items.reduce((sum, i) => sum + i.price, 0);',
      watch: {
        hu: 'Drága számításnál jöhet a useMemo – de továbbra is a tételekből számolj.',
        en: 'If the calculation is expensive, use useMemo – but still derive it from the items.',
      },
    },
    {
      id: 'fail-fast',
      big: 'Fail fast',
      name: 'Fail fast',
      group: 'debug',
      summary: { hu: 'Ha hibás adat kerül a programba, azonnal állítsd le, és írj ki érthető hibaüzenetet – ne hagyd, hogy félúton, érthetetlenül omoljon össze.', en: 'When bad data gets in, stop right away with a clear error message – don’t let the program collapse halfway in a confusing way.' },
      why: {
        hu: 'A korán dobott hiba ott jelez, ahol a baj van; a csendben továbbvitt rossz adat valahol egészen máshol robban.',
        en: 'An early error points at the real problem; bad data carried along silently explodes somewhere else.',
      },
      bad: 'function setAge(age) {\n  user.age = Number(age) || 0; // "abc" silently becomes 0\n}',
      good: 'function setAge(age) {\n  if (!Number.isInteger(age) || age < 0) throw new Error(`Invalid age: ${age}`);\n  user.age = age;\n}',
      watch: {
        hu: 'A felhasználónak ne nyers hibát mutass: a program szélén kapd el, és írj érthető üzenetet.',
        en: 'Don’t show raw errors to users: catch them at the edge and show a friendly message.',
      },
    },
    {
      id: 'convention',
      big: { hu: 'Konvenció', en: 'Convention' },
      name: 'Convention over configuration',
      group: 'design',
      summary: { hu: 'Jó alapértelmezések és közös szokások: kevesebbet kell beállítani.', en: 'Sensible defaults and shared habits mean less to configure.' },
      why: {
        hu: 'Ha egy fájl neve vagy helye már elárulja, mi az (pl. a Next.js app/ mappája), nem kell külön beállítás.',
        en: 'If a file’s name or place already tells what it is (like Next.js’s app/ folder), no extra setup is needed.',
      },
      bad: "routes.register('/about', require('./src/views/pages/AboutPage.jsx'));",
      good: '// app/about/page.jsx  ->  served at /about automatically',
      watch: {
        hu: 'A szokásokat írd le (README), különben „varázslatnak” tűnnek.',
        en: 'Write the conventions down (README), or they feel like magic.',
      },
    },
    {
      id: 'progressive-enhancement',
      big: 'PE',
      name: 'Progressive enhancement',
      group: 'frontend',
      summary: { hu: 'Először a működő alap (HTML), erre a kinézet (CSS), végül az extrák (JS).', en: 'Start with a working base (HTML), add the looks (CSS), then the extras (JS).' },
      why: {
        hu: 'Ha a JavaScript nem töltődik be, vagy lassú a net, az oldal akkor is használható marad.',
        en: 'If JavaScript fails to load or the network is slow, the page is still usable.',
      },
      bad: '<div onclick="submitForm()">Send</div>',
      good: '<form action="/send" method="post">\n  <button>Send</button>\n</form>\n// JS can still enhance it with fetch()',
      watch: {
        hu: 'Nem kell minden appnak JS nélkül működnie – de a tartalomnak és az űrlapoknak jó, ha igen.',
        en: 'Not every app must work without JS – but content and forms ideally should.',
      },
    },
    {
      id: 'mobile-first',
      big: 'Mobile first',
      name: 'Mobile-first design',
      group: 'frontend',
      lang: 'css',
      summary: { hu: 'Először a kis képernyőre tervezz, és onnan bővíts a nagyobbak felé.', en: 'Design for the small screen first, then add for bigger screens.' },
      why: {
        hu: 'A kis képernyő a lényegre kényszerít, és a CSS is egyszerűbb, ha min-width media query-kkel bővítesz.',
        en: 'A small screen forces you to focus on what matters, and the CSS gets simpler with min-width media queries.',
      },
      bad: '.grid { display: grid; grid-template-columns: repeat(4, 1fr); }\n\n@media (max-width: 600px) {\n  .grid { grid-template-columns: 1fr; }\n}',
      good: '.grid { display: grid; }\n\n@media (min-width: 600px) {\n  .grid { grid-template-columns: repeat(4, 1fr); }\n}',
      watch: {
        hu: 'A mobile first a tartalomra is igaz: mi a legfontosabb a képernyőn?',
        en: 'Mobile first is about content too: what matters most on the screen?',
      },
    },
    {
      id: 'immutability',
      big: 'Immutable',
      name: 'Immutability',
      group: 'frontend',
      summary: { hu: 'Ne írd át a meglévő adatot – készíts belőle új példányt.', en: 'Don’t change existing data – make a new copy instead.' },
      why: {
        hu: 'Így nincsenek rejtett mellékhatások, és a React is észreveszi a változást.',
        en: 'No hidden side effects, and React notices the change.',
      },
      bad: 'state.todos.push(todo);\nsetState(state); // same object, React may not re-render',
      good: 'setTodos(todos => [...todos, todo]);',
      watch: {
        hu: 'Mélyen egymásba ágyazott adatnál segíthet egy könyvtár (pl. Immer) vagy a structuredClone.',
        en: 'For deeply nested data, a helper library (like Immer) or structuredClone can help.',
      },
    },
    {
      id: 'pure-functions',
      big: 'Pure',
      name: 'Pure functions',
      group: 'frontend',
      summary: { hu: 'Ugyanarra a bemenetre mindig ugyanazt adja, és nem nyúl semmihez kívül.', en: 'Same input, same output – and nothing outside is touched.' },
      why: {
        hu: 'A tiszta függvény könnyen tesztelhető, eltárolható az eredménye, és bárhol újrahasznosítható.',
        en: 'Pure functions are easy to test, easy to cache and reusable anywhere.',
      },
      bad: 'let total = 0;\nconst addToTotal = n => (total += n);',
      good: 'const add = (a, b) => a + b;',
      watch: {
        hu: 'Mellékhatás kell (fetch, DOM, mentés) – csak gyűjtsd őket a program szélére.',
        en: 'You do need side effects (fetch, DOM, saving) – just keep them at the edges.',
      },
    },
    {
      id: 'magic-numbers',
      big: { hu: 'Bűvös számok', en: 'Magic numbers' },
      name: 'No Magic Numbers',
      group: 'core',
      summary: { hu: 'Ne írj csak úgy számokat a kódba: tedd őket egy beszédes nevű konstansba (pl. MIN_ADULT_AGE = 18).', en: 'Don’t drop bare numbers into the code: give them a constant with a telling name (like MIN_ADULT_AGE = 18).' },
      why: {
        hu: 'A név elmondja, mit jelent a szám, és ha változik, egyetlen helyen írod át.',
        en: 'The name tells what the number means, and when it changes you edit it in one place.',
      },
      bad: 'if (age >= 18 && cart.length <= 20) {\n  price = price * 0.73;\n}',
      good: 'const MIN_ADULT_AGE = 18;\nconst MAX_CART_ITEMS = 20;\nconst NET_PRICE_RATE = 0.73;\n\nif (age >= MIN_ADULT_AGE && cart.length <= MAX_CART_ITEMS) {\n  price = price * NET_PRICE_RATE;\n}',
      watch: {
        hu: 'A 0, az 1 vagy a 100 (százalék) általában magától érthető – nem kell mindennek konstans.',
        en: 'Obvious values like 0, 1 or 100 (percent) usually don’t need a constant.',
      },
    },
    {
      id: 'self-documenting',
      big: { hu: 'Beszédes nevek', en: 'Good names' },
      name: 'Self-Documenting Code',
      group: 'core',
      summary: { hu: 'Olyan egyértelmű változó- és függvényneveket adj (pl. calculateTotalPrice a calc helyett), hogy kommentek nélkül is azonnal érthető legyen a kód.', en: 'Use names so clear (calculateTotalPrice instead of calc) that the code makes sense right away, without comments.' },
      why: {
        hu: 'A kommentek elavulnak, a nevek viszont együtt változnak a kóddal. A jó név megspórolja a fejtörést.',
        en: 'Comments go stale, but names change together with the code. A good name saves a lot of head-scratching.',
      },
      bad: '// calculate the total price with tax\nfunction calc(a, b) {\n  return a * b * 1.27;\n}',
      good: 'const VAT_MULTIPLIER = 1.27;\n\nfunction calculateTotalPrice(unitPrice, quantity) {\n  return unitPrice * quantity * VAT_MULTIPLIER;\n}',
      watch: {
        hu: 'A kommentnek akkor van helye, ha a MIÉRT-et magyarázza (pl. egy furcsa böngészőhiba miatt), nem a MIT.',
        en: 'Comments still have a place when they explain WHY (say, a browser quirk), not WHAT.',
      },
    },
    {
      id: 'early-return',
      big: { hu: 'Korai return', en: 'Early return' },
      name: 'Early Return (guard clauses)',
      group: 'core',
      summary: { hu: 'A hibás vagy kivételes eseteket az elején zárd ki return-nel, így elkerülöd a mélyen egymásba ágyazott if-else labirintust.', en: 'Rule out the invalid or special cases first with return, and you avoid the deeply nested if-else maze.' },
      why: {
        hu: 'A „boldog út” egyenesen, behúzás nélkül olvasható, a kivételek pedig egy helyen, az elején vannak.',
        en: 'The happy path reads straight down without indentation, and the exceptions sit together at the top.',
      },
      bad: 'function getDiscount(user) {\n  if (user) {\n    if (user.isActive) {\n      if (user.orders > 10) {\n        return 0.1;\n      }\n    }\n  }\n  return 0;\n}',
      good: 'function getDiscount(user) {\n  if (!user || !user.isActive) return 0;\n  if (user.orders <= 10) return 0;\n  return 0.1;\n}',
      watch: {
        hu: 'Ha egy függvényben már tíz return van, az inkább azt jelzi, hogy túl sokat csinál (SRP).',
        en: 'If a function has ten returns, it is probably doing too much (SRP).',
      },
    },
    {
      id: 'dead-code',
      big: { hu: 'Halott kód', en: 'Dead code' },
      name: 'Dead Code Removal',
      group: 'core',
      summary: { hu: 'Ne hagyj kikommentezett régi kódot a fájlban „biztonság kedvéért” – töröld ki, a Git úgyis megőrzi.', en: 'Don’t keep old commented-out code “just to be safe” – delete it, Git remembers it anyway.' },
      why: {
        hu: 'A halott kód zaj: elvonja a figyelmet, keresésnél félrevezet, és senki sem meri kitörölni.',
        en: 'Dead code is noise: it distracts, misleads searches, and nobody dares to delete it.',
      },
      bad: 'function total(items) {\n  // let sum = 0;\n  // for (const item of items) sum += item.price;\n  // return sum;\n  return items.reduce((sum, item) => sum + item.price, 0);\n}',
      good: 'function total(items) {\n  return items.reduce((sum, item) => sum + item.price, 0);\n}',
      watch: {
        hu: 'Ha félsz kitörölni, előbb commitolj – onnan bármikor visszahozható.',
        en: 'If you are scared to delete it, commit first – you can always bring it back from there.',
      },
    },
    {
      id: 'rubber-duck',
      big: { hu: 'Gumikacsa', en: 'Rubber duck' },
      name: 'Rubber Duck Debugging',
      group: 'debug',
      summary: { hu: 'Ha elakadsz, magyarázd el hangosan egy tárgynak sorról sorra, mit csinál a kódod – mire a végére érsz, magadtól rájössz a hibára.', en: 'When you are stuck, explain your code out loud to an object, line by line – by the end, you will spot the bug yourself.' },
      why: {
        hu: 'Magyarázás közben nem ugorhatsz át semmit: azt mondod ki, amit a kód valójában csinál, nem azt, amit hiszel róla.',
        en: 'Explaining forces you not to skip anything: you say what the code actually does, not what you think it does.',
      },
      bad: '// stare at the screen for 2 hours\n// change random things until it works',
      good: '// Line 1: I take the list of users.\n// Line 2: I keep the active ones... wait,\n// isActive is the string "false", not false!',
      watch: {
        hu: 'Ha a kacsa sem segít, tarts szünetet, vagy kérdezz meg egy embert – az is gumikacsázás, csak visszaszól.',
        en: 'If the duck doesn’t help, take a break or ask a person – that’s rubber-ducking too, it just talks back.',
      },
    },
    {
      id: 'user-input',
      big: { hu: 'Ne bízz!', en: 'Trust no input' },
      name: 'Never Trust User Input',
      group: 'debug',
      summary: { hu: 'Mindig ellenőrizd, mit írt be a felhasználó: mi van, ha szám helyett szöveget ad meg, vagy üresen hagyja a mezőt?', en: 'Always check what the user typed: what if they enter text instead of a number, or leave the field empty?' },
      why: {
        hu: 'A felhasználók tévednek, sietnek, és néha szándékosan írnak be rosszat. Ami bejön, azt ellenőrizni kell.',
        en: 'Users make mistakes, rush, and sometimes type bad things on purpose. Whatever comes in must be checked.',
      },
      bad: 'const age = Number(input.value);\nsaveUser({ age }); // "" becomes 0, "abc" becomes NaN',
      good: "const age = Number(input.value);\nif (!input.value.trim() || !Number.isInteger(age) || age < 0) {\n  showError('Please enter your age as a whole number.');\n  return;\n}\nsaveUser({ age });",
      watch: {
        hu: 'A böngészős ellenőrzés (required, type="number") kényelmes, de a szerveren is ellenőrizni kell – azt nem lehet kikerülni.',
        en: 'Browser validation (required, type="number") is handy, but the server must check too – that check can’t be bypassed.',
      },
    },
    {
      id: 'gigo',
      big: 'GIGO',
      name: 'Garbage In, Garbage Out',
      group: 'debug',
      summary: { hu: 'Ha rossz vagy hiányos adatot adsz a programnak, a végeredmény is rossz lesz – hibánál mindig először a bemenetet nézd meg.', en: 'Feed the program bad or incomplete data and the result will be bad too – when something’s wrong, check the input first.' },
      why: {
        hu: 'A hibák nagy része nem a logikában, hanem a beérkező adatban van. Ha ott kezded a keresést, sok időt spórolsz.',
        en: 'Many bugs live not in the logic but in the incoming data. Start looking there and you save a lot of time.',
      },
      bad: '// the chart looks wrong\n// → rewrite the chart code for 3 hours',
      good: 'console.table(data); // first, look at what came in\n// → half the prices are strings: "1 200" instead of 1200',
      watch: {
        hu: 'A bemenetet ne csak hibakereséskor nézd: a program szélén alakítsd át és ellenőrizd.',
        en: 'Don’t only look at the input while debugging: convert and check it at the edge of the program.',
      },
    },
    {
      id: 'divide-conquer',
      big: { hu: 'Oszd meg!', en: 'Divide & conquer' },
      name: 'Divide and Conquer',
      group: 'debug',
      summary: { hu: 'Egy nagy feladatot (pl. „készíts egy webshopot”) bonts apró, kb. 15 perces lépésekre (pl. „először csak jelenjen meg egyetlen termék neve”).', en: 'Break a big task (“build a web shop”) into tiny, roughly 15-minute steps (“first, just show one product’s name”).' },
      why: {
        hu: 'A kis lépés gyorsan kész, könnyű ellenőrizni, és ha elromlik, tudod, hol keresd a hibát.',
        en: 'A small step is done quickly, easy to check, and if it breaks you know where to look.',
      },
      bad: '// TODO: build the web shop',
      good: '// 1. show one product name\n// 2. show a list of products\n// 3. add an "Add to cart" button\n// 4. show the number of items in the cart',
      watch: {
        hu: 'Ne tervezd túl: az első pár lépést írd le, a többi menet közben kiderül.',
        en: 'Don’t over-plan: write down the first few steps, the rest becomes clear along the way.',
      },
    },
    {
      id: 'no-copy-paste',
      big: { hu: 'Ne másolj vakon', en: 'No blind copy' },
      name: 'No Copy-Paste Without Understanding',
      group: 'workflow',
      summary: { hu: 'Soha ne másolj be kódot az internetről vagy AI-tól úgy, hogy nem érted minden egyes sorát.', en: 'Never paste code from the internet or an AI without understanding every single line.' },
      why: {
        hu: 'Amit nem értesz, azt javítani sem tudod. A bemásolt kódban rejtett hibák, elavult megoldások vagy biztonsági rések lehetnek.',
        en: 'What you don’t understand, you can’t fix. Pasted code can hide bugs, outdated tricks or security holes.',
      },
      bad: "// found it somewhere, no idea why it works\ndocument.querySelectorAll('*').forEach((el) => (el.style.zoom = 1.0001));",
      good: "// I know what every line does – and why\nconst card = document.querySelector('.card');\ncard.classList.toggle('is-open');",
      watch: {
        hu: 'A másolás nem tilos – csak előbb értsd meg, nevezd át a saját neveidre, és próbáld ki.',
        en: 'Copying isn’t forbidden – understand it first, rename things your way, and test it.',
      },
    },
    {
      id: 'commit-often',
      big: { hu: 'Commitolj!', en: 'Commit often' },
      name: 'Commit Early, Commit Often',
      group: 'workflow',
      lang: 'sh',
      summary: { hu: 'Mentsd el a munkádat Gitben minden kisebb működő lépés után, így bármikor visszaléphetsz egy működő állapothoz.', en: 'Save your work in Git after every small working step, so you can always go back to a working state.' },
      why: {
        hu: 'A kis commitok mentési pontok: ha elrontasz valamit, nem a fél napod vész el, csak az utolsó pár perc.',
        en: 'Small commits are save points: if you break something, you lose minutes, not half a day.',
      },
      bad: 'git add .\ngit commit -m "stuff"   # once a week, 87 files changed',
      good: 'git add src/cart.js\ngit commit -m "Show the item count on the cart icon"',
      watch: {
        hu: 'Az üzenet mondja el, mit csinál a változás – a „fix” vagy a „stuff” fél év múlva semmit sem jelent.',
        en: 'The message should say what the change does – “fix” or “stuff” means nothing six months later.',
      },
    },
    {
      id: 'read-error',
      big: { hu: 'Olvasd el!', en: 'Read the error' },
      name: 'Read the Error Message',
      group: 'workflow',
      summary: { hu: 'Ne ijedj meg a piros szövegtől: a hibaüzenet szinte mindig pontosan megmondja, melyik fájl hányadik sorában mi romlott el.', en: 'Don’t panic at the red text: the error message almost always tells you exactly which file, which line and what went wrong.' },
      why: {
        hu: 'A hibaüzenet a leggyorsabb nyom: a típus (TypeError), a leírás és a hely együtt fél perc alatt a hibához vezet.',
        en: 'The error message is your fastest clue: the type (TypeError), the description and the location lead you to the bug in seconds.',
      },
      bad: "// TypeError: Cannot read properties of undefined (reading 'name')\n// → close the console, change random things",
      good: "// TypeError: ... (reading 'name') at cart.js:42\n// → line 42: user is undefined. Where does user come from?",
      watch: {
        hu: 'Ha nem érted az üzenetet, keress rá – a lényegi részére, a saját fájlneveid nélkül.',
        en: 'If you don’t understand the message, search for it – the essential part, without your own file names.',
      },
    },
    {
      id: 'code-for-humans',
      big: { hu: 'Embereknek', en: 'For humans' },
      name: 'Code for Humans, Not Machines',
      group: 'workflow',
      summary: { hu: 'A gép a csúnya kódot is lefuttatja, de hat hónap múlva neked (vagy a csapattársadnak) kell megértenie, mit írtál.', en: 'The computer runs ugly code too, but in six months you (or a teammate) will have to understand what you wrote.' },
      why: {
        hu: 'A kódot sokkal többször olvassák, mint írják. Az olvashatóság időt, pénzt és idegeket spórol.',
        en: 'Code is read far more often than it is written. Readability saves time, money and nerves.',
      },
      bad: "const r = u.filter(x => x.a && !x.d).map(x => ({ ...x, n: x.f + ' ' + x.l }));",
      good: 'const activeUsers = users.filter((user) => user.isActive && !user.isDeleted);\nconst withFullNames = activeUsers.map((user) => ({\n  ...user,\n  fullName: `${user.firstName} ${user.lastName}`,\n}));',
      watch: {
        hu: 'Az olvashatóság nem bőbeszédűség: a felesleges sorok és kommentek is nehezítik az olvasást.',
        en: 'Readable doesn’t mean wordy: extra lines and comments make reading harder, too.',
      },
    },
  ],
};

/*
 * A csoportok rövid leírása (a katalógusban, a csoportcím alatt).
 */
window.PRINCIPLES.groupInfo = {
  core: { hu: 'Az alapok: maradj egyszerű, hagyd ki a feleslegeset, és bánj okosan az ismétléssel.', en: 'The basics: keep it simple, skip the unnecessary, and handle repetition wisely.' },
  debug: { hu: 'Gondolkodás és hibakeresés: hogyan bonts le egy feladatot, és hogyan találd meg gyorsan a hibát.', en: 'Thinking and debugging: how to break a task down and how to find the bug fast.' },
  workflow: { hu: 'Tanulás és munkamódszer: szokások, amikkel gyorsabban fejlődsz és kevesebbet szenvedsz.', en: 'Learning and workflow: habits that help you grow faster and suffer less.' },
  solid: { hu: 'Öt elv arról, hogyan maradjanak a modulok és komponensek kicsik, cserélhetők és bővíthetők.', en: 'Five principles for keeping modules and components small, swappable and extensible.' },
  design: { hu: 'Hogyan oszd fel és kösd össze a kódot, hogy kiszámítható és könnyen változtatható legyen.', en: 'How to split and connect code so it stays predictable and easy to change.' },
  frontend: { hu: 'Elvek, amik a böngészőben és Reactben különösen sokat számítanak.', en: 'Principles that matter most in the browser and in React.' },
};

/*
 * Egy elv oldalának hosszabb részei, a kártya id-jével:
 *  - problem: mi a baj, ha nem tartod be      { hu, en }
 *  - analogy: hétköznapi hasonlat             { hu, en }
 *  - when:    mikor használd (lista)          [{ hu, en }, …]
 *  - pros / cons: előnyök és hátrányok        [{ hu, en }, …]
 *  - related: kapcsolódó elvek                [['id', { hu, en }], …]
 */
window.PRINCIPLES.guide = {
  kiss: {
    problem: { hu: 'Egy egyszerű feladatra túlbonyolított megoldás születik: felesleges feltételek, rétegek és „okos” trükkök, amiket később senki sem ért.', en: 'A simple task gets an over-engineered solution: extra conditions, layers and “clever” tricks that nobody understands later.' },
    analogy: { hu: 'Egy villanykapcsolónak nem kell érintőképernyő és app. Fel-le kattan, és mindenki érti.', en: 'A light switch doesn’t need a touchscreen and an app. It clicks up and down, and everyone gets it.' },
    when: [
      { hu: 'Ha két megoldás közül választasz: kezdd azzal, amelyikben kevesebb a mozgó alkatrész.', en: 'When choosing between two solutions: start with the one that has fewer moving parts.' },
      { hu: 'Code review-nál: ha valamit nehéz elmagyarázni, valószínűleg lehet egyszerűbb.', en: 'In code review: if something is hard to explain, it can probably be simpler.' },
    ],
    pros: [
      { hu: 'Könnyebb olvasni, tesztelni és továbbadni.', en: 'Easier to read, test and hand over.' },
      { hu: 'Kevesebb hely, ahol hiba bújhat meg.', en: 'Fewer places for bugs to hide.' },
    ],
    cons: [
      { hu: 'Az „egyszerű” néha nézőpont kérdése: ami neked az, másnak még új lehet.', en: '“Simple” is partly a matter of opinion: what is simple to you may still be new to others.' },
    ],
    related: [
      ['yagni', { hu: 'a KISS a megoldást tartja egyszerűen, a YAGNI a funkciók listáját.', en: 'KISS keeps the solution simple, YAGNI keeps the feature list short.' }],
      ['premature-optimization', { hu: 'a „gyors” trükkök gyakran a KISS ellen dolgoznak.', en: 'clever speed tricks often work against KISS.' }],
    ],
  },
  yagni: {
    problem: { hu: 'Beállítások, paraméterek és bővítési pontok kerülnek a kódba egy jövőbeli igényre, ami talán sosem jön el.', en: 'Options, parameters and extension points go into the code for a future need that may never come.' },
    analogy: { hu: 'Nem veszel nyolcszemélyes autót arra az esetre, ha egyszer nyolcan mennétek kirándulni. Ha eljön a nap, bérelsz egyet.', en: 'You don’t buy an eight-seater in case eight of you go on a trip one day. If that day comes, you rent one.' },
    when: [
      { hu: 'Ha azon kapod magad, hogy azt mondod: „ez még jól jöhet később”.', en: 'When you catch yourself saying “this might come in handy later”.' },
      { hu: 'Új funkció tervezésekor: a mai igényt írd meg, a holnapit holnap.', en: 'When planning a feature: build today’s need and leave tomorrow’s for tomorrow.' },
    ],
    pros: [
      { hu: 'Kevesebb kód, kevesebb teszt, kevesebb karbantartás.', en: 'Less code, fewer tests, less maintenance.' },
      { hu: 'Hamarabb kész az, amit tényleg kértek.', en: 'What was actually asked for ships sooner.' },
    ],
    cons: [
      { hu: 'Ha egy bővítés biztosan és hamar jön, a halogatás később több munka lehet.', en: 'If an extension is certain and coming soon, putting it off can mean more work later.' },
    ],
    related: [
      ['kiss', { hu: 'mindkettő a felesleg ellen szól: a YAGNI a funkciókat, a KISS a megoldást tartja kicsiben.', en: 'both fight the unnecessary: YAGNI keeps features small, KISS keeps the solution small.' }],
      ['ocp', { hu: 'bővítési pontot csak ott építs, ahol az új esetek tényleg jönnek.', en: 'build extension points only where new cases really keep coming.' }],
    ],
  },
  dry: {
    problem: { hu: 'Ugyanaz a szabály (pl. ki számít felnőttnek) több helyre be van másolva, és változáskor csak az egyiket javítják.', en: 'The same rule (say, who counts as an adult) is copied into several places, and when it changes only one copy gets fixed.' },
    analogy: { hu: 'A telefonszámodat egy helyen tárolod a névjegyek között, nem írod fel minden üzenet aljára. Ha változik, egyszer írod át.', en: 'Your phone keeps a number in one place in your contacts, not at the bottom of every message. When it changes, you edit it once.' },
    when: [
      { hu: 'Ha ugyanazt az üzleti szabályt vagy számítást másodszor írnád le.', en: 'When you are about to write the same business rule or calculation a second time.' },
      { hu: 'Konstansoknál: a „varázsszámok” (pl. 18 vagy 0.27) kapjanak nevet.', en: 'With constants: “magic numbers” (like 18 or 0.27) deserve a name.' },
    ],
    pros: [
      { hu: 'Egy változás = egy hely, amit módosítani kell.', en: 'One change = one place to edit.' },
      { hu: 'A név (pl. isAdult) a szabályt is elmagyarázza.', en: 'The name (like isAdult) explains the rule, too.' },
    ],
    cons: [
      { hu: 'A túlzott összevonás olyan kódot köt össze, aminek külön kellene változnia.', en: 'Merging too much ties together code that should change separately.' },
    ],
    related: [
      ['aha', { hu: 'a DRY ellensúlya: ne vond össze túl korán.', en: 'the counterweight of DRY: don’t merge too early.' }],
      ['ssot', { hu: 'ugyanez az ötlet adatra: minden értéknek egy igazi helye van.', en: 'the same idea for data: every value has one real home.' }],
    ],
  },
  aha: {
    problem: { hu: 'Két hasonló kódrészletből túl korán lesz egy közös függvény, ami aztán minden új esetnél újabb kapcsolót kap.', en: 'Two similar pieces of code are merged too early into one shared function, which then gets a new flag for every new case.' },
    analogy: { hu: 'Nem varrsz olyan ruhát, ami egyszerre esküvői öltöny és túrakabát. Előbb nézd meg, mire kell valójában.', en: 'You don’t sew one outfit that is both a wedding suit and a hiking jacket. First see what it is really for.' },
    when: [
      { hu: 'Ha már a második hasonló kódnál összevonnád őket: várj a harmadikig.', en: 'When you want to merge on the second similar piece: wait for the third.' },
      { hu: 'Ha egy közös függvény egyre több true/false paramétert kap.', en: 'When a shared function keeps getting more true/false parameters.' },
    ],
    pros: [
      { hu: 'Az absztrakció valódi mintából születik, nem találgatásból.', en: 'The abstraction comes from a real pattern, not a guess.' },
      { hu: 'A külön kód külön tud változni.', en: 'Separate code can change separately.' },
    ],
    cons: [
      { hu: 'Egy ideig marad némi ismétlés, és ezt tudatosan kell vállalni.', en: 'Some repetition stays for a while, and you have to accept it on purpose.' },
    ],
    related: [
      ['dry', { hu: 'az AHA nem a DRY ellen szól, csak türelmet kér hozzá.', en: 'AHA is not against DRY; it just asks for patience.' }],
      ['yagni', { hu: 'a korai absztrakció gyakran „hátha kell” alapon születik.', en: 'early abstractions are often built “just in case”.' }],
    ],
  },
  'boy-scout': {
    problem: { hu: 'Mindenki látja a rossz neveket és a halott kódot, de senki sem nyúl hozzájuk, így a kód lassan egyre rosszabb lesz.', en: 'Everyone sees the bad names and the dead code, but nobody touches them, so the code slowly gets worse.' },
    analogy: { hu: 'A táborhelyről úgy mész el, hogy összeszeded a szemetet – azt is, amit nem te hagytál ott.', en: 'You leave the campsite after picking up the litter – even the bits you didn’t drop.' },
    when: [
      { hu: 'Ha egy fájlban amúgy is dolgozol, és látsz egy rossz nevet vagy egy felesleges sort.', en: 'When you are working in a file anyway and spot a bad name or a useless line.' },
      { hu: 'Hibajavítás közben: a javítás körüli kódot hagyd érthetőbben.', en: 'While fixing a bug: leave the code around the fix easier to read.' },
    ],
    pros: [
      { hu: 'A kód magától javul, nagy átírás nélkül.', en: 'The code improves by itself, without a big rewrite.' },
      { hu: 'Kicsi, biztonságos lépések.', en: 'Small, safe steps.' },
    ],
    cons: [
      { hu: 'Ha túl sok „takarítás” kerül egy commitba, nehezebb átnézni a valódi változást.', en: 'Too much “cleaning” in one commit makes the real change harder to review.' },
    ],
    related: [
      ['kiss', { hu: 'a takarítás legjobb iránya: egyszerűbb, rövidebb, érthetőbb.', en: 'the best direction for cleanup: simpler, shorter, clearer.' }],
      ['srp', { hu: 'egy túl nagy függvény kettébontása jó cserkészfeladat.', en: 'splitting an oversized function is a good scout task.' }],
    ],
  },
  'premature-optimization': {
    problem: { hu: 'A kód olvashatatlan trükkökkel lesz „gyorsítva” olyan helyen, ami sosem volt lassú.', en: 'Code gets “sped up” with unreadable tricks in places that were never slow.' },
    analogy: { hu: 'Nem veszel versenyautót a sarki bolthoz. Előbb nézd meg, hol van a dugó.', en: 'You don’t buy a race car for trips to the corner shop. First find out where the traffic jam is.' },
    when: [
      { hu: 'Mielőtt bármit gyorsítanál: mérj (DevTools Performance, Lighthouse).', en: 'Before speeding anything up: measure (DevTools Performance, Lighthouse).' },
      { hu: 'Ha egy kódrészlet csak a sebesség kedvéért lett nehezen olvasható.', en: 'When a piece of code became hard to read just for speed.' },
    ],
    pros: [
      { hu: 'Az időd oda megy, ahol tényleg számít.', en: 'Your time goes where it really matters.' },
      { hu: 'A kód olvasható marad.', en: 'The code stays readable.' },
    ],
    cons: [
      { hu: 'Az alapvető teljesítményt (képméret, csomagméret) azért kezdettől érdemes figyelni.', en: 'Basic performance (image size, bundle size) is still worth watching from day one.' },
    ],
    related: [
      ['kiss', { hu: 'az olvasható megoldás az alap, gyorsítani csak okkal.', en: 'the readable solution comes first; speed it up only with a reason.' }],
      ['pure-functions', { hu: 'a tiszta függvény eredményét könnyű eltárolni, ha a mérés szerint kell.', en: 'a pure function’s result is easy to cache if measuring says you need to.' }],
    ],
  },
  srp: {
    problem: { hu: 'Egy függvény betölti az adatot, formázza és ki is rajzolja. Bármelyik részt módosítod, a többi is eltörhet.', en: 'One function loads the data, formats it and renders it. Change any part and the others may break.' },
    analogy: { hu: 'Az étteremben a szakács főz, a pincér felszolgál, a pénztáros számláz. Ha a szakácsnak kasszáznia is kell, mindkettő lassabb lesz.', en: 'In a restaurant the cook cooks, the waiter serves and the cashier bills. If the cook has to run the till too, both get slower.' },
    when: [
      { hu: 'Ha egy függvény őszinte neve „és”-t tartalmazna (loadAndRender).', en: 'When a function’s honest name would contain “and” (loadAndRender).' },
      { hu: 'Ha egy komponens egyszerre kér le adatot, számol és megjelenít.', en: 'When one component fetches, calculates and displays at the same time.' },
    ],
    pros: [
      { hu: 'Kisebb, könnyen tesztelhető darabok.', en: 'Smaller pieces that are easy to test.' },
      { hu: 'Egy változás egy helyre esik.', en: 'A change lands in one place.' },
    ],
    cons: [
      { hu: 'Túl sok apró darab között nehéz követni, mi hívja mit.', en: 'With too many tiny pieces it is hard to follow what calls what.' },
    ],
    related: [
      ['soc', { hu: 'ugyanez az ötlet nagyban: a felelősségek szétválasztása.', en: 'the same idea at a bigger scale: keeping concerns apart.' }],
      ['pure-functions', { hu: 'a formázás lehet tiszta függvény, a mellékhatás pedig külön marad.', en: 'formatting can be a pure function, while the side effect stays apart.' }],
    ],
  },
  ocp: {
    problem: { hu: 'Minden új esetnél ugyanazt a nagy if/switch láncot kell bővíteni, és közben könnyű eltörni egy régit.', en: 'Every new case means editing the same big if/switch chain, and it is easy to break an old case on the way.' },
    analogy: { hu: 'Az elosztóba új eszközt dugsz – nem kell hozzá kibontani a falat.', en: 'You plug a new device into a power strip – no need to open up the wall.' },
    when: [
      { hu: 'Ha ugyanaz a switch rendszeresen új ágat kap.', en: 'When the same switch keeps getting new branches.' },
      { hu: 'Bővítményeknél, témáknál, formázóknál – ahol tényleg sorra jönnek az új változatok.', en: 'For plugins, themes and formatters – where new variants really keep coming.' },
    ],
    pros: [
      { hu: 'A régi, kipróbált kód érintetlen marad.', en: 'Old, tested code stays untouched.' },
      { hu: 'Egy új eset = egy új sor vagy fájl.', en: 'A new case = one new line or file.' },
    ],
    cons: [
      { hu: 'Az előre beépített bővíthetőség felesleges bonyolítás, ha sosem jön új eset.', en: 'Built-in extensibility is needless complexity if no new case ever comes.' },
    ],
    related: [
      ['yagni', { hu: 'csak ott tedd bővíthetővé, ahol már látod az igényt.', en: 'make it extensible only where you already see the need.' }],
      ['dip', { hu: 'az absztrakcióra támaszkodó kódba könnyű új változatot bedugni.', en: 'code that depends on an abstraction makes it easy to plug in a new variant.' }],
    ],
  },
  lsp: {
    problem: { hu: 'Egy leszármazott osztály vagy komponensváltozat másképp viselkedik, mint az őse, és ott okoz hibát, ahol az őst vártuk.', en: 'A subclass or component variant behaves differently from its parent and causes bugs where the parent was expected.' },
    analogy: { hu: 'Ha egy töltőn az áll, hogy USB-C, akkor bármelyik USB-C aljzatban működnie kell, nem csak a gyártó saját telefonjában.', en: 'If a charger says USB-C, it should work in any USB-C port, not just the maker’s own phone.' },
    when: [
      { hu: 'Öröklésnél: tudja-e a gyerek mindazt, amit az ős ígér?', en: 'With inheritance: can the child do everything the parent promises?' },
      { hu: 'Komponensváltozatoknál: ugyanazokat a props-okat fogadja-e, mint az alap?', en: 'With component variants: do they accept the same props as the base?' },
    ],
    pros: [
      { hu: 'A változatok nyugodtan cserélhetők egymásra.', en: 'Variants can be swapped safely.' },
      { hu: 'Kevesebb „if (x instanceof Y)” a kódban.', en: 'Fewer “if (x instanceof Y)” checks in the code.' },
    ],
    cons: [
      { hu: 'Néha azt jelenti, hogy újra kell gondolni az egész hierarchiát.', en: 'Sometimes it means rethinking the whole hierarchy.' },
    ],
    related: [
      ['composition', { hu: 'ha az öröklés nem tudja betartani az ígéretet, gyakran a kompozíció a jobb út.', en: 'if inheritance can’t keep the promise, composition is often the better path.' }],
      ['pola', { hu: 'a rossz altípus meglepetést okoz – a POLA pont ezt akarja elkerülni.', en: 'a bad subtype causes surprises – exactly what POLA wants to avoid.' }],
    ],
  },
  isp: {
    problem: { hu: 'Egy komponens vagy függvény egy egész nagy objektumot kap, pedig csak két mezőt használ belőle.', en: 'A component or function receives a whole big object but uses only two fields of it.' },
    analogy: { hu: 'A pizzafutárnak a címed kell, nem a teljes személyi igazolványod.', en: 'The pizza courier needs your address, not your whole ID card.' },
    when: [
      { hu: 'Ha egy komponenst nehéz más adattal újrahasznosítani, mert egy konkrét objektumot vár.', en: 'When a component is hard to reuse with other data because it expects one specific object.' },
      { hu: 'Teszteléskor: ha egy óriási álobjektumot kell gyártanod egy apró teszthez.', en: 'When testing: if you need a huge fake object for a tiny test.' },
    ],
    pros: [
      { hu: 'Egyértelmű, mire van szüksége egy darabnak.', en: 'It is clear what each piece needs.' },
      { hu: 'Könnyebb újrahasznosítani és tesztelni.', en: 'Easier to reuse and to test.' },
    ],
    cons: [
      { hu: 'A túl sok apró prop vagy paraméter is nehezen kezelhető.', en: 'Too many tiny props or parameters get unwieldy, too.' },
    ],
    related: [
      ['srp', { hu: 'a kicsi, célzott interfész egyetlen felelősséget szolgál.', en: 'a small, focused interface serves one responsibility.' }],
      ['demeter', { hu: 'ha csak azt kapod meg, ami kell, nem kell mások belsejében turkálnod.', en: 'if you only get what you need, you don’t have to dig through other objects.' }],
    ],
  },
  dip: {
    problem: { hu: 'A kód közvetlenül egy konkrét dologhoz kötődik (localStorage, fetch, egy adott API), ezért nehéz tesztelni vagy lecserélni.', en: 'The code is welded to one concrete thing (localStorage, fetch, a specific API), so it is hard to test or replace.' },
    analogy: { hu: 'A lámpát nem az erőműbe kötöd, hanem a konnektorba. Mögötte lehet napelem, hálózat vagy aggregátor.', en: 'You don’t wire a lamp to the power plant; you plug it into a socket. Behind it there can be solar, the grid or a generator.' },
    when: [
      { hu: 'Ha egy függőséget tesztben álváltozatra cserélnél.', en: 'When you would swap a dependency for a fake in a test.' },
      { hu: 'Ha egy szolgáltatás (tárolás, API, naplózás) várhatóan lecserélődik.', en: 'When a service (storage, API, logging) is likely to be replaced.' },
    ],
    pros: [
      { hu: 'Álfüggőséggel könnyű tesztelni.', en: 'Easy to test with a fake dependency.' },
      { hu: 'A megvalósítás cserélhető a hívó kód átírása nélkül.', en: 'The implementation can change without rewriting the caller.' },
    ],
    cons: [
      { hu: 'Több paraméter és egy plusz réteg, amit érteni kell.', en: 'More parameters and one more layer to understand.' },
    ],
    related: [
      ['ocp', { hu: 'az absztrakció mögé új megvalósítás dugható, a régi kód érintése nélkül.', en: 'a new implementation can be plugged in behind the abstraction without touching old code.' }],
      ['pure-functions', { hu: 'ha a mellékhatás kívülről érkezik, a többi kód tiszta maradhat.', en: 'if side effects are passed in, the rest of the code can stay pure.' }],
    ],
  },
  soc: {
    problem: { hu: 'Tartalom, kinézet és viselkedés egy sorban keveredik, így semmit sem lehet külön módosítani.', en: 'Content, styling and behaviour are mixed in one line, so nothing can change on its own.' },
    analogy: { hu: 'A házban a víz, a villany és a gáz külön vezetékben fut. Ha az egyiket javítják, a másik kettőhöz nem kell nyúlni.', en: 'In a house, water, electricity and gas run in separate lines. Fixing one doesn’t mean touching the other two.' },
    when: [
      { hu: 'Ha inline stílus vagy inline eseménykezelő kerülne a HTML-be.', en: 'When an inline style or inline event handler is about to go into the HTML.' },
      { hu: 'Reactben: ha egy komponensben keveredik az adatlekérés és a megjelenítés.', en: 'In React: when data fetching and display are mixed in one component.' },
    ],
    pros: [
      { hu: 'Minden réteg külön változhat, és külön tesztelhető.', en: 'Each layer can change and be tested on its own.' },
      { hu: 'Könnyebb együtt dolgozni (pl. dizájner a CSS-en, fejlesztő a JS-en).', en: 'Easier teamwork (say, a designer on the CSS, a developer on the JS).' },
    ],
    cons: [
      { hu: 'A túl sok réteg is lassít, ha egy apró változáshoz öt fájlba kell belenyúlni.', en: 'Too many layers slow you down, too, if a tiny change touches five files.' },
    ],
    related: [
      ['srp', { hu: 'a SoC a nagy kép, az SRP ugyanez egy függvény vagy modul szintjén.', en: 'SoC is the big picture; SRP is the same idea for one function or module.' }],
      ['progressive-enhancement', { hu: 'a külön HTML-, CSS- és JS-réteg teszi lehetővé a fokozatos bővítést.', en: 'separate HTML, CSS and JS layers are what make progressive enhancement possible.' }],
    ],
  },
  composition: {
    problem: { hu: 'Mély öröklési lánc épül (Button → IconButton → RedIconButton…), és minden új kombinációhoz új osztály kell.', en: 'A deep inheritance chain grows (Button → IconButton → RedIconButton…), and every new combination needs a new class.' },
    analogy: { hu: 'Építőkockákból építesz: a darabok bármilyen sorrendben összerakhatók, nem kell minden formához új készlet.', en: 'Building with bricks: the pieces snap together in any order, no new set needed for every shape.' },
    when: [
      { hu: 'Ha a változatok kombinálódnak (szín × méret × ikon).', en: 'When variants combine (colour × size × icon).' },
      { hu: 'Reactben szinte mindig: children, props, saját hookok.', en: 'In React almost always: children, props, custom hooks.' },
    ],
    pros: [
      { hu: 'Rugalmas: a darabok szabadon kombinálhatók.', en: 'Flexible: the pieces combine freely.' },
      { hu: 'Nincs „törékeny ősosztály”, aminek a módosítása mindent eltör.', en: 'No “fragile base class” whose change breaks everything.' },
    ],
    cons: [
      { hu: 'Több apró darab, amit össze kell kötni.', en: 'More small pieces to wire together.' },
    ],
    related: [
      ['lsp', { hu: 'ha az öröklés megsérti az LSP-t, a kompozíció a kiút.', en: 'when inheritance breaks LSP, composition is the way out.' }],
      ['srp', { hu: 'kis, egyfeladatú darabokból könnyű összerakni bármit.', en: 'small single-purpose pieces are easy to compose into anything.' }],
    ],
  },
  demeter: {
    problem: { hu: 'A kód hosszú pontláncokkal nyúl át más objektumok belsején, így minden belső átalakítás sok helyen tör.', en: 'Code reaches deep into other objects with long dot chains, so every inner change breaks many places.' },
    analogy: { hu: 'A boltban a pénztárosnak fizetsz, nem nyúlsz be a kasszába a visszajáróért.', en: 'In a shop you pay the cashier; you don’t reach into the till for your change.' },
    when: [
      { hu: 'Ha egy sorban három-négy pont követi egymást egy viselkedéssel bíró objektumon.', en: 'When three or four dots follow each other on an object with behaviour.' },
      { hu: 'Modulok határán: a többi modul csak a nyilvános függvényeket lássa.', en: 'At module boundaries: other modules should only see the public functions.' },
    ],
    pros: [
      { hu: 'A belső szerkezet szabadon változhat.', en: 'The inner structure is free to change.' },
      { hu: 'Kevesebb rejtett függés.', en: 'Fewer hidden dependencies.' },
    ],
    cons: [
      { hu: 'Sok apró „továbbító” függvény születhet.', en: 'It can lead to lots of tiny pass-through functions.' },
    ],
    related: [
      ['isp', { hu: 'ha csak a szükséges adatot kapod meg, nem kell átnyúlnod mások belsején.', en: 'if you only get the data you need, you don’t have to reach through others.' }],
      ['soc', { hu: 'mindenki a saját dolgával foglalkozik.', en: 'everyone minds their own business.' }],
    ],
  },
  pola: {
    problem: { hu: 'Egy függvény vagy gomb mást csinál, mint amit a neve vagy a kinézete ígér.', en: 'A function or button does something other than its name or look promises.' },
    analogy: { hu: 'Ha a csapon a kék jel forró vizet ad, valaki meg fogja égetni magát.', en: 'If the blue tap gives hot water, someone is going to get burned.' },
    when: [
      { hu: 'Elnevezéskor: a get… csak olvasson, a set… csak írjon.', en: 'When naming: get… only reads, set… only writes.' },
      { hu: 'A felületen: megszokott ikonokkal, színekkel és helyekkel.', en: 'In the UI: with familiar icons, colours and positions.' },
    ],
    pros: [
      { hu: 'A kód a nevei alapján is érthető.', en: 'Code can be understood from its names alone.' },
      { hu: 'Kevesebb felhasználói hiba és kérdés.', en: 'Fewer user mistakes and support questions.' },
    ],
    cons: [
      { hu: 'A „megszokott” csapatonként és kultúránként más lehet.', en: '“Expected” can differ between teams and cultures.' },
    ],
    related: [
      ['lsp', { hu: 'az altípus se okozzon meglepetést: azt tegye, amit az ős ígér.', en: 'a subtype shouldn’t surprise either: it should do what the parent promises.' }],
      ['convention', { hu: 'a közös szokások pontosan azt adják, amire számítunk.', en: 'shared conventions give people exactly what they expect.' }],
    ],
  },
  ssot: {
    problem: { hu: 'Ugyanaz az adat két helyen van tárolva (pl. a tételek és külön a darabszám), és idővel eltérnek egymástól.', en: 'The same data is stored in two places (say, the items and a separate count), and over time they drift apart.' },
    analogy: { hu: 'A családi naptár a hűtőn lóg. Ha mindenki a saját cetlijére ír, valaki biztosan rossz napon megy fogorvoshoz.', en: 'The family calendar hangs on the fridge. If everyone keeps their own notes, someone will turn up at the dentist on the wrong day.' },
    when: [
      { hu: 'Ha egy érték kiszámolható a meglévő state-ből – akkor ne tárold külön.', en: 'When a value can be calculated from existing state – then don’t store it separately.' },
      { hu: 'Ha ugyanaz az adat az URL-ben, a state-ben és a localStorage-ban is ott van.', en: 'When the same data sits in the URL, in state and in localStorage at once.' },
    ],
    pros: [
      { hu: 'Nincs ellentmondás az adatok között.', en: 'No contradictions between data.' },
      { hu: 'Kevesebb szinkronizáló kód.', en: 'Less syncing code.' },
    ],
    cons: [
      { hu: 'Drága számításnál memoizálni kell, ami egy plusz lépés.', en: 'Expensive derivations need memoizing, which is one more step.' },
    ],
    related: [
      ['dry', { hu: 'a DRY a tudásra, az SSOT az adatra mondja ugyanazt.', en: 'DRY says it about knowledge, SSOT says it about data.' }],
      ['immutability', { hu: 'új példányokból könnyű újraszámolni minden levezetett értéket.', en: 'new copies make it easy to recompute every derived value.' }],
    ],
  },
  'fail-fast': {
    problem: { hu: 'A kód csendben „kijavítja” a hibás adatot (pl. 0-ra cseréli), és a hiba csak sokkal később, egészen máshol jön elő.', en: 'The code silently “fixes” bad data (say, turns it into 0), and the bug only shows up much later, somewhere else.' },
    analogy: { hu: 'A füstjelző akkor szól, amikor a pirítós ég, nem akkor, amikor már a konyha.', en: 'A smoke alarm goes off when the toast burns, not when the kitchen does.' },
    when: [
      { hu: 'Függvények elején: ellenőrizd a bemenetet, és dobj érthető hibát.', en: 'At the start of functions: check the input and throw a clear error.' },
      { hu: 'Beállítások betöltésekor: ha hiányzik egy kötelező érték, álljon meg az indulás.', en: 'When loading config: if a required value is missing, stop the startup.' },
    ],
    pros: [
      { hu: 'A hiba ott jelez, ahol keletkezett.', en: 'The error shows up where it started.' },
      { hu: 'Nem kerül rossz adat az adatbázisba.', en: 'Bad data never reaches the database.' },
    ],
    cons: [
      { hu: 'A túl sok ellenőrzés zajossá teheti a kódot.', en: 'Too many checks can make code noisy.' },
    ],
    related: [
      ['pola', { hu: 'egy csendben „kijavított” érték is meglepetés.', en: 'a silently “fixed” value is a surprise, too.' }],
      ['pure-functions', { hu: 'a tiszta függvény bemenetét könnyű már az elején ellenőrizni.', en: 'a pure function’s input is easy to check right at the start.' }],
    ],
  },
  convention: {
    problem: { hu: 'Mindent kézzel kell beállítani és regisztrálni, így a beállítás hosszabb, mint maga a kód.', en: 'Everything must be set up and registered by hand, so the setup is longer than the code itself.' },
    analogy: { hu: 'A legtöbb konyhában fiókban van az evőeszköz. Vendégségben sem kell megkérdezned, hol a kanál.', en: 'In most kitchens the cutlery is in a drawer. Even as a guest you don’t have to ask where the spoons are.' },
    when: [
      { hu: 'Fájlneveknél és mappáknál: kövesd a keretrendszer megszokott szerkezetét.', en: 'For file names and folders: follow the framework’s usual structure.' },
      { hu: 'A saját kódodban: egységes elnevezés (pl. minden hook use…-val kezdődik).', en: 'In your own code: consistent naming (every hook starts with use…).' },
    ],
    pros: [
      { hu: 'Kevesebb beállítás, gyorsabb indulás.', en: 'Less setup, a faster start.' },
      { hu: 'Az új csapattag hamar eligazodik.', en: 'New teammates find their way quickly.' },
    ],
    cons: [
      { hu: 'Ha nem ismered a szokást, a működés varázslatnak tűnik.', en: 'If you don’t know the convention, it feels like magic.' },
    ],
    related: [
      ['pola', { hu: 'a szokás kiszámíthatóvá teszi a kódot.', en: 'conventions make code predictable.' }],
      ['kiss', { hu: 'kevesebb beállítás, kevesebb mozgó alkatrész.', en: 'less configuration, fewer moving parts.' }],
    ],
  },
  'progressive-enhancement': {
    problem: { hu: 'Az oldal minden része JavaScripten múlik, így ha a JS nem töltődik be, semmi sem működik – a Küldés gomb sem.', en: 'Every part of the page depends on JavaScript, so if JS fails to load nothing works – not even the Send button.' },
    analogy: { hu: 'A leállt mozgólépcső még mindig lépcső: lassabb, de feljutsz rajta.', en: 'A stopped escalator is still a staircase: slower, but it gets you up.' },
    when: [
      { hu: 'Űrlapoknál, linkeknél, navigációnál: legyen valódi <form>, <a> és <button>.', en: 'For forms, links and navigation: use real <form>, <a> and <button>.' },
      { hu: 'Tartalmas oldalaknál (blog, dokumentáció, webshop).', en: 'On content sites (blogs, docs, web shops).' },
    ],
    pros: [
      { hu: 'Lassú netnél és régi eszközön is használható.', en: 'Usable on slow networks and old devices.' },
      { hu: 'Jobb akadálymentesség és keresőoptimalizálás.', en: 'Better accessibility and SEO.' },
    ],
    cons: [
      { hu: 'Erősen interaktív alkalmazásoknál (pl. rajzolóprogram) kevés értelme van.', en: 'For heavily interactive apps (like a drawing tool) it adds little.' },
    ],
    related: [
      ['soc', { hu: 'a külön HTML-, CSS- és JS-réteg teszi lehetővé.', en: 'separate HTML, CSS and JS layers make it possible.' }],
      ['mobile-first', { hu: 'mindkettő a legkisebb, legszerényebb esetből indul.', en: 'both start from the smallest, most modest case.' }],
    ],
  },
  'mobile-first': {
    problem: { hu: 'Az oldal nagy képernyőre készül, a mobilváltozat utólag, felülírásokkal kerül rá, és a CSS megtelik kivételekkel.', en: 'The page is built for big screens, the mobile version is bolted on with overrides, and the CSS fills up with exceptions.' },
    analogy: { hu: 'Előbb a hátizsákba pakolod, ami tényleg kell. Ha nagyobb bőrönd jut, abba jöhetnek az extrák.', en: 'First you pack a backpack with what you really need. If you get a bigger suitcase, the extras can come along.' },
    when: [
      { hu: 'Minden új elrendezésnél: az alapstílus a keskeny képernyőé.', en: 'For every new layout: the base styles are for the narrow screen.' },
      { hu: 'Tartalomtervezéskor: mi kerüljön a képernyő tetejére?', en: 'When planning content: what goes at the top of the screen?' },
    ],
    pros: [
      { hu: 'Egyszerűbb, rövidebb CSS.', en: 'Simpler, shorter CSS.' },
      { hu: 'A legtöbb látogató mobilról jön – nekik lesz a legjobb.', en: 'Most visitors come on mobile – it works best for them.' },
    ],
    cons: [
      { hu: 'Asztali, adatsűrű felületeknél (pl. táblázatos admin) néha a fordított út a praktikusabb.', en: 'For dense desktop tools (like table-heavy admin pages) the other way round can be more practical.' },
    ],
    related: [
      ['progressive-enhancement', { hu: 'ugyanaz a gondolat: kicsiből indulni, és lépésenként bővíteni.', en: 'the same thought: start small and add step by step.' }],
      ['kiss', { hu: 'a kis képernyő rákényszerít az egyszerűségre.', en: 'a small screen forces simplicity.' }],
    ],
  },
  immutability: {
    problem: { hu: 'A meglévő tömböt vagy objektumot helyben írod át: a React nem veszi észre, és máshol is váratlanul megváltozik az adat.', en: 'You change an existing array or object in place: React doesn’t notice, and the data changes unexpectedly elsewhere too.' },
    analogy: { hu: 'Egy szerződést nem radírral javítasz: új változatot írsz, a régi pedig megmarad.', en: 'You don’t fix a contract with an eraser: you write a new version and keep the old one.' },
    when: [
      { hu: 'React és Redux state frissítésekor.', en: 'When updating React or Redux state.' },
      { hu: 'Ha egy objektumot több hely is olvas: ne módosítsd a „lábuk alatt”.', en: 'When several places read one object: don’t change it under their feet.' },
    ],
    pros: [
      { hu: 'A változás könnyen észrevehető (új hivatkozás = új adat).', en: 'Changes are easy to detect (new reference = new data).' },
      { hu: 'A visszavonás és az „időutazós” hibakeresés szinte ingyen jár.', en: 'Undo and “time-travel” debugging come almost for free.' },
    ],
    cons: [
      { hu: 'Nagy adatnál a sok másolás lassabb lehet, mély szerkezetnél pedig bőbeszédű.', en: 'Lots of copying can be slower with big data, and wordy with deep structures.' },
    ],
    related: [
      ['pure-functions', { hu: 'a tiszta függvény nem módosítja a bemenetét – új értéket ad vissza.', en: 'a pure function doesn’t change its input – it returns a new value.' }],
      ['ssot', { hu: 'ha az igazi adat sosem változik helyben, a levezetett értékek megbízhatók.', en: 'if the real data never changes in place, derived values stay trustworthy.' }],
    ],
  },
  'pure-functions': {
    problem: { hu: 'A függvény eredménye egy külső változótól függ, vagy közben átír valamit, ezért ugyanarra a hívásra más-más jön ki.', en: 'A function’s result depends on an outside variable, or it changes something along the way, so the same call gives different results.' },
    analogy: { hu: 'Egy számológépen a 2 + 2 mindig 4, akárhányszor és akárki nyomja meg.', en: 'On a calculator 2 + 2 is always 4, no matter how often or who presses it.' },
    when: [
      { hu: 'Számításnál, formázásnál, szűrésnél – minden olyan logikánál, ami nem be- vagy kimenet.', en: 'For calculating, formatting and filtering – any logic that isn’t input or output.' },
      { hu: 'React komponensekben: a renderelés legyen tiszta, a mellékhatás menjen useEffectbe vagy eseménykezelőbe.', en: 'In React components: rendering should be pure; side effects go into useEffect or event handlers.' },
    ],
    pros: [
      { hu: 'A teszthez semmit sem kell előkészíteni.', en: 'Nothing to set up for tests.' },
      { hu: 'Az eredmény eltárolható (memoizálás).', en: 'Results can be cached (memoization).' },
    ],
    cons: [
      { hu: 'Egy valódi app nem állhat csak tiszta függvényekből – a mellékhatásoknak is kell egy hely.', en: 'A real app can’t be pure functions only – side effects need a home, too.' },
    ],
    related: [
      ['immutability', { hu: 'a tiszta függvény nem módosítja a bemenetét.', en: 'a pure function doesn’t change its input.' }],
      ['srp', { hu: 'a számítás és a mellékhatás szétválasztása két tiszta felelősséget ad.', en: 'splitting the calculation from the side effect gives two clear responsibilities.' }],
    ],
  },
  'magic-numbers': {
    problem: { hu: 'Magyarázat nélküli számok állnak a kódban (18, 0.73, 86400), és senki sem tudja, honnan jöttek, vagy hol kell még átírni őket.', en: 'Unexplained numbers sit in the code (18, 0.73, 86400), and nobody knows where they came from or where else to change them.' },
    analogy: { hu: 'A recept sem azt írja, hogy „tegyél bele 7-et”, hanem hogy „7 dkg cukrot”. A név és a mértékegység adja az értelmét.', en: 'A recipe doesn’t say “add 7”; it says “7 grams of sugar”. The name and the unit give it meaning.' },
    when: [
      { hu: 'Ha egy szám üzleti szabályt jelent (korhatár, áfa, limit).', en: 'When a number stands for a business rule (age limit, tax rate, a limit).' },
      { hu: 'Ha ugyanaz a szám több helyen is előfordul.', en: 'When the same number appears in several places.' },
    ],
    pros: [
      { hu: 'A kód magyarázza önmagát.', en: 'The code explains itself.' },
      { hu: 'Egy helyen módosítható.', en: 'It can be changed in one place.' },
    ],
    cons: [
      { hu: 'A túlzásba vitt konstansok (ONE = 1) csak zajt adnak.', en: 'Overdone constants (ONE = 1) just add noise.' },
    ],
    related: [
      ['dry', { hu: 'a konstans a DRY legkisebb formája.', en: 'a constant is the smallest form of DRY.' }],
      ['self-documenting', { hu: 'a jó név a szám helyett is beszél.', en: 'a good name speaks for the number.' }],
    ],
  },
  'self-documenting': {
    problem: { hu: 'Rövidítések és semmitmondó nevek (d, tmp, data2, calc) miatt minden sort kétszer kell elolvasni.', en: 'Abbreviations and empty names (d, tmp, data2, calc) mean every line has to be read twice.' },
    analogy: { hu: 'A fűszeres dobozokon is felirat van. Senki sem akarja szagolgatással kitalálni, melyik a fahéj.', en: 'Spice jars have labels. Nobody wants to find the cinnamon by sniffing every jar.' },
    when: [
      { hu: 'Minden új változónál és függvénynél.', en: 'For every new variable and function.' },
      { hu: 'Ha kommentet írnál egy sor fölé: előbb próbáld meg átnevezni.', en: 'When you are about to write a comment above a line: try renaming first.' },
    ],
    pros: [
      { hu: 'Kevesebb komment, ami elavulhat.', en: 'Fewer comments that can go stale.' },
      { hu: 'Könnyebb a code review és a keresés.', en: 'Easier code review and searching.' },
    ],
    cons: [
      { hu: 'A túl hosszú nevek (activeUsersSortedByNameWithoutAdmins) is nehezen olvashatók.', en: 'Very long names (activeUsersSortedByNameWithoutAdmins) are hard to read, too.' },
    ],
    related: [
      ['magic-numbers', { hu: 'a konstans neve is dokumentáció.', en: 'a constant’s name is documentation, too.' }],
      ['code-for-humans', { hu: 'a nevek az olvasónak szólnak, nem a gépnek.', en: 'names are for the reader, not the machine.' }],
    ],
  },
  'early-return': {
    problem: { hu: 'A feltételek egymásba ágyazódnak, a kód jobbra csúszik, és a végén már nem látszik, melyik else melyik if-hez tartozik.', en: 'Conditions nest inside each other, the code drifts right, and soon you can’t tell which else belongs to which if.' },
    analogy: { hu: 'A szórakozóhely ajtajában a biztonsági őr az elején kiszűri, aki nem jöhet be – bent már senkit sem kell újra ellenőrizni.', en: 'The bouncer at the door turns away whoever can’t come in – inside, nobody needs checking again.' },
    when: [
      { hu: 'Bemenet ellenőrzésénél, a függvény elején.', en: 'When validating input at the start of a function.' },
      { hu: 'Ha a kódod három-négy szintnél mélyebbre húzódik be.', en: 'When your code is indented more than three or four levels deep.' },
    ],
    pros: [
      { hu: 'Laposabb, könnyebben olvasható kód.', en: 'Flatter, easier-to-read code.' },
      { hu: 'A kivételek egy helyen, jól láthatók.', en: 'The exceptions are in one visible place.' },
    ],
    cons: [
      { hu: 'Hosszú függvényben a sok szétszórt return nehezíti a követést.', en: 'In a long function, scattered returns make it harder to follow.' },
    ],
    related: [
      ['fail-fast', { hu: 'a korai return a fail fast legegyszerűbb eszköze.', en: 'an early return is the simplest tool for failing fast.' }],
      ['user-input', { hu: 'az elején kiszűrt rossz bemenet nem jut tovább.', en: 'bad input stopped at the top goes no further.' }],
    ],
  },
  'dead-code': {
    problem: { hu: 'A fájlban régi, kikommentezett blokkok és sosem hívott függvények gyűlnek, és mindenki kerülgeti őket.', en: 'Old commented-out blocks and never-called functions pile up in the file, and everyone works around them.' },
    analogy: { hu: 'Az évek óta nem hordott ruhák csak a helyet foglalják a szekrényben. Ha mégis kellene, ott a fotó róla (a Git).', en: 'Clothes you haven’t worn in years just take up the wardrobe. If you ever need one, there’s a photo of it (Git).' },
    when: [
      { hu: 'Commit előtt: nézd át, maradt-e kikommentezett kód.', en: 'Before committing: check for leftover commented-out code.' },
      { hu: 'Ha a szerkesztő szürkén jelzi, hogy egy változót vagy függvényt senki sem használ.', en: 'When your editor greys out a variable or function nobody uses.' },
    ],
    pros: [
      { hu: 'Rövidebb, tisztább fájlok.', en: 'Shorter, cleaner files.' },
      { hu: 'A keresés csak élő kódot talál.', en: 'Searches only find living code.' },
    ],
    cons: [
      { hu: 'Git nélkül a törlés tényleg végleges – ezért használj verziókezelést.', en: 'Without Git, deleting really is final – so use version control.' },
    ],
    related: [
      ['commit-often', { hu: 'ami commitolva van, azt nyugodtan törölheted.', en: 'what is committed can be deleted without fear.' }],
      ['boy-scout', { hu: 'egy halott blokk törlése tökéletes cserkészfeladat.', en: 'deleting a dead block is a perfect scout task.' }],
    ],
  },
  'rubber-duck': {
    problem: { hu: 'Órákig nézed ugyanazt a kódot, és a szemed átsiklik a hibán, mert azt látod, amit odaképzelsz.', en: 'You stare at the same code for hours and your eyes slide over the bug, because you see what you expect to see.' },
    analogy: { hu: 'Amikor valakinek elmagyarázod az utat, rájössz, hogy te is rossz helyen fordultál le.', en: 'While giving someone directions, you realise you took the wrong turn yourself.' },
    when: [
      { hu: 'Ha fél óránál tovább elakadsz ugyanazon a hibán.', en: 'When you have been stuck on the same bug for over half an hour.' },
      { hu: 'Mielőtt segítséget kérsz: gyakran már közben megoldódik.', en: 'Before asking for help: it often solves itself on the way.' },
    ],
    pros: [
      { hu: 'Ingyen van, és mindig ráér.', en: 'It’s free and always available.' },
      { hu: 'Rákényszerít a lépésenkénti gondolkodásra.', en: 'It forces step-by-step thinking.' },
    ],
    cons: [
      { hu: 'Az irodában furcsán nézhetnek rád.', en: 'People in the office may look at you funny.' },
    ],
    related: [
      ['divide-conquer', { hu: 'sorról sorra = kis lépésekre bontva.', en: 'line by line = broken into small steps.' }],
      ['read-error', { hu: 'a hibaüzenet hangos felolvasása már fél siker.', en: 'reading the error message out loud is half the battle.' }],
    ],
  },
  'user-input': {
    problem: { hu: 'A program feltételezi, hogy minden mező helyesen van kitöltve, és összezavarodik az üres szövegtől, a betűktől vagy a túl hosszú bemenettől.', en: 'The program assumes every field is filled in correctly and gets confused by empty text, letters or overly long input.' },
    analogy: { hu: 'A pénztáros akkor is megszámolja a pénzt, ha azt mondod, pontosan tízezer.', en: 'A cashier counts the money even when you say it’s exactly ten thousand.' },
    when: [
      { hu: 'Minden űrlapnál, URL-paraméternél és API-válasznál.', en: 'For every form, URL parameter and API response.' },
      { hu: 'Ha a bemenet HTML-be kerül: escape-eld, különben XSS-t kockáztatsz.', en: 'When input goes into HTML: escape it, or you risk XSS.' },
    ],
    pros: [
      { hu: 'Kevesebb furcsa hiba és összeomlás.', en: 'Fewer weird bugs and crashes.' },
      { hu: 'Biztonságosabb alkalmazás.', en: 'A safer application.' },
    ],
    cons: [
      { hu: 'Több kód és több hibaüzenet, amit meg kell írni.', en: 'More code and more error messages to write.' },
    ],
    related: [
      ['fail-fast', { hu: 'rossz bemenetnél azonnal, érthetően állj meg.', en: 'stop right away, and clearly, on bad input.' }],
      ['gigo', { hu: 'ellenőrzés nélkül a szemét bemenetből szemét kimenet lesz.', en: 'without checks, garbage in becomes garbage out.' }],
    ],
  },
  gigo: {
    problem: { hu: 'Órákig javítod a logikát, pedig a baj az, hogy rossz formátumú vagy hiányos adat érkezett.', en: 'You spend hours fixing the logic when the real problem is data that arrived in the wrong shape or incomplete.' },
    analogy: { hu: 'A legjobb szakács sem főz jó levest romlott zöldségből.', en: 'Even the best cook can’t make good soup from rotten vegetables.' },
    when: [
      { hu: 'Ha egy eredmény furcsa: először logold ki a bemenetet.', en: 'When a result looks odd: log the input first.' },
      { hu: 'Adatok betöltésekor (CSV, API, űrlap).', en: 'When loading data (CSV, API, forms).' },
    ],
    pros: [
      { hu: 'Gyorsabb hibakeresés.', en: 'Faster debugging.' },
      { hu: 'Tisztább adat az egész rendszerben.', en: 'Cleaner data across the whole system.' },
    ],
    cons: [
      { hu: 'Az adattisztítás unalmas, és sokszor több munka, mint maga a funkció.', en: 'Cleaning data is dull and often more work than the feature itself.' },
    ],
    related: [
      ['user-input', { hu: 'az ellenőrzött bemenet a GIGO ellenszere.', en: 'checked input is the antidote to GIGO.' }],
      ['rubber-duck', { hu: 'mondd ki hangosan, mi jött be – gyakran már ott kiderül.', en: 'say out loud what came in – it often shows right there.' }],
    ],
  },
  'divide-conquer': {
    problem: { hu: 'A feladat túl nagynak tűnik, nem tudod, hol kezdd, és a félkész kód sokáig nem működik.', en: 'The task feels too big, you don’t know where to start, and the half-done code doesn’t run for ages.' },
    analogy: { hu: 'Egy elefántot is csak falatonként lehet megenni.', en: 'You eat an elephant one bite at a time.' },
    when: [
      { hu: 'Minden új funkció elején.', en: 'At the start of every new feature.' },
      { hu: 'Hibakeresésnél: kapcsold ki a kód felét, és nézd meg, melyik felében van a hiba.', en: 'When debugging: switch off half the code and see which half the bug is in.' },
    ],
    pros: [
      { hu: 'Mindig van működő állapot.', en: 'There is always a working state.' },
      { hu: 'Látszik a haladás, és ez motivál.', en: 'Progress is visible, which keeps you going.' },
    ],
    cons: [
      { hu: 'Nagy kép nélkül a lépések szétcsúszhatnak.', en: 'Without a big picture, the steps can drift apart.' },
    ],
    related: [
      ['commit-often', { hu: 'minden kis lépés után egy commit.', en: 'one commit after every small step.' }],
      ['srp', { hu: 'a kis feladatokból kis függvények lesznek.', en: 'small tasks become small functions.' }],
    ],
  },
  'no-copy-paste': {
    problem: { hu: 'Olyan kódrészletek kerülnek a projektbe, amiket senki sem ért, és amikor elromlanak, senki sem tudja javítani.', en: 'Snippets nobody understands end up in the project, and when they break, nobody can fix them.' },
    analogy: { hu: 'Nem írsz alá szerződést úgy, hogy el sem olvastad – akkor sem, ha egy barátod ajánlotta.', en: 'You don’t sign a contract without reading it – even if a friend recommended it.' },
    when: [
      { hu: 'Fórumról, blogból vagy AI-tól átvett kódnál.', en: 'With code taken from a forum, a blog or an AI.' },
      { hu: 'Ha egy sorról nem tudnád elmagyarázni, mit csinál.', en: 'When you couldn’t explain what a line does.' },
    ],
    pros: [
      { hu: 'Valóban tanulsz belőle.', en: 'You actually learn from it.' },
      { hu: 'Tudod javítani, ha elromlik.', en: 'You can fix it when it breaks.' },
    ],
    cons: [
      { hu: 'Lassabb, mint gondolkodás nélkül bemásolni.', en: 'Slower than pasting without thinking.' },
    ],
    related: [
      ['rubber-duck', { hu: 'ha el tudod magyarázni a kacsának, akkor érted.', en: 'if you can explain it to the duck, you understand it.' }],
      ['read-error', { hu: 'a megértett kód hibaüzeneteit is érteni fogod.', en: 'you will understand the errors of code you understand.' }],
    ],
  },
  'commit-often': {
    problem: { hu: 'Napokig nincs commit, aztán valami elromlik, és nincs hova visszalépni – vagy minden egyetlen óriási commitba kerül.', en: 'Days go by without a commit, then something breaks with nowhere to go back to – or everything lands in one giant commit.' },
    analogy: { hu: 'A videójátékban is mentesz a főellenség előtt. Nem a játék elejéről akarod újrakezdeni.', en: 'In a video game you save before the boss fight. You don’t want to restart from the very beginning.' },
    when: [
      { hu: 'Minden működő kis lépés után.', en: 'After every small step that works.' },
      { hu: 'Mielőtt valami kockázatosba kezdesz (nagy átírás, frissítés).', en: 'Before trying something risky (a big refactor, an upgrade).' },
    ],
    pros: [
      { hu: 'Bármikor visszaléphetsz.', en: 'You can always step back.' },
      { hu: 'Az előzmények elmesélik, hogyan épült a projekt.', en: 'The history tells how the project was built.' },
    ],
    cons: [
      { hu: 'A túl apró commitoktól zajos az előzmény – ilyenkor összevonhatók (squash).', en: 'Too-tiny commits make the history noisy – you can squash them.' },
    ],
    related: [
      ['divide-conquer', { hu: 'kis lépés, kis commit.', en: 'small step, small commit.' }],
      ['dead-code', { hu: 'ami commitolva van, azt bátran törölheted.', en: 'what is committed can be deleted without fear.' }],
    ],
  },
  'read-error': {
    problem: { hu: 'A konzol pirosan villog, de a figyelmed átsiklik rajta, és vakon próbálgatod a javítást.', en: 'The console flashes red, you glance past it and start guessing at fixes.' },
    analogy: { hu: 'Ha kigyullad egy lámpa az autó műszerfalán, nem ragasztod le – megnézed, mit jelent.', en: 'When a warning light comes on in the car, you don’t tape over it – you look up what it means.' },
    when: [
      { hu: 'Minden hibánál: olvasd végig az első sort és a helyet.', en: 'With every error: read the first line and the location.' },
      { hu: 'Ha hosszú a stack trace: keresd meg benne a saját fájlodat.', en: 'When the stack trace is long: find your own file in it.' },
    ],
    pros: [
      { hu: 'Gyorsabb hibakeresés, kevesebb találgatás.', en: 'Faster debugging, less guessing.' },
      { hu: 'Megtanulod a gyakori hibák nyelvét.', en: 'You learn the language of common errors.' },
    ],
    cons: [
      { hu: 'Néha az üzenet csak a tünetet mutatja, az ok máshol van (lásd: GIGO).', en: 'Sometimes the message shows only the symptom and the cause is elsewhere (see GIGO).' },
    ],
    related: [
      ['gigo', { hu: 'ha a hiba helyén minden jónak tűnik, nézd meg a bemenetet.', en: 'if everything looks fine where the error points, check the input.' }],
      ['rubber-duck', { hu: 'olvasd fel hangosan a hibaüzenetet.', en: 'read the error message out loud.' }],
    ],
  },
  'code-for-humans': {
    problem: { hu: 'A kód rövid és „okos”, de hónapokkal később már a szerzője sem érti, mit csinál.', en: 'The code is short and “clever”, but months later even its author can’t tell what it does.' },
    analogy: { hu: 'A bevásárlólistát is úgy írod, hogy a párod is el tudja olvasni a boltban.', en: 'You write the shopping list so your partner can still read it in the shop.' },
    when: [
      { hu: 'Minden kódnál, amit más is olvasni fog – vagyis mindegyiknél.', en: 'For all code someone else will read – which is all of it.' },
      { hu: 'Code review előtt: olvasd át, mintha nem te írtad volna.', en: 'Before code review: read it as if someone else wrote it.' },
    ],
    pros: [
      { hu: 'Könnyebb csapatmunka és betanulás.', en: 'Easier teamwork and onboarding.' },
      { hu: 'Kevesebb hiba a félreértésekből.', en: 'Fewer bugs from misunderstandings.' },
    ],
    cons: [
      { hu: 'Néha pár sorral hosszabb lesz a kód.', en: 'Sometimes the code gets a few lines longer.' },
    ],
    related: [
      ['self-documenting', { hu: 'a beszédes nevek az emberi olvasónak szólnak.', en: 'clear names are written for the human reader.' }],
      ['kiss', { hu: 'az egyszerű kód a legolvashatóbb kód.', en: 'simple code is the most readable code.' }],
    ],
  },
};

/*
 * Saját plakát-mémek (klasszikus „motivációs plakát” forma): kép, nagy cím, egy ironikus mondat.
 * A képek az assets/js/principles-scenes.js-ben vannak, ugyanazzal az id-vel.
 *  - title:   a plakát címe (ha nincs, a kártya „big” felirata)
 *  - caption: a mondat alatta
 */
window.PRINCIPLES.posters = {
  kiss: { caption: { hu: 'Nincs motor, nincs app. Mégis repül.', en: 'No engine. No app. Still flies.' } },
  yagni: { caption: { hu: 'Olyan forgalomra épült, ami sosem jött.', en: 'Built for traffic that never came.' } },
  dry: { caption: { hu: 'Egy forrás. Mindenki abból iszik.', en: 'One source. Everyone drinks from it.' } },
  aha: { caption: { hu: 'Egy tábla minden esetre. Senki nem jut sehova.', en: 'One sign for every case. Nobody gets anywhere.' } },
  'boy-scout': { title: { hu: 'Cserkészszabály', en: 'Scout rule' }, caption: { hu: 'A tábort tisztábban hagyd, mint ahogy találtad. A kódot is.', en: 'Leave the campsite cleaner than you found it. The code, too.' } },
  'premature-optimization': { title: { hu: 'Mérj előbb', en: 'Measure first' }, caption: { hu: 'Rakétát szereltünk arra, ami sosem volt lassú.', en: 'Strapped a rocket to the part that was never slow.' } },
  srp: { title: 'SRP', caption: { hu: 'Egy feladat. Száz éve jól csinálja.', en: 'One job. Done well for a hundred years.' } },
  ocp: { title: 'OCP', caption: { hu: 'Új ágakat növeszt. A törzshöz nem nyúl.', en: 'Grows new branches. Never cuts the trunk.' } },
  lsp: { title: 'LSP', caption: { hu: 'Papíron madár. A kódodat azért eltöri.', en: 'Technically a bird. Will still break your code.' } },
  isp: { title: 'ISP', caption: { hu: 'Egy gomb kellett. Kaptál nyolcvanat.', en: 'You needed one button. You got eighty.' } },
  dip: { title: 'DIP', caption: { hu: 'A konnektorba dugd, ne az erőműbe.', en: 'Plug into the socket, not the power plant.' } },
  soc: { caption: { hu: 'Ég, tenger, homok. Mindegyik a maga dolgával törődik.', en: 'Sky, sea, sand. Each one minds its own business.' } },
  composition: { caption: { hu: 'Kis darabok egymáson. Senki nem örökölt semmit.', en: 'Small pieces, stacked. Nobody inherited anything.' } },
  demeter: { caption: { hu: 'Minél hosszabb a lánc, annál mélyebbre süllyedsz.', en: 'The longer the chain, the deeper you sink.' } },
  pola: { caption: { hu: 'Ha azt írja, tolni, ne kelljen húzni.', en: 'If it says push, it shouldn’t need a pull.' } },
  ssot: { caption: { hu: 'Egy óra megmondja az időt. Kettő vitát kezd.', en: 'One clock tells the time. Two start an argument.' } },
  'fail-fast': { caption: { hu: 'Ha a csúcsát most nem veszed észre, később találkozol a többivel.', en: 'Ignore the tip now. Meet the rest of it later.' } },
  convention: { caption: { hu: 'Mindenki ugyanazon az oldalon vezet. Megbeszélés nem kell hozzá.', en: 'Everyone drives on the same side. No meeting required.' } },
  'progressive-enhancement': { title: { hu: 'Fokozatosan', en: 'Progressive' }, caption: { hu: 'A leállt mozgólépcső is lépcső.', en: 'A broken escalator is still a staircase.' } },
  'mobile-first': { caption: { hu: 'Minden, ami számít, egy nagyon kicsi cserépben.', en: 'Everything that matters, in a very small pot.' } },
  immutability: { title: { hu: 'Változatlan', en: 'Immutable' }, caption: { hu: '100 millió éve nem módosította senki. Még mindig olvasható.', en: 'Not modified in 100 million years. Still perfectly readable.' } },
  'pure-functions': { title: { hu: 'Tisztaság', en: 'Purity' }, caption: { hu: 'Ugyanaz a bemenet, ugyanaz a tükörkép. Minden egyes alkalommal.', en: 'Same input, same reflection. Every single time.' } },
  'magic-numbers': { caption: { hu: 'A 42 a válasz. Csak senki sem emlékszik, mire.', en: '42 is the answer. Nobody remembers the question.' } },
  'self-documenting': { title: { hu: 'Érthetőség', en: 'Clarity' }, caption: { hu: 'Felirat a dobozon. Nem kell kinyitni, hogy tudd, mi van benne.', en: 'A label on the jar. No need to open it to know what’s inside.' } },
  'early-return': { caption: { hu: 'Aki nincs a listán, az ajtóban fordul vissza. Nem a táncparketten.', en: 'Not on the list? You turn back at the door. Not on the dance floor.' } },
  'dead-code': { caption: { hu: 'Kikommentezve 2019 óta. Biztos, ami biztos.', en: 'Commented out since 2019. Just in case.' } },
  'rubber-duck': { caption: { hu: 'Magyarázd el sorról sorra. A kacsa már tudja.', en: 'Explain it line by line. The duck already knows.' } },
  'user-input': { title: { hu: 'Bizalom', en: 'Trust' }, caption: { hu: 'A korhatár mezőbe ez került: „tizennyolc”. És egy emoji.', en: 'Someone typed “eighteen” in the age field. And an emoji.' } },
  gigo: { caption: { hu: 'A gép tökéletesen dolgozott. A bemenettel volt a baj.', en: 'The machine worked perfectly. The input didn’t.' } },
  'divide-conquer': { title: { hu: 'Kis lépések', en: 'Small steps' }, caption: { hu: 'A csúcsig 4000 lépés. Mindegyik egyszerű.', en: 'The summit is 4,000 steps away. Each one is easy.' } },
  'no-copy-paste': { title: { hu: 'Másolás', en: 'Copy-paste' }, caption: { hu: 'Működött. Senki sem tudta, miért. Most azt sem, miért nem.', en: 'It worked. Nobody knew why. Now nobody knows why it doesn’t.' } },
  'commit-often': { title: { hu: 'Mentés', en: 'Save point' }, caption: { hu: 'Ments a főellenség előtt. Mindig.', en: 'Save before the boss fight. Always.' } },
  'read-error': { title: { hu: 'Figyelem', en: 'Attention' }, caption: { hu: 'A lámpa három hete ég. Biztos nem fontos.', en: 'That light has been on for three weeks. Probably nothing.' } },
  'code-for-humans': { title: { hu: 'Olvashatóság', en: 'Readability' }, caption: { hu: 'Ma még érted. Hat hónap múlva egy idegen kódja lesz.', en: 'Today you get it. In six months it’s a stranger’s code.' } },
};

/*
 * Sorrend a csoportokon belül (a kerék, az oldalsáv és a lapozás is ezt követi).
 * Ami nincs a listán, az a cards tömbbeli helye szerint jön utánuk.
 */
window.PRINCIPLES.order = [
  'kiss', 'dry', 'yagni', 'boy-scout', 'magic-numbers', 'self-documenting', 'early-return', 'aha', 'dead-code',
  'premature-optimization', 'rubber-duck', 'user-input', 'fail-fast', 'gigo', 'divide-conquer',
  'no-copy-paste', 'commit-often', 'read-error', 'code-for-humans',
];
