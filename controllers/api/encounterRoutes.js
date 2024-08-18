const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { Character } = require("../../models");
const dice = require("../../utils/d20.js");
const baddieDataPath = path.join(__dirname, "../../data/baddieData.json");

// Route to create a new character
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
    console.error("Failed to parse baddieData.json:", error);
    return []; // Return an empty array if parsing fails
  }
}

module.exports = router;
