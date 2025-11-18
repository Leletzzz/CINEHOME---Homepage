/**
 * GUIA RÁPIDO - Sistema de Notificações CINEHOME
 * Cole este código no console do navegador para ver exemplos práticos
 */

console.log('%c🔔 SISTEMA DE NOTIFICAÇÕES - CINEHOME', 'background: #5555FF; color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%cExemplos práticos de uso:', 'color: #3b82f6; font-size: 16px; margin-top: 10px;');

// Exemplos básicos
console.log('\n%c1️⃣ NOTIFICAÇÃO DE SUCESSO', 'color: #22c55e; font-weight: bold;');
console.log("notify.success('Login realizado!', 'Bem-vindo de volta ao CINEHOME');");

console.log('\n%c2️⃣ NOTIFICAÇÃO DE ERRO', 'color: #ef4444; font-weight: bold;');
console.log("notify.error('Erro no login', 'Email ou senha incorretos');");

console.log('\n%c3️⃣ NOTIFICAÇÃO DE AVISO', 'color: #f59e0b; font-weight: bold;');
console.log("notify.warning('Senha fraca', 'A senha deve ter pelo menos 6 caracteres');");

console.log('\n%c4️⃣ NOTIFICAÇÃO DE INFORMAÇÃO', 'color: #3b82f6; font-weight: bold;');
console.log("notify.info('Dica', 'Use uma senha forte com letras, números e símbolos');");

console.log('\n%c5️⃣ DURAÇÃO PERSONALIZADA', 'color: #8b5cf6; font-weight: bold;');
console.log("notify.success('Código enviado', 'Verifique seu email', 10000); // 10 segundos");

console.log('\n%c6️⃣ NOTIFICAÇÃO PERMANENTE', 'color: #ec4899; font-weight: bold;');
console.log("notify.error('Erro crítico', 'Contate o suporte', 0); // Não fecha automaticamente");

console.log('\n%c7️⃣ LIMPAR TODAS', 'color: #6b7280; font-weight: bold;');
console.log("notify.clearAll();");

console.log('\n%c📝 TESTE AGORA!', 'background: #22c55e; color: white; font-size: 14px; padding: 5px; border-radius: 3px;');
console.log('Digite no console: notify.success("Teste", "Funcionou!")');

// Função helper para testar
window.testNotifications = function() {
  console.clear();
  console.log('%c🎬 TESTANDO SISTEMA DE NOTIFICAÇÕES', 'background: #5555FF; color: white; font-size: 18px; padding: 8px;');
  
  setTimeout(() => {
    notify.success('Teste 1', 'Notificação de sucesso');
    console.log('✅ Success notification');
  }, 500);
  
  setTimeout(() => {
    notify.error('Teste 2', 'Notificação de erro');
    console.log('❌ Error notification');
  }, 1500);
  
  setTimeout(() => {
    notify.warning('Teste 3', 'Notificação de aviso');
    console.log('⚠️ Warning notification');
  }, 2500);
  
  setTimeout(() => {
    notify.info('Teste 4', 'Notificação de informação');
    console.log('ℹ️ Info notification');
  }, 3500);
  
  setTimeout(() => {
    console.log('%c✨ TESTE COMPLETO!', 'background: #22c55e; color: white; font-size: 14px; padding: 5px;');
  }, 4500);
};

console.log('\n%c🚀 EXECUTAR TESTE AUTOMÁTICO', 'background: #f59e0b; color: white; font-size: 14px; padding: 5px; border-radius: 3px;');
console.log('Digite no console: testNotifications()');
