require("dotenv").config();
const {
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env;

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  dialect: "postgres",
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  logging: false,
});

module.exports = sequelize;
