import { useEffect, useRef } from 'preact/hooks';
import { useI18n } from '../hooks/useI18n.js';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver.js';

export function CountryCard({ countryKey, worldData, isSquareView, countryNames }) {
  const { t } = useI18n();
  const svgRef = useRef(null);
  const [cardRef, isIntersecting, hasIntersected] = useIntersectionObserver({
    rootMargin: '200px',
    threshold: 0
  });

  const translatedName = t(`countries.${countryKey}`) || countryNames[countryKey];

  // Render the country visualization when card intersects viewport
  useEffect(() => {
    if (hasIntersected && svgRef.current && worldData) {
      if (isSquareView) {
        window.renderCountrySquarePreview?.(countryKey, svgRef.current, worldData);
      } else {
        window.renderCountryPreview?.(countryKey, svgRef.current, worldData);
      }
    }
  }, [hasIntersected, countryKey, worldData, isSquareView]);

  // Re-render when view mode changes (if already loaded)
  useEffect(() => {
    if (hasIntersected && svgRef.current && worldData) {
      if (isSquareView) {
        window.renderCountrySquarePreview?.(countryKey, svgRef.current, worldData);
      } else {
        window.renderCountryPreview?.(countryKey, svgRef.current, worldData);
      }
    }
  }, [isSquareView, hasIntersected, countryKey, worldData]);

  const handleClick = () => {
    window.location.href = `country?country=${countryKey}`;
  };

  return (
    <div
      ref={cardRef}
      className={`country-card ${!hasIntersected ? 'loading' : ''}`}
      data-country={countryKey}
      onClick={hasIntersected ? handleClick : undefined}
    >
      <div className="country-card-title">{translatedName}</div>

      {!hasIntersected ? (
        <>
          <div className="loading-placeholder"></div>
          <div className="loading-text">{t('common.loading')}</div>
        </>
      ) : (
        <svg
          ref={svgRef}
          viewBox="0 0 800 800"
          preserveAspectRatio="xMidYMid"
          className="country-preview"
        />
      )}
    </div>
  );
}
