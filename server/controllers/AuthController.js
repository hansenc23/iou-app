const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation, validateEmail } = require('../middlewares/validator');

const cookie_config = {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
};

// process.env.NODE_ENV === 'development'
//   ? {
//       httpOnly: true,
//       sameSite: 'strict',
//       secure: false,
//     }
//   : {
//       httpOnly: true,
//       sameSite: 'strict',
//       secure: true,
//     };

register = async (req, res, next) => {
  const { username, firstName, lastName, email, password } = req.body;

  //Validate data before creating a new user
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  //Check if user already exist in database
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    return res.status(400).json('Email already exist!');
  }

  //Hash user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create a new user
  const user = new User({
    username,
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  //Save user to database
  try {
    const newUser = await user.save();
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    // res.status(200).json(token);
    // res.status(200).send({ user: user._id });
    return res.cookie('jwt', token, cookie_config).json('logged in!');
  } catch (err) {
    res.status(400).json(err);
  }
};

login = async (req, res, next) => {
  const { emailOrUsername, password } = req.body;
  // console.log(req.body);
  //Validate login data
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  } else {
    console.log('no error');
  }

  if (validateEmail(emailOrUsername)) {
    console.log('this is email');
    //Check if email exist in database
    const user = await User.findOne({ email: { $eq: emailOrUsername } }); //to avoid mongodb query injection
    if (!user) {
      return res.status(400).json('Email or password is invalid');
    }

    //Check if password is valid
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json('Email or password is invalid');
    }

    //Create an assign a jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

    return res.cookie('jwt', token, cookie_config).json('logged in!');
  } else {
    console.log('this is username');
    //Check if username exist in database
    const user = await User.findOne({ username: { $eq: emailOrUsername } });
    if (!user) {
      return res.status(400).json('Email or password is invalid');
    }

    //Check if password is valid
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json('Email or password is invalid');
    }

    //Create an assign a jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

    return res.cookie('jwt', token, cookie_config).json('logged in!');
  }

  // return res.status(200).header('auth-token', token).json(token);
};

getCurrentUser = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const user = await User.findOne({ _id: { $eq: userId } });
    //const user = await User.findOne({_id: {$eq:userId}})  to avoid query injection
    if (!user) {
      return res.status(401).json('Not Authorized!');
    }

    res.status(200).json({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: { $eq: id } });
    if (!user) {
      return res.status(400).json('User not found!');
    }

    return res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

deleteUser = async (req, res, next) => {
  const { id } = req.body;
  try {
    const response = await User.deleteOne({ _id: { $eq: id } });
    if (response.deletedCount === 0) {
      return res.status(400).json({ err: 'user not found' });
    } else {
      return res.status(200).json({ success: 'user deleted successfully' });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

logout = (req, res, next) => {
  return res.status(200).clearCookie('jwt').json('logged out');
};

// Post Request
usernamePredict = async (req, res) => {
  const { username } = req.body;

  try {
    if (!username) throw Error('No input');

    const response = await User.find(
      {
        username: {
          $regex: `^${username}`,
        },
      },
      {
        _id: 1,
        username: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
      }
    ).limit(5);

    res.status(200).json(response);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  deleteUser,
  logout,
  getUser,
  usernamePredict,
};
