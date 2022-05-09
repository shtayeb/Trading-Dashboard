const router = require("express").Router();
const { verifyTokenAndAuth } = require("./verifyToken");
const Currency = require("../models/Currency");

// create/update currency
router.post("/", verifyTokenAndAuth, async (req, res) => {
  let PriceToSell;
  let PriceToBuy;
  //check if PriceToSell is a string
  if (typeof req.body.PriceToSell === "string") {
    PriceToSell = req.body.PriceToSell.split(",");
  } else {
    PriceToSell = req.body.PriceToSell;
  }
  //check if PriceToBuy is a string
  if (typeof req.body.PriceToBuy === "string") {
    PriceToBuy = req.body.PriceToBuy.split(",");
  } else {
    PriceToBuy = req.body.PriceToBuy;
  }
  // final data sent to the database
  const finalData = { ...req.body, PriceToSell, PriceToBuy };
  // find currency by symbol in mongo db
  // const data = await Currency.findOne({ Symbol: req.body.Symbol });

  // find currency by id in mongo db
  const data = await Currency.findById(req.body._id);

  if (data) {
    // update the currency
    console.log("update the currency");
    try {
      // find by Symbol and update
      const updatedCurrency = await Currency.findByIdAndUpdate(
        req.body._id,
        finalData,
        {
          new: true,
        }
      );
      res.status(200).json(updatedCurrency);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    // create the currency
    console.log("create the currency");
    const currency = new Currency(finalData);
    try {
      const result = await currency.save();
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

// delete the currency
router.delete("/:cid", verifyTokenAndAuth, async (req, res) => {
  try {
    await Currency.findByIdAndDelete(req.params.cid);
    res.status(200).json({ status: "Currerncy has been deleted" });
  } catch (err) {
    res.status(500).send(err);
  }
});

//Get all Currencies
router.get("/", verifyTokenAndAuth, async (req, res) => {
  try {
    let currencies;
    currencies = await Currency.find();

    res.status(200).json(currencies);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
