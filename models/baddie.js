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
  baddieHitPoints,
  {
    type: DataTypes.INTEGER, // baddie's hit points
    allowNull: false,
  }, 
  {sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: "baddie",
  },
);
module.exports = Baddie;
