const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Favors = new Schema({
  ower: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  favor_detail: {
    type: String,
    require: true,
  },
  picture_proof_id: {
    type: String,
    require: true,
  },
  create_time: {
    type: Date,
    default: Date.now,
  },
  end_time: {
    type: Date,
    default: null,
  },
  proof_url: {
    type: String,
  },
});

module.exports = mongoose.model("Favors", Favors, "favors");
