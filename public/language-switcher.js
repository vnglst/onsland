// Language Switcher Component
// Creates a dropdown for language selection

function createLanguageSwitcher() {
  const currentLang = i18n.currentLanguage;
  const languages = i18n.getAvailableLanguages();

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
    i18n.changeLanguage(e.target.value);
  });

  return select;
}

// Initialize language switcher on page load
function initLanguageSwitcher() {
  const headerContent = document.querySelector('.homepage-header, #countryHeader');
  const switcher = createLanguageSwitcher();
  headerContent.appendChild(switcher);
}

// Export for use in HTML pages
window.initLanguageSwitcher = initLanguageSwitcher;
