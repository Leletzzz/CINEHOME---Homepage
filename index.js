// ------------------------------------------------------------------
// Interatividade e controle do carrossel principal
// Arquivo principal do app CineHome
// - Orquestra HeroSlider (capa) e MovieCarousel (seções)
// - Carrega dados do TMDB ou usa fallback local (window.APP_DATA)
// - Liga modal para configurar a API key do TMDB
// - Realiza delegação de eventos para navegação e seleção
// ------------------------------------------------------------------
// ==========================
// Integração opcional com TMDB
// ==========================
// Bases de URL para imagens do TMDB.
// `posterBase` é usado para pôsteres (cards) e `backdropBase` para imagens grandes (hero).
const TMDB_IMG = {
  posterBase: 'https://image.tmdb.org/t/p/w500',
  backdropBase: 'https://image.tmdb.org/t/p/original'
};

// ==========================
// Constantes de UI (evitam números mágicos espalhados)
// ==========================
const UI_CONST = {
  CARD_MARGIN_EXTRA: 15,
  CAROUSEL_PADDING_COMPENSATION: 120,
  SCROLL_PAGE_SIZE_CARDS: 2,
  TOUCH_SWIPE_THRESHOLD_PX: 50,
  AUTOPLAY_INTERVAL_MS: 5000,
  HIDE_OFFSCREEN_LEFT_PX: -10000,
  CARD_SELECT_SCALE: 0.95,
  ANNOUNCE_TIMEOUT_MS: 1000,
  RESIZE_DEBOUNCE_MS: 250,
  SELECT_ANIMATION_MS: 150,
};

/**
 * Lê o valor de um parâmetro da URL atual.
 * Ex.: getQueryParam('tmdb_api_key') -> 'chave'
 * @param {string} name Nome do parâmetro
 * @returns {string|null} Valor do parâmetro ou null
 */
function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

/**
 * Obtém a API key do TMDB com prioridade para o query string.
 * - Se existir `?tmdb_api_key=...`, salva em localStorage e usa.
 * - Caso contrário, tenta ler de localStorage.
 * @returns {string} API key ou string vazia
 */
function getTmdbApiKey() {
  const qp = getQueryParam('tmdb_api_key');
  if (qp) {
    try { localStorage.setItem('tmdb_api_key', qp); } catch (_) {}
    return qp;
  }
  try { return localStorage.getItem('tmdb_api_key') || ''; } catch (_) { return ''; }
}

/**
 * Chama a API do TMDB (v3) com idioma `pt-BR` e parâmetros adicionais.
 * Lança erro se a resposta não for OK, retornando o JSON do endpoint.
 * @param {string} path Caminho do endpoint TMDB (ex.: 'movie/popular')
 * @param {Record<string, string|number|boolean>} params Parâmetros adicionais
 * @returns {Promise<any>} Resposta JSON do TMDB
 */
