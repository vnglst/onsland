import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { fastify, supportedCountries } from '../server.js';

const output = fileURLToPath(new URL('../dist/', import.meta.url));
const routes = ['/', '/rankings', '/about', ...[...supportedCountries].sort().map(country => `/country/${country}`)];
try {
  await rm(output, { recursive: true, force: true });
  await cp(new URL('../public/', import.meta.url), output, { recursive: true });
  for (const route of [...routes, '/404']) {
    const response = await fastify.inject(route === '/404' ? '/__missing_export_page__' : route);
    if (response.statusCode !== (route === '/404' ? 404 : 200)) throw new Error(`Cannot export ${route}`);
    const filename = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
    await mkdir(new URL('.', new URL(filename, `file://${output}/`)), { recursive: true });
    await writeFile(`${output}/${filename}`, response.body);
  }
  const origin = 'https://onsland.koenvangilst.nl';
  await writeFile(`${output}/robots.txt`, `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
  await writeFile(`${output}/sitemap.xml`, '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + routes.map(route => `<url><loc>${origin}${route}</loc></url>`).join('') + '</urlset>\n');
  console.log(`Exported ${routes.length} pages, 404 page and public assets to dist/`);
} finally {
  await fastify.close();
}
