// AI Researchers World Map Visualization
(function () {
  'use strict';

  let svg, g, projection, path;
  let currentLayer = 'born';
  let selectedResearcher = null;
  const hexRadius = 8;

  // Colors for hexagons - Red and Blue palette
  const hexagonColor = '#2563eb'; // Blue
  const hexagonHoverColor = '#3b82f6'; // Lighter blue
  const hexagonSelectedColor = '#dc2626'; // Red

  function init() {
    setupSVG();
    loadWorldMap();
    setupEventListeners();
  }

  function setupSVG() {
    const container = document.querySelector('.visualization-container');
    const width = container.clientWidth;
    const height = Math.max(600, window.innerHeight - 200);

    svg = d3.select('#worldMap')
      .attr('width', width)
      .attr('height', height);

    g = svg.append('g');

    // Setup projection for world map
    projection = d3.geoMercator()
      .scale(width / (2 * Math.PI))
      .translate([width / 2, height / 1.5]);

    path = d3.geoPath().projection(projection);

    // Add zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);
  }

  function loadWorldMap() {
    d3.json('/vendor/countries-50m.json').then(data => {
      const countries = topojson.feature(data, data.objects.countries);

      // Draw countries
      g.append('g')
        .attr('class', 'countries')
        .selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', '#e5e7eb')
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 0.5);

      // Add hexagons after map is loaded
      renderHexagons();
    });
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
      loadWorldMap();
    }, 250));
  }

  function getLayerLocations() {
    const locations = [];

    window.AI_RESEARCHERS.forEach(researcher => {
      if (currentLayer === 'born') {
        locations.push({
          researcher,
          coordinates: researcher.born.coordinates,
          label: researcher.born.location
        });
      } else if (currentLayer === 'university') {
        researcher.universities.forEach(uni => {
          locations.push({
            researcher,
            coordinates: uni.coordinates,
            label: uni.name
          });
        });
      } else if (currentLayer === 'work') {
        locations.push({
          researcher,
          coordinates: researcher.work.coordinates,
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

    // Group locations by coordinates to handle overlapping
    const groupedLocations = d3.group(locations, d => d.coordinates.toString());

    const hexagonGroup = g.append('g').attr('class', 'hexagon-group');

    // Create hexagons for each unique location
    groupedLocations.forEach((researchers, coordKey) => {
      const coords = researchers[0].coordinates;
      const [x, y] = projection(coords);

      // If multiple researchers at same location, create a cluster
      const count = researchers.length;

      if (count === 1) {
        createHexagon(hexagonGroup, researchers[0], x, y, 0);
      } else {
        // Create a small cluster for multiple researchers
        const angleStep = (2 * Math.PI) / count;
        const clusterRadius = 15;

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
    const hexagonPath = d3.symbol()
      .type(d3.symbolHexagon)
      .size(hexRadius * hexRadius * 2);

    const hex = container.append('path')
      .attr('d', hexagonPath)
      .attr('transform', `translate(${x},${y})`)
      .attr('fill', selectedResearcher?.id === location.researcher.id ? hexagonSelectedColor : hexagonColor)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 1.5)
      .attr('opacity', 0)
      .attr('class', 'researcher-hex')
      .attr('data-researcher-id', location.researcher.id)
      .style('cursor', 'pointer')
      .on('mouseenter', function() {
        if (selectedResearcher?.id !== location.researcher.id) {
          d3.select(this).attr('fill', hexagonHoverColor);
        }
        showTooltip(location, x, y);
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
      .attr('opacity', 0.85);
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

  function showTooltip(location, x, y) {
    // Simple tooltip implementation
    const tooltip = d3.select('body').selectAll('.hex-tooltip').data([null]);

    const tooltipEnter = tooltip.enter()
      .append('div')
      .attr('class', 'hex-tooltip')
      .style('position', 'absolute')
      .style('background', 'rgba(0, 0, 0, 0.85)')
      .style('color', 'white')
      .style('padding', '8px 12px')
      .style('border-radius', '4px')
      .style('font-size', '14px')
      .style('pointer-events', 'none')
      .style('z-index', '1000')
      .style('opacity', 0);

    const tooltipMerge = tooltipEnter.merge(tooltip);

    tooltipMerge
      .html(`<strong>${location.researcher.name}</strong><br/>${location.label}`)
      .style('left', (event.pageX + 10) + 'px')
      .style('top', (event.pageY - 10) + 'px')
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
