// Common page initialization utilities

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
