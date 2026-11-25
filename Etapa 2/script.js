const htmlElement = document.documentElement;

const widgetAcess = document.getElementById('widget-acessibilidade');
const btnAbrirAcess = document.getElementById('btn-abrir-acessibilidade');
const painelAcess = document.getElementById('painel-acessibilidade');

if (btnAbrirAcess && painelAcess) {
  btnAbrirAcess.addEventListener('click', (e) => {
    e.stopPropagation();
    const estaAberto = !painelAcess.hidden;
    painelAcess.hidden = estaAberto;
    btnAbrirAcess.setAttribute('aria-expanded', String(!estaAberto));
  });

  document.addEventListener('click', (e) => {
    if (widgetAcess && !widgetAcess.contains(e.target) && !painelAcess.hidden) {
      painelAcess.hidden = true;
      btnAbrirAcess.setAttribute('aria-expanded', 'false');
    }
  });
}

const btnAumentar = document.getElementById('btn-aumentar-fonte');
const btnDiminuir = document.getElementById('btn-diminuir-fonte');
const btnResetar = document.getElementById('btn-resetar-fonte');

// No celular limita até 115% para não quebrar; no PC vai até 125%
const limiteMax = window.innerWidth <= 640 ? 115 : 125;
let escalaAtual = parseInt(localStorage.getItem('seja-diva-fonte')) || 100;

function aplicarEscala(novaEscala) {
  escalaAtual = Math.min(limiteMax, Math.max(85, novaEscala));
  
  // Aplica escala proporcional no cabeçalho, conteúdo principal e rodapé
  const areas = document.querySelectorAll('header, main, footer, .menu-navegacao');
  areas.forEach((el) => {
    el.style.zoom = `${escalaAtual}%`;
  });

  localStorage.setItem('seja-diva-fonte', escalaAtual);
}

aplicarEscala(escalaAtual);

if (btnAumentar) btnAumentar.addEventListener('click', () => aplicarEscala(escalaAtual + 10));
if (btnDiminuir) btnDiminuir.addEventListener('click', () => aplicarEscala(escalaAtual - 10));
if (btnResetar) btnResetar.addEventListener('click', () => aplicarEscala(100));

const btnTema = document.getElementById('btn-tema');
const iconeTema = document.getElementById('icone-tema');
const textoTema = document.getElementById('texto-tema');

function aplicarTema(tema) {
  if (tema === 'dark') {
    htmlElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('seja-diva-tema', 'dark');
    if (iconeTema) iconeTema.textContent = '☀️';
    if (textoTema) textoTema.textContent = 'Modo Claro';
  } else {
    htmlElement.removeAttribute('data-theme');
    localStorage.setItem('seja-diva-tema', 'light');
    if (iconeTema) iconeTema.textContent = '🌙';
    if (textoTema) textoTema.textContent = 'Modo Escuro';
  }
}

aplicarTema(localStorage.getItem('seja-diva-tema') || 'light');

if (btnTema) {
  btnTema.addEventListener('click', () => {
    const isDark = htmlElement.getAttribute('data-theme') === 'dark';
    aplicarTema(isDark ? 'light' : 'dark');
  });
}

const btnToggleMenu = document.getElementById('btn-toggle-menu');
const menuNav = document.getElementById('menu-navegacao');

if (btnToggleMenu && menuNav) {
  btnToggleMenu.addEventListener('click', () => {
    menuNav.classList.toggle('recolhido');
    btnToggleMenu.textContent = menuNav.classList.contains('recolhido') ? '▼' : '▲';
  });
}


const botoesFiltro = document.querySelectorAll('.btn-filtro');
const cardsPecas = document.querySelectorAll('.card-peca');

botoesFiltro.forEach((botao) => {
  botao.addEventListener('click', () => {
    botoesFiltro.forEach((b) => b.classList.remove('ativo'));
    botao.classList.add('ativo');

    const categoriaSelecionada = botao.getAttribute('data-categoria');

    cardsPecas.forEach((card) => {
      const categoriaCard = card.getAttribute('data-categoria');
      if (categoriaSelecionada === 'todas' || categoriaCard === categoriaSelecionada) {
        card.classList.remove('oculto');
      } else {
        card.classList.add('oculto');
      }
    });
  });
});

const formContato = document.getElementById('form-contato');
const feedbackContato = document.getElementById('feedback-contato');

if (formContato && feedbackContato) {
  formContato.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('contato-nome').value.trim();
    const contato = document.getElementById('contato-whatsapp').value.trim();
    const mensagem = document.getElementById('contato-mensagem').value.trim();

    if (!nome || !contato || !mensagem) {
      feedbackContato.textContent = 'Por favor, preencha seu nome, contato e mensagem antes de enviar.';
      return;
    }

    feedbackContato.textContent = `Obrigada, ${nome}! Recebemos sua mensagem e responderemos com carinho em breve.`;
    formContato.reset();
  });
}