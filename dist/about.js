// About page functionality
// Simple initialization for the about page

/**
 * Initialize the about page
 */
function initAboutPage() {
  initI18n().then(() => {
    updatePageTitle(i18n.t("about.title"));
    updateMetaDescription(i18n.t("about.metaDescription"));
  });
}

// Initialize page when DOM is ready
onDOMReady(initAboutPage);
