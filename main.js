document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 CINEHOME carregado!');

  // Vérifier la connexion au backend
  checkBackendHealth().then(isHealthy => {
    if (isHealthy) {
      console.log('✅ Backend HOME-BACKEND conectado e funcionando!');
    } else {
      console.warn('⚠️ Backend HOME-BACKEND não está disponível');
      console.warn('📋 Certifique-se de que o backend está rodando em:', CONFIG.API_BASE_URL);
    }
  });

  const loginText = document.querySelector(".title-text .login");
  const loginFormUI = document.querySelector("form.login");
  const loginBtn = document.querySelector("label.slide.login");
  const signupBtn = document.querySelector("label.slide.signup");
  const signupLink = document.querySelector("form .signup-link a");

  const forgotPasswordLink = document.querySelector('.pass-link a');
  const forgotPasswordForm = document.getElementById('forgotPasswordForm');
  const verifyCodeForm = document.getElementById('verifyCodeForm');
  const signupForm = document.getElementById('signupForm');
  const backToLoginLink = document.getElementById('backToLogin');
  const backToForgotLink = document.getElementById('backToForgot');

  console.log('🔍 Elementos encontrados:', {
    loginText: !!loginText,
    loginFormUI: !!loginFormUI,
    loginBtn: !!loginBtn,
    signupBtn: !!signupBtn,
    signupLink: !!signupLink,
    forgotPasswordLink: !!forgotPasswordLink
  });

  if (signupBtn && loginFormUI && loginText) {
    signupBtn.onclick = () => {
      showForm(signupForm);
      console.log('📝 Mudou para cadastro');
    };
  }

  if (loginBtn && loginFormUI && loginText) {
    loginBtn.onclick = () => {
      showForm(loginFormUI);
      console.log('🔑 Mudou para login');
    };
  }

  if (signupLink && signupBtn) {
    signupLink.onclick = () => {
      signupBtn.click();
      return false;
    };
  }

  function resetInterface() {
    const forms = [loginFormUI, signupForm, forgotPasswordForm, verifyCodeForm];
    forms.forEach(form => {
      if (form) {
        form.style.display = 'none';
        form.classList.remove('form-transition', 'active');
      }
    });
    
    if (loginFormUI) loginFormUI.style.display = 'block';
    if (signupForm) signupForm.style.display = 'block';
  }

  function showForm(formToShow) {
    const forms = [loginFormUI, signupForm, forgotPasswordForm, verifyCodeForm];
    
    forms.forEach(form => {
      if (form) form.style.display = 'none';
    });
    
    if (formToShow === loginFormUI) {
      resetInterface();
      
      if (loginFormUI && loginText) {
        loginFormUI.style.marginLeft = "0%";
        loginText.style.marginLeft = "0%";
      }
      
      const loginRadio = document.getElementById('login');
      if (loginRadio) loginRadio.checked = true;
      
    } else if (formToShow === signupForm) {
      resetInterface();
      
      if (loginFormUI && loginText) {
        loginFormUI.style.marginLeft = "-50%";
        loginText.style.marginLeft = "-50%";
      }
      
      const signupRadio = document.getElementById('signup');
      if (signupRadio) signupRadio.checked = true;
      
    } else if (formToShow) {
      if (loginFormUI) loginFormUI.style.display = 'none';
      if (signupForm) signupForm.style.display = 'none';
      
      formToShow.style.display = 'block';
      formToShow.classList.add('form-transition', 'active');
    }
  }

  if (forgotPasswordLink) {
    forgotPasswordLink.onclick = (e) => {
      e.preventDefault();
      showForm(forgotPasswordForm);
      console.log('🔐 Mudou para recuperação de senha');
    };
  }

  if (backToLoginLink) {
    backToLoginLink.onclick = (e) => {
      e.preventDefault();
      showForm(loginFormUI);
      console.log('🔑 Voltou para login');
    };
  }

  if (backToForgotLink) {
    backToForgotLink.onclick = (e) => {
      e.preventDefault();
      showForm(forgotPasswordForm);
      console.log('🔐 Voltou para recuperação');
    };
  }

  // OAuth Button for Password Reset (Google only)
  const googleResetBtn = document.getElementById('googleResetBtn');

  if (googleResetBtn) {
    googleResetBtn.addEventListener('click', () => {
      console.log('🔐 Recuperação via Google OAuth');
      // Redirecionar para o endpoint OAuth do backend
      window.location.href = `${CONFIG.API_BASE_URL}/auth/google`;
    });
  }

  // OAuth Buttons for Login and Signup
  const googleLoginBtn = document.getElementById('googleLoginBtn');
  const googleSignupBtn = document.getElementById('googleSignupBtn');

  if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', () => {
      console.log('🔐 Login via Google OAuth');
      // Redirecionar para o endpoint OAuth de login do backend
      window.location.href = `${CONFIG.API_BASE_URL}/auth/google/login`;
    });
  }

  if (googleSignupBtn) {
    googleSignupBtn.addEventListener('click', () => {
      console.log('🔐 Cadastro via Google OAuth');
      // Redirecionar para o endpoint OAuth de cadastro do backend
      window.location.href = `${CONFIG.API_BASE_URL}/auth/google/signup`;
    });
  }

  // Fonction pour gérer les spinners dans les boutons
  function showSpinner(button, isLoading = true) {
    const btnText = button.querySelector('.btn-text');
    const btnLoader = button.querySelector('.btn-loader');
    
    if (isLoading) {
      button.disabled = true;
      if (btnText) btnText.style.display = 'none';
      if (btnLoader) btnLoader.style.display = 'inline-block';
    } else {
      button.disabled = false;
      if (btnText) btnText.style.display = 'inline-block';
      if (btnLoader) btnLoader.style.display = 'none';
    }
  }

  // Fonction legacy pour compatibilité (si utilisée ailleurs)
  function showLoadingButton(button, text, isLoading = true) {
    // Si c'est un button avec spinner
    if (button.classList && button.classList.contains('submit-btn')) {
      showSpinner(button, isLoading);
      return;
    }
    
    // Ancien comportement pour input[type="submit"]
    if (isLoading) {
      button.disabled = true;
      button.dataset.originalValue = button.value;
      button.value = text;
      button.style.opacity = '0.7';
      button.style.cursor = 'not-allowed';
    } else {
      button.disabled = false;
      button.value = button.dataset.originalValue || button.value;
      button.style.opacity = '1';
      button.style.cursor = 'pointer';
    }
  }

  const loginForm = document.querySelector('form.login');
  console.log('🔑 Formulário de login:', !!loginForm);

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('🚀 Login iniciado');

      const emailInput = loginForm.querySelector('input[type="email"], input[type="text"]');
      const passwordInput = loginForm.querySelector('input[type="password"]');
      const submitBtn = loginForm.querySelector('.submit-btn');

      if (!emailInput || !passwordInput || !submitBtn) {
        console.error('❌ Elementos do formulário não encontrados');
        return;
      }

      const email = emailInput.value.trim();
      const password = passwordInput.value;

      if (!email || !password) {
        notify.error('Campos obrigatórios', 'Por favor, preencha todos os campos');
        return;
      }

      try {
        showSpinner(submitBtn, true);

        const response = await fetch(getApiUrl('LOGIN'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password })
        });

        console.log('📥 Resposta recebida:', response.status);
        
        if (!response.ok) {
          let errorMessage = '';
          switch (response.status) {
            case 400:
              errorMessage = '❌ Dados inválidos: Verifique seu email e senha';
              break;
            case 401:
              errorMessage = '❌ Email ou senha incorretos';
              break;
            case 404:
              errorMessage = '❌ Conta não encontrada: Este email não existe';
              break;
            case 429:
              errorMessage = '❌ Muitas tentativas: Aguarde alguns minutos';
              break;
            case 500:
              errorMessage = '❌ Erro do servidor: Tente novamente em instantes';
              break;
            default:
              errorMessage = `❌ Erro de conexão (Código: ${response.status})`;
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('✅ Login bem-sucedido:', data);

        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', email);
        
        // Déclencher l'événement de connexion pour auto-configuration TMDB
        window.dispatchEvent(new CustomEvent('user-logged-in', {
          detail: { email, token: data.token }
        }));
        
        notify.success('Bem-vindo!', 'Login realizado com sucesso');
        
        setTimeout(() => {
          window.location.href = 'profil.html';
        }, 400);
        
      } catch (error) {
        console.error('❌ Erro no login:', error);
        notify.error('Erro no login', error.message || 'Não foi possível conectar ao servidor. Verifique sua internet.');
        showSpinner(submitBtn, false);
      }
    });
  } else {
    console.error('❌ Formulário de login não encontrado!');
  }

  console.log('📝 Formulário de cadastro:', !!signupForm);
  
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('🚀 Cadastro iniciado');

      const emailInput = signupForm.querySelector('input[type="email"], input[type="text"]');
      const passwordInputs = signupForm.querySelectorAll('input[type="password"]');
      const submitBtn = signupForm.querySelector('.submit-btn');

      if (!emailInput || passwordInputs.length < 2 || !submitBtn) {
        console.error('❌ Elementos do formulário não encontrados');
        return;
      }

      const email = emailInput.value.trim();
      const password = passwordInputs[0].value;
      const confirmPassword = passwordInputs[1].value;

      if (!email || !password || !confirmPassword) {
        notify.error('Campos obrigatórios', 'Por favor, preencha todos os campos');
        return;
      }

      if (password !== confirmPassword) {
        notify.error('Senhas não coincidem', 'As senhas digitadas são diferentes. Verifique e tente novamente.');
        return;
      }

      if (password.length < CONFIG.SETTINGS.PASSWORD_MIN_LENGTH) {
        notify.error('Senha fraca', `A senha deve ter pelo menos ${CONFIG.SETTINGS.PASSWORD_MIN_LENGTH} caracteres`);
        return;
      }

      try {
        showSpinner(submitBtn, true);

        const response = await fetch(getApiUrl('REGISTER'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password })
        });

        console.log('📥 Resposta recebida:', response.status);

        if (!response.ok) {
          let errorMessage = '';
          switch (response.status) {
            case 400:
              errorMessage = '❌ Email já cadastrado: Use outro email ou faça login';
              break;
            case 422:
              errorMessage = '❌ Dados inválidos: Verifique o formato do email';
              break;
            case 500:
              errorMessage = '❌ Erro do servidor: Tente novamente em instantes';
              break;
            default:
              errorMessage = `❌ Erro de conexão (Código: ${response.status})`;
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('✅ Cadastro bem-sucedido:', data);

        showLoadingButton(submitBtn, '✅ Sucesso!', true);
        
        setTimeout(() => {
          signupForm.reset();
          loginBtn.click();
          notify.success('Conta criada!', 'Agora você pode fazer login com suas credenciais.');
        }, 1000);

      } catch (error) {
        console.error('❌ Erro no cadastro:', error);
        notify.error('Erro no cadastro', error.message || 'Não foi possível conectar ao servidor. Verifique sua internet.');
        showSpinner(submitBtn, false);
      }
    });
  } else {
    console.error('❌ Formulário de cadastro não encontrado!');
  }

  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('📧 Solicitação de código iniciada');

      const emailInput = document.getElementById('forgotEmail');
      const submitBtn = forgotPasswordForm.querySelector('.submit-btn');
      const email = emailInput.value.trim();

      if (!email || !email.includes('@')) {
        notify.error('Email inválido', 'Por favor, digite um endereço de email válido');
        return;
      }

      try {
        showSpinner(submitBtn, true);

        // Timeout para mobile (12 segundos)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CONFIG.SETTINGS.REQUEST_TIMEOUT);

        const response = await fetch(getApiUrl('FORGOT_PASSWORD'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ email }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          let errorMessage = '';
          switch (response.status) {
            case 400:
              errorMessage = '❌ Email inválido. Verifique e tente novamente.';
              break;
            case 429:
              errorMessage = '❌ Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.';
              break;
            case 500:
              errorMessage = '❌ Erro no servidor. Tente novamente em instantes.';
              break;
            default:
              errorMessage = `❌ Erro de conexão (${response.status}). Verifique sua internet.`;
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('✅ Resposta do servidor:', data);
        
        notify.success(
          'Código enviado!', 
          `Verifique seu email e digite o código de 6 dígitos. O código expira em ${data.expiresIn || '10 minutos'}.`,
          8000
        );
        showForm(verifyCodeForm);
        sessionStorage.setItem('resetEmail', email);

      } catch (error) {
        console.error('❌ Erro ao enviar código:', error);
        
        let errorMessage = 'Erro ao enviar código. Tente novamente.';
        
        if (error.name === 'AbortError') {
          errorMessage = 'Conexão muito lenta. Verifique sua internet e tente novamente.';
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        notify.error('Erro ao enviar código', errorMessage);
        showSpinner(submitBtn, false);
      }
    });
  }

  if (verifyCodeForm) {
    verifyCodeForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('🔐 Verificação de código iniciada');

      const codeInput = document.getElementById('verificationCode');
      const newPasswordInput = document.getElementById('newPassword');
      const confirmPasswordInput = document.getElementById('confirmNewPassword');
      const submitBtn = verifyCodeForm.querySelector('.submit-btn');

      const code = codeInput.value.trim();
      const newPassword = newPasswordInput.value;
      const confirmPassword = confirmPasswordInput.value;
      const email = sessionStorage.getItem('resetEmail');

      if (!code) {
        notify.error('Código necessário', 'Digite o código de 6 dígitos recebido por email');
        return;
      }

      if (!newPassword || newPassword.length < CONFIG.SETTINGS.PASSWORD_MIN_LENGTH) {
        notify.error('Senha fraca', `A senha deve ter pelo menos ${CONFIG.SETTINGS.PASSWORD_MIN_LENGTH} caracteres`);
        return;
      }

      if (newPassword !== confirmPassword) {
        notify.error('Senhas não coincidem', 'As senhas digitadas são diferentes');
        return;
      }

      try {
        showSpinner(submitBtn, true);

        // Étape 1: Vérifier le code
        const verifyResponse = await fetch(getApiUrl('VERIFY_RESET_CODE'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            email, 
            code
          })
        });

        if (!verifyResponse.ok) {
          const error = await verifyResponse.json();
          throw new Error(error.message || 'Código inválido ou expirado');
        }

        const verifyData = await verifyResponse.json();
        const resetToken = verifyData.resetToken;

        // Étape 2: Redéfinir la senha com o token
        const resetResponse = await fetch(getApiUrl('RESET_PASSWORD'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            resetToken, 
            newPassword 
          })
        });

        if (!resetResponse.ok) {
          const error = await resetResponse.json();
          throw new Error(error.message || 'Erro ao redefinir senha');
        }

        const resetData = await resetResponse.json();
        console.log('✅ Senha redefinida:', resetData);
        
        notify.success('Senha redefinida!', 'Agora você pode fazer login com sua nova senha.');
        
        sessionStorage.removeItem('resetEmail');
        verifyCodeForm.reset();
        showForm(loginFormUI);

      } catch (error) {
        console.error('❌ Erro ao redefinir senha:', error);
        notify.error('Erro ao redefinir senha', error.message || 'Verifique se o código está correto e tente novamente.');
        showSpinner(submitBtn, false);
      }
    });
  }

  console.log('🎉 CINEHOME inicializado com sucesso!');
});