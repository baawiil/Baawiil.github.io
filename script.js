const themeButton = document.querySelector('#theme');
const storedTheme = localStorage.getItem('portfolio-theme');
const systemLight = window.matchMedia('(prefers-color-scheme: light)').matches;
function setTheme(light) {
  document.body.classList.toggle('light', light);
  themeButton.textContent = light ? '🌙' : '☀️';
  themeButton.setAttribute('aria-label', light ? 'Activer le thème sombre' : 'Activer le thème clair');
}
setTheme(storedTheme ? storedTheme === 'light' : systemLight);
themeButton.addEventListener('click', () => {
  const light = !document.body.classList.contains('light');
  setTheme(light);
  localStorage.setItem('portfolio-theme', light ? 'light' : 'dark');
});
document.querySelector('#year').textContent = new Date().getFullYear();
