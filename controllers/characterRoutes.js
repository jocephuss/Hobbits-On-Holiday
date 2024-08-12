const router = require("express").Router();
const { Character } = require("../../models");
const withAuth = require("../../utils/auth");

// Route to create a new character
router.post("/", withAuth, async (req, res) => {
  try {
    const newCharacter = await Character.create({
      name: req.body.name,
      type: req.body.type,
      position: req.body.position, // Expecting {lat: x, lng: y}
      user_id: req.session.user_id,
    });

    res.status(200).json(newCharacter);
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ message: "Failed to create character", error: err.message });
  }
});

module.exports = router;
