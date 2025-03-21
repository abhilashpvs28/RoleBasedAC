const { Client } = require("pg");
const dotenv = require("dotenv").config();

const PostG = new Client({

  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

PostG.connect()
  .then(() => console.log("Db is connected"))
  .catch((err) => {
    console.log(`Something Went Wrong : ${err.message}`);
    process.exit(1);
  });

module.exports = PostG;