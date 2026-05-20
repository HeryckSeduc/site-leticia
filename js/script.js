/* ============================================================
   SITE ROMÂNTICO — js/script.js
   ============================================================
   01. Config & Estado
   02. Cache do DOM
   03. Utilitários
   04. Loading
   05. Partículas (entrada)
   06. Partículas (principal)
   07. Transição de entrada
   08. Corações
   09. Revelações ao scroll
   10. Vídeos lazy na timeline
   11. Contador
   12. Galeria + slideshow
   13. WhatsApp animado
   14. Easter egg — lua
   15. Init
   ============================================================ */


/* ── 01. CONFIG & ESTADO ────────────────────────────────────── */

const CONFIG = {
    /* Datas */
    dataInicio: '2023-06-04',

    /* Galeria */
    slideshowIntervalo: 4500,   // ms por foto

    /* Partículas */
    ptEntrada:  25,   // desktop entrada; mobile usa metade
    ptGlobal:   70,   // desktop global; mobile usa metade

    /* Corações na transição */
    coracoes: 40,

    /* WhatsApp */
    wDelay:  420,     // ms entre mensagens
    wTyping: 900,     // ms do indicador de digitação
};

/* Fotos — altere os caminhos e legendas conforme suas fotos */
const FOTOS = [
    { src: 'assets/fotos/foto6.webp',  legenda: 'nosso primeiro momento juntos' },
    { src: 'assets/fotos/foto2.webp',  legenda: 'memórias que guardarei pra sempre' },
    { src: 'assets/fotos/foto3.webp',  legenda: 'felicidade é estar ao seu lado' },
    { src: 'assets/fotos/foto4.webp',  legenda: 'cada dia mais especial com você' },
    { src: 'assets/fotos/foto5.webp',  legenda: 'você é meu porto seguro' },
    { src: 'assets/fotos/foto1.webp',  legenda: 'nossa história é meu conto de fadas' },
    { src: 'assets/fotos/foto7.webp',  legenda: 'gratidão por cada momento juntos' },
    { src: 'assets/fotos/foto8.webp',  legenda: 'você é meu amor eterno' },
    { src: 'assets/fotos/foto9.webp',  legenda: 'nossa conexão é algo mágico' },
    { src: 'assets/fotos/foto10.webp', legenda: 'mal posso esperar pelo que ainda vamos viver' },
    { src: 'assets/fotos/foto11.webp', legenda: 'você é meu melhor amigo e amor da minha vida' },
    { src: 'assets/fotos/foto12.webp', legenda: 'cada dia ao seu lado é um presente' },
    { src: 'assets/fotos/foto13.webp', legenda: 'nossa história é minha favorita de todas' },
    { src: 'assets/fotos/foto14.webp', legenda: 'você é a razão do meu sorriso mais sincero' },
    { src: 'assets/fotos/foto15.webp', legenda: 'com você, cada momento é uma aventura' },
    { src: 'assets/fotos/foto16.webp', legenda: 'nossa conexão é algo único' },
    { src: 'assets/fotos/foto17.webp', legenda: 'você é minha inspiração diária' },
];

/* Mensagens do WhatsApp — edite à vontade */
const MENSAGENS = [
    { tipo: 'delas', texto: 'oi amor, tô com saudade de você 🥺',              hora: '19:32' },
    { tipo: 'minha', texto: 'eu também, fica na ligação comigo?',               hora: '19:33 ✓✓' },
    { tipo: 'delas', texto: 'claro! é sempre você que me deixa mais calma 💙',  hora: '19:33' },
    { tipo: 'minha', texto: 'você sabe que tô aqui né? sempre',                 hora: '19:34 ✓✓' },
    { tipo: 'delas', texto: 'sei... isso é o que me faz não ter medo 🫶',       hora: '19:35' },
    { tipo: 'minha', texto: 'a distância nunca foi maior que o que eu sinto por você 💜', hora: '20:11 ✓✓' },
    { tipo: 'delas', texto: 'para de ser perfeito 😭❤️',                        hora: '20:12' },
    { tipo: 'sep',   texto: 'hoje' },
    { tipo: 'minha', texto: 'mesmo de longe, você foi o melhor período da minha vida 🩵', hora: 'agora ✓✓' },
];

