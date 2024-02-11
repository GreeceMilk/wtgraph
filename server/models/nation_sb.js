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

const sb_ranks_all = mongoose.model("sb_ranks_all", NationSchemaSb, "sb_ranks_all");
const sb_ranks_1 = mongoose.model("sb_ranks_1", NationSchemaSb, "sb_ranks_1");
const sb_ranks_0 = mongoose.model("sb_ranks_0", NationSchemaSb, "sb_ranks_0");
module.exports = { sb_ranks_all, sb_ranks_1, sb_ranks_0 };