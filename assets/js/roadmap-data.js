/*
 * A frontend roadmap tartalma (magyarul és angolul).
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
  title: 'Frontend Roadmap',
  stages: [
    {
      id: 'basics',
      title: { hu: 'Alapok', en: 'Basics' },
      subtitle: { hu: 'Kezdő szint · építs projekteket tanulás közben', en: 'Beginner · build projects while learning' },
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
      id: 'intermediate',
      title: { hu: 'Haladó', en: 'Intermediate' },
      subtitle: { hu: 'Középszint · eszközök, típusok, biztonság', en: 'Intermediate · tooling, types, security' },
      color: '#ffd8a8',
      accent: '#e8590c',
      topics: [
        {
          id: 'pkg',
          title: { hu: 'Csomagkezelők', en: 'Package managers' },
          items: [
            ['npm', 'npm'],
            ['scripts', 'npm scripts'],
            ['semver', 'Verziók, package-lock', 'Versions, package-lock'],
            ['yarn', 'yarn', 'yarn', 'good'],
            ['pnpm', 'pnpm', 'pnpm', 'extra'],
          ],
        },
        {
          id: 'build',
          title: { hu: 'Build eszközök', en: 'Build tools' },
          items: [
            ['vite', 'Vite'],
            ['eslint', 'ESLint'],
            ['prettier', 'Prettier'],
            ['webpack', 'Webpack', 'Webpack', 'good'],
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
          id: 'browser',
          title: { hu: 'BOM & böngésző API-k', en: 'BOM & browser APIs' },
          items: [
            ['bom', 'BOM: window, location, history'],
            ['storage', 'localStorage, sessionStorage'],
            ['observer', 'IntersectionObserver', 'IntersectionObserver', 'good'],
            ['workers', 'Web Workers, Service Workers', 'Web Workers, Service Workers', 'extra'],
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
      ],
    },
    {
      id: 'react',
      title: 'React',
      subtitle: { hu: 'Keretrendszer · a komponensek világa', en: 'Framework · the world of components' },
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
            ['fiber', 'Fiber architektúra', 'Fiber architecture', 'extra'],
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
      ],
    },
    {
      id: 'pro',
      title: { hu: 'Profi', en: 'Pro' },
      subtitle: { hu: 'Haladó szint · tesztelés, teljesítmény, deploy', en: 'Advanced · testing, performance, deployment' },
      color: '#d0bfff',
      accent: '#7048e8',
      topics: [
        {
          id: 'testing',
          title: { hu: 'Tesztelés', en: 'Testing' },
          items: [
            ['unit', 'Unit teszt: Vitest / Jest', 'Unit tests: Vitest / Jest'],
            ['rtl', 'React Testing Library'],
            ['e2e', 'E2E: Playwright / Cypress', 'E2E: Playwright / Cypress', 'good'],
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
        {
          id: 'next',
          title: { hu: 'Next.js & renderelés', en: 'Next.js & rendering' },
          items: [
            ['next', 'Next.js'],
            ['modes', 'SSR, SSG, ISR'],
            ['rsc', 'Server Components', 'Server Components', 'good'],
            ['astro', 'Astro, Gatsby', 'Astro, Gatsby', 'extra'],
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
          id: 'beyond',
          title: { hu: 'Ami ezen túl van', en: 'Beyond' },
          items: [
            ['node', 'Node.js backend alapok', 'Node.js backend basics', 'good'],
            ['pwa', 'PWA', 'PWA', 'extra'],
            ['react-native', 'React Native (mobil)', 'React Native (mobile)', 'extra'],
            ['electron', 'Electron (desktop)', 'Electron (desktop)', 'extra'],
            ['wasm', 'WebAssembly', 'WebAssembly', 'extra'],
          ],
        },
      ],
    },
  ],
};
