const express = require("express");

let app = express();

app.use((req, res, next) => {
  console.log("hello!");
  next();
});

app.use((req, res, next) => {
  let current = new Date();
  console.log(`在${current}時有人
  來訪!!!`);
  next();
});

app.get("/", (req, res) => {
  res.send("hello! home here.");
});
app.get("/member", (req, res) => {
  res.send("hello! member here.");
});

app.listen(3006, () => {
  console.log("express app 啟動!!!");
});