const EMOJIS_CORACOES = ['💜', '💙', '🩵', '✨', '💫', '⭐', '💜', '🩵'];

/* Estado — valores que mudam durante a execução */
const S = {
    reducedMotion: false,
    isMobile:      false,
    fotoIdx:       0,
    barraRaf:      null,
    barraStart:    null,
    slideTimer:    null,
    ptRaf:         null,
    ptEntradaRaf:  null,
    tabVisible:    true,
    contadorInterval: null,
};


/* ── 02. CACHE DO DOM ───────────────────────────────────────── */

const $  = id  => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

const EL = {
    /* Loading */
    loading:      $('loading'),
    loadingBarra: $('loading-barra'),

    /* Telas */
    entrada:   $('tela-entrada'),
    transicao: $('tela-transicao'),
    principal: $('tela-principal'),

    /* Botão + canvas entrada */
    btnEntrar:     $('btn-entrar'),
    ptEntradaCanvas: $('particulas-entrada'),

    /* Canvas principal */
    ptCanvas: $('particulas'),

    /* Contador */
    anos:      $('anos'),
    meses:     $('meses'),
    dias:      $('dias'),
    horas:     $('horas'),
    minutos:   $('minutos'),
    segundos:  $('segundos'),
    totalDias: $('total-dias'),

    /* Galeria */
    fotoAtual:   $('foto-atual'),
    legendaAtual: $('legenda-atual'),
    fotoNum:     $('foto-num'),
    fotoTotal:   $('foto-total'),
    galeriaBarra: $('galeria-barra'),
    setaEsq:     $('seta-esq'),
    setaDir:     $('seta-dir'),
    swipeHint:   $('swipe-hint'),

    /* WhatsApp */
    whatsChat: $('whats-chat'),

    /* Easter egg */
    btnLua:      $('btn-lua'),
    modalLua:    $('modal-lua'),
    modalOverlay: $('modal-overlay'),
    modalFechar: $('modal-fechar'),
};


/* ── 03. UTILITÁRIOS ────────────────────────────────────────── */

const pad = n => String(n).padStart(2, '0');

/* Atualiza texto só se mudou — zero repaint desnecessário */
const domSet = (el, v) => {
    const str = String(v);
    if (el && el.textContent !== str) el.textContent = str;
};

/* Debounce simples */
const debounce = (fn, ms) => {
    let t;
    return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
};

/* Promise-based delay (para async/await no WhatsApp) */
const esperar = ms => new Promise(r => setTimeout(r, ms));

/* Detecta preferências do sistema */
function detectarPreferencias() {
    S.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    S.isMobile = window.innerWidth <= 600 || 'ontouchstart' in window;
}


/* ── 04. LOADING ────────────────────────────────────────────── */

function iniciarLoading() {
    animarBarraLoading();
    precarregarAssets();
}

function animarBarraLoading() {
    /* Incrementos orgânicos até 88% */
    let p = 0;
    const passo = () => {
        p = Math.min(p + Math.random() * 16 + 4, 88);
        EL.loadingBarra.style.width = p + '%';
        if (p < 88) setTimeout(passo, 140 + Math.random() * 120);
    };
    passo();
}

function precarregarAssets() {
    /* Pré-carrega primeira foto da galeria */
    const imgFoto = new Image();
    let pronto = false;

    const concluir = () => {
        if (pronto) return;
        pronto = true;
        completarLoading();
    };

    imgFoto.onload  = concluir;
    imgFoto.onerror = concluir;
    imgFoto.src     = FOTOS[0].src;

    /* Garante saída após no mínimo 1100ms */
    setTimeout(concluir, 1100);
}

function completarLoading() {
    /* Vai a 100% suavemente */
    EL.loadingBarra.style.transition = 'width 0.45s cubic-bezier(0.4,0,0.2,1)';
    EL.loadingBarra.style.width = '100%';

    setTimeout(() => {
        EL.loading.classList.add('saindo');
        /* Remove do DOM após a transição CSS (0.9s) */
        setTimeout(() => EL.loading.remove(), 950);
    }, 400);
}


/* ── 05. PARTÍCULAS — ENTRADA ───────────────────────────────── */

