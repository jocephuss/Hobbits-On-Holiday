const router = require("express").Router();
const userRoutes = require("./userRoutes");
const characterRoutes = require("./characterRoutes");
const encounterRoutes = require("./encounterRoutes");

router.use("/api", characterRoutes);
// Add user routes to the /users path
router.use("/users", userRoutes);
router.use("/character", characterRoutes);
router.use("/encounter", encounterRoutes);

module.exports = router;
