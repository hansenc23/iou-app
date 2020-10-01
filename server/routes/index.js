const express = require("express");
const favorsRoute = require("./favorsRoute");
const authRoute = require("./authRoute");
const imageRoute = require("./imageRoute");
const requestRoute = require("./requestRoute");
const mockRoute = require("./mockRoute");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is IOU backend!");
});

router.use("/favors", favorsRoute);

router.use("/auth", authRoute);

router.use("/image", imageRoute);

router.use("/request", requestRoute);

router.use("/mock", mockRoute);

module.exports = router;
