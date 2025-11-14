// Shared rendering utilities for OnsLand visualizations

const validCountries = [
  "austria",
  "belgium",
  "bulgaria",
  "croatia",
  "czechia",
  "denmark",
  "estonia",
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

  const countries = topojson.feature(worldData, worldData.objects.countries);
  const countryFeature = countries.features.find((d) => d.id === config.isoCode);

  if (!countryFeature) return;

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
  const hexRadius = 8;
  const padding = 50;
  const totalHexagons = 2500;

  // Hexagon dimensions
  const hexWidth = hexRadius * 2 * Math.sin(Math.PI / 3); // horizontal distance between hex centers
  const hexHeight = hexRadius * 1.5; // vertical distance between hex centers

  // Calculate grid dimensions
  const cols = Math.ceil(Math.sqrt(totalHexagons * (hexWidth / hexHeight)));
  const rows = Math.ceil(totalHexagons / cols);

  const gridWidth = cols * hexWidth;
  const gridHeight = rows * hexHeight + hexRadius * 0.5;
  const offsetX = (width - gridWidth) / 2;
  const offsetY = (height - gridHeight) / 2;

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

  // Create hexagon path generator
  const hexbin = d3.hexbin().radius(hexRadius);

  svg
    .append("g")
    .selectAll("path")
    .data(d3.range(totalHexagons))
    .enter()
    .append("path")
    .attr("d", hexbin.hexagon())
    .attr("transform", (d, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const x = offsetX + col * hexWidth + (row % 2) * (hexWidth / 2);
      const y = offsetY + row * hexHeight;
      return `translate(${x},${y})`;
    })
    .attr("fill", (d, i) => hexColors[i] ? colorScale(hexColors[i]) : "var(--bg-light)")
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