function iniciarParticulasEntrada() {
    if (S.reducedMotion) return;

    const canvas = EL.ptEntradaCanvas;
    const ctx    = canvas.getContext('2d');

    const resize = () => {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', debounce(resize, 250));

    const total = S.isMobile ? Math.floor(CONFIG.ptEntrada / 2) : CONFIG.ptEntrada;
    const pts   = criarParticulas(total, canvas.width, canvas.height, {
        maxR: 0.9, speed: 0.14, maxOp: 0.22,
    });

    const animar = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const p of pts) {
            desenharParticula(ctx, p);
            moverParticula(p, canvas.width, canvas.height);
        }
        S.ptEntradaRaf = requestAnimationFrame(animar);
    };
    animar();
}

function pararParticulasEntrada() {
    cancelAnimationFrame(S.ptEntradaRaf);
}


/* ── 06. PARTÍCULAS — PRINCIPAL ─────────────────────────────── */

function iniciarParticulasGlobal() {
    if (S.reducedMotion) return;

    const canvas = EL.ptCanvas;
    const ctx    = canvas.getContext('2d');

    const ajustar = () => {
        canvas.width  = EL.principal.offsetWidth;
        /* scrollHeight pode não estar disponível imediatamente */
        canvas.height = EL.principal.scrollHeight || window.innerHeight * 6;
    };

    ajustar();

    /* Atualiza quando a página muda de altura (conteúdo dinâmico) */
    const ro = new ResizeObserver(debounce(ajustar, 300));
    ro.observe(EL.principal);

    const total = S.isMobile
        ? Math.floor(CONFIG.ptGlobal * 0.45)
        : CONFIG.ptGlobal;

    const pts = criarParticulas(total, canvas.width, canvas.height);

    /* Pausa quando aba invisível — poupa bateria */
    document.addEventListener('visibilitychange', () => {
        S.tabVisible = !document.hidden;
        if (S.tabVisible) animar();
    });

    const animar = () => {
        if (!S.tabVisible) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const p of pts) {
            desenharParticula(ctx, p);
            moverParticula(p, canvas.width, canvas.height);
        }
        S.ptRaf = requestAnimationFrame(animar);
    };
    animar();
}

/* Helpers de partículas — reutilizados em ambos os canvas */
function criarParticulas(total, w, h, opts = {}) {
    return Array.from({ length: total }, () => novaParticula(w, h, opts));
}

function novaParticula(w, h, opts = {}) {
    const maxR  = opts.maxR  ?? 1.2;
    const speed = opts.speed ?? 0.18;
    const maxOp = opts.maxOp ?? 0.30;
    const op    = Math.random() * maxOp + 0.05;
    return {
        x:   Math.random() * w,
        y:   Math.random() * h,
        r:   Math.random() * maxR + 0.15,
        vx:  (Math.random() - 0.5) * speed,
        vy:  -(Math.random() * speed + 0.05),
        cor: `rgba(126,168,212,${op.toFixed(2)})`,
    };
}

function desenharParticula(ctx, p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, 6.2832);
    ctx.fillStyle = p.cor;
    ctx.fill();
}

function moverParticula(p, w, h) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.y < -6)    p.y = h + 6;
    if (p.x < -6)    p.x = w + 6;
    if (p.x > w + 6) p.x = -6;
}


/* ── 07. TRANSIÇÃO DE ENTRADA ───────────────────────────────── */

function iniciarEntrada() {
    EL.btnEntrar.addEventListener('click', executarTransicao, { once: true });

    /* Suporte a teclado */
    EL.btnEntrar.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            executarTransicao();
        }
    }, { once: true });
}

function executarTransicao() {
    pararParticulasEntrada();
    EL.btnEntrar.disabled = true;
    EL.entrada.classList.add('fade-out');

    setTimeout(() => {
        EL.entrada.style.display = 'none';
        EL.transicao.style.display = 'block';
        if (!S.reducedMotion) lancarCoracoes();
    }, 800);

    const duracao = S.reducedMotion ? 300 : 2800;

    setTimeout(() => {
        EL.transicao.style.display = 'none';
        EL.principal.classList.add('visivel');
        document.body.style.overflow = 'auto';

        /* Sobe suavemente para o topo sem animação (evita desorientação) */
        window.scrollTo({ top: 0, behavior: 'instant' });

        /* Inicia todos os módulos */
        iniciarParticulasGlobal();
        iniciarScrollRevelacoes();
        iniciarVideoLazy();
        iniciarContador();
        iniciarGaleria();
        iniciarWhatsApp();
        iniciarEasterEggLua();
    }, duracao);
}


