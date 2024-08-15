const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Character extends Model {}

Character.init(
  {
    id: {
      type: DataTypes.INTEGER, // Auto-incrementing primary key
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING, // Character's name
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING, // Character's type
      allowNull: false,
    },
    position: {
      type: DataTypes.JSON, // Store the position as JSON { lat: x, lng: y }
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER, // Foreign key referencing the user table
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "character",
  }
);

module.exports = Character;

// for(int i = 0; i != num_hits; ++i) {
//   int n = randomness::generator->get_random_int(0, static_cast<int>(indexes.size())-1);
//   prng_seq[indexes[n]] = true;
//   indexes.erase(indexes.begin() + n);
// }
