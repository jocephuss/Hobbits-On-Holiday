const router = require("express").Router();
const { Character } = require("../../models");
const withAuth = require("../../utils/auth");

// Route to create a new character
const fs = require("fs");
const path = require("path");
const userDataPath = path.join(__dirname, "../../seeds/userData.json");
const characterDataPath = path.join(__dirname, "../../seeds/character.json");

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
    // const currentData = JSON.parse(fs.readFileSync(characterDataPath, "utf-8"));
    // console.log("Current characterData.json data:", currentData);

    // const characterIndex = currentData.findIndex(
    //   (character) => character.id === req.session.character_id
    // );
    // if (characterIndex > -1) {
    //   currentData[characterIndex].characters.push({
    //     id: newCharacter.id,
    //     name: newCharacter.name,
    //     type: newCharacter.type,
    //     position: newCharacter.position,
    //   });
    //   fs.writeFileSync(characterDataPath, JSON.stringify(currentData, null, 2));
    //   console.log("Updated characterData.json data:", currentData);
    // } else {
    //   console.log("User not found in userData.json");
    // }

    res.status(200).json(newCharacter);
  } catch (err) {
    console.error("Error while creating character:", err);
    res
      .status(400)
      .json({ message: "Failed to create character", error: err.message });
  }
});
module.exports = router;
