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

const rb_ranks_0 = mongoose.model("rb_ranks_0", NationSchemaRb, "rb_ranks_0");
const rb_ranks_1 = mongoose.model("rb_ranks_1", NationSchemaRb, "rb_ranks_1");
const rb_ranks_all = mongoose.model("rb_ranks_all", NationSchemaRb, "rb_ranks_all");
module.exports = { rb_ranks_0, rb_ranks_1, rb_ranks_all };