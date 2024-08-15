const router = require("express").Router();
const { User } = require("../../models");
const fs = require("fs");
const path = require("path");
const userDataPath = path.join(__dirname, "../../seeds/userData.json");

// Signup route
router.post("/signup", async (req, res) => {
  try {
    // Create a new user and hash the password
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password, // Sequelize should handle hashing automatically if properly configured
    });

    // Load existing user data from userData.json
    let currentData = [];
    if (fs.existsSync(userDataPath)) {
      currentData = JSON.parse(fs.readFileSync(userDataPath, "utf-8"));
    }

    // Append the new user data
    currentData.push({
      id: userData.id,
      username: userData.username,
      password: userData.password, // Consider removing this if you don't need to store raw passwords
    });

    // Save updated data back to userData.json
    fs.writeFileSync(userDataPath, JSON.stringify(currentData, null, 2));

    // Save user session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json({ message: "Signup successful!" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to sign up", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res
        .status(200)
        .json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
