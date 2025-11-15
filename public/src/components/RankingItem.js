import { html } from 'htm/preact';
import { useI18n } from '../hooks/useI18n.js';

export function RankingItem({ country, index, maxPercentage, color }) {
  const { t } = useI18n();
  const translatedName = t(`countries.${country.countryKey}`) || country.countryName;

  return html`
    <li class="ranking-item">
      <span class="ranking-position">${index + 1}.</span>
      <span class="ranking-country">
        <a href=${'country?country=' + country.countryKey}>
          ${translatedName}
        </a>
      </span>
      <span class="ranking-percentage">
        ${(country.percentage * 100).toFixed(2)}%
      </span>
      <div class="ranking-bar">
        <div
          class="ranking-bar-fill"
          style=${{
            backgroundColor: color,
            width: `${(country.percentage / maxPercentage) * 100}%`
          }}
        />
      </div>
    </li>
  `;
}
