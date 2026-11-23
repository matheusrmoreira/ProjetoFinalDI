const btnTema = document.getElementById('btn-tema');
const btnToggleMenu = document.getElementById('btn-toggle-menu');
const menuNav = document.getElementById('menu-navegacao');

if (localStorage.getItem('seja-diva-tema') === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  btnTema.textContent = '☀️';
}

btnTema.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('seja-diva-tema', 'light');
    btnTema.textContent = '🌙';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('seja-diva-tema', 'dark');
    btnTema.textContent = '☀️';
  }
});

btnToggleMenu.addEventListener('click', () => {
  menuNav.classList.toggle('recolhido');
  btnToggleMenu.textContent = menuNav.classList.contains('recolhido') ? '▼' : '▲';
});