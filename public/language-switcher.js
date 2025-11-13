// Language Switcher Component
// Creates a simple language toggle button

function createLanguageSwitcher() {
  const currentLang = i18n.getCurrentLanguage();
  const languages = ['en', 'nl', 'fr'];
  const languageNames = { en: 'EN', nl: 'NL', fr: 'FR' };
  const languageTitles = {
    en: 'Switch to English',
    nl: 'Switch to Dutch',
    fr: 'Switch to French'
  };

  // Find next language in cycle
  const currentIndex = languages.indexOf(currentLang);
  const nextIndex = (currentIndex + 1) % languages.length;
  const nextLang = languages[nextIndex];

  const button = document.createElement('button');
  button.className = 'language-switcher';
  button.textContent = languageNames[nextLang];
  button.title = languageTitles[nextLang];

  button.addEventListener('click', () => {
    switchLanguage(nextLang);
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
