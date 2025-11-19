/**
 * Translation utilities - auto-generates mappings from country data
 */

import { countryConfigs } from './countries.js';

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

const categoryMap = (() => {
  const map = {};
  Object.values(countryConfigs).forEach((config) => {
    config.categories?.forEach((category) => {
      if (!map[category.name]) {
        const key = toCamelCase(category.name);
        map[category.name] = `categories.${key}`;
      }
    });
  });
  return map;
})();

const labelMap = (() => {
  const map = {};
  Object.values(countryConfigs).forEach((config) => {
    config.labels?.forEach((labelObj) => {
      if (!map[labelObj.label]) {
        const key = toCamelCase(labelObj.label);
        map[labelObj.label] = `labels.${key}`;
      }
    });
  });
  return map;
})();

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
