const menuButton = document.querySelector('#menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
menuButton?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('hidden') === false;
  menuButton.setAttribute('aria-expanded', String(open));
});
mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileMenu.classList.add('hidden');
  menuButton.setAttribute('aria-expanded', 'false');
}));
document.querySelector('#year').textContent = new Date().getFullYear();

// Animation légère, désactivée pour les utilisateurs qui préfèrent moins de mouvement.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
} else document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));

const inactive = ['border-white/15', 'bg-white/5', 'text-slate-300'];
const active = ['border-cyan-400', 'bg-cyan-400/15', 'text-cyan-200'];
function selectButton(buttons, selected) {
  buttons.forEach(button => {
    const isSelected = button === selected;
    button.classList.remove(...(isSelected ? inactive : active));
    button.classList.add(...(isSelected ? active : inactive));
    button.setAttribute('aria-pressed', String(isSelected));
  });
}
const filters = [...document.querySelectorAll('.filter-btn')];
filters.forEach(button => button.addEventListener('click', () => {
  selectButton(filters, button);
  let count = 0;
  document.querySelectorAll('.project-card').forEach(card => {
    const visible = button.dataset.filter === 'all' || card.dataset.category === button.dataset.filter;
    card.hidden = !visible;
    if (visible) count++;
  });
  document.querySelector('#filter-status').textContent = `${count} projet${count > 1 ? 's' : ''} affiché${count > 1 ? 's' : ''}`;
}));
const skills = {
  web: { title: 'Développement web', desc: "Création d'interfaces et apprentissage des technologies du web.", tags: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS'] },
  discord: { title: 'Univers Discord', desc: 'Conception de communautés, de bots et de systèmes interactifs.', tags: ['Bots', 'Communautés', 'Automatisations', 'Expérience membre'] },
  tools: { title: 'Outils & environnements', desc: 'Outils utilisés ou explorés pour mes projets personnels.', tags: ['GitHub', 'Git', 'Linux / Debian', 'VS Code'] }
};
const tabs = [...document.querySelectorAll('.skill-tab')];
tabs.forEach(button => button.addEventListener('click', () => {
  selectButton(tabs, button);
  const skill = skills[button.dataset.skill];
  const target = document.querySelector('#skills-content');
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
    span.className = 'rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-200';
    span.textContent = label;
    tags.append(span);
  });
  target.append(heading, description, tags);
}));
document.querySelector('#copy-site')?.addEventListener('click', async () => {
  const output = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText('https://baawiil.github.io/');
    output.textContent = 'Lien copié !';
  } catch { output.textContent = 'Copie manuelle : https://baawiil.github.io/'; }
});

/* Terminal animé Baawiil */

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

    `// Vérification du système

✓ GitHub connecté
✓ Tailwind CSS chargé
✓ Portfolio opérationnel

console.log('Hello world!');`,

    `// Bienvenue dans mon univers

> Création en cours...
> Exploration de nouvelles idées...
> Gaming, tech et développement

STATUS: ONLINE`
  ];

  terminal.replaceChildren();

  const output = document.createElement('pre');
  output.style.cssText =
    'white-space:pre-wrap;overflow-wrap:anywhere;' +
    'font:inherit;line-height:inherit;min-height:260px;';

  const cursor = document.createElement('span');
  cursor.textContent = '▌';
  cursor.className = 'text-cyan-400 animate-pulse';
  cursor.setAttribute('aria-hidden', 'true');

  terminal.append(output, cursor);
  terminal.setAttribute('aria-label', 'Terminal de présentation Baawiil');
  output.setAttribute('aria-hidden', 'true');

  const sleep = ms =>
    new Promise(resolve => setTimeout(resolve, ms));

  async function animateTerminal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      output.textContent = messages[0];
      cursor.remove();
      return;
    }

    while (true) {
      for (const message of messages) {
        // Écriture progressive
        for (let i = 1; i <= message.length; i++) {
          output.textContent = message.slice(0, i);
          await sleep(message[i - 1] === '\n' ? 180 : 35);
        }

        // Conserver le message
        await sleep(4000);

        // Effacement progressif
        for (let i = message.length; i >= 0; i--) {
          output.textContent = message.slice(0, i);
          await sleep(12);
        }

        await sleep(600);
      }
    }
  }

  animateTerminal();
}

