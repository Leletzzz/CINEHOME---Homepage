/**
 * Notification System - CINEHOME
 * Système de notifications toast avec feedback visuel
 * Basé sur les 10 principes d'usabilité de Nielsen
 */

(function() {
  'use strict';

  // Configuration
  const DEFAULT_DURATION = 5000; // 5 secondes
  const MAX_NOTIFICATIONS = 3; // Maximum de notifications simultanées

  // Container des notifications
  let notificationContainer = null;

  // Queue des notifications actives
  const activeNotifications = [];

  /**
   * Initialise le système de notifications
   */
  function initNotifications() {
    if (!notificationContainer) {
      notificationContainer = document.createElement('div');
      notificationContainer.className = 'notification-container';
      document.body.appendChild(notificationContainer);
    }
  }

  /**
   * Affiche une notification
   * @param {Object} options - Options de la notification
   * @param {string} options.type - Type: 'success', 'error', 'warning', 'info'
   * @param {string} options.title - Titre de la notification
   * @param {string} options.message - Message de la notification
   * @param {number} options.duration - Durée en ms (optionnel)
   * @param {boolean} options.closable - Peut être fermé manuellement (défaut: true)
   */
  function showNotification(options) {
    initNotifications();

    const {
      type = 'info',
      title = '',
      message = '',
      duration = DEFAULT_DURATION,
      closable = true
    } = options;

    // Limiter le nombre de notifications
    if (activeNotifications.length >= MAX_NOTIFICATIONS) {
      removeNotification(activeNotifications[0]);
    }

    // Créer l'élément notification
    const notification = createNotificationElement(type, title, message, closable);
    
    // Ajouter au container
    notificationContainer.appendChild(notification);
    activeNotifications.push(notification);

    // Animation d'entrée
    requestAnimationFrame(() => {
      notification.style.opacity = '1';
    });

    // Auto-fermeture
    if (duration > 0) {
      const timeoutId = setTimeout(() => {
        removeNotification(notification);
      }, duration);

      // Annuler le timer au survol
      notification.addEventListener('mouseenter', () => {
        clearTimeout(timeoutId);
      });
    }

    return notification;
  }

  /**
   * Crée l'élément DOM de la notification
   */
  function createNotificationElement(type, title, message, closable) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    // Icône
    const icon = getIconForType(type);

    // HTML de la notification
    notification.innerHTML = `
      <div class="notification-icon">
        ${icon}
      </div>
      <div class="notification-content">
        ${title ? `<div class="notification-title">${title}</div>` : ''}
        ${message ? `<div class="notification-message">${message}</div>` : ''}
      </div>
      ${closable ? `
        <button class="notification-close" aria-label="Fechar notificação">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      ` : ''}
      <div class="notification-progress"></div>
    `;

    // Bouton de fermeture
    if (closable) {
      const closeBtn = notification.querySelector('.notification-close');
      closeBtn.addEventListener('click', () => {
        removeNotification(notification);
      });
    }

    return notification;
  }

  /**
   * Retourne l'icône SVG pour chaque type
   */
  function getIconForType(type) {
    const icons = {
      success: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
      `,
      error: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      `,
      warning: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      `,
      info: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
      `
    };

    return icons[type] || icons.info;
  }

  /**
   * Supprime une notification
   */
  function removeNotification(notification) {
    if (!notification || !notification.parentElement) return;

    notification.classList.add('hiding');

    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
      
      const index = activeNotifications.indexOf(notification);
      if (index > -1) {
        activeNotifications.splice(index, 1);
      }
    }, 300);
  }

  /**
   * Fonctions helper pour types spécifiques
   */
  function success(title, message, duration) {
    return showNotification({ type: 'success', title, message, duration });
  }

  function error(title, message, duration) {
    return showNotification({ type: 'error', title, message, duration });
  }

  function warning(title, message, duration) {
    return showNotification({ type: 'warning', title, message, duration });
  }

  function info(title, message, duration) {
    return showNotification({ type: 'info', title, message, duration });
  }

  /**
   * Supprime toutes les notifications
   */
  function clearAll() {
    activeNotifications.forEach(notification => {
      removeNotification(notification);
    });
  }

  // Exposer l'API globalement
  window.notify = {
    show: showNotification,
    success,
    error,
    warning,
    info,
    clearAll
  };

  // Auto-initialisation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNotifications);
  } else {
    initNotifications();
  }

})();
