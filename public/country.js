/**
 * Country page functionality
 * Handles the detailed country visualization with D3.js and rankings display
 */

import { validCountries, countryNames, countryConfigs } from './shared/countries.js';
import { translateCategory, translateLabel } from './shared/translation-utils.js';

const DEV_MODE = false;

// Constants for visualization
const VIZ_CONFIG = {
  SVG_WIDTH: 800,
  SVG_HEIGHT: 800,
  HEX_RADIUS: 6,
  LEGEND_ITEM_HEIGHT: 20,
  LEGEND_PADDING: 5,
  LEGEND_BOTTOM_OFFSET: 120,
  LABEL_OFFSET: {
    x: 10,
    y: 5
  },
  LABEL_LINE_OFFSET: 10
};

const ANIMATION_CONFIG = {
  DURATION_SHORT: 500,
  DURATION_MEDIUM: 750,
  DURATION_LONG: 1000,
  DELAY_PER_HEX: 0.7,
  DELAY_PER_LEGEND: 40,
  DELAY_PER_LABEL: 300
};

// Get country from route parameter
const countryFromRoute = globalThis.__COUNTRY__;
const currentCountry = validCountries.includes(countryFromRoute) ? countryFromRoute : "netherlands";

let worldData = null;
let isSquareLayout = false;
let hexDataGlobal = null;
let hexColorsGlobal = null;

/**
 * Initialize page UI elements with translations
 */
function initializePageElements() {
  const countryName = globalThis.i18n.t(`countries.${currentCountry}`) || countryNames[currentCountry];
  document.title = `${globalThis.i18n.t("country.titlePrefix")}${countryName} - OnsLand`;
  document.querySelector(".title-country").textContent = countryName;
  globalThis.updateMetaDescription(globalThis.i18n.t("country.metaDescription"));

  // Display rankings after translations are loaded
  displayRankings();
}

/**
 * Calculate rankings for the current country
 * @returns {Array} Array of ranking objects
 */
function calculateCountryRankings() {
  const currentConfig = countryConfigs[currentCountry];
  const rankings = [];

  // For each category this country has, calculate its ranking
  currentConfig.categories.forEach((category) => {
    const categoryName = category.name;
    const categoryPercentage = category.percentage;
    const categoryColor = category.color;

    // Collect all countries that have this category
    const countriesWithCategory = [];
    Object.keys(countryConfigs).forEach((countryKey) => {
      const config = countryConfigs[countryKey];
      const matchingCategory = config.categories.find((c) => c.name === categoryName);
      if (matchingCategory) {
        countriesWithCategory.push({
          countryKey: countryKey,
          countryName: countryNames[countryKey],
          percentage: matchingCategory.percentage,
        });
      }
    });

    // Sort by percentage descending
    countriesWithCategory.sort((a, b) => b.percentage - a.percentage);

    // Find position of current country
    const position = countriesWithCategory.findIndex((c) => c.countryKey === currentCountry) + 1;
    const totalCountries = countriesWithCategory.length;

    rankings.push({
      categoryName: categoryName,
      categoryColor: categoryColor,
      position: position,
      totalCountries: totalCountries,
      percentage: categoryPercentage,
    });
  });

  return rankings;
}

/**
 * Create a URL-friendly slug from a category name
 * @param {string} categoryName - The category name to convert
 * @returns {string} URL-friendly slug
 */