async function fetchTMDB(path, params = {}) {
  const apiKey = getTmdbApiKey();
  if (!apiKey) throw new Error('TMDB API key ausente');
  const url = new URL(`https://api.themoviedb.org/3/${path}`);
  url.searchParams.set('api_key', apiKey);
  url.searchParams.set('language', 'pt-BR');
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDB request falhou: ${res.status}`);
  return res.json();
}

/**
 * Normaliza um item retornado pelo TMDB para o formato usado pelo app.
 * Extrai título, ano, nota, pôster, backdrop e overview.
 * @param {any} item Objeto de mídia do TMDB
 * @returns {{id:number, title:string, year:string, rating:string, poster:string, backdrop:string, overview:string}} Objeto de mídia normalizado
 */
function mapMedia(item) {
  const title = item.title || item.name || 'Título';
  const date = item.release_date || item.first_air_date || '';
  const year = date ? new Date(date).getFullYear() : '';
  const rating = typeof item.vote_average === 'number' ? item.vote_average.toFixed(1) : '';
  return {
    id: item.id || 0,
    title,
    year: String(year || ''),
    rating,
    poster: item.poster_path ? `${TMDB_IMG.posterBase}${item.poster_path}` : '',
    backdrop: item.backdrop_path ? `${TMDB_IMG.backdropBase}${item.backdrop_path}` : '',
    overview: item.overview || '',
    mediaType: item.media_type || (item.title ? 'movie' : 'tv') // Détecter le type
  };
}

/**
 * Insere crédito ao TMDB uma única vez no container principal.
 * @returns {void}
 */
function ensureTmdbAttribution() {
  const container = document.querySelector('.container');
  if (!container) return;
  if (!container.querySelector('.tmdb-attribution')) {
    const attribution = document.createElement('div');
    attribution.className = 'tmdb-attribution';
    attribution.innerHTML = 'Imagens e dados por <a href="https://www.themoviedb.org/" target="_blank" rel="noopener">TMDB</a>';
    container.appendChild(attribution);
  }
}

/**
 * Cria o elemento de card de filme/série para o carrossel.
 * Inclui imagem, título, ano e nota, com atributos de acessibilidade.
 * @param {{id?:number, title:string, year:string, rating:string, poster:string, backdrop:string}} item Mídia normalizada
 * @param {string} carouselId ID do carrossel no qual o card será inserido
 * @returns {HTMLButtonElement} Elemento de botão representando o card
 */
function buildCard(item, carouselId) {
  const btn = document.createElement('button');
  btn.className = 'movie-card';
  btn.type = 'button';
  btn.setAttribute('aria-label', `Título: ${item.title}`);
  btn.setAttribute('data-carousel-id', carouselId);
  // Armazenar o ID TMDB et le type de média si disponibles
  if (item.id) {
    btn.setAttribute('data-tmdb-id', item.id);
  }
  if (item.mediaType) {
    btn.setAttribute('data-media-type', item.mediaType);
  }
  const imgSrc = item.poster || item.backdrop || '';
  btn.innerHTML = `
    <img class="movie-image" src="${imgSrc}" alt="${item.title}" loading="lazy" data-poster="${item.poster || ''}" data-backdrop="${item.backdrop || ''}">
    <div class="movie-info">
      <div class="movie-title">${item.title}</div>
      <div class="movie-year">${item.year}</div>
      <div class="movie-rating"><span class="stars">★★★★☆</span><span>${item.rating}</span></div>
    </div>`;
  return btn;
}

/**
 * Popula a interface com dados reais do TMDB (hero e carrosséis).
 * Retorna `true` em caso de sucesso; `false` se falhar (para permitir fallback local).
 * @returns {Promise<boolean>} Se houve carregamento via TMDB
 */
async function populateFromTMDB() {
  const apiKey = getTmdbApiKey();
  if (!apiKey) return false;

  try {
    // Buscar dados em paralelo
    const [trendingMovies, popularMovies, trendingTV, topRatedMovies, upcomingMovies] = await Promise.all([
      fetchTMDB('trending/movie/week'),
      fetchTMDB('movie/popular'),
      fetchTMDB('trending/tv/week'),
      fetchTMDB('movie/top_rated'),
      fetchTMDB('movie/upcoming')
    ]);

    // Hero com trending movies
    const heroSliderEl = document.getElementById('hero-slider');
    if (heroSliderEl) {
      const heroItems = (trendingMovies.results || []).slice(0, 5).map(mapMedia);
      heroSliderEl.innerHTML = '';
      heroItems.forEach((h, idx) => {
        const slide = document.createElement('div');
        slide.className = 'hero-slide' + (idx === 0 ? ' is-active' : '');
        slide.setAttribute('data-index', String(idx));
        // Armazenar o ID TMDB e o tipo de média no slide
        if (h.id) {
          slide.setAttribute('data-tmdb-id', h.id);
        }
        if (h.mediaType) {
          slide.setAttribute('data-media-type', h.mediaType);
        }
        const imgSrc = h.backdrop || h.poster;
        slide.innerHTML = `
          <img class="hero-image" src="${imgSrc}" alt="Destaque: ${h.title}" loading="lazy" />
          <div class="hero-gradient"></div>
          <div class="hero-content">
            <h2 class="hero-title">${h.title}</h2>
            <p class="hero-description">${h.overview}</p>
            <div class="hero-actions">
              <button class="btn btn-primary" aria-label="Assistir ${h.title} agora">Assistir agora</button>
              <button class="btn btn-secondary" aria-label="Ver detalhes de ${h.title}">Detalhes</button>
            </div>
          </div>`;
        heroSliderEl.appendChild(slide);
      });
    }

    // Preencher seções existentes
    const popularCarousel = document.getElementById('carousel-popular');
    if (popularCarousel) {
      popularCarousel.innerHTML = '';
      (popularMovies.results || []).slice(0, 20).map(mapMedia).forEach(item => {
        popularCarousel.appendChild(buildCard(item, 'carousel-popular'));
      });
    }
    const seriesCarousel = document.getElementById('carousel-series');
    if (seriesCarousel) {
      seriesCarousel.innerHTML = '';
      (trendingTV.results || []).slice(0, 20).map(mapMedia).forEach(item => {
        seriesCarousel.appendChild(buildCard(item, 'carousel-series'));
      });
    }

    // Seções adicionais: top rated e upcoming
    const container = document.querySelector('.container');
    if (container) {
      const appendSection = (id, title, list) => {
        // Renderiza uma nova seção com carrossel, botões de navegação e barra de progresso
        const sectionEl = document.createElement('div');
        sectionEl.className = 'section';
        sectionEl.innerHTML = `
          <h2 class="section-title">${title}</h2>
          <div class="carousel-wrapper" data-carousel="${id}">
            <div class="carousel" id="carousel-${id}"></div>
            <button class="nav-button left" data-action="nav-left" data-target="carousel-${id}" aria-label="Navegar para itens anteriores" aria-controls="carousel-${id}" tabindex="0">&#10094;</button>
            <button class="nav-button right" data-action="nav-right" data-target="carousel-${id}" aria-label="Navegar para próximos itens" aria-controls="carousel-${id}" tabindex="0">&#10095;</button>
            <div class="progress-bar"><div class="progress-fill" id="progress-${id}"></div></div>
          </div>`;
        const carEl = sectionEl.querySelector('.carousel');
        list.forEach(item => carEl.appendChild(buildCard(item, `carousel-${id}`)));
        container.appendChild(sectionEl);
      };
      appendSection('toprated', 'Mais Bem Avaliados', (topRatedMovies.results || []).slice(0, 20).map(mapMedia));
      appendSection('upcoming', 'Em Breve', (upcomingMovies.results || []).slice(0, 20).map(mapMedia));
    }

    ensureTmdbAttribution();
    return true;
  } catch (err) {
    console.warn('Falha ao popular via TMDB, usando fallback local se disponível.', err);
    return false;
  }
}

// ==========================
// Componente: Carrossel de Filmes
// Responsável por navegação, progresso, acessibilidade, touch e autoplay.
// ==========================
/**
 * @class MovieCarousel
 * Gerencia múltiplos carrosséis de mídia: navegação, progresso, teclado,
 * gestos de toque, autoplay e recalculagem responsiva.
 */
class MovieCarousel {
  constructor() {
    this.carousels = new Map();
    this.currentPositions = new Map();
    this.autoplayTimers = new Map();
    this.init();
  }
  init() {
    console.log('Inicializando carrosséis...');
    document.querySelectorAll('[data-carousel]').forEach(wrapper => {
      console.log('Wrapper encontrado:', wrapper);
      const carouselId = wrapper.querySelector('.carousel').id;
      console.log('Carousel ID:', carouselId);
      const carousel = document.getElementById(carouselId);
      const cards = carousel.querySelectorAll('.movie-card');
      console.log('Cards encontrados:', cards.length);
      this.carousels.set(carouselId, {
        element: carousel,
        wrapper,
        cards,
        // Largura efetiva de um card (inclui margem e espaçamento extra)
        cardWidth: this.getCardWidth(cards[0]),
        maxScroll: this.calculateMaxScroll(carousel, cards),
        currentIndex: 0
      });
      this.currentPositions.set(carouselId, 0);
      this.updateProgress(carouselId);
      this.updateButtonStates(carouselId);
      this.addKeyboardNavigation(carouselId);
      this.addTouchSupport(carouselId);
      this.attachAutoplayHandlers(carouselId);
    });
    console.log('Carrosséis inicializados:', this.carousels.size);
  }
  /**
   * Calcula largura efetiva de um card somando largura + margem + espaçamento.
   * @param {HTMLElement} card Elemento do card
   * @returns {number} Largura efetiva em pixels
   */
  getCardWidth(card) {
    if (!card) return 280;
    const style = getComputedStyle(card);
    const width = parseInt(style.width);
    const marginRight = parseInt(style.marginRight) || 0;
    return width + marginRight + UI_CONST.CARD_MARGIN_EXTRA;
  }
  /**
   * Determina o deslocamento máximo possível considerando o total de cards e largura do container.
   * @param {HTMLElement} carousel Elemento do carrossel
   * @param {NodeListOf<HTMLElement>|HTMLElement[]} cards Lista de cards
   * @returns {number} Máximo deslocamento em pixels
   */
  calculateMaxScroll(carousel, cards) {
    const containerWidth = carousel.parentElement.offsetWidth;
    const totalWidth = cards.length * this.getCardWidth(cards[0]);
    // Compensa padding/margens do wrapper para evitar corte visual
    return Math.max(0, totalWidth - containerWidth + UI_CONST.CAROUSEL_PADDING_COMPENSATION);
  }
  /**
   * Move o carrossel para esquerda/direita em "páginas" de 2 cards; atualiza UI.
   * @param {string} carouselId ID do carrossel
   * @param {number} direction 1 para direita, -1 para esquerda
   * @returns {void}
   */
  navigate(carouselId, direction) {
    const carouselData = this.carousels.get(carouselId);
    if (!carouselData) return;
    const { element, cardWidth } = carouselData;
    const currentPos = this.currentPositions.get(carouselId);
    const scrollAmount = cardWidth * UI_CONST.SCROLL_PAGE_SIZE_CARDS;
    let newPosition;
    if (direction > 0) newPosition = Math.min(currentPos + scrollAmount, carouselData.maxScroll);
    else newPosition = Math.max(currentPos - scrollAmount, 0);
    element.style.transform = `translateX(-${newPosition}px)`;
    this.currentPositions.set(carouselId, newPosition);
    this.updateProgress(carouselId);
    this.updateButtonStates(carouselId);
    const newIndex = Math.round(newPosition / cardWidth);
    carouselData.currentIndex = newIndex;
    this.announceNavigation(direction);
  }
  /**
   * Atualiza a barra de progresso do carrossel com base no deslocamento.
    * @param {string} carouselId ID do carrossel
    * @returns {void}
   */
  updateProgress(carouselId) {
    const carouselData = this.carousels.get(carouselId);
    const currentPos = this.currentPositions.get(carouselId);
    const progressBar = document.getElementById(`progress-${carouselId.split('-')[1]}`);
    // ID do progresso usa sufixo após 'carousel-': ex. 'carousel-popular' -> 'progress-popular'
    if (progressBar && carouselData.maxScroll > 0) {
      const progress = (currentPos / carouselData.maxScroll) * 100;
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
  }
  /**
   * Habilita/desabilita botões de navegação conforme início/fim do carrossel.
    * @param {string} carouselId ID do carrossel
    * @returns {void}
   */
  updateButtonStates(carouselId) {
    const wrapper = this.carousels.get(carouselId).wrapper;
    const leftBtn = wrapper.querySelector('.nav-button.left');
    const rightBtn = wrapper.querySelector('.nav-button.right');
    const currentPos = this.currentPositions.get(carouselId);
    const maxScroll = this.carousels.get(carouselId).maxScroll;
    leftBtn.disabled = currentPos <= 0;
    rightBtn.disabled = currentPos >= maxScroll;
  }
  /**
   * Navegação via teclado em cada card (setas e Enter/Espaço).
    * @param {string} carouselId ID do carrossel
    * @returns {void}
   */
  addKeyboardNavigation(carouselId) {
    const carouselData = this.carousels.get(carouselId);
    carouselData.cards.forEach(card => {
      card.addEventListener('keydown', e => {
        switch (e.key) {
          case 'ArrowLeft': e.preventDefault(); this.navigate(carouselId, -1); break;
          case 'ArrowRight': e.preventDefault(); this.navigate(carouselId, 1); break;
          case 'Enter':
          case ' ': e.preventDefault(); this.selectMovie(card); break;
        }
      });
    });
  }
  /**
   * Suporte a gesto de arrastar no touch para navegar entre itens.
    * @param {string} carouselId ID do carrossel
    * @returns {void}
   */
  addTouchSupport(carouselId) {
    const carousel = this.carousels.get(carouselId).element;
    let startX = 0, startY = 0, isDragging = false;
    carousel.addEventListener('touchstart', e => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; isDragging = true; }, { passive: true });
    carousel.addEventListener('touchmove', e => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX; const currentY = e.touches[0].clientY;
      const diffX = startX - currentX; const diffY = startY - currentY;
      if (Math.abs(diffX) > Math.abs(diffY)) e.preventDefault();
    }, { passive: false });
    carousel.addEventListener('touchend', e => {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX; const diffX = startX - endX; const threshold = UI_CONST.TOUCH_SWIPE_THRESHOLD_PX;
      if (Math.abs(diffX) > threshold) this.navigate(carouselId, diffX > 0 ? 1 : -1);
      isDragging = false;
    }, { passive: true });
  }
  /**
   * Efeito de seleção do card e redireciona para a página de detalhes.
    * @param {HTMLElement} card Card selecionado
    * @returns {void}
   */
  selectMovie(card) {
    const title = card.querySelector('.movie-title')?.textContent || 'Filme selecionado';
    const tmdbId = card.getAttribute('data-tmdb-id');
    const mediaType = card.getAttribute('data-media-type') || 'movie';
    
    console.log('🎬 Carte sélectionnée:', { title, tmdbId, mediaType });
    
    // Animação visual breve antes da redireção
    card.style.transform = `scale(${UI_CONST.CARD_SELECT_SCALE})`;
    
    setTimeout(() => {
      // Redirecionar para a página de detalhes avec le type de média
      if (tmdbId) {
        window.location.href = `movie-details.html?id=${tmdbId}&type=${mediaType}&title=${encodeURIComponent(title)}`;
      } else if (title) {
        window.location.href = `movie-details.html?title=${encodeURIComponent(title)}`;
      }
    }, UI_CONST.SELECT_ANIMATION_MS);
  }
  /**
   * Anuncia a direção de navegação para leitores de tela.
    * @param {number} direction 1 para direita, -1 para esquerda
    * @returns {void}
   */
  announceNavigation(direction) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.style.position = 'absolute'; announcement.style.left = `${UI_CONST.HIDE_OFFSCREEN_LEFT_PX}px`;
    const directionText = direction > 0 ? 'próximos' : 'anteriores';
    announcement.textContent = `Navegando para ${directionText} itens`;
    document.body.appendChild(announcement);
    setTimeout(() => { document.body.removeChild(announcement); }, UI_CONST.ANNOUNCE_TIMEOUT_MS);
  }
  /**
   * Inicia autoplay para todos os carrosséis.
    * @param {number} [intervalMs] Intervalo em ms
    * @returns {void}
   */
  startAutoPlay(intervalMs = UI_CONST.AUTOPLAY_INTERVAL_MS) {
    this.carousels.forEach((_, carouselId) => this.startAutoplayFor(carouselId, intervalMs));
  }
  /**
   * Controla o autoplay de um carrossel específico. Pausa em hover/focus/aba oculta.
    * @param {string} carouselId ID do carrossel
    * @param {number} [intervalMs] Intervalo em ms
    * @returns {void}
   */
  startAutoplayFor(carouselId, intervalMs = UI_CONST.AUTOPLAY_INTERVAL_MS) {
    this.stopAutoplayFor(carouselId);
    const tick = () => {
      const data = this.carousels.get(carouselId);
      if (!data) return;
      const currentPos = this.currentPositions.get(carouselId) || 0;
      const maxScroll = data.maxScroll;
      const wrapper = data.wrapper;
      const isHovered = wrapper.matches(':hover');
      const hasFocus = wrapper.contains(document.activeElement);
      if (isHovered || hasFocus || document.hidden) {
        this.autoplayTimers.set(carouselId, setTimeout(tick, intervalMs));
        return;
      }
      if (currentPos >= maxScroll) {
        data.element.style.transform = 'translateX(0)';
        this.currentPositions.set(carouselId, 0);
        this.updateProgress(carouselId);
        this.updateButtonStates(carouselId);
      } else {
        this.navigate(carouselId, 1);
      }
      this.autoplayTimers.set(carouselId, setTimeout(tick, intervalMs));
    };
    this.autoplayTimers.set(carouselId, setTimeout(tick, intervalMs));
  }
  /**
   * Interrompe o autoplay de um carrossel.
    * @param {string} carouselId ID do carrossel
    * @returns {void}
   */
  stopAutoplayFor(carouselId) {
    const t = this.autoplayTimers.get(carouselId);
    if (t) clearTimeout(t);
    this.autoplayTimers.delete(carouselId);
  }
  /**
   * Liga handlers de pausa/retomada (hover, focus, visibilidade) e inicia autoplay.
    * @param {string} carouselId ID do carrossel
    * @returns {void}
   */
  attachAutoplayHandlers(carouselId) {
    const data = this.carousels.get(carouselId);
    if (!data) return;
    const wrapper = data.wrapper;
    const restart = () => this.startAutoplayFor(carouselId, UI_CONST.AUTOPLAY_INTERVAL_MS);
    const pause = () => this.stopAutoplayFor(carouselId);
    wrapper.addEventListener('mouseenter', pause);
    wrapper.addEventListener('mouseleave', restart);
    wrapper.addEventListener('focusin', pause);
    wrapper.addEventListener('focusout', restart);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.stopAutoplayFor(carouselId); else this.startAutoplayFor(carouselId, UI_CONST.AUTOPLAY_INTERVAL_MS);
    });
    this.startAutoplayFor(carouselId, UI_CONST.AUTOPLAY_INTERVAL_MS);
  }
  /**
   * Recalcula dimensões e limites após resize.
    * @returns {void}
   */
  recalculate() {
    this.carousels.forEach((data, carouselId) => {
      data.cardWidth = this.getCardWidth(data.cards[0]);
      data.maxScroll = this.calculateMaxScroll(data.element, data.cards);
      this.updateButtonStates(carouselId);
      this.updateProgress(carouselId);
    });
  }
}

// ==========================
// Componente: Hero Slider
// Slider do topo com dots, barra de progresso, teclado e touch.
// ==========================
/**
 * @class HeroSlider
 * Gerencia o slider de destaque (hero), incluindo dots, barra de progresso,
 * teclado, suporte a toque e avanço automático.
 */
class HeroSlider {
  /**
   * @param {string} selector Seletor para o container do slider
   * @param {{ interval?: number }} [options] Opções do slider
   */
  constructor(selector, { interval = UI_CONST.AUTOPLAY_INTERVAL_MS } = {}) {
    this.container = document.querySelector(selector);
    if (!this.container) {
      console.error('HeroSlider: Container não encontrado:', selector);
      return;
    }
    this.slides = Array.from(this.container.querySelectorAll('.hero-slide'));
    this.dotsContainer = document.getElementById('hero-dots');
    this.progressFill = document.getElementById('hero-progress-fill');
    
    if (this.slides.length === 0) {
      console.error('HeroSlider: Nenhum slide encontrado');
      return;
    }
    
    this.current = 0;
    this.interval = interval;
    this.timer = null;
    this.isPaused = false;
    this.init();
  }
  /**
   * Configura dots, estado inicial, timers, eventos de hover/visibilidade/teclado e touch.
   * @returns {void}
   */
  init() {
    this.buildDots();
    this.update();
    this.start();
    const hero = this.container.closest('.hero');
    hero.addEventListener('mouseenter', () => this.stop());
    hero.addEventListener('mouseleave', () => this.start());
    document.addEventListener('visibilitychange', () => document.hidden ? this.stop() : this.start());
    hero.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); this.prev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); this.next(); }
    });
    // Touch support
    let startX = 0; let startY = 0; let dragging = false;
    hero.addEventListener('touchstart', e => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; dragging = true; }, { passive: true });
    hero.addEventListener('touchmove', e => {
      if (!dragging) return;
      const dx = startX - e.touches[0].clientX;
      const dy = startY - e.touches[0].clientY;
      if (Math.abs(dx) > Math.abs(dy)) {
        e.preventDefault();
      }
    }, { passive: false });
    hero.addEventListener('touchend', e => {
      if (!dragging) return;
      const dx = startX - e.changedTouches[0].clientX;
      if (Math.abs(dx) > UI_CONST.TOUCH_SWIPE_THRESHOLD_PX) {
        if (dx > 0) this.next(); else this.prev();
      }
      dragging = false;
    }, { passive: true });
  }
  /**
   * Constrói os dots clicáveis correspondentes aos slides do hero.
   * @returns {void}
   */
  buildDots() {
    this.dotsContainer.innerHTML = '';
    this.slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'hero-dot'; dot.setAttribute('aria-label', `Ir para slide ${i+1}`);
      dot.addEventListener('click', () => { this.goTo(i); });
      this.dotsContainer.appendChild(dot);
    });
  }
  /**
   * Atualiza slide ativo e estado visual dos dots; reinicia a barra de progresso.
   * @returns {void}
   */
  update() {
    this.slides.forEach((s, i) => s.classList.toggle('is-active', i === this.current));
    Array.from(this.dotsContainer.children).forEach((d, i) => d.classList.toggle('is-active', i === this.current));
    this.resetProgress();
  }
  /**
   * Reinicia a animação da barra de progresso usando transições CSS.
   * O duplo requestAnimationFrame garante aplicação de estilos imediatamente.
   * @returns {void}
   */
  resetProgress() {
    if (!this.progressFill) return;
    this.progressFill.style.transition = 'none';
    this.progressFill.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.progressFill.style.transition = `width ${this.interval}ms linear`;
        this.progressFill.style.width = '100%';
      });
    });
  }
  /**
   * Inicia o timer de avanço automático e reseta a barra de progresso.
   * @returns {void}
   */
  start() {
    this.stop();
    this.timer = setInterval(() => this.next(), this.interval);
    this.resetProgress();
  }
  /**
   * Para o avanço automático e congela transições da barra.
   * @returns {void}
   */
  stop() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = null;
    if (this.progressFill) {
      this.progressFill.style.transition = 'none';
    }
  }
  /**
   * Vai para o índice informado, ciclando entre os slides disponíveis.
   * @param {number} i Índice alvo
   * @returns {void}
   */
  goTo(i) { this.current = (i + this.slides.length) % this.slides.length; this.update(); }
  /** Avança para o próximo slide. */
  next() { this.goTo(this.current + 1); }
  /** Volta para o slide anterior. */
  prev() { this.goTo(this.current - 1); }
}

/**
 * Handlers utilitários (não usados atualmente pois a delegação está no DOMContentLoaded)
 */
function handleCardKeyDown(e, carouselId) {
  /** @type {KeyboardEvent} */
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.movieCarousel.selectMovie(e.currentTarget); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); window.movieCarousel.navigate(carouselId, -1); }
  if (e.key === 'ArrowRight') { e.preventDefault(); window.movieCarousel.navigate(carouselId, 1); }
}
function handleCardClick(e, el) {
  /** @type {MouseEvent} */
  if (e) {
    e.preventDefault();
  }
  window.movieCarousel.selectMovie(el);
}

// ==========================
// Bootstrap da página: carrega dados (TMDB ou fallback),
// instancia componentes, liga eventos e configura modal de API.
// ==========================
window.addEventListener('DOMContentLoaded', async () => {
  console.log('Iniciando carregamento...');
  const usingTMDB = await populateFromTMDB();
  // Fallback: dataset local, se não estiver usando TMDB
  if (!usingTMDB && window.APP_DATA && Array.isArray(window.APP_DATA.sections)) {
    const container = document.querySelector('.container');
    // Inserir atribuição ao TMDB
    const attribution = document.createElement('div');
    attribution.className = 'tmdb-attribution';
    attribution.innerHTML = 'Imagens fornecidas por <a href="https://www.themoviedb.org/" target="_blank" rel="noopener">TMDB</a>';
    container.appendChild(attribution);

    window.APP_DATA.sections.forEach(section => {
      // Criar bloco de seção com estrutura existente
      const sectionEl = document.createElement('div');
      sectionEl.className = 'section';
      sectionEl.innerHTML = `
        <h2 class="section-title">${section.title}</h2>
        <div class="carousel-wrapper" data-carousel="${section.id}">
          <div class="carousel" id="carousel-${section.id}"></div>
          <button class="nav-button left" data-action="nav-left" data-target="carousel-${section.id}" aria-label="Navegar para itens anteriores" aria-controls="carousel-${section.id}" tabindex="0">&#10094;</button>
          <button class="nav-button right" data-action="nav-right" data-target="carousel-${section.id}" aria-label="Navegar para próximos itens" aria-controls="carousel-${section.id}" tabindex="0">&#10095;</button>
          <div class="progress-bar"><div class="progress-fill" id="progress-${section.id}"></div></div>
        </div>
      `;
      const carouselEl = sectionEl.querySelector('.carousel');
      section.items.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'movie-card';
        btn.type = 'button';
        btn.setAttribute('aria-label', `${item.year ? 'Título' : 'Item'}: ${item.title}`);
        btn.setAttribute('data-carousel-id', `carousel-${section.id}`);
        btn.innerHTML = `
          <img class="movie-image" src="${item.image}" alt="${item.title}" loading="lazy" data-poster="${item.image}" data-backdrop="">
          <div class="movie-info">
            <div class="movie-title">${item.title}</div>
            <div class="movie-year">${item.year || ''}</div>
            <div class="movie-rating"><span class="stars">★★★★☆</span><span>${item.rating || ''}</span></div>
          </div>`;
        carouselEl.appendChild(btn);
      });
      container.appendChild(sectionEl);
    });
  }
  // Popular hero dinamicamente pelo fallback, se houver dados
  if (!usingTMDB && window.APP_DATA && Array.isArray(window.APP_DATA.hero)) {
    const heroSliderEl = document.getElementById('hero-slider');
    if (heroSliderEl) {
      heroSliderEl.innerHTML = '';
      window.APP_DATA.hero.forEach((h, idx) => {
        const slide = document.createElement('div');
        slide.className = 'hero-slide' + (idx === 0 ? ' is-active' : '');
        slide.setAttribute('data-index', String(idx));
        // Ajouter les attributs TMDB si disponibles
        if (h.id || h.tmdbId) {
          slide.setAttribute('data-tmdb-id', h.id || h.tmdbId);
        }
        if (h.mediaType || h.type) {
          slide.setAttribute('data-media-type', h.mediaType || h.type || 'movie');
        }
        slide.innerHTML = `
          <img class="hero-image" src="${h.image}" alt="Destaque: ${h.title}" loading="lazy" />
          <div class="hero-gradient"></div>
          <div class="hero-content">
            <h2 class="hero-title">${h.title}</h2>
            <p class="hero-description">${h.description || ''}</p>
            <div class="hero-actions">
              <button class="btn btn-primary" aria-label="Assistir ${h.title} agora">Assistir agora</button>
              <button class="btn btn-secondary" aria-label="Ver detalhes de ${h.title}">Detalhes</button>
            </div>
          </div>`;
        heroSliderEl.appendChild(slide);
      });
    }
  }
  window.movieCarousel = new MovieCarousel();
  console.log('MovieCarousel inicializado');
  // Para autoplay global: window.movieCarousel.startAutoPlay(5000);
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => { window.movieCarousel.recalculate(); }, UI_CONST.RESIZE_DEBOUNCE_MS);
  });
  document.addEventListener('visibilitychange', () => {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => { carousel.style.transitionDuration = document.hidden ? '0s' : ''; });
  });
  console.log('Iniciando HeroSlider...');
  window.heroSlider = new HeroSlider('#hero-slider', { interval: UI_CONST.AUTOPLAY_INTERVAL_MS });
  console.log('HeroSlider inicializado');

  const modal = document.getElementById('tmdb-settings-modal');
  const btnOpen = document.getElementById('btn-open-settings');
  const input = document.getElementById('tmdb-key-input');
  const btnSave = document.getElementById('tmdb-save');
  const btnClear = document.getElementById('tmdb-clear');
  const btnCancel = document.getElementById('tmdb-cancel');
  let lastFocus = null;

  function openModal() {
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.hidden = false;
    setTimeout(() => input && input.focus(), 0);
    try { input.value = localStorage.getItem('tmdb_api_key') || ''; } catch (_) { input.value = ''; }
  }
  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }
  btnOpen && btnOpen.addEventListener('click', () => openModal());
  btnCancel && btnCancel.addEventListener('click', () => closeModal());
  modal && modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop') || e.target.classList.contains('modal-sr-close')) closeModal();
  });
  document.addEventListener('keydown', (e) => { if (!modal.hidden && e.key === 'Escape') closeModal(); });
  btnSave && btnSave.addEventListener('click', async () => {
    try { localStorage.setItem('tmdb_api_key', input.value.trim()); } catch (_) {}
    closeModal();
    if (typeof TMDBConfig !== 'undefined') {
      TMDBConfig.atualizarBotaoTMDB();
    }
    location.reload();
  });
  btnClear && btnClear.addEventListener('click', () => {
    try { localStorage.removeItem('tmdb_api_key'); } catch (_) {}
    closeModal();
    if (typeof TMDBConfig !== 'undefined') {
      TMDBConfig.atualizarBotaoTMDB();
    }
    location.reload();
  });

  // Delegação de eventos para navegação dos carrosséis
  // Delegação no `body` garante funcionamento com elementos gerados dinamicamente
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action][data-target]');
    if (btn) {
      const target = btn.getAttribute('data-target');
      const action = btn.getAttribute('data-action');
      if (action === 'nav-left') window.movieCarousel.navigate(target, -1);
      if (action === 'nav-right') window.movieCarousel.navigate(target, 1);
    }
    const heroBtn = e.target.closest('[data-hero-action]');
    if (heroBtn) {
      const action = heroBtn.getAttribute('data-hero-action');
      if (action === 'prev') window.heroSlider.prev();
      if (action === 'next') window.heroSlider.next();
    }
  });

  // Clique nos cards (sem inline handlers)
  // Delegação para cards, incluindo os gerados dinamicamente
  document.body.addEventListener('click', (ev) => {
    const card = ev.target.closest('.movie-card');
    if (!card) return;
    ev.preventDefault();
    window.movieCarousel.selectMovie(card);
  });
  document.body.addEventListener('keydown', (ev) => {
    const card = ev.target.closest('.movie-card');
    if (!card) return;
    const carouselId = card.getAttribute('data-carousel-id');
    if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); window.movieCarousel.selectMovie(card); }
    if (ev.key === 'ArrowLeft') { ev.preventDefault(); window.movieCarousel.navigate(carouselId, -1); }
    if (ev.key === 'ArrowRight') { ev.preventDefault(); window.movieCarousel.navigate(carouselId, 1); }
  });

  // Gestionnaire pour le bouton "Assista já" du hero-cta
  const heroCTAButton = document.getElementById('hero-cta-button');
  if (heroCTAButton) {
    heroCTAButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Récupérer le slide actif du hero
      const activeSlide = document.querySelector('.hero-slide.is-active');
      if (!activeSlide) {
        console.warn('Aucun slide actif trouvé');
        return;
      }
      
      // Extraire les informations du film du slide actif
      const title = activeSlide.querySelector('.hero-title')?.textContent.trim();
      const tmdbId = activeSlide.getAttribute('data-tmdb-id');
      const mediaType = activeSlide.getAttribute('data-media-type') || 'movie';
      
      console.log('🎬 Hero CTA cliqué:', { title, tmdbId, mediaType });
      
      if (tmdbId) {
        // Si un ID TMDB est disponible, l'utiliser en priorité avec le type
        window.location.href = `movie-details.html?id=${tmdbId}&type=${mediaType}&title=${encodeURIComponent(title)}`;
      } else if (title) {
        // Sinon, utiliser le titre pour la base locale
        window.location.href = `movie-details.html?title=${encodeURIComponent(title)}`;
      } else {
        console.warn('Aucun titre trouvé pour le slide actif');
      }
    });
  }
});
