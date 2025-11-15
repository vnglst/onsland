import { html } from 'htm/preact';
import { useEffect } from 'preact/hooks';
import { useI18n } from '../hooks/useI18n.js';
import { Menu } from './Menu.js';

export function AboutPage() {
  const { t } = useI18n();

  // Update page title and meta description
  useEffect(() => {
    document.title = t('about.title');
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('about.metaDescription'));
    }
  }, [t]);

  return html`
    <>
      <${Menu} />
      <div id="aboutContent">
        <!-- About page content will be in the HTML -->
      </div>
    </>
  `;
}
