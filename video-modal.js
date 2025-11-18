/**
 * Gestion du modal vidéo pour les trailers de films
 * Recherche et affiche des trailers en portugais brésilien depuis YouTube
 */

(function() {
    'use strict';

    // Base de dados de trailers em português brasileiro (áudio dublado)
    const TRAILERS_DB = {
        // Filmes Populares
        'Vingadores: Ultimato': 'LMOqLeoP2yw',
        'Homem-Aranha: Sem Volta Para Casa': 'CyiiEJRZjSU',
        'Doutor Estranho no Multiverso da Loucura': 'X23XCFgdh2M',
        'Pantera Negra': 'H6A6GvryOG8',
        'Thor: Ragnarok': 'WWP_CjPk0Jw',
        'Guardiões da Galáxia': 'W8JYOj5K_7Y',
        'Avatar: O Caminho da Água': 'a8Gx8wiNbs8',
        'John Wick 4: Baba Yaga': 'M7XM597XO94',
        'Duna': 'n9xhJrPXop4',
        'Capitão América: Guerra Civil': 'KEoZvtpZobic',
        'Homem de Ferro': '2KawXlbx3bQ',
        
        // Séries
        'Stranger Things': 'KNaXLx1Il24',
        'The Witcher': 'ndl1W4ltcmg',
        'La Casa de Papel': '_InqQJRqGW4',
        'Dark': 'rrwycJ08PSA',
        'Breaking Bad': 'XZ8daibM3AE',
        'The Crown': 'JWtnJjn6ng0',
        'The Mandalorian': 'eW7Twd85m2g',
        'The Last of Us': '02hWsNILn7E',
        'House of the Dragon': 'WMN3u3X8lxs',
        
        // Hero Slides
        'Oppenheimer': 'bK6ldnjE3Y0',
        'Duna: Parte Dois': 'U2Qp5pL3ovA',
        'Vingadores: Guerra Infinita': 'g6ng8iy-l0U',
        'Top Gun: Maverick': '7aOCYTflp8o',
        'Super Mario Bros. O Filme': 'Cb4WV4aXBpk',
        
        // Categorias - SUSPENSE
        'Parasita': 'isOGD_7hNIY',
        'Shutter Island': 'v8yrZSkKxTA',
        'Prisioneiros': '5cediRGsd2c',
        'Corra!': 'szmE6Waer9k',
        'Zodíaco': '90tSUXCZhpI',
        'Garota Exemplar': 'Ym3LB0lOJ0o',
        'Seven: Os Sete Crimes Capitais': 'J4YV2_TcCoE',
        'O Silêncio dos Inocentes': 'W6Mm8Sbe__o',
        
        // COMÉDIA
        'Deadpool': 'FyKWUTwSYAs',
        'Jumanji: Bem-Vindo à Selva': '2QKg5SZ_35I',
        'As Branquelas': 'OJLhKV_QUj8',
        'Se Beber, Não Case!': '3YhdZxDYBeQ',
        'Homem-Aranha no Aranhaverso': 'g4Hbz2jLxvQ',
        'Todo Mundo em Pânico': 'ATiEYDYMlQQ',
        'Gente Grande': 'gm0qxoJxDhI',
        'Click': 'B6vIDJNKzoY',
        
        // AÇÃO
        'Mad Max: Estrada da Fúria': 'hEJnMQG9ev8',
        'Missão Impossível: Efeito Fallout': 'wb49-oV0F78',
        'Batman: O Cavaleiro das Trevas': 'EXeTwQWrcwY',
        'Gladiador': 'owK1qxDselE',
        'Velozes e Furiosos 7': 'NvEj2TYCmHc',
        'Tropa de Elite': 'zt5qJaVxPi0',
        'Matrix Reloaded': 'y9fHWBRyYVI',
        'Capitão América: O Soldado Invernal': 'KEoZvtpZobic',
        
        // TERROR
        'O Iluminado': '5Cb3ik6zP2I',
        'O Exorcista': 'YDGw1MTEe34',
        'Hereditário': 'V6wWKNij_1M',
        'Invocação do Mal': 'k10ETZ41q5o',
        'It: A Coisa': 'FnCdOQsX5kc',
        'Um Lugar Silencioso': 'WR7cc5t7tv8',
        'A Bruxa': 'iQXmlf3Sefg',
        'Midsommar: O Mal Não Espera a Noite': 'MWJbjCDLfkE',
        'A Freira': 'zzJvP-6Sp24',
        'Annabelle': 'dZ6vKDw7i_4',
        
        // DRAMA
        'Um Sonho de Liberdade': '6hB3S9bIaco',
        'O Poderoso Chefão': 'sY1S34973zA',
        'Interestelar': 'zSWdZVtXT7E',
        '12 Homens e uma Sentença': 'T8V0-0hRkE8',
        'Forrest Gump': 'bLvqoHBptjg',
        'A Lista de Schindler': 'gG22XNhtnoY',
        'Clube da Luta': 'qtRKdVHc-cE',
        'O Pianista': 'BFwGqLa_oAo',
        'À Procura da Felicidade': 'x8-7mHT9edg',
        'Coringa': 'xB7C8d0c2_Q',
        'Green Book': 'aClT7QYgj6U',
        
        // FICÇÃO CIENTÍFICA
        'Matrix': 'OM0tSTEfdyQ',
        'Blade Runner 2049': 'gCcx85zbxz4',
        'De Volta para o Futuro': 'qvsgGtivCgs',
        'A Chegada': 'rNciXGzYXms',
        'Ex Machina': 'XYGzRB4Pnq8',
        'O Exterminador do Futuro 2': 'eajuMYNYtuY',
        'Alien: O 8º Passageiro': 'LjLamj-b0I8',
        'O Predador': '4oBKn5FRc3c',
        'Star Wars: O Despertar da Força': 'sGbxmsDFVnE',
        'Duna: Parte Dois': 'U2Qp5pL3ovA',
        'Interestelar': 'zSWdZVtXT7E',
        '2001: Uma Odisseia no Espaço': 'mfr3FXHGPy0',
        'Minority Report': 'aGWQYgZZEcQ',
        
        // MISTÉRIO
        'Cidade Perdida': 'nfKO9rYDmE8',
        'Entre Facas e Segredos': 'xi1CrXJEQdM',
        'O Sexto Sentido': 'VG9AGf66tXM',
        'Amnésia': 'HDWylEQSwFo',
        'A Origem': 'YoHD9XEInc0',
        'Os Suspeitos': 'jFcuCZq9k94',
        'Ilha do Medo': 'v8yrZSkKxTA',
        'Perdida': '2O3d44IzQag',
        'Shutter Island': 'v8yrZSkKxTA',
        'Gone Girl': '2O3d44IzQag',
        
        // Filmes adicionais que aparecem nas categorias
        'Super Mario Bros. O Filme': 'Cb4WV4aXBpk',
        'Homem-Aranha no Aranhaverso': 'g4Hbz2jLxvQ',
        'Avatar: O Caminho da Água': 'a8Gx8wiNbs8',
        'Top Gun: Maverick': 'giXco2jaZ_4',
        'John Wick 4: Baba Yaga': 'M7XM597XO94',
        'Vingadores: Ultimato': 'g6ng8iy-l0U',
        'Missão Impossível: Efeito Fallout': 'wb49-oV0F78',
        'Batman: O Cavaleiro das Trevas': 'EXeTwQWrcwY',
        'Gladiador': 'owK1qxDselE',
        'Mad Max: Estrada da Fúria': 'hEJnMQG9ev8',
        'Deadpool': 'FyKWUTwSYAs',
        'Jumanji: Bem-Vindo à Selva': '2QKg5SZ_35I',
        'As Branquelas': 'OJLhKV_QUj8',
        'Se Beber, Não Case!': '3YhdZxDYBeQ',
        'Parasita': 'isOGD_7hNIY',
        'Prisioneiros': '5cediRGsd2c',
        'Corra!': 'szmE6Waer9k',
        'Zodíaco': '90tSUXCZhpI',
        'Garota Exemplar': 'Ym3LB0lOJ0o',
        'Seven: Os Sete Crimes Capitais': 'J4YV2_TcCoE',
        'O Silêncio dos Inocentes': 'W6Mm8Sbe__o',
        'O Iluminado': '5Cb3ik6zP2I',
        'O Exorcista': 'YDGw1MTEe34',
        'Hereditário': 'V6wWKNij_1M',
        'Invocação do Mal': 'k10ETZ41q5o',
        'It: A Coisa': 'FnCdOQsX5kc',
        'Um Lugar Silencioso': 'WR7cc5t7tv8',
        'A Bruxa': 'iQXmlf3Sefg',
        'Midsommar: O Mal Não Espera a Noite': 'MWJbjCDLfkE',
        'Um Sonho de Liberdade': '6hB3S9bIaco',
        'O Poderoso Chefão': 'sY1S34973zA',
        '12 Homens e uma Sentença': 'T8V0-0hRkE8',
        'Forrest Gump': 'bLvqoHBptjg',
        'A Lista de Schindler': 'gG22XNhtnoY',
        'Clube da Luta': 'qtRKdVHc-cE',
        'O Pianista': 'BFwGqLa_oAo',
        'Duna': 'n9xhJrPXop4',
        'Matrix': 'OM0tSTEfdyQ',
        'Blade Runner 2049': 'gCcx85zbxz4',
        'De Volta para o Futuro': 'qvsgGtivCgs',
        'A Chegada': 'rNciXGzYXms',
        'Ex Machina': 'XYGzRB4Pnq8',
        'O Exterminador do Futuro 2': 'eajuMYNYtuY',
        'Alien: O 8º Passageiro': 'LjLamj-b0I8',
        'Cidade Perdida': 'nfKO9rYDmE8',
        'Entre Facas e Segredos': 'xi1CrXJEQdM',
        'O Sexto Sentido': 'VG9AGf66tXM',
        'Amnésia': 'HDWylEQSwFo',
        'A Origem': 'YoHD9XEInc0',
        'Os Suspeitos': 'jFcuCZq9k94',
        'Ilha do Medo': 'v8yrZSkKxTA'
    };

    let videoModal = null;
    let videoContainer = null;
    let currentVideo = null;

    // Inicialização
    document.addEventListener('DOMContentLoaded', function() {
        createVideoModal();
        attachMovieCardListeners();
    });

    /**
     * Crée le modal vidéo
     */
    function createVideoModal() {
        videoModal = document.createElement('div');
        videoModal.className = 'video-modal-overlay';
        videoModal.innerHTML = `
            <div class="video-modal-container">
                <div class="video-modal-header">
                    <h2 class="video-modal-title"></h2>
                    <button class="video-modal-close" aria-label="Fechar vídeo">&times;</button>
                </div>
                <div class="video-modal-content">
                    <div class="video-modal-loading">
                        <div class="video-modal-spinner"></div>
                        <p>Carregando trailer...</p>
                    </div>
                </div>
                <div class="video-modal-info">
                    <p class="video-modal-description"></p>
                </div>
            </div>
        `;
        
        document.body.appendChild(videoModal);
        videoContainer = videoModal.querySelector('.video-modal-content');

        // Événements de fermeture
        const closeBtn = videoModal.querySelector('.video-modal-close');
        closeBtn.addEventListener('click', closeVideoModal);

        // Fermer en cliquant sur l'overlay
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });

        // Fermer avec ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                closeVideoModal();
            }
        });
    }

    /**
     * Attache les événements aux cartes de films
     * REDIRIGE VERS LA PAGE DE DÉTAILS AU LIEU D'OUVRIR LE MODAL YOUTUBE
     */
    function attachMovieCardListeners() {
        // Cartes de films dans les carousels - Redirige vers page de détails
        const movieCards = document.querySelectorAll('.movie-card');
        movieCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                const title = this.querySelector('.movie-title')?.textContent.trim();
                const tmdbId = this.getAttribute('data-tmdb-id');
                
                if (tmdbId) {
                    // Si un ID TMDB est disponible, l'utiliser en priorité
                    window.location.href = `movie-details.html?id=${tmdbId}&title=${encodeURIComponent(title)}`;
                } else if (title) {
                    // Sinon, utiliser le titre pour la base locale
                    window.location.href = `movie-details.html?title=${encodeURIComponent(title)}`;
                }
            });
        });

        // Hero slides - boutons "Assistir agora" - Redirige vers page de détails
        const heroButtons = document.querySelectorAll('.hero-slide .btn-primary');
        heroButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const heroSlide = this.closest('.hero-slide');
                const title = heroSlide.querySelector('.hero-title')?.textContent.trim();
                const tmdbId = heroSlide.getAttribute('data-tmdb-id');
                
                if (tmdbId) {
                    // Si un ID TMDB est disponible, l'utiliser en priorité
                    window.location.href = `movie-details.html?id=${tmdbId}&title=${encodeURIComponent(title)}`;
                } else if (title) {
                    // Sinon, utiliser le titre pour la base locale
                    window.location.href = `movie-details.html?title=${encodeURIComponent(title)}`;
                }
            });
        });
        
        // ===== CODE ORIGINAL YOUTUBE (pour réactiver les vidéos plus tard) =====
        /*
        // Cartes de films dans les carousels
        const movieCards = document.querySelectorAll('.movie-card');
        movieCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                const title = this.querySelector('.movie-title')?.textContent.trim();
                const description = getMovieDescription(title);
                
                if (title) {
                    openVideoModal(title, description);
                }
            });
        });

        // Hero slides - boutons "Assistir agora"
        const heroButtons = document.querySelectorAll('.hero-slide .btn-primary');
        heroButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const heroSlide = this.closest('.hero-slide');
                const title = heroSlide.querySelector('.hero-title')?.textContent.trim();
                const description = heroSlide.querySelector('.hero-description')?.textContent.trim();
                
                if (title) {
                    openVideoModal(title, description);
                }
            });
        });
        */
    }

    /**
     * Obtém a descrição do filme
     */
    function getMovieDescription(title) {
        // Tente pegar do hero
        const heroSlides = document.querySelectorAll('.hero-slide');
        for (let slide of heroSlides) {
            const heroTitle = slide.querySelector('.hero-title')?.textContent.trim();
            if (heroTitle === title) {
                return slide.querySelector('.hero-description')?.textContent.trim();
            }
        }
        
        // Descrição padrão
        return '';
    }

    /**
     * Ouvre le modal vidéo
     */
    function openVideoModal(movieTitle, description) {
        const videoId = TRAILERS_DB[movieTitle];
        
        if (!videoId) {
            console.warn(`Trailer não encontrado para: ${movieTitle}`);
            alert(`Desculpe, o trailer de "${movieTitle}" não está disponível no momento.`);
            return;
        }

        // Mise à jour du titre et description
        videoModal.querySelector('.video-modal-title').textContent = movieTitle;
        videoModal.querySelector('.video-modal-description').textContent = description || '';

        // Afficher le modal
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Créer l'iframe YouTube
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&hl=pt-BR&cc_lang_pref=pt&cc_load_policy=1`;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.title = `Trailer de ${movieTitle}`;

        // Remplacer le contenu de chargement par l'iframe
        videoContainer.innerHTML = '';
        videoContainer.appendChild(iframe);

        currentVideo = iframe;
    }

    /**
     * Ferme le modal vidéo
     */
    function closeVideoModal() {
        videoModal.classList.remove('active');
        document.body.style.overflow = '';

        // Arrêter la vidéo
        if (currentVideo) {
            currentVideo.src = '';
            currentVideo = null;
        }

        // Restaurer le contenu de chargement
        setTimeout(() => {
            videoContainer.innerHTML = `
                <div class="video-modal-loading">
                    <div class="video-modal-spinner"></div>
                    <p>Carregando trailer...</p>
                </div>
            `;
        }, 300);
    }

    // Exposer les fonctions globalement si nécessaire
    window.videoModalModule = {
        open: openVideoModal,
        close: closeVideoModal
    };

})();
