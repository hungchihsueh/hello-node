const express = require("express");
require("dotenv").config();
const mysql = require("mysql");
const Promise = require("bluebird");

const cors = require("cors");
let corsOption = {
  origin: "*",
};

const app = express();

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection = Promise.promisifyAll(connection);

app.listen(3006, () => {
  connection.connect();
  console.log("express app 啟動!!!");
});

// app.use((req, res, next) => {
//   console.log("hello!");
//   next();
// });

// app.use((req, res, next) => {
//   let current = new Date();
//   console.log(`在${current}時有人
//   來訪!!!`);
//   next();
// });

app.get("/", async (req, res) => {
  res.status(200).send("it's home page!!!");
});

app.get("/api/todos", async (req, res) => {
  let data = await connection.queryAsync("SELECT * FROM todos");
  res.json(data);
});
app.get("/api/members", async (req, res) => {
  let data = await connection.queryAsync("SELECT * FROM members");
  res.json(data);
});

app.use((req, res, next) => {
  console.log("not found");
  res.status(404).send("fuck you!");
  next();
});