function createCategorySlug(categoryName) {
  return categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

/**
 * Create a ranking badge element
 * @param {Object} ranking - Ranking data
 * @param {string} labelKey - i18n key for the label
 * @param {boolean} isTopRank - Whether this is a top ranking
 * @returns {HTMLElement} The ranking badge element
 */
function createRankingBadge(ranking, labelKey, isTopRank) {
  const badge = document.createElement("div");
  badge.className = "ranking-badge";

  const link = document.createElement("a");
  link.href = `/rankings#${createCategorySlug(ranking.categoryName)}`;

  const positionNumber = document.createElement("div");
  positionNumber.className = `ranking-position-number ${isTopRank ? "top-rank" : "bottom-rank"}`;
  positionNumber.textContent = `#${ranking.position}`;

  const content = document.createElement("div");
  content.className = "ranking-badge-content";

  const category = document.createElement("div");
  category.className = "ranking-badge-category";
  category.textContent = translateCategory(ranking.categoryName);

  const labelDiv = document.createElement("div");
  labelDiv.className = "ranking-badge-label";
  labelDiv.textContent = globalThis.i18n.t(labelKey);

  content.appendChild(category);
  content.appendChild(labelDiv);

  link.appendChild(positionNumber);
  link.appendChild(content);
  badge.appendChild(link);

  return badge;
}

/**
 * Display rankings for the current country
 */
function displayRankings() {
  const rankings = calculateCountryRankings();
  const container = document.getElementById("rankingsInfo");
  container.innerHTML = "";

  // Filter categories with more than 3 countries for meaningful rankings
  const multiCountryRankings = rankings.filter((r) => r.totalCountries > 3);

  // Sort by position
  const sortedRankings = [...multiCountryRankings].sort((a, b) => a.position - b.position);

  // Get top 2 rankings
  const topRankings = sortedRankings.slice(0, 2);

  // Get bottom 2 rankings
  const bottomRankings = sortedRankings.slice(-2).reverse();

  // Create top ranking badges
  topRankings.forEach((ranking, index) => {
    const labelKey = index === 0 ? "country.highestRanking" : "country.secondHighest";
    const badge = createRankingBadge(ranking, labelKey, true);
    container.appendChild(badge);
  });

  // Create bottom ranking badges
  bottomRankings.forEach((ranking, index) => {
    const labelKey = index === 0 ? "country.lowestRanking" : "country.secondLowest";
    const badge = createRankingBadge(ranking, labelKey, false);
    container.appendChild(badge);
  });
}

/**
 * Toggle between map layout and square layout
 */
export function toggleLayout() {
  isSquareLayout = !isSquareLayout;
  const svg = d3.select("#countrySvg");

  // Get color scale to ensure proper colors
  const config = countryConfigs[currentCountry];
  const colorScale = createColorScale(config.categories);
  const hexbin = d3.hexbin().radius(VIZ_CONFIG.HEX_RADIUS);

  if (isSquareLayout) {
    const hexagonPositions = calculateHexagonGridPositions(hexDataGlobal.length);

    svg
      .selectAll(".hexagon")
      .interrupt() // Stop any ongoing transitions
      .attr("fill", (d, i) => colorScale(hexColorsGlobal[i])) // Ensure correct color immediately
      .transition()
      .duration(ANIMATION_CONFIG.DURATION_LONG)
      .ease(d3.easeCubicInOut)
      .attr("transform", (d, i) => {
        const pos = hexagonPositions[i];
        return `translate(${pos.x},${pos.y})`;
      })
      .attr("d", hexbin.hexagon(VIZ_CONFIG.HEX_RADIUS))
      .attr("stroke-width", 0);

    svg
      .selectAll("text[data-label], line[data-label], circle[data-label]")
      .transition()
      .duration(ANIMATION_CONFIG.DURATION_SHORT)
      .attr("opacity", 0);
  } else {
    svg
      .selectAll(".hexagon")
      .interrupt() // Stop any ongoing transitions
      .attr("fill", (d, i) => colorScale(hexColorsGlobal[i])) // Ensure correct color immediately
      .transition()
      .duration(ANIMATION_CONFIG.DURATION_LONG)
      .ease(d3.easeCubicInOut)
      .attr("transform", (d, i) => `translate(${hexDataGlobal[i].x},${hexDataGlobal[i].y})`)
      .attr("d", hexbin.hexagon(VIZ_CONFIG.HEX_RADIUS))
      .attr("stroke-width", 0.1);

    svg
      .selectAll("text[data-label], line[data-label], circle[data-label]")
      .transition()
      .delay(ANIMATION_CONFIG.DURATION_SHORT)
      .duration(ANIMATION_CONFIG.DURATION_SHORT)
      .attr("opacity", 1);
  }

  // Update view toggle button text
  const menuToggle = document.getElementById("menuViewToggle");
  if (menuToggle) {
    menuToggle.textContent = getViewToggleText();
  }
}

/**
 * Calculate positions for hexagons in a grid layout
 * @param {number} totalHexagons - Total number of hexagons
 * @returns {Array} Array of {x, y} position objects
 */
function calculateHexagonGridPositions(totalHexagons) {
  const padding = 50;

  // Hexagon dimensions
  const hexWidth = VIZ_CONFIG.HEX_RADIUS * 2 * Math.sin(Math.PI / 3);
  const hexHeight = VIZ_CONFIG.HEX_RADIUS * 1.5;

  const availableWidth = VIZ_CONFIG.SVG_WIDTH - padding * 2;
  const availableHeight = VIZ_CONFIG.SVG_HEIGHT - padding * 2;

  const cols = Math.ceil(Math.sqrt(totalHexagons * (availableWidth / availableHeight) * (hexWidth / hexHeight)));
  const rows = Math.ceil(totalHexagons / cols);

  const gridWidth = cols * hexWidth;
  const gridHeight = rows * hexHeight;
  const offsetX = (VIZ_CONFIG.SVG_WIDTH - gridWidth) / 1.5 + hexWidth / 2;
  const offsetY = VIZ_CONFIG.HEX_RADIUS * 2;

  const positions = [];
  for (let i = 0; i < totalHexagons; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const x = offsetX + col * hexWidth + (row % 2) * (hexWidth / 2);
    const y = offsetY + row * hexHeight;
    positions.push({ x, y });
  }

  return positions;
}

/**
 * Get the current view toggle button text
 * @returns {string} Translated button text
 */
export function getViewToggleText() {
  return isSquareLayout ? globalThis.i18n.t("country.mapView") : globalThis.i18n.t("country.squareView");
}

/**
 * Setup D3 projection and hexbin for a country
 * @param {Object} config - Country configuration
 * @returns {Object} Object containing projection and hexbin
 */
function setupProjectionAndHexbin(config) {
  const projection = d3
    .geoMercator()
    .center(config.center)
    .scale(config.scale)
    .translate([VIZ_CONFIG.SVG_WIDTH / 2, VIZ_CONFIG.SVG_HEIGHT / 2]);

  const hexbin = d3
    .hexbin()
    .radius(VIZ_CONFIG.HEX_RADIUS)
    .extent([
      [0, 0],
      [VIZ_CONFIG.SVG_WIDTH, VIZ_CONFIG.SVG_HEIGHT],
    ]);

  return { projection, hexbin };
}

/**
 * Get country feature from world data
 * @param {Object} worldData - TopoJSON world data
 * @param {Object} config - Country configuration
 * @returns {Object|null} Country feature or null if not found
 */
function getCountryFeature(worldData, config) {
  const countries = topojson.feature(worldData, worldData.objects.countries);
  return countries.features.find((d) => d.id === config.isoCode) || null;
}

/**
 * Generate hexagon grid centers for the visualization
 * @returns {Array} Array of [x, y] coordinate pairs
 */
function generateHexagonGrid() {
  const hexCenters = [];
  const hexRadius = VIZ_CONFIG.HEX_RADIUS;

  for (let y = hexRadius; y < VIZ_CONFIG.SVG_HEIGHT; y += hexRadius * 1.5) {
    for (let x = hexRadius; x < VIZ_CONFIG.SVG_WIDTH; x += hexRadius * Math.sqrt(3)) {
      hexCenters.push([x, y]);
    }
  }

  return hexCenters;
}

/**
 * Generate hexagon data for a country based on its geographic shape
 * @param {Object} countryFeature - Country GeoJSON feature
 * @param {Function} projection - D3 projection function
 * @param {Function} hexbin - D3 hexbin function
 * @returns {Array} Hexbin data
 */
function generateCountryHexagons(countryFeature, projection, hexbin) {
  const hexCenters = generateHexagonGrid();
  const hexPoints = hexCenters.filter((center) =>
    d3.geoContains(countryFeature, projection.invert(center))
  );
  return hexbin(hexPoints);
}

/**
 * Assign colors to hexagons based on category percentages
 * @param {number} totalHexagons - Total number of hexagons
 * @param {Array} categories - Array of category objects with percentages
 * @returns {Array} Array of category names for each hexagon
 */
function assignHexagonColors(totalHexagons, categories) {
  const hexColors = [];
  let remainingHexagons = totalHexagons;

  categories.forEach((category, index) => {
    let hexagonsPerCategory;
    if (index === categories.length - 1) {
      hexagonsPerCategory = remainingHexagons;
    } else {
      hexagonsPerCategory = Math.round(totalHexagons * category.percentage);
      remainingHexagons -= hexagonsPerCategory;
    }
    for (let i = 0; i < hexagonsPerCategory; i++) {
      hexColors.push(category.name);
    }
  });

  return hexColors;
}

/**
 * Create D3 color scale from categories
 * @param {Array} categories - Array of category objects
 * @returns {Function} D3 color scale function
 */
function createColorScale(categories) {
  return d3
    .scaleOrdinal()
    .domain(categories.map((c) => c.name))
    .range(categories.map((c) => c.color));
}

/**
 * Create interaction handlers for hexagon highlighting and selection
 * @param {Object} svg - D3 SVG selection
 * @param {Array} hexColors - Array of category names for each hexagon
 * @param {Array} categories - Array of category objects
 * @returns {Object} Object with handler functions
 */
function createInteractionHandlers(svg, hexColors, categories) {
  let selectedCategory = null;

  const highlightHexagons = (category) => {
    svg
      .selectAll(".hexagon")
      .filter((_, i) => hexColors[i] === category)
      .classed("highlight", true);
    svg
      .selectAll(".legend-item")
      .filter((_, i) => categories[i].name !== category)
      .classed("dimmed", true);
    svg
      .selectAll(".legend-item")
      .filter((_, i) => categories[i].name === category)
      .classed("dimmed", false);
  };

  const deselectHexagons = () => {
    svg.selectAll(".hexagon").classed("highlight", false);
    svg.selectAll(".legend-item").classed("dimmed", false);
    selectedCategory = null;
  };

  return {
    highlightHexagons,
    deselectHexagons,
    getSelectedCategory: () => selectedCategory,
    setSelectedCategory: (cat) => { selectedCategory = cat; }
  };
}

/**
 * Render hexagons with animations and interactions
 * @param {Object} svg - D3 SVG selection
 * @param {Array} hexData - Hexbin data
 * @param {Array} hexColors - Array of category names for each hexagon
 * @param {Function} hexbin - D3 hexbin function
 * @param {Function} colorScale - D3 color scale function
 * @param {Object} handlers - Interaction handler functions
 */
function renderHexagons(svg, hexData, hexColors, hexbin, colorScale, handlers) {
  svg
    .append("g")
    .selectAll("path")
    .data(hexData)
    .enter()
    .append("path")
    .attr("class", "hexagon")
    .attr("d", () => hexbin.hexagon(0))
    .attr("transform", (d) => `translate(${d.x},${d.y - Math.random() * 200})`)
    .attr("fill", "var(--bg-light)")
    .on("mouseenter", function (event, d) {
      const category = hexColors[hexData.indexOf(d)];
      handlers.highlightHexagons(category);
    })
    .on("mouseleave", function () {
      if (!handlers.getSelectedCategory()) {
        handlers.deselectHexagons();
      }
    })
    .on("click", function (event, d) {
      const category = hexColors[hexData.indexOf(d)];
      if (handlers.getSelectedCategory() === category) {
        handlers.deselectHexagons();
      } else {
        handlers.deselectHexagons();
        handlers.highlightHexagons(category);
        handlers.setSelectedCategory(category);
      }
      event.stopPropagation();
      event.preventDefault();
    })
    .transition()
    .delay((d, i) => i * ANIMATION_CONFIG.DELAY_PER_HEX)
    .duration(ANIMATION_CONFIG.DURATION_MEDIUM)
    .ease(d3.easeCubicOut)
    .attr("fill", (d, i) => colorScale(hexColors[i]))
    .attr("transform", (d) => `translate(${d.x},${d.y})`)
    .attr("d", () => hexbin.hexagon(VIZ_CONFIG.HEX_RADIUS));
}

/**
 * Render legend with categories and percentages
 * @param {Object} svg - D3 SVG selection
 * @param {Array} categories - Array of category objects
 * @param {Function} hexbin - D3 hexbin function
 * @param {Object} config - Country configuration
 */
function renderLegend(svg, categories, hexbin, config) {
  const legendPosition = config.legendPosition || "top";
  let legendY = VIZ_CONFIG.LEGEND_PADDING;

  if (legendPosition === "bottom") {
    legendY = VIZ_CONFIG.SVG_HEIGHT -
              categories.length * VIZ_CONFIG.LEGEND_ITEM_HEIGHT -
              VIZ_CONFIG.LEGEND_BOTTOM_OFFSET;
  }

  const legend = svg.append("g")
    .attr("transform", `translate(${VIZ_CONFIG.LEGEND_PADDING}, ${legendY})`);

  categories.forEach((category, i) => {
    const legendItem = legend
      .append("g")
      .attr("transform", `translate(0, ${i * VIZ_CONFIG.LEGEND_ITEM_HEIGHT})`)
      .attr("class", `legend-item ${category.name.replace(/\s+/g, "-")}`);

    legendItem
      .append("path")
      .attr("d", hexbin.hexagon(VIZ_CONFIG.HEX_RADIUS))
      .attr("transform", "translate(5,5)")
      .style("fill", category.color)
      .attr("opacity", 0)
      .transition()
      .delay(i * ANIMATION_CONFIG.DELAY_PER_LEGEND)
      .duration(ANIMATION_CONFIG.DURATION_SHORT)
      .attr("opacity", 1);

    legendItem
      .append("text")
      .attr("x", 20)
      .attr("y", 10)
      .text(`${translateCategory(category.name)}, ${(category.percentage * 100).toFixed(2)}%`)
      .attr("font-size", "14px")
      .attr("fill", "var(--text-light)")
      .attr("opacity", 0)
      .transition()
      .delay(i * ANIMATION_CONFIG.DELAY_PER_LEGEND)
      .duration(ANIMATION_CONFIG.DURATION_SHORT)
      .attr("opacity", 1);
  });
}

/**
 * Render labels with lines pointing to locations
 * @param {Object} svg - D3 SVG selection
 * @param {Array} labels - Array of label objects
 * @param {number} totalHexagons - Total number of hexagons (for animation delay)
 * @param {string} countryKey - Country identifier (for dev mode)
 */
function renderLabels(svg, labels, totalHexagons, countryKey) {
  labels
    .filter((c) => c.displayLabel)
    .forEach((category, i) => {
      const labelGroup = svg;

      const labelText = labelGroup
        .append("text")
        .attr("x", category.labelPosition.x)
        .attr("y", category.labelPosition.y)
        .text(translateLabel(category.label))
        .attr("font-size", "18px")
        .attr("fill", "var(--text-light)")
        .attr("font-weight", "bold")
        .attr("opacity", 0)
        .attr("data-label", category.label)
        .attr("data-type", "position");

      const line = labelGroup
        .append("line")
        .attr("x1", category.labelPosition.x - VIZ_CONFIG.LABEL_LINE_OFFSET)
        .attr("y1", category.labelPosition.y - VIZ_CONFIG.LABEL_OFFSET.y)
        .attr("x2", category.labelTarget.x - VIZ_CONFIG.LABEL_LINE_OFFSET)
        .attr("y2", category.labelTarget.y - VIZ_CONFIG.LABEL_OFFSET.y)
        .attr("stroke", "var(--text-light)")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "2,2")
        .attr("opacity", 0)
        .attr("data-label", category.label);

      const animationDelay = totalHexagons * ANIMATION_CONFIG.DELAY_PER_HEX +
                            ANIMATION_CONFIG.DURATION_MEDIUM +
                            i * ANIMATION_CONFIG.DELAY_PER_LABEL;

      line
        .transition()
        .delay(animationDelay)
        .duration(ANIMATION_CONFIG.DURATION_SHORT)
        .attr("opacity", 1);

      const targetCircle = labelGroup
        .append("circle")
        .attr("cx", category.labelTarget.x - VIZ_CONFIG.LABEL_LINE_OFFSET)
        .attr("cy", category.labelTarget.y - VIZ_CONFIG.LABEL_OFFSET.y)
        .attr("r", 5)
        .attr("fill", "var(--text-light)")
        .attr("opacity", 0)
        .attr("data-label", category.label)
        .attr("data-type", "target");

      targetCircle
        .transition()
        .delay(animationDelay)
        .duration(ANIMATION_CONFIG.DURATION_SHORT)
        .attr("opacity", 1);

      const positionCircle = labelGroup
        .append("circle")
        .attr("cx", category.labelPosition.x - VIZ_CONFIG.LABEL_LINE_OFFSET)
        .attr("cy", category.labelPosition.y - VIZ_CONFIG.LABEL_OFFSET.y)
        .attr("r", 5)
        .attr("fill", "var(--text-light)")
        .attr("opacity", 0)
        .attr("data-label", category.label)
        .attr("data-type", "position");

      positionCircle
        .transition()
        .delay(animationDelay)
        .duration(ANIMATION_CONFIG.DURATION_SHORT)
        .attr("opacity", 1);

      if (DEV_MODE) {
        enableLabelDevMode(svg, labelText, positionCircle, targetCircle, category, labels, countryKey);
      }

      labelText
        .transition()
        .delay(animationDelay)
        .duration(ANIMATION_CONFIG.DURATION_SHORT)
        .attr("opacity", 1);
    });
}

