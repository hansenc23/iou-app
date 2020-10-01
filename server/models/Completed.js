const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Completed = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    picture_proof_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Completed", Completed, "completed");