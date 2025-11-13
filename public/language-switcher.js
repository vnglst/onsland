// Language Switcher Component
// Creates a dropdown for language selection

function createLanguageSwitcher() {
  const currentLang = i18n.getCurrentLanguage();
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'nl', name: 'Nederlands' },
    { code: 'fr', name: 'Français' }
  ];

  const select = document.createElement('select');
  select.className = 'language-switcher';
  select.title = 'Select language';

  languages.forEach(lang => {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = lang.name;
    if (lang.code === currentLang) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  select.addEventListener('change', (e) => {
    switchLanguage(e.target.value);
  });

  return select;
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
