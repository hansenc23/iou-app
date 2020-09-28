const FavorModel = require('../models/Favors');
const mongoose = require('mongoose');

getFavorById = (req, res) => {
  const { id } = req.params;

  FavorModel.findById(id, (error, favor) => {
    // Check if there is error
    if (error) return res.status(400).json({ success: false, error });

    return res.status(200).json({ success: true, data: favor });
  });
};

getAllByTypeAndId = async (req, res) => {
  let findCondition = req.params.type === 'ower' ? { ower: req.params.id } : { owner: req.params.id };
  findCondition.end_time = req.params.end === 'false' ? null : { $ne: null };

  const populateFields = ['email', 'username', 'firstName', 'lastName'];

  const response = await FavorModel.find(findCondition)
    .populate('ower', populateFields)
    .populate('owner', populateFields)
    .exec(function (error, result) {
      if (error) res.status(200).json({ success: false, error: 'something went wrong', msg: error });

      return res.status(200).json({ success: true, data: result });
    });
};

createNewFavors = async (req, res) => {
  const { ower, owner, favor_detail, picture_proof_id } = req.body;

  try {
    // Check if variable are empty
    if (!ower || !owner || !favor_detail || !picture_proof_id) throw Error('Missing fields');

    // Create new Mongoose model
    const newFavor = new FavorModel({
      ower,
      owner,
      favor_detail,
      picture_proof_id,
    });

    // Check if a new FavorModel was created without error
    if (!newFavor) throw Error('Can not create new FavorModel.');

    newFavor.save().then((favor) => {
      return res.status(200).json({
        success: true,
        data: favor,
      });
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e.message,
    });
  }
};

updateFavorStatus = (req, res) => {
  const { id, end_time, picture_proof_id } = req.body;

  if (!end_time || !id) return res.status(400).json({ success: false, error: 'Missing input' });

  FavorModel.findByIdAndUpdate({ _id: id }, { end_time: end_time, picture_proof_id: picture_proof_id }, (error, result) => {
    if (error) return res.status(400).json({ success: false, error });

    return res.status(200).json({ success: true, data: result });
  });
};

deleteFavorById = (req, res) => {
  const { id } = req.body;

  FavorModel.deleteOne({ _id: id })
    .then((response) => {
      return res.status(200).json({ success: true });
    })
    .catch((error) => {
      return res.status(204).json({ success: false, error });
    });
};

module.exports = {
  getFavorById,
  getAllByTypeAndId,
  createNewFavors,
  updateFavorStatus,
  deleteFavorById,
};
