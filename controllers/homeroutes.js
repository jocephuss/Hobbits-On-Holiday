const router = require("express").Router();
const { User, Character } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    // If the user is logged in, allow them to view the map
    try {
      const userData = await user.findAll({
        order: [["name", "ASC"]],
      });

      const user = userData.map((project) => user.get({ plain: true }));

      res.render("homepage", {
        user: req.user,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
