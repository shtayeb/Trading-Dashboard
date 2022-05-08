const mongoose = require("mongoose");

const TradeSchema = new mongoose.Schema(
  {
    Symbol: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    Op: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trade", TradeSchema);
