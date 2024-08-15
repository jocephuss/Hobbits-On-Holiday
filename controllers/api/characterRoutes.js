const router = require("express").Router();
const { Character } = require("../../models");
const withAuth = require("../../utils/auth");

// Route to create a new character
const fs = require("fs");
const path = require("path");
const userDataPath = path.join(__dirname, "../../seeds/userData.json");

router.post("/", withAuth, async (req, res) => {
  try {
    console.log("Received character data:", req.body);

    const newCharacter = await Character.create({
      name: req.body.name,
      type: req.body.type,
      position: req.body.position,
      user_id: req.session.user_id,
    });

    console.log("Character created:", newCharacter);

    // Update userData.json with the new character
    const currentData = JSON.parse(fs.readFileSync(userDataPath, "utf-8"));
    console.log("Current userData.json data:", currentData);

    const userIndex = currentData.findIndex(
      (user) => user.id === req.session.user_id
    );
    if (userIndex > -1) {
      currentData[userIndex].characters.push({
        id: newCharacter.id,
        name: newCharacter.name,
        type: newCharacter.type,
        position: newCharacter.position,
      });
      fs.writeFileSync(userDataPath, JSON.stringify(currentData, null, 2));
      console.log("Updated userData.json data:", currentData);
    } else {
      console.log("User not found in userData.json");
    }

    res.status(200).json(newCharacter);
  } catch (err) {
    console.error("Error while creating character:", err);
    res
      .status(400)
      .json({ message: "Failed to create character", error: err.message });
  }
});
module.exports = router;
