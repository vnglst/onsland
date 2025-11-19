// Rankings page functionality

import { countryConfigs, countryNames } from './shared/countries.js';
import { translateCategory } from './shared/translation-utils.js';
import { updatePageTitle, updateMetaDescription } from './shared/page-utils.js';

/**
 * Extract all categories and their data from all countries
 * @returns {Object} Category data with country rankings
 */
function getAllCategoryRankings() {
  const categoryData = {};

  // Iterate through all countries and collect category data
  Object.keys(countryConfigs).forEach((countryKey) => {
    const config = countryConfigs[countryKey];
    const countryName = countryNames[countryKey];

    config.categories.forEach((category) => {
      if (!categoryData[category.name]) {
        categoryData[category.name] = {
          color: category.color,
          countries: [],
        };
      }

      categoryData[category.name].countries.push({
        countryKey: countryKey,
        countryName: countryName,
        percentage: category.percentage,
      });
    });
  });

  // Sort countries within each category by percentage
  Object.keys(categoryData).forEach((categoryName) => {
    categoryData[categoryName].countries.sort((a, b) => b.percentage - a.percentage);
  });

  return categoryData;
}

/**
 * Create a URL-friendly slug from a category name
 * @param {string} categoryName - The category name to convert
 * @returns {string} URL-friendly slug
 */
function createCategorySlug(categoryName) {
  return categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

/**
 * Render all category rankings to the page
 */
function renderRankings() {
  const categoryRankings = getAllCategoryRankings();
  const container = document.getElementById("rankingsContainer");

  // Sort categories by name for consistent display
  const sortedCategories = Object.keys(categoryRankings).sort();

  sortedCategories.forEach((categoryName) => {
    const data = categoryRankings[categoryName];

    // Skip categories with 3 or fewer countries
    if (data.countries.length <= 3) {
      return;
    }
    const categorySlug = createCategorySlug(categoryName);

    // Find the maximum percentage for this category
    const maxPercentage = data.countries[0]?.percentage || 0;

    const section = document.createElement("div");
    section.className = "category-ranking";
    section.id = categorySlug;

    const heading = document.createElement("h2");
    const colorBox = document.createElement("span");
    colorBox.className = "category-color-box";
    colorBox.style.backgroundColor = data.color;
    heading.appendChild(colorBox);
    heading.appendChild(document.createTextNode(translateCategory(categoryName)));
    section.appendChild(heading);

    const list = document.createElement("ol");
    list.className = "ranking-list";

    data.countries.forEach((country, index) => {
      const item = document.createElement("li");
      item.className = "ranking-item";

      const position = document.createElement("span");
      position.className = "ranking-position";
      position.textContent = `${index + 1}.`;
      item.appendChild(position);

      const countryName = document.createElement("span");
      countryName.className = "ranking-country";
      const link = document.createElement("a");
      link.href = `/country/${country.countryKey}`;
      link.textContent = globalThis.i18n.t(`countries.${country.countryKey}`) || country.countryName;
      countryName.appendChild(link);
      item.appendChild(countryName);

      const percentage = document.createElement("span");
      percentage.className = "ranking-percentage";
      percentage.textContent = `${(country.percentage * 100).toFixed(2)}%`;
      item.appendChild(percentage);

      const bar = document.createElement("div");
      bar.className = "ranking-bar";
      const barFill = document.createElement("div");
      barFill.className = "ranking-bar-fill";
      barFill.style.backgroundColor = data.color;
      barFill.style.width = `${(country.percentage / maxPercentage) * 100}%`;
      bar.appendChild(barFill);
      item.appendChild(bar);

      list.appendChild(item);
    });

    section.appendChild(list);
    container.appendChild(section);
  });
}

/**
 * Handle hash-based scrolling to category sections
 */
function handleHashScroll() {
  if (window.location.hash) {
    setTimeout(() => {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }
}

/**
 * Initialize the rankings page
 */
function initRankingsPage() {
  globalThis.initI18n().then(() => {
    // Update page title and meta description
    updatePageTitle(globalThis.i18n.t("rankings.title"));
    updateMetaDescription(globalThis.i18n.t("rankings.metaDescription"));

    // Render rankings after translations are loaded
    renderRankings();

    // Handle hash scrolling
    handleHashScroll();

    // Listen for language changes and re-render rankings
    window.addEventListener("languageChanged", () => {
      // Update page title
      updatePageTitle(globalThis.i18n.t("rankings.title"));

      // Clear and re-render rankings
      const container = document.getElementById("rankingsContainer");
      container.innerHTML = "";
      renderRankings();

      // Preserve scroll to hash if present
      handleHashScroll();
    });
  });
}

// Initialize page when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initRankingsPage);
} else {
  initRankingsPage();
}
