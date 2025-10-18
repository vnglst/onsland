# Ons Land - European Land Use Visualization

An interactive hexagonal map showing land use patterns across European countries. Each hex represents a land percentage, split into Water, Nature, Cities, and Agriculture.

🔗 **Live demo**: https://onsland.koenvangilst.nl

Originally created to visualize Dutch land use during election debates, this project now lets you compare land use patterns across Europe and see what makes each country unique.

## Contributing

Want to add more countries? The map rendering is already there, and land use data is available in the SQLite database for EU countries. PRs welcome, also for non-European countries!

### Adding a New Country

1. Query the data using the country's 2-letter ISO code:

   ```bash
   npm run query <COUNTRY_CODE>  # e.g., PL, RO, GR
   ```

2. Add country configuration to [public/countries.js](public/countries.js)

3. Add country option to the dropdown in [public/index.html](public/index.html)

See the existing country configurations for examples.

## Development

Start the development server:

```bash
npx serve public
```

Enable drag-and-drop label positioning by setting `DEV_MODE = true` in [public/index.html](public/index.html).

## Technology

Built with D3.js, d3-hexbin, and TopoJSON. Data from [Eurostat Land Cover Statistics 2022](https://ec.europa.eu/eurostat/databrowser/view/lan_lcv_ovw/default/table).

## Author

Created by [Koen van Gilst](https://koenvangilst.nl)

---

Previous HN discussion: https://news.ycombinator.com/item?id=40599763
