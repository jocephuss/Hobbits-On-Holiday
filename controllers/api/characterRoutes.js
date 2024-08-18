const router = require("express").Router();
const { Character } = require("../../models");
const withAuth = require("../../utils/auth");
const fs = require("fs");
const path = require("path");
const characterDataPath = path.join(
  __dirname,
  "../../seeds/characterData.json"
);

// Route to create a new character
function readCharacterData() {
  if (!fs.existsSync(characterDataPath)) {
    return []; // Return an empty array if the file doesn't exist
  }

  const fileData = fs.readFileSync(characterDataPath, "utf-8");

  if (fileData.trim() === "") {
    return []; // Return an empty array if the file is empty
  }

  try {
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Failed to parse characterData.json:", error);
    return []; // Return an empty array if parsing fails
  }
}

router.post("/", withAuth, async (req, res) => {
  try {
    const newCharacter = await Character.create({
      name: req.body.name,
      type: req.body.type,
      position: req.body.position,
      user_id: req.session.user_id,
    });

    // Read the current character data
    let currentData = readCharacterData();

    // Append the new character data
    currentData.push({
      id: newCharacter.id,
      name: newCharacter.name,
      type: newCharacter.type,
      position: newCharacter.position,
      user_id: newCharacter.user_id,
    });

    // Save updated data back to characterData.json
    fs.writeFileSync(characterDataPath, JSON.stringify(currentData, null, 2));

    res.status(200).json(newCharacter);
  } catch (err) {
    console.error("Error while creating character:", err);
    res
      .status(400)
      .json({ message: "Failed to create character", error: err.message });
  }
});
// Route to get all characters for a user
router.get("/:id", withAuth, async (req, res) => {
  try {
    const characterData = await Character.findByPk(req.params.id);

    if (!characterData) {
      res.status(404).json({ message: "No character found with this id!" });
      return;
    }
    // Fetch the character data from characterData.json
    const character = characterData.get({ plain: true });
    //

    res.status(200).json(character);
  } catch (err) {
    console.error("Error while fetching character:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch character", error: err.message });
  }
});

// Route to update character position
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedCharacter = await Character.update(
      { position: req.body.position },
      { where: { id: req.params.id } }
    );
    // Check if the character was found in the database

    if (!updatedCharacter) {
      res.status(404).json({ message: "No character found with this id!" });
      return;
    }

    // Read the current character data from characterData.json
    let currentData = JSON.parse(fs.readFileSync(characterDataPath, "utf-8"));

    // Find the character in the JSON file and update the position
    const characterIndex = currentData.findIndex(
      (char) => char.id === parseInt(req.params.id)
    );
    if (characterIndex !== -1) {
      currentData[characterIndex].position = req.body.position;
      // Save updated data back to characterData.json
      fs.writeFileSync(characterDataPath, JSON.stringify(currentData, null, 2));
    }
    // Send the updated character data back to the client
    res.status(200).json(updatedCharacter);
    document.location.replace("/character"); // Redirect to character creation page
  } catch (err) {
    console.error("Error while updating character position:", err);
    res.status(500).json({
      message: "Failed to update character position",
      error: err.message,
    });
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deletedCharacter = await Character.destroy({
      where: { id: req.params.id, user_id: req.session.user_id }, // Ensure the character belongs to the current user
    });
    // Check if the character was found in the database
    if (!deletedCharacter) {
      res.status(404).json({ message: "No character found with this id!" });
      return;
    }
    // Read the current character data from characterData.json
    let currentData = JSON.parse(fs.readFileSync(characterDataPath, "utf-8"));
    currentData = currentData.filter(
      (characterDataPath) => characterDataPath.id !== parseInt(req.params.id)
    );
    // Save updated data back to characterData.json
    fs.writeFileSync(characterDataPath, JSON.stringify(currentData, null, 2));
    res.status(200).json({ message: "Character deleted successfully!" });
  } catch (err) {
    console.error("Error while deleting character:", err);
    res
      .status(500)
      .json({ message: "Failed to delete character", error: err.message });
  }
});

module.exports = router;
