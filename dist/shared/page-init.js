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
 * Execute a function when DOM is ready
 * @param {Function} callback - The function to execute when DOM is ready
 */
function onDOMReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
}

/**
 * Update the menu view toggle button text
 * @param {Function} getTextFunc - Function that returns the text to display
 */
function updateMenuViewToggle(getTextFunc) {
  const menuToggle = document.getElementById("menuViewToggle");
  if (menuToggle) {
    menuToggle.textContent = getTextFunc();
  }
}
