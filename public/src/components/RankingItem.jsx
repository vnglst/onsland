import { useI18n } from '../hooks/useI18n.js';

export function RankingItem({ country, index, maxPercentage, color }) {
  const { t } = useI18n();
  const translatedName = t(`countries.${country.countryKey}`) || country.countryName;

  return (
    <li className="ranking-item">
      <span className="ranking-position">{index + 1}.</span>
      <span className="ranking-country">
        <a href={`country?country=${country.countryKey}`}>
          {translatedName}
        </a>
      </span>
      <span className="ranking-percentage">
        {(country.percentage * 100).toFixed(2)}%
      </span>
      <div className="ranking-bar">
        <div
          className="ranking-bar-fill"
          style={{
            backgroundColor: color,
            width: `${(country.percentage / maxPercentage) * 100}%`
          }}
        />
      </div>
    </li>
  );
}