/**
 * Enable development mode for label positioning
 * @param {Object} svg - D3 SVG selection
 * @param {Object} labelText - Label text element
 * @param {Object} positionCircle - Position circle element
 * @param {Object} targetCircle - Target circle element
 * @param {Object} category - Category object
 * @param {Array} labels - All labels array
 * @param {string} countryKey - Country identifier
 */
function enableLabelDevMode(svg, labelText, positionCircle, targetCircle, category, labels, countryKey) {
  const printLabelCoordinates = () => {
    const coordinates = [];

    labels.forEach((label) => {
      const textEl = svg.select(`text[data-label="${label.label}"]`);
      const targetEl = svg.select(`circle[data-label="${label.label}"][data-type="target"]`);

      if (!textEl.empty() && !targetEl.empty()) {
        const posX = parseFloat(textEl.attr("x"));
        const posY = parseFloat(textEl.attr("y"));
        const targetX = parseFloat(targetEl.attr("cx")) + VIZ_CONFIG.LABEL_LINE_OFFSET;
        const targetY = parseFloat(targetEl.attr("cy")) + VIZ_CONFIG.LABEL_OFFSET.y;

        coordinates.push({
          label: label.label,
          displayLabel: true,
          labelTarget: { x: Math.round(targetX), y: Math.round(targetY) },
          labelPosition: { x: Math.round(posX), y: Math.round(posY) },
        });
      }
    });

    console.log(`\n=== ${countryKey} Label Coordinates (JSON) ===`);
    console.log(JSON.stringify(coordinates, null, 2));
    console.log("===============================================\n");
  };

  const dragPosition = d3
    .drag()
    .on("drag", function (event) {
      const label = d3.select(this).attr("data-label");
      const newX = event.x;
      const newY = event.y;

      svg
        .selectAll(`circle[data-label="${label}"][data-type="position"]`)
        .attr("cx", newX - VIZ_CONFIG.LABEL_LINE_OFFSET)
        .attr("cy", newY - VIZ_CONFIG.LABEL_OFFSET.y);

      svg.selectAll(`text[data-label="${label}"]`)
        .attr("x", newX)
        .attr("y", newY);

      svg
        .selectAll(`line[data-label="${label}"]`)
        .attr("x1", newX - VIZ_CONFIG.LABEL_LINE_OFFSET)
        .attr("y1", newY - VIZ_CONFIG.LABEL_OFFSET.y);
    })
    .on("end", printLabelCoordinates);

  const dragTarget = d3
    .drag()
    .on("drag", function (event) {
      const label = d3.select(this).attr("data-label");
      const newX = event.x;
      const newY = event.y;

      svg
        .selectAll(`circle[data-label="${label}"][data-type="target"]`)
        .attr("cx", newX - VIZ_CONFIG.LABEL_LINE_OFFSET)
        .attr("cy", newY - VIZ_CONFIG.LABEL_OFFSET.y);

      svg
        .selectAll(`line[data-label="${label}"]`)
        .attr("x2", newX - VIZ_CONFIG.LABEL_LINE_OFFSET)
        .attr("y2", newY - VIZ_CONFIG.LABEL_OFFSET.y);
    })
    .on("end", printLabelCoordinates);

  labelText.attr("cursor", "move").call(dragPosition);
  positionCircle.attr("cursor", "move").call(dragPosition);
  targetCircle.attr("cursor", "move").call(dragTarget);
}

