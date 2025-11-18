// Homepage functionality
// Handles the grid of country cards with lazy loading and view toggling

// Configuration for intersection observer
const OBSERVER_CONFIG = {
  root: null,
  rootMargin: "200px",
  threshold: 0
};

// Homepage state (encapsulated)
const HomepageState = {
  worldData: null,
  isSquareView: false,
  currentObserver: null,

  setWorldData(data) {
    this.worldData = data;
  },

  getWorldData() {
    return this.worldData;
  },

  toggleSquareView() {
    this.isSquareView = !this.isSquareView;
    return this.isSquareView;
  },

  getSquareView() {
    return this.isSquareView;
  },

  setObserver(observer) {
    this.currentObserver = observer;
  },

  getObserver() {
    return this.currentObserver;
  }
};

// Legacy global variables for backward compatibility
let worldData = null;
let isSquareView = false;
let currentObserver = null;

/**
 * Re-render a single card with the current view
 * @param {HTMLElement} card - The card element
 * @param {string} countryKey - Country identifier
 */
function rerenderCard(card, countryKey) {
  const svg = card.querySelector("svg");
  if (!svg || !countryKey) return;

  if (HomepageState.getSquareView()) {
    renderCountrySquarePreview(countryKey, svg, HomepageState.getWorldData());
  } else {
    renderCountryPreview(countryKey, svg, HomepageState.getWorldData());
  }
}

/**
 * Update view toggle button text
 */
function updateViewToggleButton() {
  const menuToggle = document.getElementById("menuViewToggle");
  if (menuToggle) {
    menuToggle.textContent = getViewToggleText();
  }
}

/**
 * Toggle between map view and square view
 */
function toggleView() {
  HomepageState.toggleSquareView();

  // Update legacy global for compatibility
  isSquareView = HomepageState.getSquareView();

  const homepage = document.getElementById("homepage");
  const loadedCards = homepage.querySelectorAll(".country-card:not(.loading)");

  loadedCards.forEach((card) => {
    const countryKey = card.getAttribute("data-country");
    rerenderCard(card, countryKey);
  });

  updateViewToggleButton();
}

/**
 * Get the current view toggle button text
 * @returns {string} Translated button text
 */
function getViewToggleText() {
  return HomepageState.getSquareView()
    ? i18n.t("homepage.mapView")
    : i18n.t("homepage.squareView");
}

/**
 * Create a loading placeholder card
 * @param {string} countryKey - Country identifier
 * @returns {HTMLElement} Card element
 */
function createLoadingCard(countryKey) {
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
  loadingText.textContent = i18n.t("common.loading");

  countryCard.appendChild(title);
  countryCard.appendChild(placeholder);
  countryCard.appendChild(loadingText);

  return countryCard;
}

/**
 * Setup intersection observer for lazy loading
 * @param {HTMLElement} homepage - Homepage container element
 * @returns {IntersectionObserver} The observer instance
 */
function setupLazyLoadingObserver(homepage) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const countryCard = entry.target;
        const countryKey = countryCard.getAttribute("data-country");

        if (countryCard.classList.contains("loading")) {
          renderCountryCard(countryCard, countryKey);
        }

        observer.unobserve(countryCard);
      }
    });
  }, OBSERVER_CONFIG);

  return observer;
}

/**
 * Update all country card titles with translations
 */
function updateCountryCardTitles() {
  document.querySelectorAll(".country-card").forEach((card) => {
    const countryKey = card.getAttribute("data-country");
    const titleElement = card.querySelector(".country-card-title");
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
    const countryCard = createLoadingCard(countryKey);
    homepage.appendChild(countryCard);
  });

  // Setup lazy loading observer
  const observer = setupLazyLoadingObserver(homepage);
  HomepageState.setObserver(observer);

  // Observe all country cards
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

  // Remove loading elements
  const placeholder = countryCard.querySelector(".loading-placeholder");
  const loadingText = countryCard.querySelector(".loading-text");
  placeholder?.remove();
  loadingText?.remove();

  // Create SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 800 800");
  svg.setAttribute("preserveAspectRatio", "xMidYMid");
  svg.classList.add("country-preview");

  countryCard.appendChild(svg);

  // Add click handler for navigation
  countryCard.onclick = () => {
    window.location.href = `/country/${countryKey}`;
  };

  // Render appropriate preview based on current view
  if (HomepageState.getSquareView()) {
    renderCountrySquarePreview(countryKey, svg, HomepageState.getWorldData());
  } else {
    renderCountryPreview(countryKey, svg, HomepageState.getWorldData());
  }
}

/**
 * Initialize the homepage
 */
async function initHomepage() {
  try {
    // Load both i18n and map data in parallel
    const [_, world] = await Promise.all([
      initI18n(),
      fetch("/vendor/countries-50m.json").then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load map data: ${response.status}`);
        }
        return response.json();
      }),
    ]);

    // Store world data in state
    HomepageState.setWorldData(world);
    worldData = world; // Update legacy global

    // Update page metadata
    updatePageTitle(i18n.t("homepage.title"));
    updateMetaDescription(i18n.t("homepage.metaDescription"));

    // Expose view toggle functions for Menu island
    window.toggleView = toggleView;
    window.getViewToggleText = getViewToggleText;

    // Set initial view toggle button text
    updateViewToggleButton();

    // Render homepage now that both i18n and map data are ready
    showHomepage();

    // Listen for language changes and update country titles
    window.addEventListener("languageChanged", () => {
      updatePageTitle(i18n.t("homepage.title"));
      updateViewToggleButton();
      updateCountryCardTitles();
    });
  } catch (error) {
    console.error("Error initializing homepage:", error);
    // Show user-friendly error message
    const homepage = document.getElementById("homepage");
    if (homepage) {
      homepage.innerHTML = `
        <div class="error-message">
          <h2>Failed to load page</h2>
          <p>Please refresh the page to try again.</p>
        </div>
      `;
    }
  }
}

// Initialize page when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHomepage);
} else {
  initHomepage();
}
