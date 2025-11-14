import { useEffect, useState, useRef } from 'preact/hooks';
import { useI18n } from '../hooks/useI18n.js';
import { Menu } from './Menu.jsx';

export function CountryPage({ countryKey }) {
  const [worldData, setWorldData] = useState(null);
  const [isSquareLayout, setIsSquareLayout] = useState(false);
  const { t } = useI18n();
  const svgRef = useRef(null);

  // Load world map data
  useEffect(() => {
    fetch("/lib/countries-50m.json")
      .then(response => response.json())
      .then(data => setWorldData(data))
      .catch(error => console.error("Error loading data:", error));
  }, []);

  // Update page title
  useEffect(() => {
    const countryNames = window.countryNames || {};
    const countryName = t(`countries.${countryKey}`) || countryNames[countryKey];
    document.title = `${t("country.titlePrefix")}${countryName} - OnsLand`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t("country.metaDescription"));
    }
  }, [countryKey, t]);

  // Render D3 visualization when data is loaded
  useEffect(() => {
    if (worldData && svgRef.current && window.renderCountryWithD3) {
      window.renderCountryWithD3(countryKey, svgRef.current, worldData, isSquareLayout);
    }
  }, [worldData, countryKey, isSquareLayout]);

  const toggleLayout = () => {
    setIsSquareLayout(prev => !prev);
    // Trigger D3 transition if function exists
    if (window.toggleD3Layout) {
      window.toggleD3Layout();
    }
  };

  const getViewToggleText = () => {
    return isSquareLayout ? t("country.mapView") : t("country.squareView");
  };

  const countryNames = window.countryNames || {};
  const countryName = t(`countries.${countryKey}`) || countryNames[countryKey];

  return (
    <>
      <Menu
        showViewToggle={true}
        onViewToggle={toggleLayout}
        getViewToggleText={getViewToggleText}
      />

      <div id="pageContent">
        <div id="countryHeader" className="title-container">
          <h1>
            <a href="/" className="back-link">←</a>
            <span className="title-country">{countryName}</span>
          </h1>
        </div>

        <div id="countryVisualization">
          <svg
            ref={svgRef}
            id="countrySvg"
            viewBox="0 0 800 800"
            preserveAspectRatio="xMidYMid"
          />
        </div>

        <div id="rankingsInfo" className="rankings-container">
          {/* Rankings will be rendered by D3/legacy code for now */}
        </div>
      </div>
    </>
  );
}
