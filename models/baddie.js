const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Baddie extends Model {}
Baddie.init(
    name: {
        type: DataTypes.STRING, // baddie's name
        allowNull: false,
      },

)