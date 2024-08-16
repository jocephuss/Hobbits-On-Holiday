const router = require("express").Router();
const { Character } = require("../models");
const withAuth = require("../utils/auth");
// Character creation route
router.get("/character", withAuth, async (req, res) => {
  try {
    // Retrieve all characters associated with the logged-in user
    const characterData = await Character.findAll({
      where: { user_id: req.session.user_id },
    });
    // Map the character data to plain objects for easier rendering
    const characters = characterData.map((character) =>
      character.get({ plain: true })
    );
    // Render the character page with the retrieved characters and the logged-in status
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
