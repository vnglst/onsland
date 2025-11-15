import { useMemo } from 'preact/hooks';

export function useCountryRankings(countryKey) {
  return useMemo(() => {
    const countryConfigs = window.countryConfigs;
    const countryNames = window.countryNames;

    if (!countryConfigs || !countryNames || !countryKey) {
      return [];
    }

    const currentConfig = countryConfigs[countryKey];
    if (!currentConfig) return [];

    const rankings = [];

    // For each category this country has, calculate its ranking
    currentConfig.categories.forEach((category) => {
      const categoryName = category.name;
      const categoryPercentage = category.percentage;
      const categoryColor = category.color;

      // Collect all countries that have this category
      const countriesWithCategory = [];
      Object.keys(countryConfigs).forEach((key) => {
        const config = countryConfigs[key];
        const matchingCategory = config.categories.find((c) => c.name === categoryName);
        if (matchingCategory) {
          countriesWithCategory.push({
            countryKey: key,
            countryName: countryNames[key],
            percentage: matchingCategory.percentage,
          });
        }
      });

      // Sort by percentage descending
      countriesWithCategory.sort((a, b) => b.percentage - a.percentage);

      // Find position of current country
      const position = countriesWithCategory.findIndex((c) => c.countryKey === countryKey) + 1;
      const totalCountries = countriesWithCategory.length;

      rankings.push({
        categoryName,
        categoryColor,
        position,
        totalCountries,
        percentage: categoryPercentage,
      });
    });

    return rankings;
  }, [countryKey]);
}
