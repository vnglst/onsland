# Ons Land - European Land Use Visualization

An interactive hexagonal map showing land use patterns across European countries. Each hex represents a land percentage, split into Water, Nature, Cities, and Agriculture.

🔗 **Live demo**: https://onsland.koenvangilst.nl

Originally created to visualize Dutch land use, this project now lets you compare land use patterns across Europe and see what makes each country unique.

https://github.com/user-attachments/assets/2e425a3a-3fa4-439e-a37d-18a6d4a0877b

## Contributing

Want to add more countries? The map rendering is already there, and land use data is available in the SQLite database for EU countries. PRs welcome, also for non-European countries!

### Adding a New Country

1. Query the data using the country's 2-letter ISO code:

   ```bash
   npm run query <COUNTRY_CODE>  # e.g., PL, RO, GR
   ```

2. Add the country configuration to [public/countries.js](public/countries.js)

   - Add the `isoCode` by checking the Wikipedia "[List of ISO 3166 country codes](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)" to get the country's **NUM**eric code
   - Add the geographic `center` coordinates (longitude and then latitude) for proper map centering
   - Play with the `scale` value to get the best fit for the hex map
   - Populate the `categories` percentages from the "Land Cover Categories" of the command's output
   - Adjust the `labels` for better readability (use the instructions in the [Development](#development) section for help)

3. Add the country option to the dropdown in [public/index.html](public/index.html)

See the existing country configurations for examples.

## Development

Start the development server:

```bash
npx serve public
```

Enable drag-and-drop label positioning by setting `DEV_MODE = true` in [public/index.html](public/index.html).
Check the browser console for the current label positions to update the configuration.

## Planned Features

Based on user feedback from our community, here are features I'm considering:

- **Country Comparison** - Side-by-side comparison view with rankings by land use category
- **Absolute Values** - Display hectares/m² alongside percentages for better context when comparing countries of different sizes
- **Bug Fix** - Square view animation rendering issue when switching views during country transitions
- **Interactive Legend** - Hover over legend items to highlight corresponding hexagons on the map
- **Geographic View** - Toggle to show actual geographic distribution of land use instead of grid layout
- **Detailed Categories** - Separate pasture land from other agriculture and distinguish forest types (pending data availability)

Want to contribute or discuss these features? Open an issue or submit a PR.

## Technology

Built with D3.js, d3-hexbin, and TopoJSON. Data from [Eurostat Land Cover Statistics 2022](https://ec.europa.eu/eurostat/databrowser/view/lan_lcv_ovw/default/table).

## Author

Created by [Koen van Gilst](https://koenvangilst.nl)

---

Previous HN discussion: https://news.ycombinator.com/item?id=40599763
