const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestRewards = new Schema(
  {
    request_id: {
      type: Schema.Types.ObjectId,
      ref: "Requests",
      require: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    reward: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "RequestRewards",
  RequestRewards,
  "request_rewards"
);
