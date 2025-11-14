import { useI18n } from '../hooks/useI18n.js';

export function LanguageSwitcher({ className = 'language-switcher' }) {
  const { currentLanguage, availableLanguages, changeLanguage } = useI18n();

  const handleChange = (e) => {
    changeLanguage(e.target.value);
  };

  return (
    <select
      className={className}
      value={currentLanguage}
      onChange={handleChange}
      title="Select language"
    >
      {availableLanguages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}
