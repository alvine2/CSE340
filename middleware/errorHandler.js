const utilities = require("../utilities/");

/* ****************************************
* Express Error Handler
* Place after all other middleware
**************************************** */
const errorHandler = async (err, req, res, next) => {
  let nav = await utilities.getNav();
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  
  // Default error values
  let message = err.message || 'Something went wrong';
  let status = err.status || 500;
  
  // Handle specific error types
  if (err.status === 404) {
    message = 'Sorry, we appear to have lost that page.';
  } else if (err.status >= 500) {
    message = 'Oh no! There was a crash. Maybe try a different route?';
  }
  
  res.status(status).render('errors/error', {
    title: `${status} Error`,
    message,
    nav,
    status
  });
};

module.exports = errorHandler;