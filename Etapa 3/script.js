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

const trilhoVideos = document.getElementById('carrossel-trilho');
const slidesVideos = document.querySelectorAll('.slide-video');
const indicadoresVideos = document.querySelectorAll('.indicador');
const btnVideoPrev = document.getElementById('btn-video-prev');
const btnVideoNext = document.getElementById('btn-video-next');

if (trilhoVideos && slidesVideos.length > 0) {
  let indiceAtual = 0;

  function atualizarCarrossel(novoIndice) {
    slidesVideos.forEach((slide) => {
      const video = slide.querySelector('video');
      if (video && !video.paused) {
        video.pause();
      }
    });

    if (novoIndice < 0) {
      indiceAtual = slidesVideos.length - 1;
    } else if (novoIndice >= slidesVideos.length) {
      indiceAtual = 0;
    } else {
      indiceAtual = novoIndice;
    }

    trilhoVideos.style.transform = `translateX(-${indiceAtual * 100}%)`;

    slidesVideos.forEach((slide, i) => {
      const ativo = i === indiceAtual;
      slide.classList.toggle('ativo', ativo);
      slide.setAttribute('aria-hidden', String(!ativo));
    });

    indicadoresVideos.forEach((dot, i) => {
      const ativo = i === indiceAtual;
      dot.classList.toggle('ativo', ativo);
      dot.setAttribute('aria-selected', String(ativo));
    });
  }

  btnVideoPrev?.addEventListener('click', () => atualizarCarrossel(indiceAtual - 1));
  btnVideoNext?.addEventListener('click', () => atualizarCarrossel(indiceAtual + 1));

  indicadoresVideos.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = Number(dot.getAttribute('data-index'));
      atualizarCarrossel(idx);
    });
  });

  let toqueInicioX = 0;

  trilhoVideos.addEventListener('touchstart', (e) => {
    toqueInicioX = e.changedTouches[0].screenX;
  }, { passive: true });

  trilhoVideos.addEventListener('touchend', (e) => {
    const toqueFimX = e.changedTouches[0].screenX;
    const diferenca = toqueInicioX - toqueFimX;

    if (Math.abs(diferenca) > 50) {
      if (diferenca > 0) {
        atualizarCarrossel(indiceAtual + 1);
      } else {
        atualizarCarrossel(indiceAtual - 1);
      }
    }
  }, { passive: true });
}