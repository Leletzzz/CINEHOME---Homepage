class CarrosselNetflix {
            constructor(container) {
                this.container = container;
                this.carrossel = container.querySelector('.filmes-carrossel');
                this.prevBtn = container.querySelector('.carrossel-prev');
                this.nextBtn = container.querySelector('.carrossel-next');
                this.cards = container.querySelectorAll('.filme-card');
                
                this.currentIndex = 0;
                this.cardsPerView = this.getCardsPerView();
                this.totalSlides = Math.ceil(this.cards.length / this.cardsPerView);
                this.autoScrollInterval = null;
                
                this.init();
            }
            
            getCardsPerView() {
                const width = window.innerWidth;
                if (width < 576) return 2;
                if (width < 768) return 3;
                if (width < 992) return 4;
                if (width < 1200) return 5;
                return 6;
            }
            
            init() {
                this.prevBtn.addEventListener('click', () => this.prev());
                this.nextBtn.addEventListener('click', () => this.next());
                
                // Navegação por keyboard
                this.container.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') this.prev();
                    if (e.key === 'ArrowRight') this.next();
                });
                
                // Auto-scroll
                this.startAutoScroll();
                
                // Pausar auto-scroll no hover
                this.container.addEventListener('mouseenter', () => this.stopAutoScroll());
                this.container.addEventListener('mouseleave', () => this.startAutoScroll());
                
                // Atualizar na resize da janela
                window.addEventListener('resize', () => this.handleResize());
            }
            
            handleResize() {
                this.cardsPerView = this.getCardsPerView();
                this.totalSlides = Math.ceil(this.cards.length / this.cardsPerView);
                if (this.cards.length > 0) {
                    this.goToSlide(0);
                }
            }
            
            prev() {
                this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
                this.scrollToCurrent();
                this.restartAutoScroll();
            }
            
            next() {
                this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
                this.scrollToCurrent();
                this.restartAutoScroll();
            }
            
            goToSlide(index) {
                this.currentIndex = index;
                this.scrollToCurrent();
                this.restartAutoScroll();
            }
            
            scrollToCurrent() {
                if (!this.cards || this.cards.length === 0) return;
                const cardWidth = this.cards[0].offsetWidth + 8; // width + gap
                const scrollAmount = this.currentIndex * this.cardsPerView * cardWidth;
                this.carrossel.style.transform = `translateX(-${scrollAmount}px)`;
            }
            
            startAutoScroll() {
                this.autoScrollInterval = setInterval(() => {
                    this.next();
                }, 5000); // Muda a cada 5 segundos
            }
            
            stopAutoScroll() {
                if (this.autoScrollInterval) {
                    clearInterval(this.autoScrollInterval);
                    this.autoScrollInterval = null;
                }
            }
            
            restartAutoScroll() {
                this.stopAutoScroll();
                this.startAutoScroll();
            }
        }

        // Inicializar todos os carrosseis quando o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    const carrosselContainers = document.querySelectorAll('.carrossel-container');
    carrosselContainers.forEach(container => {
        new CarrosselNetflix(container);
    });
});