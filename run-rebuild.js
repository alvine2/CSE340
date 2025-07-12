const fs = require('fs');
const pool = require('./db');

const sql = fs.readFileSync('./database/rebuild.sql', 'utf8');

pool.query(sql)
  .then(() => {
    console.log('Database rebuild complete!');
    pool.end();
  })
  .catch((err) => {
    console.error('Error running rebuild.sql:', err);
    pool.end();
  });
