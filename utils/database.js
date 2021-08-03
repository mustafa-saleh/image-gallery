const { Sequelize } = require("sequelize");

const { MYSQL_DB, MYSQL_USR, MYSQL_PD } = process.env;
const sequelize = new Sequelize(MYSQL_DB, MYSQL_USR, MYSQL_PD, {
  dialect: "mysql",
  host: "localhost",
});

module.exports = { sequelize };
