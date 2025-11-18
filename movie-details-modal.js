/**
 * Movie Details Modal - Affiche les détails enrichis TMDB
 */

const MovieDetailsModal = {
    overlay: null,
    currentMovie: null,
    
    /**
     * Initialise le modal
     */
    init() {
        this.createModal();
        this.attachEvents();
        console.log('✅ Movie Details Modal initialisé');
    },
    
    /**
     * Crée la structure HTML du modal
     */
    createModal() {
        const modal = document.createElement('div');
        modal.className = 'movie-modal-overlay';
        modal.id = 'movie-details-modal';
        modal.innerHTML = `
            <button class="movie-modal-close" aria-label="Fermer">&times;</button>
            <div class="movie-modal-container" id="movie-modal-content">
                <div class="movie-modal-loading">
                    <div class="movie-modal-spinner"></div>
                    <p>Chargement des détails...</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.overlay = modal;
    },
    
    /**
     * Attache les événements
     */
    attachEvents() {
        // Fermeture au clic sur le bouton
        const closeBtn = this.overlay.querySelector('.movie-modal-close');
        closeBtn.addEventListener('click', () => this.close());
        
        // Fermeture au clic sur l'overlay (en dehors du contenu)
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });
        
        // Fermeture avec la touche Echap
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
                this.close();
            }
        });
    },
    
    /**
     * Ouvre le modal avec les détails d'un film
     */
    async open(movieData) {
        this.currentMovie = movieData;
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Empêcher le scroll
        
        // Afficher le loading
        const container = document.getElementById('movie-modal-content');
        container.innerHTML = `
            <div class="movie-modal-loading">
                <div class="movie-modal-spinner"></div>
                <p>Chargement des détails enrichis...</p>
            </div>
        `;
        
        // Si le film n'est pas enrichi, essayer de l'enrichir
        if (!movieData.tmdb_id && window.CategoriesTMDBManager) {
            console.log('🔄 Enrichissement du film...');
            movieData = await CategoriesTMDBManager.enrichMovie(movieData);
        }
        
        // Afficher les détails
        this.renderDetails(movieData);
    },
    
    /**
     * Ferme le modal
     */
    close() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = ''; // Réactiver le scroll
        this.currentMovie = null;
    },
    
    /**
     * Génère les étoiles
     */
    generateStars(rating) {
        const numRating = parseFloat(rating);
        const maxStars = 5;
        const maxRating = 10;
        const filledStars = Math.round((numRating / maxRating) * maxStars);
        const emptyStars = maxStars - filledStars;
        return '★'.repeat(filledStars) + '☆'.repeat(emptyStars);
    },
    
    /**
     * Formate les nombres (budget, revenue)
     */
    formatCurrency(amount) {
        if (!amount || amount === 0) return 'N/A';
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(amount);
    },
    
    /**
     * Formate la durée
     */
    formatRuntime(minutes) {
        if (!minutes) return 'N/A';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}min`;
    },
    
    /**
     * Affiche les détails du film
     */
    renderDetails(movie) {
        const isEnriched = !!movie.tmdb_id;
        const backdrop = movie.backdrop_path || movie.image;
        const rating = movie.vote_average || movie.rating;
        
        const html = `
            <div class="movie-modal-header">
                <img class="movie-modal-backdrop" 
                     src="${backdrop}" 
                     alt="${movie.title}"
                     onerror="this.src='${movie.image}'">
                <div class="movie-modal-header-gradient"></div>
                <div class="movie-modal-header-content">
                    <h1 class="movie-modal-title">${movie.title}</h1>
                    ${movie.tagline ? `<p class="movie-modal-tagline">"${movie.tagline}"</p>` : ''}
                    <div class="movie-modal-meta">
                        <div class="movie-modal-meta-item">
                            📅 ${movie.year}
                        </div>
                        ${movie.runtime ? `
                            <div class="movie-modal-meta-item">
                                ⏱️ ${this.formatRuntime(movie.runtime)}
                            </div>
                        ` : ''}
                        <div class="movie-modal-meta-item movie-modal-rating">
                            <span class="stars">${this.generateStars(rating)}</span>
                            <span>${parseFloat(rating).toFixed(1)}/10</span>
                            ${movie.vote_count ? `<span style="opacity: 0.7;">(${movie.vote_count.toLocaleString()} votes)</span>` : ''}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="movie-modal-body">
                ${isEnriched ? `
                    <div class="movie-modal-enriched-badge">
                        ✨ Données enrichies TMDB
                    </div>
                ` : ''}
                
                <!-- Synopsis -->
                <div class="movie-modal-section">
                    <h2 class="movie-modal-section-title">📖 Synopsis</h2>
                    <p class="movie-modal-overview">${movie.overview || movie.description || 'Description non disponible.'}</p>
                </div>
                
                ${movie.genres && movie.genres.length > 0 ? `
                    <!-- Genres -->
                    <div class="movie-modal-section">
                        <h2 class="movie-modal-section-title">🎭 Genres</h2>
                        <div class="movie-modal-genres">
                            ${movie.genres.map(genre => `
                                <span class="movie-modal-genre-tag">${genre}</span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                ${movie.cast && movie.cast.length > 0 ? `
                    <!-- Cast -->
                    <div class="movie-modal-section">
                        <h2 class="movie-modal-section-title">🎬 Distribution</h2>
                        <div class="movie-modal-cast-grid">
                            ${movie.cast.map(actor => `
                                <div class="movie-modal-cast-card">
                                    <img class="movie-modal-cast-image" 
                                         src="${actor.profile_path || 'https://via.placeholder.com/185x278?text=' + encodeURIComponent(actor.name)}" 
                                         alt="${actor.name}"
                                         onerror="this.src='https://via.placeholder.com/185x278?text=${encodeURIComponent(actor.name)}'">
                                    <div class="movie-modal-cast-info">
                                        <div class="movie-modal-cast-name">${actor.name}</div>
                                        <div class="movie-modal-cast-character">${actor.character}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                ${isEnriched ? `
                    <!-- Informations supplémentaires -->
                    <div class="movie-modal-section">
                        <h2 class="movie-modal-section-title">ℹ️ Informations</h2>
                        <div class="movie-modal-info-grid">
                            ${movie.director ? `
                                <div class="movie-modal-info-item">
                                    <div class="movie-modal-info-label">Réalisateur</div>
                                    <div class="movie-modal-info-value">${movie.director}</div>
                                </div>
                            ` : ''}
                            ${movie.original_title && movie.original_title !== movie.title ? `
                                <div class="movie-modal-info-item">
                                    <div class="movie-modal-info-label">Titre Original</div>
                                    <div class="movie-modal-info-value">${movie.original_title}</div>
                                </div>
                            ` : ''}
                            ${movie.release_date ? `
                                <div class="movie-modal-info-item">
                                    <div class="movie-modal-info-label">Date de Sortie</div>
                                    <div class="movie-modal-info-value">${new Date(movie.release_date).toLocaleDateString('pt-BR')}</div>
                                </div>
                            ` : ''}
                            ${movie.budget ? `
                                <div class="movie-modal-info-item">
                                    <div class="movie-modal-info-label">Budget</div>
                                    <div class="movie-modal-info-value">${this.formatCurrency(movie.budget)}</div>
                                </div>
                            ` : ''}
                            ${movie.revenue ? `
                                <div class="movie-modal-info-item">
                                    <div class="movie-modal-info-label">Revenus</div>
                                    <div class="movie-modal-info-value">${this.formatCurrency(movie.revenue)}</div>
                                </div>
                            ` : ''}
                            ${movie.popularity ? `
                                <div class="movie-modal-info-item">
                                    <div class="movie-modal-info-label">Popularité TMDB</div>
                                    <div class="movie-modal-info-value">${movie.popularity.toFixed(1)}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}
                
                ${movie.keywords && movie.keywords.length > 0 ? `
                    <!-- Mots-clés -->
                    <div class="movie-modal-section">
                        <h2 class="movie-modal-section-title">🏷️ Mots-clés</h2>
                        <div class="movie-modal-keywords">
                            ${movie.keywords.map(keyword => `
                                <span class="movie-modal-keyword-tag">${keyword}</span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                ${movie.trailer ? `
                    <!-- Trailer -->
                    <div class="movie-modal-section">
                        <h2 class="movie-modal-section-title">🎥 Bande-annonce</h2>
                        <div class="movie-modal-trailer">
                            <iframe 
                                src="https://www.youtube.com/embed/${movie.trailer}?rel=0" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                            </iframe>
                        </div>
                    </div>
                ` : ''}
                
                ${!isEnriched ? `
                    <div class="movie-modal-section">
                        <div class="movie-modal-no-data">
                            ℹ️ Configurez l'API TMDB pour voir plus de détails enrichis
                            (cast, réalisateur, trailer, budget, etc.)
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
        
        const container = document.getElementById('movie-modal-content');
        container.innerHTML = html;
    }
};

// Initialiser au chargement de la page
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => MovieDetailsModal.init());
} else {
    MovieDetailsModal.init();
}

// Export global
window.MovieDetailsModal = MovieDetailsModal;
