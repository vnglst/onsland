/**
 * Country configurations - loads from JSON
 * Data source: Eurostat Land Cover Statistics 2022
 */

let countriesData = null;

async function loadData() {
  if (countriesData) return countriesData;

  const response = await fetch('/data/countries.json');
  if (!response.ok) {
    throw new Error(`Failed to load countries: ${response.status}`);
  }

  countriesData = await response.json();
  return countriesData;
}

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

export function getCountryConfig(countryKey) {
  return countryConfigs[countryKey];
}

export function getCountryName(countryKey) {
  return countryNames[countryKey];
}
