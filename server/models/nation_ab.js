const mongoose = require("mongoose");
const NationSchemaAb = new mongoose.Schema({
  date: Date,
  ab_battles_mean: Number,
  ab_air_frags_per_battle: Number,
  nation: String,
  ab_battles_sum: Number,
  ab_win_rate: Number,
  ab_air_frags_per_death: Number,
  ab_ground_frags_per_battle: Number,
  ab_ground_frags_per_death: Number,
  ab_lower_br: Number,
  cls: String,
});

const ab_ranks_0 = mongoose.model("ab_ranks_0", NationSchemaAb, "ab_ranks_0");
const ab_ranks_1 = mongoose.model("ab_ranks_1", NationSchemaAb, "ab_ranks_1");
const ab_ranks_all = mongoose.model("ab_ranks_all", NationSchemaAb, "ab_ranks_all");
module.exports = { ab_ranks_0, ab_ranks_1, ab_ranks_all };