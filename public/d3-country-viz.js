// D3 Country Visualization
// Pure D3 rendering functions for country hexagon visualizations

let worldData = null;
let isSquareLayout = false;
let hexDataGlobal = null;
let hexColorsGlobal = null;

/**
 * Initialize world data for D3 rendering
 * @param {Object} data - TopoJSON world data
 */
function initWorldData(data) {
  worldData = data;
}

/**
 * Toggle between map layout and square layout
 */
function toggleD3Layout() {
  isSquareLayout = !isSquareLayout;
  const svg = d3.select("#countrySvg");
  const hexRadius = 6;

  if (isSquareLayout) {
    const hexagonPositions = calculateHexagonGridPositions(hexDataGlobal.length);
    const hexbin = d3.hexbin().radius(hexRadius);

    svg
      .selectAll(".hexagon")
      .transition()
      .duration(1000)
      .ease(d3.easeCubicInOut)
      .attr("transform", (d, i) => {
        const pos = hexagonPositions[i];
        return `translate(${pos.x},${pos.y})`;
      })
      .attr("d", hexbin.hexagon(hexRadius))
      .attr("stroke-width", 0);

    svg
      .selectAll("text[data-label], line[data-label], circle[data-label]")
      .transition()
      .duration(500)
      .attr("opacity", 0);
  } else {
    const hexbin = d3.hexbin().radius(hexRadius);

    svg
      .selectAll(".hexagon")
      .transition()
      .duration(1000)
      .ease(d3.easeCubicInOut)
      .attr("transform", (d, i) => `translate(${hexDataGlobal[i].x},${hexDataGlobal[i].y})`)
      .attr("d", hexbin.hexagon(hexRadius))
      .attr("stroke-width", 0.1);

    svg
      .selectAll("text[data-label], line[data-label], circle[data-label]")
      .transition()
      .delay(500)
      .duration(500)
      .attr("opacity", 1);
  }
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
 * Render country visualization with D3
 * @param {string} countryKey - Country identifier
 * @param {SVGElement} svgElement - SVG element to render into
 * @param {Object} data - TopoJSON world data
 */
function renderCountryWithD3(countryKey, svgElement, data) {
  if (!data) return;

  worldData = data;
  const config = countryConfigs[countryKey];
  if (!config) return;

  const categories = config.categories;
  const labels = config.labels || [];

  const svg = d3.select(svgElement);
  svg.selectAll("*").remove();

  const width = 800;
  const height = 800;
  const hexRadius = 6;

  const projection = d3
    .geoMercator()
    .center(config.center)
    .scale(config.scale)
    .translate([width / 2, height / 2]);

  const hexbin = d3
    .hexbin()
    .radius(hexRadius)
    .extent([[0, 0], [width, height]]);

  const countries = topojson.feature(worldData, worldData.objects.countries);
  const countryFeature = countries.features.find((d) => d.id === config.isoCode);

  if (!countryFeature) {
    console.error(`Country ${countryKey} not found in dataset`);
    return;
  }

  const hexCenters = [];
  for (let y = hexRadius; y < height; y += hexRadius * 1.5) {
    for (let x = hexRadius; x < width; x += hexRadius * Math.sqrt(3)) {
      hexCenters.push([x, y]);
    }
  }

  const hexPoints = hexCenters.filter((center) =>
    d3.geoContains(countryFeature, projection.invert(center))
  );
  const hexData = hexbin(hexPoints);
  hexDataGlobal = hexData;

  const totalHexagons = hexData.length;

  // Distribute colors based on category percentages
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

  hexColorsGlobal = hexColors;

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

  // Render hexagons
  svg
    .append("g")
    .attr("class", "hexagons")
    .selectAll(".hexagon")
    .data(hexData)
    .enter()
    .append("path")
    .attr("class", "hexagon")
    .attr("transform", (d) => `translate(${d.x},${d.y})`)
    .attr("d", hexbin.hexagon(hexRadius))
    .attr("fill", (d, i) => {
      const categoryName = hexColors[i];
      const category = categories.find((c) => c.name === categoryName);
      return category ? category.color : "#ccc";
    })
    .attr("stroke", "#fff")
    .attr("stroke-width", 0.1)
    .on("mouseover", function (event, d) {
      const i = hexData.indexOf(d);
      const category = hexColors[i];
      if (!selectedCategory || selectedCategory === category) {
        highlightHexagons(category);
      }
    })
    .on("mouseout", function () {
      if (!selectedCategory) {
        deselectHexagons();
      }
    })
    .on("click", function (event, d) {
      const i = hexData.indexOf(d);
      const category = hexColors[i];
      if (selectedCategory === category) {
        deselectHexagons();
      } else {
        selectedCategory = category;
        deselectHexagons();
        highlightHexagons(category);
      }
    });

  // Render legend
  const legend = svg
    .append("g")
    .attr("class", "legend")
    .attr("transform", "translate(20, 20)");

  legend
    .selectAll(".legend-item")
    .data(categories)
    .enter()
    .append("g")
    .attr("class", "legend-item")
    .attr("transform", (d, i) => `translate(0, ${i * 25})`)
    .on("mouseover", function (event, d) {
      if (!selectedCategory || selectedCategory === d.name) {
        highlightHexagons(d.name);
      }
    })
    .on("mouseout", function () {
      if (!selectedCategory) {
        deselectHexagons();
      }
    })
    .on("click", function (event, d) {
      if (selectedCategory === d.name) {
        deselectHexagons();
      } else {
        selectedCategory = d.name;
        deselectHexagons();
        highlightHexagons(d.name);
      }
    })
    .each(function (d) {
      const g = d3.select(this);
      g.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", d.color);
      g.append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", "0.35em")
        .style("font-size", "14px")
        .style("cursor", "pointer")
        .text(window.translateCategory ? window.translateCategory(d.name) : d.name);
    });

  // Render labels if provided
  if (labels && labels.length > 0) {
    const labelsGroup = svg.append("g").attr("class", "labels");

    labels.forEach((label) => {
      if (label.labelTarget && label.labelPosition) {
        labelsGroup
          .append("circle")
          .attr("cx", label.labelTarget.x)
          .attr("cy", label.labelTarget.y)
          .attr("r", 3)
          .attr("fill", "#333")
          .attr("data-label", label.label);

        labelsGroup
          .append("line")
          .attr("x1", label.labelTarget.x)
          .attr("y1", label.labelTarget.y)
          .attr("x2", label.labelPosition.x)
          .attr("y2", label.labelPosition.y)
          .attr("stroke", "#333")
          .attr("stroke-width", 1)
          .attr("data-label", label.label);

        labelsGroup
          .append("text")
          .attr("x", label.labelPosition.x)
          .attr("y", label.labelPosition.y)
          .attr("text-anchor", "middle")
          .attr("font-size", "14px")
          .attr("font-weight", "bold")
          .attr("fill", "#333")
          .attr("data-label", label.label)
          .text(window.translateLabel ? window.translateLabel(label.label) : label.label);
      }
    });
  }
}

// Expose functions globally for Preact components
window.renderCountryWithD3 = renderCountryWithD3;
window.toggleD3Layout = toggleD3Layout;
window.initWorldData = initWorldData;
