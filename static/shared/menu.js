// Menu functionality - handles menu open/close and interactions
// This file runs in the browser, not in Deno
let isOpen = false;

const closeMenu = () => {
  isOpen = false;
  document.body.classList.remove('menu-open');
  const panel = document.querySelector('.menu-panel');
  if (panel) panel.classList.remove('open');
};

const openMenu = () => {
  isOpen = true;
  document.body.classList.add('menu-open');
  const panel = document.querySelector('.menu-panel');
  if (panel) panel.classList.add('open');
};

const handleClickOutside = (e) => {
  const target = e.target;
  if (isOpen && !target.closest('.menu-panel') && !target.closest('.hamburger')) {
    closeMenu();
    document.removeEventListener('click', handleClickOutside);
  }
};

const toggleMenu = () => {
  if (!isOpen) {
    openMenu();
    document.addEventListener('click', handleClickOutside);
  } else {
    closeMenu();
    document.removeEventListener('click', handleClickOutside);
  }
};

const handleLanguageChange = (e) => {
  const newLang = e.target.value;
  if (globalThis.i18n) {
    globalThis.i18n.changeLanguage(newLang);
  }
};

const handleViewToggle = () => {
  if (globalThis.toggleView) {
    globalThis.toggleView();
  } else if (globalThis.toggleLayout) {
    globalThis.toggleLayout();
  }
};

// Initialize menu when DOM is ready
const initMenu = () => {
  const hamburger = document.querySelector('.hamburger');
  const closeBtn = document.querySelector('.menu-close');
  const menuLinks = document.querySelectorAll('.menu-link');
  const languageSwitcher = document.querySelector('.menu-language-switcher');
  const viewToggle = document.getElementById('menuViewToggle');

  hamburger?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  closeBtn?.addEventListener('click', () => {
    closeMenu();
    document.removeEventListener('click', handleClickOutside);
  });

  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  languageSwitcher?.addEventListener('change', handleLanguageChange);
  viewToggle?.addEventListener('click', handleViewToggle);
};

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMenu);
} else {
  initMenu();
}
