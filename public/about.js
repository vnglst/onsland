// About page functionality

/**
 * Initialize the about page
 */
function initAboutPage() {
  initI18n().then(() => {
    globalThis.updatePageTitle(globalThis.i18n.t("about.title"));
    globalThis.updateMetaDescription(globalThis.i18n.t("about.metaDescription"));
  });
}

// Initialize page when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAboutPage);
} else {
  initAboutPage();
}
