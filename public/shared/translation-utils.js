/**
 * Translation utilities - auto-generates mappings from country data
 */

import { countryConfigs } from './countries.js';

const categoryMap = (() => {
  const map = {};
  Object.values(countryConfigs).forEach((config) => {
    config.categories?.forEach((category) => {
      if (!map[category.name]) {
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

const labelMap = (() => {
  const map = {};
  Object.values(countryConfigs).forEach((config) => {
    config.labels?.forEach((labelObj) => {
      if (!map[labelObj.label]) {
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
