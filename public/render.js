// Shared rendering utilities for OnsLand visualizations

const validCountries = [
  "austria",
  "belgium",
  "croatia",
  "denmark",
  "finland",
  "france",
  "germany",
  "ireland",
  "italy",
  "netherlands",
  "portugal",
  "romania",
  "spain",
  "sweden",
  "uk",
];

const countryNames = {
  austria: "Austria",
  belgium: "Belgium",
  croatia: "Croatia",
  denmark: "Denmark",
  finland: "Finland",
  france: "France",
  germany: "Germany",
  ireland: "Ireland",
  italy: "Italy",
  netherlands: "The Netherlands",
  portugal: "Portugal",
  romania: "Romania",
  spain: "Spain",
  sweden: "Sweden",
  uk: "United Kingdom",
};

// Render small preview version of a country (no animations, no interactions)
function renderCountryPreview(countryKey, svgElement, worldData) {
  if (!worldData) return;

  const config = countryConfigs[countryKey];
  const categories = config.categories;

  const svg = d3.select(svgElement);
  svg.selectAll("*").remove();

  const width = 800;
  const height = 800;
  const hexRadius = 12; // Larger hexagons = fewer elements = faster rendering

  const projection = d3
    .geoMercator()
    .center(config.center)
    .scale(config.scale)
    .translate([width / 2, height / 2]);

  const countries = topojson.feature(worldData, worldData.objects.countries);
  const countryFeature = countries.features.find((d) => d.id === config.isoCode);

  if (!countryFeature) return;

  const hexbin = d3
    .hexbin()
    .radius(hexRadius)
    .extent([
      [0, 0],
      [width, height],
    ]);

  const hexCenters = [];
  for (let y = hexRadius; y < height; y += hexRadius * 1.5) {
    for (let x = hexRadius; x < width; x += hexRadius * Math.sqrt(3)) {
      hexCenters.push([x, y]);
    }
  }

  const hexPoints = hexCenters.filter((center) => d3.geoContains(countryFeature, projection.invert(center)));
  const hexData = hexbin(hexPoints);
  const totalHexagons = hexData.length;

  const colorScale = d3
    .scaleOrdinal()
    .domain(categories.map((c) => c.name))
    .range(categories.map((c) => c.color));

  // Create color array based on percentages - avoid rounding errors
  let hexColors = [];
  let remainingHexagons = totalHexagons;

  categories.forEach((category, index) => {
    let hexagonsPerCategory;
    if (index === categories.length - 1) {
      // Last category gets all remaining hexagons to avoid rounding errors
      hexagonsPerCategory = remainingHexagons;
    } else {
      hexagonsPerCategory = Math.round(totalHexagons * category.percentage);
      remainingHexagons -= hexagonsPerCategory;
    }
    for (let i = 0; i < hexagonsPerCategory; i++) {
      hexColors.push(category.name);
    }
  });

  // Draw hexagons without animations
  svg
    .append("g")
    .selectAll("path")
    .data(hexData)
    .enter()
    .append("path")
    .attr("class", "hexagon-preview")
    .attr("d", (d) => hexbin.hexagon(hexRadius))
    .attr("transform", (d) => `translate(${d.x},${d.y})`)
    .attr("fill", (d, i) => colorScale(hexColors[i]))
    .attr("stroke", "var(--bg-light)")
    .attr("stroke-width", 0.1);
}

// Render square preview with uniform grid (no country shape, just data viz)
function renderCountrySquarePreview(countryKey, svgElement, worldData) {
  if (!worldData) return;

  const config = countryConfigs[countryKey];
  const categories = config.categories;

  const svg = d3.select(svgElement);
  svg.selectAll("*").remove();

  const width = 800;
  const height = 800;
  const squareSize = 10;
  const padding = 50;

  // Calculate grid dimensions - use same total "area" for all countries
  const totalSquares = 2500; // Fixed number for all countries
  const cols = Math.ceil(Math.sqrt(totalSquares));
  const rows = Math.ceil(totalSquares / cols);

  // Center the grid
  const gridWidth = cols * squareSize;
  const gridHeight = rows * squareSize;
  const offsetX = (width - gridWidth) / 2;
  const offsetY = (height - gridHeight) / 2;

  const colorScale = d3
    .scaleOrdinal()
    .domain(categories.map((c) => c.name))
    .range(categories.map((c) => c.color));

  // Create color array based on percentages - avoid rounding errors
  let squareColors = [];
  let remainingSquares = totalSquares;

  categories.forEach((category, index) => {
    let squaresPerCategory;
    if (index === categories.length - 1) {
      // Last category gets all remaining squares to avoid rounding errors
      squaresPerCategory = remainingSquares;
    } else {
      squaresPerCategory = Math.round(totalSquares * category.percentage);
      remainingSquares -= squaresPerCategory;
    }
    for (let i = 0; i < squaresPerCategory; i++) {
      squareColors.push(category.name);
    }
  });

  // Draw squares
  svg
    .append("g")
    .selectAll("rect")
    .data(d3.range(totalSquares))
    .enter()
    .append("rect")
    .attr("x", (d, i) => offsetX + (i % cols) * squareSize)
    .attr("y", (d, i) => offsetY + Math.floor(i / cols) * squareSize)
    .attr("width", squareSize)
    .attr("height", squareSize)
    .attr("fill", (d, i) => squareColors[i] ? colorScale(squareColors[i]) : "var(--bg-light)")
    .attr("stroke", "var(--bg-light)")
    .attr("stroke-width", 0.5);
}

// Generate a square path
function squarePath(size) {
  const half = size / 2;
  return `M ${-half},${-half} L ${half},${-half} L ${half},${half} L ${-half},${half} Z`;
}

// Calculate square grid positions
function calculateSquarePositions(totalHexagons) {
  const width = 800;
  const height = 800;
  const squareSize = 10;
  const padding = 50;

  const availableWidth = width - padding * 2;
  const availableHeight = height - padding * 2;

  const cols = Math.ceil(Math.sqrt(totalHexagons * (availableWidth / availableHeight)));
  const rows = Math.ceil(totalHexagons / cols);

  const gridWidth = cols * squareSize;
  const gridHeight = rows * squareSize;
  const offsetX = (width - gridWidth) / 1.5 + squareSize / 2;
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
