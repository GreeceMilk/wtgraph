const mongoose = require("mongoose");

const PriceSchema = new mongoose.Schema({
  name: String,
  prices: [
    {
      time: String,
      old_price: Number,
      new_price: Number,
      discount: Number,
    },
  ],
});

module.exports = mongoose.model("price", PriceSchema);
