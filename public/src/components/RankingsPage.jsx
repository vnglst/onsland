import { useEffect, useMemo } from 'preact/hooks';
import { useI18n } from '../hooks/useI18n.js';
import { Menu } from './Menu.jsx';
import { CategoryRanking } from './CategoryRanking.jsx';

export function RankingsPage() {
  const { t } = useI18n();

  // Update page title and meta description
  useEffect(() => {
    document.title = t('rankings.title');
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('rankings.metaDescription'));
    }
  }, [t]);

  // Handle hash-based scrolling
  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const element = document.querySelector(window.location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  // Get all category rankings from countryConfigs
  const categoryRankings = useMemo(() => {
    const categoryData = {};

    // Access global countryConfigs and countryNames
    const countryConfigs = window.countryConfigs;
    const countryNames = window.countryNames;

    if (!countryConfigs || !countryNames) {
      return {};
    }

    // Iterate through all countries and collect category data
    Object.keys(countryConfigs).forEach((countryKey) => {
      const config = countryConfigs[countryKey];
      const countryName = countryNames[countryKey];

      config.categories.forEach((category) => {
        if (!categoryData[category.name]) {
          categoryData[category.name] = {
            color: category.color,
            countries: [],
          };
        }

        categoryData[category.name].countries.push({
          countryKey: countryKey,
          countryName: countryName,
          percentage: category.percentage,
        });
      });
    });

    // Sort countries within each category by percentage (descending)
    Object.keys(categoryData).forEach((categoryName) => {
      categoryData[categoryName].countries.sort((a, b) => b.percentage - a.percentage);
    });

    return categoryData;
  }, []);

  // Sort categories by name for consistent display
  const sortedCategories = useMemo(() => {
    return Object.keys(categoryRankings)
      .sort()
      .filter(categoryName => {
        // Skip categories with 3 or fewer countries
        return categoryRankings[categoryName].countries.length > 3;
      });
  }, [categoryRankings]);

  return (
    <>
      <Menu />

      <div id="rankingsContainer">
        {sortedCategories.map(categoryName => (
          <CategoryRanking
            key={categoryName}
            categoryName={categoryName}
            data={categoryRankings[categoryName]}
          />
        ))}
      </div>
    </>
  );
}
