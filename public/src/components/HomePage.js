import { html } from 'htm/preact';
import { useState, useEffect } from 'preact/hooks';
import { useI18n } from '../hooks/useI18n.js';
import { Menu } from './Menu.js';
import { CountryCard } from './CountryCard.js';

const validCountries = [
  "austria", "belgium", "bulgaria", "croatia", "czechia", "denmark",
  "estonia", "finland", "france", "germany", "greece", "hungary",
  "ireland", "italy", "latvia", "lithuania", "luxembourg",
  "netherlands", "poland", "portugal", "romania", "slovakia",
  "slovenia", "spain", "sweden", "uk"
];

const countryNames = {
  austria: "Austria",
  belgium: "Belgium",
  bulgaria: "Bulgaria",
  croatia: "Croatia",
  czechia: "Czechia",
  denmark: "Denmark",
  estonia: "Estonia",
  finland: "Finland",
  france: "France",
  germany: "Germany",
  greece: "Greece",
  hungary: "Hungary",
  ireland: "Ireland",
  italy: "Italy",
  latvia: "Latvia",
  lithuania: "Lithuania",
  luxembourg: "Luxembourg",
  netherlands: "The Netherlands",
  poland: "Poland",
  portugal: "Portugal",
  romania: "Romania",
  slovakia: "Slovakia",
  slovenia: "Slovenia",
  spain: "Spain",
  sweden: "Sweden",
  uk: "United Kingdom",
};

export function HomePage() {
  const [worldData, setWorldData] = useState(null);
  const [isSquareView, setIsSquareView] = useState(false);
  const { t } = useI18n();

  // Load world map data
  useEffect(() => {
    fetch("/lib/countries-50m.json")
      .then(response => response.json())
      .then(data => setWorldData(data))
      .catch(error => console.error("Error loading data:", error));
  }, []);

  // Update page title
  useEffect(() => {
    document.title = t('homepage.title');
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('homepage.metaDescription'));
    }
  }, [t]);

  const toggleView = () => {
    setIsSquareView(prev => !prev);
  };

  const getViewToggleText = () => {
    return isSquareView ? t('homepage.mapView') : t('homepage.squareView');
  };

  return html`
    <div>
      <${Menu}
        showViewToggle=${true}
        onViewToggle=${toggleView}
        getViewToggleText=${getViewToggleText}
      />

      <div id="homepage" class="homepage-grid">
        ${validCountries.map(countryKey => html`
          <${CountryCard}
            key=${countryKey}
            countryKey=${countryKey}
            worldData=${worldData}
            isSquareView=${isSquareView}
            countryNames=${countryNames}
          />
        `)}
      </div>
    </div>
  `;
}
