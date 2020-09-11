const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../middlewares/validator');

register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

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
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  //Save user to database
  try {
    const newUser = await user.save();
    // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(200).send({ user: user._id });
  } catch (err) {
    res.status(400).json(err);
  }
};

login = async (req, res, next) => {
  const { email, password } = req.body;

  //Validate login data
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  //Check if email exist in database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json('Email or password is invalid');
  }

  //Check if password is valid
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json('Email or password is invalid');
  }

  //Create an assign a jwt
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  return res.status(200).header('auth-token', token).json(token);
  // return res.status(200).json({ success: true, asdf: token });

  // res.send('Logged in!');
};

getCurrentUser = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User.findOne({ _id: userId });
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

deleteUser = async (req, res, next) => {
  const { id } = req.body;
  try {
    const response = await User.deleteOne({ _id: id });
    if (response.deletedCount === 0) {
      return res.status(400).json({ err: 'user not found' });
    } else {
      return res.status(200).json({ success: 'user deleted successfully' });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  deleteUser,
};
