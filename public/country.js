// Country page functionality
// Handles the detailed country visualization with D3.js and rankings display

const DEV_MODE = false;

const countryFromRoute = window.__COUNTRY__;
const currentCountry = validCountries.includes(countryFromRoute) ? countryFromRoute : "netherlands";

let worldData = null;
let isSquareLayout = false;
let hexDataGlobal = null;
let hexColorsGlobal = null;

/**
 * Initialize page UI elements with translations
 */
function initializePageElements() {
  const countryName = i18n.t(`countries.${currentCountry}`) || countryNames[currentCountry];
  document.title = `${i18n.t("country.titlePrefix")}${countryName} - OnsLand`;
  document.querySelector(".title-country").textContent = countryName;
  updateMetaDescription(i18n.t("country.metaDescription"));

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
  labelDiv.textContent = i18n.t(labelKey);

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

  // Get top 2 rankings (lowest positions)
  const topRankings = sortedRankings.slice(0, 2);

  // Get bottom 2 rankings (highest positions)
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
function toggleLayout() {
  isSquareLayout = !isSquareLayout;
  const svg = d3.select("#countrySvg");
  const hexRadius = 6;
  const hexbin = d3.hexbin().radius(hexRadius);

  // Get color scale to ensure proper colors
  const config = countryConfigs[currentCountry];
  const categories = config.categories;
  const colorScale = d3
    .scaleOrdinal()
    .domain(categories.map((c) => c.name))
    .range(categories.map((c) => c.color));

  // Calculate positions and stroke width based on layout mode
  const hexagonPositions = isSquareLayout ? calculateHexagonGridPositions(hexDataGlobal.length) : null;
  const strokeWidth = isSquareLayout ? 0 : 0.1;
  const labelOpacity = isSquareLayout ? 0 : 1;
  const labelDelay = isSquareLayout ? 0 : 500;

  // Animate hexagons
  svg
    .selectAll(".hexagon")
    .interrupt()
    .attr("fill", (d, i) => colorScale(hexColorsGlobal[i]))
    .transition()
    .duration(1000)
    .ease(d3.easeCubicInOut)
    .attr("transform", (d, i) => {
      if (isSquareLayout) {
        const pos = hexagonPositions[i];
        return `translate(${pos.x},${pos.y})`;
      }
      return `translate(${hexDataGlobal[i].x},${hexDataGlobal[i].y})`;
    })
    .attr("d", hexbin.hexagon(hexRadius))
    .attr("stroke-width", strokeWidth);

  // Animate labels
  svg
    .selectAll("text[data-label], line[data-label], circle[data-label]")
    .transition()
    .delay(labelDelay)
    .duration(500)
    .attr("opacity", labelOpacity);

  updateMenuViewToggle(getViewToggleText);
}

/**
 * Calculate positions for hexagons in a grid layout
 * @param {number} totalHexagons - Total number of hexagons
 * @returns {Array} Array of {x, y} position objects
 */
function calculateHexagonGridPositions(totalHexagons) {
  const width = 800;
  const height = 800;
  const hexRadius = 6;
  const padding = 50;

  // Hexagon dimensions
  const hexWidth = hexRadius * 2 * Math.sin(Math.PI / 3);
  const hexHeight = hexRadius * 1.5;

  const availableWidth = width - padding * 2;
  const availableHeight = height - padding * 2;

  const cols = Math.ceil(Math.sqrt(totalHexagons * (availableWidth / availableHeight) * (hexWidth / hexHeight)));
  const rows = Math.ceil(totalHexagons / cols);

  const gridWidth = cols * hexWidth;
  const gridHeight = rows * hexHeight;
  const offsetX = (width - gridWidth) / 1.5 + hexWidth / 2;
  const offsetY = hexRadius * 2;

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
function getViewToggleText() {
  return isSquareLayout ? i18n.t("country.mapView") : i18n.t("country.squareView");
}

/**
 * Setup visualization components (SVG, projection, hexbin)
 * @param {Object} config - Country configuration
 * @param {number} width - SVG width
 * @param {number} height - SVG height
 * @param {number} hexRadius - Hexagon radius
 * @returns {Object} Visualization setup objects
 */
function setupVisualization(config, width, height, hexRadius) {
  const projection = d3
    .geoMercator()
    .center(config.center)
    .scale(config.scale)
    .translate([width / 2, height / 2]);

  const path = d3.geoPath().projection(projection);

  const hexbin = d3
    .hexbin()
    .radius(hexRadius)
    .extent([
      [0, 0],
      [width, height],
    ]);

  return { projection, path, hexbin };
}

/**
 * Generate hexagon data for the country
 * @param {Object} projection - D3 projection
 * @param {Object} hexbin - D3 hexbin generator
 * @param {Object} countryFeature - GeoJSON country feature
 * @param {number} hexRadius - Hexagon radius
 * @param {number} width - SVG width
 * @param {number} height - SVG height
 * @returns {Array} Hexagon data array
 */
function generateHexagonData(projection, hexbin, countryFeature, hexRadius, width, height) {
  const hexCenters = [];
  for (let y = hexRadius; y < height; y += hexRadius * 1.5) {
    for (let x = hexRadius; x < width; x += hexRadius * Math.sqrt(3)) {
      hexCenters.push([x, y]);
    }
  }

  const hexPoints = hexCenters.filter((center) => d3.geoContains(countryFeature, projection.invert(center)));
  return hexbin(hexPoints);
}

/**
 * Create interaction handlers for hexagons
 * @param {Object} svg - D3 SVG selection
 * @param {Array} hexData - Hexagon data
 * @param {Array} hexColors - Array of hexagon colors
 * @param {Array} categories - Category data
 * @returns {Object} Interaction handler functions
 */
function createInteractionHandlers(svg, hexData, hexColors, categories) {
  let selectedCategory = null;

  function highlightHexagons(category) {
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
  }

  function deselectHexagons() {
    svg.selectAll(".hexagon").classed("highlight", false);
    svg.selectAll(".legend-item").classed("dimmed", false);
    selectedCategory = null;
  }

  function getSelectedCategory() {
    return selectedCategory;
  }

  function setSelectedCategory(category) {
    selectedCategory = category;
  }

  return {
    highlightHexagons,
    deselectHexagons,
    getSelectedCategory,
    setSelectedCategory,
  };
}

/**
 * Render hexagons with animations and interactions
 * @param {Object} svg - D3 SVG selection
 * @param {Object} hexbin - D3 hexbin generator
 * @param {Array} hexData - Hexagon data
 * @param {Array} hexColors - Array of hexagon colors
 * @param {Object} colorScale - D3 color scale
 * @param {number} hexRadius - Hexagon radius
 * @param {Object} handlers - Interaction handlers
 */
function renderHexagons(svg, hexbin, hexData, hexColors, colorScale, hexRadius, handlers) {
  svg
    .append("g")
    .selectAll("path")
    .data(hexData)
    .enter()
    .append("path")
    .attr("class", "hexagon")
    .attr("d", (d) => hexbin.hexagon(0))
    .attr("transform", (d) => `translate(${d.x},${d.y - Math.random() * 200})`)
    .attr("fill", "var(--bg-light)")
    .on("mouseenter", function (event, d) {
      const category = hexColors[hexData.indexOf(d)];
      handlers.highlightHexagons(category);
    })
    .on("mouseleave", function (event, d) {
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
    .delay((d, i) => i * 0.7)
    .duration(750)
    .ease(d3.easeCubicOut)
    .attr("fill", (d, i) => colorScale(hexColors[i]))
    .attr("transform", (d) => `translate(${d.x},${d.y})`)
    .attr("d", (d) => hexbin.hexagon(hexRadius));

  // Setup body click handler to deselect
  d3.select("body").on("click", function () {
    if (handlers.getSelectedCategory() !== null) {
      handlers.deselectHexagons();
    }
  });
}

/**
 * Render legend with categories
 * @param {Object} svg - D3 SVG selection
 * @param {Array} categories - Category data
 * @param {Object} hexbin - D3 hexbin generator
 * @param {number} hexRadius - Hexagon radius
 * @param {Object} config - Country configuration
 * @param {number} height - SVG height
 */
function renderLegend(svg, categories, hexbin, hexRadius, config, height) {
  const legendPosition = config.legendPosition || "top";
  let legendY = 5;
  if (legendPosition === "bottom") {
    legendY = height - categories.length * 20 - 120;
  }

  const legend = svg.append("g").attr("transform", `translate(5, ${legendY})`);

  categories.forEach((category, i) => {
    const legendItem = legend
      .append("g")
      .attr("transform", `translate(0, ${i * 20})`)
      .attr("class", `legend-item ${category.name.replace(/\s+/g, "-")}`);

    legendItem
      .append("path")
      .attr("d", hexbin.hexagon(hexRadius))
      .attr("transform", "translate(5,5)")
      .style("fill", category.color)
      .attr("opacity", 0)
      .transition()
      .delay(i * 40)
      .duration(500)
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
      .delay(i * 40)
      .duration(500)
      .attr("opacity", 1);
  });
}

/**
 * Render labels for the country visualization
 * @param {Object} svg - D3 SVG selection
 * @param {Array} labels - Label configuration
 * @param {number} totalHexagons - Total number of hexagons
 * @param {string} countryKey - Country identifier
 */
function renderLabels(svg, labels, totalHexagons, countryKey) {
  function printLabelCoordinates() {
    const coordinates = [];

    labels.forEach((label) => {
      const textEl = svg.select(`text[data-label="${label.label}"]`);
      const targetEl = svg.select(`circle[data-label="${label.label}"][data-type="target"]`);

      if (!textEl.empty() && !targetEl.empty()) {
        const posX = parseFloat(textEl.attr("x"));
        const posY = parseFloat(textEl.attr("y"));
        const targetX = parseFloat(targetEl.attr("cx")) + 10;
        const targetY = parseFloat(targetEl.attr("cy")) + 5;

        coordinates.push({
          label: label.label,
          displayLabel: true,
          labelTarget: { x: Math.round(targetX), y: Math.round(targetY) },
          labelPosition: { x: Math.round(posX), y: Math.round(posY) },
        });
      }
    });

    if (DEV_MODE) {
      console.log(`\n=== ${countryKey} Label Coordinates (JSON) ===`);
      console.log(JSON.stringify(coordinates, null, 2));
      console.log("===============================================\n");
    }
  }

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
        .attr("x1", category.labelPosition.x - 10)
        .attr("y1", category.labelPosition.y - 5)
        .attr("x2", category.labelTarget.x - 10)
        .attr("y2", category.labelTarget.y - 5)
        .attr("stroke", "var(--text-light)")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "2,2")
        .attr("opacity", 0)
        .attr("data-label", category.label);

      line
        .transition()
        .delay(totalHexagons * 0.7 + 750 + i * 300)
        .duration(500)
        .attr("opacity", 1);

      const targetCircle = labelGroup
        .append("circle")
        .attr("cx", category.labelTarget.x - 10)
        .attr("cy", category.labelTarget.y - 5)
        .attr("r", 5)
        .attr("fill", "var(--text-light)")
        .attr("opacity", 0)
        .attr("data-label", category.label)
        .attr("data-type", "target");

      targetCircle
        .transition()
        .delay(totalHexagons * 0.7 + 750 + i * 300)
        .duration(500)
        .attr("opacity", 1);

      const positionCircle = labelGroup
        .append("circle")
        .attr("cx", category.labelPosition.x - 10)
        .attr("cy", category.labelPosition.y - 5)
        .attr("r", 5)
        .attr("fill", "var(--text-light)")
        .attr("opacity", 0)
        .attr("data-label", category.label)
        .attr("data-type", "position");

      positionCircle
        .transition()
        .delay(totalHexagons * 0.7 + 750 + i * 300)
        .duration(500)
        .attr("opacity", 1);

      if (DEV_MODE) {
        const dragPosition = d3
          .drag()
          .on("drag", function (event) {
            const label = d3.select(this).attr("data-label");
            const newX = event.x;
            const newY = event.y;

            svg
              .selectAll(`circle[data-label="${label}"][data-type="position"]`)
              .attr("cx", newX - 10)
              .attr("cy", newY - 5);

            svg.selectAll(`text[data-label="${label}"]`).attr("x", newX).attr("y", newY);

            svg
              .selectAll(`line[data-label="${label}"]`)
              .attr("x1", newX - 10)
              .attr("y1", newY - 5);
          })
          .on("end", function () {
            printLabelCoordinates();
          });

        const dragTarget = d3
          .drag()
          .on("drag", function (event) {
            const label = d3.select(this).attr("data-label");
            const newX = event.x;
            const newY = event.y;

            svg
              .selectAll(`circle[data-label="${label}"][data-type="target"]`)
              .attr("cx", newX - 10)
              .attr("cy", newY - 5);

            svg
              .selectAll(`line[data-label="${label}"]`)
              .attr("x2", newX - 10)
              .attr("y2", newY - 5);
          })
          .on("end", function () {
            printLabelCoordinates();
          });

        labelText.attr("cursor", "move").call(dragPosition);
        positionCircle.attr("cursor", "move").call(dragPosition);
        targetCircle.attr("cursor", "move").call(dragTarget);
      }

      labelText
        .transition()
        .delay(totalHexagons * 0.7 + 750 + i * 300)
        .duration(500)
        .attr("opacity", 1);
    });
}

/**
 * Render the country visualization
 * @param {string} countryKey - The country identifier
 */
function renderCountry(countryKey) {
  if (!worldData) return;

  const config = countryConfigs[countryKey];
  const categories = config.categories;
  const labels = config.labels;

  const svg = d3.select("#countrySvg");
  svg.selectAll("*").remove();

  const width = 800;
  const height = 800;
  const hexRadius = 6;

  // Setup visualization components
  const { projection, hexbin } = setupVisualization(config, width, height, hexRadius);

  // Get country feature
  const countries = topojson.feature(worldData, worldData.objects.countries);
  const countryFeature = countries.features.find((d) => d.id === config.isoCode);

  if (!countryFeature) {
    console.error(`Country ${countryKey} not found in dataset`);
    return;
  }

  // Generate hexagon data
  const hexData = generateHexagonData(projection, hexbin, countryFeature, hexRadius, width, height);
  hexDataGlobal = hexData;

  const totalHexagons = hexData.length;

  // Setup color scale
  const colorScale = d3
    .scaleOrdinal()
    .domain(categories.map((c) => c.name))
    .range(categories.map((c) => c.color));

  // Calculate hexagon colors
  const hexColors = calculateHexagonColors(totalHexagons, categories);
  hexColorsGlobal = hexColors;

  // Create interaction handlers
  const handlers = createInteractionHandlers(svg, hexData, hexColors, categories);

  // Render visualization components
  renderHexagons(svg, hexbin, hexData, hexColors, colorScale, hexRadius, handlers);
  renderLegend(svg, categories, hexbin, hexRadius, config, height);
  renderLabels(svg, labels, totalHexagons, countryKey);
}

/**
 * Initialize the country page
 */
async function initCountryPage() {
  try {
    // Load map data and translations in parallel
    const [, world] = await Promise.all([initI18n(), fetch("/vendor/countries-50m.json").then((res) => res.json())]);

    worldData = world;

    // Initialize page UI elements with translations
    initializePageElements();

    // Expose view toggle functions for menu
    window.toggleLayout = toggleLayout;
    window.getViewToggleText = getViewToggleText;

    // Set initial view toggle button text
    updateMenuViewToggle(getViewToggleText);

    // Render the country visualization
    renderCountry(currentCountry);

    // Listen for language changes and re-render dynamic content
    window.addEventListener("languageChanged", () => {
      // Update page title and country name
      const countryName = i18n.t(`countries.${currentCountry}`) || countryNames[currentCountry];
      document.title = `${i18n.t("country.titlePrefix")}${countryName} - OnsLand`;
      document.querySelector(".title-country").textContent = countryName;

      // Update view toggle button text
      updateMenuViewToggle(getViewToggleText);

      // Re-render country visualization (legend and labels)
      renderCountry(currentCountry);

      // Re-render rankings
      displayRankings();
    });
  } catch (error) {
    console.error("Error initializing country page:", error);
  }
}

// Initialize page when DOM is ready
onDOMReady(initCountryPage);
