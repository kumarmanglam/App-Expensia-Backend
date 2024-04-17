const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
const path = require("path");
const res = require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  ssl: {
    rejectUnauthorized: false,
  },
});
console.log("nnnnn", res, process.env.DATABASE_URL);
module.exports = { sequelize, DataTypes };
