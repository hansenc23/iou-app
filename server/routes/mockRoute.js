// Mock data
const express = require("express");
const faker = require("faker");
const mongoose = require("mongoose");
const moment = require("moment");

const User = require("../models/User");
const Favors = require("../models/Favors");

const router = express.Router();
const routerProduction = express.Router();

faker.locale = "en_AU";

router.get("/users", async (req, res) => {
  const limit = req.query.limit || 10;
  const fakeData = [];
  for (let i = 0; i < limit; i++) {
    // Password 123456
    const password =
      "$2b$10$NTNGXzKBHKFIy/6iS.XJH.CKX60MKsSuwacTbue9/pGYKl5EI5HWO";
    fakeData.push({
      username:
        faker.internet.userName() +
        faker.name.firstName() +
        faker.name.lastName(),
      email: faker.internet.email(
        faker.internet.userName(),
        faker.name.firstName(),
        faker.name.lastName()
      ),
      password: password,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    });
  }

  const response = await User.insertMany(fakeData, { ordered: false });
  return res.json({ success: !!response });
});

router.get("/favors", async (req, res) => {
  const limit = req.query.limit || 10;
  const allUserId = await User.find({}, { _id: 1 });
  const favDetails = ["Coffee", "Chocolate", "Pizza", "Cupcake", "Mints"];
  const fakeData = [];

  function generateRandomImageUrl() {
    const imageLinks = [
      "https://iou-app-bucket.s3.amazonaws.com/dp-1601188862949.JPG",
      "https://iou-app-bucket.s3-ap-southeast-2.amazonaws.com/July20_Simple-Pesto-Pepperoni-Pizza-976x549.jpg",
      "https://iou-app-bucket.s3-ap-southeast-2.amazonaws.com/036066.jpg",
      "https://iou-app-bucket.s3-ap-southeast-2.amazonaws.com/green-tea-1574c69.jpg",
      "https://iou-app-bucket.s3-ap-southeast-2.amazonaws.com/flat-white-3402c4f.jpg",
      "https://iou-app-bucket.s3-ap-southeast-2.amazonaws.com/Homemade-Chocolate-Bars.jpg",
      "https://iou-app-bucket.s3-ap-southeast-2.amazonaws.com/Easy-Fried-Rice-I.jpg",
      "https://iou-app-bucket.s3-ap-southeast-2.amazonaws.com/Creamy-Spinach-Tomato-Pasta-bowl.jpg",
      "https://iou-app-bucket.s3-ap-southeast-2.amazonaws.com/chum-churum-original-soju.jpg",
      "https://iou-app-bucket.s3-ap-southeast-2.amazonaws.com/Chocolate-cupcakes-recipe-light-500x500.jpg",
      "https://iou-app-bucket.s3-ap-southeast-2.amazonaws.com/Cauliflower-Banh-Mi-SQUARE.jpg",
      "https://iou-app-bucket.s3-ap-southeast-2.amazonaws.com/ADD8_800.jpg",
      "https://iou-app-bucket.s3-ap-southeast-2.amazonaws.com/1382541460839.jpeg",
    ];

    return imageLinks[faker.random.number(imageLinks.length - 1)];
  }

  function generateRandomTime() {
    const time = moment().unix() + faker.random.number(10000000);
    return time;
  }

  for (let i = 0; i < limit; i++) {
    let owner = allUserId[faker.random.number(allUserId.length - 1)];
    let ower = allUserId[faker.random.number(allUserId.length - 1)];

    while (true) {
      if (owner === ower) {
        ower = allUserId[faker.random.number(allUserId.length - 1)];
      } else {
        break;
      }
    }

    let endTime = faker.random.number(100) > 25 ? null : generateRandomTime();

    fakeData.push({
      ower: mongoose.Types.ObjectId(ower._id),
      owner: mongoose.Types.ObjectId(owner._id),
      favor_detail: favDetails[faker.random.number(favDetails.length - 1)],
      picture_proof_id:
        faker.random.number(100) > 15 ? generateRandomImageUrl() : null,
      endTime: endTime,
    });
  }

  const response = Favors.insertMany(fakeData, { ordered: false });

  return res.json({ success: !!response });
});

router.all("/", (req, res) => {
  res.status(200).json({ message: "Mock data is working in development!" });
});

routerProduction.all("/", (req, res) => {
  res.status(404).json({ message: "Mock data does not work on production!" });
});

module.exports =
  process.env.NODE_ENV === "development" ? router : routerProduction;
