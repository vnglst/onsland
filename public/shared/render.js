// Shared rendering utilities for OnsLand visualizations

// Configuration constants for previews
const PREVIEW_CONFIG = {
  MAP: {
    width: 800,
    height: 800,
    hexRadius: 12
  },
  SQUARE: {
    width: 800,
    height: 800,
    hexRadius: 8,
    padding: 50,
    totalHexagons: 2500
  }
};

const validCountries = [
  'austria',
  'belgium',
  'bulgaria',
  'croatia',
  'czechia',
  'denmark',
  'estonia',
  'finland',
  'france',
  'germany',
  'greece',
  'hungary',
  'ireland',
  'italy',
  'latvia',
  'lithuania',
  'luxembourg',
  'netherlands',
  'poland',
  'portugal',
  'romania',
  'slovakia',
  'slovenia',
  'spain',
  'sweden',
  'uk',
];

const countryNames = {
  austria: 'Austria',
  belgium: 'Belgium',
  bulgaria: 'Bulgaria',
  croatia: 'Croatia',
  czechia: 'Czechia',
  denmark: 'Denmark',
  estonia: 'Estonia',
  finland: 'Finland',
  france: 'France',
  germany: 'Germany',
  greece: 'Greece',
  hungary: 'Hungary',
  ireland: 'Ireland',
  italy: 'Italy',
  latvia: 'Latvia',
  lithuania: 'Lithuania',
  luxembourg: 'Luxembourg',
  netherlands: 'The Netherlands',
  poland: 'Poland',
  portugal: 'Portugal',
  romania: 'Romania',
  slovakia: 'Slovakia',
  slovenia: 'Slovenia',
  spain: 'Spain',
  sweden: 'Sweden',
  uk: 'United Kingdom',
};

/**
 * Setup SVG element for rendering
 * @param {Element} svgElement - DOM element to select
 * @returns {Object} D3 selection
 */
function setupPreviewSvg(svgElement) {
  const svg = d3.select(svgElement);
  svg.selectAll('*').remove();
  return svg;
}

/**
 * Create color scale for categories
 * @param {Array} categories - Array of category objects
 * @returns {Function} D3 color scale
 */
function createPreviewColorScale(categories) {
  return d3.scaleOrdinal()
    .domain(categories.map((c) => c.name))
    .range(categories.map((c) => c.color));
}

/**
 * Assign colors to hexagons based on category percentages
 * @param {number} totalHexagons - Total number of hexagons
 * @param {Array} categories - Array of category objects
 * @returns {Array} Array of category names
 */
function assignPreviewColors(totalHexagons, categories) {
  const hexColors = [];
  let remainingHexagons = totalHexagons;

  categories.forEach((category, index) => {
    const hexagonsPerCategory = index === categories.length - 1
      ? remainingHexagons
      : Math.round(totalHexagons * category.percentage);

    remainingHexagons -= hexagonsPerCategory;

    for (let i = 0; i < hexagonsPerCategory; i++) {
      hexColors.push(category.name);
    }
  });

  return hexColors;
}

