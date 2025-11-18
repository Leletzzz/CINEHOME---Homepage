/* ====================================
   MODAL DE CONFIRMATION STYLISÉE
   Sistema de confirmação moderno para substituir window.confirm()
   ==================================== */

const confirmModal = {
  /**
   * Affiche une modal de confirmation stylisée
   * @param {Object} options - Options de la modal
   * @param {string} options.title - Titre de la modal
   * @param {string} options.message - Message de confirmation
   * @param {string} options.confirmText - Texte du bouton de confirmation (défaut: "OK")
   * @param {string} options.cancelText - Texte du bouton d'annulation (défaut: "Cancelar")
   * @param {string} options.type - Type de modal: 'danger', 'warning', 'info' (défaut: 'danger')
   * @param {string} options.icon - Emoji/icône à afficher (défaut selon le type)
   * @returns {Promise<boolean>} - true si confirmé, false si annulé
   */
  show: function({
    title = 'Confirmar',
    message = 'Tem certeza?',
    confirmText = 'OK',
    cancelText = 'Cancelar',
    type = 'danger',
    icon = null
  } = {}) {
    return new Promise((resolve) => {
      // Supprimer toute modal existante
      const existingModal = document.querySelector('.confirm-modal-overlay');
      if (existingModal) {
        existingModal.remove();
      }

      // Définir l'icône par défaut selon le type
      if (!icon) {
        switch (type) {
          case 'danger':
            icon = '⚠️';
            break;
          case 'warning':
            icon = '⚡';
            break;
          case 'info':
            icon = 'ℹ️';
            break;
          default:
            icon = '❓';
        }
      }

      // Créer la modal
      const overlay = document.createElement('div');
      overlay.className = 'confirm-modal-overlay';
      overlay.innerHTML = `
        <div class="confirm-modal ${type}">
          <div class="confirm-modal-header">
            <span class="confirm-modal-icon">${icon}</span>
            <h3 class="confirm-modal-title">${title}</h3>
          </div>
          <p class="confirm-modal-message">${message}</p>
          <div class="confirm-modal-actions">
            <button class="confirm-modal-btn confirm-modal-btn-cancel" data-action="cancel">
              ${cancelText}
            </button>
            <button class="confirm-modal-btn confirm-modal-btn-confirm" data-action="confirm">
              ${confirmText}
            </button>
          </div>
        </div>
      `;

      // Ajouter au DOM
      document.body.appendChild(overlay);

      // Gérer les clics
      const handleClick = (e) => {
        const action = e.target.dataset.action;
        if (action === 'confirm') {
          closeModal(true);
        } else if (action === 'cancel') {
          closeModal(false);
        }
      };

      // Gérer la touche Escape
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          closeModal(false);
        }
      };

      // Gérer le clic sur l'overlay
      const handleOverlayClick = (e) => {
        if (e.target === overlay) {
          closeModal(false);
        }
      };

      // Fonction de fermeture
      const closeModal = (result) => {
        // Retirer les événements
        overlay.removeEventListener('click', handleClick);
        document.removeEventListener('keydown', handleEscape);
        overlay.removeEventListener('click', handleOverlayClick);

        // Animation de fermeture
        overlay.style.animation = 'fadeOut 0.2s ease forwards';
        const modal = overlay.querySelector('.confirm-modal');
        modal.style.animation = 'modalSlideOut 0.2s ease forwards';

        setTimeout(() => {
          overlay.remove();
          resolve(result);
        }, 200);
      };

      // Ajouter les événements
      overlay.addEventListener('click', handleClick);
      document.addEventListener('keydown', handleEscape);
      overlay.addEventListener('click', handleOverlayClick);

      // Focus sur le bouton de confirmation
      setTimeout(() => {
        const confirmBtn = overlay.querySelector('[data-action="confirm"]');
        if (confirmBtn) {
          confirmBtn.focus();
        }
      }, 100);
    });
  },

  // Raccourcis pour différents types
  danger: function(title, message, confirmText = 'OK', cancelText = 'Cancelar') {
    return this.show({ title, message, confirmText, cancelText, type: 'danger' });
  },

  warning: function(title, message, confirmText = 'OK', cancelText = 'Cancelar') {
    return this.show({ title, message, confirmText, cancelText, type: 'warning' });
  },

  info: function(title, message, confirmText = 'OK', cancelText = 'Cancelar') {
    return this.show({ title, message, confirmText, cancelText, type: 'info' });
  }
};

// Ajouter les animations de fermeture au CSS si elles n'existent pas
if (!document.querySelector('#confirm-modal-animations')) {
  const style = document.createElement('style');
  style.id = 'confirm-modal-animations';
  style.textContent = `
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    
    @keyframes modalSlideOut {
      from {
        transform: scale(1) translateY(0);
        opacity: 1;
      }
      to {
        transform: scale(0.9) translateY(20px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}
