const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeroutes");

// Use the API routes for paths that start with /api
router.use("/api", apiRoutes);

// Use the home routes for all other paths
router.use("/", homeRoutes);

module.exports = router;
