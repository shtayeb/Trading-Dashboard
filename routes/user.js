const router = require("express").Router();
const { verifyTokenAndAuth, verifyTokenAndAdmin } = require("./verifyToken");
const CryptoJS = require("crypto-js");
const User = require("../models/User");

// update the user
router.put("/:userId", verifyTokenAndAuth, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      {
        new: true,
      }
    );
    const { password, ...others } = updatedUser._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).send(err);
  }
});

// delete the user
router.delete("/:userId", verifyTokenAndAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});
// Get the user
router.get("/find/:userId", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Get all users
router.get("/", verifyTokenAndAuth, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    // const { password, ...others } = user._doc;
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get user stats
router.get("/stats", verifyTokenAndAuth, async (req, res) => {
  // total no of users per month
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: lastYear,
          },
        },
      },
      {
        $project: {
          month: {
            $month: "$createdAt",
          },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
