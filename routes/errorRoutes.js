const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/");

// Route to intentionally trigger 500 error
router.get("/trigger-error", utilities.handleErrors(async (req, res, next) => {
  // Intentionally throw an error to test error handling
  throw new Error("Intentional 500 error for testing error handling middleware");
}));

module.exports = router;