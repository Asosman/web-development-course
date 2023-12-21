const express = require('express');
const route = express.Router();


route.get("/", function (req, res) {
    res.render("index");
  });

  route.get("/about", function (req, res) {
    res.render("about");
  });

  module.exports = route;