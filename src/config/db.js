const Sequelize = require("sequelize");
const pg = require("pg");
const { DataTypes } = Sequelize;
const path = require("path");
const res = require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
  ssl: {
    rejectUnauthorized: false,
  },
});
module.exports = { sequelize, DataTypes };
