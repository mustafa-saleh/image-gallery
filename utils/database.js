const { Sequelize } = require("sequelize");

const { MYSQL_DB, MYSQL_USR, MYSQL_PD } = process.env;
const sequelize = new Sequelize(MYSQL_DB, MYSQL_USR, MYSQL_PD, {
  dialect: "mysql",
  host: "localhost",
});

function errorsReducer(errors) {
  if (typeof errors === "string") return { message: errors };
  const result = {};

  for (let field in errors) {
    result[errors[field].path] = errors[field].message;
  }
  return result;
}

module.exports = { sequelize, errorsReducer };
