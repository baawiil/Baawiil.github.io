
/* =========================================
   BAAWIIL PORTFOLIO - SCRIPT.JS
   Navigation, projets, compétences, terminal
========================================= */

// Navigation mobile

const menuButton = document.querySelector('#menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');

menuButton?.addEventListener('click', () => {
  const open = !mobileMenu.classList.toggle('hidden');
  menuButton.setAttribute('aria-expanded', String(open));
});

mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

// Année automatique

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

// Animations au défilement

const reduceMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
  });
} else {
  document.querySelectorAll('.reveal').forEach(element => {
    element.classList.add('is-visible');
  });
}

// États des boutons interactifs

const inactive = [
  'border-white/15',
  'bg-white/5',
  'text-slate-300'
];

const active = [
  'border-cyan-400',
  'bg-cyan-400/15',
  'text-cyan-200'
];

function selectButton(buttons, selected) {
  buttons.forEach(button => {
    const isSelected = button === selected;

    button.classList.remove(...(isSelected ? inactive : active));
    button.classList.add(...(isSelected ? active : inactive));
    button.setAttribute('aria-pressed', String(isSelected));
  });
}

// Filtres des projets

const filters = [...document.querySelectorAll('.filter-btn')];

filters.forEach(button => {
  button.addEventListener('click', () => {
    selectButton(filters, button);

    let count = 0;

    document.querySelectorAll('.project-card').forEach(card => {
      const visible =
        button.dataset.filter === 'all' ||
        card.dataset.category === button.dataset.filter;

      card.hidden = !visible;
      if (visible) count++;
    });

    const status = document.querySelector('#filter-status');

    if (status) {
      status.textContent =
        `${count} projet${count > 1 ? 's' : ''} ` +
        `affiché${count > 1 ? 's' : ''}`;
    }
  });
});

// Compétences interactives

const skills = {
  web: {
    title: 'Développement web',
    desc: "Création d'interfaces et apprentissage des technologies du web.",
    tags: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS']
  },
  discord: {
    title: 'Univers Discord',
    desc: 'Conception de communautés, de bots et de systèmes interactifs.',
    tags: ['Bots', 'Communautés', 'Automatisations', 'Expérience membre']
  },
  tools: {
    title: 'Outils & environnements',
    desc: 'Outils utilisés ou explorés pour mes projets personnels.',
    tags: ['GitHub', 'Git', 'Linux / Debian', 'VS Code']
  }
};

const tabs = [...document.querySelectorAll('.skill-tab')];

tabs.forEach(button => {
  button.addEventListener('click', () => {
    selectButton(tabs, button);

    const skill = skills[button.dataset.skill];
    const target = document.querySelector('#skills-content');

    if (!skill || !target) return;

    target.replaceChildren();

    const heading = document.createElement('h3');
    heading.className = 'text-xl font-black text-white';
    heading.textContent = skill.title;

    const description = document.createElement('p');
    description.className = 'mt-3 leading-7 text-slate-400';
    description.textContent = skill.desc;

    const tags = document.createElement('div');
    tags.className = 'mt-5 flex flex-wrap gap-2';

    skill.tags.forEach(label => {
      const span = document.createElement('span');

      span.className =
        'rounded-lg border border-cyan-400/20 ' +
        'bg-cyan-400/10 px-3 py-2 text-sm text-cyan-200';

      span.textContent = label;
      tags.append(span);
    });

    target.append(heading, description, tags);
  });
});

// Copier l'adresse du portfolio

document.querySelector('#copy-site')?.addEventListener(
  'click',
  async () => {
    const output = document.querySelector('#copy-status');

    try {
      await navigator.clipboard.writeText(
        'https://baawiil.github.io/'
      );

      if (output) output.textContent = 'Lien copié !';
    } catch {
      if (output) {
        output.textContent =
          'Copie manuelle : https://baawiil.github.io/';
      }
    }
  }
);

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
✓ Interface opérationnelle

console.log('Hello world!');`,

    `// Bienvenue dans mon univers

