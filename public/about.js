// About page functionality
// Simple initialization for the about page

/**
 * Initialize the about page
 */
function initAboutPage() {
  initI18n().then(() => {
    updatePageTitle(i18n.t("about.title"));
    updateMetaDescription(i18n.t("about.metaDescription"));
    initMenu();
  });
}

// Initialize page when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAboutPage);
} else {
  initAboutPage();
}
