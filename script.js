
/* =========================================
   TERMINAL ANIMÉ BAAWIIL
========================================= */

const terminal = document.querySelector(
  '#accueil .font-mono.text-sm.leading-8'
);

if (terminal) {
  const messages = [
    `// Profil de Baawiil

const baawiil = {
  passion: 'gaming & tech',
  projets: 'en évolution',
  curiosité: 'illimitée'
};`,

    `// Mes projets

PULSE / ÉKO       [CONCEPTION]
OrbitGG           [CONCEPTION]
DISASTER SERVICE  [CONCEPT]

> De nouvelles idées arrivent...`,

    `// Vérification du portfolio

✓ GitHub Pages actif
✓ Tailwind CSS chargé
✓ Portfolio opérationnel

console.log('Hello world!');`,

    `// Bienvenue dans mon univers

> Création en cours...
> Exploration de nouvelles idées...
> Gaming, tech et développement

STATUS: ONLINE`
  ];

  const typingSpeed = 35;
  const deletingSpeed = 12;
  const displayDuration = 4000;
  const transitionDelay = 600;

  terminal.replaceChildren();

  // Zone de texte
  const screen = document.createElement('div');

  screen.style.cssText = `
    min-height: 260px;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    font: inherit;
    line-height: inherit;
  `;

  // Texte et curseur sont sur la même ligne
  const output = document.createElement('span');
  const cursor = document.createElement('span');

  cursor.textContent = '▌';
  cursor.style.cssText = `
    display: inline;
    color: #22d3ee;
    animation: baawiil-blink 1s step-end infinite;
  `;

  cursor.setAttribute('aria-hidden', 'true');

  screen.append(output, cursor);
  terminal.append(screen);

  // Animation du curseur
  const cursorStyle = document.createElement('style');

  cursorStyle.textContent = `
    @keyframes baawiil-blink {
      0%, 49% {
        opacity: 1;
      }

      50%, 100% {
        opacity: 0;
      }
    }
  `;

  document.head.append(cursorStyle);

  const sleep = ms =>
    new Promise(resolve => setTimeout(resolve, ms));

  async function animateTerminal() {
    while (true) {
      for (const message of messages) {

        // Écriture progressive
        for (let i = 1; i <= message.length; i++) {
          output.textContent = message.slice(0, i);

          await sleep(
            message[i - 1] === '\n' ? 180 : typingSpeed
          );
        }

        // Message affiché pendant 4 secondes
        await sleep(displayDuration);

        // Effacement progressif
        for (let i = message.length; i >= 0; i--) {
          output.textContent = message.slice(0, i);

          await sleep(deletingSpeed);
        }

        // Pause avant le message suivant
        await sleep(transitionDelay);
      }
    }
  }

  animateTerminal();
}
