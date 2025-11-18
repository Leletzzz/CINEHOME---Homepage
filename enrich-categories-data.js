/**
 * Script pour enrichir automatiquement les données des catégories avec l'API TMDB
 * Ce script ajoute des informations supplémentaires comme :
 * - ID TMDB
 * - Genres détaillés
 * - Durée du film
 * - Note moyenne TMDB
 * - Nombre de votes
 * - Budget et revenus
 * - Trailer/Videos
 * - Cast principal
 */

const TMDB_ENRICHER = {
    apiKey: null,
    baseUrl: 'https://api.themoviedb.org/3',
    
    /**
     * Initialise l'enrichisseur avec la clé API
     */
    init() {
        this.apiKey = localStorage.getItem('tmdb_api_key');
        if (!this.apiKey) {
            console.error('❌ API TMDB non configurée. Veuillez configurer dans les paramètres.');
            return false;
        }
        console.log('✅ TMDB Enricher initialisé');
        return true;
    },
    
    /**
     * Recherche un film par nom et année
     */
    async searchMovie(title, year) {
        try {
            const searchUrl = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(title)}&year=${year}&language=pt-BR`;
            const response = await fetch(searchUrl);
            
            if (!response.ok) {
                throw new Error(`Erreur API: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
                return data.results[0]; // Retourne le premier résultat
            }
            
            return null;
        } catch (error) {
            console.error(`❌ Erreur recherche "${title}":`, error);
            return null;
        }
    },
    
    /**
     * Récupère les détails complets d'un film
     */
    async getMovieDetails(movieId) {
        try {
            const detailsUrl = `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&language=pt-BR&append_to_response=credits,videos,keywords,similar`;
            const response = await fetch(detailsUrl);
            
            if (!response.ok) {
                throw new Error(`Erreur API: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`❌ Erreur détails film ${movieId}:`, error);
            return null;
        }
    },
    
    /**
     * Enrichit un film avec des données TMDB
     */
    async enrichMovie(movie) {
        console.log(`🔍 Recherche: ${movie.title} (${movie.year})`);
        
        // 1. Rechercher le film
        const searchResult = await this.searchMovie(movie.title, movie.year);
        
        if (!searchResult) {
            console.warn(`⚠️ Film non trouvé: ${movie.title}`);
            return movie;
        }
        
        // 2. Récupérer les détails complets
        const details = await this.getMovieDetails(searchResult.id);
        
        if (!details) {
            console.warn(`⚠️ Détails non disponibles: ${movie.title}`);
            return movie;
        }
        
        // 3. Enrichir les données
        const enrichedMovie = {
            ...movie,
            tmdb_id: details.id,
            original_title: details.original_title,
            genres: details.genres.map(g => g.name),
            runtime: details.runtime,
            vote_average: details.vote_average,
            vote_count: details.vote_count,
            popularity: details.popularity,
            budget: details.budget,
            revenue: details.revenue,
            tagline: details.tagline,
            overview: details.overview,
            release_date: details.release_date,
            
            // Cast principal (5 premiers acteurs)
            cast: details.credits?.cast?.slice(0, 5).map(actor => ({
                name: actor.name,
                character: actor.character,
                profile_path: actor.profile_path
            })) || [],
            
            // Réalisateur
            director: details.credits?.crew?.find(person => person.job === 'Director')?.name || 'N/A',
            
            // Trailer YouTube
            trailer: details.videos?.results?.find(video => 
                video.type === 'Trailer' && video.site === 'YouTube'
            )?.key || null,
            
            // Mots-clés
            keywords: details.keywords?.keywords?.map(k => k.name) || [],
            
            // Films similaires
            similar_movies: details.similar?.results?.slice(0, 5).map(m => ({
                id: m.id,
                title: m.title,
                poster_path: m.poster_path
            })) || []
        };
        
        console.log(`✅ Enrichi: ${movie.title}`);
        return enrichedMovie;
    },
    
    /**
     * Enrichit toutes les catégories
     */
    async enrichAllCategories() {
        if (!this.init()) {
            return;
        }
        
        console.log('🚀 Début de l\'enrichissement des données...\n');
        
        const enrichedData = {};
        let totalMovies = 0;
        let enrichedCount = 0;
        
        for (const [categoryKey, categoryData] of Object.entries(window.CATEGORIES_DATA)) {
            console.log(`\n📁 Catégorie: ${categoryData.title}`);
            enrichedData[categoryKey] = {
                title: categoryData.title,
                items: []
            };
            
            for (const movie of categoryData.items) {
                totalMovies++;
                const enrichedMovie = await this.enrichMovie(movie);
                enrichedData[categoryKey].items.push(enrichedMovie);
                
                if (enrichedMovie.tmdb_id) {
                    enrichedCount++;
                }
                
                // Pause pour éviter de dépasser les limites de l'API
                await this.sleep(250);
            }
        }
        
        console.log('\n\n✨ Enrichissement terminé!');
        console.log(`📊 Statistiques:`);
        console.log(`   - Total de films: ${totalMovies}`);
        console.log(`   - Films enrichis: ${enrichedCount}`);
        console.log(`   - Taux de succès: ${((enrichedCount/totalMovies)*100).toFixed(1)}%`);
        
        return enrichedData;
    },
    
    /**
     * Sauvegarde les données enrichies
     */
    saveEnrichedData(enrichedData) {
        const jsonData = JSON.stringify(enrichedData, null, 2);
        
        // Créer un blob et télécharger
        const blob = new Blob([`window.CATEGORIES_DATA_ENRICHED = ${jsonData};`], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'categories-data-enriched.js';
        a.click();
        URL.revokeObjectURL(url);
        
        console.log('💾 Données sauvegardées dans: categories-data-enriched.js');
    },
    
    /**
     * Affiche un aperçu des données enrichies
     */
    displayPreview(enrichedData) {
        console.log('\n\n📋 APERÇU DES DONNÉES ENRICHIES:\n');
        
        for (const [categoryKey, categoryData] of Object.entries(enrichedData)) {
            console.log(`\n🎬 ${categoryData.title}`);
            console.log('─'.repeat(50));
            
            categoryData.items.slice(0, 2).forEach(movie => {
                console.log(`\n📽️ ${movie.title} (${movie.year})`);
                console.log(`   ID TMDB: ${movie.tmdb_id || 'N/A'}`);
                console.log(`   Durée: ${movie.runtime || 'N/A'} min`);
                console.log(`   Note: ⭐ ${movie.vote_average || movie.rating}/10 (${movie.vote_count || 0} votes)`);
                console.log(`   Genres: ${movie.genres?.join(', ') || 'N/A'}`);
                console.log(`   Réalisateur: ${movie.director || 'N/A'}`);
                console.log(`   Tagline: ${movie.tagline || 'N/A'}`);
                console.log(`   Cast: ${movie.cast?.map(c => c.name).join(', ') || 'N/A'}`);
                console.log(`   Trailer: ${movie.trailer ? `https://youtube.com/watch?v=${movie.trailer}` : 'N/A'}`);
            });
        }
    },
    
    /**
     * Utilitaire: pause
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

// Interface utilisateur dans la console
console.log(`
╔══════════════════════════════════════════════════════════════╗
║         🎬 TMDB CATEGORIES DATA ENRICHER 🎬                  ║
╚══════════════════════════════════════════════════════════════╝

📖 INSTRUCTIONS:

1️⃣  Assurez-vous que votre API TMDB est configurée
2️⃣  Exécutez: await enrichAndSave()
3️⃣  Attendez la fin du processus (peut prendre quelques minutes)
4️⃣  Le fichier sera téléchargé automatiquement

🔧 COMMANDES DISPONIBLES:

   enrichAndSave()          - Enrichir et sauvegarder automatiquement
   enrichAndPreview()       - Enrichir et afficher un aperçu
   testOne(title, year)     - Tester un seul film
   
💡 EXEMPLES:

   await enrichAndSave()
   await enrichAndPreview()
   await testOne("Parasita", "2019")

╔══════════════════════════════════════════════════════════════╗
`);

// Fonctions helper globales
window.enrichAndSave = async function() {
    const enrichedData = await TMDB_ENRICHER.enrichAllCategories();
    if (enrichedData) {
        TMDB_ENRICHER.saveEnrichedData(enrichedData);
    }
};

window.enrichAndPreview = async function() {
    const enrichedData = await TMDB_ENRICHER.enrichAllCategories();
    if (enrichedData) {
        TMDB_ENRICHER.displayPreview(enrichedData);
    }
};

window.testOne = async function(title, year) {
    if (!TMDB_ENRICHER.init()) return;
    
    const testMovie = { title, year, rating: '0', image: '', description: '' };
    const enriched = await TMDB_ENRICHER.enrichMovie(testMovie);
    
    console.log('\n📊 RÉSULTAT DU TEST:\n', enriched);
    return enriched;
};

// Auto-init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('✅ TMDB Enricher chargé et prêt!');
    });
} else {
    console.log('✅ TMDB Enricher chargé et prêt!');
}
