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
const price = require("./models/price");
const { sb_ranks_all, sb_ranks_1, sb_ranks_0 } = require("./models/nation_sb");
const vehicle = require("./models/vehicle");
const { ab_ranks_0, ab_ranks_1, ab_ranks_all } = require("./models/nation_ab");
const { rb_ranks_0, rb_ranks_1, rb_ranks_all } = require("./models/nation_rb");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

// const socketManager = require("./server-socket");
const chooseDb = (mode, brRange) => {
  if (mode === "ab") {
    if (brRange === "1") {
      return ab_ranks_1;
    } else if (brRange === "0") {
      return ab_ranks_0;
    } else {
      return ab_ranks_all;
    }
  } else if (mode === "rb") {
    if (brRange === "1") {
      return rb_ranks_1;
    } else if (brRange === "0") {
      return rb_ranks_0;
    } else {
      return rb_ranks_all;
    }
  } else if (mode === "sb") {
    if (brRange === "1") {
      return sb_ranks_1;
    } else if (brRange === "0") {
      return sb_ranks_0;
    } else {
      return sb_ranks_all;
    }
  }
  // Default return statement
  return null;
};
router.get("/price_list", (req, res) => {
  price
    .aggregate([
      {
        $group: {
          _id: "$name",
        },
      },
    ])
    .then((prices) => {
      res.send(prices);
    });
});

router.get("/prices", (req, res) => {
  if (!req.query.vehicle) {
    return res.send({});
  }
  price.findOne({ name: req.query.vehicle }).then((prices) => {
    res.send(prices);
  });
});

// TODO fill out the endpoints
router.get("/vehicle_list", (req, res) => {});

router.get("/vehicles", (req, res) => {
  // req.query.vehicle
  // req.query.stat
});

router.get("/nation_list", (req, res) => {
  ab_ranks_all.aggregate([{ $group: { _id: "$nation" } }]).then((nations) => {
    res.send(nations.map((nation) => nation._id));
  });
});

router.get("/nations", (req, res) => {
  // req.query.nation
  // req.query.gamemode
  // req.query.field
  // req.query.cls
  // req.query.br
  // req.query.brRange

  const db = chooseDb(req.query.gamemode, req.query.brRange);
  if (db) {
    db.find(
      {
        nation: req.query.nation,
        cls: req.query.cls,
        [req.query.gamemode + "_lower_br"]: req.query.br,
      },
      ["date", req.query.field]
    )
      .sort({ date: 1 })
      .then((nations) => {
        res.send(nations);
      });
  } else {
    res.send([]);
  }
});

router.get("/br_list", (req, res) => {
  const mode = req.query.mode;
  const cls = req.query.cls;
  const nation = req.query.nation;
  let aggregation = [
    {
      $match: {
        nation: nation,
        cls: cls,
      },
    },
    {
      $group: {
        _id: "$" + mode + "_lower_br",
      },
    },
  ];
  const db = chooseDb(mode, "0");
  if (db) {
    db.aggregate(aggregation).then((brs) => {
      res.send(brs.map((br) => String(br._id)).sort((a, b) => a - b));
    });
  } else {
    res.send([]);
  }
});

router.get("/cls_list", (req, res) => {
  const nation = req.query.nation;
  ab_ranks_all
    .aggregate([{ $match: { nation: nation } }, { $group: { _id: "$cls" } }])
    .then((clss) => {
      res.send(clss.map((cls) => cls._id));
    });
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
