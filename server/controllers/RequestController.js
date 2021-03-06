const Requests = require('../models/Requests');
const RequestRewards = require('../models/RequestRewards');
const Completed = require('../models/Completed');
const Users = require('../models/User');

/*
    POST /request/create
    {
      title: required | string
      owner: required | string
      description: required | string
      reward: required | [] | string
    }
 */

const create = async (req, res) => {
  // string , string, string, string
  const { title, owner, description, reward } = req.body;

  try {
    if (!title || !owner || !description || !reward) throw Error('Incomplete');

    // Insert into Request
    const newRequest = new Requests({
      title,
      request_owner: owner,
      description,
      rewards: [],
    });
    await newRequest.save();

    let listOfIds = [];

    if (Array.isArray(reward)) {
      const rewardInsertMany = [];

      reward.forEach((each) => {
        rewardInsertMany.push({
          request_id: newRequest._id,
          reward: each,
          owner,
        });
      });

      const response = await RequestRewards.insertMany(rewardInsertMany);

      listOfIds = response.map((each) => each._id);
    } else {
      // Insert into Rewards
      const newReward = new RequestRewards({
        request_id: newRequest._id,
        reward,
        owner,
      });
      await newReward.save();

      listOfIds = [newReward._id];
    }

    // Push reward id(s) into the request object
    newRequest.rewards.push(...listOfIds);
    await newRequest.save();

    return res.status(200).json({
      success: true,
      request: newRequest,
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

/* 
  POST /request/add_reward
    {
    request_id: required,
    reward: required,
    reward_owner: {
      default: request_id
    }
  }
 */

const addReward = async (req, res) => {
  const { request_id, reward } = req.body;

  const reward_owner = req.body.reward_owner || request_id;

  try {
    if (!request_id || !reward) throw Error('Incomplete');

    const requestResponse = await Requests.findOne({ _id: request_id });

    const newReward = RequestRewards({
      request_id,
      reward,
      owner: reward_owner,
    });
    await newReward.save();

    requestResponse.rewards.push(newReward._id);
    await requestResponse.save();

    return res.status(200).json({ success: true, request: requestResponse });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

/* 
  POST /request/complete
  {
    request_id: required
    completer_id: required
    picture_proof_url: required
  }
 */

const complete = async (req, res) => {
  const { request_id, completer_id, picture_proof_url } = req.body;

  try {
    if (!request_id || !completer_id || !picture_proof_url) throw Error('Incompleted');

    const newCompleted = new Completed({
      user: completer_id,
      picture_proof_url,
    });

    await newCompleted.save();

    const request = await Requests.findOne({ _id: request_id });

    if (request.completedBy) throw Error('This request has been completed');

    request.completedBy = newCompleted._id;
    await request.save();

    return res.status(200).json({ success: true, request: request });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// GET /request/get_all?limit=10&skip=0&completed=false&order=asc
const getAll = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const skip = parseInt(req.query.skip) || 0;
  const completed = req.query.completed === 'true' ? true : false;
  const sortBy = req.query.order === 'asc' ? { createdAt: 1 } : { createdAt: -1 };

  const populateFields = ['email', 'username', 'firstName', 'lastName'];

  try {
    const response = await Requests.find({
      completedBy: completed ? { $ne: null } : null,
    })
      .skip(skip)
      .limit(limit)
      .sort(sortBy)
      .populate('request_owner', populateFields)
      .populate('rewards')
      .populate({
        path: 'rewards',
        select: { request_id: 0 },
        populate: {
          path: 'owner',
          select: { password: 0 },
        },
      })
      .populate({
        path: 'completedBy',
        populate: {
          path: 'user',
          select: { password: 0 },
        },
      });

    if (!response) throw Error('Unable to get records.');

    return res.status(200).json({ success: true, requests: response });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// GET /request/get?request_id=5f7588b4251f06031cf42174
const getById = async (req, res) => {
  const { request_id } = req.query;

  try {
    const response = await Requests.find({ _id: request_id })
      .populate('request_owner')
      .populate('rewards')
      .populate({
        path: 'rewards',
        select: { request_id: 0 },
        populate: {
          path: 'owner',
          select: { password: 0 },
        },
      })
      .populate({
        path: 'completedBy',
        populate: {
          path: 'user',
          select: { password: 0 },
        },
      });

    return res.status(200).json({ success: true, requests: response });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

//GET /requests/get_completed
//get completed requests
const getCompleted = async (req, res) => {
  try {
    const response = await Completed.aggregate([
      //group user id and count the number of occurences
      {
        $group: {
          _id: '$user',
          count: { $sum: 1 },
        },
      },
      //use the grouped user id to join 'Users' collection to get user info
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user_data',
        },
      },
      //specify the needed fields to be returned
      {
        $project: {
          count: 1,
          user_data: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            username: 1,
          },
        },
      },
      //sort by descending order based on the number of count
      { $sort: { count: -1 } },
    ]);

    return res.status(200).json({ success: true, requests: response });
  } catch (error) {
    return res.status(400).json(error);
  }
};

//GET /request/reward/get?request_id=5f7588b4251f06031cf42174&reward_owner_id=5f7588b4251f06031cf42174
const getRequestReward = async (req, res) => {
  const { request_id, reward_owner_id } = req.query;

  try {
    const response = await RequestRewards.find({ request_id: { $eq: request_id }, owner: { $eq: reward_owner_id } });
    if (response) {
      return res.status(200).json({ success: true, rewards: response });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

//POST /request/reward/delete
//route to delete a specific reward
const deleteReward = async (req, res) => {
  const { request_id, reward_id } = req.body;

  try {
    const responseRequest = await Requests.updateOne({ _id: { $eq: request_id } }, { $pull: { rewards: reward_id } });

    const responseRequestReward = await RequestRewards.deleteOne({ _id: { $eq: reward_id } });

    if (responseRequest && responseRequestReward) {
      return res.status(200).json({ success: true, response: 'Reward deleted' });
    }
  } catch (err) {
    return res.status(400).json({ success: false, response: err });
  }
};

//POST /request/delete
const deleteRequest = async (req, res) => {
  const { request_id } = req.body;

  try {
    const response = await Requests.deleteOne({ _id: { $eq: request_id } });

    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  create,
  complete,
  getAll,
  getById,
  addReward,
  getRequestReward,
  deleteReward,
  deleteRequest,
  getCompleted,
};
