const fs = require("fs");
const resData = require("../util/restaurant-data");

const express = require("express");
const uuid = require("uuid");

const route = express.Router();

route.get("/restaurant", function (req, res) {
  let order = req.query.order;
  let nextOrder = 'dsc';
  if (order !== "asc" && order !== "dsc") {
    order = "asc";
  }
  if(order === 'dsc' ){
     nextOrder = 'asc';
  }
  const storeRestaurant = resData.readAndStoreRestaurant();
  storeRestaurant.sort(function (resA, resB) {
    if (
      (order == "asc" && resA.name > resB.name) ||
      (order == "dsc" && resB.name > resA.name)
    ) {
      return 1;
    }
    return -1;
  });
  res.render("recommended", {
    numberOfRestaurant: storeRestaurant.length,
    hotels: storeRestaurant,
    nextOrder: nextOrder
  });
});
route.post("/restaurant", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const restorant = resData.readAndStoreRestaurant();

  restorant.push(restaurant);
  resData.writeAndStore(restorant);

  res.redirect("/confirm");
});
route.get("/restaurant/:id", function (req, res) {
  const restaurantid = req.params.id;
  const storeRestaurant = resData.readAndStoreRestaurant();
  for (const restaurant of storeRestaurant) {
    if (restaurant.id === restaurantid) {
      return res.render("restaurantDetails", { hotel: restaurant });
    }
  }
  res.status(404).render("404");
});

route.get("/share", function (req, res) {
  res.render("share");
});
route.get("/confirm", function (req, res) {
  res.render("confirmation");
});

module.exports = route;
