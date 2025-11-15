import { createContext } from 'preact';
import { useState, useEffect, useCallback, useMemo } from 'preact/hooks';
import { html } from 'htm/preact';

// Create the i18n context
export const I18nContext = createContext(null);

// I18n Provider Component
export function I18nProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    try {
      return localStorage.getItem('language') || 'en';
    } catch (e) {
      return 'en';
    }
  });

  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Load translations for a specific language
  const loadTranslations = useCallback(async (language) => {
    try {
      const response = await fetch(`/locales/${language}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${language}`);
      }
      const data = await response.json();
      setTranslations(prev => ({ ...prev, [language]: data }));
      return data;
    } catch (error) {
      console.error(`Error loading translations for ${language}:`, error);
      throw error;
    }
  }, []);

  // Initialize with current language
  useEffect(() => {
    const initTranslations = async () => {
      if (!translations[currentLanguage]) {
        await loadTranslations(currentLanguage);
      }
      setIsLoading(false);
    };
    initTranslations();
  }, [currentLanguage, translations, loadTranslations]);

  // Get translation by key (supports nested keys with dot notation)
  const t = useCallback((key) => {
    const keys = key.split('.');
    let result = translations[currentLanguage];

    for (const k of keys) {
      if (result === undefined) {
        console.warn(`Translation not found for key: ${key}`);
        return key;
      }
      result = result[k];
    }

    return result === undefined ? key : result;
  }, [currentLanguage, translations]);

  // Change language
  const changeLanguage = useCallback(async (language) => {
    if (language === currentLanguage) return;

    try {
      if (!translations[language]) {
        await loadTranslations(language);
      }
      setCurrentLanguage(language);
      localStorage.setItem('language', language);

      // Dispatch event for legacy code compatibility
      window.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { language }
      }));
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  }, [currentLanguage, translations, loadTranslations]);

  // Get available languages
  const availableLanguages = useMemo(() => [
    { code: 'en', name: 'English' },
    { code: 'nl', name: 'Nederlands' },
    { code: 'fr', name: 'Français' }
  ], []);

  const value = useMemo(() => ({
    currentLanguage,
    translations,
    t,
    changeLanguage,
    availableLanguages,
    isLoading
  }), [currentLanguage, translations, t, changeLanguage, availableLanguages, isLoading]);

  // Expose translate function globally for D3 and legacy code
  useEffect(() => {
    window.i18nTranslate = t;
    return () => {
      delete window.i18nTranslate;
    };
  }, [t]);

  return html`
    <${I18nContext.Provider} value=${value}>
      ${children}
    </${I18nContext.Provider}>
  `;
}
