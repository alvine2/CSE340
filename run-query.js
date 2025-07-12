const pool = require('./db');

pool.query('SELECT * FROM inventory', (err, result) => {
  if (err) {
    console.error('Query failed:', err);
  } else {
    console.log('Inventory rows:', result.rows);
  }
  pool.end();
});
