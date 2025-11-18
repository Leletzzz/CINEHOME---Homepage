// Arquivo de autenticação para CINEHOME
// Gerencia proteção de rotas e logout

/**
 * Verifica se o usuário está autenticado
 * @returns {boolean} true se autenticado, false caso contrário
 */
function isAuthenticated() {
  const token = localStorage.getItem('token');
  const userEmail = localStorage.getItem('userEmail');
  return !!(token && userEmail);
}

/**
 * Redireciona para a página de login se não estiver autenticado
 * Use esta função no início das páginas protegidas
 */
function requireAuth() {
  if (!isAuthenticated()) {
    console.log('⚠️ Usuário não autenticado, redirecionando para login...');
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

/**
 * Realiza o logout do usuário
 * Remove token e email do localStorage e redireciona para index.html
 */
function logout() {
  console.log('👋 Fazendo logout...');
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail');
  window.location.href = 'index.html';
}

/**
 * Obtém informações do usuário logado
 * @returns {{email: string, token: string} | null} Informações do usuário ou null
 */
function getCurrentUser() {
  if (!isAuthenticated()) return null;
  return {
    email: localStorage.getItem('userEmail'),
    token: localStorage.getItem('token')
  };
}

/**
 * Exibe informações do usuário na interface
 * @param {string} selector Seletor CSS do elemento onde exibir
 */
function displayUserInfo(selector) {
  const user = getCurrentUser();
  const element = document.querySelector(selector);
  
  if (!element) return;
  
  if (user) {
    element.textContent = `Olá, ${user.email}`;
  }
}

// Exportar funções para uso global
window.auth = {
  isAuthenticated,
  requireAuth,
  logout,
  getCurrentUser,
  displayUserInfo
};

console.log('🔐 Módulo de autenticação carregado');
