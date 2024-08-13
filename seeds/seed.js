const path = require("path");
const sequelize = require(path.join(__dirname, "../config/connection"));
const { User, Character } = require("../models");

const userData = require("./userData.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Failed to seed database:", error);
  } finally {
    process.exit(0);
  }
};

seedDatabase();
