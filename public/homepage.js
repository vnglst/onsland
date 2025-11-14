// Homepage functionality
// Handles the grid of country cards with lazy loading and view toggling

let worldData = null;
let isSquareView = false;
let currentObserver = null;

/**
 * Toggle between map view and square view
 */
function toggleView() {
  isSquareView = !isSquareView;
  const homepage = document.getElementById("homepage");
  const loadedCards = homepage.querySelectorAll(".country-card:not(.loading)");

  loadedCards.forEach(card => {
    const countryKey = card.getAttribute("data-country");
    const svg = card.querySelector("svg");
    if (svg && countryKey) {
      if (isSquareView) {
        renderCountrySquarePreview(countryKey, svg, worldData);
      } else {
        renderCountryPreview(countryKey, svg, worldData);
      }
    }
  });
}

/**
 * Get the current view toggle button text
 * @returns {string} Translated button text
 */
function getViewToggleText() {
  return isSquareView ? i18n.t('homepage.mapView') : i18n.t('homepage.squareView');
}

/**
 * Update all country card titles with translations
 */
function updateCountryCardTitles() {
  document.querySelectorAll('.country-card').forEach(card => {
    const countryKey = card.getAttribute('data-country');
    const titleElement = card.querySelector('.country-card-title');
    if (titleElement) {
      const translatedName = i18n.t(`countries.${countryKey}`) || countryNames[countryKey];
      titleElement.textContent = translatedName;
    }
  });
}

/**
 * Display the homepage grid with all country cards
 */
function showHomepage() {
  const homepage = document.getElementById("homepage");
  homepage.innerHTML = "";

  // Create all cards with loading placeholders first to prevent layout shift
  validCountries.forEach((countryKey) => {
    const countryCard = document.createElement("div");
    countryCard.className = "country-card loading";
    countryCard.setAttribute("data-country", countryKey);

    const title = document.createElement("div");
    title.className = "country-card-title";
    title.textContent = i18n.t(`countries.${countryKey}`) || countryNames[countryKey];

    const placeholder = document.createElement("div");
    placeholder.className = "loading-placeholder";

    const loadingText = document.createElement("div");
    loadingText.className = "loading-text";
    loadingText.textContent = i18n.t('common.loading');

    countryCard.appendChild(title);
    countryCard.appendChild(placeholder);
    countryCard.appendChild(loadingText);
    homepage.appendChild(countryCard);
  });

  const observerOptions = {
    root: null,
    rootMargin: "200px",
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const countryCard = entry.target;
        const countryKey = countryCard.getAttribute("data-country");

        if (countryCard.classList.contains("loading")) {
          renderCountryCard(countryCard, countryKey);
        }

        observer.unobserve(countryCard);
      }
    });
  }, observerOptions);

  validCountries.forEach((countryKey) => {
    const countryCard = homepage.querySelector(`[data-country="${countryKey}"]`);
    if (countryCard) {
      observer.observe(countryCard);
    }
  });
}

/**
 * Render a single country card with its visualization
 * @param {HTMLElement} countryCard - The card container element
 * @param {string} countryKey - The country identifier
 */
function renderCountryCard(countryCard, countryKey) {
  countryCard.classList.remove("loading");
  const placeholder = countryCard.querySelector(".loading-placeholder");
  const loadingText = countryCard.querySelector(".loading-text");
  if (placeholder) placeholder.remove();
  if (loadingText) loadingText.remove();

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 800 800");
  svg.setAttribute("preserveAspectRatio", "xMidYMid");
  svg.classList.add("country-preview");

  countryCard.appendChild(svg);

  countryCard.onclick = () => {
    window.location.href = `country?country=${countryKey}`;
  };

  if (isSquareView) {
    renderCountrySquarePreview(countryKey, svg, worldData);
  } else {
    renderCountryPreview(countryKey, svg, worldData);
  }
}

/**
 * Initialize the homepage
 */
function initHomepage() {
  // Initialize i18n and menu
  initI18n().then(() => {
    updatePageTitle(i18n.t('homepage.title'));
    updateMetaDescription(i18n.t('homepage.metaDescription'));

    // Initialize menu with view toggle
    initMenu({
      showViewToggle: true,
      onViewToggle: toggleView,
      getViewToggleText: getViewToggleText
    });

    // Listen for language changes and update country titles
    window.addEventListener('languageChanged', () => {
      updatePageTitle(i18n.t('homepage.title'));

      // Update menu view toggle text
      const menuToggle = document.querySelector('#menuViewToggle');
      if (menuToggle) {
        menuToggle.textContent = getViewToggleText();
      }

      // Update all country cards
      updateCountryCardTitles();
    });
  });

  // Load map data and render homepage
  fetch("lib/countries-50m.json")
    .then((response) => response.json())
    .then((world) => {
      worldData = world;
      showHomepage();
    })
    .catch((error) => console.error("Error loading data:", error));
}

// Initialize page when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHomepage);
} else {
  initHomepage();
}
