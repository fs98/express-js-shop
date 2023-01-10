const { Pool } = require("pg");

const pool = new Pool({
  user: "newuser",
  host: "localhost",
  database: "express-js-shop",
  password: "password",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