/* ── 08. CORAÇÕES ───────────────────────────────────────────── */

function lancarCoracoes() {
    const total = CONFIG.coracoes;

    for (let i = 0; i < total; i++) {
        setTimeout(() => {
            const el = document.createElement('div');
            el.className = 'coracao';
            el.setAttribute('aria-hidden', 'true');
            el.textContent = EMOJIS_CORACOES[Math.floor(Math.random() * EMOJIS_CORACOES.length)];

            /* Posição e tamanho únicos por coração */
            el.style.cssText = [
                `left: ${(Math.random() * 110 - 5).toFixed(1)}vw`,
                `font-size: ${(0.7 + Math.random() * 2).toFixed(2)}rem`,
                `animation-duration: ${(1.8 + Math.random() * 1.2).toFixed(2)}s`,
            ].join(';');

            EL.transicao.appendChild(el);
            setTimeout(() => el.remove(), 3200);
        }, i * 46);
    }
}


/* ── 09. REVELAÇÕES AO SCROLL ───────────────────────────────── */

function iniciarScrollRevelacoes() {
    /* Elementos gerais */
    const obsGeral = new IntersectionObserver(entries => {
        for (const e of entries) {
            if (!e.isIntersecting) continue;
            e.target.classList.add('visivel');
            obsGeral.unobserve(e.target);
        }
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    $$('.revelar').forEach(el => obsGeral.observe(el));

    /* Itens da timeline — delay escalonado para storytelling */
    const obsTL = new IntersectionObserver(entries => {
        entries.forEach((e, i) => {
            if (!e.isIntersecting) return;
            const delay = S.reducedMotion ? 0 : i * 100;
            setTimeout(() => e.target.classList.add('visivel'), delay);
            obsTL.unobserve(e.target);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

    $$('.tl-revelar').forEach(el => obsTL.observe(el));
}


/* ── 10. VÍDEOS LAZY (TIMELINE) ─────────────────────────────── */

function iniciarVideoLazy() {
    const videos = $$('.tl-video');
    if (!videos.length) return;

    const obs = new IntersectionObserver(entries => {
        for (const e of entries) {
            const v = e.target;
            if (e.isIntersecting) {
                /* Carrega só quando visível */
                if (!v.dataset.loaded) {
                    v.load();
                    v.dataset.loaded = 'true';
                }
                v.play().catch(() => {}); /* silencia políticas de autoplay */
            } else {
                v.pause();
            }
        }
    }, { threshold: 0.25 });

    videos.forEach(v => obs.observe(v));
}


/* ── 11. CONTADOR ───────────────────────────────────────────── */

function iniciarContador() {
    /* Limpa intervalos anteriores para evitar duplicação */
    if (S.contadorInterval) clearInterval(S.contadorInterval);
    
    atualizarContador();
    S.contadorInterval = setInterval(atualizarContador, 1000);
}

function atualizarContador() {
    const inicio = new Date(CONFIG.dataInicio);
    const agora  = new Date();

    let anos  = agora.getFullYear() - inicio.getFullYear();
    let meses = agora.getMonth()    - inicio.getMonth();
    let dias  = agora.getDate()     - inicio.getDate();

    if (dias  < 0) {
        meses--;
        dias += new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
    }
    if (meses < 0) { anos--; meses += 12; }

    const totalDias = Math.floor((agora - inicio) / 86_400_000);

    /* Atualiza só se o valor mudou — evita repaints a cada segundo */
    domSet(EL.anos,      anos);
    domSet(EL.meses,     meses);
    domSet(EL.dias,      dias);
    domSet(EL.horas,     pad(agora.getHours()));
    domSet(EL.minutos,   pad(agora.getMinutes()));
    domSet(EL.segundos,  pad(agora.getSeconds()));
    domSet(EL.totalDias, totalDias.toLocaleString('pt-BR'));
}


/* ── 12. GALERIA + SLIDESHOW ────────────────────────────────── */

function iniciarGaleria() {
    EL.fotoTotal.textContent = FOTOS.length;

    iniciarSlideshowCiclo();
    vincularControlesGaleria();

    /* Pré-carrega segunda foto */
    precarregarFoto(1);
}

/* Exibe foto com fade */
function exibirFoto(idx) {
    const { src, legenda } = FOTOS[idx];

    EL.fotoAtual.classList.add('trocando');
    EL.legendaAtual.style.opacity = '0';

    const delay = S.reducedMotion ? 30 : 480;

    setTimeout(() => {
        EL.fotoAtual.src = src;
        EL.fotoAtual.alt = legenda;
        EL.legendaAtual.textContent = legenda;
        domSet(EL.fotoNum, idx + 1);

        EL.fotoAtual.classList.remove('trocando');
        EL.legendaAtual.style.opacity = '';

        precarregarFoto((idx + 1) % FOTOS.length);
    }, delay);
}

function precarregarFoto(idx) {
    const img = new Image();
    img.src = FOTOS[idx].src;
}

/* Ciclo automático com barra de progresso via rAF */
function iniciarSlideshowCiclo() {
    limparCiclo();
    if (S.reducedMotion) {
        /* Versão sem animação para acessibilidade */
        S.slideTimer = setTimeout(() => {
            S.fotoIdx = (S.fotoIdx + 1) % FOTOS.length;
            exibirFoto(S.fotoIdx);
            setTimeout(iniciarSlideshowCiclo, 550);
        }, CONFIG.slideshowIntervalo);
        return;
    }

    /* Anima a barra com rAF para suavidade */
    S.barraStart = null;
    const duracao = CONFIG.slideshowIntervalo;

    const animarBarra = ts => {
        if (!S.barraStart) S.barraStart = ts;
        const pct = Math.min((ts - S.barraStart) / duracao, 1);

        EL.galeriaBarra.style.width = (pct * 100) + '%';

        if (pct < 1) {
            S.barraRaf = requestAnimationFrame(animarBarra);
        } else {
            S.fotoIdx = (S.fotoIdx + 1) % FOTOS.length;
            exibirFoto(S.fotoIdx);
            setTimeout(iniciarSlideshowCiclo, 560);
        }
    };

    S.barraRaf = requestAnimationFrame(animarBarra);
}

function limparCiclo() {
    clearTimeout(S.slideTimer);
    cancelAnimationFrame(S.barraRaf);
    EL.galeriaBarra.style.width = '0%';
    S.barraStart = null;
}

function avancar(dir) {
    S.fotoIdx = (S.fotoIdx + dir + FOTOS.length) % FOTOS.length;
    exibirFoto(S.fotoIdx);
    iniciarSlideshowCiclo(); /* reinicia o timer */
}

function vincularControlesGaleria() {
    EL.setaDir.addEventListener('click', () => avancar(1));
    EL.setaEsq.addEventListener('click', () => avancar(-1));

    /* Pausa ao hover (desktop) */
    EL.fotoAtual.addEventListener('mouseenter', limparCiclo);
    EL.fotoAtual.addEventListener('mouseleave', iniciarSlideshowCiclo);

    /* Swipe — diferencia horizontal de scroll vertical */
    let startX = 0;
    let startY = 0;

    EL.fotoAtual.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });

    EL.fotoAtual.addEventListener('touchend', e => {
        const dx = startX - e.changedTouches[0].clientX;
        const dy = startY - e.changedTouches[0].clientY;

        /* Só conta swipe se mais horizontal que vertical */
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 44) {
            avancar(dx > 0 ? 1 : -1);
        }
    }, { passive: true });

    /* Navegação por teclado — handler nomeado para permitir remoção */
    const galeriaKeyHandler = e => {
        if (!EL.principal.classList.contains('visivel')) return;
        if (e.key === 'ArrowRight') avancar(1);
        if (e.key === 'ArrowLeft')  avancar(-1);
    };
    
    document.addEventListener('keydown', galeriaKeyHandler);
    
    /* Permite cleanup se necessário */
    return () => document.removeEventListener('keydown', galeriaKeyHandler);
}


/* ── 13. WHATSAPP ANIMADO ───────────────────────────────────── */

function iniciarWhatsApp() {
    const secao = document.querySelector('.secao--whats');
    if (!secao) return;

    /* Aguarda a seção aparecer na viewport */
    const obs = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        animarMensagens();
    }, { threshold: 0.2 });

    obs.observe(secao);
}

async function animarMensagens() {
    const chat = EL.whatsChat;
    if (!chat) return;

    /* Sem animações: mostra tudo de uma vez */
    if (S.reducedMotion) {
        MENSAGENS.forEach(m => chat.appendChild(criarBolha(m)));
        chat.scrollTop = chat.scrollHeight;
        return;
    }

    for (let i = 0; i < MENSAGENS.length; i++) {
        const m = MENSAGENS[i];

        if (m.tipo === 'sep') {
            await esperar(CONFIG.wDelay * 0.4);
            const sep = document.createElement('div');
            sep.className = 'whats-data-sep';
            sep.textContent = m.texto;
            chat.appendChild(sep);
            chat.scrollTop = chat.scrollHeight;
            continue;
        }

        /* Indicador de digitação só para mensagens dela */
        if (m.tipo === 'delas') {
            const typing = criarTyping();
            chat.appendChild(typing);
            chat.scrollTop = chat.scrollHeight;
            await esperar(CONFIG.wTyping);
            typing.remove();
        } else {
            await esperar(CONFIG.wDelay * 0.6);
        }

        chat.appendChild(criarBolha(m));
        chat.scrollTop = chat.scrollHeight;

        if (i < MENSAGENS.length - 1) {
            await esperar(CONFIG.wDelay + Math.random() * 180);
        }
    }
}

function criarBolha(m) {
    const div  = document.createElement('div');
    const p    = document.createElement('p');
    const hora = document.createElement('span');

    div.className  = `msg msg--${m.tipo}`;
    p.textContent  = m.texto;
    hora.className = 'msg-hora';
    hora.textContent = m.hora || '';

    div.appendChild(p);
    div.appendChild(hora);
    return div;
}

function criarTyping() {
    const wrap = document.createElement('div');
    wrap.className = 'typing-indicator';
    wrap.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        dot.className = 'typing-dot';
        wrap.appendChild(dot);
    }
    return wrap;
}


