const mongoose = require("mongoose");

const PriceSchema = new mongoose.Schema({
  name: String,
  date: Date,
  old_price: Number,
  new_price: Number,
  discount: Number,
});

module.exports = mongoose.model("price", PriceSchema, "prices_new");
