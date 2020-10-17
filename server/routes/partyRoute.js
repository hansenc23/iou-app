const express = require("express");
const mongoose = require("mongoose");
const authController = require("../controllers/AuthController");
const verifyToken = require("../middlewares/verifyToken");
const FavorsModel = require("../models/Favors");
const UserModel = require("../models/User");

const router = express.Router();

// POST /party/detection

router.post("/detection", async (req, res) => {
	const { user_id, reward } = req.body;

	if (!user_id || !reward) return res.status(400);

	const response = await FavorsModel.aggregate([
		{
			$match: {
				owner: mongoose.Types.ObjectId(user_id),
				favor_detail: reward,
				end_time: null,
			},
		},
		{
			$graphLookup: {
				from: "favors",
				startWith: "$owner",
				connectFromField: "owner",
				connectToField: "ower",
				as: "party_members",
				restrictSearchWithMatch: {
					favor_detail: reward,
					end_time: null,
				},
			},
		},
		{
			$lookup: {
				from: "users",
				localField: "party_members.ower",
				foreignField: "_id",
				as: "party_members",
			},
		},
	]);

	return res.status(200).json({ ok: true, parties: response });
});

module.exports = router;
