// i18n.js - Internationalization support for OnsLand
class I18n {
  constructor() {
    this.translations = {};
    this.currentLanguage = this.getStoredLanguage() || 'en';
    this.listeners = [];
  }

  // Get stored language from localStorage
  getStoredLanguage() {
    try {
      return localStorage.getItem('language') || null;
    } catch (e) {
      return null;
    }
  }

  // Store language preference
  setStoredLanguage(lang) {
    try {
      localStorage.setItem('language', lang);
    } catch (e) {
      console.warn('Could not save language preference:', e);
    }
  }

  // Load translation file
  async loadTranslations(language) {
    try {
      const response = await fetch(`/locales/${language}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${language}`);
      }
      const data = await response.json();
      this.translations[language] = data;
      return data;
    } catch (error) {
      console.error(`Error loading translations for ${language}:`, error);
      throw error;
    }
  }

  // Initialize with a specific language
  async init(language) {
    if (!this.translations[language]) {
      await this.loadTranslations(language);
    }
    this.currentLanguage = language;
    this.setStoredLanguage(language);
    return this.translations[language];
  }

  // Get translation by key (supports nested keys with dot notation)
  t(key) {
    const translation = this.getNestedTranslation(key);

    if (translation === undefined) {
      console.warn(`Translation not found for key: ${key}`);
      return key;
    }

    return translation;
  }

  // Get nested translation using dot notation (e.g., "categories.water")
  getNestedTranslation(key) {
    const keys = key.split('.');
    let result = this.translations[this.currentLanguage];

    for (const k of keys) {
      if (result === undefined) return undefined;
      result = result[k];
    }

    return result;
  }

  // Change language and notify listeners
  async changeLanguage(language) {
    if (language === this.currentLanguage) return;

    await this.init(language);
    this.listeners.forEach(callback => callback(language));
  }

  // Subscribe to language changes
  onLanguageChange(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  // Get available languages with display names
  getAvailableLanguages() {
    return [
      { code: 'en', name: 'English' },
      { code: 'nl', name: 'Nederlands' },
      { code: 'fr', name: 'Français' }
    ];
  }
}

// Create global instance
const i18n = new I18n();

// Helper function to update all elements with data-i18n attribute
function updateTranslations() {
  // Single DOM query for all translation elements
  document.querySelectorAll('[data-i18n], [data-i18n-html], [data-i18n-title]').forEach(element => {
    // Check which attribute is present and update accordingly
    let key, translation;

    if (element.hasAttribute('data-i18n-title')) {
      key = element.getAttribute('data-i18n-title');
      document.title = i18n.t(key);
    } else if (element.hasAttribute('data-i18n-html')) {
      key = element.getAttribute('data-i18n-html');
      element.innerHTML = i18n.t(key);
    } else if (element.hasAttribute('data-i18n')) {
      key = element.getAttribute('data-i18n');
      translation = i18n.t(key);

      if (element.hasAttribute('data-i18n-placeholder')) {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    }
  });
}

// Initialize i18n and update page
async function initI18n() {
  try {
    await i18n.init(i18n.currentLanguage);
    updateTranslations();

    // Listen for language changes and update page
    i18n.onLanguageChange((language) => {
      updateTranslations();
      window.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { language }
      }));
    });
  } catch (error) {
    console.error('Failed to initialize i18n:', error);
  }
}

// Export for use in other scripts
window.i18n = i18n;
window.initI18n = initI18n;
window.updateTranslations = updateTranslations;
