const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Vehicle detail view
router.get('/detail/:inv_id', inventoryController.buildDetailView);

// Intentional error route
router.get('/error/test', (req, res, next) => {
  const error = new Error("Intentional server error");
  error.status = 500;
  throw error;
});

module.exports = router;
