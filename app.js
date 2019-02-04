"use strict";
const express = require("express");
const app = express();
const port = process.env.PORT || 8079;
const http = require("http");

const telegramBot = require("./bot/bot");

app.get("/", function(req, res) {
  res.send("<h1>Hello!</h1>");
});

app.listen(port, function() {
  console.log("App listening on port " + port);
});
