# Ons Land - European Land Use Visualization

A hexagonal visualization showing land use patterns across European countries. Each hexagon represents a percentage of the country's total land area, with colors indicating different types of land use (water, woodland, agriculture, urban areas, etc.).

Originally created to visualize land use in the Netherlands, the project has expanded to include Denmark, Sweden, and Germany, with an interactive country selector.

🔗 Live visualization: https://onsland.koenvangilst.nl

## Features

- **Interactive country selector** - Switch between 14 European countries
- **Hexagonal binning** - Each hexagon represents a proportional area of the country
- **Category highlighting** - Hover or click on hexagons to highlight land use categories
- **Responsive design** - Optimized for desktop and mobile viewing
- **Data-driven** - Based on Eurostat Land Cover Statistics 2022
- **Development mode** - Toggle drag-and-drop label positioning for fine-tuning

## Countries Included

- 🇦🇹 **Austria** - Alpine woodland (43.3%)
- 🇧🇪 **Belgium** - Dense agriculture and urban areas
- 🇭🇷 **Croatia** - Forest-dominated (47.8%)
- 🇩🇰 **Denmark** - Agriculture-focused (44.8% cropland)
- 🇫🇮 **Finland** - Heavily forested (66%) with extensive lakes
- 🇫🇷 **France** - Balanced woodland (33.7%) and agriculture
- 🇩🇪 **Germany** - Balanced mix of woodland (34.2%) and cropland (27.4%)
- 🇮🇪 **Ireland** - Grassland-dominated (59.6%) pastoral landscape
- 🇮🇹 **Italy** - Diverse with olive groves and vineyards
- 🇳🇱 **Netherlands** - Detailed cropland breakdown (cereals, maize, potatoes)
- 🇵🇹 **Portugal** - Mediterranean landscape with olive trees
- 🇪🇸 **Spain** - Woodland (35.1%) and Mediterranean agriculture
- 🇸🇪 **Sweden** - Forest-dominated (61.7%) with mountain terrain
- 🇬🇧 **United Kingdom** - Grassland-dominated (42.3%)

## Development

Start the development server:

```bash
npx serve public
```

Query land cover data for a country (using 2-letter ISO codes):

```bash
npm run query <COUNTRY_CODE>
```

### Adding New Countries

1. **Query the data** - Get land use statistics from the database:

   ```bash
   node data/query-country.js <COUNTRY_CODE>  # e.g., ES, IT, PT
   ```

2. **Add country config** - In `public/countries.js`, add a new entry to `countryConfigs`:

   ```javascript
   countryname: {
     title: "Land Use in Country Name",
     isoCode: "123",  // ISO 3166-1 numeric code
     center: [lon, lat],  // Geographic center
     scale: 5000,  // Map zoom level
     categories: [
       { name: "Water", color: "var(--water-400)", percentage: 0.012 },
       // Add all categories (must sum to 1.0)
     ],
     labels: [/* label positioning */]
   }
   ```

3. **Update HTML** - In `public/index.html`:

   - Add option to `<select>` dropdown (keep alphabetically sorted)
   - Add country key to `validCountries` array

4. **Test** - Verify percentages sum to 100% and visualization renders correctly

### Development Mode

To enable drag-and-drop label positioning:

1. Open `public/index.html`
2. Set `const DEV_MODE = true;` (it's already enabled by default)
3. Refresh the page
4. Drag labels and circles to adjust positions
5. Copy JSON coordinates from console
6. Update `public/countries.js` with new positions

## Project Structure

```
public/
  ├── index.html          # Main visualization page
  ├── style.css           # Styling and color variables
  ├── countries.js        # Country configurations and data
  └── lib/                # Local dependencies (D3, TopoJSON, GeoJSON)
data/
  ├── query-country.js    # Script to query Eurostat data
  └── *.csv              # Raw data files
```

## Technology Stack

- **D3.js v7** - Data visualization and SVG rendering
- **d3-hexbin v0.2** - Hexagonal binning
- **TopoJSON Client v3** - Geographic data conversion
- **Eurostat API** - Land cover statistics data source

## Data Sources

- **Primary**: [Eurostat Land Cover Statistics 2022](https://ec.europa.eu/eurostat/databrowser/view/lan_lcv_ovw/default/table)

## License

See [LICENSE](./LICENSE) for details.

## Author

Created by [Koen van Gilst](https://koenvangilst.nl)
