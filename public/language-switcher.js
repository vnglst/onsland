// Language Switcher Component
// Creates a simple language toggle button

function createLanguageSwitcher() {
  const currentLang = i18n.getCurrentLanguage();

  const button = document.createElement('button');
  button.className = 'language-switcher';
  button.textContent = currentLang === 'en' ? 'NL' : 'EN';
  button.title = currentLang === 'en' ? 'Switch to Dutch' : 'Switch to English';

  button.addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'nl' : 'en';
    switchLanguage(newLang);
  });

  return button;
}

async function switchLanguage(lang) {
  if (lang === i18n.getCurrentLanguage()) return;

  // Show loading state (optional)
  await i18n.changeLanguage(lang);
}

// Initialize language switcher on page load
function initLanguageSwitcher() {
  const headerContent = document.querySelector('.homepage-header, #countryHeader');
  if (!headerContent) return;

  const switcher = createLanguageSwitcher();
  headerContent.appendChild(switcher);
}

// Export for use in HTML pages
window.initLanguageSwitcher = initLanguageSwitcher;
