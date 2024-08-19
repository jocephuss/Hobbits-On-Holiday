const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Baddie extends Model {}
Baddie.init({
  baddieName: {
    type: DataTypes.STRING, // baddie's name
    allowNull: false,
  },
  baddieIndex: {
    type: DataTypes.STRING, // Auto-incrementing primary key
    allowNull: false,
  },
  baddieImage: {
    type: DataTypes.STRING, // image url
    allowNull: false,
  },
  baddieHP: {
    type: DataTypes.STRING, // baddie's hit points
    allowNull: false,
  },
  baddiePosition: {
    type: DataTypes.JSON, // Store the position as JSON { lat: x, lng: y }
    allowNull: true,
  },
});
