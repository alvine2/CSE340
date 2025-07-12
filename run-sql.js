const fs = require('fs');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Read SQL file
const sql = fs.readFileSync('./database/rebuild.sql', 'utf8');

pool.query(sql)
  .then(() => {
    console.log('Database rebuild complete!');
    pool.end();
  })
  .catch((err) => {
    console.error('Error running SQL:', err);
    pool.end();
  });
