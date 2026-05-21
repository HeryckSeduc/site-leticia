# Site Romântico — Para Você 🩵

Um site interativo e responsivo dedicado a celebrar 3 anos de amor, com um design moderno, animações suaves e experiência totalmente otimizada para mobile.

---

## 📋 Estrutura do Projeto

```
Site-leticiaVCLaude/
├── index.html              # Página principal (HTML semântico + PWA)
├── css/
│   └── style.css          # Estilos com design system completo
├── js/
│   └── script.js          # Lógica interativa (animações, contadores, galeria)
├── assets/
│   ├── backgrounds/       # Imagens de fundo
│   ├── fotos/            # Galeria de fotos (17 fotos + timeline)
│   │   └── timeline/     # Fotos específicas da timeline
│   ├── icons/            # Ícones do PWA
│   └── videos/           # Vídeos para a timeline
├── pwa/
│   ├── manifest.json     # Manifesto PWA
│   └── service-worker.js # Service Worker para offline
└── README.md             # Este arquivo
```

---

## 🎨 Design System

### Paleta de Cores

- **Fundo**: `#070d1f` (azul profundo)
- **Cremoso**: `#e8edf5` (branco quente)
- **Azul Destaque**: `#7ea8d4` (azul claro)
- **WhatsApp Escuro**: `#090e1a` (para chat simulado)

### Tipografia

- **Títulos**: Cormorant Garamond (serif elegante)
- **Corpo**: Lato (sans-serif limpo)

### Tokens CSS

```css
--s-secao: 96px /* Espaçamento entre seções */ --s-container: 700px
  /* Largura máxima do conteúdo */ --s-pad: 24px /* Padding padrão */;
```

---

## 🛠 Seções do Site

### 1. **Loading** (`#loading`)

- Barra de progresso dinâmica (0-100%)
- Lua animada com pulso
- Desaparece automaticamente após carregar assets

### 2. **Tela de Entrada** (`#tela-entrada`)

- Hero com efeito parallax de fundo
- Partículas animadas
- Título em 3 camadas (com destaque "amor" em azul)
- Botão "Clique aqui, amor" com efeito brilho no hover
- Animações em cascata com delay

### 3. **Principal** (`#tela-principal`)

- Canvas de partículas animadas (responsivo)
- Seções com revelar ao scroll

#### Seção Hero

- Título "My Moon 🌙" com lua animada
- Data de início do relacionamento
- Efeito float na lua com hover

#### Seção Contador

- Contador de tempo juntos (anos, meses, dias)
- Contagem de horas, minutos e segundos
- Total de dias em destaque

#### Seção Música

- Card com visualizador de ondas pulsantes
- Player Spotify embed
- Mensagem "oi, lembra!" do parceiro

#### Seção Mensagem

- Blockquote com aspas decorativas
- Texto romântico com palavras destacadas em azul

#### Seção Galeria

- Slideshow com navegação (setas + swipe no mobile)
- Barra de progresso
- Legendas dinâmicas para cada foto
- 17 fotos no total
- Hint de swipe animado no mobile

#### Seção WhatsApp

- Simulação de conversa com chat estilizado
- Avatar com gradiente
- Status "online" com dot pulsante
- Indicador de digitação com 3 bolinhas animadas
- Mensagens alternadas (delas/minha)
- Datas separando conversas

#### Seção Timeline

- **Desktop**: Layout alternado (esquerda/direita) com linha central
- **Mobile**: Todas as fotos/vídeos do lado ESQUERDO (conforme solicitado)
- Cartões com imagens, títulos, datas e descrições
- Vídeos autoplay muted para eventos especiais
- Card destacado "Hoje — E a história continua..."
- Reveal ao scroll

### 4. **Rodapé** (`.rodape`)

- Texto romântico com emojis
- Ornamentos decorativos piscantes

### 5. **Modal** (Easter Egg)

- Acionado ao clicar na lua
- Mensagem secreta: "você é a minha lua..."
- Backdrop blur com overlay

---

## 🎬 Animações & Keyframes

