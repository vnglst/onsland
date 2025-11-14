import { useContext } from 'preact/hooks';
import { I18nContext } from '../context/I18nContext.jsx';

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
