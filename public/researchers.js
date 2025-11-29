// AI Researchers World Map Visualization
(function () {
  'use strict';

  let svg, g;
  let currentLayer = 'born';
  let selectedResearcher = null;
  const hexRadius = 20;
  const hexWidth = hexRadius * 2;
  const hexHeight = Math.sqrt(3) * hexRadius;

  // Colors for hexagons - Red and Blue palette
  const hexagonColor = '#2563eb'; // Blue
  const hexagonHoverColor = '#3b82f6'; // Lighter blue
  const hexagonSelectedColor = '#dc2626'; // Red
  const mapHexColor = '#e5e7eb'; // Background map hexagons
  const mapHexStroke = '#ffffff';

  // Hexagonal world map grid (simplified representation)
  // Each entry: [col, row, country/region name]
  const worldHexGrid = createWorldHexGrid();

  function init() {
    setupSVG();
    renderHexagonalMap();
    setupEventListeners();
  }

  function setupSVG() {
    const container = document.querySelector('.visualization-container');
    const width = container.clientWidth;
    const height = Math.max(600, window.innerHeight - 200);

    svg = d3.select('#worldMap')
      .attr('width', width)
      .attr('height', height);

    g = svg.append('g')
      .attr('transform', `translate(${width / 2 - 400}, ${height / 2 - 250})`);

    // Add zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.5, 4])
      .on('zoom', (event) => {
        g.attr('transform', `translate(${width / 2 - 400 + event.transform.x}, ${height / 2 - 250 + event.transform.y}) scale(${event.transform.k})`);
      });

    svg.call(zoom);
  }

  function createWorldHexGrid() {
    // Simplified hexagonal world map grid
    // Format: {col, row, region, country}
    const grid = [];

    // North America
    for (let r = 2; r < 8; r++) {
      for (let c = 2; c < 10; c++) {
        if ((r < 4 && c > 3 && c < 9) || (r >= 4 && r < 6 && c > 2 && c < 8) || (r >= 6 && c > 4 && c < 7)) {
          grid.push({col: c, row: r, region: 'North America', country: c < 5 ? 'CAN' : 'USA'});
        }
      }
    }

    // Europe
    for (let r = 3; r < 7; r++) {
      for (let c = 15; c < 22; c++) {
        if ((r < 5 && c > 16 && c < 21) || (r >= 5 && c > 15 && c < 20)) {
          const countries = ['GBR', 'FRA', 'DEU', 'ESP'];
          grid.push({col: c, row: r, region: 'Europe', country: countries[Math.floor(Math.random() * countries.length)]});
        }
      }
    }

    // Asia
    for (let r = 3; r < 9; r++) {
      for (let c = 23; c < 36; c++) {
        if ((r < 5 && c > 25 && c < 34) || (r >= 5 && r < 7 && c > 24 && c < 35) || (r >= 7 && c > 26 && c < 32)) {
          const countries = ['RUS', 'CHN', 'IND', 'JPN'];
          grid.push({col: c, row: r, region: 'Asia', country: countries[(c + r) % countries.length]});
        }
      }
    }

    // South America
    for (let r = 8; r < 13; r++) {
      for (let c = 6; c < 11; c++) {
        if ((r < 10 && c > 6 && c < 10) || (r >= 10 && c > 7 && c < 9)) {
          grid.push({col: c, row: r, region: 'South America', country: 'BRA'});
        }
      }
    }

    // Africa
    for (let r = 7; r < 13; r++) {
      for (let c = 16; c < 23; c++) {
        if ((r < 10 && c > 17 && c < 22) || (r >= 10 && c > 18 && c < 21)) {
          grid.push({col: c, row: r, region: 'Africa', country: 'ZAF'});
        }
      }
    }

    // Australia/Oceania
    for (let r = 10; r < 13; r++) {
      for (let c = 30; c < 35; c++) {
        if (c > 31 && c < 34) {
          grid.push({col: c, row: r, region: 'Oceania', country: 'AUS'});
        }
      }
    }

    return grid;
  }

  function renderHexagonalMap() {
    // Draw base hexagonal map
    g.selectAll('.map-hex')
      .data(worldHexGrid)
      .enter()
      .append('path')
      .attr('class', 'map-hex')
      .attr('d', d3.symbol().type(d3.symbolHexagon).size(hexRadius * hexRadius * 2.5))
      .attr('transform', d => {
        const x = d.col * hexWidth * 0.75;
        const y = d.row * hexHeight + (d.col % 2 ? hexHeight / 2 : 0);
        return `translate(${x}, ${y})`;
      })
      .attr('fill', mapHexColor)
      .attr('stroke', mapHexStroke)
      .attr('stroke-width', 1.5)
      .attr('opacity', 0.6);

    // Add hexagons after map is loaded
    renderHexagons();
  }

  function setupEventListeners() {
    // Layer switching
    document.querySelectorAll('.layer-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.layer-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentLayer = e.target.dataset.layer;
        renderHexagons();
      });
    });

    // Close info panel
    document.getElementById('closeInfo').addEventListener('click', () => {
      document.getElementById('researcherInfo').style.display = 'none';
      selectedResearcher = null;
      renderHexagons();
    });

    // Resize handling
    window.addEventListener('resize', debounce(() => {
      setupSVG();
      renderHexagonalMap();
    }, 250));
  }

  // Map country codes to hexagon positions on the grid
  function getHexPositionForCountry(countryCode) {
    const countryToRegion = {
      'GBR': {col: 17, row: 4},
      'FRA': {col: 18, row: 5},
      'DEU': {col: 19, row: 4},
      'ESP': {col: 17, row: 6},
      'USA': {col: 6, row: 5},
      'CAN': {col: 4, row: 3},
      'CHN': {col: 29, row: 6},
      'HKG': {col: 30, row: 7},
      'RUS': {col: 27, row: 4},
      'SVK': {col: 20, row: 5},
      'BEL': {col: 18, row: 4},
      'ISR': {col: 22, row: 7},
      'UKR': {col: 21, row: 5},
      'AUS': {col: 32, row: 11},
      'IND': {col: 28, row: 7},
      'CHE': {col: 19, row: 5},
      'JPN': {col: 33, row: 6},
      'BRA': {col: 8, row: 10}
    };
    return countryToRegion[countryCode] || {col: 20, row: 7};
  }

  function getLayerLocations() {
    const locations = [];

    window.AI_RESEARCHERS.forEach(researcher => {
      if (currentLayer === 'born') {
        const hexPos = getHexPositionForCountry(researcher.born.country);
        locations.push({
          researcher,
          hexPosition: hexPos,
          label: researcher.born.location
        });
      } else if (currentLayer === 'university') {
        researcher.universities.forEach(uni => {
          const hexPos = getHexPositionForCountry(uni.country);
          locations.push({
            researcher,
            hexPosition: hexPos,
            label: uni.name
          });
        });
      } else if (currentLayer === 'work') {
        const hexPos = getHexPositionForCountry(researcher.work.country);
        locations.push({
          researcher,
          hexPosition: hexPos,
          label: researcher.work.institution
        });
      }
    });

    return locations;
  }

  function renderHexagons() {
    // Remove existing hexagons
    g.selectAll('.hexagon-group').remove();

    const locations = getLayerLocations();

    // Group locations by hex position to handle overlapping
    const groupedLocations = d3.group(locations, d => `${d.hexPosition.col},${d.hexPosition.row}`);

    const hexagonGroup = g.append('g').attr('class', 'hexagon-group');

    // Create hexagons for each unique location
    groupedLocations.forEach((researchers, coordKey) => {
      const hexPos = researchers[0].hexPosition;
      const x = hexPos.col * hexWidth * 0.75;
      const y = hexPos.row * hexHeight + (hexPos.col % 2 ? hexHeight / 2 : 0);

      // If multiple researchers at same location, create a cluster
      const count = researchers.length;

      if (count === 1) {
        createHexagon(hexagonGroup, researchers[0], x, y, 0);
      } else {
        // Create a small cluster for multiple researchers
        const angleStep = (2 * Math.PI) / count;
        const clusterRadius = hexRadius * 0.6;

        researchers.forEach((loc, i) => {
          const angle = i * angleStep;
          const offsetX = Math.cos(angle) * clusterRadius;
          const offsetY = Math.sin(angle) * clusterRadius;
          createHexagon(hexagonGroup, loc, x + offsetX, y + offsetY, i);
        });
      }
    });

    // Update legend
    updateLegend(locations);
  }

  function createHexagon(container, location, x, y, index) {
    const smallHexSize = hexRadius * hexRadius * 1.2;
    const hexagonPath = d3.symbol()
      .type(d3.symbolHexagon)
      .size(smallHexSize);

    const hex = container.append('path')
      .attr('d', hexagonPath)
      .attr('transform', `translate(${x},${y})`)
      .attr('fill', selectedResearcher?.id === location.researcher.id ? hexagonSelectedColor : hexagonColor)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
      .attr('opacity', 0)
      .attr('class', 'researcher-hex')
      .attr('data-researcher-id', location.researcher.id)
      .style('cursor', 'pointer')
      .on('mouseenter', function(event) {
        if (selectedResearcher?.id !== location.researcher.id) {
          d3.select(this).attr('fill', hexagonHoverColor);
        }
        showTooltip(location, event.pageX, event.pageY);
      })
      .on('mouseleave', function() {
        if (selectedResearcher?.id !== location.researcher.id) {
          d3.select(this).attr('fill', hexagonColor);
        }
        hideTooltip();
      })
      .on('click', function(event) {
        event.stopPropagation();
        selectResearcher(location.researcher);
      });

    // Animate entrance
    hex.transition()
      .delay(index * 30)
      .duration(500)
      .attr('opacity', 1);
  }

  function selectResearcher(researcher) {
    selectedResearcher = researcher;
    renderHexagons();
    showResearcherInfo(researcher);
  }

  function showResearcherInfo(researcher) {
    const panel = document.getElementById('researcherInfo');

    document.getElementById('researcherName').textContent = researcher.name;
    document.getElementById('bornLocation').textContent = researcher.born.location;

    const uniList = document.getElementById('universityList');
    uniList.innerHTML = '';
    researcher.universities.forEach(uni => {
      const li = document.createElement('li');
      li.textContent = uni.name;
      uniList.appendChild(li);
    });

    document.getElementById('workLocation').textContent = researcher.work.location;
    document.getElementById('workInstitution').textContent = researcher.work.institution;
    document.getElementById('contribution').textContent = researcher.contribution;

    panel.style.display = 'block';
  }

  function showTooltip(location, pageX, pageY) {
    // Simple tooltip implementation
    const tooltip = d3.select('body').selectAll('.hex-tooltip').data([null]);

    const tooltipEnter = tooltip.enter()
      .append('div')
      .attr('class', 'hex-tooltip')
      .style('position', 'absolute')
      .style('background', 'rgba(30, 64, 175, 0.95)')
      .style('color', 'white')
      .style('padding', '8px 12px')
      .style('border-radius', '4px')
      .style('font-size', '14px')
      .style('pointer-events', 'none')
      .style('z-index', '1000')
      .style('opacity', 0)
      .style('border', '1px solid rgba(220, 38, 38, 0.3)');

    const tooltipMerge = tooltipEnter.merge(tooltip);

    tooltipMerge
      .html(`<strong>${location.researcher.name}</strong><br/>${location.label}`)
      .style('left', (pageX + 10) + 'px')
      .style('top', (pageY - 10) + 'px')
      .transition()
      .duration(200)
      .style('opacity', 1);
  }

  function hideTooltip() {
    d3.select('.hex-tooltip')
      .transition()
      .duration(200)
      .style('opacity', 0)
      .remove();
  }

  function updateLegend(locations) {
    const legend = document.getElementById('legendContent');
    const uniqueResearchers = new Set(locations.map(l => l.researcher.id));

    legend.innerHTML = `
      <p style="font-size: 14px; color: #666;">
        Showing ${uniqueResearchers.size} researchers across ${locations.length} locations
      </p>
    `;
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
