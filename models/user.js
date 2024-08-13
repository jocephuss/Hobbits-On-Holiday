const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");
const newPassword = require("../public/js/signup");
const newUsername = require("../public/js/signup");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (newPassword) => {
        const parsedNewPassword = JSON.parse(newPassword);
        newPassword = await bcrypt.hash(newPassword, 10);
        User.append(newPassword);
        return User;
      },
      beforeCreate: async (newUsername) => {
        const parsedNewUsername = JSON.parse(newUsername);
        User.append(newUserPassword);
        return User;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