/**
 * Render the country visualization
 * @param {string} countryKey - The country identifier
 */
function renderCountry(countryKey) {
  if (!worldData) return;

  const config = countryConfigs[countryKey];
  const svg = d3.select("#countrySvg");
  svg.selectAll("*").remove();

  // Setup projection and hexbin
  const { projection, hexbin } = setupProjectionAndHexbin(config);

  // Get country feature
  const countryFeature = getCountryFeature(worldData, config);
  if (!countryFeature) {
    console.error(`Country ${countryKey} not found in dataset`);
    return;
  }

  // Generate hexagon data for the country shape
  const hexData = generateCountryHexagons(countryFeature, projection, hexbin);
  hexDataGlobal = hexData;

  // Assign colors to hexagons based on categories
  const hexColors = assignHexagonColors(hexData.length, config.categories);
  hexColorsGlobal = hexColors;

  // Create color scale
  const colorScale = createColorScale(config.categories);

  // Setup interaction handlers
  const handlers = createInteractionHandlers(svg, hexColors, config.categories);

  // Render hexagons with animations and interactions
  renderHexagons(svg, hexData, hexColors, hexbin, colorScale, handlers);

  // Setup body click handler to deselect
  d3.select("body").on("click", function () {
    if (handlers.getSelectedCategory() !== null) {
      handlers.deselectHexagons();
    }
  });

  // Render legend
  renderLegend(svg, config.categories, hexbin, config);

  // Render labels
  renderLabels(svg, config.labels, hexData.length, countryKey);
}

