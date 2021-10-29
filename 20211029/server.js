const express = require("express");

let app = express();

app.get("/", (req, res) => {
    res.send("hello! home here.");
});
app.get("/member", (req, res) => {
    res.send("hello! member here.");
});

app.listen(8080, () => {
  console.log("express app 啟動!!!");
});