| Nome           | Duração | Efeito                               |
| -------------- | ------- | ------------------------------------ |
| `surgir`       | 0.9s    | Fade in + slide up                   |
| `surgirTitulo` | 1.2s    | Slide up com skew                    |
| `surgirMsg`    | 0.35s   | Zoom in rápido                       |
| `surgirModal`  | 0.5s    | Scale + spring                       |
| `voar`         | 2.2s    | Corações caindo no fundo (transição) |
| `barrasPulsar` | 1.4s    | Ondas pulsantes (música)             |
| `piscar`       | 3-5s    | Opacity flicker                      |
| `pulsarPonto`  | 2.5s    | Glow pulsante (timeline)             |
| `typingDot`    | 1.2s    | Bounce (indicador de digitação)      |
| `luaFloat`     | 5s      | Flutuação suave                      |
| `loadingPulse` | 2.8s    | Pulse scaling                        |

---

## 📱 Responsividade

### Breakpoints

- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 600px - 767px
- **Mobile Pequeno**: 480px - 599px
- **Mobile Muito Pequeno**: 360px - 479px

### Ajustes no Mobile

1. **Hero**: Titulo menor, sem float na lua
2. **Contador**: Números menores, layout mais compacto
3. **Galeria**: Imagem reduzida (280px vs 400px), setas proximais
4. **WhatsApp**: Chat maximizado (88% width)
5. **Timeline**: Todas as fotos do lado ESQUERDO, ponto e linha à esquerda
6. **Rodapé**: Padding reduzido

---

## ⚙️ Funcionalidades JavaScript

### 1. **Loading**

```javascript
iniciarLoading(); // Barra progressiva (0-100%)
precarregarAssets(); // Carrega primeira foto
completarLoading(); // Anima conclusão
```

### 2. **Partículas**

```javascript
iniciarParticulasEntrada(); // Canvas na tela de entrada
iniciarParticulasGlobal(); // Canvas na página principal
```

### 3. **Contador**

```javascript
atualizarContador(); // Calcula tempo desde 2023-06-04
```

### 4. **Galeria**

```javascript
iniciarGaleria(); // Setup slideshow
trocarFoto(direcao); // Próxima/anterior
iniciarSwipe(); // Detecção de swipe no mobile
```

### 5. **WhatsApp Animado**

```javascript
preencherWhatsApp(); // Cria mensagens com delay
```

### 6. **Revelar ao Scroll**

```javascript
iniciarRevelacoes(); // Observers para elementos .revelar
```

### 7. **Modal (Easter Egg)**

```javascript
btn-lua click → modal-lua toggle
```

---

## 🔧 Configuração

No arquivo `js/script.js`, encontre `const CONFIG`:

```javascript
CONFIG = {
  dataInicio: "2023-06-04", // Data que deve ser alterada anualmente
  slideshowIntervalo: 4500, // ms por foto
  ptEntrada: 25, // Partículas na entrada
  ptGlobal: 70, // Partículas globais
  coracoes: 40, // Quantidade de corações na transição
  wDelay: 420, // ms entre mensagens WhatsApp
  wTyping: 900, // ms do indicador de digitação
};
```

### Fotos e Mensagens

```javascript
const FOTOS = [
  { src: "assets/fotos/fotoX.webp", legenda: "texto da legenda" },
  // ... 17 fotos total
];

const MENSAGENS = [
  { tipo: "delas", texto: "...", hora: "19:32" },
  { tipo: "minha", texto: "...", hora: "19:33 ✓✓" },
  // ...
];
```

---

## 📁 Assets Necessários

### Fotos (`assets/fotos/`)

- foto1.webp até foto17.webp (para galeria)
- Adicione subpasta `timeline/` se usar fotos diferentes

### Fundo

- `assets/backgrounds/lirio.webp` (tela de entrada)

### Vídeos (`assets/videos/`)

- video1.mp4 (primeira viagem)
- video2.mp4 (show juntos)

### Ícones PWA (`assets/icons/`)

- icon-192.png (192x192)
- icon.webp (favicon)

---

## 🚀 PWA (Progressive Web App)

