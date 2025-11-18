/**
 * Script d'auto-configuration TMDB
 * Configure automatiquement la clé API TMDB dans le localStorage après connexion
 */

(function() {
  'use strict';
  
  // Clé API TMDB à configurer automatiquement
  const TMDB_API_KEY = '0195eb509bb44f3857d46334a34f118c';
  
  /**
   * Configure automatiquement la clé API TMDB
   */
  function autoConfigureTMDB() {
    try {
      // Vérifier si l'utilisateur est authentifié
      const token = localStorage.getItem('token');
      const userEmail = localStorage.getItem('userEmail');
      
      if (!token || !userEmail) {
        console.log('ℹ️ Utilisateur non authentifié - configuration TMDB en attente');
        return false;
      }
      
      // Vérifier si la clé API TMDB est déjà configurée
      const existingKey = localStorage.getItem('tmdb_api_key');
      
      if (existingKey && existingKey.trim().length > 0) {
        console.log('✅ Clé API TMDB déjà configurée');
        return true;
      }
      
      // Configurer automatiquement la clé API TMDB
      localStorage.setItem('tmdb_api_key', TMDB_API_KEY);
      console.log('✅ Clé API TMDB configurée automatiquement:', TMDB_API_KEY.substring(0, 8) + '...');
      
      // Déclencher un événement pour notifier les autres scripts
      window.dispatchEvent(new CustomEvent('tmdb-configured', {
        detail: { apiKey: TMDB_API_KEY }
      }));
      
      // Mettre à jour le bouton de configuration si disponible
      if (typeof TMDBConfig !== 'undefined' && TMDBConfig.atualizarBotaoTMDB) {
        TMDBConfig.atualizarBotaoTMDB();
      }
      
      return true;
      
    } catch (error) {
      console.error('❌ Erreur lors de la configuration automatique TMDB:', error);
      return false;
    }
  }
  
  /**
   * Vérifie et configure TMDB au chargement de la page
   */
  function initAutoConfig() {
    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', autoConfigureTMDB);
    } else {
      autoConfigureTMDB();
    }
  }
  
  /**
   * Écouter les événements de connexion pour configurer TMDB
   */
  function setupLoginListener() {
    // Écouter l'événement personnalisé de connexion réussie
    window.addEventListener('user-logged-in', function() {
      console.log('🔐 Utilisateur connecté - configuration TMDB...');
      setTimeout(autoConfigureTMDB, 100);
    });
    
    // Écouter les changements dans le localStorage (connexion dans un autre onglet)
    window.addEventListener('storage', function(e) {
      if (e.key === 'token' && e.newValue) {
        console.log('🔐 Token détecté - configuration TMDB...');
        setTimeout(autoConfigureTMDB, 100);
      }
    });
  }
  
  // Initialiser
  initAutoConfig();
  setupLoginListener();
  
  // Exposer la fonction pour utilisation externe si nécessaire
  window.autoConfigureTMDB = autoConfigureTMDB;
  
  console.log('🚀 Script d\'auto-configuration TMDB chargé');
  
})();
