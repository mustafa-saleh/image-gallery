const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/database");

class Image extends Model {}

Image.init(
  {
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "image", timestamps: false }
);

module.exports = Image;
