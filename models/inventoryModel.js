const db = require('../database/connection');

exports.getVehicleById = async function (inv_id) {
  try {
    const result = await db.query(
      `SELECT * FROM inventory WHERE inv_id = $1`,
      [inv_id]
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};
