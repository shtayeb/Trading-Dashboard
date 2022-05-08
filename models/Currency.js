const mongoose = require("mongoose");

const CurrencySchema = new mongoose.Schema(
  {
    Symbol: {
      type: String,
      required: true,
      unique: true,
    },
    InitialPrice: {
      type: Number,
      required: true,
    },
    AmountSellable: {
      type: Number,
      required: true,
    },
    PriceToSell: {
      type: Array,
      required: true,
    },
    PriceToBuy: {
      type: Array,
      required: true,
    },
    DollarsToBuy: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Currency", CurrencySchema);
