// Profile Menu Handler
(function() {
  'use strict';

  // Variable globale pour stocker le profil sélectionné en attente de PIN
  let selectedProfileId = null;

  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', initProfileMenu);

  function initProfileMenu() {
    // Get elements
    const avatarBtn = document.getElementById('profile-avatar-btn');
    const dropdown = document.getElementById('profile-dropdown');
    const profileItems = document.querySelectorAll('.profile-item');
    const manageProfilesBtn = document.getElementById('manage-profiles');
    const exitProfileBtn = document.getElementById('exit-profile');
    const accountBtn = document.getElementById('account-settings');
    const helpBtn = document.getElementById('help-center');
    const logoutBtn = document.getElementById('btn-logout');

    if (!avatarBtn || !dropdown) {
      console.warn('Profile menu elements not found');
      return;
    }

    // Toggle dropdown
    avatarBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleDropdown();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target) && e.target !== avatarBtn) {
        closeDropdown();
      }
    });

    // Close dropdown on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isDropdownOpen()) {
        closeDropdown();
        avatarBtn.focus();
      }
    });

    // Profile selection with PIN verification
    profileItems.forEach(item => {
      item.addEventListener('click', function() {
        const profileId = this.getAttribute('data-profile');
        handleProfileSwitch(profileId);
      });
    });

    // Manage profiles
    if (manageProfilesBtn) {
      manageProfilesBtn.addEventListener('click', function() {
        console.log('Gerenciar perfis');
        closeDropdown();
        // Redirect to profile settings page
        window.location.href = 'profile-settings.html';
      });
    }

    // Exit profile
    if (exitProfileBtn) {
      exitProfileBtn.addEventListener('click', function() {
        console.log('Sair do perfil');
        closeDropdown();
        notify.info('Voltando...', 'Retornando à seleção de perfis', 2000);
        setTimeout(() => {
          // Go back to profile selection
          window.location.href = 'profil.html';
        }, 500);
      });
    }

    // Account settings
    if (accountBtn) {
      accountBtn.addEventListener('click', function() {
        console.log('Configurações da conta');
        closeDropdown();
        // Open account settings
        window.location.href = 'conta.html';
      });
    }

    // Help center
    if (helpBtn) {
      helpBtn.addEventListener('click', function() {
        console.log('Central de ajuda');
        closeDropdown();
        // Redirect to ajuda.html page
        window.location.href = 'ajuda.html';
      });
    }

    // Logout
    if (logoutBtn) {
      logoutBtn.addEventListener('click', async function(e) {
        e.preventDefault();
        closeDropdown();
        
        // Utiliser la modal de confirmation stylisée
        const confirmed = await confirmModal.danger(
          'Sair da CINEHOME?',
          'Deseja realmente sair da sua conta?',
          'Sair',
          'Cancelar'
        );
        
        if (confirmed) {
          // Show loading notification
          notify.info('Saindo...', 'Até logo!', 2000);
          
          setTimeout(() => {
            // Use auth.js logout if available
            if (typeof auth !== 'undefined' && auth.logout) {
              auth.logout();
            } else {
              // Fallback logout
              localStorage.removeItem('cinehome_user');
              sessionStorage.clear();
              window.location.href = 'index.html';
            }
          }, 500);
        }
      });
    }

    // Initialize current profile avatar and lock icons
    loadCurrentProfile();
    updateProfileLockIcons();
    setupPinModal();
  }

  // Gérer le changement de profil avec vérification PIN
  function handleProfileSwitch(profileId) {
    const profiles = JSON.parse(localStorage.getItem('cinehome_profiles') || '{}');
    const profile = profiles[profileId];
    
    // Vérifier si le profil est verrouillé
    if (profile && profile.locked && profile.password) {
      // Profil verrouillé - demander le PIN
      selectedProfileId = profileId;
      openPinModal(profileId);
    } else {
      // Profil non verrouillé - changement direct
      switchProfile(profileId);
    }
  }

  // Configurer le modal PIN
  function setupPinModal() {
    const pinInput = document.getElementById('pinInput');
    const pinModal = document.getElementById('pinModal');
    
    if (!pinInput || !pinModal) return;

    // Vérification automatique quand 4 chiffres sont entrés
    pinInput.addEventListener('input', function(e) {
      this.value = this.value.replace(/[^0-9]/g, '');
      
      if (this.value.length === 4) {
        setTimeout(() => verifyPin(), 300);
      }
    });

    // Fermer avec ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && pinModal.classList.contains('active')) {
        closePinModal();
      }
    });

    // Fermer en cliquant en dehors
    pinModal.addEventListener('click', function(e) {
      if (e.target === pinModal) {
        closePinModal();
      }
    });
  }

  // Ouvrir le modal PIN
  function openPinModal(profileId) {
    const pinModal = document.getElementById('pinModal');
    const pinInput = document.getElementById('pinInput');
    const pinError = document.getElementById('pinError');
    
    if (!pinModal || !pinInput) return;

    closeDropdown();
    pinModal.classList.add('active');
    pinInput.value = '';
    pinInput.classList.remove('error');
    if (pinError) pinError.classList.remove('show');
    
    setTimeout(() => pinInput.focus(), 100);
  }

  // Fermer le modal PIN
  function closePinModal() {
    const pinModal = document.getElementById('pinModal');
    if (!pinModal) return;

    pinModal.classList.remove('active');
    selectedProfileId = null;
  }

  // Vérifier le PIN
  function verifyPin() {
    const pinInput = document.getElementById('pinInput');
    const pinError = document.getElementById('pinError');
    const enteredPin = pinInput.value;
    
    if (enteredPin.length !== 4 || !selectedProfileId) {
      return;
    }
    
    const profiles = JSON.parse(localStorage.getItem('cinehome_profiles') || '{}');
    const profile = profiles[selectedProfileId];
    
    if (profile && profile.password === enteredPin) {
      // PIN correct - changer de profil
      notify.success('PIN correto!', 'Trocando de perfil...', 1500);
      closePinModal();
      setTimeout(() => {
        switchProfile(selectedProfileId);
      }, 500);
    } else {
      // PIN incorrect
      notify.error('PIN incorreto', 'Código incorreto. Tente novamente.');
      pinInput.classList.add('error');
      if (pinError) {
        pinError.textContent = 'Código incorreto!';
        pinError.classList.add('show');
      }
      pinInput.value = '';
      
      setTimeout(() => {
        pinInput.classList.remove('error');
        if (pinError) pinError.classList.remove('show');
      }, 1500);
    }
  }

  // Mettre à jour les icônes de cadenas dans le menu
  function updateProfileLockIcons() {
    const profiles = JSON.parse(localStorage.getItem('cinehome_profiles') || '{}');
    const profileItems = document.querySelectorAll('.profile-item');
    
    profileItems.forEach(item => {
      const profileId = item.getAttribute('data-profile');
      const profile = profiles[profileId];
      const lockIcon = item.querySelector('.profile-unlock-icon');
      const numberSpan = item.querySelector('.profile-item-number');
      
      if (!lockIcon) return;

      // Mettre à jour le nom du profil
      if (profile && profile.name && numberSpan) {
        numberSpan.textContent = profile.name;
      }
      
      // Mettre à jour l'icône de cadenas
      if (profile && profile.locked) {
        lockIcon.classList.add('locked');
        // Cadenas fermé
        lockIcon.innerHTML = `
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        `;
      } else {
        lockIcon.classList.remove('locked');
        // Cadenas ouvert
        lockIcon.innerHTML = `
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
        `;
      }
    });
  }

  function toggleDropdown() {
    const dropdown = document.getElementById('profile-dropdown');
    const avatarBtn = document.getElementById('profile-avatar-btn');
    
    if (!dropdown || !avatarBtn) return;

    const isOpen = isDropdownOpen();
    
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  function openDropdown() {
    const dropdown = document.getElementById('profile-dropdown');
    const avatarBtn = document.getElementById('profile-avatar-btn');
    
    if (!dropdown || !avatarBtn) return;

    // Mettre à jour les icônes avant d'ouvrir
    updateProfileLockIcons();

    dropdown.classList.add('active');
    dropdown.setAttribute('aria-hidden', 'false');
    avatarBtn.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown() {
    const dropdown = document.getElementById('profile-dropdown');
    const avatarBtn = document.getElementById('profile-avatar-btn');
    
    if (!dropdown || !avatarBtn) return;

    dropdown.classList.remove('active');
    dropdown.setAttribute('aria-hidden', 'true');
    avatarBtn.setAttribute('aria-expanded', 'false');
  }

  function isDropdownOpen() {
    const dropdown = document.getElementById('profile-dropdown');
    return dropdown && dropdown.classList.contains('active');
  }

  function switchProfile(profileId) {
    console.log('Switching to profile:', profileId);
    
    // Save selected profile to localStorage
    localStorage.setItem('cinehome_current_profile', profileId);
    
    // Show notification
    const profiles = JSON.parse(localStorage.getItem('cinehome_profiles') || '{}');
    const profile = profiles[profileId];
    const profileName = (profile && profile.name) ? profile.name : profileId;
    notify.success('Perfil alterado!', `Agora você está usando o perfil ${profileName}`);
    
    // Update avatar immediately
    updateAvatarDisplay(profileId);
    
    // Atualizar contador de favoritos para o novo perfil
    if (window.Favoritos && typeof window.Favoritos.atualizarContador === 'function') {
      console.log('Atualizando contador de favoritos para perfil:', profileId);
      window.Favoritos.atualizarContador();
    }
    
    // Close dropdown
    closeDropdown();
  }

  function updateAvatarDisplay(profileId) {
    const avatarImg = document.getElementById('profile-avatar-img');
    if (avatarImg) {
      avatarImg.src = `imagens/avatar-${profileId}.svg`;
      avatarImg.alt = `Avatar do perfil ${profileId}`;
      
      // Force reload of the image
      avatarImg.onerror = function() {
        console.error(`Failed to load avatar: imagens/avatar-${profileId}.svg`);
        // Fallback to a default avatar if the specific one fails
        this.src = 'imagens/avatar-01.svg';
      };
    }
  }

  function loadCurrentProfile() {
    // Load saved profile or default to 01
    const currentProfile = localStorage.getItem('cinehome_current_profile') || '01';
    updateAvatarDisplay(currentProfile);
  }

})();