> Création en cours...
> Exploration de nouvelles idées...
> Gaming, tech et développement

STATUS: ONLINE`
  ];

  // Réglages de vitesse
  const typingSpeed = 35;
  const deletingSpeed = 12;
  const displayDuration = 4000;
  const transitionDelay = 600;

  terminal.replaceChildren();

  // Zone de texte
  const output = document.createElement('pre');

  output.style.cssText = `
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    font: inherit;
    line-height: inherit;
    min-height: 260px;
    margin: 0;
  `;

  output.setAttribute('aria-hidden', 'true');

  // Curseur clignotant
  const cursor = document.createElement('span');
  cursor.textContent = '▌';
  cursor.style.color = '#22d3ee';
  cursor.style.animation = 'baawiil-blink 1s step-end infinite';
  cursor.setAttribute('aria-hidden', 'true');

  // Animation du curseur
  const cursorStyle = document.createElement('style');
  cursorStyle.textContent = `
    @keyframes baawiil-blink {
      50% { opacity: 0; }
    }

    @media (prefers-reduced-motion: reduce) {
      .baawiil-terminal-cursor {
        animation: none !important;
      }
    }
  `;

  cursor.className = 'baawiil-terminal-cursor';
  document.head.append(cursorStyle);

  // Conteneur de l'animation
  const screen = document.createElement('div');
  screen.style.cssText = `
    position: relative;
    min-height: 260px;
  `;

  cursor.style.position = 'absolute';
  cursor.style.left = '0';
  cursor.style.bottom = '0';

  screen.append(output, cursor);
  terminal.append(screen);

  // Bouton de contrôle
  const controls = document.createElement('div');
  controls.style.cssText = `
    display: flex;
    justify-content: flex-end;
    margin-top: 12px;
  `;

  const toggleButton = document.createElement('button');
  toggleButton.type = 'button';
  toggleButton.style.cssText = `
    border: 1px solid rgba(34,211,238,.35);
    border-radius: 8px;
    padding: 5px 10px;
    color: #67e8f9;
    background: rgba(34,211,238,.08);
    font: 12px system-ui, sans-serif;
    cursor: pointer;
  `;

  controls.append(toggleButton);
  terminal.append(controls);

  // Respecter la préférence initiale
  let running = !reduceMotion;
  let generation = 0;

  const sleep = ms =>
    new Promise(resolve => setTimeout(resolve, ms));

  function updateButton() {
    toggleButton.textContent = running
      ? '⏸ Mettre en pause'
      : '▶ Activer l’animation';

    toggleButton.setAttribute(
      'aria-pressed',
      String(running)
    );
  }

  async function animateTerminal(id) {
    while (running && id === generation) {
      for (const message of messages) {
        if (!running || id !== generation) return;

        // Écriture
        for (let i = 1; i <= message.length; i++) {
          if (!running || id !== generation) return;

          output.textContent = message.slice(0, i);

          await sleep(
            message[i - 1] === '\n' ? 180 : typingSpeed
          );
        }

        // Pause
        await sleep(displayDuration);

        if (!running || id !== generation) return;

        // Effacement
        for (let i = message.length; i >= 0; i--) {
          if (!running || id !== generation) return;

          output.textContent = message.slice(0, i);
          await sleep(deletingSpeed);
        }

        await sleep(transitionDelay);
      }
    }
  }

  function startAnimation() {
    running = true;
    generation++;
    output.textContent = '';
    updateButton();
    animateTerminal(generation);
  }

  function stopAnimation() {
    running = false;
    generation++;
    updateButton();
  }

  toggleButton.addEventListener('click', () => {
    if (running) {
      stopAnimation();
    } else {
      startAnimation();
    }
  });

  // Démarrage automatique, sauf préférence
  // de réduction des mouvements.
  if (running) {
    startAnimation();
  } else {
    output.textContent = messages[0];
    updateButton();
  }

  terminal.setAttribute(
    'aria-label',
    'Terminal de présentation animé Baawiil'
  );
}
