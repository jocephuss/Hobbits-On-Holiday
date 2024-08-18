const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const withAuth = require("../../utils/auth");
const { Baddie } = require("../../models");
const dice = require("../../utils/d20.js");
const baddieDataPath = path.join(__dirname, "../../seeds/baddieData.json");
// Route to create a new baddie
async function readBaddieData() {
  if (!fs.existsSync(baddieDataPath)) {
    console.error("baddieData.json file not found.");
    return;
  }

  const fileData = fs.readFileSync(baddieDataPath, "utf-8");
  if (fileData.trim() === "") {
    console.error("baddieData.json file is empty.");
    return;
  }

  try {
    const baddieData = JSON.parse(fileData);

    // Validate baddieData
    if (!Array.isArray(baddieData)) {
      console.error("Invalid baddieData.json format: Expected an array.");
      return;
    }

    // Insert baddieData into the database
    for (const baddie of baddieData) {
      try {
        await Baddie.create(baddie);
        console.log(`Created baddie: ${baddie.name}`);
      } catch (error) {
        console.error(`Failed to create baddie: ${baddie.name}`, error);
      }
    }
  } catch (error) {
    console.error("Failed to parse baddieData.json:", error);
    return[];
  }
};
router.post("/", withAuth, async (req, res) => {
  try {
    const newBaddie = await Baddie.create({
      name: req.body.name,
      image: req.body.image,
      hitPoints: req.body.hitPoints,
      
    });
    res.status(200).json(newBaddie);
  } catch (error) {
    console.error("Error while creating baddie:", error);
    res.status(500).json({ message: "Failed to create baddie", error: error.message });
  }
});
// Call the readBaddieData function to build the database
readBaddieData();

module.exports = router;