/**
 * Initialize the country page
 */
async function initCountryPage() {
  try {
    // Load map data and translations in parallel
    const [_, world] = await Promise.all([
      globalThis.initI18n(),
      fetch("/vendor/countries-50m.json").then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load map data: ${res.status}`);
        }
        return res.json();
      })
    ]);

    worldData = world;

    // Initialize page UI elements with translations
    initializePageElements();

    // Expose view toggle functions for menu
    globalThis.toggleLayout = toggleLayout;
    globalThis.getViewToggleText = getViewToggleText;

    // Set initial view toggle button text
    const menuToggle = document.getElementById("menuViewToggle");
    if (menuToggle) {
      menuToggle.textContent = getViewToggleText();
    }

    // Render the country visualization
    renderCountry(currentCountry);

    // Listen for language changes and re-render dynamic content
    globalThis.addEventListener("languageChanged", () => {
      try {
        // Update page title and country name
        const countryName = globalThis.i18n.t(`countries.${currentCountry}`) || countryNames[currentCountry];
        document.title = `${globalThis.i18n.t("country.titlePrefix")}${countryName} - OnsLand`;

        const titleElement = document.querySelector(".title-country");
        if (titleElement) {
          titleElement.textContent = countryName;
        }

        // Update view toggle button text
        const menuToggle = document.getElementById("menuViewToggle");
        if (menuToggle) {
          menuToggle.textContent = getViewToggleText();
        }

        // Re-render country visualization
        renderCountry(currentCountry);

        // Re-render rankings
        displayRankings();
      } catch (error) {
        console.error("Error handling language change:", error);
      }
    });
  } catch (error) {
    console.error("Error initializing country page:", error);

    // Show user-friendly error message
    const svg = d3.select("#countrySvg");
    svg.selectAll("*").remove();

    svg.append("text")
      .attr("x", VIZ_CONFIG.SVG_WIDTH / 2)
      .attr("y", VIZ_CONFIG.SVG_HEIGHT / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "var(--text-light)")
      .attr("font-size", "18px")
      .text("Failed to load visualization. Please refresh the page.");
  }
}

// Initialize page when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCountryPage);
} else {
  initCountryPage();
}
