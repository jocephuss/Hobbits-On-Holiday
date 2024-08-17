const router = require("express").Router();
const { Baddie } = require("../../models");
const withAuth = require("../../utils/auth");
const fs = require("fs");
const path = require("path");
const baddieDataPath = path.join(
  __dirname,
  "../../seeds/baddieData.json"
);

function readBaddieData() {
  if (!fs.existsSync(baddieDataPath)) {
    return []; // Return an empty array if the file doesn't exist
  }

  const fileData = fs.readFileSync(baddieDataPath, "utf-8");
  if (fileData.trim() === "") {
    return []; // Return an empty array if the file is empty
  }
  try {
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error parsing baddie data:", error);
    return []; // Return an empty array if parsing fails
  }
};

router.post("/", async (req, res) => {
  try {
    const newBaddie = await Baddie.create({
      name: req.body.name,
      image: req.body.image,
      hitPoints: req.body.hit_points,
      
    });

    fs.writeFileSync(baddieDataPath, JSON.stringify(currentData, null, 2));

    res.status(200).json(newBaddie);
  } catch (err) {
    console.error("Error while creating baddie:", err);
    res
      .status(400)
      .json({ message: "Failed to create baddie", error: err.message });
  }
});