/* ── 14. EASTER EGG — LUA ───────────────────────────────────── */

function iniciarEasterEggLua() {
    if (!EL.btnLua || !EL.modalLua) return;

    EL.btnLua.addEventListener('click', abrirModal);

    EL.modalFechar.addEventListener('click', fecharModal);
    EL.modalOverlay.addEventListener('click', fecharModal);

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !EL.modalLua.hasAttribute('hidden')) {
            fecharModal();
        }
    });

    /* Armadilha de foco dentro do modal */
    EL.modalLua.addEventListener('keydown', e => {
        if (e.key !== 'Tab') return;
        const focaveis = EL.modalLua.querySelectorAll(
            'button, [href], input, [tabindex]:not([tabindex="-1"])'
        );
        const primeiro = focaveis[0];
        const ultimo   = focaveis[focaveis.length - 1];

        if (e.shiftKey && document.activeElement === primeiro) {
            e.preventDefault(); ultimo.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
            e.preventDefault(); primeiro.focus();
        }
    });
}

function abrirModal() {
    EL.modalLua.removeAttribute('hidden');
    /* Foca o botão de fechar para acessibilidade */
    setTimeout(() => EL.modalFechar.focus(), 100);
}

function fecharModal() {
    EL.modalLua.setAttribute('hidden', '');
    EL.btnLua.focus();
}


/* ── 15. INIT ───────────────────────────────────────────────── */

(function init() {
    detectarPreferencias();

    /* Loading + partículas da entrada — começam imediatamente */
    iniciarLoading();
    iniciarParticulasEntrada();

    /* Botão de entrada */
    iniciarEntrada();

    /* Atualiza detecções se o usuário redimensionar */
    window.addEventListener('resize', debounce(detectarPreferencias, 350));
})();