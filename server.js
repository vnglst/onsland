import express from 'express';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

// Configure Handlebars
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: join(__dirname, 'views/layouts'),
  partialsDir: join(__dirname, 'views/partials')
}));
app.set('view engine', 'hbs');
app.set('views', join(__dirname, 'views'));

// Serve static files
app.use(express.static(join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'OnsLand - Land Use In Europe',
    description: 'Interactive visualization comparing land use across European countries. Explore how different nations utilize their land for agriculture, nature, urban areas, and more.',
    pageSpecificCss: ['/home.css'],
    pageSpecificModules: ['/home.js']  // ES6 module
  });
});

app.get('/country/:country', (req, res) => {
  res.render('country', {
    title: 'Land Use - OnsLand',
    description: 'Interactive visualization of land use showing agriculture, nature, urban areas, and more.',
    pageSpecificCss: ['/country.css'],
    pageSpecificModules: ['/country.js'],  // ES6 module
    inlineScript: `window.__COUNTRY__ = "${req.params.country}";`,
    showViewToggle: true
  });
});

app.get('/rankings', (req, res) => {
  res.render('rankings', {
    title: 'Land Use Rankings - OnsLand',
    description: 'Rankings of European countries by land use categories - which countries have the most water, woodland, urban areas, and more.',
    pageSpecificCss: ['/rankings.css'],
    pageSpecificModules: ['/rankings.js']
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About - OnsLand',
    description: 'Learn about the OnsLand project - an interactive visualization of land use across Europe. Discover the data sources, technology, and how to contribute.',
    pageSpecificCss: ['/about.css'],
    pageSpecificModules: ['/about.js']
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', {
    title: '404 - Page Not Found - OnsLand',
    description: 'Page not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