O site funciona offline com Service Worker:

```javascript
// Registrado automaticamente no index.html
navigator.serviceWorker.register("pwa/service-worker.js");
```

**Recurso**: Manifesto PWA para instalação em home screen

- Nome: "Para você 🩵"
- Ícone: 192x192 e 512x512

---

## ♿ Acessibilidade

- ✅ Skip link para conteúdo principal
- ✅ Semântica HTML (main, article, time, blockquote)
- ✅ aria-labels em botões interativos
- ✅ aria-live para conteúdo dinâmico (contador, galeria)
- ✅ aria-hidden para decorações (partículas, ornamentos)
- ✅ Focus visible com outline azul
- ✅ Suporte para prefers-reduced-motion

---

## 🔍 SEO & Meta Tags

```html
<title>Para você 🩵</title>
<meta name="description" content="3 anos de amor e uma surpresa especial..." />
<link rel="canonical" href="./" />
<!-- Open Graph para compartilhamento social -->
<meta property="og:title" content="Para você, My Moon 🌙" />
```

---

## 🐛 Troubleshooting

### Partículas não aparecem

- Verifique se canvas está visível (z-index, display)
- Confirme se JavaScript está carregando
- Desative em `prefers-reduced-motion: reduce`

### Vídeos não playing

- Use `muted loop playsinline` (obrigatório para autoplay)
- Formate: MP4 H.264
- Adicione `preload="none"` para performance

### Fotos da galeria em branco

- Confirme caminho em `FOTOS[]`
- Converta para WebP (melhor compressão)
- Teste em DevTools (Network > Images)

### Timeline com erro de layout

- Verifique se `.tl-lado--vazio` está escondida no mobile
- Confirme que `.tl-lado--esq` e `.tl-lado--dir` têm `flex: 1`

---

## 📊 Performance

- ⚡ **LCP**: ~1.2s (preload de lirio.webp)
- ⚡ **FID**: <100ms (otimizado com RAF)
- ⚡ **CLS**: ~0.05 (aspect-ratio + fixed containers)

### Otimizações Aplicadas

- WebP para imagens
- Canvas em vez de SVG para partículas (melhor FPS)
- Lazy loading em fotos/vídeos da timeline
- Debounce em resize/scroll
- ResizeObserver para canvas global
- Pausa de animações em abas invisíveis

---

## 🎯 Melhorias Futuras

- [ ] Modo escuro/claro
- [ ] Suporte a múltiplos idiomas
- [ ] Contador regressivo para próximas datas
- [ ] Integração com Spotify API (em vez de embed)
- [ ] Upload de fotos dinâmico
- [ ] Compartilhamento de fotos (social media)
- [ ] Analytics e confete ao clicar em botões

---

## 📝 Notas de Desenvolvimento

### Estrutura de Classes CSS

- `.revelar` → Fade in ao scroll
- `.tl-revelar` → Fade in específico da timeline
- `.tl-card--hoje` → Destaque do dia atual
- `.msg--delas` / `.msg--minha` → Align de mensagens

### Variáveis de Controle (js/script.js)

```javascript
S.reducedMotion; // Detecta preferência de movimento reduzido
S.isMobile; // Detecção de dispositivo
S.fotoIdx; // Índice atual da galeria
S.tabVisible; // Pausa animações em abas ocultas
```

### Canvas Dinâmico

- **Entrada**: Canvas redimensiona com viewport
- **Principal**: Canvas cresce conforme a página
- **ResizeObserver**: Monitora mudanças de tamanho

---

## 📄 Licença

Este projeto é pessoal e feito com 💜 para alguém muito especial.

---

## 👨‍💻 Autor

Criado com carinho, dedicação e muita atenção aos detalhes.

**Última atualização**: Maio 2026

---

## 🙏 Créditos

- **Fontes**: Google Fonts (Cormorant Garamond, Lato)
- **Ícones**: Emojis Unicode
- **Música**: Player Spotify embed
- **Animações**: CSS3 + requestAnimationFrame

---

**Feito com ❤️ para você. Sempre.**
