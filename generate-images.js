const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create SVG for social media images
const createSocialImage = (width, height, filename) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#000;stop-opacity:1" />
          <stop offset="100%" style="stop-color:hsl(51, 100%, 5%);stop-opacity:1" />
        </linearGradient>
        <linearGradient id="hexGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:hsl(51, 100%, 65%);stop-opacity:1" />
          <stop offset="100%" style="stop-color:hsl(51, 100%, 55%);stop-opacity:1" />
        </linearGradient>
        <linearGradient id="hexGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:hsl(159, 27%, 53%);stop-opacity:1" />
          <stop offset="100%" style="stop-color:hsl(159, 27%, 43%);stop-opacity:1" />
        </linearGradient>
        <linearGradient id="hexGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:hsl(210, 58%, 71%);stop-opacity:1" />
          <stop offset="100%" style="stop-color:hsl(210, 58%, 61%);stop-opacity:1" />
        </linearGradient>
        <linearGradient id="hexGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:hsl(345, 43%, 73%);stop-opacity:1" />
          <stop offset="100%" style="stop-color:hsl(345, 43%, 63%);stop-opacity:1" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>

      <!-- Decorative hexagons - creating a pattern -->
      <!-- Top left cluster -->
      <path d="M 150 120 L 210 155 L 210 225 L 150 260 L 90 225 L 90 155 Z"
            fill="url(#hexGradient1)" opacity="0.8"/>
      <path d="M 270 120 L 330 155 L 330 225 L 270 260 L 210 225 L 210 155 Z"
            fill="url(#hexGradient2)" opacity="0.8"/>
      <path d="M 150 260 L 210 295 L 210 365 L 150 400 L 90 365 L 90 295 Z"
            fill="url(#hexGradient3)" opacity="0.8"/>
      <path d="M 270 260 L 330 295 L 330 365 L 270 400 L 210 365 L 210 295 Z"
            fill="url(#hexGradient4)" opacity="0.8"/>

      <!-- Large central hexagon -->
      <path d="M ${width/2} ${height/2 - 140} L ${width/2 + 100} ${height/2 - 70} L ${width/2 + 100} ${height/2 + 70} L ${width/2} ${height/2 + 140} L ${width/2 - 100} ${height/2 + 70} L ${width/2 - 100} ${height/2 - 70} Z"
            fill="none"
            stroke="hsl(51, 100%, 65%)"
            stroke-width="4"
            opacity="0.4"/>

      <!-- Bottom right cluster -->
      <path d="M ${width - 270} ${height - 260} L ${width - 210} ${height - 225} L ${width - 210} ${height - 155} L ${width - 270} ${height - 120} L ${width - 330} ${height - 155} L ${width - 330} ${height - 225} Z"
            fill="url(#hexGradient2)" opacity="0.8"/>
      <path d="M ${width - 150} ${height - 260} L ${width - 90} ${height - 225} L ${width - 90} ${height - 155} L ${width - 150} ${height - 120} L ${width - 210} ${height - 155} L ${width - 210} ${height - 225} Z"
            fill="url(#hexGradient3)" opacity="0.8"/>
      <path d="M ${width - 270} ${height - 400} L ${width - 210} ${height - 365} L ${width - 210} ${height - 295} L ${width - 270} ${height - 260} L ${width - 330} ${height - 295} L ${width - 330} ${height - 365} Z"
            fill="url(#hexGradient4)" opacity="0.8"/>
      <path d="M ${width - 150} ${height - 400} L ${width - 90} ${height - 365} L ${width - 90} ${height - 295} L ${width - 150} ${height - 260} L ${width - 210} ${height - 295} L ${width - 210} ${height - 365} Z"
            fill="url(#hexGradient1)" opacity="0.8"/>

      <!-- Title -->
      <text x="${width/2}" y="${height/2 - 30}"
            font-family="Arial, sans-serif"
            font-size="120"
            font-weight="bold"
            fill="hsl(141, 41%, 95%)"
            text-anchor="middle">OnsLand</text>

      <!-- Subtitle -->
      <text x="${width/2}" y="${height/2 + 40}"
            font-family="Arial, sans-serif"
            font-size="48"
            fill="hsl(51, 100%, 75%)"
            text-anchor="middle">European Land Use Visualization</text>

      <!-- Small hexagon decorations around title -->
      <path d="M ${width/2 - 280} ${height/2 - 20} L ${width/2 - 260} ${height/2 - 35} L ${width/2 - 240} ${height/2 - 20} L ${width/2 - 240} ${height/2 + 10} L ${width/2 - 260} ${height/2 + 25} L ${width/2 - 280} ${height/2 + 10} Z"
            fill="url(#hexGradient1)" opacity="0.9"/>
      <path d="M ${width/2 + 240} ${height/2 - 20} L ${width/2 + 260} ${height/2 - 35} L ${width/2 + 280} ${height/2 - 20} L ${width/2 + 280} ${height/2 + 10} L ${width/2 + 260} ${height/2 + 25} L ${width/2 + 240} ${height/2 + 10} Z"
            fill="url(#hexGradient3)" opacity="0.9"/>
    </svg>
  `;

  return sharp(Buffer.from(svg))
    .resize(width, height)
    .png()
    .toFile(path.join(__dirname, 'public', filename));
};

async function generateImages() {
  try {
    console.log('Generating favicon sizes from SVG...');

    // Read the favicon SVG
    const svgFavicon = fs.readFileSync(path.join(__dirname, 'public', 'favicon.svg'));

    // Generate different favicon sizes
    await sharp(svgFavicon)
      .resize(32, 32)
      .png()
      .toFile(path.join(__dirname, 'public', 'favicon-32x32.png'));
    console.log('✓ Generated favicon-32x32.png');

    await sharp(svgFavicon)
      .resize(16, 16)
      .png()
      .toFile(path.join(__dirname, 'public', 'favicon-16x16.png'));
    console.log('✓ Generated favicon-16x16.png');

    // Apple touch icon
    await sharp(svgFavicon)
      .resize(180, 180)
      .png()
      .toFile(path.join(__dirname, 'public', 'apple-touch-icon.png'));
    console.log('✓ Generated apple-touch-icon.png');

    // Android Chrome icons
    await sharp(svgFavicon)
      .resize(192, 192)
      .png()
      .toFile(path.join(__dirname, 'public', 'android-chrome-192x192.png'));
    console.log('✓ Generated android-chrome-192x192.png');

    await sharp(svgFavicon)
      .resize(512, 512)
      .png()
      .toFile(path.join(__dirname, 'public', 'android-chrome-512x512.png'));
    console.log('✓ Generated android-chrome-512x512.png');

    // Generate social media images
    console.log('\nGenerating social media images...');

    await createSocialImage(1200, 630, 'og-image.png');
    console.log('✓ Generated og-image.png (Open Graph)');

    await createSocialImage(1200, 675, 'twitter-image.png');
    console.log('✓ Generated twitter-image.png (Twitter Card)');

    console.log('\n✨ All images generated successfully!');
  } catch (error) {
    console.error('Error generating images:', error);
    process.exit(1);
  }
}

generateImages();
