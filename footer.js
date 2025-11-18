// Monta dinamicamente o rodapé com navegação e redes sociais.
// Foco em acessibilidade: títulos SR-only, ARIA labels e aria-live.
(() => {
  const createLink = (href, label) => {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    a.className = 'footer-link';
    a.target = href.startsWith('#') ? '' : '_blank';
    if (a.target === '_blank') a.rel = 'noopener noreferrer';
    return a;
  };

  const createSection = (title, links) => {
    const section = document.createElement('section');
    section.className = 'footer-section';
    const h = document.createElement('h3');
    h.className = 'footer-section-title sr-only'; // visível para leitores de tela
    h.textContent = title;
    const ul = document.createElement('ul');
    ul.className = 'footer-list';
    links.forEach(l => {
      const li = document.createElement('li');
      li.appendChild(createLink(l.href, l.label));
      ul.appendChild(li);
    });
    section.append(h, ul);
    return section;
  };

  const socialIcon = (name) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.classList.add('svg-icon');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let d = '';
    switch (name) {
      case 'facebook':
        d = 'M22 12a10 10 0 1 0-11.6 9.9v-7h-2.3V12h2.3V9.7c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.4.7-1.4 1.4V12h2.6l-.4 2.9h-2.2v7A10 10 0 0 0 22 12z';
        break;
      case 'instagram':
        d = 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6-2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z';
        break;
      case 'x':
        d = 'M3 3h4.6l5.2 6.7L17.8 3H21l-7.6 9.3L21 21h-4.6l-5.6-7.2L6.2 21H3l8-9.8z';
        break;
      case 'youtube':
        d = 'M23.5 6.2s-.2-1.6-.9-2.3c-.8-.9-1.7-.9-2.1-1C17.8 2.5 12 2.5 12 2.5h0s-5.8 0-8.5.4c-.4 0-1.3.1-2.1 1-.7.7-.9 2.3-.9 2.3S0 8.1 0 10v1.9c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.8.9 1.8.9 2.3 1 1.7.2 7.6.4 8.6.4s8.5-.1 10.2-.4c.4-.1 1.3-.1 2.1-1 .7-.7.9-2.3.9-2.3S24 13.8 24 12V10c0-1.9-.5-3.8-.5-3.8zm-14 8.4V8.1l6.2 3.2-6.2 3.3z';
        break;
      default:
        d = 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z';
    }
    path.setAttribute('d', d);
    svg.appendChild(path);
    return svg;
  };

  const createSocialLink = (name, href, label) => {
    const a = document.createElement('a');
    a.href = href;
    a.className = 'footer-social-link';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', label); // descrever destino do link para ARIA
    a.appendChild(socialIcon(name));
    return a;
  };



  const buildFooter = () => {
    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.setAttribute('role', 'contentinfo');

    const container = document.createElement('div');
    container.className = 'footer-container';

    const nav = document.createElement('nav');
    nav.className = 'footer-grid';
    nav.setAttribute('aria-label', 'Rodapé'); // região navegável do rodapé

    const institutional = createSection('Institucional', [
      { href: '#ajuda', label: 'Central de Ajuda' },
      { href: '#termos', label: 'Termos de Uso' },
      { href: '#privacidade', label: 'Privacidade' }
    ]);

    const about = createSection('Sobre', [
      { href: '#corporativa', label: 'Informações corporativas' },
      { href: '#avisos', label: 'Avisos legais' },
      { href: '#legal', label: 'Centro de Ajuda Legal' }
    ]);

    nav.append(institutional, about);

    const bottom = document.createElement('div');
    bottom.className = 'footer-bottom';

    const social = document.createElement('div');
    social.className = 'footer-social';
    social.append(
      createSocialLink('facebook', 'https://www.facebook.com/CineHomebrasil', 'CineHome no Facebook'),
      createSocialLink('instagram', 'https://www.instagram.com/CineHomebrasil', 'CineHome no Instagram'),
      createSocialLink('x', 'https://x.com/CineHome', 'CineHome no X'),
      createSocialLink('youtube', 'https://www.youtube.com/user/CineHomeBR', 'CineHome no YouTube')
    );

    const copy = document.createElement('div');
    copy.className = 'footer-copy';
    const year = new Date().getFullYear();
    copy.textContent = `© ${year} CineHome Brasil`;

    bottom.append(social, copy);
    container.append(nav, bottom);
    footer.appendChild(container);
    return footer;
  };

  const mount = () => {
    const el = buildFooter(); // monta estrutura completa do rodapé
    const existing = document.getElementById('app-footer');
    if (existing) {
      existing.replaceWith(el); // substitui se existir placeholder
    } else {
      document.body.appendChild(el); // anexa ao body
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

  window.AppFooter = { createLink, createSection, mount };
})();