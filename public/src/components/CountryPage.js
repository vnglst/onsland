import { html } from 'htm/preact';
import { useEffect, useState, useRef } from 'preact/hooks';
import { useI18n } from '../hooks/useI18n.js';
import { useCountryRankings } from '../hooks/useCountryRankings.js';
import { Menu } from './Menu.js';
import { RankingBadge } from './RankingBadge.js';

export function CountryPage({ countryKey }) {
  const [worldData, setWorldData] = useState(null);
  const [isSquareLayout, setIsSquareLayout] = useState(false);
  const { t } = useI18n();
  const svgRef = useRef(null);
  const rankings = useCountryRankings(countryKey);

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

  // Filter and sort rankings
  const multiCountryRankings = rankings.filter((r) => r.totalCountries > 3);
  const sortedRankings = [...multiCountryRankings].sort((a, b) => a.position - b.position);
  const topRankings = sortedRankings.slice(0, 2);
  const bottomRankings = sortedRankings.slice(-2).reverse();

  return html`
    <div>
      <${Menu}
        showViewToggle=${true}
        onViewToggle=${toggleLayout}
        getViewToggleText=${getViewToggleText}
      />

      <div id="pageContent">
        <div id="countryHeader" class="title-container">
          <h1>
            <a href="/" class="back-link">←</a>
            <span class="title-country">${countryName}</span>
          </h1>
        </div>

        <div id="countryVisualization">
          <svg
            ref=${svgRef}
            id="countrySvg"
            viewBox="0 0 800 800"
            preserveAspectRatio="xMidYMid"
          />
        </div>

        <div id="rankingsInfo" class="rankings-info">
          ${topRankings.map((ranking, index) => html`
            <${RankingBadge}
              key=${'top-' + ranking.categoryName}
              ranking=${ranking}
              labelKey=${index === 0 ? "country.highestRanking" : "country.secondHighest"}
              isTopRank=${true}
            />
          `)}
          ${bottomRankings.map((ranking, index) => html`
            <${RankingBadge}
              key=${'bottom-' + ranking.categoryName}
              ranking=${ranking}
              labelKey=${index === 0 ? "country.lowestRanking" : "country.secondLowest"}
              isTopRank=${false}
            />
          `)}
        </div>
      </div>
    </div>
  `;
}
