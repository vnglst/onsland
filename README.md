# Ons Land - European Land Use Visualization

An interactive hexagonal map showing land use patterns across European countries. Each hex represents a land percentage, split into Water, Nature, Cities, and Agriculture.

🔗 **Live demo**: https://onsland.koenvangilst.nl

Originally created to visualize Dutch land use, this project now lets you compare land use patterns across Europe and see what makes each country unique.

https://github.com/user-attachments/assets/2e425a3a-3fa4-439e-a37d-18a6d4a0877b

## Features

- **Interactive Country Visualizations** - Explore land use patterns for 27+ European countries with hexagonal grid and geographic map views
- **Rankings & Comparisons** - Compare countries side-by-side to see which have the most woodland, agriculture, urban areas, and more
- **Multi-Language Support** - Available in English, Dutch, French, Spanish, and German
- **Toggle Views** - Switch between square grid and geographic map visualizations for different perspectives
- **Detailed Breakdowns** - See granular land use categories including specific crop types, different nature areas, and more

## Contributing

Want to add more countries? The map rendering is already there, and land use data is available in the SQLite database for EU countries. PRs welcome, also for non-European countries!

### Adding a New Country

1. Query the data using the country's 2-letter ISO code:

   ```bash
   npm run query <COUNTRY_CODE>  # e.g., PL, RO, GR
   ```

2. Add the country configuration to [public/shared/countries.js](public/shared/countries.js)

   - Add the `isoCode` by checking the Wikipedia "[List of ISO 3166 country codes](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)" to get the country's **NUM**eric code
   - Add the geographic `center` coordinates (longitude and then latitude) for proper map centering
   - Play with the `scale` value to get the best fit for the hex map
   - Populate the `categories` percentages from the "Land Cover Categories" of the command's output
   - Adjust the `labels` for better readability (use the instructions in the [Development](#development) section for help)

3. Add the country name translation to the locale files in [public/locales/](public/locales/)

   - Add the country name to the `countries` section in each language file (en.json, nl.json, fr.json, es.json, de.json)

The country will automatically appear on the home page grid and in the rankings once added to the configuration. See existing country configurations for examples.

## Development

Start the development server:

```bash
npx serve public
```

Enable drag-and-drop label positioning by setting `DEV_MODE = true` in [public/country.js](public/country.js).
Check the browser console for the current label positions to update the configuration.

## Technology

Built with D3.js, d3-hexbin, and TopoJSON. Data from [Eurostat Land Cover Statistics 2022](https://ec.europa.eu/eurostat/databrowser/view/lan_lcv_ovw/default/table).

## Author

Created by [Koen van Gilst](https://koenvangilst.nl)

---

Previous HN discussion: https://news.ycombinator.com/item?id=40599763
