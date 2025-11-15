import { render } from 'preact';
import { html } from 'htm/preact';
import { I18nProvider } from './context/I18nContext.js';
import { RankingsPage } from './components/RankingsPage.js';

// Mount the RankingsPage component
function initApp() {
  const root = document.getElementById('app');
  if (!root) {
    console.error('Root element #app not found');
    return;
  }

  render(html`
    <${I18nProvider}>
      <${RankingsPage} />
    <//>
  `, root);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
