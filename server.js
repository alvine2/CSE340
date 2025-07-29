const express = require("express");
const env = require("dotenv").config();
const app = express();
const path = require("path");
const fs = require("fs");

// Check if files exist before requiring them
const utilities = require("./utilities/");

// Check for existing routes or create minimal ones
let inventoryRoute;
try {
  inventoryRoute = require("./routes/inventoryRoute");
} catch (error) {
  console.log("Creating inventory route...");
  inventoryRoute = express.Router();
}

let errorRoute;
try {
  errorRoute = require("./routes/errorRoute");
} catch (error) {
  console.log("Creating error route...");
  errorRoute = express.Router();
}

// Check for error handler
let errorHandler;
try {
  errorHandler = require("./middleware/errorHandler");
} catch (error) {
  console.log("Creating basic error handler...");
  errorHandler = async (err, req, res, next) => {
    let nav = await utilities.getNav();
    console.error(`Error at: "${req.originalUrl}": ${err.message}`);
    
    let message = err.message || 'Something went wrong';
    let status = err.status || 500;
    
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
}

// Check for base controller
let baseController;
try {
  baseController = require("./controllers/baseController");
} catch (error) {
  console.log("Creating basic base controller...");
  baseController = {
    buildHome: async (req, res, next) => {
      let nav = await utilities.getNav();
      res.render("index", { title: "Home", nav });
    }
  };
}

/* ***********************
 * Middleware
 * ************************/
app.use(express.static("public"));
app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/js", express.static(path.join(__dirname, "public/js")));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs");
app.use(require("express-ejs-layouts"));
app.set("layout", "./layouts/layout");

/* ***********************
 * Routes
 *************************/

// Index route
app.get("/", utilities.handleErrors(baseController.buildHome));

// Inventory routes
app.use("/inv", inventoryRoute);

// Error routes
app.use("/error", errorRoute);

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({ status: 404, message: 'Sorry, we appear to have lost that page.' });
});

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(errorHandler);

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT || 5500;
const host = process.env.HOST || 'localhost';

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
});