/**
 * Gestion de la recherche de films et s�ries
 * Recherche via TMDB API si configur�e, sinon catalogue local (data.js)
 */

(function() {
    'use strict';

    let searchInput = null;
    let searchButton = null;
    let searchOverlay = null;
    let currentSearchQuery = '';
    let allMovies = [];
    let tmdbAvailable = false;

    document.addEventListener('DOMContentLoaded', function() {
        initSearchElements();
        loadLocalCatalog();
        createSearchOverlay();
        setupSearchListeners();
        checkTMDBAvailability();
    });

    /**
     * V�rifie si l'API TMDB est disponible (cl� dans localStorage)
     */
    async function checkTMDBAvailability() {
        // V�rifier si une cl� API est dans localStorage
        const apiKey = localStorage.getItem('tmdb_api_key');
        
        if (apiKey && apiKey.trim().length > 0) {
            console.log('? Cl� API TMDB trouv�e dans localStorage - recherche TMDB activ�e');
            tmdbAvailable = true;
            updateSearchIndicator(true);
        } else {
            console.log('?? Pas de cl� API TMDB - utilisation du catalogue local');
            tmdbAvailable = false;
            updateSearchIndicator(false);
        }
    }

    /**
     * Met � jour l'indicateur visuel TMDB
     */
    function updateSearchIndicator(isTMDBActive) {
        const searchContainer = document.querySelector('.search-container');
        if (!searchContainer) return;

        // Supprimer l'indicateur existant s'il y en a
        const existingIndicator = searchContainer.querySelector('.tmdb-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }

        // Cr�er un nouvel indicateur
        const indicator = document.createElement('span');
        indicator.className = 'tmdb-indicator';
        indicator.style.cssText = `
            position: absolute;
            top: -8px;
            right: -8px;
            background: ${isTMDBActive ? '#01b4e4' : '#888'};
            color: white;
            font-size: 9px;
            font-weight: 700;
            padding: 2px 6px;
            border-radius: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            pointer-events: none;
            z-index: 10;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        `;
        indicator.textContent = isTMDBActive ? 'TMDB' : 'LOCAL';
        indicator.title = isTMDBActive ? 'Recherche via TMDB API' : 'Recherche dans le catalogue local';

        // Ajouter position relative au conteneur si n�cessaire
        if (window.getComputedStyle(searchContainer).position === 'static') {
            searchContainer.style.position = 'relative';
        }

        searchContainer.appendChild(indicator);
    }

    function loadLocalCatalog() {
        allMovies = [];
        if (window.APP_DATA) {
            if (window.APP_DATA.sections && Array.isArray(window.APP_DATA.sections)) {
                window.APP_DATA.sections.forEach(section => {
                    if (section.items && Array.isArray(section.items)) {
                        section.items.forEach(item => {
                            allMovies.push({ ...item, section: section.title });
                        });
                    }
                });
            }
            if (window.APP_DATA.hero && Array.isArray(window.APP_DATA.hero)) {
                window.APP_DATA.hero.forEach(item => {
                    allMovies.push({ ...item, section: 'Destaques' });
                });
            }
        }
        if (window.CATEGORIES_DATA) {
            Object.keys(window.CATEGORIES_DATA).forEach(categoryKey => {
                const category = window.CATEGORIES_DATA[categoryKey];
                if (category.items && Array.isArray(category.items)) {
                    category.items.forEach(item => {
                        const exists = allMovies.some(movie => movie.title === item.title && movie.year === item.year);
                        if (!exists) {
                            allMovies.push({ ...item, section: category.title });
                        }
                    });
                }
            });
        }
        console.log('Filmes carregados do cat�logo local: ' + allMovies.length);
    }

    function initSearchElements() {
        searchInput = document.querySelector('.search-input');
        searchButton = document.querySelector('.search-button');
    }

    function createSearchOverlay() {
        searchOverlay = document.createElement('div');
        searchOverlay.className = 'search-results-overlay';
        searchOverlay.innerHTML = '<div class=\"search-results-container\"><div class=\"search-results-header\"><div><h1 class=\"search-results-title\"><span>Resultados para</span>: <span class=\"search-query\"></span></h1><p class=\"search-results-count\"></p></div><button class=\"search-close-btn\" aria-label=\"Fechar resultados\">&times;</button></div><div class=\"search-results-content\"></div></div>';
        document.body.appendChild(searchOverlay);
        searchOverlay.querySelector('.search-close-btn').addEventListener('click', closeSearchResults);
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                closeSearchResults();
            }
        });
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) {
                closeSearchResults();
            }
        });
    }

    function setupSearchListeners() {
        if (!searchInput || !searchButton) return;
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') performSearch();
        });
        let searchTimeout = null;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            if (query.length >= 3) {
                searchTimeout = setTimeout(performSearch, 500);
            }
        });
    }

    function performSearch() {
        const query = searchInput.value.trim();
        if (query.length < 2) {
            // Au lieu d'une alerte, afficher un message visuel dans l'input
            searchInput.setAttribute('placeholder', 'Digite pelo menos 2 caracteres');
            searchInput.classList.add('search-input-error');
            setTimeout(() => {
                searchInput.setAttribute('placeholder', 'Pesquisar filmes...');
                searchInput.classList.remove('search-input-error');
            }, 2000);
            return;
        }
        currentSearchQuery = query;
        openSearchResults();
        showLoading();
        
        // Utiliser TMDB si disponible, sinon catalogue local
        if (tmdbAvailable) {
            searchInTMDB(query);
        } else {
            setTimeout(() => searchInLocalCatalog(query), 300);
        }
    }

    /**
     * Recherche dans l'API TMDB (appel direct frontend)
     */
    async function searchInTMDB(query) {
        try {
            const apiKey = localStorage.getItem('tmdb_api_key');
            if (!apiKey) {
                console.log('?? Pas de cl� API, fallback vers catalogue local');
                tmdbAvailable = false;
                searchInLocalCatalog(query);
                return;
            }

            console.log('🔍 Recherche TMDB directe pour:', query);
            
            // Utiliser search/multi pour chercher films ET séries TV
            const response = await fetch(
                `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=pt-BR&page=1`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Erreur de recherche TMDB');
            }

            const data = await response.json();
            
            console.log('✅ Résultats TMDB reçus:', data.results.length);

            // Convertir les résultats TMDB au format attendu (films ET séries)
            const tmdbResults = data.results
                .filter(item => item.media_type === 'movie' || item.media_type === 'tv') // Seulement films et séries
                .slice(0, 20)
                .map(item => ({
                    id: item.id,
                    title: item.title || item.name || item.original_title || item.original_name,
                    year: item.release_date ? item.release_date.split('-')[0] : (item.first_air_date ? item.first_air_date.split('-')[0] : 'N/A'),
                    rating: item.vote_average ? item.vote_average.toFixed(1) : 'N/A',
                    description: item.overview || 'Sinopse não disponível',
                    image: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
                    mediaType: item.media_type, // 'movie' ou 'tv'
                section: 'TMDB',
                tmdbId: movie.id,
                source: 'tmdb'
            }));

            console.log(`? ${tmdbResults.length} r�sultats TMDB re�us`);
            displayResults(tmdbResults, 'TMDB');

        } catch (error) {
            console.error('? Erreur recherche TMDB:', error);
            // Fallback vers catalogue local en cas d'erreur
            console.log('?? Fallback vers catalogue local');
            tmdbAvailable = false;
            searchInLocalCatalog(query);
        }
    }

    function searchInLocalCatalog(query) {
        const searchTerm = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const results = allMovies.filter(movie => {
            const title = (movie.title || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            const description = (movie.description || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            const year = (movie.year || '').toString();
            return title.includes(searchTerm) || description.includes(searchTerm) || year.includes(searchTerm);
        });
        displayResults(results);
    }

    function displayResults(results, source = 'Local') {
        const contentDiv = searchOverlay.querySelector('.search-results-content');
        const querySpan = searchOverlay.querySelector('.search-query');
        const countP = searchOverlay.querySelector('.search-results-count');
        querySpan.textContent = '"' + currentSearchQuery + '"';
        
        // Afficher la source de recherche
        const sourceIndicator = source === 'TMDB' ? ' <span style="color: #01b4e4; font-weight: 600;">(TMDB)</span>' : ' <span style="color: #888;">(Local)</span>';
        countP.innerHTML = results.length + ' resultados encontrados' + sourceIndicator;
        
        if (results.length === 0) {
            contentDiv.innerHTML = '<div class=\"search-no-results\"><div class=\"search-no-results-icon\"></div><h2 class=\"search-no-results-title\">Nenhum resultado encontrado</h2><p class=\"search-no-results-text\">Tente usar palavras-chave diferentes</p></div>';
            return;
        }
        const grid = document.createElement('div');
        grid.className = 'search-results-grid';
        results.forEach((item, index) => {
            grid.appendChild(createResultCard(item, index));
        });
        contentDiv.innerHTML = '';
        contentDiv.appendChild(grid);
    }

    function generateStars(rating) {
        if (!rating || rating === 'N/A' || rating === '') return '';
        const numRating = parseFloat(rating);
        const filledStars = Math.round((numRating / 10) * 5);
        const emptyStars = 5 - filledStars;
        
        // Générer les étoiles avec animation en cascade
        let starsHTML = '';
        for (let i = 0; i < filledStars; i++) {
            starsHTML += `<span style="animation-delay: ${i * 0.1}s">&#9733;</span>`;
        }
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += `<span style="animation-delay: ${(filledStars + i) * 0.1}s">&#9734;</span>`;
        }
        
        return starsHTML;
    }

    function createResultCard(item, index) {
        const card = document.createElement('div');
        card.className = 'search-result-card';
        card.style.animationDelay = (index * 0.05) + 's';
        const title = item.title || 'Sem t�tulo';
        const year = item.year || '';
        const rating = item.rating || 'N/A';
        const description = item.description || 'Sem descri��o dispon�vel';
        const section = item.section || '';
        const image = item.image || null;
        const tmdbId = item.id || item.tmdbId || null;
        
        // Stocker l'ID TMDB si disponible
        if (tmdbId) {
            card.setAttribute('data-tmdb-id', tmdbId);
        }
        
        card.innerHTML = '<div class=\"search-result-poster\">' + (image ? '<img src=\"' + image + '\" alt=\"' + title + '\" loading=\"lazy\">' : '<div class=\"search-result-no-poster\"><svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12z\"/></svg><span>Sem imagem</span></div>') + (section ? '<span class=\"search-result-type\">' + section + '</span>' : '') + (rating !== 'N/A' && rating !== '' ? '<span class=\"search-result-rating\"><span class=\"stars\">' + generateStars(rating) + '</span><span>' + rating + '</span></span>' : '') + '</div><div class=\"search-result-info\"><h3 class=\"search-result-title\">' + title + '</h3>' + (year ? '<p class=\"search-result-year\">' + year + '</p>' : '') + '<p class=\"search-result-overview\">' + description + '</p></div>';
        card.addEventListener('click', function() {
            showItemDetails(item);
        });
        return card;
    }

    function showItemDetails(item) {
        // Rediriger vers la page de détails
        const title = item.title || 'Sem título';
        const tmdbId = item.id || item.tmdbId || null;
        const source = item.source || 'local';
        const mediaType = item.mediaType || 'movie'; // Par défaut: movie
        
        console.log('🎬 Ouverture des détails:', { title, tmdbId, source, mediaType });
        
        if (source === 'tmdb' && tmdbId) {
            // Résultat TMDB : ajouter le type de média dans l'URL
            console.log('📡 Chargement des détails TMDB pour ID:', tmdbId, 'Type:', mediaType);
            window.location.href = `movie-details.html?id=${tmdbId}&type=${mediaType}&source=tmdb&title=${encodeURIComponent(title)}`;
        } else if (tmdbId) {
            // Résultat local avec ID TMDB : ajouter le type si disponible
            console.log('💾 Résultat local avec ID TMDB:', tmdbId, 'Type:', mediaType);
            const typeParam = mediaType ? `&type=${mediaType}` : '';
            window.location.href = `movie-details.html?id=${tmdbId}${typeParam}&title=${encodeURIComponent(title)}`;
        } else {
            // Résultat local sans ID : utiliser le titre uniquement
            console.log('🔍 Résultat local, recherche par titre');
            window.location.href = `movie-details.html?title=${encodeURIComponent(title)}`;
        }
    }

    function showLoading() {
        const contentDiv = searchOverlay.querySelector('.search-results-content');
        contentDiv.innerHTML = '<div class=\"search-loading\"><div class=\"search-spinner\"></div><p class=\"search-loading-text\">Procurando...</p></div>';
    }

    function openSearchResults() {
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSearchResults() {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function getTranslation(key) {
        if (window.t && typeof window.t === 'function') {
            return window.t(key);
        }
        return null;
    }

    window.searchModule = {
        search: performSearch,
        close: closeSearchResults,
        reloadCatalog: loadLocalCatalog,
        checkTMDB: checkTMDBAvailability,
        isTMDBAvailable: () => tmdbAvailable
    };
})();