// Render small preview version of a country (no animations, no interactions)
function renderCountryPreview(countryKey, svgElement, worldData) {
  if (!worldData) return;

  const config = countryConfigs[countryKey];
  const previewConfig = PREVIEW_CONFIG.MAP;

  const svg = setupPreviewSvg(svgElement);

  const projection = d3
    .geoMercator()
    .center(config.center)
    .scale(config.scale)
    .translate([previewConfig.width / 2, previewConfig.height / 2]);

  const hexbin = d3
    .hexbin()
    .radius(previewConfig.hexRadius)
    .extent([
      [0, 0],
      [previewConfig.width, previewConfig.height],
    ]);

  const countries = topojson.feature(worldData, worldData.objects.countries);
  const countryFeature = countries.features.find((d) => d.id === config.isoCode);

  if (!countryFeature) return;

  const hexCenters = [];
  for (let y = previewConfig.hexRadius; y < previewConfig.height; y += previewConfig.hexRadius * 1.5) {
    for (let x = previewConfig.hexRadius; x < previewConfig.width; x += previewConfig.hexRadius * Math.sqrt(3)) {
      hexCenters.push([x, y]);
    }
  }

  const hexPoints = hexCenters.filter((center) =>
    d3.geoContains(countryFeature, projection.invert(center))
  );
  const hexData = hexbin(hexPoints);

  const colorScale = createPreviewColorScale(config.categories);
  const hexColors = assignPreviewColors(hexData.length, config.categories);

  svg
    .append('g')
    .selectAll('path')
    .data(hexData)
    .enter()
    .append('path')
    .attr('class', 'hexagon-preview')
    .attr('d', () => hexbin.hexagon(previewConfig.hexRadius))
    .attr('transform', (d) => `translate(${d.x},${d.y})`)
    .attr('fill', (d, i) => colorScale(hexColors[i]))
    .attr('stroke', 'var(--bg-light)')
    .attr('stroke-width', 0.1);
}

// Render square preview with uniform grid (no country shape, just data viz)
function renderCountrySquarePreview(countryKey, svgElement, worldData) {
  if (!worldData) return;

  const config = countryConfigs[countryKey];
  const previewConfig = PREVIEW_CONFIG.SQUARE;

  const svg = setupPreviewSvg(svgElement);

  // Hexagon dimensions
  const hexWidth = previewConfig.hexRadius * 2 * Math.sin(Math.PI / 3);
  const hexHeight = previewConfig.hexRadius * 1.5;

  // Calculate grid dimensions
  const cols = Math.ceil(Math.sqrt(previewConfig.totalHexagons * (hexWidth / hexHeight)));
  const rows = Math.ceil(previewConfig.totalHexagons / cols);

  const gridWidth = cols * hexWidth;
  const gridHeight = rows * hexHeight + previewConfig.hexRadius * 0.5;
  const offsetX = (previewConfig.width - gridWidth) / 2;
  const offsetY = (previewConfig.height - gridHeight) / 2;

  const colorScale = createPreviewColorScale(config.categories);
  const hexColors = assignPreviewColors(previewConfig.totalHexagons, config.categories);

  // Create hexagon path generator
  const hexbin = d3.hexbin().radius(previewConfig.hexRadius);

  svg
    .append('g')
    .selectAll('path')
    .data(d3.range(previewConfig.totalHexagons))
    .enter()
    .append('path')
    .attr('d', hexbin.hexagon())
    .attr('transform', (d, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const x = offsetX + col * hexWidth + (row % 2) * (hexWidth / 2);
      const y = offsetY + row * hexHeight;
      return `translate(${x},${y})`;
    })
    .attr('fill', (d, i) => (hexColors[i] ? colorScale(hexColors[i]) : 'var(--bg-light)'))
    .attr('stroke', 'var(--bg-light)')
    .attr('stroke-width', 0.5);
}

function squarePath(size) {
  const half = size / 2;
  return `M ${-half},${-half} L ${half},${-half} L ${half},${half} L ${-half},${half} Z`;
}

function calculateSquarePositions(totalHexagons) {
  const squareSize = 10;
  const padding = PREVIEW_CONFIG.SQUARE.padding;

  const availableWidth = PREVIEW_CONFIG.SQUARE.width - padding * 2;
  const availableHeight = PREVIEW_CONFIG.SQUARE.height - padding * 2;

  const cols = Math.ceil(Math.sqrt(totalHexagons * (availableWidth / availableHeight)));
  const rows = Math.ceil(totalHexagons / cols);

  const gridWidth = cols * squareSize;
  const gridHeight = rows * squareSize;
  const offsetX = (PREVIEW_CONFIG.SQUARE.width - gridWidth) / 1.5 + squareSize / 2;
  const offsetY = squareSize;

  const positions = [];
  for (let i = 0; i < totalHexagons; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const x = offsetX + col * squareSize;
    const y = offsetY + row * squareSize;
    positions.push({ x, y });
  }

  return positions;
}
