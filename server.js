import Fastify from 'fastify';
import fastifyView from '@fastify/view';
import fastifyStatic from '@fastify/static';
import fastifyCompress from '@fastify/compress';
import handlebars from 'handlebars';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fastify = Fastify({
  logger: true
});

const PORT = process.env.PORT || 8000;

// Security: Add CSP headers
fastify.addHook('onSend', async (request, reply) => {
  reply.header('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://plausible.io",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self' https://plausible.io",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; '));

  reply.header('X-Content-Type-Options', 'nosniff');
  reply.header('X-Frame-Options', 'DENY');
  reply.header('X-XSS-Protection', '1; mode=block');
  reply.header('Referrer-Policy', 'strict-origin-when-cross-origin');
});

// Register compression (gzip/brotli)
await fastify.register(fastifyCompress, {
  global: true,
  threshold: 1024 // Only compress responses larger than 1KB
});

// Register static file serving
await fastify.register(fastifyStatic, {
  root: join(__dirname, 'public'),
  prefix: '/',
  maxAge: '1d' // Cache static files for 1 day
});

// Register view engine
await fastify.register(fastifyView, {
  engine: {
    handlebars: handlebars
  },
  root: join(__dirname, 'views'),
  layout: 'layouts/main.hbs',
  viewExt: 'hbs',
  options: {
    partials: {
      menu: 'partials/menu.hbs',
      footer: 'partials/footer.hbs'
    }
  }
});

// Routes
fastify.get('/', async (request, reply) => {
  return reply.view('index', {
    title: 'OnsLand - Land Use In Europe',
    description: 'Interactive visualization comparing land use across European countries. Explore how different nations utilize their land for agriculture, nature, urban areas, and more.',
    pageSpecificCss: ['/home.css'],
    pageSpecificScripts: ['/home.js']
  });
});

// Valid country list for validation
const validCountries = [
  'austria', 'belgium', 'bulgaria', 'croatia', 'czechia', 'denmark',
  'estonia', 'finland', 'france', 'germany', 'greece', 'hungary',
  'ireland', 'italy', 'latvia', 'lithuania', 'luxembourg', 'netherlands',
  'poland', 'portugal', 'romania', 'slovakia', 'slovenia', 'spain',
  'sweden', 'uk'
];

fastify.get('/country/:country', async (request, reply) => {
  const { country } = request.params;

  // Validate country parameter
  if (!validCountries.includes(country)) {
    return reply.status(404).view('404', {
      title: '404 - Country Not Found - OnsLand',
      description: 'Country not found'
    });
  }

  return reply.view('country', {
    title: 'Land Use - OnsLand',
    description: 'Interactive visualization of land use showing agriculture, nature, urban areas, and more.',
    pageSpecificCss: ['/country.css'],
    pageSpecificScripts: [
      '/shared/translation-utils.js',
      '/country.js'
    ],
    inlineScript: `window.__COUNTRY__ = "${country}";`,
    showViewToggle: true
  });
});

fastify.get('/rankings', async (request, reply) => {
  return reply.view('rankings', {
    title: 'Land Use Rankings - OnsLand',
    description: 'Rankings of European countries by land use categories - which countries have the most water, woodland, urban areas, and more.',
    pageSpecificCss: ['/rankings.css'],
    pageSpecificScripts: [
      '/shared/translation-utils.js',
      '/rankings.js'
    ]
  });
});

fastify.get('/about', async (request, reply) => {
  return reply.view('about', {
    title: 'About - OnsLand',
    description: 'Learn about the OnsLand project - an interactive visualization of land use across Europe. Discover the data sources, technology, and how to contribute.',
    pageSpecificCss: ['/about.css'],
    pageSpecificScripts: ['/about.js']
  });
});

// 404 handler
fastify.setNotFoundHandler(async (request, reply) => {
  return reply.status(404).view('404', {
    title: '404 - Page Not Found - OnsLand',
    description: 'Page not found'
  });
});

// Start server
try {
  await fastify.listen({ port: PORT, host: '0.0.0.0' });
  console.log(`Server running at http://localhost:${PORT}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
