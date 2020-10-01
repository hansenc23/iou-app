const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Requests = new Schema(
  {
    request_owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    title: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      require: true,
      trim: true,
    },
    rewards: [{ type: Schema.Types.ObjectId, ref: "RequestRewards" }],
    completedBy: {
      type: Schema.Types.ObjectId,
      ref: "Completed",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Requests", Requests, "requests");
