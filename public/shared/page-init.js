// Common page initialization utilities
// Provides reusable functions for initializing page metadata and UI elements

/**
 * Updates the page title
 * @param {string} title - The new page title
 */
function updatePageTitle(title) {
  document.title = title;
}

/**
 * Updates the page meta description
 * @param {string} description - The new meta description
 */
function updateMetaDescription(description) {
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', description);
  }
}

/**
 * Shows the page footer (used after content has loaded)
 */
function showFooter() {
  const footer = document.querySelector('.page-footer');
  if (footer) {
    footer.classList.add('visible');
  }
}

/**
 * Initializes common page elements with translations
 * @param {Object} options - Configuration options
 * @param {string} options.titleKey - i18n key for the page title
 * @param {string} options.descriptionKey - i18n key for the meta description
 * @param {Function} options.onComplete - Optional callback after initialization
 */
function initializePage(options = {}) {
  return initI18n().then(() => {
    if (options.titleKey) {
      updatePageTitle(i18n.t(options.titleKey));
    }

    if (options.descriptionKey) {
      updateMetaDescription(i18n.t(options.descriptionKey));
    }

    if (options.onComplete) {
      options.onComplete();
    }

    return true;
  });
}
