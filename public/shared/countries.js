/**
 * Country configurations for land use visualizations
 * ES6 Module - Modern 2025 approach
 * Data source: Eurostat Land Cover Statistics 2022
 */

let countriesData = null;

/**
 * Load and cache countries data from JSON
 */
async function loadData() {
  if (countriesData) return countriesData;

  const response = await fetch('/data/countries.json');
  if (!response.ok) {
    throw new Error(`Failed to load countries: ${response.status}`);
  }

  countriesData = await response.json();
  return countriesData;
}

/**
 * Initialize countries data - call this early in your app
 * @returns {Promise<void>}
 */
export async function initCountriesData() {
  await loadData();
}

// Export getters for data access
export const validCountries = await (async () => {
  const data = await loadData();
  return data.validCountries;
})();

export const countryNames = await (async () => {
  const data = await loadData();
  return data.countryNames;
})();

export const countryConfigs = await (async () => {
  const data = await loadData();
  return data.countries;
})();

// For convenience - get specific country data
export function getCountryConfig(countryKey) {
  return countryConfigs[countryKey];
}

export function getCountryName(countryKey) {
  return countryNames[countryKey];
}
