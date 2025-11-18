#!/usr/bin/env node
/**
 * Convert countries.js to JSON format
 */

const fs = require('fs');
const path = require('path');

// Read the countries.js file
const countriesJsPath = path.join(__dirname, '../public/shared/countries.js');
const content = fs.readFileSync(countriesJsPath, 'utf8');

// Create a sandbox to evaluate the file
const vm = require('vm');
const sandbox = {};
const context = vm.createContext(sandbox);

try {
  vm.runInContext(content, context);
} catch (error) {
  console.error('Error evaluating countries.js:', error);
  process.exit(1);
}

// Extract data from the evaluated context
const validCountries = [
  'austria', 'belgium', 'bulgaria', 'croatia', 'czechia', 'denmark',
  'estonia', 'finland', 'france', 'germany', 'greece', 'hungary',
  'ireland', 'italy', 'latvia', 'lithuania', 'luxembourg', 'netherlands',
  'poland', 'portugal', 'romania', 'slovakia', 'slovenia', 'spain',
  'sweden', 'uk'
];

const countryNames = {
  austria: 'Austria',
  belgium: 'Belgium',
  bulgaria: 'Bulgaria',
  croatia: 'Croatia',
  czechia: 'Czechia',
  denmark: 'Denmark',
  estonia: 'Estonia',
  finland: 'Finland',
  france: 'France',
  germany: 'Germany',
  greece: 'Greece',
  hungary: 'Hungary',
  ireland: 'Ireland',
  italy: 'Italy',
  latvia: 'Latvia',
  lithuania: 'Lithuania',
  luxembourg: 'Luxembourg',
  netherlands: 'The Netherlands',
  poland: 'Poland',
  portugal: 'Portugal',
  romania: 'Romania',
  slovakia: 'Slovakia',
  slovenia: 'Slovenia',
  spain: 'Spain',
  sweden: 'Sweden',
  uk: 'United Kingdom'
};

// Create the JSON structure
const data = {
  validCountries,
  countryNames,
  countries: sandbox.countryConfigs
};

// Ensure output directory exists
const outputDir = path.join(__dirname, '../public/data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write to JSON file
const outputPath = path.join(outputDir, 'countries.json');
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

console.log('✅ Successfully converted countries.js to JSON');
console.log(`📁 Output: ${outputPath}`);
console.log(`📊 ${validCountries.length} countries processed`);
