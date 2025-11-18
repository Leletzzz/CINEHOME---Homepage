/**/**

 * Gestion de la recherche de films et séries * Gestion de la recherche de films et séries

 * Recherche via API TMDB avec fallback sur catalogue local * Recherche dans le catalogue local (data.js)

 */ */



(function() {(function() {

    'use strict';    'use strict';



    let searchInput = null;    let searchInput = null;

    let searchButton = null;    let searchButton = null;

    let searchOverlay = null;    let searchOverlay = null;

    let currentSearchQuery = '';    let currentSearchQuery = '';

    let allMovies = []; // Catalogue local    let allMovies = []; // Tous les films du catalogue



    // Initialisation au chargement de la page    // Initialisation

    document.addEventListener('DOMContentLoaded', function() {    document.addEventListener('DOMContentLoaded', function() {

        console.log('🎬 Initialisation du module de recherche');        initSearchElements();

        initSearchElements();        loadLocalCatalog();

        loadLocalCatalog();        createSearchOverlay();

        createSearchOverlay();        setupSearchListeners();

        setupSearchListeners();    });

    });

    /**

    /**     * Charge tous les films du catalogue local

     * Charge tous les films du catalogue local (fallback)     */

     */    function loadLocalCatalog() {

    function loadLocalCatalog() {        allMovies = [];

        allMovies = [];        

                // Charger depuis APP_DATA (data.js)

        // Charger depuis APP_DATA (data.js)        if (window.APP_DATA) {

        if (window.APP_DATA) {            // Récupère tous les films de toutes les sections

            if (window.APP_DATA.sections && Array.isArray(window.APP_DATA.sections)) {            if (window.APP_DATA.sections && Array.isArray(window.APP_DATA.sections)) {

                window.APP_DATA.sections.forEach(section => {                window.APP_DATA.sections.forEach(section => {

                    if (section.items && Array.isArray(section.items)) {                    if (section.items && Array.isArray(section.items)) {

                        section.items.forEach(item => {                        section.items.forEach(item => {

                            allMovies.push({                            allMovies.push({

                                ...item,                                ...item,

                                section: section.title                                section: section.title // Ajoute la section d'origine

                            });                            });

                        });                        });

                    }                    }

                });                });

            }            }



            if (window.APP_DATA.hero && Array.isArray(window.APP_DATA.hero)) {            // Ajoute aussi les films du hero si disponibles

                window.APP_DATA.hero.forEach(item => {            if (window.APP_DATA.hero && Array.isArray(window.APP_DATA.hero)) {

                    allMovies.push({                window.APP_DATA.hero.forEach(item => {

                        ...item,                    allMovies.push({

                        section: 'Destaques'                        ...item,

                    });                        section: 'Destaques'

                });                    });

            }                });

        }            }

                }

        // Charger depuis CATEGORIES_DATA        

        if (window.CATEGORIES_DATA) {        // Charger depuis CATEGORIES_DATA (categories-data.js)

            Object.keys(window.CATEGORIES_DATA).forEach(categoryKey => {        if (window.CATEGORIES_DATA) {

                const category = window.CATEGORIES_DATA[categoryKey];            Object.keys(window.CATEGORIES_DATA).forEach(categoryKey => {

                if (category.items && Array.isArray(category.items)) {                const category = window.CATEGORIES_DATA[categoryKey];

                    category.items.forEach(item => {                if (category.items && Array.isArray(category.items)) {

                        const exists = allMovies.some(movie =>                     category.items.forEach(item => {

                            movie.title === item.title && movie.year === item.year                        // Vérifier si le film n'existe pas déjà dans allMovies

                        );                        const exists = allMovies.some(movie => 

                                                    movie.title === item.title && movie.year === item.year

                        if (!exists) {                        );

                            allMovies.push({                        

                                ...item,                        if (!exists) {

                                section: category.title                            allMovies.push({

                            });                                ...item,

                        }                                section: category.title // Ajoute la catégorie d'origine

                    });                            });

                }                        }

            });                    });

        }                }

            });

        console.log(`📁 ${allMovies.length} filmes carregados no catálogo local`);        }

    }

        console.log(`${allMovies.length} filmes carregados no catálogo (incluindo categorias)`);

    /**    }

     * Initialise les éléments de recherche

     */    // Initialisation

    function initSearchElements() {    document.addEventListener('DOMContentLoaded', function() {

        searchInput = document.querySelector('.search-input');        initSearchElements();

        searchButton = document.querySelector('.search-button');        createSearchOverlay();

                setupSearchListeners();

        if (!searchInput || !searchButton) {    });

            console.warn('⚠️ Éléments de recherche non trouvés');

        }    /**

    }     * Initialise les éléments de recherche

     */

    /**    function initSearchElements() {

     * Crée l'overlay pour afficher les résultats        searchInput = document.querySelector('.search-input');

     */        searchButton = document.querySelector('.search-button');

    function createSearchOverlay() {    }

        searchOverlay = document.createElement('div');

        searchOverlay.className = 'search-results-overlay';    /**

        searchOverlay.innerHTML = `     * Crée l'overlay pour afficher les résultats

            <div class="search-results-container">     */

                <div class="search-results-header">    function createSearchOverlay() {

                    <div>        searchOverlay = document.createElement('div');

                        <h1 class="search-results-title">        searchOverlay.className = 'search-results-overlay';

                            <span>Resultados para</span>:         searchOverlay.innerHTML = `

                            <span class="search-query"></span>            <div class="search-results-container">

                        </h1>                <div class="search-results-header">

                        <p class="search-results-count"></p>                    <div>

                    </div>                        <h1 class="search-results-title">

                    <button class="search-close-btn" aria-label="Fechar resultados">×</button>                            <span>Resultados para</span>: 

                </div>                            <span class="search-query"></span>

                <div class="search-results-content"></div>                        </h1>

            </div>                        <p class="search-results-count"></p>

        `;                    </div>

        document.body.appendChild(searchOverlay);                    <button class="search-close-btn" aria-label="Fechar resultados">×</button>

                </div>

        // Bouton de fermeture                <div class="search-results-content"></div>

        searchOverlay.querySelector('.search-close-btn').addEventListener('click', closeSearchResults);            </div>

                `;

        // Fermer avec ESC        document.body.appendChild(searchOverlay);

        document.addEventListener('keydown', function(e) {

            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {        // Bouton de fermeture

                closeSearchResults();        searchOverlay.querySelector('.search-close-btn').addEventListener('click', closeSearchResults);

            }        

        });        // Fermer avec ESC

        document.addEventListener('keydown', function(e) {

        // Fermer en cliquant sur l'overlay            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {

        searchOverlay.addEventListener('click', function(e) {                closeSearchResults();

            if (e.target === searchOverlay) {            }

                closeSearchResults();        });

            }

        });        // Fermer en cliquant sur l'overlay

    }        searchOverlay.addEventListener('click', function(e) {

            if (e.target === searchOverlay) {

    /**                closeSearchResults();

     * Configure les écouteurs d'événements            }

     */        });

    function setupSearchListeners() {    }

        if (!searchInput || !searchButton) return;

    /**

        // Recherche au clic     * Configure les écouteurs d'événements

        searchButton.addEventListener('click', performSearch);     */

    function setupSearchListeners() {

        // Recherche avec Enter        if (!searchInput || !searchButton) return;

        searchInput.addEventListener('keypress', function(e) {

            if (e.key === 'Enter') {        // Recherche au clic sur le bouton

                performSearch();        searchButton.addEventListener('click', function() {

            }            performSearch();

        });        });



        // Recherche en temps réel (optionnel)        // Recherche avec Enter

        let searchTimeout = null;        searchInput.addEventListener('keypress', function(e) {

        searchInput.addEventListener('input', function() {            if (e.key === 'Enter') {

            clearTimeout(searchTimeout);                performSearch();

            const query = this.value.trim();            }

                    });

            if (query.length >= 3) {

                searchTimeout = setTimeout(() => {        // Recherche en temps réel (optionnel, avec debounce)

                    performSearch();        let searchTimeout = null;

                }, 500);        searchInput.addEventListener('input', function() {

            }            clearTimeout(searchTimeout);

        });            const query = this.value.trim();

    }            

            if (query.length >= 3) {

    /**                searchTimeout = setTimeout(() => {

     * Effectue une recherche                    performSearch();

     */                }, 500); // Attendre 500ms après la dernière frappe

    async function performSearch() {            }

        const query = searchInput.value.trim();        });

            }

        if (query.length < 2) {

            alert('Digite pelo menos 2 caracteres');    /**

            return;     * Effectue une recherche

        }     */

    function performSearch() {

        currentSearchQuery = query;        const query = searchInput.value.trim();

        openSearchResults();        

        showLoading();        if (query.length < 2) {

                    alert(getTranslation('search.minLength') || 'Digite pelo menos 2 caracteres');

        console.log(`🔍 Recherche lancée pour: "${query}"`);            return;

                }

        try {

            // PRIORITÉ 1: Rechercher dans TMDB        currentSearchQuery = query;

            const tmdbResults = await searchInTMDB(query);        openSearchResults();

                    showLoading();

            if (tmdbResults && tmdbResults.length > 0) {        

                console.log(`✅ ${tmdbResults.length} résultats TMDB trouvés`);        // Tenter d'abord la recherche TMDB, puis fallback sur local

                displayResults(tmdbResults, 'TMDB');        searchInTMDB(query)

            } else {            .then(tmdbResults => {

                console.log('ℹ️ Aucun résultat TMDB, recherche locale...');                if (tmdbResults && tmdbResults.length > 0) {

                // FALLBACK: Recherche locale                    displayResults(tmdbResults, 'TMDB');

                const localResults = searchInLocalCatalog(query);                } else {

                displayResults(localResults, 'Local');                    // Aucun résultat TMDB, chercher en local

            }                    searchInLocalCatalog(query);

        } catch (error) {                }

            console.error('❌ Erreur lors de la recherche TMDB:', error);            })

            // En cas d'erreur, utiliser le catalogue local            .catch(error => {

            const localResults = searchInLocalCatalog(query);                console.warn('Erreur TMDB, recherche locale:', error);

            displayResults(localResults, 'Local');                // En cas d'erreur TMDB, fallback sur recherche locale

        }                searchInLocalCatalog(query);

    }            });

    }

    /**

     * Recherche dans l'API TMDB    /**

     */     * Recherche dans l'API TMDB

    async function searchInTMDB(query) {     */

        try {    async function searchInTMDB(query) {

            console.log('🌐 Appel API TMDB:', `${CONFIG.API_BASE_URL}/api/tmdb/search`);        try {

                        const response = await fetch(`${CONFIG.API_BASE_URL}/api/tmdb/search`, {

            const response = await fetch(`${CONFIG.API_BASE_URL}/api/tmdb/search`, {                method: 'POST',

                method: 'POST',                headers: {

                headers: {                    'Content-Type': 'application/json',

                    'Content-Type': 'application/json',                },

                },                body: JSON.stringify({ query: query })

                body: JSON.stringify({ query: query }),            });

                timeout: 10000

            });            const data = await response.json();



            console.log('📡 Statut de la réponse:', response.status);            if (!response.ok) {

                // Si fallbackToLocal est true, utiliser la recherche locale

            if (!response.ok) {                if (data.fallbackToLocal) {

                const errorData = await response.json();                    throw new Error('Fallback to local search');

                console.warn('⚠️ Erreur API:', errorData);                }

                throw new Error(errorData.error || 'Erreur API');                throw new Error(data.error || 'Erro na pesquisa');

            }            }



            const data = await response.json();            if (data.success && data.results) {

            console.log('📊 Données reçues:', data);                // Convertir les résultats TMDB au format de notre interface

                return data.results.map(movie => ({

            if (!data.success || !data.results || data.results.length === 0) {                    title: movie.titulo,

                console.log('ℹ️ Aucun résultat TMDB');                    year: movie.ano,

                return [];                    rating: movie.avaliacao,

            }                    description: movie.sinopse,

                    image: movie.posterUrl,

            console.log(`✅ ${data.results.length} films trouvés dans TMDB`);                    section: '🌐 TMDB',

                    source: 'tmdb',

            // Convertir au format de notre interface                    tmdbId: movie.id,

            return data.results.map(movie => ({                    votes: movie.numeroVotos,

                title: movie.titulo,                    popularity: movie.popularidade

                year: movie.ano,                }));

                rating: movie.avaliacao,            }

                description: movie.sinopse,

                image: movie.posterUrl,            return [];

                section: '🌐 TMDB',

                source: 'tmdb',        } catch (error) {

                tmdbId: movie.id,            console.error('Erro ao pesquisar no TMDB:', error);

                votes: movie.numeroVotos,            throw error;

                popularity: movie.popularidade        }

            }));    }



        } catch (error) {    /**

            console.error('❌ Erreur searchInTMDB:', error.message);     * Recherche dans le catalogue local

            throw error;     */

        }    function searchInLocalCatalog(query) {

    }        const searchTerm = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        

    /**        const results = allMovies.filter(movie => {

     * Recherche dans le catalogue local            const title = (movie.title || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

     */            const description = (movie.description || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    function searchInLocalCatalog(query) {            const year = (movie.year || '').toString();

        console.log('📁 Recherche dans le catalogue local pour:', query);            

                    return title.includes(searchTerm) || 

        const searchTerm = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');                   description.includes(searchTerm) || 

                           year.includes(searchTerm);

        const results = allMovies.filter(movie => {        });

            const title = (movie.title || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

            const description = (movie.description || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');        displayResults(results);

            const year = (movie.year || '').toString();    }

            

            return title.includes(searchTerm) ||     /**

                   description.includes(searchTerm) ||      * Affiche les résultats de recherche

                   year.includes(searchTerm);     */

        });    function displayResults(results, source = 'Local') {

        const contentDiv = searchOverlay.querySelector('.search-results-content');

        console.log(`📁 ${results.length} résultats locaux trouvés`);        const querySpan = searchOverlay.querySelector('.search-query');

        return results;        const countP = searchOverlay.querySelector('.search-results-count');

    }

        querySpan.textContent = `"${currentSearchQuery}"`;

    /**        

     * Affiche les résultats de recherche        // Message selon la source

     */        let sourceLabel = '';

    function displayResults(results, source = 'Local') {        if (source === 'TMDB') {

        const contentDiv = searchOverlay.querySelector('.search-results-content');            sourceLabel = ' <span style="color: #00d4ff; font-size: 0.9em;">(🌐 Base Mundial TMDB)</span>';

        const querySpan = searchOverlay.querySelector('.search-query');        } else {

        const countP = searchOverlay.querySelector('.search-results-count');            sourceLabel = ' <span style="color: #ffd700; font-size: 0.9em;">(📁 Catálogo Local)</span>';

        }

        querySpan.textContent = `"${currentSearchQuery}"`;        

                if (results.length === 0) {

        let sourceLabel = '';            countP.innerHTML = '0 resultados encontrados';

        if (source === 'TMDB') {        } else if (results.length === 1) {

            sourceLabel = ' <span style="color: #00d4ff; font-size: 0.9em;">(🌐 Base Mundial TMDB)</span>';            countP.innerHTML = '1 resultado encontrado' + sourceLabel;

        } else {        } else {

            sourceLabel = ' <span style="color: #ffd700; font-size: 0.9em;">(📁 Catálogo Local)</span>';            countP.innerHTML = `${results.length} resultados encontrados` + sourceLabel;

        }        }

        

        if (results.length === 0) {        if (results.length === 0) {

            countP.innerHTML = '0 resultados encontrados';            contentDiv.innerHTML = `

        } else if (results.length === 1) {                <div class="search-no-results">

            countP.innerHTML = '1 resultado encontrado' + sourceLabel;                    <div class="search-no-results-icon">🔍</div>

        } else {                    <h2 class="search-no-results-title">Nenhum resultado encontrado</h2>

            countP.innerHTML = `${results.length} resultados encontrados` + sourceLabel;                    <p class="search-no-results-text">Tente usar palavras-chave diferentes</p>

        }                </div>

            `;

        if (results.length === 0) {            return;

            contentDiv.innerHTML = `        }

                <div class="search-no-results">

                    <div class="search-no-results-icon">🔍</div>        const grid = document.createElement('div');

                    <h2 class="search-no-results-title">Nenhum resultado encontrado</h2>        grid.className = 'search-results-grid';

                    <p class="search-no-results-text">Tente usar palavras-chave diferentes</p>

                </div>        results.forEach((item, index) => {

            `;            const card = createResultCard(item, index);

            return;            grid.appendChild(card);

        }        });



        const grid = document.createElement('div');        contentDiv.innerHTML = '';

        grid.className = 'search-results-grid';        contentDiv.appendChild(grid);



        results.forEach((item, index) => {        // Appliquer les traductions si disponibles

            const card = createResultCard(item, index);        if (window.applyTranslations) {

            grid.appendChild(card);            window.applyTranslations();

        });        }

    }

        contentDiv.innerHTML = '';

        contentDiv.appendChild(grid);    /**

    }     * Affiche les résultats de recherche

     */

    /**    function displayResults(results) {

     * Générer les étoiles        const contentDiv = searchOverlay.querySelector('.search-results-content');

     */        const querySpan = searchOverlay.querySelector('.search-query');

    function generateStars(rating) {        const countP = searchOverlay.querySelector('.search-results-count');

        if (!rating || rating === 'N/A' || rating === '—') return '';

                querySpan.textContent = `"${currentSearchQuery}"`;

        const numRating = parseFloat(rating);        countP.textContent = `${results.length} ${getTranslation('search.found') || 'resultados encontrados'}`;

        const maxStars = 5;

        const maxRating = 10;        if (results.length === 0) {

                    contentDiv.innerHTML = `

        const filledStars = Math.round((numRating / maxRating) * maxStars);                <div class="search-no-results">

        const emptyStars = maxStars - filledStars;                    <div class="search-no-results-icon">🔍</div>

                            <h2 class="search-no-results-title" data-i18n="search.noResults">Nenhum resultado encontrado</h2>

        return '★'.repeat(filledStars) + '☆'.repeat(emptyStars);                    <p class="search-no-results-text" data-i18n="search.tryAgain">Tente usar palavras-chave diferentes</p>

    }                </div>

            `;

    /**            return;

     * Crée une carte de résultat        }

     */

    function createResultCard(item, index) {        const grid = document.createElement('div');

        const card = document.createElement('div');        grid.className = 'search-results-grid';

        card.className = 'search-result-card';

        card.style.animationDelay = `${index * 0.05}s`;        results.forEach((item, index) => {

            const card = createResultCard(item, index);

        const title = item.title || 'Sem título';            grid.appendChild(card);

        const year = item.year || '';        });

        const rating = item.rating || 'N/A';

        const description = item.description || 'Sem descrição disponível';        contentDiv.innerHTML = '';

        const section = item.section || '';        contentDiv.appendChild(grid);

        const image = item.image || null;

        const votes = item.votes || 0;        // Appliquer les traductions si disponibles

        const isTMDB = item.source === 'tmdb';        if (window.applyTranslations) {

            window.applyTranslations();

        card.innerHTML = `        }

            <div class="search-result-poster">    }

                ${image ? 

                    `<img src="${image}" alt="${title}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'search-result-no-poster\\'><svg viewBox=\\'0 0 24 24\\' fill=\\'currentColor\\'><path d=\\'M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12z\\'/></svg><span>Sem imagem</span></div>'">` :    /**

                    `<div class="search-result-no-poster">     * Générer les étoiles en fonction de la note

                        <svg viewBox="0 0 24 24" fill="currentColor">     */

                            <path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12z"/>    function generateStars(rating) {

                        </svg>        if (!rating || rating === 'N/A' || rating === '—') return '';

                        <span>Sem imagem</span>        

                    </div>`        const numRating = parseFloat(rating);

                }        const maxStars = 5;

                ${section ? `<span class="search-result-type">${section}</span>` : ''}        const maxRating = 10;

                ${rating !== 'N/A' && rating !== '—' ? `        

                    <span class="search-result-rating">        // Calculer le nombre d'étoiles pleines (sur 5)

                        <span class="stars">${generateStars(rating)}</span>        const filledStars = Math.round((numRating / maxRating) * maxStars);

                        <span>${rating}</span>        const emptyStars = maxStars - filledStars;

                        ${isTMDB && votes > 0 ? `<span style="font-size: 0.75em; opacity: 0.8;">(${votes.toLocaleString('pt-BR')} votos)</span>` : ''}        

                    </span>        return '★'.repeat(filledStars) + '☆'.repeat(emptyStars);

                ` : ''}    }

            </div>

            <div class="search-result-info">    /**

                <h3 class="search-result-title">${title}</h3>     * Crée une carte de résultat

                ${year ? `<p class="search-result-year">${year}</p>` : ''}     */

                <p class="search-result-overview">${description}</p>    function createResultCard(item, index) {

                ${isTMDB ? '<p style="font-size: 0.75em; color: #00d4ff; margin-top: 8px;">🌐 Informações do TMDB</p>' : ''}        const card = document.createElement('div');

            </div>        card.className = 'search-result-card';

        `;        card.style.animationDelay = `${index * 0.05}s`;



        card.addEventListener('click', function() {        const title = item.title || 'Sem título';

            console.log('Film cliqué:', item);        const year = item.year || '';

            showItemDetails(item);        const rating = item.rating || 'N/A';

        });        const description = item.description || 'Sem descrição disponível';

        const section = item.section || '';

        return card;        const image = item.image || null;

    }        const votes = item.votes || 0;

        const isTMDB = item.source === 'tmdb';

    /**

     * Affiche les détails        card.innerHTML = `

     */            <div class="search-result-poster">

    function showItemDetails(item) {                ${image ? 

        const title = item.title;                    `<img src="${image}" alt="${title}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'search-result-no-poster\\'><svg viewBox=\\'0 0 24 24\\' fill=\\'currentColor\\'><path d=\\'M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12z\\'/></svg><span>Sem imagem</span></div>'">` :

        let details = `📽️ ${title}\n\n`;                    `<div class="search-result-no-poster">

                                <svg viewBox="0 0 24 24" fill="currentColor">

        if (item.year) {                            <path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12z"/>

            details += `📅 Ano: ${item.year}\n`;                        </svg>

        }                        <span>Sem imagem</span>

                            </div>`

        if (item.rating && item.rating !== '—') {                }

            details += `⭐ Nota: ${item.rating}\n`;                ${section ? `<span class="search-result-type">${section}</span>` : ''}

        }                ${rating !== 'N/A' && rating !== '—' ? `

                            <span class="search-result-rating">

        if (item.section) {                        <span class="stars">${generateStars(rating)}</span>

            details += `📂 Seção: ${item.section}\n`;                        <span>${rating}</span>

        }                        ${isTMDB && votes > 0 ? `<span style="font-size: 0.75em; opacity: 0.8;">(${votes.toLocaleString('pt-BR')} votos)</span>` : ''}

                            </span>

        details += `\n${item.description || 'Sem descrição disponível'}`;                ` : ''}

                    </div>

        alert(details);            <div class="search-result-info">

    }                <h3 class="search-result-title">${title}</h3>

                ${year ? `<p class="search-result-year">${year}</p>` : ''}

    /**                <p class="search-result-overview">${description}</p>

     * Affiche le chargement                ${isTMDB ? '<p style="font-size: 0.75em; color: #00d4ff; margin-top: 8px;">🌐 Informações do TMDB</p>' : ''}

     */            </div>

    function showLoading() {        `;

        const contentDiv = searchOverlay.querySelector('.search-results-content');

        contentDiv.innerHTML = `        // Événement de clic

            <div class="search-loading">        card.addEventListener('click', function() {

                <div class="search-spinner"></div>            console.log('Clicado em:', item);

                <p class="search-loading-text">🔍 Procurando na base mundial TMDB...</p>            showItemDetails(item);

            </div>        });

        `;

    }        return card;

    }

    /**

     * Ouvre l'overlay    /**

     */     * Affiche les détails d'un film/série

    function openSearchResults() {     */

        searchOverlay.classList.add('active');    function showItemDetails(item) {

        document.body.style.overflow = 'hidden';        const title = item.title;

    }        let details = `📽️ ${title}\n\n`;

        

    /**        if (item.year) {

     * Ferme l'overlay            details += `📅 Ano: ${item.year}\n`;

     */        }

    function closeSearchResults() {        

        searchOverlay.classList.remove('active');        if (item.rating && item.rating !== '—') {

        document.body.style.overflow = '';            details += `⭐ Nota: ${item.rating}\n`;

    }        }

        

    // Exposer globalement        if (item.section) {

    window.searchModule = {            details += `📂 Seção: ${item.section}\n`;

        search: performSearch,        }

        close: closeSearchResults,        

        reloadCatalog: loadLocalCatalog        details += `\n${item.description || 'Sem descrição disponível'}`;

    };        

        alert(details);

    console.log('✅ Module de recherche initialisé');    }

})();

    /**
     * Affiche le spinner de chargement
     */
    function showLoading() {
        const contentDiv = searchOverlay.querySelector('.search-results-content');
        contentDiv.innerHTML = `
            <div class="search-loading">
                <div class="search-spinner"></div>
                <p class="search-loading-text">Procurando...</p>
            </div>
        `;
    }

    /**
     * Affiche un message d'erreur
     */
    function showError(message) {
        const contentDiv = searchOverlay.querySelector('.search-results-content');
        contentDiv.innerHTML = `
            <div class="search-no-results">
                <div class="search-no-results-icon">⚠️</div>
                <h2 class="search-no-results-title">Erro</h2>
                <p class="search-no-results-text">${message}</p>
            </div>
        `;
    }

    /**
     * Affiche le spinner de chargement
     */
    function showLoading() {
        const contentDiv = searchOverlay.querySelector('.search-results-content');
        contentDiv.innerHTML = `
            <div class="search-loading">
                <div class="search-spinner"></div>
                <p class="search-loading-text" data-i18n="search.loading">Procurando...</p>
            </div>
        `;
    }

    /**
     * Affiche un message d'erreur
     */
    function showError(message) {
        const contentDiv = searchOverlay.querySelector('.search-results-content');
        contentDiv.innerHTML = `
            <div class="search-no-results">
                <div class="search-no-results-icon">⚠️</div>
                <h2 class="search-no-results-title">Erro</h2>
                <p class="search-no-results-text">${message}</p>
            </div>
        `;
    }

    /**
     * Ouvre l'overlay de résultats
     */
    function openSearchResults() {
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Ferme l'overlay de résultats
     */
    function closeSearchResults() {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    /**
     * Récupère une traduction
     */
    function getTranslation(key) {
        if (window.t && typeof window.t === 'function') {
            return window.t(key);
        }
        return null;
    }

    // Exposer des fonctions globalement si nécessaire
    window.searchModule = {
        search: performSearch,
        close: closeSearchResults,
        reloadCatalog: loadLocalCatalog
    };
})();
