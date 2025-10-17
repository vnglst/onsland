#!/usr/bin/env node

/**
 * Extract land cover data from SQLite database for any country
 * Usage: node query-country.js <COUNTRY_CODE> [YEAR]
 * Example: node query-country.js DK 2022
 * Data source: https://ec.europa.eu/eurostat/databrowser/view/lan_lcv_ovw/default/table?lang=en
 */

const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const DB_FILE = path.join(__dirname, "./land-cover.db");

// Parse command line arguments
const args = process.argv.slice(2);
const COUNTRY_CODE = args[0];
const YEAR = args[1] ? parseInt(args[1]) : 2022;

// Country flag emojis
const FLAGS = {
  DK: "🇩🇰",
  NL: "🇳🇱",
  DE: "🇩🇪",
  BE: "🇧🇪",
  FR: "🇫🇷",
  ES: "🇪🇸",
  IT: "🇮🇹",
  PL: "🇵🇱",
  SE: "🇸🇪",
  NO: "🇳🇴",
  FI: "🇫🇮",
  AT: "🇦🇹",
  PT: "🇵🇹",
  GB: "🇬🇧",
  IE: "🇮🇪",
};

if (!COUNTRY_CODE) {
  console.error("❌ Error: Country code is required");
  console.log("\nUsage: node query-country.js <COUNTRY_CODE> [YEAR]");
  console.log("\nExamples:");
  console.log("  node query-country.js DK        # Denmark, 2022 (default year)");
  console.log("  node query-country.js NL 2021   # Netherlands, 2021");
  console.log("  node query-country.js DE        # Germany, 2022");
  console.log("\nCommon country codes: DK, NL, DE, BE, FR, ES, IT, PL, SE, NO, FI");
  process.exit(1);
}

const db = new sqlite3.Database(DB_FILE, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error("❌ Error opening database:", err.message);
    console.error("Please run import-to-sqlite.js first to create the database");
    process.exit(1);
  }
});

// First, get the country name
const countryQuery = `
  SELECT DISTINCT country_name 
  FROM land_cover 
  WHERE country_code = ? 
  LIMIT 1
`;

db.get(countryQuery, [COUNTRY_CODE], (err, countryRow) => {
  if (err) {
    console.error("❌ Error querying database:", err.message);
    db.close();
    process.exit(1);
  }

  if (!countryRow) {
    console.error(`❌ No data found for country code: ${COUNTRY_CODE}`);
    console.log("\nTip: Try running this to see available countries:");
    console.log(
      '  sqlite3 data/land-cover.db "SELECT DISTINCT country_code, country_name FROM land_cover ORDER BY country_code"'
    );
    db.close();
    process.exit(1);
  }

  const COUNTRY_NAME = countryRow.country_name;
  const flag = FLAGS[COUNTRY_CODE] || "🌍";

  console.log(`\n${flag} ${COUNTRY_NAME} Land Cover Data (${YEAR})`);
  console.log("=".repeat(60));

  // Query for main categories (X00 codes) with percentages
  const query = `
    SELECT 
      land_cover_code,
      land_cover_label,
      value as percentage,
      unit_label
    FROM land_cover
    WHERE country_code = ?
      AND year = ?
      AND unit_code = 'PC'
      AND land_cover_code GLOB '[A-Z]00'
    ORDER BY 
      CASE land_cover_code
        WHEN 'G00' THEN 1  -- Water (bottom)
        WHEN 'C00' THEN 2  -- Woodland (nature)
        WHEN 'H00' THEN 3  -- Wetland (nature)
        WHEN 'D00' THEN 4  -- Shrubland (nature)
        WHEN 'F00' THEN 5  -- Bare land (nature)
        WHEN 'A00' THEN 6  -- Artificial land (cities)
        WHEN 'E00' THEN 7  -- Grassland (agriculture)
        WHEN 'B00' THEN 8  -- Cropland (agriculture, top)
        ELSE 9
      END
  `;

  db.all(query, [COUNTRY_CODE, YEAR], (err, rows) => {
    if (err) {
      console.error("❌ Error querying database:", err.message);
      db.close();
      process.exit(1);
    }

    if (rows.length === 0) {
      console.log(`\n⚠️  No data found for ${COUNTRY_NAME} in ${YEAR}`);
      console.log("\nTip: Try a different year. Available years are usually: 2018, 2019, 2020, 2021, 2022");
      db.close();
      process.exit(0);
    }

    console.log("\nLand Cover Categories:\n");

    let total = 0;

    rows.forEach((row) => {
      const percentage = row.percentage;
      total += percentage;

      console.log(`${row.land_cover_code} - ${row.land_cover_label.padEnd(20)} ${percentage}%`);
    });

    // Query for ALL detailed categories (not just main ones)
    const allCategoriesQuery = `
      SELECT 
        land_cover_code,
        land_cover_label,
        value as percentage
      FROM land_cover
      WHERE country_code = ?
        AND year = ?
        AND unit_code = 'PC'
        AND land_cover_code NOT IN ('TOTAL')
        AND value IS NOT NULL
      ORDER BY 
        CASE 
          WHEN land_cover_code GLOB '[A-Z]00' THEN 0
          ELSE 1
        END,
        land_cover_code
    `;

    db.all(allCategoriesQuery, [COUNTRY_CODE, YEAR], (err, allRows) => {
      if (!err && allRows.length > 0) {
        console.log("\n" + "─".repeat(60));
        console.log("Detailed Categories:\n");

        let currentMainCategory = "";

        allRows.forEach((row) => {
          const isMainCategory = /^[A-Z]00$/.test(row.land_cover_code);

          if (isMainCategory) {
            currentMainCategory = row.land_cover_code;
            console.log(`\n${row.land_cover_code} - ${row.land_cover_label} (${row.percentage}%)`);
          } else {
            // Only show sub-categories
            const indent = row.land_cover_code.startsWith(currentMainCategory.charAt(0)) ? "  " : "";
            console.log(`${indent}${row.land_cover_code} - ${row.land_cover_label.padEnd(45)} ${row.percentage}%`);
          }
        });
      }

      // Query for area in km²
      const areaQuery = `
        SELECT 
          land_cover_code,
          land_cover_label,
          value as area_km2
        FROM land_cover
        WHERE country_code = ?
          AND year = ?
          AND unit_code = 'KM2'
          AND land_cover_code = 'TOTAL'
      `;

      db.get(areaQuery, [COUNTRY_CODE, YEAR], (err, areaRow) => {
        console.log("\n" + "=".repeat(60));
        const isExact100 = Math.abs(total - 100) < 0.1;
        console.log(`Total: ${total.toFixed(1)}% ${isExact100 ? "✓" : "⚠️"}`);

        if (areaRow) {
          console.log(`Total Area: ${areaRow.area_km2.toLocaleString()} km²`);
        }
        console.log("=".repeat(60));

        db.close();
      });
    });
  });
});
