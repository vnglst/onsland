/**
 * Translation utilities - Data-driven approach
 * Auto-generates mappings from countries configuration
 * ES6 Module - Modern 2025 approach
 */

import { countryConfigs } from './countries.js';

// Generate category mapping from actual data
const categoryMap = (() => {
  const map = {};
  Object.values(countryConfigs).forEach((config) => {
    config.categories?.forEach((category) => {
      if (!map[category.name]) {
        // Convert to i18n key: "Water" -> "categories.water"
        const key = category.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '_')
          .replace(/^_|_$/g, '');
        map[category.name] = `categories.${key}`;
      }
    });
  });
  return map;
})();

// Generate label mapping from actual data
const labelMap = (() => {
  const map = {};
  Object.values(countryConfigs).forEach((config) => {
    config.labels?.forEach((labelObj) => {
      if (!map[labelObj.label]) {
        // Convert to i18n key: "Water" -> "labels.water"
        const key = labelObj.label
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '_')
          .replace(/^_|_$/g, '');
        map[labelObj.label] = `labels.${key}`;
      }
    });
  });
  return map;
})();

/**
 * Translate a category name
 * @param {string} categoryName - Category name from data
 * @returns {string} Translated category name
 */
export function translateCategory(categoryName) {
  const i18nKey = categoryMap[categoryName];
  if (i18nKey && globalThis.i18n) {
    return globalThis.i18n.t(i18nKey) || categoryName;
  }
  return categoryName;
}

/**
 * Translate a label name
 * @param {string} labelName - Label name from data
 * @returns {string} Translated label name
 */
export function translateLabel(labelName) {
  const i18nKey = labelMap[labelName];
  if (i18nKey && globalThis.i18n) {
    return globalThis.i18n.t(i18nKey) || labelName;
  }
  return labelName;
}

/**
 * Get all category i18n keys (useful for translation file generation)
 * @returns {Array<string>} All category i18n keys
 */
export function getAllCategoryKeys() {
  return Object.values(categoryMap);
}

/**
 * Get all label i18n keys (useful for translation file generation)
 * @returns {Array<string>} All label i18n keys
 */
export function getAllLabelKeys() {
  return Object.values(labelMap);
}

// Export maps for debugging/inspection
export { categoryMap, labelMap };
