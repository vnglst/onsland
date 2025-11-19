// About page functionality

import { updatePageTitle, updateMetaDescription } from './shared/page-utils.js';

/**
 * Initialize the about page
 */
function initAboutPage() {
  globalThis.initI18n().then(() => {
    updatePageTitle(globalThis.i18n.t("about.title"));
    updateMetaDescription(globalThis.i18n.t("about.metaDescription"));
  });
}

// Initialize page when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAboutPage);
} else {
  initAboutPage();
}
