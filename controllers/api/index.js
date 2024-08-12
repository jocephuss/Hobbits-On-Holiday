const router = require("express").Router();
const userRoutes = require("./userRoutes");

// Add user routes to the /users path
router.use("/users", userRoutes);

module.exports = router;
