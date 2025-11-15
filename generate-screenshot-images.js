const playwright = require('playwright-core');
const sharp = require('sharp');
const path = require('path');

async function generateScreenshotSocialImages() {
  let browser;

  try {
    console.log('Launching browser...');

    // Try to launch chromium using the cached browser
    browser = await playwright.chromium.launch({
      executablePath: '/root/.cache/ms-playwright/chromium-1194/chrome-linux/chrome',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    const context = await browser.newContext({
      viewport: { width: 1200, height: 800 },
      deviceScaleFactor: 2, // Higher resolution for better quality
    });

    const page = await context.newPage();

    console.log('Navigating to localhost:3000...');
    await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Wait a bit for D3 animations to complete
    await page.waitForTimeout(2000);

    console.log('Taking screenshot...');

    // Take full screenshot
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false
    });

    await browser.close();
    console.log('Browser closed.');

    // Process for Open Graph (1200x630)
    console.log('Creating Open Graph image (1200x630)...');
    await createSocialImageWithTitle(screenshot, 1200, 630, 'og-image.png');
    console.log('✓ Generated og-image.png');

    // Process for Twitter (1200x675)
    console.log('Creating Twitter Card image (1200x675)...');
    await createSocialImageWithTitle(screenshot, 1200, 675, 'twitter-image.png');
    console.log('✓ Generated twitter-image.png');

    console.log('\n✨ Screenshot-based social images generated successfully!');
  } catch (error) {
    console.error('Error generating screenshots:', error.message);
    if (browser) {
      await browser.close();
    }
    process.exit(1);
  }
}

async function createSocialImageWithTitle(screenshot, width, height, filename) {
  const headerHeight = 120;

  // Create title overlay SVG
  const titleSvg = `
    <svg width="${width}" height="${headerHeight}">
      <defs>
        <filter id="textShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <feOffset dx="0" dy="2" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.7"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Semi-transparent dark background -->
      <rect width="${width}" height="${headerHeight}" fill="rgba(0, 0, 0, 0.8)"/>

      <!-- Title -->
      <text x="${width / 2}" y="50"
            font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif"
            font-size="52"
            font-weight="bold"
            fill="hsl(141, 41%, 95%)"
            text-anchor="middle"
            filter="url(#textShadow)">OnsLand</text>

      <!-- Subtitle -->
      <text x="${width / 2}" y="90"
            font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif"
            font-size="24"
            fill="hsl(51, 100%, 75%)"
            text-anchor="middle"
            filter="url(#textShadow)">Land Use in Europe</text>
    </svg>
  `;

  const titleBuffer = Buffer.from(titleSvg);

  // Resize screenshot to fit below title
  const screenshotHeight = height - headerHeight;
  const resizedScreenshot = await sharp(screenshot)
    .resize(width, screenshotHeight, {
      fit: 'cover',
      position: 'top'
    })
    .toBuffer();

  // Composite title on top of screenshot
  await sharp({
    create: {
      width: width,
      height: height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 1 }
    }
  })
    .composite([
      {
        input: resizedScreenshot,
        top: headerHeight,
        left: 0
      },
      {
        input: titleBuffer,
        top: 0,
        left: 0
      }
    ])
    .png()
    .toFile(path.join(__dirname, 'public', filename));
}

// Check if this script is being run directly
if (require.main === module) {
  console.log('Make sure the dev server is running on http://localhost:3000');
  console.log('You can start it with: npm start\n');

  generateScreenshotSocialImages();
}

module.exports = { generateScreenshotSocialImages };
