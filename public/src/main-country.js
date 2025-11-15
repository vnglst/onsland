import { render } from 'preact';
import { html } from 'htm/preact';
import { I18nProvider } from './context/I18nContext.js';
import { CountryPage } from './components/CountryPage.js';

// Get country from URL
const urlParams = new URLSearchParams(window.location.search);
const validCountries = [
  "austria", "belgium", "bulgaria", "croatia", "czechia", "denmark",
  "estonia", "finland", "france", "germany", "greece", "hungary",
  "ireland", "italy", "latvia", "lithuania", "luxembourg",
  "netherlands", "poland", "portugal", "romania", "slovakia",
  "slovenia", "spain", "sweden", "uk"
];
const countryFromUrl = urlParams.get("country");
const currentCountry = validCountries.includes(countryFromUrl) ? countryFromUrl : "netherlands";

// Mount the CountryPage component
function initApp() {
  const root = document.getElementById('app');
  if (!root) {
    console.error('Root element #app not found');
    return;
  }

  render(html`
    <${I18nProvider}>
      <${CountryPage} countryKey=${currentCountry} />
    </${I18nProvider}>
  `, root);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
