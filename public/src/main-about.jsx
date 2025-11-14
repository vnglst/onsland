import { render } from 'preact';
import { I18nProvider } from './context/I18nContext.jsx';
import { AboutPage } from './components/AboutPage.jsx';

// Mount the AboutPage component
function initApp() {
  const root = document.getElementById('app');
  if (!root) {
    console.error('Root element #app not found');
    return;
  }

  render(
    <I18nProvider>
      <AboutPage />
    </I18nProvider>,
    root
  );
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
