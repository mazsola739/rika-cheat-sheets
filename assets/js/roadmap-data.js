/*
 * A roadmap tartalma (magyarul és angolul), az én utam szerint:
 * HTML, CSS, JavaScript → TypeScript → React, néha kitérővel a Next.js és az Angular felé,
 * aztán Node.js és Express, hogy fullstack legyek.
 *
 * Egy pont: [kulcs, magyar felirat, angol felirat?, szint?]
 *  - az angol felirat elhagyható, ha ugyanaz (pl. 'Flexbox')
 *  - szint: 'must' = muszáj tudni (alapértelmezett), 'good' = jó tudni, 'extra' = lehetőség
 *
 * A téma (topic) id-ja és a pontok kulcsa maradjon stabil: a mentett pipák ezekhez
 * kötődnek ("téma.kulcs", pl. "css.flexbox"). Ha átnevezel egy kulcsot, a régi pipa elveszik.
 */
window.ROADMAP = {
  id: 'frontend',
  title: 'Roadmap: frontend → fullstack',
  stages: [
    {
      id: 'basics',
      title: { hu: 'Alapok', en: 'Basics' },
      subtitle: { hu: 'Ahol minden kezdődött · HTML, CSS, JavaScript', en: 'Where it all started · HTML, CSS, JavaScript' },
      color: '#b2f2bb',
      accent: '#2f9e44',
      topics: [
        {
          id: 'web',
          title: { hu: 'Hogyan működik a web?', en: 'How the web works' },
          items: [
            ['internet', 'Hogyan működik az internet?', 'How does the internet work?'],
            ['http', 'HTTP / HTTPS, kérés és válasz', 'HTTP / HTTPS, request and response'],
            ['dns', 'DNS és domain nevek', 'DNS and domain names'],
            ['hosting', 'Mi az a hosting?', 'What is hosting?'],
            ['browser', 'Hogyan működik a böngésző?', 'How browsers work', 'good'],
          ],
        },
        {
          id: 'html',
          title: 'HTML',
          items: [
            ['basics', 'Alapok, dokumentum-szerkezet', 'Basics, document structure'],
            ['semantic', 'Szemantikus HTML', 'Semantic HTML'],
            ['forms', 'Űrlapok és validáció', 'Forms and validation'],
            ['a11y', 'Akadálymentesség (a11y) alapjai', 'Accessibility (a11y) basics'],
            ['seo', 'SEO alapok', 'SEO basics', 'good'],
          ],
        },
        {
          id: 'css',
          title: 'CSS',
          items: [
            ['selectors', 'Szelektorok és specificitás', 'Selectors and specificity'],
            ['boxmodel', 'Box model'],
            ['flexbox', 'Flexbox'],
            ['grid', 'Grid'],
            ['responsive', 'Reszponzív design, media query-k', 'Responsive design, media queries'],
            ['position', 'Pozicionálás, z-index', 'Positioning, z-index'],
            ['vars', 'CSS változók (custom properties)', 'CSS variables (custom properties)'],
            ['animation', 'Transition és animáció', 'Transitions and animations', 'good'],
          ],
        },
        {
          id: 'js',
          title: 'JavaScript',
          items: [
            ['syntax', 'Szintaxis, változók, típusok', 'Syntax, variables, types'],
            ['functions', 'Függvények, scope, closure', 'Functions, scope, closures'],
            ['arrays', 'Tömbök, objektumok, tömbmetódusok', 'Arrays, objects, array methods'],
            ['dom', 'DOM manipuláció', 'DOM manipulation'],
            ['events', 'Események, bubbling, delegálás', 'Events, bubbling, delegation'],
            ['es6', 'ES6+: destructuring, spread, modulok', 'ES6+: destructuring, spread, modules'],
            ['async', 'Promise, async / await'],
            ['fetch', 'Fetch API / AJAX'],
            ['errors', 'Hibakezelés: try / catch', 'Error handling: try / catch'],
            ['deep', 'Hoisting, this, prototype', 'Hoisting, this, prototypes', 'good'],
          ],
        },
        {
          id: 'git',
          title: 'Git & GitHub',
          items: [
            ['basics', 'init, add, commit, push'],
            ['branch', 'Branch, merge, konfliktusok', 'Branches, merging, conflicts'],
            ['github', 'GitHub: repo, pull request', 'GitHub: repos, pull requests'],
            ['messages', 'Jó commit-üzenetek', 'Good commit messages', 'good'],
            ['advanced', 'rebase, stash, cherry-pick', 'rebase, stash, cherry-pick', 'extra'],
          ],
        },
        {
          id: 'tools',
          title: { hu: 'Eszközök', en: 'Tools' },
          items: [
            ['vscode', 'VS Code és hasznos bővítmények', 'VS Code and useful extensions'],
            ['devtools', 'Böngésző DevTools', 'Browser DevTools'],
            ['terminal', 'Terminál alapparancsok', 'Basic terminal commands'],
            ['search', 'Keresés okosan: MDN, docs', 'Searching smart: MDN, docs'],
          ],
        },
      ],
    },
    {
      id: 'typescript',
      title: { hu: 'TypeScript & eszközök', en: 'TypeScript & tooling' },
      subtitle: { hu: 'Biztosabb kód, kényelmesebb munka · típusok, build, csomagok', en: 'Safer code, smoother work · types, builds, packages' },
      color: '#ffd8a8',
      accent: '#e8590c',
      topics: [
        {
          id: 'ts',
          title: 'TypeScript',
          items: [
            ['types', 'Alap típusok', 'Basic types'],
            ['interfaces', 'interface és type', 'interface vs. type'],
            ['generics', 'Generikusok', 'Generics'],
            ['narrowing', 'Type narrowing'],
            ['utility', 'Utility típusok (Partial, Pick…)', 'Utility types (Partial, Pick…)', 'good'],
          ],
        },
        {
          id: 'pkg',
          title: { hu: 'Csomagkezelők', en: 'Package managers' },
          items: [
            ['npm', 'npm'],
            ['scripts', 'npm scripts'],
            ['semver', 'Verziók, package-lock', 'Versions, package-lock'],
            ['yarn', 'yarn', 'yarn', 'good'],
            ['pnpm', 'pnpm', 'pnpm', 'good'],
            ['bun', 'Bun', 'Bun', 'good'],
          ],
        },
        {
          id: 'build',
          title: { hu: 'Build eszközök', en: 'Build tools' },
          items: [
            ['vite', 'Vite'],
            ['eslint', 'ESLint'],
            ['prettier', 'Prettier'],
            ['biome', 'Biome', 'Biome', 'good'],
          ],
        },
        {
          id: 'modern-css',
          title: 'Modern CSS',
          items: [
            ['sass', 'Sass / SCSS', 'Sass / SCSS', 'good'],
            ['modules', 'CSS Modules', 'CSS Modules', 'good'],
            ['tailwind', 'Tailwind CSS', 'Tailwind CSS', 'good'],
            ['bem', 'BEM elnevezés', 'BEM naming', 'good'],
            ['cssinjs', 'CSS-in-JS (styled-components, Emotion)', 'CSS-in-JS (styled-components, Emotion)', 'extra'],
          ],
        },
        {
          id: 'browser',
          title: { hu: 'BOM & böngésző API-k', en: 'BOM & browser APIs' },
          items: [
            ['bom', 'BOM: window, location, history'],
            ['storage', 'localStorage, sessionStorage'],
            ['observer', 'IntersectionObserver', 'IntersectionObserver', 'good'],
          ],
        },
        {
          id: 'security',
          title: { hu: 'Webbiztonság', en: 'Web security' },
          items: [
            ['https', 'HTTPS'],
            ['cors', 'CORS'],
            ['xss', 'XSS és hogyan kerüld el', 'XSS and how to avoid it'],
            ['csp', 'Content Security Policy', 'Content Security Policy', 'good'],
            ['owasp', 'OWASP Top 10', 'OWASP Top 10', 'good'],
          ],
        },
        {
          id: 'perf',
          title: { hu: 'Teljesítmény & a11y', en: 'Performance & a11y' },
          items: [
            ['lighthouse', 'Lighthouse, DevTools Performance'],
            ['images', 'Képoptimalizálás, lazy loading', 'Image optimization, lazy loading'],
            ['aria', 'ARIA, billentyűzetes navigáció', 'ARIA, keyboard navigation'],
            ['cwv', 'Core Web Vitals', 'Core Web Vitals', 'good'],
          ],
        },
      ],
    },
    {
      id: 'react',
      title: 'React',
      subtitle: { hu: 'A fő vonal · komponensek, hookok, állapot', en: 'The main line · components, hooks, state' },
      color: '#a5d8ff',
      accent: '#1c7ed6',
      topics: [
        {
          id: 'react-basics',
          title: { hu: 'React alapok', en: 'React basics' },
          items: [
            ['jsx', 'JSX'],
            ['components', 'Komponensek és props', 'Components and props'],
            ['state', 'State'],
            ['conditional', 'Feltételes renderelés', 'Conditional rendering'],
            ['lists', 'Listák és key', 'Lists and keys'],
            ['events', 'Eseménykezelés', 'Handling events'],
            ['composition', 'Kompozíció vs. öröklés', 'Composition vs. inheritance', 'good'],
          ],
        },
        {
          id: 'hooks',
          title: { hu: 'Hookok', en: 'Hooks' },
          items: [
            ['usestate', 'useState'],
            ['useeffect', 'useEffect'],
            ['useref', 'useRef'],
            ['usecontext', 'useContext'],
            ['custom', 'Saját hook írása', 'Writing custom hooks'],
            ['usememo', 'useMemo, useCallback', 'useMemo, useCallback', 'good'],
            ['usereducer', 'useReducer', 'useReducer', 'good'],
          ],
        },
        {
          id: 'react-adv',
          title: { hu: 'Haladó React', en: 'Advanced React' },
          items: [
            ['context', 'Context API'],
            ['lazy', 'Suspense és lazy loading', 'Suspense and lazy loading', 'good'],
            ['errorb', 'Error boundary', 'Error boundaries', 'good'],
            ['portals', 'Portal', 'Portals', 'good'],
            ['hoc', 'HOC, render props', 'HOCs, render props', 'extra'],
          ],
        },
        {
          id: 'routing',
          title: 'Routing',
          items: [
            ['react-router', 'React Router'],
            ['params', 'URL paraméterek, nested route-ok', 'URL params, nested routes'],
            ['tanstack-router', 'TanStack Router', 'TanStack Router', 'extra'],
          ],
        },
        {
          id: 'state',
          title: { hu: 'Állapotkezelés', en: 'State management' },
          items: [
            ['context', 'Context + useReducer'],
            ['redux', 'Redux Toolkit', 'Redux Toolkit', 'good'],
            ['zustand', 'Zustand', 'Zustand', 'good'],
            ['mobx', 'MobX', 'MobX', 'extra'],
          ],
        },
        {
          id: 'data',
          title: { hu: 'Adatlekérés', en: 'Data fetching' },
          items: [
            ['fetch', 'fetch / axios'],
            ['loading', 'Betöltés- és hibaállapotok', 'Loading and error states'],
            ['query', 'TanStack Query (react-query)', 'TanStack Query (react-query)', 'good'],
            ['graphql', 'GraphQL (Apollo)', 'GraphQL (Apollo)', 'extra'],
          ],
        },
        {
          id: 'forms',
          title: { hu: 'Űrlapok', en: 'Forms' },
          items: [
            ['controlled', 'Kontrollált inputok', 'Controlled inputs'],
            ['rhf', 'React Hook Form', 'React Hook Form', 'good'],
            ['zod', 'Validáció: Zod', 'Validation: Zod', 'good'],
          ],
        },
        {
          id: 'ui',
          title: { hu: 'Stílus & UI könyvtárak', en: 'Styling & UI libraries' },
          items: [
            ['styling', 'CSS Modules vagy Tailwind', 'CSS Modules or Tailwind'],
            ['shadcn', 'shadcn/ui', 'shadcn/ui', 'extra'],
            ['mui', 'MUI', 'MUI', 'extra'],
            ['chakra', 'Chakra UI', 'Chakra UI', 'extra'],
          ],
        },
        {
          id: 'testing',
          title: { hu: 'Tesztelés', en: 'Testing' },
          items: [
            ['unit', 'Unit teszt: Vitest / Jest', 'Unit tests: Vitest / Jest'],
            ['rtl', 'React Testing Library'],
            ['e2e', 'E2E: Playwright / Cypress', 'E2E: Playwright / Cypress', 'good'],
          ],
        },
      ],
    },
    {
      id: 'detours',
      title: { hu: 'Kitérők', en: 'Detours' },
      subtitle: { hu: 'Néha eltévedtem · Next.js, Angular, mobil és asztali appok', en: 'Sometimes I wandered off · Next.js, Angular, mobile and desktop apps' },
      color: '#fcc2d7',
      accent: '#d6336c',
      topics: [
        {
          id: 'next',
          title: { hu: 'Next.js & renderelés', en: 'Next.js & rendering' },
          items: [
            ['next', 'Next.js'],
            ['app-router', 'App Router, layoutok', 'App Router, layouts'],
            ['modes', 'SSR, SSG, ISR'],
            ['rsc', 'Server Components', 'Server Components', 'good'],
          ],
        },
        {
          id: 'angular',
          title: 'Angular',
          items: [
            ['components', 'Komponensek, sablonok, data binding', 'Components, templates, data binding'],
            ['services', 'Service-ek, dependency injection', 'Services, dependency injection'],
            ['router', 'Angular Router'],
            ['forms', 'Reaktív űrlapok', 'Reactive forms'],
            ['rxjs', 'RxJS, Observable-ök', 'RxJS, observables'],
            ['ngrx', 'NgRx', 'NgRx', 'good'],
            ['signals', 'Signals', 'Signals', 'good'],
          ],
        },
        {
          id: 'beyond',
          title: { hu: 'Mobil & asztali', en: 'Mobile & desktop' },
          items: [
            ['react-native', 'React Native (mobil)', 'React Native (mobile)', 'extra'],
            ['electron', 'Electron (asztali)', 'Electron (desktop)', 'extra'],
          ],
        },
      ],
    },
    {
      id: 'fullstack',
      title: 'Node.js → fullstack',
      subtitle: { hu: 'A szerver oldal · Node.js, Express, adatbázis, deploy', en: 'The server side · Node.js, Express, databases, deployment' },
      color: '#d0bfff',
      accent: '#7048e8',
      topics: [
        {
          id: 'node',
          title: 'Node.js',
          items: [
            ['basics', 'Node.js alapok, modulok (CommonJS, ESM)', 'Node.js basics, modules (CommonJS, ESM)'],
            ['fs', 'Fájlok és útvonalak: fs, path', 'Files and paths: fs, path'],
            ['loop', 'Event loop, aszinkron I/O', 'Event loop, async I/O'],
            ['cli', 'Saját CLI és npm csomag', 'Your own CLI and npm package', 'good'],
          ],
        },
        {
          id: 'express',
          title: 'Express.js',
          items: [
            ['routes', 'Útvonalak és route paraméterek', 'Routes and route parameters'],
            ['middleware', 'Middleware-ek', 'Middleware'],
            ['rest', 'REST API tervezés', 'REST API design'],
            ['errors', 'Hibakezelés, státuszkódok', 'Error handling, status codes'],
            ['validation', 'Bemenet ellenőrzése', 'Input validation'],
          ],
        },
        {
          id: 'db',
          title: { hu: 'Adatbázis', en: 'Databases' },
          items: [
            ['sql', 'SQL alapok', 'SQL basics'],
            ['sqlite', 'SQLite'],
            ['postgres', 'PostgreSQL / MySQL', 'PostgreSQL / MySQL', 'good'],
          ],
        },
        {
          id: 'fullstack',
          title: 'Fullstack',
          items: [
            ['connect', 'Frontend és backend összekötése', 'Connecting frontend and backend'],
            ['proxy', 'CORS és proxy fejlesztés közben', 'CORS and a dev proxy'],
            ['api-tests', 'API tesztek (Supertest)', 'API tests (Supertest)', 'good'],
            ['docker', 'Docker', 'Docker', 'good'],
          ],
        },
        {
          id: 'deploy',
          title: 'Deploy',
          items: [
            ['pages', 'GitHub Pages'],
            ['vercel', 'Vercel / Netlify'],
            ['env', 'Környezeti változók, build', 'Environment variables, builds'],
            ['ci', 'CI: GitHub Actions', 'CI: GitHub Actions', 'good'],
          ],
        },
        {
          id: 'patterns',
          title: { hu: 'Tervezési minták', en: 'Design patterns' },
          items: [
            ['clean', 'Tiszta kód, SOLID alapok', 'Clean code, SOLID basics', 'good'],
            ['js-patterns', 'Module, Observer, Factory', 'Module, Observer, Factory', 'good'],
            ['react-patterns', 'React minták: compound, container', 'React patterns: compound, container', 'good'],
          ],
        },
      ],
    },
  ],
};
