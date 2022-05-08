const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Trade = require("../models/Trade");

// a function which gets the trade logs from the database symbol wise and with the given date range
router.get("/log", verifyTokenAndAuth, async (req, res) => {
  const { to, from, Symbol } = req.query;
  console.log(req.query);

  const date = new Date();

  const lastWeek = new Date(date.setDate(date.getDate() - 7)).toISOString();
  const tomorrow = new Date(date.setDate(date.getDate() + 1)).toISOString();

  let startDate;
  let endDate;

  // default values in case the to or from is not provided
  startDate = lastWeek;
  endDate = tomorrow;

  //in case "from" is not provided we take last week
  if (from) {
    console.log("we have from");
    startDate = new Date(from).toISOString();
  }
  // in case 'to' is not provided we take tomorrow
  if (to) {
    console.log("we have to");
    endDate = new Date(to).toISOString();
  }

  try {
    // get the currency logs
    // let logStartDate = new Date(startDate).toDateString();
    // let logEndDate = new Date(endDate).toDateString();
    // console.log("from = ", logStartDate);
    // console.log("to =", logEndDate);
    console.log("from = ", startDate);
    console.log("to = ", endDate);

    const logs = await Trade.find({
      Symbol: Symbol,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    }).sort({ createdAt: 1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).send(error);
  }
});

// create a trade
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const trade = new Trade(req.body);
  try {
    const result = await trade.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all trades
router.get("/", verifyTokenAndAuth, async (req, res) => {
  try {
    let trades;
    trades = await Trade.find().sort({ createdAt: -1 }).limit(50);
    // trades = await Trade.find();

    res.status(200).json(trades);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
