import { render } from 'preact';
import { html } from 'htm/preact';
import { I18nProvider } from './context/I18nContext.js';
import { HomePage } from './components/HomePage.js';

console.log('[main-home] Module loaded');

// Mount the HomePage component
function initApp() {
  console.log('[main-home] Initializing app');
  const root = document.getElementById('app');
  if (!root) {
    console.error('[main-home] Root element #app not found');
    return;
  }

  console.log('[main-home] Root element found, rendering...');
  try {
    render(html`
      <${I18nProvider}>
        <${HomePage} />
      </${I18nProvider}>
    `, root);
    console.log('[main-home] Render complete');
  } catch (error) {
    console.error('[main-home] Render error:', error);
    root.innerHTML = `<div style="color: red; padding: 20px;">
      <h2>Error loading app</h2>
      <pre>${error.message}\n${error.stack}</pre>
    </div>`;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  console.log('[main-home] Waiting for DOM...');
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  console.log('[main-home] DOM already ready');
  initApp();
}
