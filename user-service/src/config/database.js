const { Sequelize } = require("sequelize");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const caCertPath = path.resolve(__dirname, "eu-north-1-bundle.pem");
const caCert = fs.readFileSync(caCertPath, "utf8");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      ca: caCert,
    },
  },
});

module.exports = sequelize;
