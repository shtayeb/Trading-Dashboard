const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

const currencyRoute = require("./routes/currency");
const tradeRoute = require("./routes/trade");

const path = require("path");

const app = express();

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors());
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.use("/api/currencies", currencyRoute);
app.use("/api/trade", tradeRoute);

// to combine all of them together
app.use(express.static(path.join(__dirname, "/admin/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/admin/build", "index.html"));
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 10000");
});
