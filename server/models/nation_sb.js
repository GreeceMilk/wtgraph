const mongoose = require("mongoose");
const NationSchemaSb = new mongoose.Schema({
  date: Date,
  sb_battles_mean: Number,
  sb_air_frags_per_battle: Number,
  nation: String,
  sb_battles_sum: Number,
  sb_win_rate: Number,
  sb_air_frags_per_death: Number,
  sb_ground_frags_per_battle: Number,
  sb_ground_frags_per_death: Number,
  sb_lower_br: Number,
  cls: String,
});

module.exports = mongoose.model("nation_sb", NationSchemaSb);