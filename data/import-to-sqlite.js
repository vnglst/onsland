#!/usr/bin/env node

/**
 * Import Eurostat Land Cover CSV data into SQLite database
 * Source: lan_lcv_ovw_linear_2_0.csv
 * Data source: https://ec.europa.eu/eurostat/databrowser/view/lan_lcv_ovw/default/table?lang=en
 */

const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const readline = require("readline");
const path = require("path");

const CSV_FILE = path.join(__dirname, "./lan_lcv_ovw_linear_2_0.csv");
const DB_FILE = path.join(__dirname, "./land-cover.db");

// Ensure data directory exists
const dataDir = path.dirname(DB_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Delete existing database to start fresh
if (fs.existsSync(DB_FILE)) {
  fs.unlinkSync(DB_FILE);
  console.log("Deleted existing database");
}

const db = new sqlite3.Database(DB_FILE);

// Create table
db.serialize(() => {
  console.log("Creating table...");

  db.run(`
    CREATE TABLE land_cover (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      dataflow TEXT,
      dataset_name TEXT,
      frequency TEXT,
      frequency_label TEXT,
      unit_code TEXT,
      unit_label TEXT,
      land_cover_code TEXT,
      land_cover_label TEXT,
      country_code TEXT,
      country_name TEXT,
      year INTEGER,
      value REAL,
      flags TEXT
    )
  `);

  console.log("Table created successfully");
  console.log("Importing data from CSV...");

  const rl = readline.createInterface({
    input: fs.createReadStream(CSV_FILE),
    crlfDelay: Infinity,
  });

  let lineCount = 0;
  let importCount = 0;
  let isFirstLine = true;

  const stmt = db.prepare(`
    INSERT INTO land_cover (
      dataflow, dataset_name, frequency, frequency_label,
      unit_code, unit_label, land_cover_code, land_cover_label,
      country_code, country_name, year, value, flags
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  rl.on("line", (line) => {
    lineCount++;

    // Skip header
    if (isFirstLine) {
      isFirstLine = false;
      return;
    }

    // Parse CSV line (accounting for quoted fields with commas)
    const fields = [];
    let field = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        fields.push(field);
        field = "";
      } else {
        field += char;
      }
    }
    fields.push(field); // Add the last field

    if (fields.length >= 12) {
      const dataflow = fields[0];
      const datasetName = fields[2];
      const frequency = fields[3];
      const frequencyLabel = fields[4];
      const unitCode = fields[5];
      const unitLabel = fields[6];
      const landCoverCode = fields[7];
      const landCoverLabel = fields[8];
      const countryCode = fields[9];
      const countryName = fields[10];
      const year = parseInt(fields[11]);
      const value = fields[13] ? parseFloat(fields[13]) : null;
      const flags = fields[14] || null;

      stmt.run(
        dataflow,
        datasetName,
        frequency,
        frequencyLabel,
        unitCode,
        unitLabel,
        landCoverCode,
        landCoverLabel,
        countryCode,
        countryName,
        year,
        value,
        flags
      );

      importCount++;

      if (importCount % 10000 === 0) {
        console.log(`Imported ${importCount} records...`);
      }
    }
  });

  rl.on("close", () => {
    stmt.finalize();

    console.log(`\nImport complete!`);
    console.log(`Total lines processed: ${lineCount}`);
    console.log(`Records imported: ${importCount}`);

    // Create indexes for better query performance
    console.log("\nCreating indexes...");

    db.run("CREATE INDEX idx_country_year ON land_cover(country_code, year)");
    db.run("CREATE INDEX idx_land_cover_code ON land_cover(land_cover_code)");
    db.run("CREATE INDEX idx_unit_code ON land_cover(unit_code)");

    console.log("Indexes created successfully");

    // Show some statistics
    db.get(`SELECT COUNT(*) as count FROM land_cover`, (err, row) => {
      console.log(`\nTotal records in database: ${row.count}`);

      db.get(`SELECT COUNT(DISTINCT country_code) as count FROM land_cover`, (err, row) => {
        console.log(`Unique countries: ${row.count}`);

        db.get(`SELECT COUNT(DISTINCT year) as count FROM land_cover`, (err, row) => {
          console.log(`Unique years: ${row.count}`);

          db.close();
          console.log("\nDatabase closed");
        });
      });
    });
  });
});
