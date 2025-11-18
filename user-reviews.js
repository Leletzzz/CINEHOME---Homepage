/**
 * User Reviews System - CINEMAF
 * Système de gestion des évaluations et commentaires des utilisateurs
 * Backend: MongoDB via API REST
 */

console.log('🚀🚀🚀 USER-REVIEWS.JS CARREGADO! 🚀🚀🚀');
console.log('📍 Script URL:', document.currentScript ? document.currentScript.src : 'unknown');

const UserReviews = {
    currentRating: 0,
    currentMovieId: null,
    
    // Détection automatique de l'URL de l'API backend
    get apiBaseUrl() {
        // En production sur Render ou en développement local avec même domaine
        const hostname = window.location.hostname;
        const protocol = window.location.protocol;
        const port = window.location.port;
        
        console.log('🌐 Détection de l\'environnement:', { hostname, protocol, port });
        
        // Si on est sur Render (cinehome.onrender.com) ou localhost avec le backend sur le même port
        if (hostname === 'cinehome.onrender.com' || 
            (hostname === 'localhost' && port === '3001') ||
            (hostname === '127.0.0.1' && port === '3001')) {
            const baseUrl = `${protocol}//${hostname}${port ? ':' + port : ''}/api/reviews`;
            console.log('✅ Mode Production/Backend: API =', baseUrl);
            return baseUrl;
        }
        
        // Développement local (serveur front sur port 5500, backend sur 3001)
        const backendUrl = 'http://localhost:3001/api/reviews';
        console.log('✅ Mode Développement: API =', backendUrl);
        return backendUrl;
    },

    // Inicializar o sistema
    init() {
        console.log('🎬 UserReviews: Inicializando sistema de avaliações...');
        console.log('🌐 API Base URL:', this.apiBaseUrl);
        console.log('🌍 Hostname:', window.location.hostname);
        console.log('📍 Full URL:', window.location.href);
        console.log('🔗 URL completa da API:', this.apiBaseUrl);
        
        // Obter ID do filme da URL
        const urlParams = new URLSearchParams(window.location.search);
        this.currentMovieId = urlParams.get('id');

        if (!this.currentMovieId) {
            console.warn('⚠️ ID do filme não encontrado na URL');
            return;
        }

        console.log('🎬 Movie ID:', this.currentMovieId);

        this.setupEventListeners();
        this.loadReviews();
        this.updateCharCount();
        
        console.log('✅ UserReviews: Sistema pronto!');
    },

    // Configurar event listeners
    setupEventListeners() {
        console.log('🔧 setupEventListeners: Iniciando configuração...');
        
        // Estrelas de rating
        const stars = document.querySelectorAll('.star-input');
        
        if (stars.length === 0) {
            console.error('❌ ERRO CRÍTICO: Nenhuma estrela encontrada no DOM!');
            console.log('🔍 Verificando se elemento star-rating-input existe:', 
                document.getElementById('star-rating-input'));
            console.log('🔍 HTML do body:', document.body.innerHTML.substring(0, 500));
            return;
        }
        
        console.log(`✅ ${stars.length} estrelas encontradas`);
        
        stars.forEach((star, index) => {
            console.log(`🌟 Configurando estrela ${index + 1}:`, {
                element: star,
                dataValue: star.dataset.value,
                classes: star.className
            });
            
            star.addEventListener('click', (e) => {
                console.log(`🖱️ CLIQUE na estrela ${e.target.dataset.value}`);
                this.setRating(parseInt(e.target.dataset.value));
            });

            star.addEventListener('mouseenter', (e) => {
                console.log(`🖱️ HOVER na estrela ${e.target.dataset.value}`);
                this.highlightStars(parseInt(e.target.dataset.value));
            });
        });
        
        console.log('✅ Event listeners das estrelas configurados');

        const ratingContainer = document.getElementById('star-rating-input');
        if (ratingContainer) {
            ratingContainer.addEventListener('mouseleave', () => {
                console.log('🖱️ Mouse saiu do container de estrelas');
                this.highlightStars(this.currentRating);
            });
            console.log('✅ Container de rating configurado');
        } else {
            console.warn('⚠️ Container star-rating-input não encontrado');
        }

        // Contador de caracteres
        const textarea = document.getElementById('user-comment');
        if (textarea) {
            textarea.addEventListener('input', () => {
                this.updateCharCount();
            });
            console.log('✅ Textarea configurado:', {
                id: textarea.id,
                value: textarea.value,
                maxLength: textarea.maxLength
            });
        } else {
            console.error('❌ ERRO: Textarea user-comment não encontrado!');
        }

        // Botão de envio
        const submitBtn = document.getElementById('submit-review-btn');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                console.log('🖱️ CLIQUE no botão Publicar Avaliação');
                this.submitReview();
            });
            console.log('✅ Botão de envio configurado:', {
                id: submitBtn.id,
                disabled: submitBtn.disabled,
                innerHTML: submitBtn.innerHTML.substring(0, 50)
            });
        } else {
            console.error('❌ ERRO: Botão submit-review-btn não encontrado!');
        }
        
        console.log('🔧 setupEventListeners: Configuração concluída!');
    },

    // Destacar estrelas
    highlightStars(count) {
        console.log(`🌟 highlightStars chamado com count: ${count}`);
        const stars = document.querySelectorAll('.star-input');
        console.log(`🌟 Estrelas encontradas para highlight: ${stars.length}`);
        
        stars.forEach((star, index) => {
            if (index < count) {
                star.textContent = '★';
                star.classList.add('filled');
                console.log(`  ⭐ Estrela ${index + 1}: preenchida`);
            } else {
                star.textContent = '☆';
                star.classList.remove('filled');
                console.log(`  ☆ Estrela ${index + 1}: vazia`);
            }
        });
    },

    // Definir rating
    setRating(value) {
        console.log(`⭐ setRating chamado com value: ${value}`);
        this.currentRating = value;
        this.highlightStars(value);
        
        const ratingValue = document.getElementById('rating-value');
        if (ratingValue) {
            ratingValue.textContent = `${value}/5`;
            console.log(`✅ Rating value atualizado: ${value}/5`);
        } else {
            console.warn('⚠️ Elemento rating-value não encontrado');
        }
    },

    // Atualizar contador de caracteres
    updateCharCount() {
        const textarea = document.getElementById('user-comment');
        const charCount = document.getElementById('char-count');
        
        if (textarea && charCount) {
            const length = textarea.value.length;
            charCount.textContent = `${length}/500`;
            
            if (length > 450) {
                charCount.style.color = '#ef4444';
            } else {
                charCount.style.color = 'rgba(255, 255, 255, 0.5)';
            }
        }
    },

    // Obter chave de armazenamento
    getStorageKey() {
        return `cinehome_reviews_${this.currentMovieId}`;
    },

    // Obter perfil atual
    getCurrentProfile() {
        const profileName = localStorage.getItem('cinehome_current_profile_name') || 
                           localStorage.getItem('cinehome_current_profile') || 
                           'Usuário';
        return profileName;
    },

    // Carregar avaliações do backend
    async loadReviews() {
        try {
            const url = `${this.apiBaseUrl}/${this.currentMovieId}`;
            console.log(`📡 Carregando avaliações do filme ${this.currentMovieId}...`);
            console.log(`🔗 URL completa: ${url}`);
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });
            
            console.log(`📥 Response status: ${response.status} ${response.statusText}`);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Resposta de erro:', errorText);
                throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
            }
            
            const result = await response.json();
            console.log('📦 Dados recebidos:', result);
            
            if (!result.success) {
                throw new Error(result.message || 'Erro ao carregar avaliações');
            }

            const reviews = result.data || [];
            console.log(`📋 ${reviews.length} avaliações carregadas do servidor`);
            this.displayReviews(reviews);
            
        } catch (error) {
            console.error('❌ Erro ao carregar avaliações do servidor:', error);
            console.error('❌ Error details:', {
                message: error.message,
                stack: error.stack
            });
            
            // Fallback: tentar carregar do localStorage
            console.log('🔄 Tentando carregar do localStorage...');
            this.loadReviewsFromLocalStorage();
        }
    },

    // Fallback: Carregar do localStorage
    loadReviewsFromLocalStorage() {
        try {
            const storageKey = this.getStorageKey();
            const reviewsData = localStorage.getItem(storageKey);
            const reviews = reviewsData ? JSON.parse(reviewsData) : [];
            
            console.log(`📋 ${reviews.length} avaliações carregadas do localStorage`);
            this.displayReviews(reviews);
        } catch (error) {
            console.error('❌ Erro ao carregar do localStorage:', error);
            this.displayReviews([]);
        }
    },

    // Exibir avaliações
    displayReviews(reviews) {
        const container = document.getElementById('reviews-container');
        const noReviews = document.getElementById('no-reviews');
        
        if (!container) return;

        if (reviews.length === 0) {
            if (noReviews) noReviews.style.display = 'flex';
            return;
        }

        if (noReviews) noReviews.style.display = 'none';

        // Ordenar por data (mais recente primeiro)
        reviews.sort((a, b) => new Date(b.date) - new Date(a.date));

        container.innerHTML = reviews.map(review => this.createReviewHTML(review)).join('');
    },

    // Criar HTML de uma avaliação
    createReviewHTML(review) {
        const stars = this.generateStarsHTML(review.rating);
        const initials = this.getInitials(review.username);
        const formattedDate = this.formatDate(review.date);

        return `
            <div class="review-card" data-review-id="${review.id}">
                <div class="review-header">
                    <div class="review-user-info">
                        <div class="review-avatar">${initials}</div>
                        <div class="review-user-details">
                            <div class="review-username">${this.escapeHTML(review.username)}</div>
                            <div class="review-date">${formattedDate}</div>
                        </div>
                    </div>
                    <div class="review-rating">
                        ${stars}
                    </div>
                </div>
                <p class="review-comment">${this.escapeHTML(review.comment)}</p>
            </div>
        `;
    },

    // Gerar HTML das estrelas
    generateStarsHTML(rating) {
        let html = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                html += '<span class="review-star">★</span>';
            } else {
                html += '<span class="review-star empty">☆</span>';
            }
        }
        return html;
    },

    // Obter iniciais do nome
    getInitials(name) {
        const words = name.trim().split(' ');
        if (words.length >= 2) {
            return (words[0][0] + words[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    },

    // Formatar data
    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return 'Hoje';
        } else if (diffDays === 1) {
            return 'Ontem';
        } else if (diffDays < 7) {
            return `${diffDays} dias atrás`;
        } else if (diffDays < 30) {
            const weeks = Math.floor(diffDays / 7);
            return `${weeks} ${weeks === 1 ? 'semana' : 'semanas'} atrás`;
        } else {
            return date.toLocaleDateString('pt-BR', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
            });
        }
    },

    // Escapar HTML para prevenir XSS
    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    // Submeter avaliação
    async submitReview() {
        console.log('📤 submitReview: Iniciando submissão...');
        console.log('⭐ Rating atual:', this.currentRating);
        
        const textarea = document.getElementById('user-comment');
        if (!textarea) {
            console.error('❌ ERRO: Textarea não encontrado em submitReview');
            return;
        }
        
        const comment = textarea.value.trim();
        console.log('💬 Comentário:', {
            length: comment.length,
            preview: comment.substring(0, 50)
        });

        // Validações
        if (this.currentRating === 0) {
            console.warn('⚠️ Validação falhou: Rating = 0');
            if (window.notify) {
                window.notify.warning('Atenção', 'Por favor, selecione uma nota de 1 a 5 estrelas');
            }
            return;
        }

        if (comment.length === 0) {
            console.warn('⚠️ Validação falhou: Comentário vazio');
            if (window.notify) {
                window.notify.warning('Atenção', 'Por favor, escreva um comentário sobre o filme');
            }
            return;
        }

        if (comment.length < 10) {
            console.warn('⚠️ Validação falhou: Comentário muito curto');
            if (window.notify) {
                window.notify.warning('Atenção', 'Seu comentário deve ter pelo menos 10 caracteres');
            }
            return;
        }

        console.log('✅ Validações passaram!');

        // Criar objeto de avaliação
        const review = {
            movieId: this.currentMovieId,
            username: this.getCurrentProfile(),
            rating: this.currentRating,
            comment: comment
        };
        
        console.log('📦 Objeto de avaliação criado:', review);

        // Desabilitar botão durante envio
        const submitBtn = document.getElementById('submit-review-btn');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Publicando...';
            console.log('🔒 Botão desabilitado');
        }

        // Salvar avaliação no backend
        console.log('📡 Chamando saveReview...');
        const success = await this.saveReview(review);
        console.log('📡 saveReview retornou:', success);

        // Reabilitar botão
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
                Publicar Avaliação
            `;
            console.log('🔓 Botão reabilitado');
        }

        if (success) {
            console.log('✅ Avaliação publicada com sucesso!');
            // Limpar formulário
            this.resetForm();

            // Notificação de sucesso
            if (window.notify) {
                window.notify.success(
                    'Avaliação Publicada!', 
                    'Obrigado por compartilhar sua opinião sobre o filme'
                );
            }
        } else {
            console.error('❌ Falha ao publicar avaliação');
        }
    },

    // Salvar avaliação no backend
    async saveReview(review) {
        try {
            console.log('📡 Enviando avaliação para o servidor...', review);
            console.log('🔗 URL da API:', this.apiBaseUrl);
            
            const response = await fetch(this.apiBaseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify(review)
            });

            console.log('📥 Response status:', response.status, response.statusText);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Resposta de erro:', errorText);
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            const result = await response.json();
            console.log('📦 Resposta do servidor:', result);

            if (!result.success) {
                throw new Error(result.message || 'Erro ao salvar avaliação');
            }

            console.log('✅ Avaliação salva no servidor:', result.data);
            
            // Recarregar avaliações
            await this.loadReviews();
            
            return true;
            
        } catch (error) {
            console.error('❌ Erro ao salvar no servidor:', error);
            console.error('❌ Error completo:', {
                name: error.name,
                message: error.message,
                stack: error.stack
            });
            
            // Fallback: salvar no localStorage
            if (window.notify) {
                window.notify.warning(
                    'Modo Offline', 
                    'Sua avaliação foi salva localmente e será sincronizada quando possível'
                );
            }
            
            this.saveReviewToLocalStorage(review);
            return true;
        }
    },

    // Fallback: Salvar no localStorage
    saveReviewToLocalStorage(review) {
        try {
            const storageKey = this.getStorageKey();
            const reviewsData = localStorage.getItem(storageKey);
            const reviews = reviewsData ? JSON.parse(reviewsData) : [];
            
            // Adicionar ID e data
            review.id = Date.now().toString();
            review.date = new Date().toISOString();
            
            reviews.push(review);
            localStorage.setItem(storageKey, JSON.stringify(reviews));
            
            console.log('💾 Avaliação salva no localStorage:', review);
            
            // Recarregar avaliações
            this.loadReviewsFromLocalStorage();
        } catch (error) {
            console.error('❌ Erro ao salvar no localStorage:', error);
            if (window.notify) {
                window.notify.error('Erro', 'Não foi possível salvar sua avaliação. Tente novamente.');
            }
        }
    },

    // Resetar formulário
    resetForm() {
        // Reset rating
        this.currentRating = 0;
        this.highlightStars(0);
        
        const ratingValue = document.getElementById('rating-value');
        if (ratingValue) {
            ratingValue.textContent = '0/5';
        }

        // Reset textarea
        const textarea = document.getElementById('user-comment');
        if (textarea) {
            textarea.value = '';
        }

        // Reset char count
        this.updateCharCount();
    }
};

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    console.log('⏳ DOM ainda carregando, aguardando DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', () => {
        console.log('📄 DOMContentLoaded disparado!');
        console.log('🔍 Estado do documento:', document.readyState);
        console.log('🔍 Elementos no body:', document.body.children.length);
        console.log('🔍 star-rating-input existe?', !!document.getElementById('star-rating-input'));
        console.log('🔍 user-comment existe?', !!document.getElementById('user-comment'));
        console.log('🔍 submit-review-btn existe?', !!document.getElementById('submit-review-btn'));
        UserReviews.init();
    });
} else {
    console.log('✅ DOM já carregado (readyState: ' + document.readyState + ')');
    console.log('🔍 Elementos no body:', document.body.children.length);
    // Se o script for carregado após o DOM, usar setTimeout para garantir
    setTimeout(() => {
        console.log('⏰ setTimeout executado, inicializando UserReviews...');
        console.log('🔍 Elementos no body agora:', document.body.children.length);
        console.log('🔍 star-rating-input existe?', !!document.getElementById('star-rating-input'));
        console.log('🔍 user-comment existe?', !!document.getElementById('user-comment'));
        console.log('🔍 submit-review-btn existe?', !!document.getElementById('submit-review-btn'));
        UserReviews.init();
    }, 100);
}

// Exportar para window
window.UserReviews = UserReviews;
