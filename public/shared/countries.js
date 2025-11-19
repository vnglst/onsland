/**
 * Country configurations - loads from JSON
 * Data source: Eurostat Land Cover Statistics 2022
 */

const response = await fetch('/data/countries.json');
if (!response.ok) {
  throw new Error(`Failed to load countries: ${response.status}`);
}

const data = await response.json();

if (!data.validCountries || !data.countries) {
  throw new Error('Invalid countries data format');
}

export const validCountries = data.validCountries;
export const countryNames = data.countryNames;
export const countryConfigs = data.countries;

export function getCountryConfig(countryKey) {
  return countryConfigs[countryKey];
}

export function getCountryName(countryKey) {
  return countryNames[countryKey];
}
