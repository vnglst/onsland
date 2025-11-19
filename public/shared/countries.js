/**
 * Country configurations - loads from JSON
 * Data source: Eurostat Land Cover Statistics 2022
 */

let validCountries = [];
let countryNames = {};
let countryConfigs = {};
let dataLoaded = false;

async function loadData() {
  if (dataLoaded) return;

  try {
    const response = await fetch('/data/countries.json');
    if (!response.ok) {
      throw new Error(`Failed to load countries: ${response.status}`);
    }

    const data = await response.json();

    if (!data.validCountries || !data.countries) {
      throw new Error('Invalid countries data format');
    }

    validCountries = data.validCountries;
    countryNames = data.countryNames;
    countryConfigs = data.countries;
    dataLoaded = true;
  } catch (error) {
    console.error('Error loading countries:', error);
    throw error;
  }
}

// Start loading immediately
const loadPromise = loadData();

export { validCountries, countryNames, countryConfigs, loadPromise };

export function getCountryConfig(countryKey) {
  return countryConfigs[countryKey];
}

export function getCountryName(countryKey) {
  return countryNames[countryKey];
}
