// Menu Component
// Creates a hamburger menu for navigation, language switching, and view toggling

function createMenu() {
  // Hamburger button (will be added to navbar by initMenu)
  const hamburger = document.createElement('button');
  hamburger.className = 'hamburger';
  hamburger.setAttribute('aria-label', 'Menu');
  hamburger.setAttribute('id', 'menu-hamburger');
  hamburger.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;

  // Menu panel
  const menuPanel = document.createElement('div');
  menuPanel.className = 'menu-panel';

  // Close button
  const closeButton = document.createElement('button');
  closeButton.className = 'menu-close';
  closeButton.setAttribute('aria-label', 'Close menu');
  closeButton.innerHTML = '×';
  menuPanel.appendChild(closeButton);

  // Navigation section
  const navSection = document.createElement('div');
  navSection.className = 'menu-section';

  const navTitle = document.createElement('h3');
  navTitle.setAttribute('data-i18n', 'menu.navigation');
  navTitle.textContent = 'Navigation';
  navSection.appendChild(navTitle);

  const navLinks = [
    { href: '/', key: 'menu.home', text: 'Home' },
    { href: '/rankings.html', key: 'menu.rankings', text: 'Rankings' },
    { href: '/about.html', key: 'menu.about', text: 'About' },
  ];

  navLinks.forEach((link) => {
    const a = document.createElement('a');
    a.href = link.href;
    a.className = 'menu-link';
    a.setAttribute('data-i18n', link.key);
    a.textContent = link.text;
    navSection.appendChild(a);
  });

  menuPanel.appendChild(navSection);

  // Language section
  const langSection = document.createElement('div');
  langSection.className = 'menu-section';

  const langTitle = document.createElement('h3');
  langTitle.setAttribute('data-i18n', 'menu.language');
  langTitle.textContent = 'Language';
  langSection.appendChild(langTitle);

  const languageSwitcher = createLanguageSwitcher();
  languageSwitcher.className = 'language-switcher menu-language-switcher';
  langSection.appendChild(languageSwitcher);

  menuPanel.appendChild(langSection);

  // View toggle section (only for homepage and country pages)
  const viewSection = document.createElement('div');
  viewSection.className = 'menu-section menu-view-section hidden';

  const viewTitle = document.createElement('h3');
  viewTitle.setAttribute('data-i18n', 'menu.view');
  viewTitle.textContent = 'View';
  viewSection.appendChild(viewTitle);

  const viewToggle = document.createElement('button');
  viewToggle.className = 'menu-button menu-view-toggle';
  viewToggle.id = 'menuViewToggle';
  viewSection.appendChild(viewToggle);

  menuPanel.appendChild(viewSection);

  // Toggle menu
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = menuPanel.classList.toggle('open');
    hamburger.classList.toggle('open');
    document.body.classList.toggle('menu-open', isOpen);
  });

  // Close button
  closeButton.addEventListener('click', () => {
    menuPanel.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.classList.remove('menu-open');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !menuPanel.contains(e.target) && menuPanel.classList.contains('open')) {
      menuPanel.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
  });

  // Close menu when clicking a link
  menuPanel.querySelectorAll('.menu-link').forEach((link) => {
    link.addEventListener('click', () => {
      menuPanel.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });

  return { hamburger, menuPanel };
}

function initMenu(options = {}) {
  const { hamburger, menuPanel } = createMenu();

  // Add hamburger to navbar
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.appendChild(hamburger);
  }

  // Add menu panel to body
  document.body.appendChild(menuPanel);

  // Update translations for menu items
  if (window.updateTranslations) {
    window.updateTranslations();
  }

  // Show view toggle if enabled
  if (options.showViewToggle) {
    const viewSection = menuPanel.querySelector('.menu-view-section');
    viewSection.classList.remove('hidden');

    const viewToggle = menuPanel.querySelector('#menuViewToggle');
    if (options.onViewToggle) {
      viewToggle.addEventListener('click', () => {
        options.onViewToggle();
        // Update button text
        if (options.getViewToggleText) {
          viewToggle.textContent = options.getViewToggleText();
        }
      });

      // Set initial text
      if (options.getViewToggleText) {
        viewToggle.textContent = options.getViewToggleText();
      }
    }
  }

  return { hamburger, menuPanel };
}

window.initMenu = initMenu;
