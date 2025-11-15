const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Function to create hexagon path
function hexagonPath(cx, cy, size) {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    const x = cx + size * Math.cos(angle);
    const y = cy + size * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  return `M ${points.join(' L ')} Z`;
}

// Generate hexagon grid for website visualization
function generateHexagonGrid(width, height, startY) {
  const hexSize = 35;
  const hexWidth = hexSize * Math.sqrt(3);
  const hexHeight = hexSize * 2;
  const vertSpacing = hexHeight * 0.75;

  const colors = [
    'hsl(51, 100%, 75%)',   // Agriculture - yellow
    'hsl(51, 100%, 65%)',
    'hsl(51, 100%, 55%)',
    'hsl(159, 27%, 53%)',   // Nature - green
    'hsl(159, 27%, 43%)',
    'hsl(159, 27%, 33%)',
    'hsl(210, 58%, 71%)',   // Water - blue
    'hsl(210, 58%, 61%)',
    'hsl(345, 43%, 73%)',   // Urban - pink
    'hsl(345, 43%, 63%)',
    'hsl(0, 0%, 69%)',      // Other - gray
  ];

  let hexagons = '';
  let colorIndex = 0;

  // Calculate how many hexagons we need
  const cols = Math.ceil(width / hexWidth) + 2;
  const rows = Math.ceil((height - startY) / vertSpacing) + 2;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * hexWidth + (row % 2) * (hexWidth / 2);
      const y = startY + row * vertSpacing + 50;

      // Skip if outside visible area
      if (x < -hexSize || x > width + hexSize || y < startY - hexSize || y > height + hexSize) {
        continue;
      }

      const color = colors[colorIndex % colors.length];
      colorIndex++;

      hexagons += `
        <path d="${hexagonPath(x, y, hexSize)}"
              fill="${color}"
              opacity="0.85"
              stroke="#000"
              stroke-width="1"/>
      `;
    }
  }

  return hexagons;
}

// Create social media image with website design
function createSocialImage(width, height, filename) {
  const headerHeight = 180;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#000;stop-opacity:1" />
          <stop offset="100%" style="stop-color:hsl(51, 100%, 5%);stop-opacity:1" />
        </linearGradient>

        <!-- Shadow filter for title -->
        <filter id="textShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <feOffset dx="0" dy="2" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>

      <!-- Hexagon grid visualization (simulating the website) -->
      ${generateHexagonGrid(width, height, headerHeight)}

      <!-- Semi-transparent overlay for header area -->
      <rect x="0" y="0" width="${width}" height="${headerHeight}"
            fill="rgba(0, 0, 0, 0.75)"/>

      <!-- Title -->
      <text x="${width / 2}" y="${headerHeight / 2 - 20}"
            font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif"
            font-size="${width > 800 ? 72 : 56}"
            font-weight="bold"
            fill="hsl(141, 41%, 95%)"
            text-anchor="middle"
            filter="url(#textShadow)">OnsLand</text>

      <!-- Subtitle -->
      <text x="${width / 2}" y="${headerHeight / 2 + 40}"
            font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif"
            font-size="${width > 800 ? 32 : 26}"
            fill="hsl(51, 100%, 75%)"
            text-anchor="middle"
            filter="url(#textShadow)">Land Use in Europe</text>

      <!-- Bottom gradient overlay (subtle) -->
      <rect x="0" y="${height - 100}" width="${width}" height="100"
            fill="url(#bgGradient)" opacity="0.3"/>
    </svg>
  `;

  return sharp(Buffer.from(svg))
    .resize(width, height)
    .png()
    .toFile(path.join(__dirname, 'public', filename));
}

async function generateImages() {
  try {
    console.log('Generating social media images with website design...\n');

    // Generate Open Graph image (1200x630)
    await createSocialImage(1200, 630, 'og-image.png');
    console.log('✓ Generated og-image.png (1200x630)');

    // Generate Twitter Card image (1200x675)
    await createSocialImage(1200, 675, 'twitter-image.png');
    console.log('✓ Generated twitter-image.png (1200x675)');

    console.log('\n✨ Social media images generated successfully!');
  } catch (error) {
    console.error('Error generating images:', error);
    process.exit(1);
  }
}

generateImages();
