/**
 * Categories TMDB Manager - Enrichit automatiquement les données avec TMDB
 * Utilise un cache pour éviter les appels répétés à l'API
 */

const CategoriesTMDBManager = {
    cache: new Map(),
    apiKey: null,
    baseUrl: 'https://api.themoviedb.org/3',
    
    /**
     * Initialise le manager
     */
    init() {
        this.apiKey = localStorage.getItem('tmdb_api_key');
        
        // Charger le cache depuis localStorage
        try {
            const savedCache = localStorage.getItem('tmdb_movies_cache');
            if (savedCache) {
                const parsed = JSON.parse(savedCache);
                this.cache = new Map(Object.entries(parsed));
                console.log(`✅ ${this.cache.size} films chargés du cache`);
            }
        } catch (error) {
            console.warn('⚠️ Erreur chargement cache:', error);
        }
        
        return !!(this.apiKey && this.apiKey.trim().length > 0);
    },
    
    /**
     * Sauvegarde le cache
     */
    saveCache() {
        try {
            const cacheObj = Object.fromEntries(this.cache);
            localStorage.setItem('tmdb_movies_cache', JSON.stringify(cacheObj));
        } catch (error) {
            console.warn('⚠️ Erreur sauvegarde cache:', error);
        }
    },
    
    /**
     * Génère une clé de cache unique
     */
    getCacheKey(title, year) {
        return `${title.toLowerCase().trim()}_${year}`;
    },
    
    /**
     * Recherche un film dans TMDB
     */
    async searchMovie(title, year) {
        const cacheKey = this.getCacheKey(title, year);
        
        // Vérifier le cache
        if (this.cache.has(cacheKey)) {
            console.log(`💾 Cache hit: ${title}`);
            return this.cache.get(cacheKey);
        }
        
        if (!this.apiKey) {
            console.warn('⚠️ API TMDB non configurée');
            return null;
        }
        
        try {
            // 1. Rechercher le film
            const searchUrl = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(title)}&year=${year}&language=pt-BR`;
            const searchResponse = await fetch(searchUrl);
            
            if (!searchResponse.ok) {
                throw new Error(`Erreur API: ${searchResponse.status}`);
            }
            
            const searchData = await searchResponse.json();
            
            if (!searchData.results || searchData.results.length === 0) {
                console.warn(`⚠️ Film non trouvé: ${title} (${year})`);
                return null;
            }
            
            const movieId = searchData.results[0].id;
            
            // 2. Récupérer les détails complets
            const detailsUrl = `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&language=pt-BR&append_to_response=credits,videos,keywords`;
            const detailsResponse = await fetch(detailsUrl);
            
            if (!detailsResponse.ok) {
                throw new Error(`Erreur détails: ${detailsResponse.status}`);
            }
            
            const details = await detailsResponse.json();
            
            // 3. Formatter les données enrichies
            const enrichedData = {
                tmdb_id: details.id,
                original_title: details.original_title,
                genres: details.genres?.map(g => g.name) || [],
                runtime: details.runtime || 0,
                vote_average: details.vote_average || 0,
                vote_count: details.vote_count || 0,
                popularity: details.popularity || 0,
                budget: details.budget || 0,
                revenue: details.revenue || 0,
                tagline: details.tagline || '',
                overview: details.overview || '',
                release_date: details.release_date || '',
                backdrop_path: details.backdrop_path ? `https://image.tmdb.org/t/p/original${details.backdrop_path}` : null,
                
                // Cast (5 premiers)
                cast: details.credits?.cast?.slice(0, 5).map(actor => ({
                    name: actor.name,
                    character: actor.character,
                    profile_path: actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : null
                })) || [],
                
                // Réalisateur
                director: details.credits?.crew?.find(person => person.job === 'Director')?.name || '',
                
                // Trailer
                trailer: details.videos?.results?.find(video => 
                    video.type === 'Trailer' && video.site === 'YouTube'
                )?.key || null,
                
                // Mots-clés
                keywords: details.keywords?.keywords?.slice(0, 5).map(k => k.name) || []
            };
            
            // 4. Sauvegarder dans le cache
            this.cache.set(cacheKey, enrichedData);
            this.saveCache();
            
            console.log(`✅ ${title} enrichi et mis en cache`);
            
            return enrichedData;
            
        } catch (error) {
            console.error(`❌ Erreur enrichissement ${title}:`, error);
            return null;
        }
    },
    
    /**
     * Enrichit un film avec les données TMDB
     */
    async enrichMovie(movie) {
        const enrichedData = await this.searchMovie(movie.title, movie.year);
        
        if (!enrichedData) {
            return movie; // Retourner les données originales si échec
        }
        
        return {
            ...movie,
            ...enrichedData
        };
    },
    
    /**
     * Enrichit toutes les catégories
     */
    async enrichCategories(categories) {
        if (!this.init()) {
            console.warn('⚠️ TMDB non configuré, utilisation des données de base');
            return categories;
        }
        
        const enrichedCategories = {};
        
        for (const [categoryKey, categoryData] of Object.entries(categories)) {
            enrichedCategories[categoryKey] = {
                ...categoryData,
                items: []
            };
            
            for (const movie of categoryData.items) {
                const enriched = await this.enrichMovie(movie);
                enrichedCategories[categoryKey].items.push(enriched);
            }
        }
        
        return enrichedCategories;
    },
    
    /**
     * Enrichit une seule catégorie
     */
    async enrichCategory(categoryData) {
        if (!this.init()) {
            console.warn('⚠️ TMDB non configuré, utilisation des données de base');
            return categoryData;
        }
        
        const enrichedItems = [];
        
        for (const movie of categoryData.items) {
            const enriched = await this.enrichMovie(movie);
            enrichedItems.push(enriched);
        }
        
        return {
            ...categoryData,
            items: enrichedItems
        };
    },
    
    /**
     * Nettoie le cache
     */
    clearCache() {
        this.cache.clear();
        localStorage.removeItem('tmdb_movies_cache');
        console.log('🗑️ Cache nettoyé');
    },
    
    /**
     * Affiche les statistiques du cache
     */
    getCacheStats() {
        return {
            size: this.cache.size,
            keys: Array.from(this.cache.keys())
        };
    }
};

// Export global
window.CategoriesTMDBManager = CategoriesTMDBManager;

console.log('✅ Categories TMDB Manager chargé');
