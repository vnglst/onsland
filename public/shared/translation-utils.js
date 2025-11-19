/**
 * Translation utilities - auto-generates mappings from country data
 */

import { countryConfigs, loadPromise } from './countries.js';

/**
 * Convert a string to camelCase
 * @param {string} str - String to convert
 * @returns {string} camelCase version
 */
function toCamelCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, '') // Remove special chars except spaces
    .split(/\s+/) // Split on whitespace
    .map((word, index) => {
      if (index === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}

let categoryMap = {};
let labelMap = {};

// Build maps after data loads
loadPromise.then(() => {
  Object.values(countryConfigs).forEach((config) => {
    config.categories?.forEach((category) => {
      if (!categoryMap[category.name]) {
        const key = toCamelCase(category.name);
        categoryMap[category.name] = `categories.${key}`;
      }
    });
  });

  Object.values(countryConfigs).forEach((config) => {
    config.labels?.forEach((labelObj) => {
      if (!labelMap[labelObj.label]) {
        const key = toCamelCase(labelObj.label);
        labelMap[labelObj.label] = `labels.${key}`;
      }
    });
  });
});

export function translateCategory(categoryName) {
  const i18nKey = categoryMap[categoryName];
  if (i18nKey && globalThis.i18n) {
    return globalThis.i18n.t(i18nKey) || categoryName;
  }
  return categoryName;
}

export function translateLabel(labelName) {
  const i18nKey = labelMap[labelName];
  if (i18nKey && globalThis.i18n) {
    return globalThis.i18n.t(i18nKey) || labelName;
  }
  return labelName;
}

export function getAllCategoryKeys() {
  return Object.values(categoryMap);
}

export function getAllLabelKeys() {
  return Object.values(labelMap);
}

export { categoryMap, labelMap };
