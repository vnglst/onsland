// Shared rendering utilities for OnsLand visualizations

const validCountries = [
  "austria",
  "belgium",
  "bulgaria",
  "croatia",
  "czechia",
  "denmark",
  "estonia",
  "europa",
  "finland",
  "france",
  "germany",
  "greece",
  "hungary",
  "ireland",
  "italy",
  "latvia",
  "lithuania",
  "luxembourg",
  "netherlands",
  "poland",
  "portugal",
  "romania",
  "slovakia",
  "slovenia",
  "spain",
  "sweden",
  "uk",
];

const countryNames = {
  austria: "Austria",
  belgium: "Belgium",
  bulgaria: "Bulgaria",
  croatia: "Croatia",
  czechia: "Czechia",
  denmark: "Denmark",
  estonia: "Estonia",
  europa: "European Union",
  finland: "Finland",
  france: "France",
  germany: "Germany",
  greece: "Greece",
  hungary: "Hungary",
  ireland: "Ireland",
  italy: "Italy",
  latvia: "Latvia",
  lithuania: "Lithuania",
  luxembourg: "Luxembourg",
  netherlands: "The Netherlands",
  poland: "Poland",
  portugal: "Portugal",
  romania: "Romania",
  slovakia: "Slovakia",
  slovenia: "Slovenia",
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
  const hexRadius = 12;

  const projection = d3
    .geoMercator()
    .center(config.center)
    .scale(config.scale)
    .translate([width / 2, height / 2]);

  const hexbin = d3
    .hexbin()
    .radius(hexRadius)
    .extent([
      [0, 0],
      [width, height],
    ]);

  let hexData;
  let countryFeature = null;

  // Special handling for Europa (EU aggregate) - merge all EU27 countries
  if (countryKey === "europa") {
    // EU27 (2020) country ISO codes
    const eu27Codes = ['040', '056', '100', '191', '196', '203', '208', '233', '246', '250', '276', '300', '348', '372', '380', '428', '440', '442', '470', '528', '616', '620', '642', '703', '705', '724', '752'];

    // Get all EU country geometries and merge them
    const euGeometries = worldData.objects.countries.geometries.filter(g => eu27Codes.includes(String(g.id)));
    const mergedEU = topojson.merge(worldData, euGeometries);

    // Create a feature from the merged geometry
    countryFeature = {
      type: "Feature",
      geometry: mergedEU,
      id: "EU",
      properties: { name: "European Union" }
    };

    const hexCenters = [];
    for (let y = hexRadius; y < height; y += hexRadius * 1.5) {
      for (let x = hexRadius; x < width; x += hexRadius * Math.sqrt(3)) {
        hexCenters.push([x, y]);
      }
    }

    const hexPoints = hexCenters.filter((center) => d3.geoContains(countryFeature, projection.invert(center)));
    hexData = hexbin(hexPoints);
  } else {
    const countries = topojson.feature(worldData, worldData.objects.countries);
    countryFeature = countries.features.find((d) => d.id === config.isoCode);

    if (!countryFeature) return;

    const hexCenters = [];
    for (let y = hexRadius; y < height; y += hexRadius * 1.5) {
      for (let x = hexRadius; x < width; x += hexRadius * Math.sqrt(3)) {
        hexCenters.push([x, y]);
      }
    }

    const hexPoints = hexCenters.filter((center) => d3.geoContains(countryFeature, projection.invert(center)));
    hexData = hexbin(hexPoints);
  }

  const totalHexagons = hexData.length;

  const colorScale = d3
    .scaleOrdinal()
    .domain(categories.map((c) => c.name))
    .range(categories.map((c) => c.color));

  let hexColors = [];
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
  const totalSquares = 2500;
  const cols = Math.ceil(Math.sqrt(totalSquares));
  const rows = Math.ceil(totalSquares / cols);

  const gridWidth = cols * squareSize;
  const gridHeight = rows * squareSize;
  const offsetX = (width - gridWidth) / 2;
  const offsetY = (height - gridHeight) / 2;

  const colorScale = d3
    .scaleOrdinal()
    .domain(categories.map((c) => c.name))
    .range(categories.map((c) => c.color));

  let squareColors = [];
  let remainingSquares = totalSquares;

  categories.forEach((category, index) => {
    let squaresPerCategory;
    if (index === categories.length - 1) {
      squaresPerCategory = remainingSquares;
    } else {
      squaresPerCategory = Math.round(totalSquares * category.percentage);
      remainingSquares -= squaresPerCategory;
    }
    for (let i = 0; i < squaresPerCategory; i++) {
      squareColors.push(category.name);
    }
  });

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

function squarePath(size) {
  const half = size / 2;
  return `M ${-half},${-half} L ${half},${-half} L ${half},${half} L ${-half},${half} Z`;
}

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
