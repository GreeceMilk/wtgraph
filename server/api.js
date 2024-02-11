/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
// const Story = require("./models/story");
// const Comment = require("./models/comment");
// const User = require("./models/user");
// const Message = require("./models/message");
const price = require("./models/price");
const vehicle = require("./models/vehicle");
const nation_ab = require("./models/nation_ab");
const nation_rb = require("./models/nation_rb");
const nation_sb = require("./models/nation_sb");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

// const socketManager = require("./server-socket");

router.get("/prices", (req, res) => {
  price.find({}).then((prices) => {
    res.send(prices);
  });
});

// TODO fill out the endpoints
router.get("/vehicleslist", (req, res) => {});

router.get("/vehicles", (req, res) => {
  // req.query.vehicle
  // req.query.stat
});

router.get("/nationslist", (req, res) => {});
router.get("/nations", (req, res) => {
  // req.query.nation
  // req.query.mode
  // req.query.stat
});

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
