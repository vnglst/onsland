import { render } from 'preact';
import { I18nProvider } from './context/I18nContext.jsx';
import { HomePage } from './components/HomePage.jsx';

// Mount the HomePage component
function initApp() {
  const root = document.getElementById('app');
  if (!root) {
    console.error('Root element #app not found');
    return;
  }

  render(
    <I18nProvider>
      <HomePage />
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
