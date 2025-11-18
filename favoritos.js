// Sistema de Favoritos - CineHome
const Favoritos = {
    // Inicialização do sistema
    init() {
        console.log('🍿 Favoritos: Inicializando sistema...');
        this.configurarEventos();
        this.atualizarContador();
        console.log('✅ Favoritos: Sistema pronto!');
    },

    // Obter chave de armazenamento baseada no perfil
    obterChaveStorage() {
        const perfil = localStorage.getItem('cinehome_current_profile') || '01';
        return `cinehome_favoritos_${perfil}`;
    },

    // Carregar favoritos do localStorage
    carregarFavoritos() {
        try {
            const chave = this.obterChaveStorage();
            const favoritos = localStorage.getItem(chave);
            const resultado = favoritos ? JSON.parse(favoritos) : [];
            console.log(`📋 Favoritos carregados: ${resultado.length} filmes`);
            return resultado;
        } catch (error) {
            console.error('❌ Erro ao carregar favoritos:', error);
            return [];
        }
    },

    // Salvar favoritos no localStorage
    salvarFavoritos(favoritos) {
        try {
            const chave = this.obterChaveStorage();
            localStorage.setItem(chave, JSON.stringify(favoritos));
            this.atualizarContador();
            console.log(`💾 Favoritos salvos: ${favoritos.length} filmes`);
        } catch (error) {
            console.error('❌ Erro ao salvar favoritos:', error);
        }
    },

    // Adicionar filme aos favoritos
    adicionar(filme) {
        console.log('➕ Tentando adicionar filme:', filme);
        const favoritos = this.carregarFavoritos();
        const jaExiste = favoritos.some(f => f.id === filme.id);
        
        if (jaExiste) {
            console.log('⚠️ Filme já existe nos favoritos');
            this.mostrarNotificacao('Este filme já está nos favoritos!', 'warning', 'Aviso');
            return false;
        }

        favoritos.unshift(filme);
        this.salvarFavoritos(favoritos);
        // Notification BLEUE pour l'ajout
        this.mostrarNotificacao(`"${filme.titulo}" foi adicionado aos favoritos!`, 'info', 'Adicionado');
        this.animarBotao();
        console.log('✅ Filme adicionado com sucesso!');
        return true;
    },

    // Remover filme dos favoritos
    remover(filmeId) {
        console.log('➖ Removendo filme:', filmeId);
        const favoritos = this.carregarFavoritos();
        
        // Trouver le film pour afficher son titre dans la notification
        const filmeRemovido = favoritos.find(f => f.id === filmeId);
        const tituloFilme = filmeRemovido ? filmeRemovido.titulo : 'Filme';
        
        const novosFavoritos = favoritos.filter(f => f.id !== filmeId);
        this.salvarFavoritos(novosFavoritos);
        
        // Notification ROUGE pour le retrait
        this.mostrarNotificacao(`"${tituloFilme}" foi removido dos favoritos`, 'error', 'Removido');
        console.log('✅ Filme removido!');
    },

    // Verificar se filme está nos favoritos
    verificarFavorito(filmeId) {
        const favoritos = this.carregarFavoritos();
        return favoritos.some(f => f.id === filmeId);
    },

    // Atualizar contador de favoritos no badge
    atualizarContador() {
        const contador = document.getElementById('favoritos-count');
        if (!contador) {
            console.log('⚠️ Elemento favoritos-count não encontrado');
            return;
        }

        const favoritos = this.carregarFavoritos();
        const total = favoritos.length;

        contador.textContent = total;
        
        if (total > 0) {
            contador.classList.remove('hidden');
        } else {
            contador.classList.add('hidden');
        }
        
        console.log(`🔢 Contador atualizado: ${total}`);
    },

    // Configurar eventos dos botões
    configurarEventos() {
        console.log('🔧 Configurando eventos...');
        
        // Botão popcorn - Redirecionar para página de favoritos
        const btnFavoritos = document.getElementById('favoritos-btn');
        if (btnFavoritos) {
            btnFavoritos.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🍿 Redirecionando para favoritos.html');
                window.location.href = 'favoritos.html';
            });
            console.log('✅ Evento popcorn configurado');
        }

        // Botão coração - Adicionar/Remover favoritos
        const btnAdicionar = document.getElementById('add-watchlist-btn');
        if (btnAdicionar) {
            btnAdicionar.addEventListener('click', () => {
                console.log('❤️ Botão coração clicado');
                this.toggleFavoritoAtual();
            });
            // Atualizar estado inicial
            this.atualizarBotaoEstado();
            console.log('✅ Evento coração configurado');
        }
    },

    // Toggle favorito (adicionar ou remover)
    toggleFavoritoAtual() {
        const urlParams = new URLSearchParams(window.location.search);
        const filmeId = urlParams.get('id');
        
        console.log(`🔄 Toggle favorito para ID: ${filmeId}`);
        
        if (this.verificarFavorito(filmeId)) {
            // Remover
            this.remover(filmeId);
            const btn = document.getElementById('add-watchlist-btn');
            if (btn) {
                btn.classList.remove('added');
                btn.setAttribute('aria-label', 'Adicionar aos favoritos');
            }
        } else {
            // Adicionar
            this.adicionarFilmeAtual();
        }
    },

    // Adicionar filme atual da página
    adicionarFilmeAtual() {
        console.log('📝 Coletando dados do filme atual...');
        
        const urlParams = new URLSearchParams(window.location.search);
        const filmeId = urlParams.get('id');
        
        // Coletar dados do filme da página
        const titulo = document.getElementById('movie-title')?.textContent || 
                      document.querySelector('.movie-info h1')?.textContent || 
                      document.querySelector('h1')?.textContent || 
                      'Filme';
        
        const posterElement = document.getElementById('movie-poster') || 
                             document.querySelector('.movie-poster img') ||
                             document.querySelector('img[alt*="poster"]');
        
        const backdropElement = document.getElementById('movie-backdrop') ||
                               document.querySelector('.hero-section img') ||
                               document.querySelector('[style*="background-image"]');
        
        const poster = posterElement?.src || posterElement?.dataset?.src || '';
        const backdrop = backdropElement?.src || backdropElement?.dataset?.src || poster;
        
        // Extrair ano
        const durationText = document.getElementById('movie-duration')?.textContent || 
                            document.querySelector('.movie-meta')?.textContent || '';
        const ano = durationText.match(/\d{4}/)?.[0] || '';
        
        // Extrair avaliação
        const avaliacao = document.querySelector('.rating-score-text')?.textContent ||
                         document.querySelector('.movie-rating')?.textContent ||
                         document.querySelector('[class*="rating"]')?.textContent || '';
        
        // Extrair gêneros
        const generos = document.getElementById('movie-genres')?.textContent ||
                       document.querySelector('.movie-genres')?.textContent || '';
        
        const filme = {
            id: filmeId || Date.now().toString(),
            titulo: titulo.trim(),
            poster: poster,
            backdrop: backdrop,
            ano: ano,
            avaliacao: avaliacao.trim(),
            generos: generos.trim(),
            adicionadoEm: new Date().toISOString()
        };

        console.log('📦 Dados coletados:', filme);

        const adicionado = this.adicionar(filme);
        
        const btn = document.getElementById('add-watchlist-btn');
        if (btn && adicionado) {
            btn.classList.add('added');
            btn.setAttribute('aria-label', 'Remover dos favoritos');
        }
    },

    // Atualizar estado visual do botão coração
    atualizarBotaoEstado() {
        const btn = document.getElementById('add-watchlist-btn');
        if (!btn) return;

        const urlParams = new URLSearchParams(window.location.search);
        const filmeId = urlParams.get('id');
        
        if (this.verificarFavorito(filmeId)) {
            btn.classList.add('added');
            btn.setAttribute('aria-label', 'Remover dos favoritos');
            console.log('❤️ Botão marcado como adicionado');
        } else {
            btn.classList.remove('added');
            btn.setAttribute('aria-label', 'Adicionar aos favoritos');
            console.log('🤍 Botão marcado como não adicionado');
        }
    },

    // Animar botão coração
    animarBotao() {
        const btn = document.getElementById('add-watchlist-btn');
        if (!btn) return;

        btn.style.animation = 'none';
        setTimeout(() => {
            btn.style.animation = '';
        }, 10);
    },

    // Mostrar notificação usando o sistema global
    mostrarNotificacao(mensagem, tipo = 'info', titulo = null) {
        console.log(`🔔 Notificação [${tipo}]: ${mensagem}`);
        
        // Usar o sistema de notificações global se disponível
        if (window.notify) {
            const titulosPadrao = {
                success: 'Sucesso!',
                error: 'Removido',
                info: 'Adicionado',
                warning: 'Aviso'
            };
            
            window.notify.show({
                type: tipo,
                title: titulo || titulosPadrao[tipo] || 'Notificação',
                message: mensagem,
                duration: 4000
            });
        } else {
            // Fallback caso o sistema não esteja carregado
            console.warn('Sistema de notificações não carregado');
        }
    }
};

// Listener para mudanças de perfil (storage events)
window.addEventListener('storage', (e) => {
    if (e.key === 'cinehome_current_profile') {
        console.log('🔄 Perfil alterado detectado:', e.newValue);
        if (window.Favoritos && typeof window.Favoritos.atualizarContador === 'function') {
            window.Favoritos.atualizarContador();
        }
    }
});

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🚀 DOM carregado, inicializando Favoritos...');
        Favoritos.init();
    });
} else {
    console.log('🚀 DOM já carregado, inicializando Favoritos...');
    Favoritos.init();
}

// Exportar para window
window.Favoritos = Favoritos;
console.log('🌐 Favoritos exportado para window.Favoritos');
