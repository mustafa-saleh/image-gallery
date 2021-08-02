const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/database");
// const Image = require("./image");

class User extends Model {
  hashPassword(password) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }

  //📌 delete password before returning user
  toUserJSON() {
    const obj = this.toJSON();
    delete obj.password;
    return obj;
  }

  //📌 comapre password entered passsword to hased one
  async verifyPassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  //📌 generate user token
  jwtToken() {
    const { JWT_SECRET_KEY, JWT_EXPIRES_IN } = process.env;
    return jwt.sign({ id: this.id }, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRES_IN,
    });
  }
}

User.init(
  {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("password", this.hashPassword(value));
      },
    },
  },
  { sequelize, modelName: "user", timestamps: false }
);

// User.hasMany(Image, {
//     foreignKey: {
//       name: "teamId",
//       allowNull: true,
//     },
//   });
//   Image.belongsTo(User);

module.exports = User;
