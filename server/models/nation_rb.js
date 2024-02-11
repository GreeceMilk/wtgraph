const mongoose = require("mongoose");
const NationSchemaRb = new mongoose.Schema({
  date: Date,
  rb_battles_mean: Number,
  rb_air_frags_per_battle: Number,
  nation: String,
  rb_battles_sum: Number,
  rb_win_rate: Number,
  rb_air_frags_per_death: Number,
  rb_ground_frags_per_battle: Number,
  rb_ground_frags_per_death: Number,
  rb_lower_br: Number,
  cls: String,
});

module.exports = mongoose.model("nation_rb", NationSchemaRb);