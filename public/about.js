// About page functionality

import { updatePageTitle, updateMetaDescription } from './shared/page-utils.js';

/**
 * Initialize the about page
 */
async function initAboutPage() {
  try {
    await globalThis.initI18n();
    updatePageTitle(globalThis.i18n.t("about.title"));
    updateMetaDescription(globalThis.i18n.t("about.metaDescription"));
  } catch (error) {
    console.error("Error initializing about page:", error);
  }
}

// Initialize page when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAboutPage);
} else {
  initAboutPage();
}
