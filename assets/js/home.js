/* Kezdőlap: nagy illusztráció, logó, rövid bemutatkozás és gombok a négy részhez. */
(() => {
  'use strict';

  const { addStrings, mountArt } = window.Rika;

  addStrings({
    hu: {
      'home.docTitle': 'Rika cheat sheets · frontend puskák, snippetek, roadmap',
      'home.desc': 'Kézzel rajzolt frontend cheat sheetek, újrahasznosítható JavaScript snippetek és egy pipálható tanulási roadmap.',
      'home.kicker': 'Bal agy: logika. Jobb agy: kreativitás. Frontend: mindkettő.',
      'home.lead': 'Kézzel rajzolt frontend puskák, újrahasznosítható JavaScript snippetek és egy pipálható roadmap. Minél többet tudsz, annál színesebb.',
      'home.ctaRoadmap': 'Roadmap indítása',
      'home.ctaSheets': 'Cheat sheetek',
      'home.ctaSnippets': 'Snippetek',
      'home.ctaPrinciples': 'Elvek',
      'home.origin': 'Még noob koromban kezdtem gyűjteni. Azóta is nő.',
      'home.tipsTitle': 'Apró trükkök',
      'home.tip1': 'ugrás a keresőbe',
      'home.tip2': 'kattints bármelyik kódra a másoláshoz',
      'home.tip3': 'nyelvváltás a menüben',
      'home.tip4': 'a roadmapod letölthető és visszatölthető',
    },
    en: {
      'home.docTitle': 'Rika cheat sheets · frontend cheat sheets, snippets, roadmap',
      'home.desc': 'Hand-drawn frontend cheat sheets, reusable JavaScript snippets and a learning roadmap you can tick off.',
      'home.kicker': 'Left brain: logic. Right brain: creativity. Frontend: both.',
      'home.lead': 'Hand-drawn frontend cheat sheets, reusable JavaScript snippets and a roadmap you can tick off. The more you know, the more colorful it gets.',
      'home.ctaRoadmap': 'Start the roadmap',
      'home.ctaSheets': 'Cheat sheets',
      'home.ctaSnippets': 'Snippets',
      'home.ctaPrinciples': 'Principles',
      'home.origin': 'I started collecting these back in my noob days. It’s still growing.',
      'home.tipsTitle': 'Little tricks',
      'home.tip1': 'jump to search',
      'home.tip2': 'click any code to copy it',
      'home.tip3': 'switch language in the menu',
      'home.tip4': 'download and re-load your roadmap',
    },
  });

  // a kezdőlapon az egérrel is lehet "színezni" (a belső oldalakon csak a betöltéskori söprés van)
  mountArt(document.getElementById('hero-art'), { variant: 'full', id: 'home', peek: true })(1);
})();
