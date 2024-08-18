const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Baddie extends Model {}
Baddie.init(
  baddieName,
  {
    type: DataTypes.STRING, // baddie's name
    allowNull: false,
  },
  baddieImage,
  {
    type: DataTypes.STRING, // image url
    allowNull: false,
  },
  baddieHP,
  {
    type: DataTypes.INTEGER, // baddie's hit points
    allowNull: false,
  }
);
