# Onsland Data Tools

These Node.js scripts are used to import and query land cover data from Eurostat.

**Note:** These scripts are optional and only needed if you want to update or query the land cover database. The main Onsland application runs on Deno and doesn't require Node.js.

## Prerequisites

- Node.js and npm

## Installation

```bash
npm install
```

## Usage

### Import CSV data to SQLite

```bash
npm run import
# or
node import-to-sqlite.js
```

### Query country data

```bash
npm run query <COUNTRY_CODE>
# or
node query-country.js <COUNTRY_CODE>

# Example:
npm run query PL  # Query Poland data
```

## Data Source

[Eurostat Land Cover Statistics 2022](https://ec.europa.eu/eurostat/databrowser/view/lan_lcv_ovw/default/table)
