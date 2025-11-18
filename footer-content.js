
(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initFooterContentSections();
    });

    function initFooterContentSections() {
        // Gérer les clics sur les liens du footer qui pointent vers des hash
        document.addEventListener('click', function(e) {
            const target = e.target.closest('a[href^="#"]');
            if (!target) return;

            const hash = target.getAttribute('href');
            if (!hash || hash === '#') return;

            // Vérifier si c'est un lien vers une section de contenu du footer
            const sectionId = hash.substring(1); // Enlever le #
            const section = document.getElementById(sectionId);
            
            if (section && section.classList.contains('footer-content-section')) {
                e.preventDefault();
                openFooterSection(sectionId);
            }
        });

        // Gérer les boutons de fermeture
        const closeButtons = document.querySelectorAll('[data-close-section]');
        closeButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                const section = this.closest('.footer-content-section');
                if (section) {
                    closeFooterSection(section.id);
                }
            });
        });

        // Fermer avec la touche Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const openSection = document.querySelector('.footer-content-section.active');
                if (openSection) {
                    closeFooterSection(openSection.id);
                }
            }
        });

        // Fermer en cliquant en dehors du contenu
        document.addEventListener('click', function(e) {
            const openSection = document.querySelector('.footer-content-section.active');
            if (openSection && e.target === openSection) {
                closeFooterSection(openSection.id);
            }
        });
    }

    /**
     * Ouvre une section de contenu du footer
     * @param {string} sectionId - L'ID de la section à ouvrir
     */
    function openFooterSection(sectionId) {
        // Fermer toutes les sections ouvertes
        const openSections = document.querySelectorAll('.footer-content-section.active');
        openSections.forEach(function(section) {
            section.classList.remove('active');
        });

        // Ouvrir la section demandée
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('active');
            document.body.style.overflow = 'hidden'; // Empêcher le scroll du body
            
            // Focus sur le bouton de fermeture pour l'accessibilité
            const closeButton = section.querySelector('.footer-content-close');
            if (closeButton) {
                setTimeout(function() {
                    closeButton.focus();
                }, 100);
            }

            // Ajouter à l'historique du navigateur
            if (history.pushState) {
                history.pushState(null, null, '#' + sectionId);
            }
        }
    }

    /**
     * Ferme une section de contenu du footer
     * @param {string} sectionId - L'ID de la section à fermer
     */
    function closeFooterSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.remove('active');
            document.body.style.overflow = ''; // Restaurer le scroll du body

            // Retirer le hash de l'URL
            if (history.pushState) {
                history.pushState(null, null, window.location.pathname);
            }
        }
    }

    // Gérer le bouton retour du navigateur
    window.addEventListener('popstate', function() {
        const openSection = document.querySelector('.footer-content-section.active');
        if (openSection) {
            closeFooterSection(openSection.id);
        }
    });

    // Exposer les fonctions globalement si nécessaire
    window.footerContent = {
        open: openFooterSection,
        close: closeFooterSection
    };
})();
