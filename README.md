# Ons Land - European Land Use Visualization

A hexagonal visualization showing land use patterns across European countries. Each hexagon represents a percentage of the country's total land area, with colors indicating different types of land use (water, woodland, agriculture, urban areas, etc.).

Originally created to visualize land use in the Netherlands, the project has expanded to include Denmark, Sweden, and Germany, with an interactive country selector.

🔗 Live visualization: https://onsland.koenvangilst.nl

## Features

- **Interactive country selector** - Switch between Netherlands, Denmark, Sweden, and Germany
- **Hexagonal binning** - Each hexagon represents a proportional area of the country
- **Category highlighting** - Hover or click on hexagons to highlight land use categories
- **Responsive design** - Optimized for desktop and mobile viewing
- **Data-driven** - Based on Eurostat Land Cover Statistics 2022
- **Development mode** - Toggle drag-and-drop label positioning for fine-tuning

## Countries Included

- 🇳🇱 **Netherlands** - Detailed cropland breakdown (cereals, maize, potatoes)
- 🇩🇰 **Denmark** - Agriculture-focused (44.8% cropland)
- 🇸🇪 **Sweden** - Forest-dominated (61.7% woodland) with mountain terrain details
- 🇩🇪 **Germany** - Balanced mix of woodland (34.2%) and cropland (27.4%)

## Development

Start the development server:

```bash
npx serve public
```

Query land cover data for a country (using 2-letter ISO codes):

```bash
npm run query <COUNTRY_CODE>
```

### Development Mode

To enable drag-and-drop label positioning:

1. Open `public/index.html`
2. Change `const DEV_MODE = false;` to `const DEV_MODE = true;`
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
- **Netherlands specific**:

## License

See [LICENSE](./LICENSE) for details.

## Author

Created by [Koen van Gilst](https://koenvangilst.nl)
