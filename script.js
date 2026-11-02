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
const skills = {
  web: {
    title: 'Développement web',
    desc: "Création d'interfaces web et découverte des technologies de développement.",
    groups: [
      { label: 'Langages', items: ['HTML', 'CSS', 'JavaScript'] },
      { label: 'Frameworks', items: ['Tailwind CSS'] },
      { label: 'Outils', items: ['Node.js (outillage)'] }
    ]
  },
  discord: {
    title: 'Univers Discord',
    desc: 'Conception de communautés, de bots et de systèmes interactifs.',
    groups: [
      { label: 'Compétences', items: ['Bots Discord', 'Communautés', 'Automatisations', 'Expérience membre'] }
    ]
  },
  video: {
    title: 'Montage vidéo & colorimétrie',
    desc: 'Montage de séquences, correction colorimétrique et création de contenus audiovisuels.',
    groups: [
      { label: 'Logiciels', items: ['Adobe Premiere Pro', 'Adobe Photoshop', 'OBS Studio'] },
      { label: 'Compétences', items: ['Montage vidéo', 'Color Grading', 'Étalonnage', 'Formats verticaux'] }
    ]
  },
  tools: {
    title: 'Outils & logiciels',
    desc: 'Logiciels et environnements utilisés ou explorés dans mes projets créatifs et techniques.',
    groups: [
      { label: 'Logiciels', items: ['Visual Studio Code', 'Adobe Photoshop (formation)', 'OBS Studio'] },
      { label: 'Plateformes & systèmes', items: ['GitHub', 'Git', 'Linux / Debian'] }
    ]
  }
};
const tabs = [...document.querySelectorAll('.skill-tab')];
function renderSkill(skill) {
  const target = document.querySelector('#skills-content');
  if (!target || !skill) return;
  target.replaceChildren();
  const heading = document.createElement('h3');
  heading.className = 'text-xl font-black text-white';
  heading.textContent = skill.title;
  const description = document.createElement('p');
  description.className = 'mt-3 leading-7 text-slate-400';
  description.textContent = skill.desc;
  target.append(heading, description);
  skill.groups.forEach(group => {
    const section = document.createElement('div');
    section.className = 'mt-5';
    const label = document.createElement('h4');
    label.className = 'mb-3 text-sm font-bold text-slate-200';
    label.textContent = group.label + ' :';
    const tags = document.createElement('div');
    tags.className = 'flex flex-wrap gap-2';
    group.items.forEach(item => {
      const span = document.createElement('span');
      span.className = 'rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-200';
      span.textContent = item;
      tags.append(span);
    });
    section.append(label, tags);
    target.append(section);
  });
}
tabs.forEach(button => button.addEventListener('click', () => {
  selectButton(tabs, button);
  renderSkill(skills[button.dataset.skill]);
}));
renderSkill(skills.web);
document.querySelector('#copy-site')?.addEventListener('click', async () => {
  const output = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText('https://baawiil.github.io/');
    output.textContent = 'Lien copié !';
  } catch { output.textContent = 'Copie manuelle : https://baawiil.github.io/'; }
});


// Halo discret de l’accueil : aucun suivi du pointeur si mouvement réduit.
const heroStage = document.querySelector('.hero-stage');
if (heroStage && !reduceMotion && window.matchMedia('(pointer:fine)').matches) {
  heroStage.addEventListener('pointermove', event => {
    const bounds = heroStage.getBoundingClientRect();
    heroStage.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
    heroStage.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
  }, { passive: true });
}
