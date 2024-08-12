const router = require("express").Router();
const { Character } = require("../models");
const withAuth = require("../utils/auth");

router.get("/character", withAuth, async (req, res) => {
  try {
    const characterData = await Character.findAll({
      where: { user_id: req.session.user_id },
    });

    const characters = characterData.map((character) =>
      character.get({ plain: true })
    );

    res.render("character", {
      characters,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Home route
router.get("/", async (req, res) => {
  try {
    // Render the homepage or another main page
    res.render("homepage", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect to the home page or another appropriate page
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  // Otherwise, render the login page
  res.render("login");
});

// Other routes...

// Signup route
router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect to the home page or another appropriate page
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  // Otherwise, render the signup page
  res.render("signup");
});

module.exports = router;
